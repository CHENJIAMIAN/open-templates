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
```

## Verification Status

Verification run date: `2026-03-23`

- `node packages/cli/scripts/validate-metadata.mjs`: PASS
- `npm test` in `packages/cli`: PASS
- example directory presence check: PASS
- README documentation check: PASS

## Known Release Limits

- The default metadata validator is release-safe for a curated public launch. It passes required schema and path-shape checks.
- The validator currently emits `283 warnings` for templates that do not yet have curated public examples or preview assets.
- A stricter release gate is available through `node packages/cli/scripts/validate-metadata.mjs --strict`.
- Do not claim full preview coverage across all 108 templates until strict mode passes.
- The current public launch should be described as a curated first release with complete repository coverage and selective showcase coverage.
