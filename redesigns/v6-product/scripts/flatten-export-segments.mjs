/**
 * Post-export fix for a Windows-only Next.js 16 static-export bug.
 *
 * The client router prefetches per-segment RSC payloads at flat, dot-joined URLs
 * (e.g. /cases/__next.cases.__PAGE__.txt — see convertSegmentPathToStaticExportFilename
 * in next/shared/lib/segment-cache/segment-value-encoding, which maps the segment path
 * "/cases/__PAGE__" to "__next.cases.__PAGE__.txt" by replacing "/" with ".").
 *
 * But the export writer (next/dist/export/index.js) collects segment files with
 * path.relative(), which on Windows returns BACKSLASH-separated paths
 * ("cases\\__PAGE__.segment.rsc"). The "/" -> "." replacement misses the "\\", and
 * path.join() then treats it as a directory separator, so the payload lands at
 * out/cases/__next.cases/__PAGE__.txt instead of out/cases/__next.cases.__PAGE__.txt.
 * Client-side navigation to that route then 404s on the flat filename.
 *
 * This script flattens those misplaced directories back into the dot-joined filenames
 * the router requests. It is a no-op on builds where the bug doesn't occur (POSIX).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = fileURLToPath(new URL("../out", import.meta.url));

/** Recursively walk routeDir looking for directories named "__next.*" and flatten them. */
function flatten(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      moveUp(dir, full, entry.name);
    } else {
      flatten(full);
    }
  }
}

/** Move every file inside brokenDir up to routeDir as "<prefix>.<subpath with dots>". */
function moveUp(routeDir, brokenDir, prefix) {
  for (const entry of fs.readdirSync(brokenDir, { withFileTypes: true })) {
    const full = path.join(brokenDir, entry.name);
    if (entry.isDirectory()) {
      moveUp(routeDir, full, `${prefix}.${entry.name}`);
    } else {
      fs.renameSync(full, path.join(routeDir, `${prefix}.${entry.name}`));
    }
  }
  fs.rmdirSync(brokenDir);
}

if (fs.existsSync(outDir)) {
  flatten(outDir);
}
