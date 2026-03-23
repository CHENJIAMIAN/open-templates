# Slides Export Guide

The slide export path is currently a proof of concept for `charcoal_gold` only. It turns `templates/slides/charcoal_gold/template.xml` into the public artifacts in `examples/slides/charcoal_gold/`.

## Prerequisites

- Python 3.10+
- The repository dependencies needed by the slide exporter
- LibreOffice CLI (`soffice`) on `PATH` if you want PDF output

If `soffice` is unavailable, the exporter can still produce `deck.pptx`, but `deck.pdf` cannot be generated in that environment.

## Export Command

Run the exporter from the repository root:

```powershell
python tools/slides/export_charcoal_gold.py --source templates/slides/charcoal_gold --output examples/slides/charcoal_gold
```

## Artifacts

The exporter writes the following files into the output directory:

- `examples/slides/charcoal_gold/deck.pptx`
- `examples/slides/charcoal_gold/deck.pdf`

The PPTX artifact is the primary output. The PDF artifact is a best-effort conversion of the generated PPTX and depends on LibreOffice being installed locally.

## Current PoC Scope

- `charcoal_gold` is the only supported template.
- The exporter is intentionally narrow and is not a general slides conversion tool yet.
- The public example directory is the canonical place to look for the generated artifacts.

## Known Limitation

PDF generation is environment-blocked when LibreOffice CLI is unavailable. In that case, the export pipeline should be documented as PPTX-only for the current workspace, and PDF export should be treated as a local prerequisite rather than a guaranteed step.
