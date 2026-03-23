# AI Templates Open Source Weekly Report

**Period:** 2026-03-16 to 2026-03-22

## Summary

This week focused on turning the local template collection into a public repository that people can actually browse and use. The work was split into repository scaffolding, inventory/release documentation, metadata normalization, and the first visible showcase assets.

## Goals

- Open source the four template families in a public-friendly shape.
- Keep the CLI and metadata small enough to stay maintainable.
- Produce real examples that make the repository feel finished, not theoretical.

## Progress

### Completed

- Initialized the public repository structure and git workflow.
- Added the inventory guide and the release checklist.
- Normalized metadata for all template families and validated the schema.
- Added the first public example documents and preview assets for `lark_doc`.

### In Progress

- Building the remaining showcase assets for `miaoda`, `slides`, and `webpage`.
- Adding the CLI commands that will let people browse and initialize templates.

## Key Activities

### Repository and governance

- Confirmed the repo-local worktree setup and kept the public project isolated from the source stash.
- Documented the public release rules so that future contributors know what is safe to publish.

### Metadata and validation

- Standardized the per-template `metadata.json` format.
- Added a validator with a strict mode for release readiness.
- Kept default validation lightweight so it does not block the showcase buildout.

### Showcase preparation

- Created readable example documents for the first three `lark_doc` templates.
- Built preview covers as SVG files so the examples can be referenced immediately.

## Meetings

- Weekly check-in on open source scope and release sequencing.
- Internal review on metadata shape and preview asset strategy.

## Tasks

| Status | Task | Owner | Notes |
|---|---|---|---|
| Done | Repository scaffold | Core | Git repo and worktree established |
| Done | Inventory docs | Core | Published the source inventory and release checklist |
| Done | Metadata normalization | Core | All 108 metadata files validate |
| Done | Weekly report showcase | Core | Example and SVG preview complete |
| In progress | Remaining family showcases | Core | `miaoda`, `slides`, `webpage` |

## Risks

- The repository can look complete before all assets are filled in, so release messaging needs to stay explicit.
- The current showcase is synthetic by design; it needs a clear note that the example content is illustrative.

## Next Week

- Finish public examples for the other three families.
- Add the lightweight CLI commands for listing, showing, and initializing templates.
- Prepare the README gallery so the best examples are visible immediately.
