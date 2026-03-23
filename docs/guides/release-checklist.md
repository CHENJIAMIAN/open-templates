# Release Checklist

Use this checklist before publishing the public template repository.

## Content Safety

- Confirm every template family can be published without internal-only names, URLs, or emails.
- Review sample text for confidential or company-specific references.
- Verify screenshots, PDFs, and preview images are safe to redistribute.
- Remove temporary files, generated artifacts, and editor backup files.

## Template Quality

- Confirm the inventory matches the actual folder structure.
- Check that each template has a clear name, purpose, and public use case.
- Normalize metadata fields so the CLI and docs can read them consistently.
- Keep the first release curated if a template is incomplete or too noisy.

## Dependencies and Licensing

- Review third-party licenses for any bundled assets or copied runtime dependencies.
- Confirm redistributable examples use compatible licenses.
- Check that copied package metadata does not point to private registries or internal packages.
- Verify the project license is present and matches the intended public release policy.

## Family-Specific Review

- `lark_doc`: confirm document examples are clean, useful, and free of private data.
- `miaoda`: confirm visual samples have good contrast, clear styling, and easy-to-read captions.
- `slides`: confirm preview decks export correctly and the theme names are understandable.
- `webpage`: confirm templates build or preview correctly and the example output is representative.

## Public Launch Readiness

- Verify the README links to the inventory and release checklist.
- Verify the repository has at least one real example per family before announcing it publicly.
- Prepare a short changelog entry describing the four families and their intended uses.
- Record any known limitations so contributors do not treat the repository as production-ready by default.

## Release Verification Commands

Run these commands from the repository root unless noted otherwise:

```powershell
node packages/cli/scripts/validate-metadata.mjs
cd packages/cli
npm test
cd ..
$required = @(
  'examples/lark_doc',
  'examples/miaoda',
  'examples/slides',
  'examples/webpage',
  'showcase/assets'
)
foreach ($p in $required) {
  if (-not (Test-Path $p)) { throw "Missing $p" }
}
Select-String -Path 'README.md' -Pattern 'Quick Commands|lark_doc|miaoda|slides|webpage|open-templates.js list'
python tools/slides/export_charcoal_gold.py --source templates/slides/charcoal_gold --output examples/slides/charcoal_gold
if (-not (Test-Path 'examples/slides/charcoal_gold/deck.pptx')) { throw 'Missing examples/slides/charcoal_gold/deck.pptx' }
if (Get-Command soffice -ErrorAction SilentlyContinue) {
  if (-not (Test-Path 'examples/slides/charcoal_gold/deck.pdf')) { throw 'Missing examples/slides/charcoal_gold/deck.pdf' }
} else {
  Write-Host 'Skipping deck.pdf existence check because soffice is unavailable on this machine.'
}
```

## Verification Status

Verification run date: `2026-03-23`

- `node packages/cli/scripts/validate-metadata.mjs`: PASS
- `npm test` in `packages/cli`: PASS
- example directory presence check: PASS
- README documentation check: PASS
- `python tools/slides/export_charcoal_gold.py --source templates/slides/charcoal_gold --output examples/slides/charcoal_gold`: PASS for `deck.pptx`, PDF blocked by missing `soffice`
- `python -m pytest tests/slides/test_export_charcoal_gold.py -v`: PASS with 1 PDF test skipped
- `examples/slides/charcoal_gold/deck.pptx`: PRESENT
- `examples/slides/charcoal_gold/deck.pdf`: MISSING on this machine because LibreOffice CLI is unavailable

## Known Release Limits

- The default metadata validator is release-safe for a curated public launch. It passes required schema and path-shape checks.
- The validator currently emits `283 warnings` for templates that do not yet have curated public examples or preview assets.
- A stricter release gate is available through `node packages/cli/scripts/validate-metadata.mjs --strict`.
- Do not claim full preview coverage across all 108 templates until strict mode passes.
- The current public launch should be described as a curated first release with complete repository coverage and selective showcase coverage.
- Charcoal Gold PDF export is blocked on this machine because `soffice` is not on PATH; refresh `examples/slides/charcoal_gold/deck.pdf` after LibreOffice is available.
