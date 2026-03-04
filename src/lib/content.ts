/*
Cairo Circuit Futurism — Content model (blended services)
- DFY branding + websites + solutions studio
- AI enablement across brand, content, and discoverability (LLM visibility)
*/

export const site = {
  name: "Adawaty",
  domain: "adawaty.net",
  url: "https://adawaty.net",
  locale: "en_US",
  brandTagline: "Brand → Build → Demand.",

  organization: {
    legalName: "Adawaty",
    areaServed: ["US", "SK", "Worldwide"],
    registeredAddress: {
      country: "United States",
      state: "Wyoming",
      city: "Sheridan",
      postalCode: "82801",
      streetAddress: "30 N Gould ST Suite R",
    },
    tradingAddress: {
      country: "Slovakia",
      city: "Bratislava",
      postalCode: "821 04",
      streetAddress: "Ivánska cesta 30/D, Aircraft Building",
    },
  },
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  pillar:
    | "Brand Intelligence"
    | "Brand System"
    | "DFY Website"
    | "Content Engine"
    | "AI Visibility"
    | "Concierge";
};

export type Industry = {
  id: string;
  title: string;
  summary: string;
  pains: string[];
  outcomes: string[];
  recommendedServices: string[]; // service ids
  seo: {
    title: string;
    description: string;
  };
};

export type Audience = {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
};

export type PersonaSuccessStory = {
  id: string;
  headline: string;
  context: string;
  results: { label: string; value: string }[]; // measurable outcomes
  whatWeDid: string[];
  timeframe: string;
};

export type PersonaPage = {
  id: string;
  slug: string; // used in /for/:slug
  title: string;
  summary: string;
  pains: string[];
  outcomes: string[];
  recommendedSolutions: string[]; // solution ids
  successStories: PersonaSuccessStory[];
  seo: {
    title: string;
    description: string;
  };
};

export type Solution = {
  id: string;
  slug: string; // used in /solutions/:slug
  title: string;
  summary: string;
  whoItsFor: string[];
  deliverables: string[];
  timeline: string[];
  integrations: string[];
  faqs: { q: string; a: string }[];
  seo: {
    title: string;
    description: string;
  };
};

export type ClientSector =
  | "Engineering"
  | "Healthcare"
  | "Food"
  | "Manufacturing"
  | "Distribution"
  | "Education"
  | "Hosting";

export type Client = {
  id: string;
  name: string;
  url: string;
  sector: ClientSector;
  industry: string; // short description
  note?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: "Branding" | "Web" | "AI Enablement" | "Launch" | "SEO";
  highlightMetric: string;
  summary: string;
  challenge: string;
  solution: string[];
  results: string[];
  tools: string[];
};

export const clients: Client[] = [
  {
    id: "meteory",
    name: "Meteory Fire Safety Solutions",
    url: "https://www.meteory-eg.com/",
    sector: "Manufacturing",
    industry: "Fire safety manufacturing",
  },
  {
    id: "sparx",
    name: "Sparx Engineering",
    url: "https://sparx-engineering.com/",
    sector: "Engineering",
    industry: "Fire protection engineering",
  },
  {
    id: "altawfeek",
    name: "AlTawfeek Engineering",
    url: "https://altawfeek-engineering.com/",
    sector: "Engineering",
    industry: "Fire protection engineering",
  },
  {
    id: "dnc",
    name: "Dr. Hanin Naiem / DNC Clinic",
    url: "https://www.drhaninaiem.com/",
    sector: "Healthcare",
    industry: "Healthcare (endocrinology)",
  },
  {
    id: "3a",
    name: "3A International",
    url: "https://3a-international.co/",
    sector: "Food",
    industry: "Food supply",
  },
  {
    id: "tawplast",
    name: "Tawplast",
    url: "http://tawplast.com/",
    sector: "Manufacturing",
    industry: "Plastic injection molding",
  },
  {
    id: "crownycup",
    name: "Crownycup",
    url: "http://crownycup.com/",
    sector: "Manufacturing",
    industry: "Food & beverage packaging",
  },
  {
    id: "el-etehad",
    name: "El Etehad for Shoes Industries",
    url: "http://el-etehad.com/",
    sector: "Manufacturing",
    industry: "PPE & industrial footwear",
  },
  {
    id: "egyspring",
    name: "EGYSPRING",
    url: "http://egyspring.com/",
    sector: "Manufacturing",
    industry: "Industrial manufacturing (springs)",
  },
  {
    id: "nextsupply",
    name: "Next Supply Trading & Distribution",
    url: "https://www.nextsupplytd.com/",
    sector: "Distribution",
    industry: "Coffee distribution",
  },
  {
    id: "hostocta",
    name: "Hostocta",
    url: "http://hostocta.com/",
    sector: "Hosting",
    industry: "Web hosting",
  },
  {
    id: "bello-food",
    name: "Bello Food",
    url: "https://www.bello-food.com/",
    sector: "Food",
    industry: "FMCG (olives & pickles)",
  },
  {
    id: "coursatee",
    name: "Coursatee Training Center",
    url: "https://www.coursatee.com/",
    sector: "Education",
    industry: "Education (exam prep)",
  },
];

