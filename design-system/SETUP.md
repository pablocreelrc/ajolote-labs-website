# SETUP.md — Load the Ajolote design system into Claude Design

One-time setup. After this, every Claude Design project created under the Ajolote Labs org inherits this design system automatically — no per-project brand-brief pasting, ever.

## Prerequisites

- **Claude Pro, Max, Team, or Enterprise plan.** Free blocks project creation.
- **This folder committed and pushed to GitHub** (`github.com/pablocreelrc/ajolote-labs-website`). The "Connect codebase" flow reads from the live repo, so uncommitted work won't sync.

## Step 1 — Open Claude Design and create the org

1. Open https://claude.ai/design
2. Lower-left corner of the project picker → click the current workspace name.
3. If **Ajolote Labs** doesn't exist → **+ Create new organization** → name it `Ajolote Labs`.
4. Confirm you're inside the Ajolote Labs org (the corner should now say `Ajolote Labs`).

## Step 2 — Link the GitHub repo (primary path)

Per the official Claude Design docs (April 2026): *"Link a code repository so Claude understands your existing components, architecture, and styling patterns."* Claude Design reads your connected repo to extract the design system — colors, typography, components, assets — and every new project inherits it automatically.

**Supersedes earlier guidance** that said "Connect codebase is a Claude Projects-only feature." That was wrong. Claude Design does support GitHub linking at the org level.

1. Go to https://claude.ai/design → Ajolote Labs org → **Set up design system**.
2. Choose **Link a code repository** (NOT upload-zip).
3. Authorize with GitHub and select **`pablocreelrc/ajolote-labs-website`** (master branch).
4. In the setup chat, direct it: *"The canonical design system lives in `design-system/`. `DESIGN.md` is the brand spec, `CONSTRAINTS.md` is engineering rules, `SCREENS.md` is the screen inventory. Extract the design system from `DESIGN.md` + `assets/tokens.css` + `assets/screens/`. Use `CONSTRAINTS.md` as behavioral rules that apply to every prototype. Fonts are in `design-system/assets/fonts/` — use Satoshi for display, never substitute Inter. **Aspirational references are NOT in the repo — they are pasted per-project in the project chat, because they rotate by project type.**"*

### What the GitHub link auto-ingests

All of this reads directly from the linked repo — no manual upload:

**Docs (5 files in `design-system/`):**
- `DESIGN.md`, `CONSTRAINTS.md`, `SCREENS.md`, `SETUP.md`, `README.md`
- *(Aspirational references live in `brand-references/REFERENCES.md` — gitignored, local-only, pasted per-project)*

**Core assets (`design-system/assets/`):**
- `tokens.css`, `logo.webp`, `cases.json`, `reference-index.html`

**Fonts (`design-system/assets/fonts/`):**
- `satoshi-900.woff2`, `satoshi-700.woff2`, `general-sans-400.woff2`, `general-sans-500.woff2`, `jetbrains-mono-400.woff2`

**Screens (`design-system/assets/screens/`):**
- All 15 screenshots (desktop 1440/1024, tablet 768, mobile 390/414/360 full + section crops, BROKEN captures for mobile pain-point anchors)

**Live site code (for component patterns):**
- `index.html`, `css/`, `js/` — Claude can read real component class conventions

### Sync behavior

The docs don't definitively specify live-sync vs snapshot ingestion. Assume **re-sync on each new project** (projects "automatically inherit" the latest org design system per docs). If a prompt shows stale behavior after a git push:

1. Edit in `design-system/` → commit → push.
2. Trigger a manual re-sync in org settings (or create a fresh throwaway project to force re-ingestion).
3. Re-publish the design system.

## Step 3 — Upload supplemental assets (things that can't live in git)

Most of the design system comes from the GitHub link (Step 2). These supplemental items **cannot** live in git and must be uploaded manually when you want them:

1. **Aspirational reference screenshots (optional, belt-and-suspenders)** — third-party IP that can't live in git. The base 5 ingredients per `brand-references/REFERENCES.md` are:
   - **Palantir** — https://www.palantir.com (hero, case studies, product pages)
   - **Anduril** — https://www.anduril.com (hero, product pages)
   - **Sierra** — https://sierra.ai (hero, agents page)
   - **Ramp** — https://ramp.com (hero, dashboard shots)
   - **Linear** — https://linear.app (hero, pricing)

   Save 1-2 screenshots from each, upload 5-10 total. Name them explicitly in the Claude chat: *"These are aspirational references per `brand-references/REFERENCES.md`. The vibe is **Palantir's institutional gravitas, Anduril's cinematic operator feel, Sierra's modern-AI-agent polish, Ramp's financial-grade trust, Linear's motion craft.** Extract atmosphere from these — not content, not palettes (we have our own), not specific components. Blend into ONE cohesive Ajolote output."*

   **First project — paste the 5-reference block into chat manually** (from local `brand-references/REFERENCES.md`). Skip screenshot upload unless output goes generic on the first try — Claude Design has training-data memory of these well-known sites.

