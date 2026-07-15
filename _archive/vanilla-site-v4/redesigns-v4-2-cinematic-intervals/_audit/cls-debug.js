// Debug CLS sources via Playwright + PerformanceObserver
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    deviceScaleFactor: 2.625,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 Chrome/147.0.0.0 Mobile Safari/537.36",
  });
  const page = await ctx.newPage();

  // Register PerformanceObserver before any CSS/JS runs
  await page.addInitScript(() => {
    window.__cls_entries = [];
    window.__cls_total = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__cls_total += entry.value;
          const sources = (entry.sources || []).map((s) => {
            const n = s.node;
            const sel =
              n && n.tagName
                ? n.tagName.toLowerCase() +
                  (n.id ? "#" + n.id : "") +
                  (n.className ? "." + String(n.className).split(" ").join(".") : "")
                : "unknown";
            return {
              selector: sel,
              text: (n && (n.innerText || "")).slice(0, 60),
              prev: s.previousRect,
              curr: s.currentRect,
            };
          });
          window.__cls_entries.push({
            value: entry.value,
            startTime: entry.startTime,
            sources,
          });
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto(
    "https://ajolote-labs-website.vercel.app/redesigns/v4-2-cinematic-intervals/",
    { waitUntil: "networkidle", timeout: 60000 }
  );
  // Let fonts/images fully settle
  await page.waitForTimeout(3000);

  const result = await page.evaluate(() => ({
    total: window.__cls_total,
    entries: window.__cls_entries,
  }));
  console.log("CLS total:", result.total.toFixed(4));
  console.log("entries:", result.entries.length);
  for (const [i, e] of result.entries.entries()) {
    console.log(
      `\n#${i + 1} value=${e.value.toFixed(4)} t=${e.startTime.toFixed(0)}ms sources=${e.sources.length}`
    );
    for (const s of e.sources) {
      console.log(
        `   -> ${s.selector.slice(0, 120)} | text: "${s.text}"`
      );
      console.log(
        `      prev: x=${Math.round(s.prev?.x || 0)} y=${Math.round(
          s.prev?.y || 0
        )} w=${Math.round(s.prev?.width || 0)} h=${Math.round(
          s.prev?.height || 0
        )}`
      );
      console.log(
        `      curr: x=${Math.round(s.curr?.x || 0)} y=${Math.round(
          s.curr?.y || 0
        )} w=${Math.round(s.curr?.width || 0)} h=${Math.round(
          s.curr?.height || 0
        )}`
      );
    }
  }

  await browser.close();
})();
