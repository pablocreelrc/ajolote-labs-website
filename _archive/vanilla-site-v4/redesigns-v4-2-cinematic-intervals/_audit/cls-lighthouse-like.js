// Replicate Lighthouse mobile exactly: simulated throttling via CDP, UA, viewport.
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    deviceScaleFactor: 1.75,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 Chrome/147.0.0.0 Mobile Safari/537.36",
  });
  const page = await ctx.newPage();

  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  // Lighthouse mobile = slow 4G ~1.6Mbps, 562ms RTT, 4x CPU
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (0.75 * 1024 * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  await page.addInitScript(() => {
    window.__shifts = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.hadRecentInput) continue;
        const sources = (entry.sources || []).map((s) => {
          const n = s.node;
          let info = "(no node)";
          if (n && n.tagName) {
            info =
              n.tagName.toLowerCase() +
              (n.id ? "#" + n.id : "") +
              (n.className
                ? "." + String(n.className).split(" ").slice(0, 3).join(".")
                : "");
            info += ` [${(n.textContent || "").replace(/\s+/g, " ").slice(0, 60)}]`;
          }
          return {
            info,
            prev: s.previousRect && {
              x: Math.round(s.previousRect.x),
              y: Math.round(s.previousRect.y),
              w: Math.round(s.previousRect.width),
              h: Math.round(s.previousRect.height),
            },
            curr: s.currentRect && {
              x: Math.round(s.currentRect.x),
              y: Math.round(s.currentRect.y),
              w: Math.round(s.currentRect.width),
              h: Math.round(s.currentRect.height),
            },
          };
        });
        window.__shifts.push({
          value: entry.value,
          startTime: entry.startTime,
          sources,
        });
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto(
    "https://ajolote-labs-website.vercel.app/redesigns/v4-2-cinematic-intervals/",
    { waitUntil: "load", timeout: 120000 }
  );
  await page.waitForTimeout(8000);

  const shifts = await page.evaluate(() => window.__shifts);
  const total = shifts.reduce((a, s) => a + s.value, 0);
  console.log("CLS total:", total.toFixed(4), "entries:", shifts.length);
  for (const [i, s] of shifts.entries()) {
    console.log(
      `\n#${i + 1} val=${s.value.toFixed(4)} t=${s.startTime.toFixed(0)}ms`
    );
    for (const src of s.sources) {
      console.log("  ->", src.info);
      console.log(
        "     prev:", JSON.stringify(src.prev),
        "curr:", JSON.stringify(src.curr)
      );
    }
  }

  await browser.close();
})();
