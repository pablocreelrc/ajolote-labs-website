// Verify scroll-snap actually works on the deployed v4.2 page.
// Opens the page in headless Chrome at 1440x900, inspects computed styles,
// and simulates a real scroll to confirm the browser snaps to a section.
import { chromium } from "playwright";

const URL =
  "https://ajolote-labs-website.vercel.app/redesigns/v4-2-cinematic-intervals/?v=snap-fix-3";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(1200);

const htmlSnap = await page.evaluate(
  () => getComputedStyle(document.documentElement).scrollSnapType
);

const sections = await page.evaluate(() => {
  const els = document.querySelectorAll(
    ".hero, .breath, .section--services, .section--cases, .cta-section"
  );
  return Array.from(els).map((el) => {
    const cs = getComputedStyle(el);
    return {
      cls: el.className.split(" ").slice(0, 2).join("."),
      snapAlign: cs.scrollSnapAlign,
      snapStop: cs.scrollSnapStop,
      minH: cs.minHeight,
      offsetH: el.offsetHeight,
      top: Math.round(el.getBoundingClientRect().top + window.scrollY),
    };
  });
});

const viewportH = await page.evaluate(() => window.innerHeight);
const initial = await page.evaluate(() => window.scrollY);

// Trigger a real wheel-scroll of ~120px (one gesture) and see where browser lands.
await page.mouse.wheel(0, 120);
await page.waitForTimeout(700);
const afterShort = await page.evaluate(() => window.scrollY);

// Scroll back to top, then do a larger gesture to force next-section snap.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.mouse.wheel(0, 400);
await page.waitForTimeout(900);
const afterLong = await page.evaluate(() => window.scrollY);

console.log("URL:", URL);
console.log("html scroll-snap-type:", htmlSnap);
console.log("viewport height:", viewportH);
console.log("initial scrollY:", initial);
console.log("after short 120px wheel → scrollY:", afterShort);
console.log("after long  400px wheel → scrollY:", afterLong);
console.log("sections:");
for (const s of sections) console.log(" ", JSON.stringify(s));

await browser.close();