export const services: Service[] = [
  {
    id: "brand-intelligence",
    title: "Brand Intelligence & Positioning",
    pillar: "Brand Intelligence",
    summary:
      "AI-assisted, human-led strategy that makes your narrative obvious and repeatable.",
    bullets: [
      "Positioning + value proposition (elite clarity)",
      "Ideal customer profile + segments",
      "Offer architecture (packages/retainers)",
      "Competitor narrative map + differentiation",
    ],
  },
  {
    id: "brand-system",
    title: "Brand System (Identity + Assets)",
    pillar: "Brand System",
    summary:
      "A cohesive visual system with templates and rules your team can actually maintain.",
    bullets: [
      "Logo/mark system (if needed)",
      "Typography + color + layout rules",
      "Social and document templates",
      "Brand guidelines for consistency",
    ],
  },
  {
    id: "dfy-website",
    title: "DFY Website Build (Premium + Fast)",
    pillar: "DFY Website",
    summary:
      "End-to-end website design and development with conversion instrumentation.",
    bullets: [
      "UX architecture and page structure",
      "Design system + responsive UI",
      "Performance + SEO foundations",
      "Analytics + conversion tracking",
    ],
  },
  {
    id: "content-engine",
    title: "Content Engine (AI + Human Review)",
    pillar: "Content Engine",
    summary:
      "On-brand content creation, scheduling, and analysis—built as a repeatable workflow.",
    bullets: [
      "Brand voice capture + prompt kits",
      "Reusable templates and content calendar",
      "Approval workflow for teams",
      "Performance review and iteration",
    ],
  },
  {
    id: "ai-visibility",
    title: "Search + AI Visibility (SEO/AEO/LLMSEO)",
    pillar: "AI Visibility",
    summary:
      "Help your brand appear in Google AND in AI assistants (ChatGPT, Perplexity, Google AI).",
    bullets: [
      "On-page SEO + technical cleanup",
      "AEO: conversational query coverage",
      "AI visibility audit + competitor benchmarks",
      "Tracking citations/mentions and improving them",
    ],
  },
  {
    id: "lead-generation",
    title: "Lead Generation (B2B Leads  Enrichment)",
    pillar: "AI Visibility",
    summary:
      "High-intent lead lists under your brand: targeting, enrichment, validation, and outreach-ready exports.",
    bullets: [
      "ICP + filters (industry, role, geo, tech)",
      "Data enrichment (company + decision makers)",
      "Email verification + deliverability checks",
      "Exports for CRM + outreach tools",
    ],
  },
  {
    id: "concierge",
    title: "Concierge Growth Partner",
    pillar: "Concierge",
    summary:
      "Ongoing VIP updates, iteration, and enablement—so you never stall after launch.",
    bullets: [
      "Priority website updates and experiments",
      "Monthly growth roadmap",
      "Content and SEO iteration cycles",
      "Enablement + documentation + governance",
    ],
  },
];

