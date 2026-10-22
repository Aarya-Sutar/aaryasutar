import { expect, test, type Page } from "@playwright/test";

const API = "https://api.web3forms.com/submit";

async function fillValid(page: Page) {
  await page.getByLabel("Name", { exact: true }).fill("Priya Shah");
  await page.getByLabel("Business name").fill("Shah Dental");
  await page.getByLabel("Phone / WhatsApp").fill("98765 43210");
  await page.getByLabel("Email").fill("priya@example.com");
  await page.getByRole("radio", { name: "Website" }).check();
  await page.getByLabel("Tell me about it").fill("A new site for two clinics.");
}

test.describe("enquiry form @cross", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("shows linked errors for invalid input and sends nothing", async ({ page }) => {
    let called = false;
    await page.route(API, (route) => {
      called = true;
      return route.fulfill({ json: { success: true } });
    });

    await page.getByLabel("Name", { exact: true }).fill("A");
    await page.getByLabel("Phone / WhatsApp").fill("12345");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const name = page.getByLabel("Name", { exact: true });
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute("aria-describedby", /error-name/);
    await expect(page.locator("#error-name")).toHaveText("Use 2 to 80 characters.");
    await expect(page.locator("#error-phone")).toContainText("10-digit Indian number");
    await expect(page.locator("#error-email")).toContainText("valid email");
    await expect(page.locator("#error-service")).toHaveText("Choose one option.");
    expect(called).toBe(false);
  });

  test("accepts +country numbers and an empty email", async ({ page }) => {
    await page.route(API, (route) => route.fulfill({ json: { success: true } }));
    await page.getByLabel("Name", { exact: true }).fill("Sam Lee");
    await page.getByLabel("Phone / WhatsApp").fill("+44 7700 900123");
    await page.getByRole("radio", { name: "Not sure yet" }).check();
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("heading", { name: "Thanks, got it." })).toBeVisible();
  });

  test("success replaces the form and focuses the heading", async ({ page }) => {
    let body: Record<string, unknown> = {};
    await page.route(API, async (route) => {
      body = route.request().postDataJSON();
      await new Promise((r) => setTimeout(r, 300));
      return route.fulfill({ json: { success: true } });
    });
    await fillValid(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();

    const sending = page.getByRole("button", { name: "Sending…" });
    await expect(sending).toBeDisabled();
    await expect(sending).toHaveAttribute("aria-busy", "true");

    const heading = page.getByRole("heading", { name: "Thanks, got it." });
    await expect(heading).toBeFocused();
    await expect(page.getByRole("button", { name: "Send enquiry" })).toHaveCount(0);
    expect(body).toMatchObject({
      access_key: "playwright-test-key",
      subject: "New enquiry from Priya Shah (Website)",
      from_name: "aaryasutar.com",
      phone: "9876543210",
      service: "Website",
      botcheck: false,
    });
  });

  test("network error keeps input and shows the alert", async ({ page }) => {
    await page.route(API, (route) => route.abort("failed"));
    await fillValid(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    const alert = page.locator("form").getByRole("alert");
    await expect(alert).toContainText("That didn't send.");
    await expect(alert.getByRole("link", { name: /WhatsApp/ })).toBeVisible();
    await expect(alert.getByRole("link", { name: /email/ })).toBeVisible();
    await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Priya Shah");
    await expect(page.getByLabel("Tell me about it")).toHaveValue("A new site for two clinics.");
  });

  test("API success:false is treated as an error", async ({ page }) => {
    await page.route(API, (route) => route.fulfill({ json: { success: false, message: "x" } }));
    await fillValid(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.locator("form").getByRole("alert")).toContainText("That didn't send.");
  });
});

test("?service= pre-selects the option @cross", async ({ page }) => {
  await page.goto("/?service=automation#contact");
  await expect(page.getByRole("radio", { name: "Automation" })).toBeChecked();
  await page.goto("/?service=nonsense#contact");
  for (const name of ["Website", "Automation", "Both", "Not sure yet"]) {
    await expect(page.getByRole("radio", { name })).not.toBeChecked();
  }
});
