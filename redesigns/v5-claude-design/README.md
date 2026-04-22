# v5 — Claude Design (mobile-first revamp)

Experimental variant built with [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) (Anthropic Labs). Mobile was breaking on the live v4-2 site in four measured ways; v5 is the mobile-first redesign, with the Ajolote design system loaded into Claude Design as the org-level source of truth.

## Prerequisite

The **Ajolote Labs design system must be loaded and published** in your Claude Design org before using this brief. Without it, the output won't inherit the brand and you'll get a generic dark-SaaS template.

See `../../design-system/SETUP.md` for the one-time org setup. After that, every new Claude Design project under the Ajolote org inherits the full brand automatically.

## How to use this folder

1. Confirm the design system is loaded + published in Claude Design.
2. Open a new prototype in the Ajolote Labs org.
3. Paste the contents of `PROJECT.md` (between the `--- BEGIN ---` / `--- END ---` markers) as the first message.
4. Iterate with Claude Design — inline edits, sliders, conversation.
5. Export as **standalone HTML**.
6. Drop the export into this folder (`index.html` + `style.css` + `main.js` + any `assets/`).
7. Preview locally: `python -m http.server 8081` → `http://localhost:8081`.
8. Audit against v4-2 (see below).

## Audit against v4-2

The v4-2 baseline was captured 2026-04-21 at `ajolote-labs-website/_mobile-diag.json`. It failed on:

| Pain point (v4-2 on mobile) | Must-fix in v5 |
|---|---|
| Services `.stage` cards overflow by 200-250px at 360-414px | Pipeline stacks cleanly, zero clipping |
| Cases section renders at 0px height on mobile | All 4 case cards visible, JS or no-JS |
| Breath slab #2 renders at 0px height on mobile | Full-bleed cinematic type at every viewport |
| Nav links / pills / brand wordmark at 12-13px | Nothing under 14px for readable content |

Re-run the diagnostic against v5:
```bash
cd ajolote-labs-website
# edit _mobile-diag.mjs to point URL at http://localhost:8081
node _mobile-diag.mjs > _mobile-diag-v5.json
# compare _mobile-diag.json (v4-2 baseline) vs _mobile-diag-v5.json
```

All four pain points must test green before v5 replaces v4-2.

## Do NOT

- Do not paste brand rules into the Claude Design prompt. That's what the org design system is for. If you find yourself re-describing colors, fonts, or "no founder section" in the prompt, stop — something is wrong with the design system load.
- Do not promote v5 to production until the mobile diagnostic tests green AND the `ajolote-labs-website/.claude/hooks/website-preflight.py` hook passes.

## Files

```
v5-claude-design/
├── README.md       ← this file
├── PROJECT.md      ← paste this into Claude Design (brand inherits from org)
└── index.html      ← (pending: export from Claude Design)
```
