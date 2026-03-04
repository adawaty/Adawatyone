/*
Solution page data — Lead Generation
Outcome-first, non-jargony, but SEO/LLM-aware.
*/

import type { SolutionTemplateData } from "@/components/solutions/SolutionTemplate";

export const leadGenerationSolution: SolutionTemplateData = {
  slug: "lead-generation",
  title: "Lead Generation — Targeted B2B Lists Under Your Brand",
  subtitle:
    "Get clean, outreach-ready leads: targeting, enrichment, verification, and exportsbuilt to match your ICP and sales workflow.",

  whatItIs: {
    eyebrow: "Data pipeline",
    body:
      "A done-for-you lead sourcing system similar in outcome to tools like Tomba/Kurationbut delivered under your brand and tuned to your exact filters, fields, and workflow.",
    bullets: [
      "ICP definition + targeting filters",
      "Company + decision-maker enrichment",
      "Email verification + quality scoring",
      "Exports ready for CRM and outreach tools",
    ],
  },

  whoItsFor: {
    title: "Who its for",
    segments: [
      {
        title: "Agencies selling high-ticket services",
        body:
          "Get a repeatable pipeline of qualified prospects instead of random lists. We tune fields to your offer and close process.",
        examples: ["B2B services", "Retainers", "Outbound"],
      },
      {
        title: "B2B founders and operators",
        body:
          "Focused lead lists that match your ICP so your outreach isnt wasted on bad-fit prospects.",
        examples: ["ICP", "Decision makers", "Qualified"],
      },
      {
        title: "Sales teams needing clean data",
        body:
          "Reduce bounce rates and improve deliverability with verified, enriched contact data.",
        examples: ["Verification", "Deliverability", "CRM"],
      },
    ],
  },

  deliverables: {
    title: "Deliverables",
    items: [
      "Targeting spec (ICP + filters)",
      "Enriched company fields + contact fields",
      "Verified emails (bounce-risk reduced)",
      "CSV export + CRM-ready formatting",
      "Optional: sequences copy outline + routing rules",
    ],
  },

  timeline: {
    title: "Timeline",
    items: [
      "Day 1  ICP + targeting spec",
      "Day 23  enrichment + verification",
      "Day 45  QA + export",
    ],
    note: "Large datasets can be phased by segment or geo.",
  },

  integrations: {
    title: "Integrations",
    note: "We export in the format your team uses  CRM first.",
    items: ["HubSpot", "Salesforce", "Pipedrive", "Apollo", "CSV"],
  },

  faqs: {
    title: "FAQs",
    items: [
      {
        q: "Is this a tool subscription?",
        a: "No. This is a DFY service: you receive validated exports and a repeatable targeting spec you can reuse.",
      },
      {
        q: "Can you match our exact ICP fields?",
        a: "Yes. We define the fields upfront (role, seniority, industry, geo, company size, and custom fields you need).",
      },
      {
        q: "Do you also run outreach?",
        a: "We can provide routing and sequence structure, but the core deliverable is clean lead data your team can execute with.",
      },
    ],
  },

  seo: {
    title: "Lead Generation (B2B Lists + Enrichment) | Adawaty",
    description:
      "Targeted B2B lead generation: enrichment, verification, and outreach-ready exports under your brand.",
    type: "article",
  },

  serviceSchema: {
    areaServed: "Worldwide",
    serviceType: "Lead Generation",
  },
};
