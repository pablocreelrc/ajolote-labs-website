# Handoff — ajolotelabs.ai deploy + Cloudflare consolidation (2026-07-23)

## Goal
Get the finished **v6 Next.js site live at `ajolotelabs.ai`** (it had been built but never pushed — 15 local commits), and do it **via CLI/API, not browser click-ops**. Ended up also consolidating the hosting onto a single Cloudflare Worker.

## Current state — DONE and verified
- **Live: `ajolotelabs.ai` + `www.ajolotelabs.ai` both serve v6** (Next.js, `/_next/`, `/cases/` route 200). Verified by curl, stable.
- **Hosting = one git-connected Cloudflare Worker (static assets)**, NOT Pages. Push to `master` → Workers Builds CI → `wrangler deploy`.
- **Deploy config is code** in `ajolote-labs-website/wrangler.jsonc`: `build.command`=`npm run build`, `assets.directory`=`./out`, `routes`=apex + www (`custom_domain:true`).
- **Legacy Cloudflare Pages project DELETED** (it was serving vanilla and holding the domains). Now a single deploy pipeline; the duplicate "Cloudflare Pages" GitHub check is gone.
- **Email restored + verified**: 5 Google MX (prio 1/5/5/10/10), SPF, site-verification TXT all live (checked via Google + Cloudflare DoH).
- **Docs corrected** (CLAUDE.md, README, ARCHITECTURE, next.config comment, package.json, `_headers`) from "Cloudflare Pages" → Worker. Memory + MEMORY.md index updated.
- **Cloudflare MCP** (`cloudflare-builds`, `cloudflare-bindings`) added to `Ajolote tech/.mcp.json` — activates next session, OAuth on first use.
- Git: `master` pushed, clean. Last commit `a38a96f` (docs). Deploy commits: `a1c55a2` (wrangler.jsonc build), `1697907` (custom-domain routes).

## Locked decisions (do NOT re-litigate)
- **Consolidate on the Worker, not Pages.** Reason: config-as-code (reviewable in git vs dashboard click-ops), kills the dual-pipeline ambiguity, Worker already proven on v6, higher capability ceiling. Cloudflare does NOT call Pages deprecated — the case was risk/reviewability, not "Pages is dead."
- **Deploy path = git push → CI**, or the Cloudflare **API via a self-`.env`-loading Node script**. NOT local `wrangler` — it can't install on Pablo's **win32 arm64** machine (`workerd` has no arm64 build; postinstall aborts). This is permanent for this machine.
- **Secrets stay in `.env`; a program loads them itself.** The correct pattern: run `node script.mjs` where the script reads `CLOUDFLARE_API_TOKEN` from `.env` internally — no secret in the command string, secret-guard never fires, token never enters chat. Do NOT put tokens inline in curl/commands.
- **Keep the Cloudflare API token** (in `Ajolote tech/.env`). It's narrowly scoped (5 perms: Workers Scripts/Account Settings/Cloudflare Pages Edit+Read, Workers Routes, Zone Read; one zone; IP-filtered) and needed for future account-level ops. Earlier "revoke it" advice was retracted. **The token in `.env` is the CLEAN rolled value** — two earlier token values leaked into chat during setup and were rolled/killed; the current one has never been printed, only read from `.env` by scripts.

## Superseded / corrected (these WERE believed, now wrong — don't anchor on them)
- ~~"Site is on Cloudflare Pages"~~ (old CLAUDE.md/docs said this) → it was a Worker + a stray Pages project; now a Worker only.
- ~~"You run the commands and paste output because I can't handle the token"~~ → wrong; a self-`.env`-loading script lets me run it directly, token never seen.
- ~~"Need DNS:Edit / SSL:Edit to attach a Worker custom domain"~~ → Cloudflare's own Workers token has neither; custom-domain attach manages DNS/SSL automatically. (DNS:Edit was still useful here to clean a leftover CNAME.)

