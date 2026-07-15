// Probe LIVE ajolotelabs.ai across mobile + desktop. Confirm:
//   - All audit chrome gone (breath / hero rail / hero metrics / ONLINE pill)
//   - Hero subtitle + CTA copy are the new strings
//   - Status-pill vocabulary normalized
//   - Cases section is healthy (2 cards, equal heights, recap rendered, no shipped/foot)
//   - No JS console errors

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'https://ajolotelabs.ai/?_t=' + Date.now();
const OUT = path.join(__dirname, 'live-final');
fs.mkdirSync(OUT, { recursive: true });

const VPS = [
  { n: '320',  w: 320,  h: 700,  m: true  },
  { n: '375',  w: 375,  h: 812,  m: true  },
  { n: '414',  w: 414,  h: 896,  m: true  },
  { n: '1280', w: 1280, h: 800,  m: false },
  { n: '1440', w: 1440, h: 900,  m: false },
  { n: '1920', w: 1920, h: 1080, m: false },
];

(async () => {
  const browser = await chromium.launch();
  const summary = [];

  for (const v of VPS) {
    const ctx = await browser.newContext({
      viewport: { width: v.w, height: v.h },
      reducedMotion: 'reduce',
      isMobile: v.m,
      hasTouch: v.m,
      userAgent: v.m
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15',
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);

    const probe = await page.evaluate(() => {
      const text = (s) => document.querySelectorAll(s).length;
      const cards = Array.from(document.querySelectorAll('.case'));
      const cardHeights = cards.map(c => Math.round(c.getBoundingClientRect().height));
      const pills = Array.from(document.querySelectorAll('.status-pill'))
        .map(p => p.textContent.trim().toLowerCase())
        .filter(t => t && t.length < 30);
      return {
        breath: text('.breath'),
        heroMetrics: text('.hero__metrics, .mcell'),
        heroRail: text('.hero__rail, #railLog'),
        navOnline: text('.nav__status'),
        caseShipped: text('.case__shipped, .case__foot'),
        caseCount: cards.length,
        cardHeights,
        cardsEqual: cardHeights.length >= 2 && cardHeights.every(h => Math.abs(h - cardHeights[0]) <= 6),
        pillVocab: [...new Set(pills)].sort(),
        heroSubFDE: !!document.querySelector('.hero__sub')?.textContent.match(/Forward-deployed engineers/),
        ctaSimplified: !!document.querySelector('.cta-card__desc')?.textContent.match(/AI-native looks like/),
      };
    });

    summary.push({ vp: v.n, ...probe, errCount: errors.length });
    await page.screenshot({ path: path.join(OUT, 'live-' + v.n + '.png'), fullPage: false });
    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify(summary, null, 2));
})();
