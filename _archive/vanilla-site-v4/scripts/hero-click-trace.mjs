// Replicate a real user click path. Logs body classes + visible variant
// after each click. If this works clean, the issue is browser-side.
import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
p.on('console', m => console.log('[console]', m.type(), m.text()));
p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto('http://localhost:8765/?hero=1', { waitUntil: 'networkidle' });
await p.waitForTimeout(400);

async function dump(label) {
  const s = await p.evaluate(() => {
    const visible = ['default', 'A', 'B', 'C'].map(c => {
      const el = c === 'default'
        ? document.querySelector('section.hero#hero')
        : document.querySelector(`.hero-variant[data-variant="${c}"]`);
      return [c, el ? getComputedStyle(el).display : '(missing)'];
    });
    return {
      bodyClasses: document.body.className,
      visible: Object.fromEntries(visible),
      lsChoice: localStorage.getItem('hero-preview-choice'),
    };
  });
  console.log(`\n--- ${label} ---`, JSON.stringify(s));
}

await dump('after initial load');

for (const c of ['A', 'B', 'C', 'default']) {
  await p.click(`#heroPreviewPanel .hp-btn[data-hero="${c}"]`);
  await p.waitForTimeout(250);
  await dump(`after click [${c}]`);
}

await b.close();
