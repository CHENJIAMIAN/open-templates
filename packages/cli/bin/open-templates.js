#!/usr/bin/env node

import { formatTemplateList, listTemplates } from '../src/list.mjs';
import { formatTemplateDetails, showTemplate } from '../src/show.mjs';
import { initTemplate } from '../src/init.mjs';
import { getRepoRoot } from '../src/fs-utils.mjs';

const repoRoot = getRepoRoot(import.meta.url);

function printUsage() {
  console.log('Usage: open-templates <list|show|init> [args]');
  console.log('  open-templates list [--family <family>] [--tag <tag>]');
  console.log('  open-templates show <template-id>');
  console.log('  open-templates init <template-id> <target-dir>');
}

function parseListOptions(args) {
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === '--family' || arg === '-f') {
      const family = args[index + 1];
      if (!family || family.startsWith('-')) {
        throw new Error('--family requires a family name');
      }

      options.family = options.family ? [].concat(options.family, family) : family;
      index += 1;
      continue;
    }

    if (arg === '--tag' || arg === '-t') {
      const tag = args[index + 1];
      if (!tag || tag.startsWith('-')) {
        throw new Error('--tag requires a tag name');
      }

      options.tag = options.tag ? [].concat(options.tag, tag) : tag;
      index += 1;
      continue;
    }

    throw new Error(`Unknown list option: ${arg}`);
  }

  return options;
}

function main(argv) {
  const [command, ...args] = argv;

  switch (command) {
    case 'list': {
      const templates = listTemplates(repoRoot, parseListOptions(args));
      console.log(formatTemplateList(templates));
      return 0;
    }
    case 'show': {
      if (args.length < 1) {
        throw new Error('show requires a template id');
      }

      const template = showTemplate(repoRoot, args[0]);
      console.log(formatTemplateDetails(template));
      return 0;
    }
    case 'init': {
      if (args.length < 2) {
        throw new Error('init requires a template id and target directory');
      }

      const result = initTemplate(repoRoot, args[0], args[1]);
      console.log(`Initialized ${result.template.id} at ${result.destinationDir}`);
      return 0;
    }
    case undefined:
    case '--help':
    case '-h':
      printUsage();
      return 0;
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