export const personas: PersonaPage[] = [
  {
    id: "lawyers",
    slug: "lawyers",
    title: "Websites for Lawyers (Authority + Consultations)",
    summary:
      "A premium, trust-first site with intake and booking—built to convert high-intent searches into consultation requests.",
    pains: [
      "You look the same as every other firm online",
      "Leads are low quality (wrong case types)",
      "People hesitate to call because trust isn’t earned fast",
      "Your content doesn’t rank for practice-area intent",
    ],
    outcomes: [
      "Clear practice areas + proof that reduces hesitation",
      "Consultation booking + intake that routes the right cases",
      "Local SEO + authority pages that earn visibility",
      "A system your team can update without breaking quality",
    ],
    recommendedSolutions: ["bio-pages", "scheduling-intake", "app-development"],
    successStories: [
      {
        id: "law-1",
        headline: "From generic firm site → consultation pipeline",
        context:
          "A mid-size practice needed better-quality inquiries and clearer routing by case type.",
        timeframe: "6 weeks",
        results: [
          { label: "Consultation requests", value: "+41%" },
          { label: "Wrong-case inquiries", value: "−28%" },
          { label: "Time to first response", value: "−52%" },
        ],
        whatWeDid: [
          "Practice-area architecture mapped to search intent",
          "Authority pages: attorney bios + case outcomes framework",
          "Intake forms with case-type routing rules",
          "Local SEO cleanup + FAQ coverage for high-intent queries",
        ],
      },
      {
        id: "law-2",
        headline: "High-trust bio hub for a lead attorney",
        context:
          "A senior lawyer wanted one premium page to convert referrals and media traffic.",
        timeframe: "5 days",
        results: [
          { label: "Booked calls from referrals", value: "+23%" },
          { label: "CTR from WhatsApp links", value: "+18%" },
          { label: "Drop-off on mobile", value: "−17%" },
        ],
        whatWeDid: [
          "Credibility stack (credentials, media, proofs) above the fold",
          "One primary CTA (book) + one secondary CTA (WhatsApp)",
          "Tracking (UTM + events) to measure conversion sources",
        ],
      },
    ],
    seo: {
      title: "Lawyer Website Design, Booking & SEO | Adawaty",
      description:
        "DFY lawyer websites that build authority and convert consultations—practice area pages, booking + intake, and SEO/AI visibility.",
    },
  },
  {
    id: "doctors",
    slug: "doctors",
    title: "Websites for Doctors & Clinics (Trust + Booking)",
    summary:
      "Patient-friendly service pages, reviews, and scheduling—designed to reduce no-shows and increase booked appointments.",
    pains: [
      "Patients don’t understand which service to choose",
      "Booking is manual and full of no-shows",
      "Your Google presence is weak vs competitors",
      "Your site feels outdated (hurts trust)",
    ],
    outcomes: [
      "Clear service pages + FAQs that answer patient questions",
      "Online booking + confirmations + reminders",
      "Locations + reviews + local search coverage",
      "Content that builds credibility in Google and AI answers",
    ],
    recommendedSolutions: ["scheduling-intake", "bio-pages", "erp-workflows"],
    successStories: [
      {
        id: "med-1",
        headline: "More booked appointments, fewer no-shows",
        context:
          "A clinic needed a patient-friendly experience plus a scheduling system that reduces friction.",
        timeframe: "8 weeks",
        results: [
          { label: "Booked appointments", value: "+34%" },
          { label: "No-show rate", value: "−21%" },
          { label: "Calls for basic questions", value: "−29%" },
        ],
        whatWeDid: [
          "Service pages + FAQs structured like patient decision paths",
          "Booking flow with buffers + confirmations + reminder sequence",
          "Local SEO: locations + reviews + clinic entities",
          "Analytics: booked → showed → converted",
        ],
      },
      {
        id: "med-2",
        headline: "Premium doctor bio page that builds instant trust",
        context:
          "A specialist wanted a single page to unify social, ads, and referrals.",
        timeframe: "4 days",
        results: [
          { label: "Time on page", value: "+27%" },
          { label: "Booking conversion", value: "+19%" },
          { label: "Bounce rate", value: "−14%" },
        ],
        whatWeDid: [
          "Above-the-fold trust stack (specialty, credentials, outcomes)",
          "FAQ block answering top patient concerns",
          "Fast mobile performance + clear next action",
        ],
      },
    ],
    seo: {
      title: "Clinic Website Design, Booking & Local SEO | Adawaty",
      description:
        "DFY clinic websites with scheduling + patient-friendly content. Improve trust, bookings, and visibility in Google + AI answers.",
    },
  },
  {
    id: "business-owners",
    slug: "business-owners",
    title: "Web + Systems for Business Owners (Demand + Workflows)",
    summary:
      "A premium front-end plus the internal workflows behind it: dashboards, approvals, pipelines, and ERP-lite systems.",
    pains: [
      "Marketing is fragmented and hard to measure",
      "Your team runs on WhatsApp and spreadsheets",
      "Ops break when you grow (handoffs and approvals)",
      "You need a system that matches your workflow—fast",
    ],
    outcomes: [
      "One narrative across sales, site, and pitch decks",
      "Tracking + reporting that shows what’s working",
      "Workflow-aware systems (ERP-lite) built around your process",
      "Automation + integrations that reduce manual work",
    ],
    recommendedSolutions: ["erp-workflows", "app-development", "scheduling-intake"],
    successStories: [
      {
        id: "biz-1",
        headline: "ERP-lite rollout that matches real workflows",
        context:
          "An SME running on spreadsheets needed approvals, pipelines, and reporting—without a heavy ERP suite.",
        timeframe: "10 weeks",
        results: [
          { label: "Manual handoffs", value: "−36%" },
          { label: "Weekly reporting time", value: "−48%" },
          { label: "On-time delivery", value: "+12%" },
        ],
        whatWeDid: [
          "Workflow mapping (as-is → to-be) with role-based rules",
          "Dashboards for pipelines + approvals + exceptions",
          "Automations + integrations to reduce duplicate entry",
        ],
      },
      {
        id: "biz-2",
        headline: "Client portal MVP that drives adoption",
        context:
          "A services company needed a portal for requests, status, and payments.",
        timeframe: "6 weeks",
        results: [
          { label: "Support tickets", value: "−22%" },
          { label: "Repeat purchase rate", value: "+16%" },
          { label: "Time to quote", value: "−31%" },
        ],
        whatWeDid: [
          "Simple information architecture (1 primary task per screen)",
          "Tracking events to see where users drop",
          "Iterated onboarding to improve activation",
        ],
      },
    ],
    seo: {
      title: "Brand, Website, ERP-lite Workflows & Growth Systems | Adawaty",
      description:
        "DFY brand + website + workflow systems for business owners. Build demand, streamline operations, and scale with clarity.",
    },
  },
];

