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

## Step 2 — Upload the design system files as org assets

**⚠️ Important reality check (learned 2026-04-22):** Claude Design's design-system feature does **not** live-sync from a connected GitHub repo. The "Connect codebase" flow is a Claude Projects feature (chat product), not a Claude Design org-level feature. Design systems in Claude Design only see what you upload directly as assets.

Git remains the source of truth for editing. Claude Design gets a mirror via direct upload. Imperfect, but one upload > per-project pasting.

1. Go to https://claude.ai/design/#org → Ajolote Labs → your design system entry → **Open**.
2. Click **Add assets**.
3. Drag in every file from `design-system/` (see list below).
4. In the chat, direct it: *"These are the canonical design system files — DESIGN.md is the brand spec, CONSTRAINTS.md is engineering rules, SCREENS.md is the screen inventory, REFERENCES.md is atmospheric anchors that blend into ONE output (not five separate designs). Extract the design system from DESIGN.md + tokens.css + the screens. Use CONSTRAINTS.md and REFERENCES.md as behavioral rules that apply to every prototype."*

### The upload manifest (drag everything)

**Docs (6 files):**
- `DESIGN.md`
- `CONSTRAINTS.md`
- `SCREENS.md`
- `REFERENCES.md`
- `SETUP.md`
- `README.md`

**Core assets (4 files):**
- `assets/tokens.css`
- `assets/logo.webp`
- `assets/cases.json`
- `assets/reference-index.html`

**Fonts (5 files):**
- `assets/fonts/satoshi-900.woff2`
- `assets/fonts/satoshi-700.woff2`
- `assets/fonts/general-sans-400.woff2`
- `assets/fonts/general-sans-500.woff2`
- `assets/fonts/jetbrains-mono-400.woff2`

**Screens (prioritized — upload all 15 if quota allows, minimum 8):**
- `assets/screens/desktop-1440-full.png` *(atmospheric anchor)*
- `assets/screens/desktop-1440-hero.png`
- `assets/screens/desktop-1440-services.png`
- `assets/screens/desktop-1440-cases.png`
- `assets/screens/desktop-1440-cta.png`
- `assets/screens/mobile-390-hero.png` *(mobile works here — preserve)*
- `assets/screens/mobile-390-services-BROKEN.png` *(fix target)*
- `assets/screens/mobile-390-cases-BROKEN.png` *(fix target)*
- (optional) `assets/screens/mobile-390-full-BROKEN.png`, `tablet-768-full.png`, `desktop-1024-full.png`, `mobile-414-full.png`, `mobile-375-full.png`, `mobile-360-full.png`, `mobile-390-menu-open.png`, `mobile-390-cta.png`

### When the git-tracked files change

1. Edit in the `design-system/` folder in git.
2. Commit + push.
3. **Re-upload the changed file(s)** in Claude Design (delete the old, upload the new). Unfortunately, no diff-based sync yet.
4. Re-publish the design system.

This is the same upstream/fork discipline as before — git is canonical. If you remix inside Claude Design, export and commit back.

## Step 3 — Upload supplemental assets (things that can't live in git)

Create a new design system → **Add assets** → upload the items below that the repo can't provide:

1. **`design-system/assets/fonts/*.woff2`** (all five) — in case the repo connection doesn't parse the fonts folder as brand assets, upload them directly so Claude doesn't substitute Inter for Satoshi.

2. **Aspirational reference screenshots** — third-party IP that can't live in git. Manually save 1-2 screenshots from each of:
   - https://linear.app (hero + pricing)
   - https://stripe.com (any dashboard page)
   - https://vercel.com
   - https://supabase.com
   - https://railway.app

   Upload all 5-10 images. Name them explicitly in the Claude chat: *"These are aspirational references per `REFERENCES.md`. The vibe is **Linear meets Stripe Dashboard meets a SOC terminal**. Extract atmosphere from these — not content, not palettes, not components. Atmosphere only."*

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

## Step 7 — Kick off the first real project (mobile revamp)

1. New prototype in the Ajolote Labs org.
2. Paste the contents of `redesigns/v5-claude-design/PROJECT.md` (between `--- BEGIN ---` and `--- END ---`) as your first message.
3. The design system loads automatically. The brief only describes the task.
4. Iterate using the power-user tactics:
   - **Inline canvas comments** for surgical edits ("tighten spacing between stage cards to 16px on mobile")
   - **Chat** for structural changes ("replace the cases section with a horizontal scroll-snap carousel")
   - **Sliders** (right panel) for spacing/radius/color-weight nudges
5. When the output passes the four-pain-point test (see `redesigns/v5-claude-design/PROJECT.md`), **Export → Standalone HTML** and drop the file into that folder.

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
