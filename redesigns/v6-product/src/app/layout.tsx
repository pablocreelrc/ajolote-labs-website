/**
 * Root layout — self-hosted fonts, page metadata + viewport, and the site-wide chrome:
 * <BrainExperience /> (the persistent brain) + <Nav /> (sticky bar / mobile menu), both
 * mounted once here so they're shared across routes (home + /cases). They render before
 * {children}; final paint order is controlled by z-index in globals.css, not source order.
 */
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BrainExperience from "./BrainExperience";
import Nav from "./Nav";

// Self-hosted brand fonts (DESIGN.md §3) — Satoshi display, General Sans body, JetBrains Mono labels.
const display = localFont({
  src: [
    { path: "../../public/fonts/satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: [
    { path: "../../public/fonts/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/general-sans-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: [{ path: "../../public/fonts/jetbrains-mono-400.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajolote Labs: AI brain and AI employees for your company",
  description:
    "We build the brain that unifies your stack, the AI employees who run on it, and keep operating it with you.",
  metadataBase: new URL("https://ajolotelabs.ai"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ajolote Labs: AI brain and AI employees for your company",
    description:
      "We build the brain that unifies your stack, the AI employees who run on it, and keep operating it with you.",
    url: "/",
    siteName: "Ajolote Labs",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ajolote Labs: stop losing money to manual operations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajolote Labs: AI brain and AI employees for your company",
    description:
      "We build the brain that unifies your stack, the AI employees who run on it, and keep operating it with you.",
    images: ["/og.png"],
  },
};

// viewportFit:cover pairs with the env(safe-area-inset-*) padding in globals.css so the
// dark theme reaches edge-to-edge under the notch on phones.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body><BrainExperience /><Nav />{children}</body>
    </html>
  );
}
