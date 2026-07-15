// Verify fx-spike bake: default URL (no ?fx=1) should now show all effects.
// Reports console errors + 404s and screenshots hero/cases/pipeline.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('fx-walkthrough', { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

const errors = [];
const fail404 = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('response', r => { if (r.status() >= 400) fail404.push(`${r.status()} ${r.url()}`); });

await page.goto('http://localhost:8765/', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);

// Confirm fx-toggle.js is NOT loaded (404 if requested = fine; we want it gone).
const fxToggleLoaded = await page.evaluate(() =>
  Array.from(document.scripts).some(s => /fx-toggle/.test(s.src)));

// Confirm dev panel is NOT in DOM.
const fxPanel = await page.$('#fxPanel');

// Confirm effects are visible by default (no body.fx-* required anymore).
const probe = await page.evaluate(() => {
  const c = document.querySelector('.case');
  const beforeStyle = c ? getComputedStyle(c, '::before').animationName : null;
  const heroBefore = getComputedStyle(document.querySelector('#hero'), '::before').animationName;
  const pipelineAfter = getComputedStyle(document.querySelector('.pipeline'), '::after').animationName;
  return { beforeStyle, heroBefore, pipelineAfter };
});

const shots = [
  { name: 'verify-hero',     sel: '#hero' },
  { name: 'verify-cases',    sel: '#cases, [data-section="cases"], section.cases' },
  { name: 'verify-pipeline', sel: '.pipeline' },
];
for (const s of shots) {
  let el = null;
  for (const part of s.sel.split(',').map(x=>x.trim())) {
    el = await page.$(part); if (el) break;
  }
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await el.screenshot({ path: `fx-walkthrough/${s.name}.png` });
    console.log('saved', s.name);
  } else {
    console.log('MISSING', s.name, '->', s.sel);
  }
}

console.log('\n--- Verification ---');
console.log('fx-toggle.js loaded?', fxToggleLoaded, '(should be false)');
console.log('#fxPanel present?  ', !!fxPanel, '(should be false)');
console.log('case::before animation:', probe.beforeStyle, '(should be fx-bb-spin)');
console.log('hero::before animation:', probe.heroBefore, '(should be fx-aur-drift)');
console.log('pipeline::after animation:', probe.pipelineAfter, '(should be fx-ab-flow)');
console.log('console errors:', errors.length ? errors : 'none');
console.log('4xx/5xx responses:', fail404.length ? fail404 : 'none');

await browser.close();
