/*
 * HOW TO ADD A NEW PROJECT (for example the coaching-institute site)
 *
 * 1. Put screenshots in public/images/work/ as <slug>-desktop.png (1440×900 at 2×)
 *    and <slug>-mobile.png (390×844 at 2×). `npm run screenshots` can capture them
 *    if you add the live URL to scripts/screenshots.mjs.
 * 2. Run `npm run images` to generate the responsive WebP/AVIF versions.
 * 3. Copy an existing entry below, change the fields, and set `published: true`.
 *
 * Nothing else is needed: the homepage list, case-study page, sitemap and
 * Open Graph image all update automatically.
 */

export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string; // URL: /work/[slug]
  order: number; // sort order on the homepage
  published: boolean; // false = hidden everywhere (use for work in progress)
  name: string;
  kind: "Concept website" | "Client website" | "Automation prototype" | "Client automation";
  isConcept: boolean; // true → show concept disclosure
  year: number;
  summary: string; // one sentence, homepage + case study header
  highlights: [string, string, string];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  media: {
    desktop?: ProjectImage;
    mobile?: ProjectImage;
    video?: { src: string; poster: string; posterAlt: string; captionsNote: string };
  };
  caseStudy: {
    brief: string;
    built: string[];
    decisions: { title: string; body: string }[];
    note?: string; // optional callout shown under the media
  };
};

