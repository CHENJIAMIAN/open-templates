import fs from 'node:fs';
import path from 'node:path';

import { copyFileTree, ensureEmptyTarget, findTemplateById } from './fs-utils.mjs';

export function initTemplate(repoRoot, id, targetDir) {
  const template = findTemplateById(repoRoot, id);
  const sourceDir = path.join(repoRoot, template.sourcePath);
  const destinationDir = path.resolve(targetDir);

  ensureEmptyTarget(destinationDir);

  if (template.initMode === 'copy-dir') {
    copyFileTree(sourceDir, destinationDir);
    return { template, destinationDir };
  }

  for (const entryFile of template.entryFiles) {
    const sourceFile = path.join(sourceDir, entryFile);
    const destinationFile = path.join(destinationDir, entryFile);
    fs.mkdirSync(path.dirname(destinationFile), { recursive: true });
    fs.copyFileSync(sourceFile, destinationFile);
  }

  return { template, destinationDir };
}
