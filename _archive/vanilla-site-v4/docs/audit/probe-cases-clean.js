const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'http://127.0.0.1:8765/';
const OUT = path.join(__dirname, 'screenshots-cases-clean');
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '320', w: 320, h: 700, mobile: true },
  { name: '375', w: 375, h: 812, mobile: true },
  { name: '414', w: 414, h: 896, mobile: true },
  { name: '1280', w: 1280, h: 800, mobile: false },
];

(async () => {
  const browser = await chromium.launch();
  const out = [];
  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: v.w, height: v.h },
      reducedMotion: 'reduce',
      isMobile: v.mobile,
      hasTouch: v.mobile,
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.classList.add('show-cases');
      const el = document.getElementById('cases');
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
    await page.waitForTimeout(900);

    const probe = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.case'));
      return {
        cardCount: cards.length,
        hasShipped: document.querySelectorAll('.case__shipped, .case__shipped__list, .case__shipped__item').length,
        hasFoot: document.querySelectorAll('.case__foot, .case__cta').length,
        bodyChildren: cards[0]?.querySelector('.case__body')
          ? Array.from(cards[0].querySelector('.case__body').children).map(c => c.className)
          : [],
        heights: cards.map(c => Math.round(c.getBoundingClientRect().height)),
        heightsEqual: cards.length >= 2 && cards.every(c => Math.abs(Math.round(c.getBoundingClientRect().height) - Math.round(cards[0].getBoundingClientRect().height)) <= 6),
      };
    });
    out.push({ vp: v.name, ...probe });
    await page.screenshot({ path: path.join(OUT, 'cases-' + v.name + '.png') });
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
})();
