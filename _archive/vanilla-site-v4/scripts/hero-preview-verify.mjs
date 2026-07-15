// Verify hero-preview wiring + capture each variant for review.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('fx-walkthrough', { recursive: true });
const browser = await chromium.launch();

const errors = [];
const fail404 = [];
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('response', r => { if (r.status() >= 400) fail404.push(`${r.status()} ${r.url()}`); });

await page.goto('http://localhost:8765/?hero=1', { waitUntil: 'networkidle' });
// Disable scroll-snap so element.screenshot() doesn't fight the page during capture.
await page.addStyleTag({ content: 'html { scroll-snap-type: none !important; } *,*::before,*::after { scroll-snap-align: none !important; }' });
await page.waitForTimeout(700);

const panelVisible = await page.evaluate(() => {
  const p = document.getElementById('heroPreviewPanel');
  return !!p && !p.hidden;
});

async function capture(choice, name) {
  // Click the actual panel button so applyChoice() runs (incl. starting
  // the console for A). Falls back to default by clicking [data-hero="default"].
  await page.click(`#heroPreviewPanel .hp-btn[data-hero="${choice}"]`);
  // Reset to top so the variant is in viewport regardless of scroll-snap shifts.
  await page.evaluate(() => window.scrollTo(0, 0));
  // Variant A needs time for several stream lines to land.
  await page.waitForTimeout(choice === 'A' ? 5500 : 800);
  const sel = choice === 'default'
    ? 'section.hero#hero'
    : `.hero-variant[data-variant="${choice}"]`;
  const target = await page.$(sel);
  await target.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await target.screenshot({ path: `fx-walkthrough/${name}.png` });
  console.log('saved', name);
}

await capture('default', 'hero-00-default');
await capture('A', 'hero-A-console');
await capture('B', 'hero-B-editorial');
await capture('C', 'hero-C-diptych');

console.log('\n--- Verification ---');
console.log('panel visible at ?hero=1?', panelVisible, '(should be true)');
console.log('console errors:', errors.length ? errors : 'none');
console.log('4xx/5xx responses:', fail404.length ? fail404 : 'none');

await browser.close();
