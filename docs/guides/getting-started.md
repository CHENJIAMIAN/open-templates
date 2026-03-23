# Getting Started

This repository is source-first. The quickest way to understand it is to browse the template index, inspect one template, then initialize it into a clean folder.

## 1. Browse the catalog

List every public template:

```powershell
node packages/cli/bin/open-templates.js list
```

Filter by family or tag:

```powershell
node packages/cli/bin/open-templates.js list --family webpage
node packages/cli/bin/open-templates.js list --family webpage --tag finance
```

## 2. Inspect one template

Show the public metadata for a template:

```powershell
node packages/cli/bin/open-templates.js show webpage/stock-analysis
```

The `show` command prints the public metadata only. It keeps internal file bookkeeping out of the output.

## 3. Initialize a template

Copy a template into a fresh target directory:

```powershell
node packages/cli/bin/open-templates.js init webpage/stock-analysis D:\tmp\stock-analysis
```

The CLI chooses the right copy mode from metadata:

- `copy-file` for single-file templates such as `lark_doc` and `miaoda`
- `copy-dir` for bundle templates such as `slides` and `webpage`

## 4. Preview the result

The template you initialize determines the next step:

- `lark_doc` templates produce Markdown documents that you can open immediately.
- `miaoda` templates produce prompt packs and style boards that you can feed into a visual generation workflow.
- `slides` templates produce presentation themes and example packs that can be exported into decks.
- `webpage` templates produce runnable site directories. After initialization, install dependencies and run the local dev server:

```powershell
cd D:\tmp\stock-analysis
npm install
npm run dev
```

## Where To Look Next

- [Template families](template-families.md) for the shape of each family
- [Examples and showcase assets](examples.md) for the real public example paths
- [CLI reference](cli.md) for command behavior and flags
- [Metadata schema](metadata-schema.md) for the fields the CLI expects
