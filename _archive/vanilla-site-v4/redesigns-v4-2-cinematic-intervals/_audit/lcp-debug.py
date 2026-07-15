import json, os
p = os.path.join(os.path.dirname(__file__), "post-desktop.json")
d = json.load(open(p))
for m in [
    "largest-contentful-paint",
    "total-blocking-time",
    "interactive",
    "largest-contentful-paint-element",
]:
    a = d["audits"].get(m, {})
    print(m, a.get("scoreDisplayMode"), a.get("errorMessage", "")[:200])
mm = d["audits"].get("metrics", {})
if mm:
    items = mm.get("details", {}).get("items", [])
    print("metrics items:", len(items))
    for it in items[:1]:
        print(json.dumps(it, indent=2)[:1500])
