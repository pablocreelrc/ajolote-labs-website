import json, os
base = os.path.dirname(__file__)
d = json.load(open(os.path.join(base, "post-desktop-noemu.json")))
for aid, a in d.get("audits", {}).items():
    if a.get("errorMessage"):
        print(aid, "->", a.get("errorMessage")[:200])
