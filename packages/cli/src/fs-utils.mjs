import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_IGNORED_COPY_NAMES = new Set([
  'metadata.json',
  'metadata.md',
  'TEMPLATE_META.md',
  'TODO.md',
]);

export function getRepoRoot(importMetaUrl) {
  return path.resolve(path.dirname(fileURLToPath(importMetaUrl)), '..', '..', '..');
}

export function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

export function collectMetadataFiles(rootDir) {
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

export function loadTemplateIndex(repoRoot) {
  const templatesRoot = path.join(repoRoot, 'templates');
  return collectMetadataFiles(templatesRoot)
    .map((metadataPath) => {
      const metadata = readJsonFile(metadataPath);
      const templateDir = path.dirname(metadataPath);

      return {
        ...metadata,
        metadataPath,
        templateDir,
      };
    })
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function findTemplateById(repoRoot, id) {
  const templates = loadTemplateIndex(repoRoot);
  const template = templates.find((item) => item.id === id);
  if (!template) {
    throw new Error(`Unknown template id: ${id}`);
  }

  return template;
}

export function ensureEmptyTarget(targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    return;
  }

  const contents = fs.readdirSync(targetDir);
  if (contents.length > 0) {
    throw new Error(`Target directory is not empty: ${targetDir}`);
  }
}

export function copyFileTree(sourcePath, targetPath, options = {}) {
  const ignoredNames = options.ignoredNames ?? DEFAULT_IGNORED_COPY_NAMES;
  const stats = fs.statSync(sourcePath);

  if (stats.isDirectory()) {
    fs.mkdirSync(targetPath, { recursive: true });
    for (const entry of fs.readdirSync(sourcePath, { withFileTypes: true })) {
      if (ignoredNames.has(entry.name)) {
        continue;
      }

      const sourceEntry = path.join(sourcePath, entry.name);
      const targetEntry = path.join(targetPath, entry.name);
      copyFileTree(sourceEntry, targetEntry, options);
    }
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
}
