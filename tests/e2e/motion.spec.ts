import { expect, test } from "@playwright/test";

test("reduced motion: everything visible and static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const heroAnim = await page
    .locator(".hero-name .mask-inner")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(heroAnim).toBe("none");

  await page.locator("#how-it-works").scrollIntoViewIfNeeded();
  // never armed: lines fully drawn, nodes at full opacity
  await expect(page.locator(".flow")).not.toHaveAttribute("data-state", /armed|play/);
  const nodeOpacity = await page
    .locator(".flow-node-inner")
    .last()
    .evaluate((el) => getComputedStyle(el).opacity);
  expect(nodeOpacity).toBe("1");
  await expect(page.locator(".reveal-title[data-reveal]")).toHaveCount(0);
});

test("enquiry flow plays once when 40% in view", async ({ page }) => {
  await page.goto("/");
  const flow = page.locator(".flow");
  // not armed while far away: the dimmed state only exists just before it scrolls in
  await expect(flow).not.toHaveAttribute("data-state", /armed|play/);
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-state", "play");
  await page.waitForTimeout(2400);
  const opacity = await page
    .locator(".flow-node-inner")
    .last()
    .evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe("1");
  // scrolling away and back does not replay
  await page.evaluate(() => window.scrollTo(0, 0));
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveAttribute("data-state", "play");
});

test("nav hides on scroll down and returns on scroll up", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator(".site-nav");
  await page.mouse.wheel(0, 900);
  await expect(nav).toHaveAttribute("data-hidden", "true");
  await page.mouse.wheel(0, -200);
  await expect(nav).toHaveAttribute("data-hidden", "false");
});

test.describe("JavaScript disabled", () => {
  test.use({ javaScriptEnabled: false });

  test("all content is readable and the form explains the fallback", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    for (const id of ["services", "work", "how-it-works", "process", "about", "faq", "contact"]) {
      await expect(page.locator(`#${id} h2`).first()).toBeVisible();
    }
    // the diagram is fully drawn in server HTML
    const opacity = await page
      .locator(".flow-node-inner")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("1");
    // Playwright's JS-off mode doesn't flip the HTML parser's scripting flag, so <noscript>
    // isn't rendered here; check the served HTML carries the fallback instead.
    const html = await (await page.request.get("/")).text();
    expect(html).toMatch(/<noscript>.*This form needs JavaScript\..*wa\.me.*mailto:/s);
  });
});
