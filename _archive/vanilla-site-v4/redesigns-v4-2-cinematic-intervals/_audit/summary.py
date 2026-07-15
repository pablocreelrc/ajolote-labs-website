import json, os, sys

base = os.path.dirname(__file__)

for fname, label in [("post-desktop.json", "DESKTOP"), ("post-mobile.json", "MOBILE")]:
    p = os.path.join(base, fname)
    if not os.path.exists(p):
        print(label, "missing"); continue
    d = json.load(open(p))
    print("=====", label, "=====")
    for k, v in d.get("categories", {}).items():
        s = v.get("score")
        ss = f"{int(s * 100)}" if s is not None else "None"
        print(" ", k, ":", ss)
    for m in ["first-contentful-paint","largest-contentful-paint","cumulative-layout-shift","total-blocking-time","speed-index","interactive"]:
        a = d["audits"].get(m, {})
        print("  ", m, a.get("displayValue", "N/A"), "sc=", a.get("score"), "err=", a.get("errorMessage", ""))
    # Failing audits
    for catkey in ["accessibility","best-practices","performance","seo"]:
        cat = d.get("categories",{}).get(catkey,{})
        fails = []
        for ref in cat.get("auditRefs",[]):
            a = d["audits"].get(ref["id"])
            if a and a.get("score") is not None and a.get("score") < 1 and a.get("scoreDisplayMode") != "notApplicable":
                title = a.get("title","")
                fails.append(f"{a['id']} ({a.get('score'):.2f}) — {title[:80]}")
        if fails:
            print(f"  {catkey.upper()} FAILS:")
            for f in fails: print("    ", f)
    print()
