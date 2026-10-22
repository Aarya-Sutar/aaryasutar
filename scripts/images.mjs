// Generates responsive WebP/AVIF variants for static export (no Next image optimiser).
// Usage: npm run images  (re-run after adding screenshots to public/images/work/)
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const OUT = "public/images/generated";
await mkdir(OUT, { recursive: true });

const jobs = [];
// small JPEGs for link previews (WhatsApp/LinkedIn ignore large PNGs and WebP)
const ogJobs = [
  { src: "public/images/work/autopilot-poster.jpg", out: `${OUT}/enquiry-autopilot-og.jpg` },
];

// Portrait cut-out (transparent): WebP + AVIF only
jobs.push({
  src: "public/images/portrait/aarya-cutout.png",
  name: "aarya-cutout",
  widths: [480, 760, 1144],
});

// Project screenshots
for (const file of await readdir("public/images/work")) {
  const m = file.match(/^(.+)-(desktop|mobile)\.png$/);
  if (!m) continue;
  const widths = m[2] === "desktop" ? [640, 1024, 1440, 2048] : [240, 400, 780];
  jobs.push({ src: `public/images/work/${file}`, name: `${m[1]}-${m[2]}`, widths });
  if (m[2] === "desktop")
    ogJobs.push({ src: `public/images/work/${file}`, out: `${OUT}/${m[1]}-og.jpg` });
}
// Video poster
jobs.push({
  src: "public/images/work/autopilot-poster.jpg",
  name: "autopilot-poster",
  widths: [640, 1196],
});

async function isFresh(out, src) {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
}

for (const { src, name, widths } of jobs) {
  const { width: srcW } = await sharp(src).metadata();
  for (const w of widths) {
    const width = Math.min(w, srcW);
    const base = path.join(OUT, `${name}-${w}`);
    if ((await isFresh(`${base}.avif`, src)) && (await isFresh(`${base}.webp`, src))) continue;
    await sharp(src)
      .resize({ width })
      .webp({ quality: 80, alphaQuality: 90, effort: 6 })
      .toFile(`${base}.webp`);
    await sharp(src).resize({ width }).avif({ quality: 55, effort: 6 }).toFile(`${base}.avif`);
    console.log("wrote", base);
  }
}

for (const { src, out } of ogJobs) {
  if (await isFresh(out, src)) continue;
  await sharp(src)
    .resize(1200, 630, { fit: "cover", position: "top" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log("wrote", out);
}
