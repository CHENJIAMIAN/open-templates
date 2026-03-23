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
