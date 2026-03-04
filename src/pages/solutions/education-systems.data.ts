/*
Solution page data — Education Systems
LMS / SIS / QMS
*/

import type { SolutionTemplateData } from "@/components/solutions/SolutionTemplate";

export const educationSystemsSolution: SolutionTemplateData = {
  slug: "education-systems",
  title: "Education Systems — LMS  SIS  QMS",
  subtitle:
    "Build the operational backbone of your education business: learning delivery, student operations, and quality workflowswith reporting your team trusts.",

  whatItIs: {
    eyebrow: "Ops platform",
    body:
      "A done-for-you build for education operators: a Learning Management System (LMS), Student Information System (SIS), and Quality Management System (QMS) workflowsdesigned for adoption, governance, and reporting.",
    bullets: [
      "LMS: courses, content, quizzes, certificates",
      "SIS: enrollment, attendance, cohorts, student records",
      "QMS: audits, nonconformance, CAPA, evidence storage",
      "Dashboards + exports for management",
    ],
  },

  whoItsFor: {
    title: "Who its for",
    segments: [
      {
        title: "Training centers",
        body:
          "Centralize students, courses, certificates, and operationsso delivery scales without chaos.",
        examples: ["Cohorts", "Certificates", "Reporting"],
      },
      {
        title: "Schools and education businesses",
        body:
          "Reliable student records, attendance, and role-based accesswith clean workflows.",
        examples: ["SIS", "Attendance", "RBAC"],
      },
      {
        title: "Quality-driven orgs",
        body:
          "Audit trails, evidence, approvals, and reportsso quality systems are actually used, not ignored.",
        examples: ["QMS", "Audits", "CAPA"],
      },
    ],
  },

  deliverables: {
    title: "Deliverables",
    items: [
      "Workflow map (as-is → to-be)",
      "Data model (students, courses, records, evidence)",
      "UI system + role-based access",
      "Dashboards + exports",
      "Pilot rollout + training + documentation",
    ],
  },

  timeline: {
    title: "Timeline",
    items: [
      "Week 1 — discovery + workflow mapping",
      "Week 2 — prototypes + data model",
      "Week 3–4 — build + integrations",
      "Week 5 — pilot + training + rollout",
    ],
    note: "We can phase by module: start LMS, then SIS, then QMS.",
  },

  integrations: {
    title: "Integrations",
    note: "We integrate where it reduces admin load.",
    items: ["Payments", "Email/SMS", "WhatsApp", "Analytics", "Reporting"],
  },

  faqs: {
    title: "FAQs",
    items: [
      {
        q: "Do we need all three modules (LMS/SIS/QMS)?",
        a: "No. Well recommend the smallest system that solves your bottlenecks. Most teams start with LMS and reporting, then add SIS/QMS workflows.",
      },
      {
        q: "Can you migrate our existing data?",
        a: "Yes. We define data sources and migrate in phases with validation (students, courses, attendance, certificates, etc.).",
      },
      {
        q: "Will admins actually use it?",
        a: "Thats the point: we design workflows around your reality (approvals, exceptions, roles) and make reporting obvious.",
      },
    ],
  },

  seo: {
    title: "Education Systems (LMS, SIS  QMS) | Adawaty",
    description:
      "DFY education systems: LMS platforms, Student Information Systems, and quality workflows (QMS)built for operations and reporting.",
    type: "article",
  },

  serviceSchema: {
    areaServed: "Worldwide",
    serviceType: "Education Systems",
  },
};
