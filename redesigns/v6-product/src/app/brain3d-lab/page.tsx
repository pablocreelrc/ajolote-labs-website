"use client";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import type { Look } from "./BrainScene";

// WebGL out of the critical path: load the Canvas + three.js only on the client.
const BrainScene = dynamic(() => import("./BrainScene"), { ssr: false });

const LOOKS: Array<{ id: Look; label: string; blurb: string }> = [
  { id: "wireframe", label: "1 · Holographic wireframe", blurb: "The real brain as a glowing cyan hologram/scan. On-brand, recognizable." },
  { id: "particle", label: "2 · Particle / neural", blurb: "Same brain dissolved into thousands of glowing points. Most 'AI brain', lightest." },
  { id: "connectome", label: "3 · Connectome / nodes", blurb: "Same brain as wired nodes + links — the 'one brain · nodes · agents' substrate read." },
];

export default function Brain3DLab() {
  const [look, setLook] = useState<Look>("wireframe");

  return (
    <main style={{ minHeight: "100svh", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--mono)", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "28px 28px 0", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--text-mute)", fontWeight: 500 }}>
          3D brain · pick the look
        </h1>
        <p style={{ fontSize: 11, color: "var(--text-dim)", maxWidth: 420, lineHeight: 1.6 }}>
          The real 3D brain mesh, rotating. Drag to spin it yourself. Flip between the three looks below — reply with a number to pick.
        </p>
      </header>

      <div style={{ height: "70svh", position: "relative" }}>
        <Suspense fallback={<div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--cyan-dim)", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase" }}>loading brain…</div>}>
          <BrainScene look={look} />
        </Suspense>
      </div>

      <footer style={{ padding: "0 28px 36px", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {LOOKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLook(l.id)}
              className={"btn " + (look === l.id ? "btn--primary" : "btn--ghost")}
            >
              {l.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "var(--text-dim)", maxWidth: 460, textAlign: "center", lineHeight: 1.6, minHeight: 30 }}>
          {LOOKS.find((l) => l.id === look)?.blurb}
        </p>
      </footer>
    </main>
  );
}
