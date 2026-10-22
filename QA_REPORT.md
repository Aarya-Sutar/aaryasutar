# QA report (M8)

Date: 22 Oct 2026. Production static export (`out/`) served locally. No Web3Forms key was set for this build.

## Lighthouse (mobile, simulated throttling)

Re-run on 23 Oct after the font and hero changes.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | Page weight |
|---|---|---|---|---|---|---|---|
| `/` (4 runs) | 93–97 | 100 | 100 | 100 | 2.4–3.0 s | 0 | 340 KiB |
| `/work/forgeworks/` | 97 | 100 | 100 | 100 | 2.7 s | 0 | 360 KiB |
| `/work/windward-house/` | 95 | 100 | 100 | 100 | 2.9 s | 0 | 392 KiB |
| `/work/enquiry-autopilot/` | 96 | 100 | 100 | 100 | 2.7 s | 0 | 318 KiB |

- The new text font adds about 50 KB.
- Performance varies by ±3 between identical runs on this machine. The 93 came with a 200 ms blocking-time spike.
- Targets: Accessibility, Best Practices and SEO at 100 ✅, CLS ✅, page weight ✅. Performance ≥95 ✅ on most runs.
- LCP <2.0s ❌ and home JS <110 KB ❌: see DEVIATIONS.md.
- Re-run: `npx serve out -l 4173`, then `npm run lighthouse`. HTML reports go to `.lighthouse/`.

## Budgets

| Item | Target | Actual |
|---|---|---|
| Hero portrait (WebP) | <120 KB | 93 KB at 1144w (AVIF 41 KB; phones get the 480w file, 10 KB) |
| JS on home (gzipped, module scripts) | <110 KB | ~145 KB (framework ~116 KB) |
| First-load weight | <900 KB | 340 KiB |
| Video | <8 MB | 0.39 MB (H.264, faststart, silent track removed) |

## Automated tests (`npm test`): 51 passed

Projects: Chromium (all specs) plus WebKit and Android Chrome (Pixel 7) for the `@cross` specs.

- **smoke:** section order, one `h1` per page, 3 projects, concept disclosures, case-study links both ways, unique titles, descriptions and canonicals, 404 status, external links use `target="_blank" rel="noopener noreferrer"`, every internal anchor resolves.
- **form** (Web3Forms API mocked):
  - invalid input: linked `aria-describedby` errors, focus on the first error, nothing sent
  - `+country` numbers accepted
  - success: "Sending…", disabled with `aria-busy`, then the success block with the heading focused; payload shape checked
  - network error: alert shown, input kept
  - `success:false` is treated as an error
  - `?service=` pre-select
- **a11y:**
  - axe (WCAG 2.2 AA tags) shows zero serious or critical issues on all 5 pages and on the form error state
  - keyboard: skip link, FAQ with Enter/Space
  - mobile menu: focus trap, Esc closes it and returns focus, closes after a link tap
  - 44px touch targets
- **responsive:**
  - no horizontal scroll at 320/375/390/768/1024/1280/1440/1920 on the home page and two case studies
  - hero name never clipped
  - mobile fit rule: each line fills >96% of the width
  - first screen at 375×667 shows the headline and the primary button
- **motion:**
  - reduced motion: everything static and visible, diagram fully drawn
  - diagram plays once at 40% in view
  - nav hides on scroll down and shows on scroll up
  - with JS off: all content readable, and the form's `<noscript>` fallback has WhatsApp and email links

**Firefox:** not run. The Playwright Firefox binary won't launch on this machine (DEVIATIONS.md #13).

## Manual checks

- **Missing Web3Forms key:**
  - The console warns on load.
  - Submitting valid data shows the error alert with WhatsApp and email links, and the input is kept.
- **Contrast** (computed):

  | Pair | Ratio |
  |---|---|
  | paper-50 on ink-950 | 16.3:1 |
  | muted-dark on ink-950 | 6.8:1 |
  | muted-dark on ink-900 | 6.3:1 |
  | muted-light on paper-50 | 6.3:1 |
  | signal-ink on paper-50 | 4.8:1 |
  | ink-950 on signal (button) | 6.1:1 |
  | error-dark on ink-900 | 6.3:1 |
- **Honesty audit:**
  - Searched the built HTML for "client", "happy", "years", "projects completed", "testimonial", "★", "rating" and "review". The only hits are the concept disclosures ("…reviews inside it are invented"), "a live preview link to review" (Process) and the hotel's "review" booking step. All are legitimate.
  - Every concept project shows its disclosure on the home page and on its case study.
  - No fake reviews or rating markup; the JSON-LD is `Person` only.
- **Visual review against "must not contain":** no "PORTFOLIO" graphic, gradients, glass, glows, blobs, 3D, bento grid, emoji, icon tiles, stats, QR codes, custom cursor, smooth scroll, particles or marquee.

## Things for you to look at

- **The Telegram demo video shows your Telegram chat list**: other chats' avatars and initials appear in the left column. It also uses real coaching-institute names ("RCC Institute", "Aakash Institute") as test enquiries. Consider re-recording with dummy names and a cropped window.
- **The portrait is the WhatsApp-compressed copy.** A full-resolution original would look sharper on large screens.
- `review/` has every checkpoint image: the portrait on ink at 100% and 200%, the project screenshots, full-page home at 375 and 1440, hero at 9 sizes (including 1366×657 and 1536×702 laptops), case studies, the 404, the mobile menu, form validation, the OG image, and motion GIFs and stills.
