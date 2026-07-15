// Capture desktop screenshots for full audit:
// - Full-page at 1280, 1440, 1920
// - Per-section at 1440 (single canonical desktop width)
// Reduced motion always.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'http://127.0.0.1:8765/';
const OUT = path.join(__dirname, 'desktop-audit');
fs.mkdirSync(OUT, { recursive: true });

const FULL_PAGE_VPS = [
  { name: '1280', w: 1280, h: 800 },
  { name: '1440', w: 1440, h: 900 },
  { name: '1920', w: 1920, h: 1080 },
];

const SECTIONS = [
  { id: 'hero', name: 'hero' },
  { id: 'services', name: 'services' },
  { id: 'cases', name: 'cases' },
  { id: 'calendly', name: 'cta' },
];

(async () => {
  const browser = await chromium.launch();

  // Full-page captures
  for (const v of FULL_PAGE_VPS) {
    const ctx = await browser.newContext({
      viewport: { width: v.w, height: v.h },
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(OUT, 'fullpage-' + v.name + '.png'),
      fullPage: true,
    });
    await ctx.close();
  }

  // Per-section at 1440 (canonical desktop)
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  for (const s of SECTIONS) {
    const exists = await page.evaluate((id) => !!document.getElementById(id), s.id);
    if (!exists) continue;
    const box = await page.evaluate((id) => {
      const el = document.getElementById(id);
      const r = el.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + r.top, behavior: 'auto' });
      return { x: 0, y: 0, w: window.innerWidth, h: Math.max(900, el.scrollHeight) };
    }, s.id);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(OUT, 'section-' + s.name + '.png'),
      clip: { x: 0, y: 0, width: 1440, height: Math.min(box.h, 1500) },
    });
  }

  // Capture nav bar and footer specifically
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(OUT, 'section-nav.png'),
    clip: { x: 0, y: 0, width: 1440, height: 90 },
  });

  // Footer = scroll to bottom, capture last viewport
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' }));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUT, 'section-footer.png'),
    fullPage: false,
  });

  await ctx.close();
  await browser.close();
  console.log('Captured desktop screenshots → ' + OUT);
})();
