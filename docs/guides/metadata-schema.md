# Metadata Schema

This repository uses one public `metadata.json` file per template directory. The goal is to keep the schema small enough for the CLI to read, while still carrying enough information for browsing, previewing, and initializing templates across all four families.

## Common Fields

Every template metadata file should include these fields:

- `id`: stable machine-friendly identifier in the form `<family>/<template-name>`
- `family`: one of `lark_doc`, `miaoda`, `slides`, `webpage`
- `name`: directory slug used on disk
- `displayName`: human-friendly title for listings and detail views
- `description`: one short summary sentence
- `tags`: array of short filter tags
- `sourcePath`: repo-relative path to the template directory
- `entryFiles`: array of paths relative to the template directory that point at the primary files
- `initMode`: either `copy-file` or `copy-dir`
- `visibility`: typically `public`

## Optional Fields

These fields are supported when the family can expose them:

- `examplePath`: repo-relative path to a filled example under `examples/`
- `preview`: object containing preview asset paths under `showcase/assets/`
- `runtime`: runtime hint for runnable templates, especially `webpage`
- `outputType`: output hint for document-oriented templates
- `artifactHints`: array of short usage notes for the CLI `show` output
- `category`: broader grouping such as `dashboard`, `report`, or `theme`
- `version`: template version string

## Path Rules

All paths in metadata must be repo-relative.

- `sourcePath` must point inside `templates/`
- `entryFiles` must stay inside the template directory and must not escape upward
- `examplePath`, when present, must point inside `examples/`
- `preview` paths, when present, must point inside `showcase/assets/`

Absolute paths are not allowed. `../` escapes are not allowed. The intent is that metadata remains portable across machines and environments.

## Family Notes

`lark_doc`
- Usually a single Markdown file as the primary artifact
- `outputType` should typically be `markdown`

`miaoda`
- Usually a single `ui-template.md`
- `outputType` should describe the generated prompt or visual artifact

`slides`
- Usually a theme bundle with multiple supporting files
- `outputType` should describe the deck or theme artifact

`webpage`
- Usually a runnable site directory
- `runtime` should describe the build/runtime flavor
- `initMode` will usually be `copy-dir`

## Minimal Example

```json
{
  "id": "webpage/stock-analysis",
  "family": "webpage",
  "name": "stock-analysis",
  "displayName": "Stock Analysis",
  "description": "Runnable dashboard template for stock analysis.",
  "tags": ["dashboard", "finance", "echarts"],
  "sourcePath": "templates/webpage/stock-analysis",
  "entryFiles": ["index.html", "package.json", "vite.config.js"],
  "examplePath": "examples/webpage/stock-analysis",
  "preview": {
    "cover": "showcase/assets/webpage/stock-analysis/cover.png"
  },
  "initMode": "copy-dir",
  "visibility": "public",
  "runtime": "static"
}
```

## Validation Expectation

The CLI validator checks every discovered `metadata.json` file under `templates/`, reports all validation errors in one run, and exits with a non-zero status if any file fails.
