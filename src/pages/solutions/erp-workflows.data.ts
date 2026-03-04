/*
Solution page data — ERP Workflows
Designed for process-heavy orgs: approvals, routing, SLAs, audit trails.
*/

import type { SolutionTemplateData } from "@/components/solutions/SolutionTemplate";

export const erpWorkflowsSolution: SolutionTemplateData = {
  slug: "erp-workflows",
  title: "ERP Workflows — Approvals, Routing, SLAs",
  subtitle:
    "Turn your ERP from a data store into an execution system: approvals, routing, and audit-ready workflows that reduce delays and leakage.",

  whatItIs: {
    eyebrow: "Ops enablement",
    body:
      "We design and implement workflow layers around your ERP: the rules, approvals, escalations, and notifications that make processes run the same way every time—without relying on individual heroics.",
    bullets: [
      "Standardized request intake + validation",
      "Approvals with role-based permissions",
      "SLA timers + escalations",
      "Audit trail + reporting",
    ],
  },

  whoItsFor: {
    title: "Who it’s for",
    segments: [
      {
        title: "Finance and procurement",
        body: "Approval chains, purchase requests, vendor onboarding, and budget control—visible from request to payment.",
        examples: ["PR/PO", "Vendor onboarding", "Budget checks"],
      },
      {
        title: "Operations and logistics",
        body: "Routing rules, exception handling, and time-bound execution—so you stop losing work in handoffs.",
        examples: ["Routing", "Exceptions", "SLA tracking"],
      },
      {
        title: "Leadership teams",
        body: "Dashboards for what matters: cycle time, bottlenecks, compliance, and where money/time is leaking.",
        examples: ["Cycle time", "Bottlenecks", "Compliance"],
      },
    ],
  },

  deliverables: {
    title: "Deliverables",
    items: [
      "Workflow map: current state → future state",
      "Rules + roles + escalation matrix",
      "ERP integration plan (API / DB / middleware)",
      "Workflow implementation + notifications",
      "Dashboards: SLA, cycle time, bottlenecks",
      "Audit trail + documentation",
    ],
  },

  timeline: {
    title: "Timeline",
    items: [
      "Week 1 — Discovery + process mapping",
      "Week 2 — Rules/roles + prototypes",
      "Week 3 — Build + ERP integration",
      "Week 4 — Pilot, training, rollout plan",
    ],
    note:
      "Complex ERPs or multi-entity approvals may extend timeline; we’ll phase by workflow criticality.",
  },

  integrations: {
    title: "Integrations",
    note:
      "We work around your ERP—not against it. Integrations depend on your system and access model.",
    items: [
      "SAP / Oracle / Odoo / Dynamics",
      "Email",
      "WhatsApp",
      "SSO",
      "Power BI",
      "Data warehouse",
    ],
  },

  faqs: {
    title: "FAQs",
    items: [
      {
        q: "Will this replace our ERP?",
        a: "No. This makes your ERP executable by adding a workflow layer (intake → approval → routing → reporting). Your ERP stays the system of record.",
      },
      {
        q: "What if the ERP has limited APIs?",
        a: "We’ll choose the safest integration path available (API, middleware, export/import, or constrained DB integration) and document the tradeoffs.",
      },
      {
        q: "How do you ensure compliance?",
        a: "We implement role-based permissions, audit trails, and standardized approvals. Reporting makes variance visible rather than hidden.",
      },
    ],
  },

  seo: {
    title: "ERP Workflows (Approvals, Routing, SLAs) | Adawaty",
    description:
      "ERP workflow implementation for process-heavy teams: approvals, routing, SLA tracking, and audit trails—built around your current ERP.",
    type: "article",
  },

  serviceSchema: {
    areaServed: "Worldwide", 
    serviceType: "ERP Workflows",
  },
};
