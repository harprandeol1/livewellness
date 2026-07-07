#!/usr/bin/env python3
"""Replace header and footer in all site HTML pages with canonical partials."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HEADER = (ROOT / "partials" / "site-header.html").read_text().strip()
FOOTER = (ROOT / "partials" / "site-footer.html").read_text().strip()

HTML_FILES = sorted(ROOT.glob("*.html"))


def replace_block(content: str, tag: str, replacement: str) -> str:
    pattern = re.compile(
        rf"<{tag}\b[^>]*>.*?</{tag}>",
        re.DOTALL | re.IGNORECASE,
    )
    matches = list(pattern.finditer(content))
    if not matches:
        raise ValueError(f"No <{tag}> block found")
    if len(matches) > 1 and tag == "header":
        # Keep first header only (main site header)
        start, end = matches[0].span()
        return content[:start] + replacement + content[end:]
    if len(matches) != 1:
        raise ValueError(f"Expected one <{tag}> block, found {len(matches)}")
    start, end = matches[0].span()
    return content[:start] + replacement + content[end:]


def main() -> None:
    for path in HTML_FILES:
        text = path.read_text()
        updated = replace_block(text, "header", HEADER)
        updated = replace_block(updated, "footer", FOOTER)
        if updated != text:
            path.write_text(updated)
            print(f"updated {path.name}")


if __name__ == "__main__":
    main()
