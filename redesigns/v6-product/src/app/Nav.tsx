"use client";
/**
 * Nav — sticky top bar + mobile menu. Client component (owns the hamburger open state).
 * Mounted in layout.tsx so it's shared across routes (home + /cases).
 * Desktop (≥900px): brand + inline same-page anchors + Online pill + Book-call CTA.
 * Mobile (<900px): inline links + pill + CTA hidden via CSS; burger toggles .nav__mobile.
 *   Mobile links are root-relative (work from /cases too) and "Cases" → its own /cases page.
 */
import { useState } from "react";
import Link from "next/link";

const CAL = "https://calendly.com/hello-ajolotelabs";

// Desktop inline links: desktop always sits on the home page (cases inline) → same-page anchors.
const DESK_LINKS = [
  { href: "#platform", label: "Services" },
  { href: "#cases", label: "Cases" },
  { href: CAL, label: "Contact" },
];
// Mobile dropdown: must work from home AND /cases, so root-relative; Cases is its own page.
const MOBILE_LINKS = [
  { href: "/#platform", label: "Services", external: false },
  { href: "/cases", label: "Cases", external: false },
  { href: CAL, label: "Contact", external: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="nav__inner">
        <Link className="nav__brand" href="/">ajolote<b>labs</b></Link>
        <div className="nav__links">
          {DESK_LINKS.map((l) => (
            <a key={l.label} className="nav__link" href={l.href}>{l.label}</a>
          ))}
        </div>
        <div className="nav__right">
          <span className="pill">Online</span>
          <a className="btn btn--primary" href={CAL}>Book a discovery call <span className="car" aria-hidden>→</span></a>
          <button
            type="button"
            className={"nav__burger" + (open ? " nav__burger--open" : "")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — shown only <900px when open (see globals.css NAV). */}
      <div className={"nav__mobile" + (open ? " nav__mobile--open" : "")}>
        {MOBILE_LINKS.map((l) =>
          l.external ? (
            <a key={l.label} className="nav__mlink" href={l.href} onClick={close}>{l.label}</a>
          ) : (
            <Link key={l.label} className="nav__mlink" href={l.href} onClick={close}>{l.label}</Link>
          )
        )}
        <a className="btn btn--primary nav__mcta" href={CAL} onClick={close}>
          Book a discovery call <span className="car" aria-hidden>→</span>
        </a>
      </div>
    </nav>
  );
}
