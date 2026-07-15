import json, os
base = os.path.dirname(__file__)
for f in ["post-mobile.json", "post-desktop.json"]:
    print("===", f, "===")
    d = json.load(open(os.path.join(base, f)))
    a = d["audits"].get("layout-shifts", {})
    for it in a.get("details", {}).get("items", [])[:10]:
        n = it.get("node", {})
        print("score=", it.get("score"), "sel=", n.get("selector", ""), "h=", n.get("boundingRect", {}).get("height"))
        for s in it.get("subItems", {}).get("items", [])[:5]:
            print("  sub:", s)
    print()
