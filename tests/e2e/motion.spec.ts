import { expect, test } from "@playwright/test";

test("reduced motion: everything visible and static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const sel of [".hero-letter", ".rotator-track", ".hero-badge-ring"]) {
    const anim = await page
      .locator(sel)
      .first()
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(anim, sel).toBe("none");
  }

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

test("enquiry flow cards can lift on hover without being clipped", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const flow = page.locator(".flow");
  await flow.scrollIntoViewIfNeeded();
  // only the sides are clipped (for the travelling square); the top must stay open
  const overflowY = await flow.evaluate((el) => getComputedStyle(el).overflowY);
  expect(overflowY).toBe("visible");
  await page.waitForTimeout(2600);
  const node = page.locator(".flow-node").first();
  await node.hover();
  await expect
    .poll(async () =>
      node.evaluate((el) =>
        Math.round(
          el.closest(".flow")!.getBoundingClientRect().top - el.getBoundingClientRect().top,
        ),
      ),
    )
    .toBeGreaterThanOrEqual(3);
});

test("process steps line up across columns on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const tops = await page
    .locator("#process li p")
    .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top + scrollY)));
  expect(new Set(tops).size).toBe(1);
});

test.describe("footer wordmark hover", () => {
  for (const width of [1024, 1446, 1920]) {
    test(`footer links stay clickable and don't trigger the wordmark at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);

      // every footer link is the topmost element at its own centre
      const covered = await page.locator("footer a").evaluateAll((links) =>
        links
          .filter((a) => {
            const r = a.getBoundingClientRect();
            const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return !(el === a || a.contains(el));
          })
          .map((a) => a.textContent?.trim()),
      );
      expect(covered).toEqual([]);

      const fill = () =>
        page.evaluate(() => getComputedStyle(document.querySelector(".footer-mark")!).color);

      // hovering a link must not fill the wordmark
      await page.locator("footer a").first().hover();
      await page.waitForTimeout(800);
      expect(await fill()).toBe("rgba(0, 0, 0, 0)");

      // hovering the wordmark itself still does
      await page.locator(".footer-mark-wrap").hover();
      await expect.poll(fill).toBe("rgb(255, 90, 31)");
    });
  }
});
