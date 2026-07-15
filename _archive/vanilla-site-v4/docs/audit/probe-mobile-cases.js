// Probe mobile cases + quote-removal on phone viewports.
// Reduced motion, no flake on transitions.

const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'http://127.0.0.1:8765/';
const OUT = path.join(__dirname, 'screenshots-mobile-cases');
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '320', w: 320, h: 700 },
  { name: '375', w: 375, h: 812 },
  { name: '414', w: 414, h: 896 },
  { name: '599', w: 599, h: 900 },
];

(async () => {
  const browser = await chromium.launch();
  const findings = [];

  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: v.w, height: v.h },
      reducedMotion: 'reduce',
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Open the cases overlay via the burger menu's data-reveal link
    const burger = page.locator('[data-menu-toggle], .menu-toggle, [aria-label*="menu" i]').first();
    if (await burger.count()) {
      try { await burger.click({ timeout: 1500 }); } catch (e) {}
    }
    await page.waitForTimeout(200);

    const revealLink = page.locator('a[data-reveal="cases"]').first();
    if (await revealLink.count()) {
      try { await revealLink.click({ timeout: 1500 }); } catch (e) {}
    }

    await page.waitForTimeout(800);

    // Probe DOM
    const probe = await page.evaluate(() => {
      const html = document.documentElement;
      const sticky = document.querySelector('.sticky-cta');
      const cards = Array.from(document.querySelectorAll('.case'));
      const blockquotes = Array.from(document.querySelectorAll('.case__quote, .case blockquote'));
      const metricsGrids = Array.from(document.querySelectorAll('.case__metrics')).map(g => {
        const cs = getComputedStyle(g);
        return {
          gridTemplateColumns: cs.gridTemplateColumns,
          children: g.children.length,
          lastChildSpan: g.lastElementChild ? getComputedStyle(g.lastElementChild).gridColumn : null,
        };
      });
      const stickyVisible = sticky ? (() => {
        const cs = getComputedStyle(sticky);
        return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0;
      })() : null;
      return {
        htmlClasses: html.className,
        cardCount: cards.length,
        blockquoteCount: blockquotes.length,
        metricsGrids,
        stickyVisible,
        hasShowCases: html.classList.contains('show-cases'),
        hasShowCalendly: html.classList.contains('show-calendly'),
      };
    });

    findings.push({ vp: v.name, ...probe });

    await page.screenshot({
      path: path.join(OUT, `cases-${v.name}.png`),
      fullPage: false,
    });

    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify(findings, null, 2));
  fs.writeFileSync(path.join(OUT, 'findings.json'), JSON.stringify(findings, null, 2));
})();
