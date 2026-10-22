import { expect, test } from "@playwright/test";

const widths = [320, 375, 390, 768, 1024, 1280, 1440, 1920];

for (const width of widths) {
  test(`no horizontal scroll and an unclipped hero name at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 740 : 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/work/forgeworks/", "/work/enquiry-autopilot/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0);
    }

    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    // each name line stays inside the container
    const lines = await page.locator(".hero-name-line").evaluateAll((els) => {
      const container = document.querySelector(".hero-inner")!;
      const cs = getComputedStyle(container);
      const c = container.getBoundingClientRect();
      const left = c.left + parseFloat(cs.paddingLeft);
      const right = c.right - parseFloat(cs.paddingRight);
      return els.map((el) => {
        const range = document.createRange();
        range.selectNodeContents(el.querySelector(".mask-inner")!);
        const r = range.getBoundingClientRect();
        return { left: r.left - left, right: right - r.right, width: r.width, avail: right - left };
      });
    });
    for (const l of lines) {
      expect(l.left).toBeGreaterThanOrEqual(-1);
      expect(l.right).toBeGreaterThanOrEqual(-1);
    }
    if (width < 768) {
      // mobile fit rule: each line fills the container width
      for (const l of lines) expect(l.width / l.avail).toBeGreaterThan(0.96);
    }
  });
}

test("first screen at 375×667 shows the headline and the primary button", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await expect(page.locator("h1")).toBeInViewport({ ratio: 1 });
  await expect(page.locator("#top").getByRole("link", { name: "Start a project" })).toBeInViewport({
    ratio: 1,
  });
});

test("the portrait never covers the desktop name (name is layered above it)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const z = await page.evaluate(() => [
    getComputedStyle(document.querySelector(".hero-name")!).zIndex,
    getComputedStyle(document.querySelector(".hero-portrait")!).zIndex,
  ]);
  expect(Number(z[0])).toBeGreaterThan(Number(z[1]));
});

test("every section title fits inside its column at every width", async ({ page }) => {
  for (const width of [320, 375, 768, 1024, 1280, 1366, 1440, 1536, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ["/", "/work/forgeworks/", "/work/enquiry-autopilot/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const overflowing = await page.locator(".display-l").evaluateAll((els) =>
        els
          .map((el) => {
            const range = document.createRange();
            range.selectNodeContents(el);
            const text = range.getBoundingClientRect();
            const box = el.parentElement!.getBoundingClientRect();
            return { title: el.textContent, over: Math.round(text.right - box.right) };
          })
          .filter((r) => r.over > 1),
      );
      expect(overflowing, `${path} at ${width}px`).toEqual([]);
    }
  }
});
