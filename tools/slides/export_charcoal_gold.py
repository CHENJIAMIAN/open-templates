from __future__ import annotations

import argparse
import sys
from pathlib import Path

if __package__ in {None, ""}:
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from tools.slides.pptx_writer import write_presentation
from tools.slides.sml_parser import parse_presentation


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export the charcoal_gold slide template.")
    parser.add_argument("--source", required=True, type=Path, help="Source template directory.")
    parser.add_argument("--output", required=True, type=Path, help="Output directory for artifacts.")
    return parser.parse_args(argv)


def export_charcoal_gold(source_dir: Path, output_dir: Path) -> None:
    if not source_dir.exists():
        raise FileNotFoundError(f"source directory does not exist: {source_dir}")
    output_dir.mkdir(parents=True, exist_ok=True)
    deck = parse_presentation(source_dir / "template.xml")
    write_presentation(deck, source_dir, output_dir / "deck.pptx")


def main(argv: list[str] | None = None) -> int:
    try:
        args = parse_args(argv)
        export_charcoal_gold(args.source, args.output)
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
