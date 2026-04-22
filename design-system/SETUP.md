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

## Step 2 — Connect the GitHub repo (highest-leverage asset)

1. Go to https://claude.ai/design/#org (org admin).
2. Top-left menu → **Connect codebase**.
3. Paste `https://github.com/pablocreelrc/ajolote-labs-website` → authenticate with GitHub if prompted.
4. Confirm Claude Design has read access to the repo.
5. In the chat, direct it: *"Read `design-system/DESIGN.md`, `design-system/CONSTRAINTS.md`, `design-system/SCREENS.md`, `design-system/REFERENCES.md`, and `design-system/assets/tokens.css` as the brand source of truth."*

This is the single most important step. The repo connection gives Claude live access to every brand rule, every token, every component class name, and every screenshot — all version-controlled.

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
