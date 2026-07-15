// Probe: tap burger → tap "Case Studies" link → measure where viewport lands.
// Expectation: top of #casesGrid (the cards) is at viewport top (y ≈ 0),
// NOT the #cases section's H2 heading.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'http://127.0.0.1:8765/';
const OUT = path.join(__dirname, 'screenshots-scroll-fix');
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '320', w: 320, h: 700 },
  { name: '375', w: 375, h: 812 },
  { name: '414', w: 414, h: 896 },
];

(async () => {
  const browser = await chromium.launch();
  const out = [];

  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: v.w, height: v.h },
      reducedMotion: 'reduce',
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Tap burger
    const burger = page.locator('.burger, [class*="burger"], button[aria-label*="menu" i]').first();
    if (await burger.count()) {
      try { await burger.click({ timeout: 2000 }); } catch (e) {}
    }
    await page.waitForTimeout(300);

    // Tap Case Studies link
    const casesLink = page.locator('a[data-reveal="cases"]').first();
    if (await casesLink.count()) {
      try { await casesLink.click({ timeout: 2000 }); } catch (e) {}
    }
    await page.waitForTimeout(1200);

    const probe = await page.evaluate(() => {
      const sectionTop = document.getElementById('cases')?.getBoundingClientRect().top;
      const gridTop = document.getElementById('casesGrid')?.getBoundingClientRect().top;
      const h2Top = document.getElementById('casesTitle')?.getBoundingClientRect().top;
      const firstCardTop = document.querySelector('.case')?.getBoundingClientRect().top;
      const scrollY = window.scrollY;
      return {
        scrollY,
        sectionTop: Math.round(sectionTop ?? -9999),
        gridTop: Math.round(gridTop ?? -9999),
        h2Top: Math.round(h2Top ?? -9999),
        firstCardTop: Math.round(firstCardTop ?? -9999),
      };
    });

    out.push({ vp: v.name, ...probe });
    await page.screenshot({ path: path.join(OUT, 'after-tap-' + v.name + '.png') });
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
})();
