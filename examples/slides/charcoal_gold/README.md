# Charcoal Gold

This example package is the public-facing companion for the `charcoal_gold` slide template.

## Purpose

Use this template for premium business decks, executive summaries, investor updates, and polished project reports.

## Public Artifacts

- `examples/slides/charcoal_gold/deck.pptx`
- `examples/slides/charcoal_gold/deck.pdf` when LibreOffice CLI is available

The exporter command that produces these artifacts is documented in [Slides export guide](../../docs/guides/slides-export.md).

## Included Assets

- `showcase/assets/slides/charcoal_gold/cover.png`
- `showcase/assets/slides/charcoal_gold/gallery-1.png`
- A curated preview subset copied from `templates/slides/charcoal_gold`

## Notes

The showcase keeps only the curated preview assets needed for the public example, which keeps the repository lighter while still matching the metadata paths.

The public exporter for this template is scoped to `charcoal_gold` and writes its outputs into this directory. `deck.pptx` is expected from every run, while `deck.pdf` requires LibreOffice CLI (`soffice`) to be available on the local PATH.
