# Ajolote Labs — Design System

**Source of truth for the Ajolote Labs brand.** Read this once, connect it to Claude Design once, and every future project (website redesigns, pitch decks, one-pagers, product UIs, experiments) inherits the brand automatically. Never re-paste brand rules per project — that's not how the primitive works.

Repo: `github.com/pablocreelrc/ajolote-labs-website` · Path: `design-system/` · Live site: [ajolotelabs.ai](https://ajolotelabs.ai)

---

## Folder map

```
design-system/
├── README.md            ← this file — index + Claude Design connection instructions
├── DESIGN.md            ← brand spec (9 sections: atmosphere, color, type, components,
│                          layout, depth, do's/don'ts, responsive, agent prompt guide)
├── CONSTRAINTS.md       ← engineering rules (stack, file structure, a11y, perf, negatives)
├── SCREENS.md           ← inventory of every screenshot in assets/screens/
├── SETUP.md             ← step-by-step Claude Design org onboarding
│
└── assets/
    ├── tokens.css               ← authoritative CSS custom properties
    ├── logo.webp                ← brand mark (22×22 nav)
    ├── cases.json               ← the four canonical case studies (verbatim)
    ├── reference-index.html     ← full working v4-2 HTML (component names, class conventions)
    │
    ├── fonts/                   ← self-hosted .woff2 — upload these so Claude doesn't
    │   ├── satoshi-900.woff2        substitute Inter for the display type
    │   ├── satoshi-700.woff2
    │   ├── jetbrains-mono-400.woff2
    │   ├── general-sans-400.woff2
    │   └── general-sans-500.woff2
    │
    └── screens/                 ← captured state of live production (2026-04-21)
        ├── desktop-1440-*.png       ← reference atmosphere (mostly working)
        ├── desktop-1024-full.png
        ├── tablet-768-full.png
        ├── mobile-414-full.png
        ├── mobile-390-full-BROKEN.png      ← shows the 4 mobile pain points
        ├── mobile-390-hero.png             ← hero works — preserve this
        ├── mobile-390-services-BROKEN.png  ← stages overflow by 200-250px
        ├── mobile-390-cases-BROKEN.png     ← section renders at 0px
        ├── mobile-390-cta.png
        ├── mobile-390-menu-open.png
        ├── mobile-375-full.png
        └── mobile-360-full.png
```

---

## How this works

**Claude Design connects to this repo via `Connect codebase` in the org settings.** Once connected, every new Claude Design project in the Ajolote Labs org reads `DESIGN.md`, `CONSTRAINTS.md`, the CSS tokens, the fonts, the reference HTML, and the screens directly. Commit to git → Claude Design re-syncs.

**Git is the source of truth.** If you remix the system inside Claude Design and like the result, export the remix and commit it back here — never let the Claude Design copy drift ahead of git. Same rule as any upstream/fork.

**What lives in git (this folder) vs only in Claude Design vs local-only:**

| Asset | Git (in design-system/) | Claude Design upload | Local-only (gitignored) |
|---|---|---|---|
| `DESIGN.md`, `CONSTRAINTS.md`, `SCREENS.md` | ✅ | via repo link | — |
| `tokens.css`, fonts, logo | ✅ | via repo link | — |
| Our own screenshots | ✅ | via repo link | — |
| `reference-index.html`, `cases.json` | ✅ | via repo link | — |
| **Aspirational reference set** (Palantir / Anduril / Sierra / Ramp / Linear + rotation matrix) | — | pasted per-project in chat | `brand-references/REFERENCES.md` |
| Reference-site screenshots (third-party IP) | — | per-project upload if needed | — |

**Why references live outside git:** references are per-project (the website uses one set, a pitch deck uses another). Keeping `REFERENCES.md` inside `design-system/` made Claude Design treat it as canonical-for-every-project. Moved to `brand-references/` (gitignored) so Pablo picks the 5 per project and pastes them into the Claude Design chat manually. Rationale + rotation matrix still live in that local file for his own reference.

---

## Quick start

**First time setting up Claude Design?** Read `SETUP.md`. It walks org creation → Connect codebase → supplemental asset uploads → Published toggle → test project.

**Already set up and need to kick off a new project?**
1. Open a new prototype in the Ajolote Labs org — the design system loads automatically.
2. Describe only what to build. Do not re-describe the brand.
3. If Claude Design asks about brand/colors/fonts, point it at `DESIGN.md` — something is wrong with the sync.

**Editing the design system?**
1. Edit files in this folder.
2. Commit + push.
3. Claude Design re-syncs on next project (or trigger manual re-sync in org settings).

---

## Hard rules (never negotiable)

1. **Dark theme only.** No white, light, or pastel surfaces. Ever. `#09090b` base, `#0a1a24` panels.
2. **No founder profile, team page, about-Pablo, or founder photo.** Permanent positioning decision.
3. **Every CTA routes to `https://calendly.com/hello-ajolotelabs`.** No forms, no other destinations.
4. **Mobile tap targets ≥ 44×44px.** Mobile body font ≥ 14px. WCAG 2.2 AA.
5. **Dense ↔ cinematic rhythm.** Never two dense surfaces in a row, never two cinematic in a row.
6. **Headlines lead with buyer pain**, not brand mechanism. MCP/brain/AI-employees narrative is proof underneath, never headline.
7. **Progressive enhancement.** Every section must render without JS.

An agent or human who breaks any of these is wrong. Point them to `DESIGN.md §7` and this list.

---

## Power-user reminders

From Ryan Mather (Anthropic designer) + Reddit consensus + the Medium full-loop guide:

- **Upfront setup is the highest-leverage hour.** An hour spent on `DESIGN.md` + `brand-references/REFERENCES.md` + screens beats ten hours of iterative re-prompting.
- **Explicit negatives matter more than positives.** `CONSTRAINTS.md` spells out anti-patterns because Claude defaults to the generic middle.
- **Use inline canvas comments for surgical edits.** Use chat for structural changes. Re-prompting from scratch burns tokens.
- **Connect this repo via Connect codebase.** Not a snapshot upload. Live sync is the power-user flow.
- **Reference 3-5 specific aspirational sites by name** — pasted per-project from the local `brand-references/REFERENCES.md`. Generic output = no references named.
- **Ask Claude to generate empty/error/loading states.** It skips these unless you ask explicitly.

---

## Related

- `..` (repo root) — the live marketing site (`ajolotelabs.ai`)
- `../redesigns/v4-2-cinematic-intervals/` — current production variant
- `../redesigns/v5-claude-design/` — mobile-first revamp in progress (first Claude Design project using this system)
- `../docs/scroll-system-spec.md` — technical deep-dive on the scroll-snap pattern
- `../.claude/hooks/website-preflight.py` — preflight hook that blocks push on known gotchas
- `../../vision/` — canonical strategy stack (thesis, beachhead, playbook, tracks) — branding flows from positioning
