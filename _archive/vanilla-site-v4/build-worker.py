import base64, json, os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Read all assets
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()
with open('js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()
with open('data/cases.json', 'r', encoding='utf-8') as f:
    cases_json = f.read()
with open('img/logo-sm.webp', 'rb') as f:
    logo_b64 = base64.b64encode(f.read()).decode('ascii')

# Inline CSS and JS into HTML
html = html.replace(
    '<link rel="stylesheet" href="css/style.css">',
    '<style>\n' + css + '\n</style>'
)
html = html.replace(
    '<script src="js/main.js" defer></script>',
    '<script defer>\n' + js + '\n</script>'
)

# Replace logo src with base64 data URI
html = html.replace(
    'src="img/logo.png"',
    'src="data:image/webp;base64,' + logo_b64 + '"'
)

# Replace fetch('data/cases.json') with inline data
# Inject the JSON as a global variable and patch the fetch
cases_script = '<script>window.__CASES_DATA__ = ' + cases_json.strip() + ';</script>'
html = html.replace('</head>', cases_script + '\n</head>')

# Patch JS to use inline data instead of fetch
html = html.replace(
    "fetch('data/cases.json')",
    "Promise.resolve({ json: function() { return window.__CASES_DATA__; } })"
)

# Escape for JS template literal
html_escaped = html.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

worker = 'export default {\n'
worker += '  async fetch(request) {\n'
worker += '    const url = new URL(request.url);\n'
worker += '    if (url.pathname === "/robots.txt") {\n'
worker += '      return new Response("User-agent: *\\nAllow: /\\nSitemap: https://ajolotelabs.ai/sitemap.xml", {\n'
worker += '        headers: { "Content-Type": "text/plain" }\n'
worker += '      });\n'
worker += '    }\n'
worker += '    if (url.pathname === "/sitemap.xml") {\n'
worker += '      return new Response(\'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://ajolotelabs.ai/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>\', {\n'
worker += '        headers: { "Content-Type": "application/xml" }\n'
worker += '      });\n'
worker += '    }\n'
worker += '    const HTML = `' + html_escaped + '`;\n'
worker += '    return new Response(HTML, {\n'
worker += '      headers: {\n'
worker += '        "Content-Type": "text/html;charset=UTF-8",\n'
worker += '        "Cache-Control": "public, max-age=3600",\n'
worker += '        "X-Content-Type-Options": "nosniff"\n'
worker += '      }\n'
worker += '    });\n'
worker += '  }\n'
worker += '};\n'

with open('dist/worker.js', 'w', encoding='utf-8') as f:
    f.write(worker)

print(f'Worker script: {len(worker):,} bytes')
print(f'  HTML (inlined): {len(html):,} bytes')
print(f'  Logo base64: {len(logo_b64):,} chars')
print(f'  Cases JSON: {len(cases_json):,} bytes')
