import { defineConfig, devices } from "@playwright/test";

const PORT = 4321;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  // Firefox occasionally fails to spawn on Windows under heavy parallel load
  workers: process.env.CI ? 2 : 3,
  retries: 1,
  reporter: [["list"]],
  timeout: 30_000,
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, grep: /@cross/ },
    { name: "webkit", use: { ...devices["Desktop Safari"] }, grep: /@cross/ },
    { name: "android-chrome", use: { ...devices["Pixel 7"] }, grep: /@cross/ },
  ],
  webServer: {
    command: "node scripts/test-server.mjs",
    url: `http://localhost:${PORT}`,
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(PORT) },
  },
});
