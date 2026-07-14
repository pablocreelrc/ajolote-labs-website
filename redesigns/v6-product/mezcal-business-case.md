# Business case — Mezcal (Destileria Sacrificio)

> Working doc for the v6 website cases. **Goal-forward framing:** this leads with the end-state we're building toward and the system design, then shows the foundation already in place as proof it's real. Discipline kept: the ~80% figure is a labeled **[TARGET]**; built artifacts are **[measured]** with cited paths; no invented outcome numbers.
> Source roots: `…\Files\Mezcal\` and `…\Files\Ajolote tech\MCPs\` · read-only.

## 1. Snapshot
- **Client:** Destileria Sacrificio (DSA) — mezcal holding co; brands **Mezcal Sacrificio** and **Mezcal Akul**.
- **Vertical:** consumer goods / spirits, cross-border (Mexico → US retail). Retailer **Total Wine & More** (Spirits Direct); distributor **Mexcor**; CEO Manuel Benet Ysita.
- **The ambition in one line:** turn a spirits company that runs on two people's heads into an **AI-operated company** — most of its workflows automated, run by Claude on an MCP substrate, and owned by the client.

## 2. The GOAL (the end-state we're building)
A mezcal company where **the operation runs itself, and the CEO sees all of it from one screen.**

- **Most workflows automated.** The full business — commercial, production/supply-chain, and cash/finance — runs on documented, executable workflows instead of tribal knowledge. **Target: an ~80%-automated company.** **[TARGET — Pablo's stated goal]**
- **Claude runs the functions.** AI agents handle ops, inventory, finance, marketing, sales, and tax — reading the company's data, acting on its systems, and coordinating with each other over a shared MCP layer.
- **One pane of glass.** Manuel opens an Executive Dashboard and sees cash position + 13-week forecast, AR aging, production WIP, shipments in flight, and inventory risk — with no daily calls to operators.
- **Handoff-ready by design.** The operation survives its two key people (Alan Lugo, de-facto COO/FP&A, and Alexis Lara, ops) **leaving** — the systems are the runbook, so a new hire, an outsourced team, or an acquirer can run the company from documented boards.
- **You own it.** Ajolote builds, runs, and improves it; DSA owns the result.

## 3. The system design (how the company gets automated)

### a. The map — every workflow, laid out to automate
A complete operating-system blueprint: **44 workflows across 14 boards + an Executive Dashboard**, in three workspaces (Sacrificio / Akul / DSA-Holding). *(`Mezcal Project Obsidian\…\specs\2026-04-23-dsa-monday-workflow-os-design.md`)*
- **Commercial & Sales (12):** depletion/inventory ingestion, state scorecards, TWM / Spirits Direct SKU analysis, Motek forecasting, ABC price scenarios, billback resolution, promo quantification.
- **Production & Supply Chain (17):** the full demand → batch → DTL PO → QC → Comercam → transport → Laredo → Houston pipeline, procurement, sample dispatch, inventory reconciliation.
- **Cash & Financial (15):** FLUX & MUNDI factoring cycles, AR collections, cash rollups, P&L simulator feed, gross-margin bridge, billback-to-cash reconciliation, MKT budget, payroll.
- **The automation is in the hand-offs:** production marked *Ready* auto-creates a logistics item; *Delivered Houston* auto-creates the MUNDI advance + Mexcor receivable; an overdue receivable starts its aging clock and queues a chase-email draft; a contract 60 days from expiry auto-creates a renewal task.

### b. The agent universe — a system, not a chatbot
AI employees grouped by function, coordinating agent-to-agent over the MCP layer:
- **Already built (TWM-Intelligence roster):** Ingestion · National · State · Store · Predictive · Inventory-Policy · Field-Ops · Orchestrator (+ Reference-Builder, Demand-Forecast) — the retail/inventory intelligence brain. **[measured-built]**
- **The full system to deploy (per function):** an **Operations** agent (workflow orchestration), an **Inventory** agent (raw → WIP → finished → shipped), a **Financial-Modeling** agent (P&L, margin by SKU, working capital), a **Cash-Flow-Prediction** agent (receivables/payables/runway — the **highest-leverage** automation), a **Sales/Commercial** agent, a **Marketing** agent, and a **SAT/tax** agent (CFDI, declarations, compliance). **[envisioned]**

### c. The substrate — Claude wired across the business
The connective tissue is the MCP layer: **MCPs are the brain (data + tools), Claude is the body (reasoning + orchestration).** Already wired *(across `.mcp.json` + the TWM-Intelligence agents)*: **[measured-wired]**
- **n8n** (`akulmezcal.app.n8n.cloud`) → ops automation, stockout alerts, weekly reporting, KPI sync.
- **Google Workspace** → finance/reporting, Drive master docs, calendar.
- **Monday** → the operational hub (boards, tasks, sales pipeline).
- **Figma** → marketing/brand assets, sell sheets.
- **distributor-mcp** → inventory/sales/finance intelligence off the Mexcor data cube (see §4).
- **context7** → live library/API docs for the build.
Agents consume these MCP surfaces — never raw APIs — so auth, consent, and audit live in one place and the company isn't locked to any single SaaS.

## 4. The foundation already built (proof the system is real)
This isn't a slide deck — the core pieces are built and running:
- **The Sacrificio dashboard** — a production decision system, **live on Vercel**. Modules: National · State · Store · Predictive · **Inventory-Policy** (Base-Stock / Newsvendor / (R,Q) / Hybrid) · Geo · **Cashflow** (cash-flow simulator grounded in an Invoice-54 regression, **99.97% match** to real cash flow) · **Optimizer** (Monte-Carlo cadence + safety-buffer engine; acceptance gate **25/25**) · a **Claude chat explainer** (Haiku 4.5, audience-adaptive) · Settings. It already serves inventory, finance, and the TWM commercial pitch. **[measured]** *(`Projects\sacrificio-dashboard-next\`)*
- **The Akul MCP** — the brand-agnostic **`distributor-mcp`** (FastMCP) you built, run as `BRAND_NAME=akul` (also `sacrificio` / `mexcor`). It wraps the **Mexcor distributor database** (Encompass8 ReportView) as a rebuilt analytics cube and exposes it to Claude as tools — `velocity_per_account`, `top_n_accounts`, `voids_in_top_n`, `period_over_period`, and a `run_basequery` escape hatch — plus `catalog://` / `schema://` resources and playbook prompts (`day_one_baseline`, `void_scan`). One MCP, every brand scope. **[measured]** *(`…\Ajolote tech\MCPs\distributor-mcp\`)*
- **The wiring** — Claude already reaches ops, finance, sales, and marketing through the MCP stack above, with engagement guardrails (secret-guard + auth-checker hooks) in the Project Obsidian vault. **[measured-wired]**

