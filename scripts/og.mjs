// Generates the favicon (SVG + 180px apple-touch-icon) and the default Open Graph image.
// Usage: npm run og   (re-run if the headline, colours or portrait change)
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import opentype from "opentype.js";
import sharp from "sharp";
import { chromium } from "@playwright/test";

const INK_950 = "#12100E";
const PAPER_50 = "#F2EDE4";
const MUTED_DARK = "#A39A8E";
const SIGNAL = "#FF5A1F";
const HEADLINE = ["Websites that bring in enquiries.", "Automations that answer them."];

const FONT_PATH = "assets-src/fonts/Anton-Regular.ttf";
const FONT_URL = "https://github.com/google/fonts/raw/main/ofl/anton/Anton-Regular.ttf";

if (!existsSync(FONT_PATH)) {
  await mkdir("assets-src/fonts", { recursive: true });
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`Could not download Anton (${res.status})`);
  await writeFile(FONT_PATH, Buffer.from(await res.arrayBuffer()));
}

// ── Favicon: "AS" in Anton as outlined paths, so it renders without the font ──
const anton = opentype.parse((await readFile(FONT_PATH)).buffer);
const SIZE = 64;
const fontSize = 46;
const glyphs = anton.getPath("AS", 0, 0, fontSize);
const box = glyphs.getBoundingBox();
const dx = (SIZE - (box.x2 - box.x1)) / 2 - box.x1;
const dy = (SIZE - (box.y2 - box.y1)) / 2 - box.y1;
const path = anton.getPath("AS", dx, dy, fontSize).toPathData(2);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}"><rect width="${SIZE}" height="${SIZE}" fill="${INK_950}"/><path fill="${SIGNAL}" d="${path}"/></svg>\n`;
await writeFile("public/favicon.svg", svg);
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile("public/apple-touch-icon.png");
console.log("wrote public/favicon.svg, public/apple-touch-icon.png");

// ── Open Graph image: 1200×630, poster style ──
const portrait = (await readFile("public/images/generated/aarya-cutout-760.webp")).toString(
  "base64",
);
const antonB64 = (await readFile(FONT_PATH)).toString("base64");
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,800&display=block">
<style>
  @font-face { font-family: Anton; src: url(data:font/ttf;base64,${antonB64}); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: ${INK_950}; position: relative; overflow: hidden; }
  .headline { position: absolute; left: 64px; top: 64px; width: 720px; font: 800 46px/1 'Bricolage Grotesque', sans-serif; font-variation-settings: 'wdth' 75; letter-spacing: -0.008em; color: ${PAPER_50}; }
  .meta { position: absolute; left: 64px; top: 30px; font: 500 13px/1 ui-monospace, monospace; letter-spacing: .08em; color: ${MUTED_DARK}; text-transform: uppercase; }
  .name { position: absolute; left: 56px; bottom: 30px; font: 400 196px/0.82 Anton; color: ${PAPER_50}; text-transform: uppercase; white-space: nowrap; letter-spacing: -0.005em; z-index: 2; }
  img { position: absolute; right: 56px; bottom: 0; height: 500px; z-index: 1; }
</style></head><body>
  <div class="meta">Web development · Automation</div>
  <div class="headline">${HEADLINE.join("<br>")}</div>
  <img src="data:image/webp;base64,${portrait}" alt="">
  <div class="name">Aarya Sutar</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await mkdir("public/images/og", { recursive: true });
await page.screenshot({ path: "public/images/og/og-default.png" });
await browser.close();
console.log("wrote public/images/og/og-default.png");
