"use client";
/**
 * SectionSpine — a minimal right-edge dot rail that tracks the active snapped section
 * (review A9: a paginated snap model needs wayfinding). Desktop only (mobile is natural
 * scroll, no snap). Mounted on the home page (which has all five sections); the /cases
 * route doesn't render it.
 */
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "thesis", label: "Why" },
  { id: "platform", label: "Platform" },
  { id: "cases", label: "Cases" },
  { id: "calendly", label: "Contact" },
];

export default function SectionSpine() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const secs = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!secs.length) return;
    // a zero-height detection line at viewport center: exactly one section crosses it at a time
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="spine" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={"spine__dot" + (active === s.id ? " is-active" : "")}
          aria-label={s.label}
          aria-current={active === s.id ? "true" : undefined}
        >
          <span className="spine__label">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