export const solutions: Solution[] = [
  {
    id: "app-development",
    slug: "app-development",
    title: "App Development (Web + Mobile)",
    summary:
      "We design and build apps that feel premium—and actually get adopted. Client portals, internal tools, MVPs, and integrations.",
    whoItsFor: ["Business owners", "Service teams", "Operations-heavy companies"],
    deliverables: [
      "Product scope + user flows + wireframes",
      "UI system (web + mobile ready)",
      "Build (React web / mobile-ready architecture)",
      "Analytics + event tracking",
      "Launch checklist + handover",
    ],
    timeline: [
      "Week 1: scope + UX + prototype",
      "Week 2–3: build + integrations",
      "Week 4: QA + launch + handover",
    ],
    integrations: ["Payments", "WhatsApp", "Email/SMS", "CRM", "Calendars"],
    faqs: [
      {
        q: "Do you build iOS/Android apps?",
        a: "Yes—either as a web app (fast launch) or as a mobile build when distribution and device features matter. We recommend the fastest path that still feels premium.",
      },
      {
        q: "Can you connect it to our current tools?",
        a: "Yes. We map the workflow first, then integrate with the tools you already use (or replace them if needed).",
      },
    ],
    seo: {
      title: "App Development (Web + Mobile) | Adawaty",
      description:
        "DFY app development: UX, UI, build, integrations, and launch. Premium apps that users actually adopt.",
    },
  },
  {
    id: "bio-pages",
    slug: "bio-pages",
    title: "Bio Pages (Personal Brand Hub)",
    summary:
      "A single premium page that turns attention into trust: credibility stack, offers, links, lead capture, and booking.",
    whoItsFor: ["Lawyers", "Doctors", "Founders", "Executives"],
    deliverables: [
      "Bio hub page + sections (proof, offers, links)",
      "Lead capture (WhatsApp / email)",
      "Scheduling integration",
      "Pixel + UTM tracking",
      "Copy that sounds like you (not templates)",
    ],
    timeline: ["2–5 days: copy + design + build", "1 day: integrations + tracking + publish"],
    integrations: ["Calendly", "Google Calendar", "WhatsApp", "Mailchimp"],
    faqs: [
      {
        q: "Why not just use Linktree?",
        a: "A custom bio page is a brand asset: faster trust, better conversion, SEO indexation, tracking, and a premium feel that matches your positioning.",
      },
      {
        q: "Can it rank on Google?",
        a: "Yes. We structure it like an entity page (clear H1, sections, FAQ) and optimize for branded + expertise queries.",
      },
    ],
    seo: {
      title: "Bio Page Design (Personal Brand Hub) | Adawaty",
      description:
        "Premium bio pages that convert: credibility stack, lead capture, scheduling, and tracking—built for lawyers, doctors, founders.",
    },
  },
  {
    id: "scheduling-intake",
    slug: "scheduling-intake",
    title: "Scheduling + Intake (Booking that Works)",
    summary:
      "Booking, forms, routing, confirmations, and reminders—built as a system that reduces no-shows and filters bad leads.",
    whoItsFor: ["Clinics", "Law firms", "Service businesses"],
    deliverables: [
      "Booking flow + rules (availability, buffers)",
      "Intake forms (case type / service type)",
      "Confirmations + reminders",
      "Routing (right person, right pipeline)",
      "Tracking (booked → showed → converted)",
    ],
    timeline: ["3–7 days: design + setup", "1–2 days: testing + launch"],
    integrations: ["Calendly", "Google Calendar", "Email/SMS", "CRM"],
    faqs: [
      {
        q: "Can you reduce no-shows?",
        a: "Yes. We use reminder sequences, clear expectations, buffers, and fast rescheduling—plus better page clarity that reduces low-intent bookings.",
      },
    ],
    seo: {
      title: "Scheduling + Intake Systems | Adawaty",
      description:
        "DFY scheduling and intake: booking flows, forms, routing, reminders, and tracking—built for clinics and law firms.",
    },
  },
  {
    id: "erp-workflows",
    slug: "erp-workflows",
    title: "ERP-lite (Workflows Around Your Business)",
    summary:
      "A lightweight ERP that matches how you work: approvals, pipelines, dashboards, roles, and automations.",
    whoItsFor: ["Operations-heavy SMEs", "Manufacturing", "Distribution", "Agencies"],
    deliverables: [
      "Workflow mapping (what happens today)",
      "Process redesign (what should happen)",
      "System build (dashboards, roles, approvals)",
      "Automations + integrations",
      "Training + documentation",
    ],
    timeline: ["Week 1: workflow mapping", "Week 2–4: build and rollout", "Ongoing: iteration"],
    integrations: ["Email", "WhatsApp", "Accounting tools", "Inventory", "CRM"],
    faqs: [
      {
        q: "Do we need a full ERP suite?",
        a: "Often no. Most teams need 20% of ERP features that fit 80% of their workflow. We build the smallest system that works—and expand only when needed.",
      },
    ],
    seo: {
      title: "ERP-lite Workflow Systems (SME) | Adawaty",
      description:
        "Workflow-aware ERP-lite systems: dashboards, approvals, roles, pipelines, and automation—built around how your business runs.",
    },
  },
  {
    id: "lead-generation",
    slug: "lead-generation",
    title: "Lead Generation (B2B Lists + Enrichment)",
    summary:
      "Outbound-ready leads under your brand: targeting, enrichment, verification, and clean exports your team can use immediately.",
    whoItsFor: ["Agencies", "B2B services", "Sales teams"],
    deliverables: [
      "ICP + filters (industry, role, geo)",
      "Company + contact enrichment",
      "Email verification  quality checks",
      "CSV exports + CRM-ready fields",
    ],
    timeline: ["2–5 days: targeting + enrichment", "1–2 days: QA + export"],
    integrations: ["HubSpot", "Salesforce", "Apollo", "Email tools"],
    faqs: [
      {
        q: "Is this like Tomba or Kuration?",
        a: "Similar outcome (clean lead data), delivered under your brand and tuned to your ICP, fields, and outreach workflow.",
      },
    ],
    seo: {
      title: "Lead Generation (B2B Lists + Enrichment) | Adawaty",
      description:
        "B2B lead generation: targeting, enrichment, verification, and outreach-ready exports under your brand.",
    },
  },
  {
    id: "education-systems",
    slug: "education-systems",
    title: "Education Systems (LMS  SIS  QMS)",
    summary:
      "Learning platforms and operations systems: LMS, Student Information Systems, and quality workflowsbuilt for adoption and reporting.",
    whoItsFor: ["Training centers", "Schools", "Education operators"],
    deliverables: [
      "LMS: courses, content, assessments",
      "SIS: students, enrollment, attendance",
      "QMS: quality workflows, audits, reports",
      "Dashboards + exports",
    ],
    timeline: ["Week 1: workflows + requirements", "Week 2–4: build + integrations", "Week 5: pilot + rollout"],
    integrations: ["Email/SMS", "Payments", "Analytics", "Reporting"],
    faqs: [
      {
        q: "Can you integrate with our current tools?",
        a: "Yes. We map your workflow first, then integrate with the tools you already use (payments, messaging, reporting).",
      },
    ],
    seo: {
      title: "LMS, SIS  QMS Systems | Adawaty",
      description:
        "Education systems: LMS platforms, Student Information Systems, and Quality Management workflowsbuilt for operations and reporting.",
    },
  },
];