const projects: Project[] = [
  {
    slug: "panshet-lakeview",
    order: 1,
    published: true,
    name: "Panshet Lakeview Resort",
    kind: "Client website",
    isConcept: false,
    year: 2026,
    summary:
      "The live website for a lakeside resort near Pune, built so guests can check prices and ask about their dates on WhatsApp in one tap.",
    highlights: [
      "One-tap WhatsApp enquiry with dates, nights and guests already filled in",
      "Every package, room and group rate on one fast, mobile-first page",
      "Guest reviews written on the site, shown only after the owner approves them",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Workers"],
    liveUrl: "https://panshetlakeview.in",
    media: {
      desktop: {
        src: "/images/work/panshet-lakeview-desktop.png",
        alt: "Panshet Lakeview Resort home page on desktop: a hazy sunset over the lake behind the headline “One night by Panshet lake. Every meal sorted.”, with “Check dates on WhatsApp” and call buttons and an availability bar below.",
        width: 2880,
        height: 1800,
      },
      mobile: {
        src: "/images/work/panshet-lakeview-mobile.png",
        alt: "Panshet Lakeview Resort home page on a phone: the sunset over the lake, the headline, and stacked WhatsApp and call buttons.",
        width: 780,
        height: 1688,
      },
    },
    caseStudy: {
      brief:
        "Panshet Lakeview is a small, owner-run resort on the Panshet dam backwaters, about an hour from Pune. It had no website: guests found it through Instagram reels and forwarded WhatsApp messages, then had to message just to learn the price. The site needed to answer “what does it cost and what’s included?” at a glance and turn that into a WhatsApp enquiry, on a phone with weak rural signal.",
      built: [
        "A one-page site: prices and packages, a typical day, the place, celebrations, reviews, FAQ and directions",
        "A hero photo slideshow and short muted video reels of the lake, boating and cottages",
        "An availability form that opens WhatsApp with the guest’s dates, nights and guest count already written",
        "An email enquiry form as a second option, with WhatsApp and phone fallbacks if it fails",
        "Guest reviews written on the site, held until the owner approves them from a private admin page",
        "Google rating and review count, structured data for search, and a share image for WhatsApp previews",
        "Deployed on Cloudflare at the client’s own domain, panshetlakeview.in",
      ],
      decisions: [
        {
          title: "WhatsApp is the booking system",
          body: "The owner already takes bookings on WhatsApp, so the site feeds that instead of adding a booking engine. Every main button opens a prefilled message, and tap-to-call is always the second option.",
        },
        {
          title: "Price first, no surprises",
          body: "The per-person price and everything it covers are in the first screen. Every number on the page comes from one facts file with its source, checked against the owner’s price list.",
        },
        {
          title: "Built for weak signal",
          body: "Photos are served as AVIF and WebP at several sizes, the reels are short muted clips with posters, and videos stream with byte-range requests so they play on iPhones without downloading in full.",
        },
      ],
    },
  },
  {
    slug: "forgeworks",
    order: 2,
    published: true,
    name: "Forgeworks Athletic Club",
    kind: "Concept website",
    isConcept: true,
    year: 2026,
    summary:
      "A complete website for a fictional strength gym, designed to turn visitors into free-trial sign-ups.",
    highlights: [
      "10 pages, including memberships, class timetable and trainer profiles",
      "Free-trial booking flow",
      "Brand, copywriting and art direction created from scratch",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveUrl: "https://gym-demo-xi-olive.vercel.app",
    repoUrl: "https://github.com/Aarya-Sutar/gym-demo",
    media: {
      desktop: {
        src: "/images/work/forgeworks-desktop.png",
        alt: "Forgeworks home page on desktop: a dark gym interior behind the headline “This mill rolled steel for the better part of a century. Now it shapes people.” with a “Start your free trial” button.",
        width: 2880,
        height: 1800,
      },
      mobile: {
        src: "/images/work/forgeworks-mobile.png",
        alt: "Forgeworks home page on a phone: the same headline with stacked “Start your free trial” and “See membership plans” buttons.",
        width: 780,
        height: 1688,
      },
    },
    caseStudy: {
      brief:
        "Most gym websites look interchangeable and bury the one action that matters: booking a first session. Forgeworks explores what a small, coaching-led gym’s site looks like when every page points toward a free trial.",
      built: [
        "Home",
        "Programs",
        "Memberships",
        "A free-trial booking flow (/join)",
        "Trainers",
        "Facilities",
        "Results",
        "Class timetable",
        "About",
        "Contact",
        "All content is managed from one content file.",
      ],
      // TODO(Aarya): review these drafts (brief U11).
      decisions: [
        {
          title: "A story, not a slogan",
          body: "The brand is built around the gym’s history and coaching standards rather than generic fitness claims.",
        },
        {
          title: "One action everywhere",
          body: "A “Start your free trial” call to action is repeated in the navigation, hero, plans and footer.",
        },
        {
          title: "Plans you can compare at a glance",
          body: "Three memberships with plain-language differences and no fine print.",
        },
      ],
    },
  },
  {
    slug: "windward-house",
    order: 4,
    // Hidden: replaced by the real resort client site (Panshet Lakeview). Set to true to bring it back.
    published: false,
    name: "Windward House",
    kind: "Concept website",
    isConcept: true,
    year: 2026,
    summary:
      "A boutique-hotel website with a working four-step booking flow, built as an editorial alternative to template hotel sites.",
    highlights: [
      "Four-step booking flow with live price calculation",
      "Room detail pages with galleries and availability check",
      "Editorial design across rooms, dining and grounds",
    ],
    // Confirmed from the repo's package.json (react, typescript, vite, tailwindcss).
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveUrl: "https://hotel-website-demo-alpha.vercel.app",
    repoUrl: "https://github.com/Aarya-Sutar/hotel-website-demo",
    media: {
      desktop: {
        src: "/images/work/windward-house-desktop.png",
        alt: "Windward House home page on desktop: a sunset photo of a coastal bridge behind the headline “A quiet edge of the coastline”, with “Reserve your stay” and an availability bar below.",
        width: 2880,
        height: 1800,
      },
      mobile: {
        src: "/images/work/windward-house-mobile.png",
        alt: "Windward House home page on a phone: the sunset coastline photo, the headline and two booking buttons.",
        width: 780,
        height: 1688,
      },
    },
    caseStudy: {
      brief:
        "Small hotels often rely on generic templates and push guests to third-party booking sites. Windward House explores a direct-booking site with its own character: a fictional twelve-room hotel on the Big Sur coast.",
      built: [
        "Home with an availability widget",
        "Stay (all rooms)",
        "Room detail pages",
        "A 4-step Reserve flow (dates → room → guest details → review) with confirmation",
        "Table (dining)",
        "Grounds",
        "No payment processing; that’s deliberate for a demo.",
      ],
      // TODO(Aarya): review these drafts (brief U11).
      decisions: [
        {
          title: "Booking is never more than one tap away",
          body: "The availability check is docked under the hero.",
        },
        {
          title: "An editorial list, not a product grid",
          body: "Each room is described like a place, not a SKU.",
        },
        {
          title: "Price clarity",
          body: "The total is calculated live as guests choose dates and rooms.",
        },
      ],
    },
  },
  {
    slug: "enquiry-autopilot",
    order: 3,
    published: true,
    name: "Enquiry Autopilot",
    kind: "Automation prototype",
    isConcept: false,
    year: 2026,
    // TODO(Aarya): the brief's summary said the prototype also "replies to every new enquiry".
    // The recording only shows logging + a Telegram alert to the business, so the summary
    // describes that. If it also sends the enquirer a reply, add it back here.
    summary:
      "A working prototype of an automation that logs every new enquiry in a Google Sheet and alerts the business on Telegram within seconds.",
    // TODO(Aarya): confirm these three highlights (taken from what the recording shows).
    highlights: [
      "Catches each website form submission the moment it’s sent",
      "Adds the enquiry to a Google Sheet with a timestamp, source and a “New” status",
      "Alerts the team on Telegram with the lead’s details and a one-tap WhatsApp link",
    ],
    // TODO(Aarya): confirm the tools used (n8n, Telegram and Google Sheets are visible in the recording).
    stack: ["n8n", "Telegram Bot API", "Google Sheets"],
    media: {
      video: {
        src: "/media/autopilot-demo.mp4",
        poster: "/images/work/autopilot-poster.jpg",
        posterAlt:
          "The n8n workflow editor with four connected steps: Webhook, Edit Fields, Append row in sheet, and Send a text message.",
        captionsNote:
          "The recording shows an n8n workflow with four steps: Webhook, Edit Fields, Append row in sheet, and Send a text message. A test enquiry is submitted and each step turns green in turn. A new row appears in a Google Sheet called “Leads” with the timestamp, name, phone, course, class, source (“Website Form”) and status (“New”). A “New enquiry” message then arrives in a Telegram group called “Enquiry Alerts”, with the lead’s name, phone number, course and an “Open in WhatsApp” link. The recording has no sound.",
      },
    },
    caseStudy: {
      brief:
        "Businesses that run ads or get website enquiries often reply hours later, by which time the lead has gone cold. This prototype answers instantly.",
      // TODO(Aarya): list exactly which steps the prototype performs. These are only the steps
      // visible in the recording; add an instant reply to the enquirer or a follow-up if it does them.
      built: [
        "A webhook receives each website form submission.",
        "An Edit Fields step maps the submitted details (name, phone, course, class) into a consistent shape.",
        "A new row is appended to a “Leads” Google Sheet with a timestamp, the source and a “New” status.",
        "A Telegram message goes to an “Enquiry Alerts” group with the lead’s name, phone, course and an “Open in WhatsApp” link.",
      ],
      // TODO(Aarya): add 2–3 decisions worth noting for this prototype (the brief has none yet).
      decisions: [],
      note: "This prototype sends its alerts on Telegram. Production versions use WhatsApp once the business’s WhatsApp Business account is verified.",
    },
  },
];

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const list = getPublishedProjects();
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length];
}

export function projectDomain(p: Project): string {
  return p.liveUrl ? new URL(p.liveUrl).host : "n8n workflow · recording";
}
