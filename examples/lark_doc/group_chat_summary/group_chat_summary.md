# Open Templates Launch Chat Summary

**Window:** 2026-03-22 09:00 to 2026-03-22 11:15

## Background

A working group discussed how to publish the `open-templates` repository without turning it into a raw dump of source folders. The discussion centered on scope, showcase quality, and the minimum useful CLI.

## Main Decisions

### Repository shape

- Keep one public repository with four template families.
- Use a single metadata schema so the CLI and docs can stay consistent.
- Keep the source tree and the showcase tree separate.

### Release strategy

- Launch with curated examples rather than trying to expose everything at once.
- Prioritize examples that make the project feel finished and credible.
- Use synthetic but realistic content so the examples are safe to publish.

### CLI strategy

- Keep the first CLI small.
- Support list, show, and init before adding anything more ambitious.
- Read metadata from the repository instead of inventing family-specific heuristics.

## Action Items

| Owner | Action | Due |
|---|---|---|
| Core | Finish the first showcase examples for `lark_doc` | 2026-03-23 |
| Core | Add example outputs and previews for `miaoda` | 2026-03-24 |
| Core | Copy slide previews into `showcase/assets` | 2026-03-24 |
| Core | Add runnable webpage showcase outputs | 2026-03-25 |
| Core | Implement the CLI commands | 2026-03-26 |

## Risks and Questions

- We need to keep the public examples obviously synthetic so nobody confuses them with actual internal records.
- The README needs a clean gallery or the repository will still look incomplete.
- The slide and webpage showcase work is more asset-heavy than the `lark_doc` examples, so sequencing matters.

## Resolution

The group agreed that the `open-templates` repo should be framed as a curated system of reusable starting points. The public example documents should prove that the repository can produce finished output, not just template skeletons.
