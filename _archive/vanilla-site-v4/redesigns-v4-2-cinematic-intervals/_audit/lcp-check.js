// Check if browser records LCP for the page
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1350, height: 940 },
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
  });
  const page = await ctx.newPage();

  await page.addInitScript(() => {
    window.__lcp = [];
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        window.__lcp.push({
          startTime: e.startTime,
          renderTime: e.renderTime,
          loadTime: e.loadTime,
          size: e.size,
          url: e.url || null,
          id: e.id,
          elTag: e.element ? e.element.tagName : null,
          elId: e.element ? e.element.id : null,
          elClass: e.element
            ? (e.element.className || "").toString().slice(0, 100)
            : null,
          elText: e.element
            ? (e.element.innerText || "").slice(0, 100)
            : null,
        });
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });

  await page.goto(
    "https://ajolote-labs-website.vercel.app/redesigns/v4-2-cinematic-intervals/",
    { waitUntil: "load", timeout: 60000 }
  );
  await page.waitForTimeout(4000);

  const lcps = await page.evaluate(() => window.__lcp);
  console.log("LCP entries:", lcps.length);
  for (const l of lcps) {
    console.log(JSON.stringify(l));
  }
  await browser.close();
})();
