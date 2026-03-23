from pathlib import Path
import subprocess
import sys

import pytest

from tools.slides.sml_parser import build_asset_index, parse_presentation, resolve_asset_token


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


def test_asset_resolution_maps_sml_token_to_local_png():
    asset_index = build_asset_index(Path("templates/slides/charcoal_gold"))
    path = resolve_asset_token(asset_index, "FJLsbVgEEogLRtxWLW2cOe3Tn7f")

    assert path.name.endswith("FJLsbVgEEogLRtxWLW2cOe3Tn7f.png")


def test_asset_resolution_fails_for_unknown_token():
    asset_index = build_asset_index(Path("templates/slides/charcoal_gold"))

    with pytest.raises(KeyError):
        resolve_asset_token(asset_index, "missing-token")
