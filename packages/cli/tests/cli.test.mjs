import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import { listTemplates } from '../src/list.mjs';
import { formatTemplateDetails, showTemplate } from '../src/show.mjs';
import { initTemplate } from '../src/init.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

test('listTemplates returns templates from all families', () => {
  const templates = listTemplates(repoRoot);

  assert.ok(templates.length >= 4);
  assert.ok(templates.some((template) => template.id === 'webpage/stock-analysis'));
  assert.ok(templates.some((template) => template.id === 'lark_doc/weekly_report'));
});

test('listTemplates filters by family and tag', () => {
  const templates = listTemplates(repoRoot, { family: 'webpage', tag: 'finance' });

  assert.equal(templates.length, 1);
  assert.equal(templates[0].id, 'webpage/stock-analysis');
});

test('showTemplate returns a template by id', () => {
  const template = showTemplate(repoRoot, 'webpage/stock-analysis');

  assert.equal(template.displayName, 'Stock Analysis');
  assert.equal(template.family, 'webpage');
  assert.equal(template.sourcePath, 'templates/webpage/stock-analysis');
});

test('formatTemplateDetails omits internal paths', () => {
  const template = showTemplate(repoRoot, 'webpage/stock-analysis');
  const output = formatTemplateDetails(template);

  assert.match(output, /"id": "webpage\/stock-analysis"/);
  assert.doesNotMatch(output, /metadataPath/);
  assert.doesNotMatch(output, /templateDir/);
});

test('initTemplate copies a template into a target directory', async () => {
  const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), 'open-templates-cli-'));

  await initTemplate(repoRoot, 'lark_doc/weekly_report', targetDir);

  assert.ok(fs.existsSync(path.join(targetDir, 'weekly_report.md')));
});

test('initTemplate omits repo-maintenance files from copy-dir templates', async () => {
  const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), 'open-templates-webpage-'));

  await initTemplate(repoRoot, 'webpage/stock-analysis', targetDir);

  assert.ok(fs.existsSync(path.join(targetDir, 'index.html')));
  assert.ok(fs.existsSync(path.join(targetDir, 'package.json')));
  assert.equal(fs.existsSync(path.join(targetDir, 'TEMPLATE_META.md')), false);
  assert.equal(fs.existsSync(path.join(targetDir, 'TODO.md')), false);
  assert.equal(fs.existsSync(path.join(targetDir, 'metadata.json')), false);
});