2. **Project-specific references** — per `brand-references/REFERENCES.md` §Reference rotation playbook, swap 1-2 of the base 5 when the project type differs (pitch deck, product UI, Spanish/MX landing, vertical-specific landing). Upload fresh screenshots of the swap-ins.

3. **Any additional brand assets** (favicon, OG image, press logos) — add as needed.

## Step 4 — Let Claude extract

Claude auto-extracts:
- Color palette + role assignments
- Typography scale + fallbacks
- Components (panel, button, status pill, metric cell, nav, breath slab, carousel)
- Layout patterns (grid, frame, responsive rules)

Review what it extracted in the system preview. **Sanity-check against `DESIGN.md`:**

| Check | Should be |
|---|---|
| Primary background | `#09090b` |
| Panel surface | `#0a1a24` |
| Primary accent | `#00e5ff` cyan |
| Display font | Satoshi 900 (not Inter, not Archivo) |
| Mono font | JetBrains Mono |
| Body font | General Sans (fallback Inter) |
| Min body size mobile | 14px |
| Min tap target | 44×44px |
| White surfaces | **NONE** — reject immediately if present |
| Founder section | **NONE** — reject immediately if present |

If anything's wrong → **Remix** button (upper-right) → chat-correct it.
> Example: *"Panel should be `#0a1a24`, not `#0f2030`. `#0f2030` is the elevated/hover state only."*
> Example: *"Display font is Satoshi 900 — fallback is Archivo Black, not Inter."*

## Step 5 — Sanity-check with a throwaway project

Before publishing, create a test project to verify extraction quality:

> *"Using our design system, build a single hero section. Satoshi 900 headline 'Stop losing money to manual operations.' with 'manual operations' as the cyan→amber accent. Below: a dense console panel with 3 metric cells showing `skills_built 430+`, `loc_shipped 27K+`, `tests_passing 2,200+`. Mobile-first 375px minimum. Include empty/error/loading states."*

**Expected output:**
- Dark `#09090b` page, `#0a1a24` console panel.
- Cyan accent word with gradient sweep.
- JetBrains Mono metric labels, General Sans sub-captions.
- 44×44 buttons, 14px+ body text.
- Status pills with colored dots.
- Empty/error/loading states present.

**Failure signals (remix and retry):**
- White or light surfaces anywhere.
- Stock photography or isometric illustrations.
- Inter instead of Satoshi for the hero H1.
- Generic "dashboard" card layout without the mono instrumentation voice.
- Under-14px body text.
- Buttons under 44×44.

## Step 6 — Publish

1. Org settings → the Ajolote Labs design system entry → **Published** toggle **ON**.
2. Confirmation banner: *"Projects created from this org will now use the Ajolote Labs design system."*

## Step 7 — Kick off your first project

1. New prototype in the Ajolote Labs org. The design system loads automatically from the linked repo.
2. Write a project brief as your first message — describe *what to build* (a section, a screen, a full revamp, a pitch deck, etc.). Do not re-describe the brand — that comes from the repo.
3. Per `brand-references/REFERENCES.md` §Reference rotation playbook, **tell Claude which 5 references apply to this project** (base 5 for website work; swap for other project types). Upload fresh screenshots if the swap-ins aren't in the org assets yet.
4. Always include in every project brief: *"One cohesive design (not N variants). Generate empty/error/loading states for every interactive component."*
5. Iterate using the power-user tactics:
   - **Inline canvas comments** for surgical edits ("tighten spacing between stage cards to 16px on mobile")
   - **Chat** for structural changes ("replace the cases section with a horizontal scroll-snap carousel")
   - **Sliders** (right panel) for spacing/radius/color-weight nudges
6. When the output passes your success criteria, **Export → Standalone HTML** and commit the file to a new folder under `redesigns/<slug>/`.

---

## When to update the design system

Update via **Remix** + commit-back-to-git when any of these change durably:

- Color palette (new token, deprecated token, role shift)
- Typography (new family, scale change)
- A new archetypal component added to the brand (new dashboard widget pattern reused across projects)
- A new brand rule that agents should apply universally

**Do NOT update for:**

- One-off project styling quirks
- A single campaign's accent color
- Temporary marketing variants

Those belong in the individual project's brief, not the org design system.

## Drift prevention

**Git is upstream, Claude Design is a fork.** If you remix inside Claude Design and like the result:

1. Export the remix.
2. Update `DESIGN.md` / `tokens.css` / relevant files in this folder.
3. Commit + push.
4. Re-sync Claude Design (org settings → repo connection → trigger re-sync, or wait for next project to auto-sync).

Don't let the Claude Design copy drift ahead of git — future projects will pull a stale version and you'll lose the newer extraction.
