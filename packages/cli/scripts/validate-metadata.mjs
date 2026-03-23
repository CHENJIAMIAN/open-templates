#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const templatesRoot = path.join(repoRoot, 'templates');

const allowedFamilies = new Set(['lark_doc', 'miaoda', 'slides', 'webpage']);
const allowedInitModes = new Set(['copy-file', 'copy-dir']);

function toPosixPath(value) {
  return String(value).replace(/\\/g, '/');
}

function isRepoRelativePath(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return false;
  }

  const normalized = toPosixPath(value);
  if (path.win32.isAbsolute(value) || path.posix.isAbsolute(value)) {
    return false;
  }

  const segments = normalized.split('/');
  if (segments.some((segment) => segment === '..')) {
    return false;
  }

  return !normalized.startsWith('/');
}

function isTemplateRelativePath(value) {
  return isRepoRelativePath(value) && !toPosixPath(value).split('/').includes('..');
}

function hasRepoRelativePrefix(value, prefix) {
  if (!isRepoRelativePath(value)) {
    return false;
  }

  const normalized = toPosixPath(value).replace(/\/+$/, '');
  const expected = prefix.replace(/\/+$/, '');
  return normalized === expected || normalized.startsWith(`${expected}/`);
}

function collectMetadataFiles(rootDir) {
  const results = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name === 'metadata.json') {
        results.push(fullPath);
      }
    }
  }

  if (fs.existsSync(rootDir)) {
    walk(rootDir);
  }

  return results;
}

function validateStringArray(value, fieldName, errors) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    errors.push(`${fieldName} must be a non-empty array of non-empty strings`);
  }
}

function validatePreview(preview, errors) {
  if (preview == null) {
    return;
  }

  if (typeof preview !== 'object' || Array.isArray(preview)) {
    errors.push('preview must be an object when present');
    return;
  }

  for (const [key, value] of Object.entries(preview)) {
    if (typeof value === 'string') {
      if (!hasRepoRelativePrefix(value, 'showcase/assets')) {
        errors.push(`preview.${key} must be a repo-relative path inside showcase/assets/`);
      }
      continue;
    }

    if (Array.isArray(value)) {
      if (value.length === 0 || value.some((item) => typeof item !== 'string' || !hasRepoRelativePrefix(item, 'showcase/assets'))) {
        errors.push(`preview.${key} must be a non-empty array of repo-relative paths inside showcase/assets/`);
      }
      continue;
    }

    errors.push(`preview.${key} must be a string or array of strings`);
  }
}

function validateMetadata(data, filePath) {
  const errors = [];
  const requiredFields = ['id', 'family', 'name', 'displayName', 'description', 'tags', 'sourcePath', 'entryFiles', 'initMode', 'visibility'];

  for (const field of requiredFields) {
    if (!(field in data)) {
      errors.push(`missing required field: ${field}`);
    }
  }

  if (typeof data.id !== 'string' || data.id.trim() === '') {
    errors.push('id must be a non-empty string');
  } else if (!/^[^/]+\/[^/]+$/.test(data.id)) {
    errors.push('id must use the form <family>/<template-name>');
  }

  if (!allowedFamilies.has(data.family)) {
    errors.push(`family must be one of: ${Array.from(allowedFamilies).join(', ')}`);
  }

  if (typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push('name must be a non-empty string');
  }

  if (typeof data.displayName !== 'string' || data.displayName.trim() === '') {
    errors.push('displayName must be a non-empty string');
  }

  if (typeof data.description !== 'string' || data.description.trim() === '') {
    errors.push('description must be a non-empty string');
  }

  validateStringArray(data.tags, 'tags', errors);

  if (!hasRepoRelativePrefix(data.sourcePath, 'templates')) {
    errors.push('sourcePath must be a repo-relative path inside templates/');
  }

  if (
    !Array.isArray(data.entryFiles) ||
    data.entryFiles.length === 0 ||
    data.entryFiles.some((item) => typeof item !== 'string' || item.trim() === '' || !isTemplateRelativePath(item))
  ) {
    errors.push('entryFiles must be a non-empty array of template-relative paths');
  }

  if (!allowedInitModes.has(data.initMode)) {
    errors.push(`initMode must be one of: ${Array.from(allowedInitModes).join(', ')}`);
  }

  if (typeof data.visibility !== 'string' || data.visibility.trim() === '') {
    errors.push('visibility must be a non-empty string');
  }

  if ('examplePath' in data && data.examplePath != null && !hasRepoRelativePrefix(data.examplePath, 'examples')) {
    errors.push('examplePath must be a repo-relative path inside examples/ when present');
  }

  validatePreview(data.preview, errors);

  return errors;
}

function parseMetadata(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return { data: JSON.parse(raw), parseError: null };
  } catch (error) {
    return { data: null, parseError: error };
  }
}

const metadataFiles = collectMetadataFiles(templatesRoot).sort();
const failures = [];

for (const filePath of metadataFiles) {
  const relativePath = path.relative(repoRoot, filePath).replace(/\\/g, '/');
  const { data, parseError } = parseMetadata(filePath);

  if (parseError) {
    failures.push({
      filePath: relativePath,
      issues: [`invalid JSON: ${parseError.message}`],
    });
    continue;
  }

  const issues = validateMetadata(data, filePath);
  if (issues.length > 0) {
    failures.push({
      filePath: relativePath,
      issues,
    });
  }
}

if (failures.length === 0) {
  console.log(`Validated ${metadataFiles.length} metadata files. All passed.`);
  process.exit(0);
}

console.error(`Validated ${metadataFiles.length} metadata files. ${failures.length} failed.`);
for (const failure of failures) {
  console.error(`- ${failure.filePath}`);
  for (const issue of failure.issues) {
    console.error(`  - ${issue}`);
  }
}

process.exit(1);
