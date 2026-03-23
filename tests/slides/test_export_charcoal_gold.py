from pathlib import Path
import subprocess
import sys


from tools.slides.sml_parser import parse_presentation


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


def test_parse_charcoal_gold_extracts_deck_structure():
    deck = parse_presentation(Path("templates/slides/charcoal_gold/template.xml"))

    assert deck.width == 960
    assert deck.height == 540
    assert len(deck.slides) == 20
    assert any(node.kind == "text" for slide in deck.slides for node in slide.nodes)
    assert any(node.kind == "image" for slide in deck.slides for node in slide.nodes)
    assert any(node.kind == "line" for slide in deck.slides for node in slide.nodes)
    assert any(node.kind == "shape" for slide in deck.slides for node in slide.nodes)
