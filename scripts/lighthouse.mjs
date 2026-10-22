// Lighthouse (mobile, simulated throttling) against the static build served on :4173.
// Usage: npx serve out -l 4173  (in another terminal), then: node scripts/lighthouse.mjs
// Chrome is launched through Playwright (chrome-launcher can't spawn it on some Windows setups).
import { writeFile, mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const PATHS = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/work/forgeworks/"];
const PORT = 9333;

const browser = await chromium.launch({ args: [`--remote-debugging-port=${PORT}`] });
await mkdir(".lighthouse", { recursive: true });
const rows = [];
for (const path of PATHS) {
  const result = await lighthouse(`${BASE}${path}`, {
    port: PORT,
    output: ["html", "json"],
    logLevel: "error",
    formFactor: "mobile",
    throttlingMethod: "simulate",
  });
  const name = path === "/" ? "home" : path.replace(/\//g, "-").replace(/^-|-$/g, "");
  await writeFile(`.lighthouse/${name}.html`, result.report[0]);
  await writeFile(`.lighthouse/${name}.json`, result.report[1]);
  const c = result.lhr.categories;
  const a = result.lhr.audits;
  rows.push({
    path,
    performance: Math.round(c.performance.score * 100),
    accessibility: Math.round(c.accessibility.score * 100),
    bestPractices: Math.round(c["best-practices"].score * 100),
    seo: Math.round(c.seo.score * 100),
    LCP: a["largest-contentful-paint"].displayValue,
    CLS: a["cumulative-layout-shift"].displayValue,
    TBT: a["total-blocking-time"].displayValue,
    weight: a["total-byte-weight"].displayValue,
  });
}
await browser.close();
console.table(rows);
