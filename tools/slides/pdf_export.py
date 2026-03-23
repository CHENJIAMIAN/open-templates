from __future__ import annotations

import shutil
import subprocess
from pathlib import Path


def export_pdf(pptx_path: Path, pdf_path: Path) -> None:
    soffice = shutil.which("soffice")
    if soffice is None:
        raise FileNotFoundError("LibreOffice CLI not found on PATH: soffice")

    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    command = [
        soffice,
        "--headless",
        "--convert-to",
        "pdf",
        "--outdir",
        str(pdf_path.parent),
        str(pptx_path),
    ]
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(
            "LibreOffice failed to export PDF\n"
            f"command: {' '.join(command)}\n"
            f"stdout: {result.stdout.strip()}\n"
            f"stderr: {result.stderr.strip()}"
        )

    generated_pdf = pdf_path.parent / f"{pptx_path.stem}.pdf"
    if generated_pdf != pdf_path:
        if not generated_pdf.exists():
            raise FileNotFoundError(
                f"LibreOffice reported success but did not create the expected file: {generated_pdf}"
            )
        generated_pdf.replace(pdf_path)

    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF export did not create output: {pdf_path}")