export const industries: Industry[] = [
  {
    id: "ecommerce",
    title: "E-commerce",
    summary: "Turn product discovery into trust and conversion—with brand clarity, CRO-ready UX, and AI-era visibility.",
    pains: [
      "Low conversion despite paid traffic",
      "Inconsistent brand across ads, landing pages, and product pages",
      "Thin content and weak category intent coverage",
      "Competitors dominating Google + AI answers for commercial queries",
    ],
    outcomes: [
      "Clear positioning and offer framing that increases intent-to-buy",
      "Conversion-first storefront UX and landing pages",
      "Content Engine for category, product education, and comparisons",
      "Search + AI Visibility improvements for high-intent queries",
    ],
    recommendedServices: ["brand-intelligence", "dfy-website", "content-engine", "ai-visibility"],
    seo: {
      title: "E-commerce Branding, CRO Websites & AI Visibility | Adawaty",
      description:
        "DFY brand + website + content systems for e-commerce teams. Improve conversion, category coverage, and visibility in Google and AI answers.",
    },
  },
  {
    id: "saas",
    title: "SaaS",
    summary: "Positioning and demand systems that turn complex products into obvious decisions—then scale via content and AI visibility.",
    pains: [
      "Unclear differentiation in a crowded category",
      "Messaging that sounds like every competitor",
      "Website doesn’t communicate value fast",
      "Content doesn’t rank or get cited in AI answers",
    ],
    outcomes: [
      "Category narrative + differentiation map",
      "Product-led landing pages that convert",
      "Content Engine for problem/solution, comparisons, and use-cases",
      "AI Visibility Audit + AEO upgrades for AI Overviews and assistants",
    ],
    recommendedServices: ["brand-intelligence", "dfy-website", "content-engine", "ai-visibility"],
    seo: {
      title: "SaaS Positioning, Websites & LLM SEO (AEO) | Adawaty",
      description:
        "DFY positioning, premium web, and content systems for SaaS teams—built to win Google search, AI Overviews, and LLM answers.",
    },
  },
  {
    id: "real-estate",
    title: "Real Estate",
    summary: "A premium presence for developers, brokers, and agencies—optimized for trust, lead quality, and local + AI discovery.",
    pains: [
      "Leads are low quality and price-driven",
      "Website feels generic and doesn’t build confidence",
      "Listings aren’t supported by authority content",
      "Local and AI discovery is inconsistent",
    ],
    outcomes: [
      "Trust-first brand system and templates",
      "High-performance website for projects and lead capture",
      "Content Engine for neighborhoods, guides, and comparisons",
      "Search + AI Visibility plan for local + informational intent",
    ],
    recommendedServices: ["brand-system", "dfy-website", "content-engine", "ai-visibility"],
    seo: {
      title: "Real Estate Branding, Websites & AI Search Visibility | Adawaty",
      description:
        "DFY brand + premium web + content systems for real estate teams—built for trust, leads, and visibility in Google and AI answers.",
    },
  },
];

