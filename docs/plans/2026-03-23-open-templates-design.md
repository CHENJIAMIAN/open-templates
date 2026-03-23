# Open Templates Design

**Goal:** Open source the full `templates` collection as a single public project, covering `lark_doc`, `miaoda`, `slides`, and `webpage`, with a lightweight CLI and real showcase outputs that make the repository attractive and usable.

**Scope:** First release includes the four template families, unified metadata, a small CLI for discovery and initialization, and public-facing examples with real output artifacts.

---

## Context

The current template assets are organized under a single local directory tree:

- `templates/lark_doc`
- `templates/miaoda`
- `templates/slides`
- `templates/webpage`

They are not currently exposed through a single public repository with consistent metadata, public documentation, or a documented consumer workflow. A separate local CLI package exists for webpage scaffolding, but it only uses its own bundled templates and does not directly consume the external `templates` tree.

The open source project should therefore be designed as a standalone public product rather than a dump of internal folders.

## Product Positioning

This project should be presented as an AI-era template system rather than a generic asset archive.

Core message:

- one repository
- four template families
- one consistent way to browse and use them
- real, visible outputs instead of abstract template descriptions

The attraction should come from finished artifacts:

- documents people can copy
- UI style prompts that produce visible results
- slides with exported previews
- webpage templates that can run locally and be previewed online

## Repository Shape

Recommended repository layout:

```text
open-templates/
  README.md
  LICENSE
  docs/
    plans/
    guides/
  packages/
    cli/
  templates/
    lark_doc/
    miaoda/
    slides/
    webpage/
  examples/
    lark_doc/
    miaoda/
    slides/
    webpage/
  showcase/
    assets/
```

Notes:

- `templates/` stores the source templates.
- `examples/` stores filled or rendered outputs for public demonstration.
- `packages/cli/` contains a small public CLI.
- `showcase/assets/` stores screenshots, PDFs, thumbnails, and preview media used by the README or future docs site.

## Metadata Model

Every public template should expose a minimal consistent metadata file. This is required so the CLI, docs, and showcase can all operate from the same source of truth.

Suggested fields:

- `name`
- `displayName`
- `family`
- `description`
- `tags`
- `inputs`
- `outputs`
- `preview`
- `visibility`
- `license`
- `authoringNotes`

Family-specific notes:

- `lark_doc`: include intended scenario, expected source inputs, and a finished sample output path
- `miaoda`: include style tags, suggested prompt usage, and generated screenshot paths
- `slides`: include theme tags, output format, and preview image or PDF path
- `webpage`: include runtime, category, preview image, and optional demo URL

## CLI Design

The CLI should be intentionally small. It is not a full template engine. It is a discovery and bootstrap tool.

Recommended commands:

- `open-templates list`
- `open-templates show <template-id>`
- `open-templates init <template-id> <target-dir>`

Behavior:

- `list` reads metadata and prints grouped templates with filters by family and tag.
- `show` displays the template description, expected inputs, and preview asset locations.
- `init` copies a selected template into a target directory.

Non-goals for first release:

- no remote marketplace
- no authentication
- no template rendering pipeline for all families
- no automatic publishing

## Public Example Strategy

Each template family needs real outcomes, not only source templates.

Required example types:

- `lark_doc`: completed example documents in Markdown or exported format
- `miaoda`: before/after prompt samples and rendered screenshots
- `slides`: source theme plus exported PDF or cover images
- `webpage`: runnable example templates with screenshots and at least selected live demos

Suggested first-release showcase targets:

- `lark_doc`: 5 completed documents
- `miaoda`: 12 style examples with screenshots
- `slides`: 6 themes with preview images and PDFs
- `webpage`: 6 to 8 polished runnable examples

## Showcase and README Strategy

The README should lead with visible outcomes, not with internal structure.

Recommended sections:

1. value proposition
2. gallery of real outputs
3. quick start
4. template families
5. highlighted templates
6. CLI usage
7. contribution and licensing

The top of the README should include:

- a one-line summary
- a four-family visual collage
- a minimal install and use flow
- links to examples and previews

## Licensing and Review Gate

Before publishing, every template and example should pass a release review:

- confirm no internal-only names, URLs, or emails remain
- confirm screenshots and outputs are safe to publish
- confirm bundled dependencies have acceptable redistribution terms
- confirm example content is either synthetic or intentionally public

This review is a release blocker. It should happen before any public push.

## Implementation Approach

Recommended delivery order:

1. create public repository scaffold
2. inventory and classify all templates
3. add or normalize metadata
4. select and polish public showcase templates
5. build lightweight CLI
6. write docs and quick starts
7. verify public readiness and publish

This sequence keeps the early work focused on publishable content rather than tooling first.

## Risks

- Too many templates with inconsistent quality will reduce perceived value.
- Missing screenshots or finished outputs will make the repository feel incomplete.
- A CLI that is too ambitious will slow down release without improving adoption.
- Encoding, naming, and internal references may require cleanup before publication.

## Recommendation

Launch as one repository with the full four-family template set, but market a curated first release with a strong subset of public examples. The repository should feel complete, while the README should emphasize the best templates and real outputs rather than raw count.
