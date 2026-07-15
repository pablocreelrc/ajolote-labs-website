import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto('http://localhost:8765/?hero=1', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
await p.click('#heroPreviewPanel .hp-btn[data-hero="A"]');
await p.waitForTimeout(5000);

// Disable scroll-snap to be safe for screenshots.
await p.addStyleTag({ content: 'html { scroll-snap-type: none !important; } *,*::before,*::after { scroll-snap-align: none !important; }' });
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(400);

const info = await p.evaluate(() => {
  const v = document.querySelector('.hero-variant[data-variant="A"]');
  const term = document.querySelector('.hv-a__terminal');
  const stream = document.querySelectorAll('.hv-a__term-stream li').length;
  return {
    variantBox: v?.getBoundingClientRect()?.toJSON?.() || null,
    termBox: term?.getBoundingClientRect()?.toJSON?.() || null,
    termDisplay: term ? getComputedStyle(term).display : null,
    streamCount: stream,
    scrollY: window.scrollY,
  };
});
console.log(JSON.stringify(info, null, 2));

await p.screenshot({ path: 'fx-walkthrough/hero-A-fullpage.png', fullPage: false });
console.log('viewport screenshot saved');

await b.close();
