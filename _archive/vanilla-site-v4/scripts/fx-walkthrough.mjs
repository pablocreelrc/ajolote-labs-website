// Capture screenshots of each fx-spike effect for review.
// Run: node scripts/fx-walkthrough.js
// Outputs to fx-walkthrough/ at the repo root.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'http://localhost:8765';
const OUT = 'fx-walkthrough';

const SHOTS = [
  { name: '00-baseline-hero',         fx: [],                      target: 'hero',     viewport: { width: 1440, height: 900 } },
  { name: '01-aurora-hero',           fx: ['fx-aurora'],           target: 'hero',     viewport: { width: 1440, height: 900 } },
  { name: '02-border-beam-cases',     fx: ['fx-border-beam'],      target: 'cases',    viewport: { width: 1440, height: 900 } },
  { name: '03-border-beam-pipeline',  fx: ['fx-border-beam'],      target: 'pipeline', viewport: { width: 1440, height: 900 } },
  { name: '04-animated-beam',         fx: ['fx-animated-beam'],    target: 'pipeline', viewport: { width: 1440, height: 900 } },
  { name: '05-magic-card-cases',      fx: ['fx-magic-card'],       target: 'cases',    viewport: { width: 1440, height: 900 }, hover: '.case' },
  { name: '06-all-effects-hero',      fx: ['fx-aurora','fx-border-beam','fx-animated-beam','fx-magic-card'], target: 'hero',     viewport: { width: 1440, height: 900 } },
  { name: '07-all-effects-pipeline',  fx: ['fx-aurora','fx-border-beam','fx-animated-beam','fx-magic-card'], target: 'pipeline', viewport: { width: 1440, height: 900 } },
];

const TARGET_SELECTOR = {
  hero:     '#hero',
  cases:    '#cases, [data-section="cases"], section.cases',
  pipeline: '.pipeline',
};

async function pickTarget(page, target) {
  const sel = TARGET_SELECTOR[target];
  for (const s of sel.split(',').map(x => x.trim())) {
    const el = await page.$(s);
    if (el) return el;
  }
  return null;
}

(async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const shot of SHOTS) {
    const ctx = await browser.newContext({
      viewport: shot.viewport,
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/?fx=1`, { waitUntil: 'networkidle' });

    // Apply selected effects via the same toggle plumbing.
    await page.evaluate((effects) => {
      document.body.classList.remove('fx-aurora','fx-border-beam','fx-animated-beam','fx-magic-card');
      effects.forEach(c => document.body.classList.add(c));
      // Hide the dev panel so it doesn't sit on top of screenshots.
      const panel = document.getElementById('fxPanel');
      if (panel) panel.setAttribute('hidden', '');
    }, shot.fx);

    // Let any spin-up animations settle, but don't freeze motion entirely
    // (we want the beam/aurora to be mid-cycle in the still).
    await page.waitForTimeout(900);

    // Optional hover for magic-card.
    if (shot.hover) {
      const el = await page.$(shot.hover);
      if (el) {
        const box = await el.boundingBox();
        if (box) await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.4);
        await page.evaluate((sel) => {
          const e = document.querySelector(sel);
          if (e) e.classList.add('is-fx-hot');
        }, shot.hover);
        await page.waitForTimeout(250);
      }
    }

    const target = await pickTarget(page, shot.target);
    const path = join(OUT, `${shot.name}.png`);
    if (target) {
      await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await target.screenshot({ path });
    } else {
      await page.screenshot({ path, fullPage: false });
    }
    console.log('saved', path);
    await ctx.close();
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
