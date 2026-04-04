const { chromium } = require('playwright');
const path = require('path');

const breakpoints = [
  { name: 'mobile-s-320x480', width: 320, height: 480 },
  { name: 'mobile-l-375x812', width: 375, height: 812 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'desktop-1440x900', width: 1440, height: 900 },
];

const URL = 'file:///' + path.resolve(__dirname, '../../index.html').replace(/\\/g, '/');
const outDir = path.join(__dirname, 'screenshots');

(async () => {
  const browser = await chromium.launch();
  for (const bp of breakpoints) {
    const context = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
    });
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });
    // wait for animations to settle
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(outDir, `${bp.name}.png`),
      fullPage: true,
    });
    console.log(`Captured: ${bp.name}`);
    await context.close();
  }
  await browser.close();
  console.log('Done!');
})();
