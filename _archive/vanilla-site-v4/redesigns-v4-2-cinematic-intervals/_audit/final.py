import json, os
base = os.path.dirname(__file__)
for fname, label in [("final-desktop.json", "DESKTOP"), ("final-mobile.json", "MOBILE")]:
    p = os.path.join(base, fname)
    d = json.load(open(p))
    print("====", label, "====")
    for k, v in d.get("categories", {}).items():
        s = v.get("score")
        print(" ", k, ":", int(s * 100) if s is not None else "None")
    for m in ["first-contentful-paint","largest-contentful-paint","cumulative-layout-shift","total-blocking-time","speed-index","interactive"]:
        a = d["audits"].get(m, {})
        print(" ", m, a.get("displayValue","N/A"), "sc=", a.get("score"))
    print()