## 5. Why it compounds (the bigger play)
Mezcal is the **proof point** for a repeatable model: the generic assets that come out of it — a **SAT/tax MCP**, the **distributor-MCP pattern**, the agent-per-function roster, the cross-board automation patterns — drop into Ajolote's library and make the **next** Mexican SME faster and cheaper to automate. Build → maintain → improve → you own it. One automated mezcal company becomes the template for a hundred.

## 6. Candidate proof for the website (raw, vetted — pick later)
- **"We're building a mezcal company that runs itself — 44 of its workflows mapped to automate, AI employees for ops, inventory, finance and tax, all coordinated on one MCP layer."** [goal — ~80% labeled TARGET]
- **"A live decision dashboard with a Monte-Carlo shipment optimizer and a cash-flow model matching real cash to 99.97%."** [measured]
- **"One MCP turns the distributor's database into tools Claude can query for any brand."** [measured — the distributor-mcp]
- Honest framing for the card: *the operating system for an AI-run spirits company — the brain and the data layer are built; the full automation is the roadmap.*

## 7. Honesty footer (kept short, per the goal-first framing)
Foundation that is **built and running today:** the Sacrificio dashboard (deployed), the Akul/distributor MCP (v1.0 done, v2.0 onboarding), the Claude/MCP wiring, plus a live transcript pipeline and an active Mexcor M&A workstream. **Still the roadmap:** the 44-workflow OS is designed (boards scaffolded, not yet adopted), most function-agents are envisioned, and the **~80% automation is a TARGET**, not a measured state. No business-outcome metrics (hours saved, etc.) are measured yet. The goal is real and the foundation is real; full automation is where it's headed.
