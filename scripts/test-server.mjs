// Used by Playwright: builds the static export with a dummy Web3Forms key (the API is
// mocked in tests, so nothing is ever sent), then serves out/ on the test port.
// Run `npm run build` afterwards to rebuild out/ with your real key from .env.local.
import { spawn, spawnSync } from "node:child_process";

const PORT = process.env.PORT ?? "4321";
const env = { ...process.env, NEXT_PUBLIC_WEB3FORMS_KEY: "playwright-test-key" };

if (!process.env.SKIP_BUILD) {
  const build = spawnSync("npx", ["next", "build"], { stdio: "inherit", env, shell: true });
  if (build.status !== 0) process.exit(build.status ?? 1);
}

spawn("npx", ["serve", "out", "-l", PORT, "--no-clipboard"], { stdio: "inherit", shell: true });
