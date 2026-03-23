from __future__ import annotations

from pathlib import Path

from tools.slides.sml_parser import Presentation


def write_presentation(deck: Presentation, template_dir: Path, output_path: Path) -> None:
    raise NotImplementedError("PPTX writing is not implemented yet")
