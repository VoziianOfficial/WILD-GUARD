#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import re
from dataclasses import dataclass
from pathlib import Path


SKIP_DIRS = {
    ".git",
    "node_modules",
    "dist",
    "build",
    "out",
    ".next",
    ".cache",
    ".DS_Store",
}


TEXT_EXTENSIONS = {
    ".html",
    ".htm",
    ".css",
    ".js",
    ".mjs",
    ".cjs",
    ".ts",
    ".tsx",
    ".jsx",
    ".json",
    ".md",
    ".txt",
    ".svg",
    ".xml",
}


@dataclass(frozen=True)
class Result:
    path: Path
    changed: bool


def _strip_html_comments(text: str) -> str:
    return re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)


def _strip_block_comments(text: str) -> str:
    # Match C-style block comments: /* ... */
    return re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)


def _strip_js_full_line_comments(text: str) -> str:
    # Remove lines that contain only optional whitespace + // comment.
    # This avoids accidentally stripping URLs like "http://..." or inline code.
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    for line in lines:
        if re.match(r"^[ \t]*//", line):
            # Preserve the newline if present to keep line numbers stable.
            out.append("\n" if line.endswith("\n") else "")
        else:
            out.append(line)
    return "".join(out)


def strip_comments_for_path(path: Path, original: str) -> str:
    suffix = path.suffix.lower()

    text = original

    if suffix in {".html", ".htm"}:
        text = _strip_html_comments(text)
        # Some HTML files may also include <style> blocks; removing /* */ is safe.
        text = _strip_block_comments(text)
        return text

    if suffix in {".css"}:
        return _strip_block_comments(text)

    if suffix in {".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx"}:
        text = _strip_block_comments(text)
        text = _strip_js_full_line_comments(text)
        return text

    if suffix in {".svg", ".xml"}:
        # XML comments.
        return re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)

    # For other text-like formats (md/txt/json), do nothing by default.
    return text


def iter_files(root: Path) -> list[Path]:
    results: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            p = Path(dirpath) / name
            if p.suffix.lower() not in TEXT_EXTENSIONS:
                continue
            if any(part in SKIP_DIRS for part in p.parts):
                continue
            results.append(p)
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description="Strip safe comments from web/text files.")
    parser.add_argument("--root", default=".", help="Project root (default: .)")
    parser.add_argument("--check", action="store_true", help="Do not write; exit 1 if changes needed.")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    files = iter_files(root)

    changed_any = False
    for path in files:
        try:
            original = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            # Skip non-UTF8 assets.
            continue

        stripped = strip_comments_for_path(path, original)
        if stripped != original:
            changed_any = True
            if not args.check:
                path.write_text(stripped, encoding="utf-8")

    if args.check and changed_any:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
