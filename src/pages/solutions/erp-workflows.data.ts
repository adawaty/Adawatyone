/*
Solution page data — ERP Workflows
Bilingual (EN/AR): pages choose based on current lang.
*/

import type { Lang } from "@/contexts/I18nContext";
import type { SolutionTemplateData } from "@/components/solutions/SolutionTemplate";

export const erpWorkflowsSolutionEn: SolutionTemplateData = {
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

export const erpWorkflowsSolutionAr: SolutionTemplateData = {
  slug: "erp-workflows",
  title: "Workflows حوالين الـERP — موافقات وRouting وSLA",
  subtitle:
    "حوّل الـERP من مجرد تخزين بيانات لسيستم تشغيل: موافقات، Routing، وWorkflows قابلة للتدقيق تقلل التأخير والتسريب.",

  whatItIs: {
    eyebrow: "تشغيل",
    body:
      "بنصمم وننفّذ طبقة workflows حوالين الـERP: قواعد، موافقات، تصعيدات، وتنبيهات تخلي العملية ماشية بنفس الطريقة كل مرة—من غير الاعتماد على شخص واحد يشيل الليلة.",
    bullets: [
      "استلام طلبات موحد + تحقق",
      "موافقات بصلاحيات Roles",
      "SLA timers + تصعيدات",
      "سجل تدقيق + تقارير",
    ],
  },

  whoItsFor: {
    title: "مناسب لمين؟",
    segments: [
      {
        title: "المالية والمشتريات",
        body: "سلاسل موافقات، طلبات شراء، موردين، وتحكم في الميزانية—واضح من أول الطلب لحد الدفع.",
        examples: ["PR/PO", "تفعيل موردين", "تحكم ميزانية"],
      },
      {
        title: "التشغيل واللوجستيات",
        body: "قواعد Routing، استثناءات، وتنفيذ بزمن محدد—عشان الشغل مايضيعش بين التسليمات.",
        examples: ["Routing", "استثناءات", "SLA"],
      },
      {
        title: "الإدارة",
        body: "داشبوردز لللي يهم: زمن الدورة، عنق الزجاجة، الالتزام، فين الوقت والفلوس بتتسرب.",
        examples: ["Cycle time", "Bottlenecks", "Compliance"],
      },
    ],
  },

  deliverables: {
    title: "هتستلم إيه؟",
    items: [
      "خريطة workflows: الوضع الحالي → الوضع المستهدف",
      "قواعد + صلاحيات + مصفوفة تصعيد",
      "خطة ربط بالـERP (API / DB / Middleware)",
      "تنفيذ workflows + تنبيهات",
      "داشبوردز: SLA، زمن الدورة، عنق الزجاجة",
      "سجل تدقيق + توثيق",
    ],
  },

  timeline: {
    title: "المدة",
    items: [
      "أسبوع 1 — Discovery + رسم العمليات",
      "أسبوع 2 — قواعد/صلاحيات + Prototype",
      "أسبوع 3 — تنفيذ + ربط ERP",
      "أسبوع 4 — Pilot + تدريب + خطة تعميم",
    ],
    note:
      "لو الـERP معقد أو في موافقات متعددة الكيانات، هنقسّم التنفيذ حسب الأهمية.",
  },

  integrations: {
    title: "التكاملات",
    note: "بنشتغل مع الـERP اللي عندك، مش ضده. نوع الربط حسب النظام والصلاحيات المتاحة.",
    items: ["SAP / Oracle / Odoo / Dynamics", "إيميل", "واتساب", "SSO", "Power BI", "Data warehouse"],
  },

  faqs: {
    title: "أسئلة شائعة",
    items: [
      {
        q: "ده هيبدّل الـERP؟",
        a: "لأ. ده بيخلي الـERP قابل للتنفيذ بإضافة طبقة workflow (استلام → موافقة → Routing → تقارير). الـERP يفضل مصدر البيانات الأساسي.",
      },
      {
        q: "لو الـERP APIs بتاعته محدودة؟",
        a: "هنختار أأمن طريقة ربط متاحة (API، Middleware، Export/Import، أو DB بشكل مقيد) ونوثّق الـtradeoffs.",
      },
      {
        q: "إزاي نضمن الالتزام؟",
        a: "صلاحيات Roles + سجل تدقيق + موافقات موحدة. والتقارير بتخلي أي خروج عن القاعدة ظاهر مش مخفي.",
      },
    ],
  },

  seo: {
    title: "Workflows حوالين الـERP (موافقات وRouting وSLA) | Adawaty",
    description:
      "تنفيذ workflows حوالين الـERP: موافقات، Routing، SLA، وسجل تدقيق—مبني على الـERP الحالي بتاعك.",
    type: "article",
  },

  serviceSchema: {
    areaServed: "Worldwide",
    serviceType: "ERP Workflows",
  },
};

export function getErpWorkflowsSolution(lang: Lang): SolutionTemplateData {
  return lang === "ar" ? erpWorkflowsSolutionAr : erpWorkflowsSolutionEn;
}
