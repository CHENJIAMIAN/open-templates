# Charcoal Gold PPTX Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local public export pipeline that converts `templates/slides/charcoal_gold/template.xml` into `examples/slides/charcoal_gold/deck.pptx` and `examples/slides/charcoal_gold/deck.pdf`.

**Architecture:** The exporter is a Python-based pipeline with four focused units: SML parsing, image asset resolution, PPTX writing, and PDF conversion. The first version is intentionally template-scoped to `charcoal_gold` and only supports the subset of SML elements required by that source deck.

**Tech Stack:** Python 3.10+, `python-pptx`, `xml.etree.ElementTree`, LibreOffice CLI, Markdown docs

---

### Task 1: Scaffold Export Tooling And Failing Integration Test

**Files:**
- Create: `tools/slides/export_charcoal_gold.py`
- Create: `tools/slides/sml_parser.py`
- Create: `tools/slides/pptx_writer.py`
- Create: `tools/slides/pdf_export.py`
- Create: `tests/slides/test_export_charcoal_gold.py`
- Modify: `examples/slides/charcoal_gold/README.md`

- [ ] **Step 1: Write the failing test**

Create `tests/slides/test_export_charcoal_gold.py` with an integration-oriented smoke test that expects the exporter entrypoint to produce both artifact files in a temporary directory.

```python
from pathlib import Path
import subprocess
import sys


def test_export_charcoal_gold_creates_pptx_and_pdf(tmp_path: Path):
    source_dir = Path("templates/slides/charcoal_gold")
    output_dir = tmp_path / "out"

    result = subprocess.run(
        [
            sys.executable,
            "tools/slides/export_charcoal_gold.py",
            "--source",
            str(source_dir),
            "--output",
            str(output_dir),
        ],
        capture_output=True,
        text=True,
    )

    assert result.returncode == 0, result.stderr
    assert (output_dir / "deck.pptx").exists()
    assert (output_dir / "deck.pdf").exists()
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -v`
Expected: FAIL because the exporter files do not yet exist or the CLI exits non-zero.

- [ ] **Step 3: Write minimal implementation**

Create the four Python files with placeholder functions and a CLI entrypoint that validates arguments, creates the output directory, and exits with a clear `NotImplementedError`.

- [ ] **Step 4: Run test to verify it still fails for the expected reason**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -v`
Expected: FAIL with a controlled not-implemented error from the exporter, not an import error.

- [ ] **Step 5: Commit**

```bash
git add tools/slides/export_charcoal_gold.py tools/slides/sml_parser.py tools/slides/pptx_writer.py tools/slides/pdf_export.py tests/slides/test_export_charcoal_gold.py examples/slides/charcoal_gold/README.md
git commit -m "test: scaffold charcoal gold exporter"
```

### Task 2: Parse Charcoal Gold SML Into A Structured Deck Model

**Files:**
- Modify: `tools/slides/sml_parser.py`
- Modify: `tests/slides/test_export_charcoal_gold.py`

- [ ] **Step 1: Write the failing test**

Add parser-level tests that load `templates/slides/charcoal_gold/template.xml` and assert:

- presentation width and height are read
- slide count matches the source deck
- at least one text element, one image element, one line element, and one geometric shape are recognized

```python
from pathlib import Path
from tools.slides.sml_parser import parse_presentation


def test_parse_charcoal_gold_extracts_deck_structure():
    deck = parse_presentation(Path("templates/slides/charcoal_gold/template.xml"))
    assert deck.width == 960
    assert deck.height == 540
    assert len(deck.slides) == 20
    assert any(node.kind == "text" for slide in deck.slides for node in slide.nodes)
    assert any(node.kind == "image" for slide in deck.slides for node in slide.nodes)
    assert any(node.kind == "line" for slide in deck.slides for node in slide.nodes)
    assert any(node.kind == "shape" for slide in deck.slides for node in slide.nodes)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -k parse -v`
Expected: FAIL because the parser does not yet return the expected model.

- [ ] **Step 3: Write minimal implementation**

Implement `tools/slides/sml_parser.py` with:

- small dataclasses for deck, slide, and node records
- XML parsing for the SML namespace
- support for:
  - slide background fill color
  - `shape type="text"`
  - `img`
  - `line`
  - geometric `shape` types `rect`, `round-rect`, `diamond`, `ellipse`

Keep unsupported attributes out of the initial model unless needed by `charcoal_gold`.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -k parse -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tools/slides/sml_parser.py tests/slides/test_export_charcoal_gold.py
git commit -m "feat: parse charcoal gold sml deck"
```

### Task 3: Resolve Local Image Assets Deterministically

**Files:**
- Modify: `tools/slides/sml_parser.py`
- Modify: `tests/slides/test_export_charcoal_gold.py`

- [ ] **Step 1: Write the failing test**

