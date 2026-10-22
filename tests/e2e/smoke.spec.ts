import { expect, test } from "@playwright/test";

const slugs = ["forgeworks", "windward-house", "enquiry-autopilot"];

test("home renders every section in order @cross", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Aarya Sutar: Websites & Automations for Businesses");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText(
    "Websites that bring in enquiries. Automations that answer them.",
  );
  const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual([
    "top",
    "services",
    "work",
    "how-it-works",
    "process",
    "about",
    "faq",
    "contact",
  ]);
  // three published projects, each concept one carrying its disclosure
  await expect(page.locator("#work article")).toHaveCount(3);
  await expect(page.locator("#work article", { hasText: "fictional business" })).toHaveCount(2);
});

test("case studies link both ways @cross", async ({ page }) => {
  await page.goto("/");
  for (const slug of slugs) {
    await page.goto("/");
    await page.locator(`#work a[href="/work/${slug}/"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}/$`));
    await expect(page.locator("h1")).toHaveCount(1);
    await page.getByRole("link", { name: "All work" }).click();
    await expect(page).toHaveURL(/\/#work$/);
  }
});

test("case study metadata is unique", async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const slug of slugs) {
    await page.goto(`/work/${slug}/`);
    titles.add(await page.title());
    descriptions.add(
      (await page.locator('meta[name="description"]').getAttribute("content")) ?? "",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`/work/${slug}/$`),
    );
  }
  expect(titles.size).toBe(3);
  expect(descriptions.size).toBe(3);
});

test("unknown routes show the 404 page", async ({ page }) => {
  const res = await page.goto("/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  await expect(page.getByRole("link", { name: "Back to the home page" })).toHaveAttribute(
    "href",
    "/",
  );
});

test("external links open safely in a new tab", async ({ page }) => {
  for (const path of ["/", ...slugs.map((s) => `/work/${s}/`)]) {
    await page.goto(path);
    const bad = await page
      .locator('a[href^="http"]')
      .evaluateAll((els) =>
        els
          .filter(
            (a) =>
              a.getAttribute("target") !== "_blank" ||
              !/noopener/.test(a.getAttribute("rel") ?? "") ||
              !/noreferrer/.test(a.getAttribute("rel") ?? ""),
          )
          .map((a) => a.getAttribute("href")),
      );
    expect(bad, path).toEqual([]);
  }
});

test("internal anchors all resolve", async ({ page }) => {
  await page.goto("/");
  const hashes = await page
    .locator('a[href^="/#"], a[href*="#"]')
    .evaluateAll((els) => [
      ...new Set(els.map((a) => (a.getAttribute("href") ?? "").split("#")[1]).filter(Boolean)),
    ]);
  for (const id of hashes) {
    await expect(page.locator(`[id="${id}"]`), `#${id}`).toHaveCount(1);
  }
});
