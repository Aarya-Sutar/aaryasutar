// All site copy, contact details and links live here. Components only read from this file.
// Search for "TODO(Aarya)" to find everything that still needs your confirmation.

// TODO(Aarya): replace with the real domain once it's bought (brief U1). Used for canonical URLs, sitemap and OG tags.
export const SITE_URL = "https://aaryasutar.com";

// TODO(Aarya): confirm the phone and email below are the ones you want public (taken from the résumé, brief U8).
const PHONE_E164 = "+918468948933";
const PHONE_DISPLAY = "+91 84689 48933";
const EMAIL = "sutaraarya5@gmail.com";
const WHATSAPP_URL =
  "https://wa.me/918468948933?text=Hi%20Aarya%2C%20I%27d%20like%20to%20discuss%20a%20project.";
const GITHUB_URL = "https://github.com/Aarya-Sutar";
const LINKEDIN_URL = "https://www.linkedin.com/in/aaryasutar03/";

export const RESUME_PATH = "/resume/Aarya_Sutar_Resume.pdf";

export const site = {
  name: "Aarya Sutar",
  resumePath: RESUME_PATH,
  meta: {
    title: "Aarya Sutar: Websites & Automations for Businesses",
    description:
      "I design and build fast, mobile-first websites for businesses and set up the automations behind them: instant replies, lead tracking, alerts and follow-ups.",
    jobTitle: "Web Developer",
  },

  contact: {
    phoneE164: PHONE_E164,
    phoneDisplay: PHONE_DISPLAY,
    email: EMAIL,
    whatsappUrl: WHATSAPP_URL,
    githubUrl: GITHUB_URL,
    linkedinUrl: LINKEDIN_URL,
  },

  nav: {
    skipLink: "Skip to content",
    links: [
      { label: "Work", href: "/#work" },
      { label: "Services", href: "/#services" },
      { label: "About", href: "/#about" },
      { label: "FAQ", href: "/#faq" },
    ],
    cta: { label: "Start a project", href: "/#contact" },
    menuOpen: "Menu",
    menuClose: "Close",
    menuLabel: "Site menu",
  },

  hero: {
    // Headline: "Websites that bring in" / [cycling orange word] / "Automations that answer them."
    // Screen readers get `headline`; the cycling words are visual only.
    headline: "Websites that bring in enquiries. Automations that answer them.",
    headlineBefore: "Websites that bring in",
    headlineWords: ["enquiries.", "customers.", "bookings.", "leads."],
    headlineAfter: "Automations that answer them.",
    // Alternatives (brief 1.1), if you prefer a static headline:
    // "I build the website, and the system behind it."
    // "Your website, and everything that happens after someone fills the form."
    supporting: "Fast websites for businesses, and the automations that answer every enquiry.",
    primaryCta: { label: "Start a project", href: "/#contact" },
    secondaryCta: { label: "See the work", href: "/#work" },
    // spinning badge on the portrait (repeats around the circle)
    badge: "Web development · Automation · ",
    nameLines: ["Aarya", "Sutar"],
    portraitAlt: "Aarya Sutar",
  },

  services: {
    title: "What I build",
    items: [
      {
        number: "01",
        title: "Websites",
        body: "Custom-designed websites and landing pages that load fast on mobile data and turn visitors into enquiries.",
        includes: [
          "Design and development",
          "Mobile-first, fast pages",
          "Enquiry forms and WhatsApp buttons",
          "Basic SEO and Google-ready setup",
          // TODO(Aarya): confirm this ownership promise (brief U3).
          "You own the code and the domain",
        ],
        cta: { label: "Discuss a website", service: "website" },
      },
      {
        number: "02",
        title: "Automations",
        body: "Systems that run after someone contacts you, so no enquiry sits unanswered.",
        includes: [
          "Instant replies to new enquiries",
          "Leads saved to Google Sheets or your tools",
          "Alerts to you or your team",
          "Automatic follow-ups",
          "Built with n8n and APIs",
        ],
        cta: { label: "Discuss an automation", service: "automation" },
      },
      {
        number: "03",
        title: "Website + Automation",
        body: "The website's enquiry form feeds the automation directly: one setup, end to end.",
        includes: ["Everything above, connected", "One person accountable for the whole flow"],
        cta: { label: "Discuss both", service: "both" },
      },
    ],
  },

  // orange band between Services and Work (decorative, repeats)
  marquee: [
    "Websites",
    "Automations",
    "Landing pages",
    "Instant replies",
    "Lead tracking",
    "Follow-ups",
  ],

  work: {
    title: "Selected work",
    intro:
      "Concept projects and prototypes, built end to end to show what I can make for a real business.",
    conceptDisclosure:
      "Concept project: a fictional business I designed and built. Names, photos and reviews inside it are invented.",
    caseStudyLink: "Read the case study",
    liveLink: "Live site",
    repoLink: "Code",
  },

  flow: {
    title: "What happens after the form",
    intro:
      "Most businesses lose enquiries in the gap between 'form submitted' and 'someone calls back'. This is the system I build to close that gap.",
    steps: [
      { number: "01", title: "Enquiry", body: "Someone fills your website form or ad form" },
      {
        number: "02",
        title: "Instant reply",
        body: "They get a reply within seconds, on WhatsApp, Telegram or email",
      },
      { number: "03", title: "Saved", body: "Their details land in a Google Sheet or your CRM" },
      { number: "04", title: "Alert", body: "You or your team get notified straight away" },
      {
        number: "05",
        title: "Follow-up",
        body: "If nobody has called yet, a reminder goes out automatically",
      },
    ],
    caption: "An illustrative flow. The exact steps and tools depend on your business.",
    prototypeLink: { label: "Watch the working prototype", href: "/work/enquiry-autopilot/" },
  },

  process: {
    title: "How we'll work",
    steps: [
      {
        number: "01",
        title: "Talk.",
        body: "A short call or chat about your business, your customers and what the website needs to do.",
      },
      {
        number: "02",
        title: "Plan.",
        body: "I map out the pages, content and any automation, and you approve it before I build.",
      },
      {
        number: "03",
        title: "Build.",
        // TODO(Aarya): number of revision rounds? (brief U4: omitted until you decide)
        body: "You get a live preview link to review, and we refine it together.",
      },
      {
        number: "04",
        title: "Launch and hand over.",
        body: "I connect your domain, put the site live, and show you how everything works.",
      },
    ],
  },

  about: {
    title: "About",
    bio: [
      "I'm Aarya Sutar, a software developer and engineering student at NIT Trichy. Alongside my degree I've worked as a software engineer at Inqor AI, building subscription and payment systems, and as an AI/ML intern at Birlasoft, building document-search tools for enterprise software.",
      "I bring that same engineering to business websites: pages that load fast, forms that actually work, and data that ends up where it should.",
    ],
    backgroundTitle: "Background",
    background: [
      {
        // TODO(Aarya): confirm the Inqor role is still current at launch (brief U9).
        period: "2026 – now",
        role: "Software Engineering Intern, Inqor AI (remote)",
        detail: "Subscription and billing systems with NestJS, PostgreSQL, Prisma and Razorpay.",
      },
      {
        period: "2025 – 26",
        role: "AI/ML Intern, Birlasoft (CKA Birla Group), Pune",
        detail: "RAG pipeline and frontend for an Oracle EBS support assistant.",
      },
      { period: "2024 – 28", role: "B.Tech, NIT Tiruchirappalli", detail: "" },
    ],
    otherTitle: "Other things I've built",
    other: [
      {
        name: "FlowForge",
        description:
          "business-request automation platform (AI classification, rule validation, routing, audit trail)",
        href: "https://github.com/Aarya-Sutar/flowforge",
      },
      {
        name: "DeckLens",
        description: "AI pitch-deck evaluation platform",
        href: "https://github.com/Aarya-Sutar/DeckLens",
      },
      {
        name: "Veritas",
        description: "document Q&A chatbot with source-backed answers",
        href: "https://github.com/Aarya-Sutar/veritas",
      },
      {
        name: "Razorpay integration demo",
        description: "",
        href: "https://razorpay-integration-demo.vercel.app",
      },
    ],
    links: [
      { label: "GitHub", href: GITHUB_URL },
      { label: "LinkedIn", href: LINKEDIN_URL },
    ],
    resumeLabel: "Résumé (PDF)",
  },

  faq: {
    title: "Questions",
    items: [
      {
        q: "Do I need to have my content and photos ready?",
        a: "It helps, but it isn't required. I'll tell you exactly what's needed, and I can work with what you have.",
      },
      {
        q: "Who owns the website?",
        // TODO(Aarya): confirm (brief U3).
        a: "You do: the domain, the content, and the code.",
      },
      {
        q: "Can you improve my existing website instead of starting over?",
        a: "Yes. I'll look at what you have and tell you honestly whether a fix or a rebuild makes more sense.",
      },
      {
        q: "Do you only work with businesses near you?",
        a: "No. I work remotely with businesses anywhere in India, and abroad.",
      },
      {
        q: "What do automations need from my side?",
        a: "Usually a Google account and access to the tools you already use. WhatsApp automation needs a verified WhatsApp Business setup, and I'll guide you through it.",
      },
      {
        q: "What happens after launch?",
        // TODO(Aarya): describe any ongoing support you offer (brief U6).
        a: "You'll know how to make simple updates yourself, and I'm a message away for anything bigger.",
      },
    ],
  },

  contactSection: {
    title: "Start a project",
    // TODO(Aarya): add a response-time promise only if you can keep it (brief U5).
    intro: "Tell me a little about your business and what you need. I'll reply with next steps.",
    list: [
      { label: "WhatsApp", value: PHONE_DISPLAY, href: WHATSAPP_URL, external: true },
      { label: "Call", value: PHONE_DISPLAY, href: `tel:${PHONE_E164}`, external: false },
      { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
      { label: "LinkedIn", value: "in/aaryasutar03", href: LINKEDIN_URL, external: true },
      { label: "GitHub", value: "Aarya-Sutar", href: GITHUB_URL, external: true },
    ],
  },

  form: {
    fields: {
      name: {
        label: "Name",
        errorRequired: "Enter your name.",
        errorLength: "Use 2 to 80 characters.",
      },
      business: { label: "Business name", optional: "Optional" },
      phone: {
        label: "Phone / WhatsApp",
        hint: "I'll reply on WhatsApp if you prefer.",
        errorRequired: "Enter a phone or WhatsApp number.",
        errorFormat: "Enter a 10-digit Indian number, or + and your country code.",
      },
      email: {
        label: "Email",
        optional: "Optional",
        errorFormat: "Enter a valid email address, or leave it blank.",
      },
      service: {
        legend: "What do you need?",
        errorRequired: "Choose one option.",
        options: [
          { value: "website", label: "Website" },
          { value: "automation", label: "Automation" },
          { value: "both", label: "Both" },
          { value: "not-sure", label: "Not sure yet" },
        ],
      },
      message: { label: "Tell me about it", optional: "Optional", max: 1500 },
    },
    submit: "Send enquiry",
    submitting: "Sending…",
    privacy: "Your details are only used to reply to your enquiry.",
    success: {
      heading: "Thanks, got it.",
      body: "I'll get back to you soon. Want a faster reply?",
      whatsapp: "Message me on WhatsApp",
    },
    error: {
      lead: "That didn't send. Please try again, or message me on",
      whatsapp: "WhatsApp",
      email: "email",
    },
    noscript:
      "This form needs JavaScript. You can reach me directly on WhatsApp or by email instead.",
    subject: (name: string, service: string) => `New enquiry from ${name} (${service})`,
    fromName: "aaryasutar.com",
  },

  footer: {
    copyright: (year: number) => `© ${year} Aarya Sutar`,
    anchorLinks: [
      { label: "Services", href: "/#services" },
      { label: "Work", href: "/#work" },
      { label: "Process", href: "/#process" },
      { label: "About", href: "/#about" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
    contactLinks: [
      { label: "WhatsApp", href: WHATSAPP_URL, external: true },
      { label: "Email", href: `mailto:${EMAIL}`, external: false },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "GitHub", href: GITHUB_URL, external: true },
    ],
    resumeLabel: "Résumé",
  },

  caseStudy: {
    back: "All work",
    backHref: "/#work",
    conceptTag: "Concept",
    meta: { type: "Type", stack: "Stack", year: "Year", links: "Links" },
    disclosureTitle: "About this project",
    videoLabel: "Screen recording of the Enquiry Autopilot prototype",
    briefTitle: "The brief",
    builtTitle: "What I built",
    decisionsTitle: "Decisions worth noting",
    stackTitle: "Stack",
    videoSummaryTitle: "What the recording shows",
    ctaTitle: "Want something like this for your business?",
    ctaButton: { label: "Start a project", href: "/#contact" },
    nextLabel: "Next project",
  },

  notFound: {
    title: "Page not found",
    link: "Back to the home page",
  },
} as const;
