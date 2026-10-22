# Deviations from PORTFOLIO_IMPLEMENTATION_BRIEF.md

Each item is something in the brief that was contradictory, impossible or unverifiable as written. For each one I chose the closest faithful fix. Everything else follows the brief.

## Changes you asked for after the first review

You asked for the whole hero to be visible and for bolder, more aesthetic type. These override the brief where they conflict:

- **The text font is now Bricolage Grotesque, replacing Geist** (4.2).
  - The hero headline uses its narrow-width cut (wdth 75) at weight 800, so each sentence sets as one poster line on wide screens.
  - h3s, project names, FAQ questions, buttons and the wordmark are 700–800.
  - Anton (display) and Geist Mono (labels) are unchanged.
  - Only the weight and width axes ship. The font file is 78 KB (Geist was 29 KB). Adding the optical-size axis would have made it 131 KB, so I left it out.
- **The hero always fits the first screen.** Your screen is about 1536×700 CSS px (125% Windows scaling), and the hero needed 845px.
  - The headline is now 2 lines instead of 3.
  - The copy column is wider (7 columns instead of 5).
  - The WhatsApp link sits inline with the buttons.
  - On short desktop screens the name shrinks with the screen height: `clamp(6rem, (100svh − 490px) / 0.82, display-xl)`. On tall screens it's unchanged.
  - Verified at 1366×657, 1536×702, 1440×900 and 1920×1080.
- **Big Anton numerals** (01, 02, …) on Services, Process and the work rows, replacing the small mono labels. The brief lists Anton for "big numerals".
- **Light-section dividers** are a 15% ink rule, mixed from existing tokens, instead of paper-100. On paper-50, paper-100 was about 1.1:1 and the layout structure disappeared.
- **Section titles are larger** (`display-l` max 7rem, was 5.5rem) and balance across lines.

## Design and layout

