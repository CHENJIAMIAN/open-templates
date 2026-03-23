import { findTemplateById } from './fs-utils.mjs';

export function showTemplate(repoRoot, id) {
  return findTemplateById(repoRoot, id);
}

export function formatTemplateDetails(template) {
  const { metadataPath, templateDir, ...publicTemplate } = template;
  return JSON.stringify(publicTemplate, null, 2);
}
