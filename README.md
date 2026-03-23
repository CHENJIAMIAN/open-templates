# open-templates

`open-templates` is a public template library with four families:

- `lark_doc`
- `miaoda`
- `slides`
- `webpage`

The repository includes source templates, real examples, preview assets, and a lightweight CLI for discovery and initialization.

## Start Here

If you want the fastest path in, read these pages first:

- [Getting started](docs/guides/getting-started.md)
- [Template families](docs/guides/template-families.md)
- [CLI reference](docs/guides/cli.md)
- [Examples and showcase assets](docs/guides/examples.md)
- [Slides export guide](docs/guides/slides-export.md)

## Quick Commands

Use the repo-local CLI directly:

```powershell
node packages/cli/bin/open-templates.js list
node packages/cli/bin/open-templates.js list --family webpage --tag finance
node packages/cli/bin/open-templates.js show webpage/stock-analysis
node packages/cli/bin/open-templates.js init webpage/stock-analysis D:\tmp\stock-analysis
```

## What Is Included

- `templates/` contains the source templates for all four families.
- `examples/` contains real filled examples and example packs.
- `showcase/assets/` contains preview covers and gallery images used by the public docs.
- `packages/cli/` contains the metadata-driven CLI.

## Guides

- [Template inventory](docs/guides/template-inventory.md)
- [Metadata schema](docs/guides/metadata-schema.md)
- [Getting started](docs/guides/getting-started.md)
- [Template families](docs/guides/template-families.md)
- [CLI reference](docs/guides/cli.md)
- [Examples and showcase assets](docs/guides/examples.md)
- [Slides export guide](docs/guides/slides-export.md)
- [Release checklist](docs/guides/release-checklist.md)
- [Public release notes](docs/guides/public-release-notes.md)

## Current Status

The public docs, example packs, and CLI are in place. The repository is now organized for browsing, previewing, and initializing templates.