export const audiences: Audience[] = [
  {
    id: "personal",
    title: "Personal Branding",
    summary: "Founders, executives, and creators who need a premium presence.",
    outcomes: [
      "A signature narrative people repeat",
      "A website that builds trust fast",
      "An AI-assisted content engine that still feels human",
      "Discoverability in search and AI assistants",
    ],
  },
  {
    id: "smb",
    title: "SMBs",
    summary: "Teams that need DFY brand + web + demand systems to compete.",
    outcomes: [
      "Cohesive brand across channels",
      "Conversion-ready website and landing pages",
      "Repeatable content workflow",
      "Search + AI visibility improvements",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprises",
    summary: "Organizations that need scalable systems with governance.",
    outcomes: [
      "Scalable brand systems across teams",
      "High-performance web experiences",
      "AI enablement with guardrails",
      "Documentation and ownership transfer",
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "personal-brand-rebuild",
    title: "Personal Brand Website Rebuild",
    category: "Web",
    highlightMetric: "+2× inbound leads",
    summary:
      "Repositioned a founder and shipped a premium site with a repeatable content system.",
    challenge:
      "The client had credibility but no clear narrative, and their website failed to convert visitors into conversations.",
    solution: [
      "Defined positioning and messaging pillars",
      "Designed a premium visual system and layout",
      "Built a fast site with clear CTAs and analytics",
    ],
    results: [
      "Inbound inquiries doubled within the first month",
      "Clearer audience fit and stronger referrals",
      "Content workflow established for weekly publishing",
    ],
    tools: ["Brand positioning", "Web build", "Content system"],
  },
  {
    slug: "smb-turnkey-launch",
    title: "SMB Turnkey Launch",
    category: "Launch",
    highlightMetric: "Launch in 21 days",
    summary:
      "Delivered strategy, identity, website, and launch kit in one DFY program.",
    challenge:
      "A growing SMB needed a rebrand and web presence quickly, with minimal internal bandwidth.",
    solution: [
      "Packaged DFY scope into 2-week sprints",
      "Created identity + website + templates",
      "Delivered a launch plan and rollout support",
    ],
    results: [
      "Launch shipped in 21 days",
      "Sales team received consistent assets",
      "Brand consistency improved across channels",
    ],
    tools: ["Identity system", "Website", "Launch kit"],
  },
  {
    slug: "ai-visibility-foundations",
    title: "AI Visibility Foundations",
    category: "SEO",
    highlightMetric: "Visibility lift in 4 weeks",
    summary:
      "Improved on-page SEO and AI visibility signals so the brand appears more often in AI answers.",
    challenge:
      "The brand had content but lacked structured signals, entity clarity, and query coverage for AI search.",
    solution: [
      "Ran an AI visibility audit and competitor benchmark",
      "Optimized priority pages for query coverage and clarity",
      "Tracked mentions/citations and iterated weekly",
    ],
    results: [
      "Improved discoverability across priority queries",
      "Better alignment between pages, metadata, and intent",
      "Ongoing tracking established for continuous improvement",
    ],
    tools: ["SEO/AEO", "AI visibility audits", "Tracking"],
  },
  {
    slug: "multi-sector-brand-build-demand",
    title: "Multi‑Sector Brand → Build → Demand Rollout (Composite)",
    category: "AI Enablement",
    highlightMetric: "Composite case study",
    summary:
      "A representative DFY rollout designed for Egyptian industrial and consumer brands: clarity, premium web, content workflows, and AI-era discoverability.",
    challenge:
      "Across sectors (manufacturing, engineering, FMCG, hosting, education, and healthcare), the pattern is similar: unclear positioning, generic websites, scattered content, and weak visibility in both Google and AI answers.",
    solution: [
      "Brand Intelligence sprint: positioning, ICP, offer architecture",
      "Brand System: templates + governance for consistent execution",
      "DFY Website rebuild: conversion-first IA, performance, and tracking",
      "Content Engine: FAQs, comparisons, and use-case pages aligned to buyer intent",
      "AI Visibility: AEO + entity clarity upgrades and a measurement plan",
    ],
    results: [
      "Defined the KPI map (rankings, AI citations/mentions, conversion events)",
      "Created a prioritized page plan for services, industries, and trust signals",
      "Delivered repeatable content briefs for cite-worthy answers",
    ],
    tools: [
      "Brand positioning",
      "Design system",
      "Programmatic SEO",
      "AEO/LLMSEO",
      "Analytics instrumentation",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
