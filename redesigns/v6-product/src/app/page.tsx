/**
 * Home — the single marketing page (static export, server component).
 *
 * Structure: <main> of 6 beats + <MotionScript/>. (<Nav/> + the brain live in layout.tsx.)
 *   SEC_00 hero · SEC_01 thesis · SEC_02 platform · SEC_04 cases · SEC_05 cta+footer
 * Cases (SEC_04) is shared with the /cases route via <Cases/>; on mobile the inline copy is
 * hidden (globals.css `.page-home #cases`) and reached from the menu instead.
 * Each <section> has a stable `id` that (a) anchors nav links and (b) keys the ambient-brain
 * opacity in BrainExperience.tsx (BRAIN_BY_SECTION). Markup is SSR/no-JS safe; all motion is
 * progressive enhancement added by MotionScript.tsx (data-cascade / .reveal / data-counter /
 * .marquee-word hooks). Responsive rules live in globals.css; every CTA points at CAL.
 */
import MotionScript from "./MotionScript";
import PlatformDiagram from "./PlatformDiagram";
import Cases from "./Cases";

const CAL = "https://calendly.com/hello-ajolotelabs";

export default function Home() {
  return (
    <>
      <main id="main" className="page-home">
        {/* SEC_00 — HERO · brain 0.25 · diptych: headline + word-cascade (left) | "what we
            deliver" card with border-beam (right). Mobile: stacks to 1 col (.hv → 1fr <768px).
            CTAs: "Book a discovery call" (CAL) + "See how we work" (#platform). */}
        <section className="sec hero" id="hero" aria-label="Hero">
          <div className="frame hv">
            <div data-cascade>
              <span className="section__id">forward-deployed engineers · <b>next.deploy&nbsp;=&nbsp;you</b></span>
              <h1 className="hv__h1">
                <span className="line"><span className="word">Stop</span> <span className="word">losing</span> <span className="word">money</span> <span className="word">to</span></span>
                <span className="line line-accent"><span className="word marquee-word">manual</span> <span className="word marquee-word">operations.</span></span>
              </h1>
              <p className="hv__sub">Real operations are messy: exceptions, edge cases, systems that were never built to talk. We embed, co-build an AI workforce for your most complex work, and stay to operate it. The code and data are yours.</p>
              <div className="hv__actions">
                <a className="btn btn--primary" href={CAL}>Book a discovery call <span className="car" aria-hidden>→</span></a>
                <a className="btn btn--ghost" href="#platform">See how we work <span className="car" aria-hidden>→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* SEC_01 — THESIS · brain 0.12 (dim "breath") · centered slab headline + one line of
            body. .breath__wash radial overlay. No CTA. Mobile: fluid clamp() text, no layout change. */}
        <section className="sec breath" id="thesis" aria-label="Why we embed">
          <div className="breath__wash" />
          <div className="frame">
            <div data-cascade>
              <span className="section__id"><b>why_we_embed</b></span>
              <h2 className="bslab">
                <span className="line"><span className="word">A</span> <span className="word">frontier</span> <span className="word">model</span> <span className="word">is</span> <span className="word">brilliant.</span></span>
                <span className="line"><span className="word">And</span> <span className="word">blind</span> <span className="word">to</span> <span className="word">how</span></span>
                <span className="line line-accent"><span className="word marquee-word">your</span> <span className="word marquee-word">operation</span> <span className="word marquee-word">runs.</span></span>
              </h2>
            </div>
            <p className="section__desc reveal">The knowledge that runs your business lives in your people and sits scattered across tools that never share it. We embed, build the brain that unifies it, and put agents to work where the real work actually happens.</p>
          </div>
        </section>

        {/* SEC_02 — PLATFORM · brain 0.40 (brightest — the brain IS the point here) · 2-col:
            3 text blocks (left) | the 5-tile "one task through the brain" diagram (right): 4 domain
            cards + a center console, animated by <PlatformDiagram/> (anime.js — signals ride the
            circuit traces into the brain in sequence). Mobile (<900px): console block on top + cards
            as a 2-col grid, signal traces hidden (globals.css .hr mobile rules). */}
        <section className="sec platform" id="platform" aria-label="The platform">
          <div className="frame plat2">
            <div className="reveal">
              <span className="eyebrow">one brain over everything you run</span>
              <h2>Your operation needs <span className="accent">a brain.</span></h2>
              <span className="tab">System Overview</span>
              <div className="plat2__p"><h3>Scoped, evaluated, audited.</h3><p>Every agent is measured against technical and behavioral benchmarks, with a full audit trail. Scoped, replaceable, never a black box.</p></div>
              <div className="plat2__p"><h3>The brain learns your operation.</h3><p>It unifies every tool you already pay for into one source of truth your AI can read and act on. Every job it runs makes it sharper than the last deploy.</p></div>
              <div className="plat2__p"><h3>Your team runs the control tower.</h3><p>Interfaces built to your workflow let your people direct, customize, and deploy agents themselves. Collaboration with your AI workforce, not dependence on a vendor.</p></div>
            </div>
            <div className="plat2__diagram">
              <div className="hr">
                <div className="hrbox tl" id="t-context"><div className="hrbox__h"><span className="hrbox__dot" aria-hidden />Context</div><div className="hrbox__l">All company interactions unified. Builds over time and improves agent knowledge.</div><span className="hrbox__st">syncing →</span></div>
                <div className="hrbox r tr" id="t-models"><div className="hrbox__h">Models<span className="hrbox__dot" aria-hidden /></div><div className="hrbox__l">Your workflows, built with the best cost-efficient frontier and open-source models for the outcomes you want.</div><span className="hrbox__st">← routing</span></div>
                <div className="hrbox bl" id="t-ai"><div className="hrbox__h"><span className="hrbox__dot" aria-hidden />AI Employees</div><div className="hrbox__l">Evaluated against your technical and behavioral benchmarks.</div><span className="hrbox__st">running →</span></div>
                <div className="hrbox r br" id="t-gov"><div className="hrbox__h">Governance<span className="hrbox__dot" aria-hidden /></div><div className="hrbox__l">Every action captured and audit-ready.</div><span className="hrbox__st">← logged</span></div>
                <svg className="wires" viewBox="0 0 100 72" preserveAspectRatio="none" aria-hidden="true">
                  <path className="wire-base" d="M16,24 V30 H25" />
                  <path className="wire-base" d="M84,24 V30 H75" />
                  <path className="wire-base" d="M16,52 V42 H25" />
                  <path className="wire-base" d="M84,52 V42 H75" />
                  <path id="p1" d="M16,24 V30 H25" fill="none" stroke="none" />
                  <path id="p2" d="M84,24 V30 H75" fill="none" stroke="none" />
                  <path id="p3" d="M25,42 H16 V52" fill="none" stroke="none" />
                  <path id="p4" d="M84,52 V42 H75" fill="none" stroke="none" />
                  <circle className="sig" id="s1" r="1.25" cx="0" cy="0" />
                  <circle className="sig" id="s2" r="1.25" cx="0" cy="0" />
                  <circle className="sig" id="s3" r="1.25" cx="0" cy="0" />
                  <circle className="sig" id="s4" r="1.25" cx="0" cy="0" />
                </svg>
                <div className="hrcore">
                  <i className="brk tl" /><i className="brk tr" /><i className="brk bl" /><i className="brk br" />
                  <span className="hrcore__glow" id="bglow" />
                  <span className="hrcore__ring" id="bring" />
                  <div className="hrcore__head"><span className="pip" /><b>THE BRAIN</b></div>
                  <div className="blog" id="brainlog" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEC_04 — CASES · brain 0.18 · shared <Cases/> (also the /cases route). Hidden on
            mobile here (globals.css .page-home #cases) — reached from the menu instead. */}
        <Cases />

        {/* SEC_05 — CLOSING CTA + FOOTER · brain 0.42 (brightest, centered behind the headline)
            · id="calendly" (nav "Contact" target) · single CTA + 3 trust checks + footer links.
            The cinematic closing moment. */}
        <section className="sec cta" id="calendly" aria-label="Book a call">
          <div className="frame">
            <div data-cascade>
              <h2>
                <span className="line"><span className="word">Map</span> <span className="word">your</span> <span className="word">operation</span></span>
                <span className="line line-accent"><span className="word marquee-word">on</span> <span className="word marquee-word">the</span> <span className="word marquee-word">first</span> <span className="word marquee-word">call.</span></span>
              </h2>
            </div>
            <p className="cta__sub reveal">See where the AI workforce goes, and what it returns. Then we build it, run it, and hand you the keys.</p>
            <div className="stagestrip reveal" aria-label="Engagement stages"><span>01 Discover</span><span>02 Build the Node</span><span>03 Deploy Agents</span><span>04 Connect MCPs</span><span>05 Operate with you</span></div>
            <div className="cta__btn reveal"><a className="btn btn--primary" href={CAL}>Book a discovery call <span className="car" aria-hidden>→</span></a></div>
            <div className="checks reveal"><span>Embedded engineers</span><span>You own the output</span><span>We keep operating it with you</span></div>
          </div>
          <footer className="footer">
            <div className="frame footer__inner">
              <span className="footer__tag">The brain your operation runs&nbsp;on.</span>
              <span className="footer__cue">audit · consent · privacy by default</span>
              <div className="footer__links">
                <a href="#platform">How we work</a>
                <a href="#cases">Case studies</a>
                <a href={CAL}>Book a discovery call</a>
              </div>
              <span className="footer__copy">© 2026 Ajolote Labs · all rights reserved</span>
            </div>
          </footer>
        </section>
      </main>

      <MotionScript />
      <PlatformDiagram />
    </>
  );
}
