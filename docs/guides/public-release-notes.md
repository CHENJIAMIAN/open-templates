# Public Release Notes

Release date: `2026-03-23`

## Summary

This first public release opens the full `open-templates` repository with four template families:

- `lark_doc` for Markdown-first documents
- `miaoda` for prompt-driven UI style templates
- `slides` for presentation theme bundles
- `webpage` for runnable front-end templates

The release includes:

- 108 public template directories with normalized metadata
- a metadata-driven CLI for listing, inspecting, and initializing templates
- real public examples for every family
- curated preview assets for selected templates
- public guides for discovery, usage, and release checks

## What Users Can Do

From a local checkout:

```powershell
node packages/cli/bin/open-templates.js list
node packages/cli/bin/open-templates.js show webpage/stock-analysis
node packages/cli/bin/open-templates.js init webpage/stock-analysis D:\tmp\stock-analysis
```

Users can browse the catalog, inspect public metadata, and copy templates into a clean target directory without pulling repo-maintenance files into the initialized output.

## Included Public Examples

The first release includes curated examples across all four families:

- `lark_doc`: filled Markdown examples such as `weekly_report` and `industry_research`
- `miaoda`: prompt packs and style boards such as `cyberpunk_hud` and `editorial_brutalism`
- `slides`: curated preview-ready theme examples such as `charcoal_gold` and `professional_blue_white`
- `webpage`: companion examples and preview assets such as `industrial-design-portfolio` and `novasphere-launch`

## Verification Snapshot

The following checks were run on `2026-03-23`:

- `node packages/cli/scripts/validate-metadata.mjs`: passed
- `npm test` in `packages/cli`: passed with 6 tests
- example family presence checks: passed
- README quick-start checks: passed

## Known Limitations

- Not every template has a curated public example yet.
- Not every template has preview assets yet.
- `validate-metadata.mjs --strict` is expected to fail until full example and preview coverage is added for all templates.
- The showcase is intentionally curated for launch quality rather than exhaustive for every template on day one.

## Recommended Public Positioning

Describe this release as:

- a full-source public template repository
- a curated first showcase across four template families
- a contributor-friendly base for adding more public examples and preview coverage over time
