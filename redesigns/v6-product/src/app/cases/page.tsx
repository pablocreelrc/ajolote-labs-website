/**
 * /cases — dedicated Case Studies page. On mobile the menu's "Cases" links here (the inline
 * copy is hidden on the home scroll); on desktop cases stay inline on home and this route is
 * just a bonus deep-link. Reuses <Cases/> + needs <MotionScript/> for its reveals/count-ups.
 * Nav + the ambient brain come from layout.tsx. Client-nav from home keeps the brain (no re-boot).
 */
import Link from "next/link";
import Cases from "../Cases";
import MotionScript from "../MotionScript";

export const metadata = {
  title: "Case studies — Ajolote Labs",
  description: "Real results from real operations: cross-border consumer goods and enterprise loyalty.",
};

export default function CasesPage() {
  return (
    <>
      <main id="main" className="page-cases">
        <Cases />
        <div className="frame cases-back">
          <Link className="btn btn--ghost" href="/"><span aria-hidden>←</span> Back to home</Link>
        </div>
      </main>
      <MotionScript />
    </>
  );
}