## MISTAKES MADE THIS SESSION — prevention rules (the point of this handoff)
1. **DNS bulk-delete wiped Google Workspace email.** During the apex migration, the cleanup queried *all* DNS records at `ajolotelabs.ai` and deleted them — including MX/SPF/verification — taking email down for minutes. Restored, but avoidable.
   → **RULE: when scripting DNS, delete ONLY the specific conflicting record (the proxied CNAME/A), never all records at a name. Filter by type/content. The apex always carries MX/SPF; treat it as load-bearing.** (Now also in CLAUDE.md.)
2. **Fixed the wrong thing first.** Spent effort making the *Worker* serve v6 before checking that the live domain actually pointed at the *Pages* project. Diagnosis lagged action.
   → **RULE: before "fixing" a deploy, confirm what actually serves the domain (curl the domain vs each candidate origin; check where the custom domain is attached). Don't assume the project you're looking at is the one in production.**
3. **Canary didn't cover the risk it needed to.** `www` was a good canary for the *website* flow but had no email records, so it couldn't catch the MX deletion that only the apex would hit.
   → **RULE: a canary must share the risk surface of the real target. The apex had email records; a www canary can't surface an apex-only failure mode. Enumerate what's different about the real target before trusting the canary.**
4. **Defaulted to expensive browser automation** (screenshots) for dashboard work the user explicitly didn't want, and the browser tooling was flaky anyway.
   → **RULE: for Cloudflare (and similar), reach for API/CLI first. Browser is last resort.**
5. **Recommended before researching.** Pushed wrangler-CLI and MCP-vs-CLI opinions before pulling official docs.
   → **RULE: pull current docs (context7 first, per global CLAUDE.md) BEFORE recommending an approach, not after.**
6. **Used context7 weakly** — one query, got a poor hit, bailed to WebFetch. Protocol is to refine the context7 query (and only fall back if it's unreachable).
7. **Own command text tripped secret-guard** — an `echo` containing both "grep" and ".env" was blocked. Keep read-verbs away from any command that also names a credential path.

## Open threads / next steps (ordered)
1. **Pablo: send a test email to `hello@ajolotelabs.ai`** — independent confirmation the MX restore is solid (only thing not self-verified).
2. **Next real work phase = REAL CASE STUDIES** (pre-existing objective, unchanged by this session): deep-scan `../../../Mezcal/` + `../../../Desclub/` for delivered work → business case per client → website cases BY VERTICAL. Research in `docs/cases-vertical-research.md`; prior handoff `docs/HANDOFF-2026-06-27.md`.
3. If Pablo's public IP changes and the token starts failing auth, update/remove the token's **IP filter** (currently pinned to `176.227.243.63`).

## Broken things to fix first
- **None currently broken** — site live, email live, CI green, git clean.
- Watch-out (not broken): the API token is **IP-filtered to `176.227.243.63`**; on IP rotation it silently 401s. That's the first thing to check if any Cloudflare script suddenly fails auth.

## Key paths / identifiers
- Repo: `ajolote-labs-website/` (GitHub `pablocreelrc/ajolote-labs-website`, branch `master`)
- Deploy config: `ajolote-labs-website/wrangler.jsonc`
- App: `ajolote-labs-website/src/` (v6 promoted from `redesigns/v6-product/` in commit `6404c42`)
- Cloudflare: account `5e7451d4cd92612620b14fd1a65d0527`, zone `ajolotelabs.ai` id `d5f40eb90fca0f42ceeaccb93350cec6`, worker `ajolote-labs-website.pablocreelrc.workers.dev`
- Token: `CLOUDFLARE_API_TOKEN` in `Ajolote tech/.env` (gitignored; secret-guard blocks reads)
- Migration scripts (session scratchpad, disposable): `…/scratchpad/cf-migrate.mjs`, `restore-dns.mjs`, `cleanup-pages.mjs`
- MCP config: `Ajolote tech/.mcp.json` (added `cloudflare-builds`, `cloudflare-bindings`)
