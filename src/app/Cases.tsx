/**
 * Cases — the case-studies block (was SEC_04 inline). Shared by two places:
 *   - the home page (rendered inline; HIDDEN on mobile via globals.css so the mobile home
 *     scroll stays short), and
 *   - the dedicated /cases route (the mobile menu's "Cases" target).
 * Cards reveal via .reveal (driven by MotionScript), so any page that renders <Cases/> must
 * also render <MotionScript/>.
 * NOTE: cases are QUALITATIVE for now (outcome headline + prose, NO metric cells / fake numbers).
 * Real figures slot back as .mcell metric cells per card before the production cut-over.
 */
export default function Cases() {
  return (
    <section className="sec cases" id="cases" aria-label="Case studies">
      <div className="frame">
        <div data-cascade>
          <h2>
            <span className="line"><span className="word">Real</span> <span className="word">results</span> <span className="word">from</span> <span className="word">real</span></span>
            <span className="line line-accent"><span className="word marquee-word">operations.</span></span>
          </h2>
        </div>
        <p className="cases__sub reveal">In production across cross-border consumer goods and enterprise loyalty operations.</p>
        <div className="cgrid">
          <article className="case reveal">
            <div className="case__tag"><b>CASE_01</b> · Trade &amp; Distribution</div>
            <h3>Cross-Border Spirits</h3>
            <div className="case__result">Margin leaks caught before product ships.</div>
            <p>Built the brain that maps a spirits brand&apos;s entire cross-border supply chain, and the AI employees that catch pricing and margin leaks before a shipment leaves, across systems that never used to talk to each other.</p>
          </article>
          <article className="case reveal">
            <div className="case__tag"><b>CASE_02</b> · Enterprise B2B</div>
            <h3>Loyalty Platform</h3>
            <div className="case__result">A turnaround that compounds, month over month.</div>
            <p>An AI-native turnaround: a company brain where AI employees find the next manual workflow, automate it, and move to the next, so the operation gets leaner every month, not just once.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
