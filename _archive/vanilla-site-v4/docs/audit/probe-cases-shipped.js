// Probe cases-shipped — verify shipped list renders, recap is right,
// metrics show new values, no IN PROD pill, no .case__pills.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'http://127.0.0.1:8765/';
const OUT = path.join(__dirname, 'screenshots-cases-shipped');
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '320', w: 320, h: 700, mobile: true },
  { name: '375', w: 375, h: 812, mobile: true },
  { name: '414', w: 414, h: 896, mobile: true },
  { name: '599', w: 599, h: 900, mobile: true },
  { name: '1280', w: 1280, h: 800, mobile: false },
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
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Universal: just scroll the cases section into view directly.
    // Avoids burger-menu DOM differences between mobile/desktop.
    try {
      await page.evaluate(() => {
        const el = document.getElementById('cases');
        if (el) {
          // For mobile, also reveal via the same class the menu would set.
          document.documentElement.classList.add('show-cases');
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      });
    } catch (e) {}

    await page.waitForTimeout(900);
    // Scroll the first .case into view in case overflow carousel hides it.
    try {
      await page.evaluate(() => {
        const c = document.querySelector('.case');
        if (c) c.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'start' });
      });
    } catch (e) {}
    await page.waitForTimeout(400);

    const probe = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.case'));
      const heights = cards.map(c => Math.round(c.getBoundingClientRect().height));
      const hasOldPills = document.querySelectorAll('.case__pills').length;
      const hasInProd = document.querySelectorAll('.case .status-pill--live').length;

      const cardData = cards.map(c => ({
        ticker: c.querySelector('.case__ticker')?.textContent?.trim(),
        industry: c.querySelector('.case__ind')?.textContent?.trim(),
        title: c.querySelector('.case__title')?.textContent?.trim(),
        recap: c.querySelector('.case__desc')?.textContent?.trim(),
        metrics: Array.from(c.querySelectorAll('.case__metric')).map(m => ({
          value: m.querySelector('.case__metric__value')?.textContent?.trim(),
          label: m.querySelector('.case__metric__label')?.textContent?.trim(),
        })),
        shippedHead: c.querySelector('.case__shipped__head')?.textContent?.trim(),
        shippedItems: Array.from(c.querySelectorAll('.case__shipped__item')).map(i => i.textContent.trim()),
      }));
      return { cardCount: cards.length, heights, heightsEqual: heights.length >= 2 && heights.every(h => Math.abs(h - heights[0]) <= 6), hasOldPills, hasInProd, cardData };
    });

    findings.push({ vp: v.name, ...probe });
    await page.screenshot({ path: path.join(OUT, `cases-${v.name}.png`), fullPage: false });
    await ctx.close();
  }

  await browser.close();

  const summary = findings.map(f => ({
    vp: f.vp,
    heightsEqual: f.heightsEqual,
    hasOldPills: f.hasOldPills,
    hasInProd: f.hasInProd,
    card1_industry: f.cardData[0]?.industry,
    card1_title: f.cardData[0]?.title,
    card1_metrics: f.cardData[0]?.metrics?.map(m => `${m.value} / ${m.label}`).join(' | '),
    card1_shippedCount: f.cardData[0]?.shippedItems?.length,
    card2_industry: f.cardData[1]?.industry,
    card2_title: f.cardData[1]?.title,
    card2_metrics: f.cardData[1]?.metrics?.map(m => `${m.value} / ${m.label}`).join(' | '),
    card2_shippedCount: f.cardData[1]?.shippedItems?.length,
  }));
  console.log('--- SUMMARY ---');
  console.log(JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(OUT, 'findings.json'), JSON.stringify(findings, null, 2));
  fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
})();
