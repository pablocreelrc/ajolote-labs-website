#!/usr/bin/env python
"""
Bundle HTML with inline CSS and JavaScript.
Reads index.html, css/style.css, and js/main.js, then creates a single
self-contained HTML file with CSS and JS inlined.
"""

import os
import re
from pathlib import Path

def bundle_html():
    # Define paths
    base_dir = Path(__file__).parent
    html_file = base_dir / "index.html"
    css_file = base_dir / "css" / "style.css"
    js_file = base_dir / "js" / "main.js"
    dist_dir = base_dir / "dist"
    output_file = dist_dir / "bundle.html"

    # Create dist directory if it doesn't exist
    dist_dir.mkdir(parents=True, exist_ok=True)

    # Read files
    print(f"Reading {html_file}...")
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    print(f"Reading {css_file}...")
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content = f.read()

    print(f"Reading {js_file}...")
    with open(js_file, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # Replace CSS link with inline style tag
    print("Inlining CSS...")
    css_replacement = f'<style>\n{css_content}\n</style>'
    html_content = re.sub(
        r'<link\s+rel="stylesheet"\s+href="css/style\.css">',
        css_replacement,
        html_content
    )

    # Replace JS script tag with inline script
    print("Inlining JavaScript...")
    js_replacement = f'<script defer>\n{js_content}\n</script>'
    html_content = re.sub(
        r'<script\s+src="js/main\.js"\s+defer><\/script>',
        js_replacement,
        html_content
    )

    # Write output
    print(f"Writing bundled HTML to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"SUCCESS: Bundle created: {output_file}")
    print(f"  File size: {output_file.stat().st_size / 1024:.1f} KB")

if __name__ == '__main__':
    bundle_html()
