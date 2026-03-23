from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class Presentation:
    source: Path
    width: int = 0
    height: int = 0
    slides: list["Slide"] = field(default_factory=list)


@dataclass
class Slide:
    nodes: list["Node"] = field(default_factory=list)


@dataclass
class Node:
    kind: str


def parse_presentation(path: Path) -> Presentation:
    raise NotImplementedError("SML parsing is not implemented yet")


def build_asset_index(template_dir: Path) -> dict[str, Path]:
    raise NotImplementedError("asset indexing is not implemented yet")


def resolve_asset_token(asset_index: dict[str, Path], token: str) -> Path:
    raise NotImplementedError("asset token resolution is not implemented yet")