Add tests for image token resolution from `img/@src` to local `slide_*.png` files.

```python
from pathlib import Path
from tools.slides.sml_parser import build_asset_index, resolve_asset_token


def test_asset_resolution_maps_sml_token_to_local_png():
    asset_index = build_asset_index(Path("templates/slides/charcoal_gold"))
    path = resolve_asset_token(asset_index, "FJLsbVgEEogLRtxWLW2cOe3Tn7f")
    assert path.name.endswith("FJLsbVgEEogLRtxWLW2cOe3Tn7f.png")


def test_asset_resolution_fails_for_unknown_token():
    asset_index = build_asset_index(Path("templates/slides/charcoal_gold"))
    with pytest.raises(KeyError):
        resolve_asset_token(asset_index, "missing-token")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -k asset -v`
Expected: FAIL because asset indexing and lookup are not implemented.

- [ ] **Step 3: Write minimal implementation**

Implement:

- `build_asset_index(template_dir)`
- `resolve_asset_token(asset_index, token)`

Behavior:

- index files matching `slide_*.png`
- match SML image tokens to the filename suffix
- raise a clear exception for missing tokens

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -k asset -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tools/slides/sml_parser.py tests/slides/test_export_charcoal_gold.py
git commit -m "feat: resolve charcoal gold image assets"
```

### Task 4: Generate PPTX From The Parsed Deck Model

**Files:**
- Modify: `tools/slides/pptx_writer.py`
- Modify: `tools/slides/export_charcoal_gold.py`
- Modify: `tests/slides/test_export_charcoal_gold.py`

- [ ] **Step 1: Write the failing test**

Add a writer test that:

- parses `charcoal_gold`
- writes a `.pptx` to a temporary directory
- asserts the file exists and is non-empty

Open the generated package with `python-pptx` and assert:

- slide count matches the source deck
- every generated slide contains at least one shape when the source slide has nodes
- the total number of placed pictures matches the parsed image node count
- the total number of line and geometric shapes is not lower than the parsed line and shape node counts

```python
from pathlib import Path
from pptx import Presentation
from tools.slides.sml_parser import parse_presentation
from tools.slides.pptx_writer import write_presentation


def test_write_pptx_preserves_slide_count(tmp_path: Path):
    deck = parse_presentation(Path("templates/slides/charcoal_gold/template.xml"))
    output = tmp_path / "deck.pptx"
    write_presentation(deck, Path("templates/slides/charcoal_gold"), output)
    prs = Presentation(output)
    assert output.exists()
    assert len(prs.slides) == len(deck.slides)
    expected_images = sum(1 for slide in deck.slides for node in slide.nodes if node.kind == "image")
    expected_lines = sum(1 for slide in deck.slides for node in slide.nodes if node.kind == "line")
    expected_shapes = sum(1 for slide in deck.slides for node in slide.nodes if node.kind == "shape")
    actual_images = sum(1 for slide in prs.slides for shape in slide.shapes if shape.shape_type == 13)
    actual_freeform = sum(1 for slide in prs.slides for shape in slide.shapes if shape.shape_type in {1, 9, 17})
    assert actual_images == expected_images
    assert actual_freeform >= expected_lines + expected_shapes
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -k pptx -v`
Expected: FAIL because the writer is not implemented.

- [ ] **Step 3: Write minimal implementation**

Implement `tools/slides/pptx_writer.py` with:

- slide size mapping to PowerPoint dimensions
- background fill application
- text box creation with basic styling
- image placement from resolved local assets
- line creation
- geometric shape creation for `rect`, `round-rect`, `diamond`, `ellipse`

Update `export_charcoal_gold.py` to call parser + writer and save `deck.pptx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -k pptx -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tools/slides/pptx_writer.py tools/slides/export_charcoal_gold.py tests/slides/test_export_charcoal_gold.py
git commit -m "feat: generate charcoal gold pptx"
```

### Task 5: Export PDF From The Generated PPTX

**Files:**
- Modify: `tools/slides/pdf_export.py`
- Modify: `tools/slides/export_charcoal_gold.py`
- Modify: `tests/slides/test_export_charcoal_gold.py`

- [ ] **Step 1: Write the failing test**

Add a PDF export test that either:

- runs only when LibreOffice CLI is present, or
- skips with a clear condition if the binary is missing

The positive path must generate a real `.pptx` through the Task 4 writer path and then assert that `deck.pdf` is created from that output.

```python
import shutil
from pathlib import Path
import pytest
from tools.slides.sml_parser import parse_presentation
from tools.slides.pptx_writer import write_presentation
from tools.slides.pdf_export import export_pdf


