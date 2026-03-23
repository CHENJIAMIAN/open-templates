from __future__ import annotations

import xml.etree.ElementTree as ET
from dataclasses import dataclass, field
from pathlib import Path

SML_NAMESPACE = "http://www.larkoffice.com/sml/2.0"
NS = {"sml": SML_NAMESPACE}


@dataclass
class Presentation:
    source: Path
    width: int = 0
    height: int = 0
    slides: list["Slide"] = field(default_factory=list)


@dataclass
class Slide:
    background_color: str | None = None
    nodes: list["Node"] = field(default_factory=list)


@dataclass
class Node:
    kind: str
    x: float | None = None
    y: float | None = None
    width: float | None = None
    height: float | None = None
    src: str | None = None
    shape_type: str | None = None
    text: str | None = None
    fill_color: str | None = None
    start_x: float | None = None
    start_y: float | None = None
    end_x: float | None = None
    end_y: float | None = None
    border_color: str | None = None
    border_width: float | None = None


def parse_presentation(path: Path) -> Presentation:
    tree = ET.parse(path)
    root = tree.getroot()
    presentation = Presentation(
        source=path,
        width=int(float(root.attrib.get("width", "0"))),
        height=int(float(root.attrib.get("height", "0"))),
    )

    for slide_element in root.findall("sml:slide", NS):
        presentation.slides.append(_parse_slide(slide_element))

    return presentation


def _parse_slide(slide_element: ET.Element) -> Slide:
    slide = Slide(background_color=_parse_slide_background(slide_element))
    data_element = slide_element.find("sml:data", NS)
    if data_element is None:
        return slide

    for child in list(data_element):
        node = _parse_node(child)
        if node is not None:
            slide.nodes.append(node)

    return slide


def _parse_slide_background(slide_element: ET.Element) -> str | None:
    fill_color = slide_element.find("sml:style/sml:fill/sml:fillColor", NS)
    if fill_color is None:
        return None
    return fill_color.attrib.get("color")


def _parse_node(element: ET.Element) -> Node | None:
    local_name = _local_name(element.tag)
    if local_name == "line":
        return _parse_line(element)
    if local_name == "img":
        return _parse_image(element)
    if local_name != "shape":
        return None

    shape_type = element.attrib.get("type")
    if shape_type == "text":
        return _parse_text_shape(element)
    if shape_type in {"rect", "round-rect", "diamond", "ellipse"}:
        return _parse_geometric_shape(element, shape_type)
    return None


def _parse_text_shape(element: ET.Element) -> Node:
    return Node(
        kind="text",
        x=_float_attr(element, "topLeftX"),
        y=_float_attr(element, "topLeftY"),
        width=_float_attr(element, "width"),
        height=_float_attr(element, "height"),
        text=_parse_content_text(element),
        fill_color=_parse_nested_attr(element, "fill", "fillColor", "color"),
    )


def _parse_image(element: ET.Element) -> Node:
    return Node(
        kind="image",
        x=_float_attr(element, "topLeftX"),
        y=_float_attr(element, "topLeftY"),
        width=_float_attr(element, "width"),
        height=_float_attr(element, "height"),
        src=element.attrib.get("src"),
    )


def _parse_line(element: ET.Element) -> Node:
    border = element.find("sml:border", NS)
    return Node(
        kind="line",
        start_x=_float_attr(element, "startX"),
        start_y=_float_attr(element, "startY"),
        end_x=_float_attr(element, "endX"),
        end_y=_float_attr(element, "endY"),
        border_color=None if border is None else border.attrib.get("color"),
        border_width=None if border is None else _float_attr(border, "width"),
    )


def _parse_geometric_shape(element: ET.Element, shape_type: str) -> Node:
    fill_color = _parse_nested_attr(element, "fill", "fillColor", "color")
    return Node(
        kind="shape",
        shape_type=shape_type,
        x=_float_attr(element, "topLeftX"),
        y=_float_attr(element, "topLeftY"),
        width=_float_attr(element, "width"),
        height=_float_attr(element, "height"),
        fill_color=fill_color,
    )


def _parse_content_text(element: ET.Element) -> str | None:
    content = element.find("sml:content", NS)
    if content is None:
        return None
    paragraphs = []
    for paragraph in content.findall("sml:p", NS):
        text = "".join(paragraph.itertext()).strip()
        if text:
            paragraphs.append(text)
    if paragraphs:
        return "\n".join(paragraphs)
    text = "".join(content.itertext()).strip()
    return text or None


def _parse_nested_attr(element: ET.Element, child_tag: str, grandchild_tag: str, attr_name: str) -> str | None:
    child = element.find(f"sml:{child_tag}/sml:{grandchild_tag}", NS)
    if child is None:
        return None
    return child.attrib.get(attr_name)


def _float_attr(element: ET.Element, attr_name: str) -> float | None:
    value = element.attrib.get(attr_name)
    if value is None:
        return None
    return float(value)


def _local_name(tag: str) -> str:
    if "}" in tag:
        return tag.rsplit("}", 1)[1]
    return tag


def build_asset_index(template_dir: Path) -> dict[str, Path]:
    asset_index: dict[str, Path] = {}
    for asset_path in sorted(template_dir.glob("slide_*.png")):
        token = asset_path.stem.rsplit("_", 1)[-1]
        if token in asset_index:
            raise ValueError(f"duplicate asset token: {token}")
        asset_index[token] = asset_path
    return asset_index


def resolve_asset_token(asset_index: dict[str, Path], token: str) -> Path:
    try:
        return asset_index[token]
    except KeyError as exc:
        raise KeyError(f"missing asset token: {token}") from exc
