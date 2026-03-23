import { loadTemplateIndex } from './fs-utils.mjs';

function normalizeFilterValue(value) {
  if (value === undefined || value === null) {
    return [];
  }

  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}

export function listTemplates(repoRoot, options = {}) {
  const families = normalizeFilterValue(options.family);
  const tags = normalizeFilterValue(options.tag);

  return loadTemplateIndex(repoRoot).filter((template) => {
    if (families.length > 0 && !families.includes(template.family)) {
      return false;
    }

    if (tags.length > 0) {
      const templateTags = Array.isArray(template.tags) ? template.tags : [];
      if (!tags.some((tag) => templateTags.includes(tag))) {
        return false;
      }
    }

    return true;
  });
}

export function formatTemplateList(templates) {
  const lines = [];
  const grouped = new Map();

  for (const template of templates) {
    if (!grouped.has(template.family)) {
      grouped.set(template.family, []);
    }

    grouped.get(template.family).push(template);
  }

  for (const [family, familyTemplates] of grouped.entries()) {
    lines.push(`${family} (${familyTemplates.length})`);
    for (const template of familyTemplates) {
      const tags = Array.isArray(template.tags) && template.tags.length > 0 ? template.tags.join(', ') : '';
      lines.push(`  ${template.id} | ${template.displayName} | ${template.description}${tags ? ` | ${tags}` : ''}`);
    }
  }

  return lines.join('\n');
}
