# CLI Reference

The CLI is metadata-driven and runs from the repository itself. It currently lives in `packages/cli/` and is exposed through `packages/cli/bin/open-templates.js`.

## Install And Run

The repo does not publish a package yet. Use it directly from the checkout:

```powershell
node packages/cli/bin/open-templates.js --help
```

If you want a shorter path for local work, run the command from the repository root and pass the target template id directly.

## Commands

### `list`

List all public templates, grouped by family:

```powershell
node packages/cli/bin/open-templates.js list
```

Filter the catalog:

```powershell
node packages/cli/bin/open-templates.js list --family webpage
node packages/cli/bin/open-templates.js list --family webpage --tag finance
```

Supported flags:

- `--family`, `-f`
- `--tag`, `-t`

The list output prints each template id, display name, description, and tags.

### `show`

Print the public metadata for a single template:

```powershell
node packages/cli/bin/open-templates.js show webpage/stock-analysis
```

The output is JSON. It excludes internal file bookkeeping fields such as the on-disk metadata path.

### `init`

Copy a template into a target directory:

```powershell
node packages/cli/bin/open-templates.js init lark_doc/weekly_report D:\tmp\weekly-report
node packages/cli/bin/open-templates.js init webpage/stock-analysis D:\tmp\stock-analysis
```

`init` reads `initMode` from metadata:

- `copy-file` copies the entry files listed in metadata
- `copy-dir` copies the whole template directory, while skipping repo-maintenance files such as `metadata.json`, `metadata.md`, `TEMPLATE_META.md`, and `TODO.md`

## Command Behavior

- `list` can filter by family and tag.
- `show` only emits public metadata fields.
- `init` creates the target directory after checking that it is empty.
- unknown commands fail fast with a non-zero exit code.

## Example Workflow

```powershell
node packages/cli/bin/open-templates.js list --family webpage --tag finance
node packages/cli/bin/open-templates.js show webpage/stock-analysis
node packages/cli/bin/open-templates.js init webpage/stock-analysis D:\tmp\stock-analysis
cd D:\tmp\stock-analysis
npm install
npm run dev
```

For field-level metadata rules, see [Metadata schema](metadata-schema.md).
