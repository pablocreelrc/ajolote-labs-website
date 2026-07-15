// Probe revamped cases — verifies hierarchy inversion, no IN PROD pill,
// pills wrap inline (not 1-per-row), parallel structure.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'http://127.0.0.1:8765/';
const OUT = path.join(__dirname, 'screenshots-cases-revamp');
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
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

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
      const inProdPills = document.querySelectorAll('.case .status-pill--live').length;

      const cardData = cards.map(c => {
        const title = c.querySelector('.case__title');
        const desc = c.querySelector('.case__desc');
        const firstMetricVal = c.querySelector('.case__metric__value');
        const firstMetricLabel = c.querySelector('.case__metric__label');
        const pillsContainer = c.querySelector('.case__pills');
        const pills = pillsContainer ? Array.from(pillsContainer.children) : [];

        // Pills layout — measure top positions to detect 1-per-row stacking
        const pillRects = pills.map(p => p.getBoundingClientRect());
        const uniqueRows = new Set(pillRects.map(r => Math.round(r.top))).size;

        return {
          title: title?.textContent?.trim() || null,
          titleFontSize: title ? parseFloat(getComputedStyle(title).fontSize) : null,
          desc: desc?.textContent?.trim() || null,
          descFontSize: desc ? parseFloat(getComputedStyle(desc).fontSize) : null,
          firstMetricValue: firstMetricVal?.textContent?.trim() || null,
          metricValueFontSize: firstMetricVal ? parseFloat(getComputedStyle(firstMetricVal).fontSize) : null,
          firstMetricLabel: firstMetricLabel?.textContent?.trim() || null,
          metricLabelFontSize: firstMetricLabel ? parseFloat(getComputedStyle(firstMetricLabel).fontSize) : null,
          pillCount: pills.length,
          pillRows: uniqueRows,
          pillsAllText: pills.map(p => p.textContent.trim()),
        };
      });
      return {
        cardCount: cards.length,
        heights,
        heightsEqual: heights.length >= 2 && heights.every(h => Math.abs(h - heights[0]) <= 6),
        inProdPills,
        cardData,
      };
    });

    findings.push({ vp: v.name, ...probe });
    await page.screenshot({ path: path.join(OUT, `cases-${v.name}.png`), fullPage: false });
    await ctx.close();
  }

  await browser.close();

  // Print compact summary
  const summary = findings.map(f => ({
    vp: f.vp,
    heightsEqual: f.heightsEqual,
    inProdPills: f.inProdPills,
    titleFontSize: f.cardData[0]?.titleFontSize,
    metricValueFontSize: f.cardData[0]?.metricValueFontSize,
    metricLabelFontSize: f.cardData[0]?.metricLabelFontSize,
    hierarchyInverted: (f.cardData[0]?.metricValueFontSize || 0) > (f.cardData[0]?.titleFontSize || 999),
    pillRows_card1: f.cardData[0]?.pillRows,
    pillRows_card2: f.cardData[1]?.pillRows,
  }));
  console.log('--- SUMMARY ---');
  console.log(JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(OUT, 'findings.json'), JSON.stringify(findings, null, 2));
  fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
})();
