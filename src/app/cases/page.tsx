/**
 * /cases — dedicated Case Studies page. On mobile the menu's "Cases" links here (the inline
 * copy is hidden on the home scroll); on desktop cases stay inline on home and this route is
 * just a bonus deep-link. Reuses <Cases/> + needs <MotionScript/> for its reveals/count-ups.
 * Nav + the ambient brain come from layout.tsx. Client-nav from home keeps the brain (no re-boot).
 */
import type { Metadata } from "next";
import Link from "next/link";
import Cases from "../Cases";
import MotionScript from "../MotionScript";

export const metadata: Metadata = {
  title: "Case studies · Ajolote Labs",
  description: "Real results from real operations: cross-border consumer goods and enterprise loyalty.",
  alternates: { canonical: "/cases/" },
  // Next replaces (not deep-merges) the root layout's openGraph/twitter objects, so the
  // shared fields (image, siteName, type) are restated here.
  openGraph: {
    title: "Case studies · Ajolote Labs",
    description: "Real results from real operations: cross-border consumer goods and enterprise loyalty.",
    url: "/cases/",
    siteName: "Ajolote Labs",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ajolote Labs: stop losing money to manual operations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case studies · Ajolote Labs",
    description: "Real results from real operations: cross-border consumer goods and enterprise loyalty.",
    images: ["/og.png"],
  },
};

export default function CasesPage() {
  return (
    <>
      <main id="main" className="page-cases">
        {/* The shared <Cases/> block opens at h2 (it's a section on the home page), so the
            standalone route provides the document h1 (visually hidden — the h2 is the visual
            title) and a back link that's reachable without scrolling past the cards. */}
        <h1 className="sr-only">Case studies</h1>
        <div className="frame cases-back">
          <Link className="btn btn--ghost" href="/"><span aria-hidden>←</span> Back to home</Link>
        </div>
        <Cases />
        <div className="frame cases-back">
          <Link className="btn btn--ghost" href="/"><span aria-hidden>←</span> Back to home</Link>
        </div>
      </main>
      <MotionScript />
    </>
  );
}
