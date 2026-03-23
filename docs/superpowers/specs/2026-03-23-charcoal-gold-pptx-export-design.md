# Charcoal Gold PPTX Export Design

Date: `2026-03-23`

## Goal

Build a public, local, reproducible export path for one `slides` template:

- input: `templates/slides/charcoal_gold`
- output: `examples/slides/charcoal_gold/deck.pptx`
- output: `examples/slides/charcoal_gold/deck.pdf`

The export must not depend on Feishu, aily, or any private service.

## Context

The existing `slides` templates are not native PowerPoint templates. They use a Feishu/Lark slide markup namespace:

- `http://www.larkoffice.com/sml/2.0`

The `charcoal_gold` template contains:

- `template.xml` as a full deck source
- `slides/slide_*.xml` split slide definitions
- `templates/template_*.xml` layout variants
- `slide_p*.png` image assets
- `metadata.md` as human-readable slide inventory

This means the task is not "export an existing `.pptx`". It is "implement a public converter from a subset of SML to PowerPoint".

## Scope

This phase is a proof of concept for one template only: `charcoal_gold`.

In scope:

- parse `template.xml`
- map supported SML elements into a `.pptx`
- produce a `.pdf` from the generated `.pptx`
- document prerequisites and commands
- save generated artifacts in `examples/slides/charcoal_gold/`

Out of scope:

- general support for all `slides` templates
- exact parity with Feishu rendering
- support for every SML element
- editing the source templates

## Proposed Export Path

1. Parse `templates/slides/charcoal_gold/template.xml`
2. Convert supported slide objects into a PowerPoint model
3. Generate `deck.pptx` with `python-pptx`
4. Convert `deck.pptx` to `deck.pdf` with a local office converter
5. Write documentation and verification steps

Recommended implementation:

- parser/orchestrator: Python
- `.pptx` generation: `python-pptx`
- `.pdf` generation: LibreOffice CLI if available

Reasoning:

- `python-pptx` is public, scriptable, and fits the artifact target
- Python XML parsing is straightforward and reliable for the SML source
- PDF export is better delegated to an office engine than recreated manually

## Supported Element Subset

The first pass only needs the subset visible in `charcoal_gold` and required for a credible deck export:

- slide size
- slide background fill color
- text shapes
- text runs with basic font color, size, family, alignment, bold
- image shapes using local `slide_p*.png` assets
- line elements

Deferred unless required by the template during implementation:

- crop fidelity beyond a basic image fit
- advanced text autosizing
- alpha blending parity
- grouped objects
- non-solid fills
- hyperlinks
- speaker notes

## File Layout

Planned files:

- `tools/slides/export_charcoal_gold.py`
- `tools/slides/sml_parser.py`
- `tools/slides/pptx_writer.py`
- `tools/slides/pdf_export.py`
- `examples/slides/charcoal_gold/deck.pptx`
- `examples/slides/charcoal_gold/deck.pdf`
- `docs/guides/slides-export.md`

If implementation is smaller than expected, the parser/writer modules can start in one file and split later.

## Data Flow

1. Read `template.xml`
2. Extract presentation size and slide list
3. For each slide:
   - create PowerPoint slide
   - apply background
   - map objects in order
4. Resolve image `src` ids against local `slide_p*.png` files
5. Save `deck.pptx`
6. Invoke PDF export if the office converter is present

## Asset Resolution

Image nodes in SML use opaque `src` ids. In `charcoal_gold`, the local asset filenames embed those ids.

Resolver rule:

- build an index from local filenames like `slide_<token>.png`
- match SML `img/@src` to the `<token>` suffix in the local file set

If an image token cannot be resolved:

- fail the export with a clear error

This is preferable to silently dropping visual content.

## Error Handling

Hard failures:

- missing `template.xml`
- malformed XML
- unsupported required asset lookup
- `.pptx` write failure

Soft warnings:

- unsupported optional attributes ignored
- styling fields dropped because no public PowerPoint equivalent exists
- PDF export skipped because LibreOffice CLI is unavailable

## Verification

Success criteria for this phase:

- `deck.pptx` is generated locally from source
- `deck.pdf` is generated locally from the `.pptx` when the PDF backend is available
- the command is repeatable from a clean checkout
- the generated deck preserves the recognizable structure of the `charcoal_gold` template

Verification commands will include:

- export command
- file existence checks for `.pptx` and `.pdf`
- a short smoke test that the generated PPTX opens and contains the expected slide count

## Tradeoffs

Known tradeoffs in this first version:

- layout fidelity will be approximate rather than bit-perfect
- Feishu-specific semantics will be reduced to a PowerPoint-compatible subset
- the implementation will likely be template-biased toward `charcoal_gold`

This is acceptable because the immediate goal is feasibility and a public reference implementation.

## Recommendation

Proceed with a single-template PoC for `charcoal_gold`, using Python as the converter runtime and `python-pptx` as the output backend. Treat this as the reference exporter that later templates can expand from once the supported SML subset is proven.