1. **Desktop hero: the name sits in front of the portrait, not behind it** (6.1 #4)
   - At ≥1024px "AARYA SUTAR" fits on one line (Anton measures 4.87em; at 16rem that's 1,233px in a 1,328px container), and SUTAR lands exactly in the right half, where the portrait stands.
   - The cut-out is head and chest, and the black shirt rises about 300px above the bottom edge. If the portrait sat in front, it would hide SUTAR's letters completely. That breaks the brief's own hard rule: "no single letter may be more than 50% covered, and the name must stay readable".
   - Using two lines instead doesn't fit the 960px max hero height at 1440×900 (it needs about 1,000px).
   - **Fix:** every position in the brief is kept (one line, bottom-aligned, portrait right half, bottom-anchored, 78% of the hero). Only the stacking order flips: the name is layered above the shirt. The head never crosses the name, so no letter is covered and the face is untouched.
   - Covered by a test: `responsive.spec.ts`, "portrait never covers the desktop name".

2. **Stacked name lines get a 0.09em gap** (4.2 `display-xl`, mobile/tablet)
   - Anton's capitals are about 0.86–0.875em tall, so at `line-height: 0.82` two stacked lines overlap (the A's feet hit the S).
   - Below 1024px the second line gets +0.09em. Desktop is one line and unaffected.

3. **768–1023px uses the mobile hero layout**
   - The brief defines desktop (≥1024) and mobile (<768) only.
   - Tablets get the stacked layout with the fit rule (each line fills the width), and the portrait is capped at 520px wide.

4. **Case-study hero media: the desktop frame spans 10 of 12 columns, with the mobile frame beside it in 2** (6.11 #3)
   - "Full container width" and "mobile screenshot beside it" can't both be true. This keeps both images framed and side by side.

5. **Enquiry-flow nodes fade by opacity, not colour** (5 #2)
   - "Fades from `--ink-700` to its full colour" conflicts with "animate only transform and opacity".
   - Nodes go from 32% to 100% opacity, which reads as the same ink-700-to-full transition on the dark band. Connectors still use `stroke-dashoffset` as specified.
   - The diagram only switches to its dimmed "ready" state when it is within one viewport of the screen, so the low-contrast state never sits in the page unseen. It also stays fully drawn if you load the page already scrolled past it.

## Content (honesty rules)

6. **Enquiry Autopilot wording follows the recording, not the brief's draft** (7.2 #03)
   - The recording shows: Webhook → Edit Fields → append a row to a "Leads" Google Sheet → a Telegram alert to an "Enquiry Alerts" group, with a WhatsApp link.
   - It does **not** show a reply to the enquirer or a follow-up.
   - Changes made:
     - Summary: "…logs every new enquiry in a Google Sheet and alerts the business on Telegram within seconds", instead of "replies to every new enquiry…".
     - Page note: "This prototype sends its alerts on Telegram…", instead of "replies on Telegram".
     - Highlights and the "What I built" list: only the visible steps.
   - The original wording is kept in `TODO(Aarya)` comments in `src/content/projects.ts`.

7. **Enquiry Autopilot has no "Decisions worth noting" section.** The brief gives none, and inventing them would break the honesty rules. The template hides the section when the list is empty (`TODO(Aarya)` left).

## Assets

8. **The portrait cut-out is 1144×1158, not ~1600px tall** (8.2)
   - The only portrait in `public/` was the WhatsApp-compressed copy (1195×1280).
   - Background removal used rembg `birefnet-portrait`, which had the cleanest hair and ear edges of the three models tried. Edge colour was then decontaminated, plus a slight alpha choke, a gentle warm grade and a contrast lift.
   - Edges are clean on `--ink-950` at 200% (see `review/portrait-cutout-on-ink-200-*.png`).
   - A higher-resolution original from the phone would make it sharper on large retina screens.

9. **The portrait uses `<picture>` (AVIF/WebP) plus `ReactDOM.preload`, not `next/image priority`** (6.1, 9.1)
   - With `images.unoptimized: true` (required for static export), `next/image` can't emit a `srcset`.
   - The `<picture>` element serves 480/760/1144w variants from `npm run images`, with `fetchpriority="high"` and a preload link. The 1144w AVIF is 41 KB; WebP is 93 KB, under the 120 KB budget.

10. **Case-study Open Graph images are 1200×630 JPEGs** cropped from the desktop screenshot (or the video poster), not the 2880px PNGs. Those are 4–5 MB, which WhatsApp and LinkedIn link previews won't load. `npm run images` generates them automatically for new projects.

## Performance budgets (9.6)

11. **JS on home is about 145 KB gzipped against the 110 KB target.**
    - Next.js 16 and React 19 alone are about 116 KB gzipped (the two framework chunks). This site's own client code (nav, menu, form, reveal titles, diagram) is about 15 KB.
    - No extra libraries are used: Motion was not needed.
    - A further 39 KB polyfill chunk is `nomodule`, so modern browsers never download it.
    - Hitting 110 KB would mean leaving Next.js, which the brief mandates.

12. **LCP is 2.5–2.7s (Lighthouse simulated mobile) against the <2.0s target.**
    - The LCP element is the hero name, and the mandated 750ms masked-rise reveal delays its final paint.
    - With the reveal disabled as a test, LCP measured 1.9s.
    - I kept the reveal because it's signature motion #1. Performance still scores 96–97, above the ≥95 target. If LCP matters more to you, shortening the name rise is the lever.

## Verification limits

13. **Firefox could not be tested on this machine.** Playwright's Firefox binary fails to start (`spawn UNKNOWN`), most likely Windows app control blocking an unsigned executable. I didn't change any security settings. The full suite passes on Chromium, WebKit (Safari) and Android Chrome emulation.
14. **Lighthouse runs through a Playwright-launched Chromium** (`scripts/lighthouse.mjs`) for the same reason: Lighthouse's own Chrome launcher hits the same spawn error.
