"use client";
/**
 * BrainExperience — the site's signature brain, owned in one place.
 *
 * Lifecycle (a 3-phase state machine, all timer-driven, no user click):
 *   boot        full-screen particle brain converges + wordmark/progress overlay; scroll locked
 *   transition  overlay fades, brain dims + recedes, content reveals; scroll unlocks
 *   background  brain is a fixed, dimmed, per-section ambient layer behind the whole site
 *
 * Desktop vs mobile (the two differ ONLY in the background phase):
 *   desktop  live WebGL <BrainScene> stays mounted forever as the ambient background
 *   mobile   live brain runs through the boot, then we swap to a STATIC poster image and
 *            unmount the canvas — no persistent WebGL = no battery drain / context-loss risk.
 *   The same poster is the WebGL-failure fallback on every device (see CanvasBoundary).
 *
 * Tunable knobs live at the top of this file: BOOT_MS, TRANSITION_MS, BRAIN_BY_SECTION.
 * Layering/CSS lives in globals.css under "BRAIN EXPERIENCE". Mounted once in layout.tsx.
 */
import { Component, type ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// WebGL/three stays out of SSR + the static-export HTML (client-only).
const BrainScene = dynamic(() => import("./brain3d-lab/BrainScene"), { ssr: false });

// ── Tunable timing knobs ──────────────────────────────────────────────────────
// BOOT_MS must be ≥ the brain's CONVERGE_SEC (1.7s, in BrainScene.tsx) so the
// particle brain fully assembles, then holds bright, before it recedes.
const BOOT_MS = 3500;          // boot phase: converge (~1.7s) + a brief hold before handoff. Keep CSS .brain-exp__bar bootfill in sync (3.5s).
const TRANSITION_MS = 800;     // boot → background: overlay fade + brain dim/recede
const BOOT_MS_REDUCED = 250;   // prefers-reduced-motion: skip the show
const TRANSITION_MS_REDUCED = 150;
const MOBILE_QUERY = "(max-width: 768px)"; // matches the layout-collapse breakpoint in globals.css

const STEPS = ["initializing brain", "mounting nodes", "agents online"];

// Per-section ambient-brain intensity (base 0.25). Brighter where the brain IS the
// point (Platform diagram, closing CTA); dimmer behind the sparse text "breaths".
// Keyed by section id (see page.tsx). Drives the --brain-bg-opacity CSS var.
const BRAIN_BY_SECTION: Record<string, number> = {
  hero: 0.25,
  thesis: 0.12,
  platform: 0.4,
  ownership: 0.12,
  cases: 0.18,
  calendly: 0.42,
};
const BRAIN_DEFAULT = 0.25;

// Static brain still used as the mobile ambient bg + the universal WebGL-failure fallback.
function BrainPoster() {
  // eslint-disable-next-line @next/next/no-img-element -- static export, intentional <img>
  return <img className="brain-exp__poster" src="/brain-poster.webp" alt="" aria-hidden draggable={false} />;
}

// If WebGL fails (low-end device, GPU blocklist, context loss), fall back to the poster
// rather than crashing the site — the brand moment survives, just not animated.
class CanvasBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() {} // swallow — the site is fully usable on the poster fallback
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

// Scroll lock for the boot phase. Plain `overflow:hidden` drops the desktop scrollbar,
// which widens the page and shifts every in-flow element — once at lock, again at reveal
// (the measured CLS at the boot handoff). Reserving the scrollbar's width as body padding
// while locked keeps layout width constant. Overlay scrollbars measure 0 → no-op there.
function lockScroll() {
  const gutter = window.innerWidth - document.documentElement.clientWidth;
  if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
  document.body.style.overflow = "hidden";
}
function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

type Phase = "boot" | "transition" | "background";

export default function BrainExperience() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [step, setStep] = useState(0);
  // Lazy init so the value is correct on the FIRST client render — this keeps mobile from
  // ever mounting the live <BrainScene>, so phones never download three.js or touch WebGL.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );

  // Keep it in sync if the viewport crosses the breakpoint (desktop ↔ rotate/resize).
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Jump straight to the site — fired by the timer, or by tapping the boot overlay (a
  // safety escape so a slow/janky device can never leave you stuck on the preloader).
  const reveal = () => {
    setPhase("background");
    unlockScroll();
    document.documentElement.classList.remove("brain-booting");
    document.documentElement.classList.add("brain-revealed");
  };

  // The boot → transition → background timeline.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const boot = reduce ? BOOT_MS_REDUCED : BOOT_MS;
    const trans = reduce ? TRANSITION_MS_REDUCED : TRANSITION_MS;
    const root = document.documentElement;

    lockScroll(); // lock scroll during boot (gutter-compensated — see lockScroll)
    root.classList.add("brain-booting");

    let si = 0;
    const stepT = reduce ? 0 : window.setInterval(() => {
      si = Math.min(si + 1, STEPS.length - 1);
      setStep(si);
    }, boot / STEPS.length);

    // boot → transition: dim+recede the brain, fade the overlay, reveal content
    const toTransition = window.setTimeout(() => {
      if (stepT) clearInterval(stepT);
      setStep(STEPS.length - 1);
      setPhase("transition");
      unlockScroll();
      root.classList.remove("brain-booting");
      root.classList.add("brain-revealed");
    }, boot);

    // transition → background: overlay unmounts; brain becomes the ambient layer
    const toBackground = window.setTimeout(() => setPhase("background"), boot + trans);

    return () => {
      if (stepT) clearInterval(stepT);
      clearTimeout(toTransition);
      clearTimeout(toBackground);
      unlockScroll();
      root.classList.remove("brain-booting");
    };
  }, []);

  // Background phase only: ramp --brain-bg-opacity to the dominant section's target.
  // The IntersectionObserver tracks every section's visible ratio and picks the most-
  // visible one; the .brain-exp 0.7s opacity transition (globals.css) smooths each change.
  useEffect(() => {
    if (phase !== "background") return;
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("#main .sec"));
    if (!sections.length) return;
    const ratios = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target, e.intersectionRatio);
        let best: Element | null = null;
        let max = 0;
        ratios.forEach((r, el) => { if (r > max) { max = r; best = el; } });
        if (best) {
          const target = BRAIN_BY_SECTION[(best as HTMLElement).id] ?? BRAIN_DEFAULT;
          root.style.setProperty("--brain-bg-opacity", String(target));
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [phase]);

  return (
    <>
      {/* Fixed container for the persistent brain. background:var(--bg) keeps it an opaque
          cover during boot even before the canvas hydrates (no FOUC). --boot vs --bg in CSS.
          Live brain on every device; mobile gets the `lite` (no-bloom) variant so phone GPUs
          don't hang. The poster only appears via CanvasBoundary if WebGL fails entirely.
          suppressHydrationWarning: server can't know isMobile, so the lite flag differs between
          SSR and the first client render — harmless for this decorative layer. */}
      <div className={"brain-exp " + (phase === "boot" ? "brain-exp--boot" : "brain-exp--bg")} aria-hidden suppressHydrationWarning>
        <CanvasBoundary fallback={<BrainPoster />}>
          <BrainScene look="particle" interactive={false} lite={isMobile} />
        </CanvasBoundary>
      </div>
      {phase !== "background" && (
        <div
          className={"brain-exp__overlay" + (phase === "transition" ? " brain-exp__overlay--leaving" : "")}
          role="status"
          aria-label="Booting Ajolote Labs, tap to skip"
          onClick={reveal}
        >
          <div className="brain-exp__inner">
            <div className="brain-exp__mark">ajolote<b>labs</b></div>
            <div className="brain-exp__bar"><span /></div>
            <div className="brain-exp__status">{STEPS[step]}<span className="brain-exp__caret">_</span></div>
            <div className="brain-exp__skip">tap to skip →</div>
          </div>
        </div>
      )}
    </>
  );
}
