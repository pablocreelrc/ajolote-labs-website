const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const dir = 'previews/audit-v2-production/';
  const results = { desktop: {}, mobile: {} };

  // ===== DESKTOP =====
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const dErrors = [];
  d.on('console', msg => { if (msg.type() === 'error') dErrors.push(msg.text()); });
  await d.goto('https://pablocreelrc.github.io/ajolote-labs-website/', { waitUntil: 'networkidle' });
  await d.waitForTimeout(3000);

  // Section screenshots
  await d.screenshot({ path: dir + 'd-1-hero.png' });
  await d.evaluate(() => document.querySelector('#services').scrollIntoView());
  await d.waitForTimeout(1000);
  await d.screenshot({ path: dir + 'd-2-services.png' });
  await d.evaluate(() => document.querySelector('#cases').scrollIntoView());
  await d.waitForTimeout(1000);
  await d.screenshot({ path: dir + 'd-3-cases.png' });
  await d.waitForTimeout(3500);
  await d.screenshot({ path: dir + 'd-3-cases-advanced.png' });
  await d.evaluate(() => document.querySelector('#calendly').scrollIntoView());
  await d.waitForTimeout(1000);
  await d.screenshot({ path: dir + 'd-4-cta.png' });
  await d.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await d.waitForTimeout(1000);
  await d.screenshot({ path: dir + 'd-5-footer.png' });

  // Scroll back test
  await d.evaluate(() => document.querySelector('#cases').scrollIntoView());
  await d.waitForTimeout(1500);
  await d.mouse.wheel(0, -500);
  await d.waitForTimeout(1500);
  results.desktop.scrollBackToServices = await d.evaluate(() => {
    var el = document.querySelector('#services');
    return Math.abs(window.scrollY - el.offsetTop) < 100 ? 'OK' : 'FAIL:' + window.scrollY;
  });
  await d.mouse.wheel(0, -500);
  await d.waitForTimeout(1500);
  results.desktop.scrollBackToHero = await d.evaluate(() => window.scrollY < 100 ? 'OK' : 'FAIL:' + window.scrollY);
  await d.waitForTimeout(5000);
  results.desktop.heroStaysAfter5s = await d.evaluate(() => window.scrollY < 100 ? 'OK' : 'JUMPED:' + window.scrollY);

  // Logo check
  results.desktop.logos = await d.evaluate(() => {
    return Array.from(document.querySelectorAll('.logo-img')).map(img => img.naturalWidth > 0);
  });

  // Dead links
  results.desktop.deadLinks = await d.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).filter(a => a.getAttribute('href') === '#').map(a => a.textContent.trim().substring(0, 30));
  });

  // Button sizes
  results.desktop.buttons = await d.evaluate(() => {
    return Array.from(document.querySelectorAll('.btn-w, .btn-o, .nav-cta')).map(b => {
      var r = b.getBoundingClientRect();
      return b.textContent.trim().substring(0, 25) + ': ' + Math.round(r.width) + 'x' + Math.round(r.height);
    });
  });

  // Carousel
  results.desktop.carouselCards = await d.evaluate(() => document.querySelectorAll('.ccard').length);
  results.desktop.carouselDots = await d.evaluate(() => document.querySelectorAll('.carousel-dot').length);

  results.desktop.consoleErrors = dErrors;

  // ===== MOBILE =====
  const m = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const mErrors = [];
  m.on('console', msg => { if (msg.type() === 'error') mErrors.push(msg.text()); });
  await m.goto('https://pablocreelrc.github.io/ajolote-labs-website/', { waitUntil: 'networkidle' });
  await m.waitForTimeout(3000);

  await m.screenshot({ path: dir + 'm-1-hero.png' });

  // Burger
  results.mobile.burgerVisible = await m.evaluate(() => {
    var b = document.querySelector('.burger');
    return b && getComputedStyle(b).display !== 'none';
  });

  await m.click('.burger');
  await m.waitForTimeout(500);
  await m.screenshot({ path: dir + 'm-menu-open.png' });
  results.mobile.menuOpens = await m.evaluate(() => document.querySelector('.mobile-menu').classList.contains('open'));

  await m.click('.mobile-menu a[href="#services"]');
  await m.waitForTimeout(1000);
  results.mobile.menuClosesOnClick = await m.evaluate(() => !document.querySelector('.mobile-menu').classList.contains('open'));
  await m.screenshot({ path: dir + 'm-after-nav.png' });

  // Scroll through
  for (var i = 0; i < 8000; i += 400) {
    await m.evaluate(y => window.scrollTo(0, y), i);
    await m.waitForTimeout(100);
  }
  await m.evaluate(() => window.scrollTo(0, 0));
  await m.waitForTimeout(300);
  await m.screenshot({ path: dir + 'm-full.png', fullPage: true });

  results.mobile.overflow = await m.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  results.mobile.logo = await m.evaluate(() => {
    var img = document.querySelector('.logo-img');
    return img ? img.naturalWidth > 0 : false;
  });

  // Mobile CTA
  await m.evaluate(() => document.querySelector('#calendly').scrollIntoView());
  await m.waitForTimeout(800);
  await m.screenshot({ path: dir + 'm-cta.png' });

  // Mobile cards - should be vertical not carousel
  results.mobile.cardsLayout = await m.evaluate(() => {
    var grid = document.querySelector('.cgrid');
    var style = getComputedStyle(grid);
    return style.flexDirection;
  });

  results.mobile.consoleErrors = mErrors;

  await browser.close();

  // ===== PRINT REPORT =====
  console.log('========================================');
  console.log('   CREATIVE DIRECTOR AUDIT — V2 LIVE');
  console.log('========================================\n');

  console.log('DESKTOP (1440x900)');
  console.log('  Console errors: ' + results.desktop.consoleErrors.length);
  results.desktop.consoleErrors.forEach(e => console.log('    ' + e));
  console.log('  Logos loaded: ' + JSON.stringify(results.desktop.logos));
  console.log('  Carousel: ' + results.desktop.carouselCards + ' cards, ' + results.desktop.carouselDots + ' dots');
  console.log('  Scroll back cases→services: ' + results.desktop.scrollBackToServices);
  console.log('  Scroll back services→hero: ' + results.desktop.scrollBackToHero);
  console.log('  Hero stays after 5s wait: ' + results.desktop.heroStaysAfter5s);
  console.log('  Dead links: ' + (results.desktop.deadLinks.length === 0 ? 'none' : results.desktop.deadLinks.join(', ')));
  console.log('  Button sizes:');
  results.desktop.buttons.forEach(b => console.log('    ' + b));

  console.log('\nMOBILE (375x812)');
  console.log('  Console errors: ' + results.mobile.consoleErrors.length);
  results.mobile.consoleErrors.forEach(e => console.log('    ' + e));
  console.log('  Logo loaded: ' + results.mobile.logo);
  console.log('  Burger visible: ' + results.mobile.burgerVisible);
  console.log('  Menu opens: ' + results.mobile.menuOpens);
  console.log('  Menu closes on link click: ' + results.mobile.menuClosesOnClick);
  console.log('  Horizontal overflow: ' + results.mobile.overflow);
  console.log('  Cards layout: ' + results.mobile.cardsLayout);

  console.log('\nScreenshots saved to: ' + dir);
})();
