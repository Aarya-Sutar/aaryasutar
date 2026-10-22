import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  "/",
  "/work/forgeworks/",
  "/work/windward-house/",
  "/work/enquiry-autopilot/",
  "/nope/",
];

for (const path of pages) {
  test(`axe: no serious or critical issues on ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(
      serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
    ).toEqual([]);
  });
}

test("form errors are announced and linked (axe on the error state)", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  const results = await new AxeBuilder({ page }).include("#contact").analyze();
  expect(
    results.violations.filter((v) => v.impact === "serious" || v.impact === "critical"),
  ).toEqual([]);
});

test("keyboard: skip link, nav and FAQ work without a mouse", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();

  const firstFaq = page.locator(".faq-item summary").first();
  await firstFaq.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-item").first()).toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(page.locator(".faq-item").first()).not.toHaveAttribute("open", "");
});

test("mobile menu traps focus, closes on Esc and after a link tap", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Menu" });
  await open.click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  // focus cycles inside the dialog
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(open).toBeFocused();

  await open.click();
  await dialog.getByRole("link", { name: "FAQ" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#faq$/);
  await expect(page.locator("#faq")).toBeInViewport();
});

test("touch targets are at least 44px tall on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  const small = await page
    .locator("main a, main button, main summary, header button, header a, footer a")
    .evaluateAll((els) =>
      els
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) return false;
          // inline text links inside a sentence are exempt under WCAG 2.5.8
          const parent = el.closest("p, li");
          if (parent && parent.textContent!.trim() !== el.textContent!.trim()) return false;
          return r.height < 44 && !el.classList.contains("skip-link");
        })
        .map(
          (el) =>
            `${el.tagName} "${el.textContent?.trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().height)}px`,
        ),
    );
  expect(small).toEqual([]);
});
