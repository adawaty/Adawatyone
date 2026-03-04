/*
Solution page data — App Development
Executive-facing, outcome-first copy.
*/

import type { SolutionTemplateData } from "@/components/solutions/SolutionTemplate";

export const appDevelopmentSolution: SolutionTemplateData = {
  slug: "app-development",
  title: "App Development — MVPs, Portals, Internal Tools",
  subtitle:
    "We ship software that teams adopt: scoped MVPs, client portals, and internal ops tools—instrumented for usage, not guesses.",

  whatItIs: {
    eyebrow: "DFY build",
    body:
      "A done-for-you product build designed for speed and governance. We scope what matters, design an interface your users trust, then build a measurable system with the integrations your team already relies on.",
    bullets: [
      "Scope lock: what ships (and what doesn’t)",
      "UX for one primary action per screen",
      "Tracking: activation, retention, and drop-offs",
      "Handover: docs + ownership so you’re not dependent",
    ],
  },

  whoItsFor: {
    title: "Who it’s for",
    segments: [
      {
        title: "Service businesses that need a portal",
        body: "Replace email threads with a client portal: requests, status, documents, and payments—so work moves without chasing.",
        examples: ["Client portal", "Request intake", "Status tracking"],
      },
      {
        title: "Ops-heavy teams",
        body: "Internal tools that reduce manual handoffs: approvals, routing, dashboards, and exception handling.",
        examples: ["Approvals", "Routing", "Dashboards"],
      },
      {
        title: "Founders launching an MVP",
        body: "A product you can sell and learn from—fast. We optimize for time-to-feedback without shipping fragile architecture.",
        examples: ["MVP", "Analytics events", "Iterate"],
      },
    ],
  },

  deliverables: {
    title: "Deliverables",
    items: [
      "Product brief: goals, users, constraints, success metrics",
      "User journeys + wireframes + interaction spec",
      "UI system (web-ready, scalable)",
      "Build + integrations + role-based access",
      "Analytics events + dashboards (what users actually do)",
      "Launch checklist + handover docs",
    ],
  },

  timeline: {
    title: "Timeline",
    items: [
      "Week 1 — Scope lock + UX flows",
      "Week 2 — UI system + data model",
      "Week 3 — Build + integrations",
      "Week 4 — QA, release, handover",
    ],
    note: "If you already have flows and content ready, MVP timelines compress.",
  },

  integrations: {
    title: "Integrations",
    note:
      "We integrate where it reduces operational load: payments, messaging, scheduling, CRM, and reporting.",
    items: [
      "Stripe / Paymob",
      "WhatsApp",
      "Email/SMS",
      "Calendars",
      "CRM",
      "Analytics",
    ],
  },

  faqs: {
    title: "FAQs",
    items: [
      {
        q: "Do you build iOS/Android apps?",
        a: "Yes. We’ll recommend the fastest path that still feels premium: web app for speed, or mobile builds when distribution and device features matter.",
      },
      {
        q: "Can you plug into our current stack?",
        a: "Yes. We map the workflow first, then integrate with your tools (or replace them if the tool is the bottleneck).",
      },
      {
        q: "How do you avoid building the wrong thing?",
        a: "We lock scope around a measurable outcome, then instrument usage. Decisions are tied to data (activation, conversion, drop-offs), not opinions.",
      },
    ],
  },

  seo: {
    title: "App Development (MVPs, Portals, Internal Tools) | Adawaty",
    description:
      "DFY app development for executive teams: MVP builds, client portals, internal ops tools, and integrations—shipped with measurable adoption.",
    type: "article",
  },

  serviceSchema: {
    areaServed: "Worldwide", 
    serviceType: "App Development",
  },
};