@pytest.mark.skipif(shutil.which("soffice") is None, reason="LibreOffice CLI not installed")
def test_export_pdf_creates_output(tmp_path: Path):
    pptx_path = tmp_path / "deck.pptx"
    deck = parse_presentation(Path("templates/slides/charcoal_gold/template.xml"))
    write_presentation(deck, Path("templates/slides/charcoal_gold"), pptx_path)
    pdf_path = tmp_path / "deck.pdf"
    export_pdf(pptx_path, pdf_path)
    assert pdf_path.exists()
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -k pdf -v`
Expected: FAIL on the positive path because `export_pdf` is not implemented, or SKIP if LibreOffice is unavailable.

- [ ] **Step 3: Write minimal implementation**

Implement `tools/slides/pdf_export.py` with:

- `export_pdf(pptx_path, pdf_path)`
- subprocess invocation of LibreOffice CLI
- deterministic output path handling
- clear failure when the converter exits non-zero

Update `export_charcoal_gold.py` so the main CLI produces both `.pptx` and `.pdf`.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m pytest tests/slides/test_export_charcoal_gold.py -k pdf -v`
Expected: PASS or SKIP, depending on local LibreOffice availability

- [ ] **Step 5: Commit**

```bash
git add tools/slides/pdf_export.py tools/slides/export_charcoal_gold.py tests/slides/test_export_charcoal_gold.py
git commit -m "feat: export charcoal gold pdf"
```

### Task 6: Produce Public Example Artifacts And Usage Docs

**Files:**
- Modify: `examples/slides/charcoal_gold/README.md`
- Create: `docs/guides/slides-export.md`
- Modify: `docs/guides/examples.md`
- Modify: `README.md`

- [ ] **Step 1: Write the failing test**

Add documentation checks that assert:

- `slides-export.md` mentions the exporter command
- `examples/slides/charcoal_gold/README.md` references `deck.pptx` and `deck.pdf`
- top-level docs link to the new slides export guide

```powershell
Select-String -Path 'docs/guides/slides-export.md' -Pattern 'export_charcoal_gold.py|LibreOffice|deck.pptx|deck.pdf'
Select-String -Path 'examples/slides/charcoal_gold/README.md' -Pattern 'deck.pptx|deck.pdf'
Select-String -Path 'README.md' -Pattern 'slides-export'
```

- [ ] **Step 2: Run test to verify it fails**

Run the `Select-String` checks above.
Expected: FAIL because the docs do not yet describe the export pipeline.

- [ ] **Step 3: Write minimal implementation**

Document:

- prerequisites
- export command
- artifact locations
- current PoC scope: `charcoal_gold` only
- known fidelity limits

- [ ] **Step 4: Run test to verify it passes**

Run the same `Select-String` checks.
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add examples/slides/charcoal_gold/README.md docs/guides/slides-export.md docs/guides/examples.md README.md
git commit -m "docs: add slides export guide"
```

### Task 7: End-To-End Verification And Artifact Refresh

**Files:**
- Modify: `examples/slides/charcoal_gold/deck.pptx`
- Modify: `examples/slides/charcoal_gold/deck.pdf`
- Modify: `docs/guides/release-checklist.md`

- [ ] **Step 1: Write the failing test**

Define final acceptance as a full export run from source plus artifact existence checks.

```powershell
python tools/slides/export_charcoal_gold.py --source templates/slides/charcoal_gold --output examples/slides/charcoal_gold
if (-not (Test-Path 'examples/slides/charcoal_gold/deck.pptx')) { throw 'Missing deck.pptx' }
if (-not (Test-Path 'examples/slides/charcoal_gold/deck.pdf')) { throw 'Missing deck.pdf' }
```

- [ ] **Step 2: Run test to verify it fails**

Run the acceptance commands before the full implementation is complete.
Expected: FAIL until the exporter and docs are in place.

- [ ] **Step 3: Write minimal implementation**

Generate fresh public artifacts into `examples/slides/charcoal_gold/` and update the release checklist to mention the exporter verification command.

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
python -m pytest tests/slides/test_export_charcoal_gold.py -v
python tools/slides/export_charcoal_gold.py --source templates/slides/charcoal_gold --output examples/slides/charcoal_gold
```

Expected:

- tests PASS, except PDF-specific skip if LibreOffice is not installed
- exporter exits 0
- `examples/slides/charcoal_gold/deck.pptx` exists
- `examples/slides/charcoal_gold/deck.pdf` exists when LibreOffice is installed

- [ ] **Step 5: Commit**

```bash
git add tests/slides/test_export_charcoal_gold.py tools/slides/export_charcoal_gold.py tools/slides/sml_parser.py tools/slides/pptx_writer.py tools/slides/pdf_export.py examples/slides/charcoal_gold/deck.pptx examples/slides/charcoal_gold/deck.pdf docs/guides/release-checklist.md
git commit -m "feat: add charcoal gold export pipeline"
```
