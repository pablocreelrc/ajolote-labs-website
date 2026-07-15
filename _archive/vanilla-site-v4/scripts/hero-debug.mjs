import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
p.on('console', m => console.log('[console]', m.type(), m.text()));
await p.goto('http://localhost:8765/?hero=1', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);

for (const c of ['default', 'A', 'B', 'C']) {
  await p.evaluate((c) => {
    document.body.classList.remove('hero-A','hero-B','hero-C');
    if (c !== 'default') document.body.classList.add('hero-' + c);
  }, c);
  await p.waitForTimeout(500);

  const info = await p.evaluate((c) => {
    const variant = document.querySelector(`.hero-variant[data-variant="${c}"]`);
    const prod = document.querySelector('section.hero#hero');
    const liCount = document.querySelectorAll('.hero-variant[data-variant="A"] .hv-a__term-stream li').length;
    const variantBox = variant ? variant.getBoundingClientRect() : null;
    const prodBox = prod ? prod.getBoundingClientRect() : null;
    const variantDisplay = variant ? getComputedStyle(variant).display : '(none)';
    const prodDisplay = prod ? getComputedStyle(prod).display : '(none)';
    const h1 = c === 'A' ? document.querySelector('.hv-a__h1') :
               c === 'B' ? document.querySelector('.hv-b__h1') :
               c === 'C' ? document.querySelector('.hv-c__h1') : null;
    const h1Box = h1 ? h1.getBoundingClientRect() : null;
    const h1Text = h1 ? h1.textContent.trim().slice(0, 50) : null;
    return {
      bodyClasses: document.body.className,
      variantDisplay, prodDisplay,
      variantBox: variantBox ? `${variantBox.x},${variantBox.y} ${variantBox.width}x${variantBox.height}` : null,
      prodBox: prodBox ? `${prodBox.x},${prodBox.y} ${prodBox.width}x${prodBox.height}` : null,
      h1Box: h1Box ? `${h1Box.x},${h1Box.y} ${h1Box.width}x${h1Box.height}` : null,
      h1Text,
      liCount,
    };
  }, c);
  console.log(`\n--- choice=${c} ---`);
  console.log(JSON.stringify(info, null, 2));
}
await b.close();
