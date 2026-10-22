# Aarya Sutar: portfolio

Static Next.js site (App Router, `output: "export"`), Tailwind CSS v4, built to `PORTFOLIO_IMPLEMENTATION_BRIEF.md`.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To check the production build exactly as it will be deployed:

```bash
npm run build
npm start
```

## Editing content

- All wording, contact details and links: `src/content/site.ts`
- Projects: `src/content/projects.ts` (the steps for adding a project are at the top of that file)
- Open questions are marked `TODO(Aarya)` in both files.

## Contact form

Create `.env.local` with your Web3Forms key, then rebuild:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your_key
```

Without a key the form still renders. Submitting shows the error message with WhatsApp and email links, and the browser console logs a warning.

## Scripts

| Command | What it does |
|---|---|
| `npm run images` | Builds the responsive AVIF/WebP variants and the Open Graph JPEGs for `public/images` |
| `npm run screenshots` | Re-captures the live project screenshots with Playwright |
| `npm run og` | Regenerates `favicon.svg`, `apple-touch-icon.png` and the default OG image |
| `npm test` | Playwright suite. It builds with a dummy form key and mocks the API, so run `npm run build` afterwards |
| `npm run lighthouse` | Lighthouse mobile run against `npx serve out -l 4173` |

Original assets (the portrait and the video) live in `assets-src/`, which is git-ignored.
