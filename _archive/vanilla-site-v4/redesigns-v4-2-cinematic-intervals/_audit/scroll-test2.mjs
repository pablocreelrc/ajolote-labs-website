// Deeper diagnostic: who's the scroll container, and does snap engage on a real gesture?
import { chromium } from "playwright";

const URL =
  "https://ajolote-labs-website.vercel.app/redesigns/v4-2-cinematic-intervals/?v=snap-fix-3";

const browser = await chromium.launch({ headless: false, slowMo: 200 });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(1500);

// Who scrolls?
const scrollInfo = await page.evaluate(() => {
  const se = document.scrollingElement;
  return {
    scrollingElementTag: se ? se.tagName : "(none)",
    htmlScrollSnap: getComputedStyle(document.documentElement).scrollSnapType,
    bodyScrollSnap: getComputedStyle(document.body).scrollSnapType,
    htmlOverflow: getComputedStyle(document.documentElement).overflow,
    bodyOverflow: getComputedStyle(document.body).overflow,
    htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
    bodyOverflowY: getComputedStyle(document.body).overflowY,
    htmlHeight: document.documentElement.scrollHeight,
    bodyHeight: document.body.scrollHeight,
    winInnerHeight: window.innerHeight,
    scrollPaddingTop: getComputedStyle(document.documentElement).scrollPaddingTop,
  };
});
console.log("scroll env:", JSON.stringify(scrollInfo, null, 2));

// Reset to top
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);

// Try keyboard PageDown — real user gesture
await page.focus("body");
await page.keyboard.press("PageDown");
await page.waitForTimeout(1200);
const afterPageDown = await page.evaluate(() => window.scrollY);
console.log("after PageDown → scrollY:", afterPageDown);

// Try another PageDown
await page.keyboard.press("PageDown");
await page.waitForTimeout(1200);
const afterPageDown2 = await page.evaluate(() => window.scrollY);
console.log("after PageDown x2 → scrollY:", afterPageDown2);

// Section tops for comparison
const tops = await page.evaluate(() =>
  Array.from(
    document.querySelectorAll(".hero, .breath, .section--services, .section--cases, .cta-section")
  ).map((el) => ({
    cls: el.className.split(" ")[0],
    top: Math.round(el.getBoundingClientRect().top + window.scrollY),
  }))
);
console.log("section tops:", tops);

await page.waitForTimeout(2000);
await browser.close();
