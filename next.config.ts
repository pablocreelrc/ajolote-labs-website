import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const nextConfig: NextConfig = {
  // Static export → deploys on Cloudflare Pages exactly like the current vanilla site.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // three.js ships untranspiled ESM — required for the 3D brain preloader (R3F).
  transpilePackages: ["three"],
  // Pin the workspace root to this app — there's a second package-lock.json at the
  // ajolote-labs-website/ parent, which otherwise triggers an inferred-root warning.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
};

export default nextConfig;
