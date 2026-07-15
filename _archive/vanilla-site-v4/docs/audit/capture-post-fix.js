const { chromium } = require('playwright');
const path = require('path');

const breakpoints = [
  { name: 'mobile-375x812', width: 375, height: 812 },
  { name: 'desktop-1440x900', width: 1440, height: 900 },
];

const URL = 'file:///' + path.resolve(__dirname, '../../index.html').replace(/\\/g, '/');
const outDir = path.join(__dirname, 'screenshots-post-fix');

(async () => {
  const browser = await chromium.launch();
  for (const bp of breakpoints) {
    const ctx = await browser.newContext({ viewport: { width: bp.width, height: bp.height } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    // Scroll to trigger reveals
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, bp.name + '.png'), fullPage: true });
    console.log('Captured: ' + bp.name);
    await ctx.close();
  }
  await browser.close();
  console.log('Done!');
})();
