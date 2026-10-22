// Captures desktop + mobile screenshots of the live concept projects (Section 8.3).
// Usage: npm run screenshots
import { chromium } from "@playwright/test";

const targets = [
  { slug: "forgeworks", url: "https://gym-demo-xi-olive.vercel.app" },
  { slug: "windward-house", url: "https://hotel-website-demo-alpha.vercel.app" },
];

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch();
for (const { slug, url } of targets) {
  for (const [kind, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 2,
      isMobile: kind === "mobile",
      hasTouch: kind === "mobile",
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2500);
    const file = `public/images/work/${slug}-${kind}.png`;
    await page.screenshot({ path: file });
    console.log("saved", file);
    await context.close();
  }
}
await browser.close();
