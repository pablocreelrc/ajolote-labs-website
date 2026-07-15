// Probe trimmed cases across mobile + desktop.
// Verifies: equal-height cards, 1-line subtitle, parallel metric labels,
// updated pill names. Reduced motion to avoid flake.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'http://127.0.0.1:8765/';
const OUT = path.join(__dirname, 'screenshots-cases-trim');
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '320', w: 320, h: 700, mobile: true },
  { name: '375', w: 375, h: 812, mobile: true },
  { name: '414', w: 414, h: 896, mobile: true },
  { name: '599', w: 599, h: 900, mobile: true },
  { name: '1280', w: 1280, h: 800, mobile: false },
  { name: '1440', w: 1440, h: 900, mobile: false },
];

(async () => {
  const browser = await chromium.launch();
  const findings = [];

  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: v.w, height: v.h },
      reducedMotion: 'reduce',
      isMobile: v.mobile,
      hasTouch: v.mobile,
      userAgent: v.mobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Mobile: open burger + tap data-reveal cases. Desktop: scroll to #cases.
    if (v.mobile) {
      const burger = page.locator('[data-menu-toggle], .menu-toggle, [aria-label*="menu" i]').first();
      if (await burger.count()) {
        try { await burger.click({ timeout: 1500 }); } catch (e) {}
      }
      await page.waitForTimeout(150);
      const revealLink = page.locator('a[data-reveal="cases"]').first();
      if (await revealLink.count()) {
        try { await revealLink.click({ timeout: 1500 }); } catch (e) {}
      }
    } else {
      try {
        await page.evaluate(() => {
          const el = document.getElementById('cases');
          if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
        });
      } catch (e) {}
    }

    await page.waitForTimeout(700);

    const probe = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.case'));
      const heights = cards.map(c => Math.round(c.getBoundingClientRect().height));
      const cardData = cards.map(c => ({
        title: c.querySelector('.case__title')?.textContent?.trim() || null,
        desc: c.querySelector('.case__desc')?.textContent?.trim() || null,
        descLines: (() => {
          const d = c.querySelector('.case__desc');
          if (!d) return null;
          const lh = parseFloat(getComputedStyle(d).lineHeight);
          const h = d.getBoundingClientRect().height;
          return lh > 0 ? Math.round(h / lh) : null;
        })(),
        metrics: Array.from(c.querySelectorAll('.case__metric')).map(m => ({
          value: m.querySelector('.case__metric-value')?.textContent?.trim()
              || m.querySelector('[class*="value"]')?.textContent?.trim()
              || null,
          label: m.querySelector('.case__metric-label')?.textContent?.trim()
              || m.querySelector('[class*="label"]')?.textContent?.trim()
              || null,
        })),
        pills: Array.from(c.querySelectorAll('.case__pills *')).map(p => p.textContent.trim()).filter(Boolean),
      }));
      return {
        cardCount: cards.length,
        heights,
        heightsEqual: heights.length >= 2 && heights.every(h => Math.abs(h - heights[0]) <= 4),
        cardData,
      };
    });

    findings.push({ vp: v.name, ...probe });
    await page.screenshot({ path: path.join(OUT, `cases-${v.name}.png`), fullPage: false });
    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify(findings, null, 2));
  fs.writeFileSync(path.join(OUT, 'findings.json'), JSON.stringify(findings, null, 2));
})();
