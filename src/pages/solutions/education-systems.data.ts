/*
Solution page data — Education Systems (LMS / SIS / QMS)
Bilingual (EN/AR): pages choose based on current lang.
*/

import type { Lang } from "@/contexts/I18nContext";
import type { SolutionTemplateData } from "@/components/solutions/SolutionTemplate";

export const educationSystemsSolutionEn: SolutionTemplateData = {
  slug: "education-systems",
  title: "Education Systems — LMS  SIS  QMS",
  subtitle:
    "Build the operational backbone of your education business: learning delivery, student operations, and quality workflows— with reporting your team trusts.",

  whatItIs: {
    eyebrow: "Ops platform",
    body:
      "A done-for-you build for education operators: a Learning Management System (LMS), Student Information System (SIS), and Quality Management System (QMS) workflows—designed for adoption, governance, and reporting.",
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
          "Centralize students, courses, certificates, and operations—so delivery scales without chaos.",
        examples: ["Cohorts", "Certificates", "Reporting"],
      },
      {
        title: "Schools and education businesses",
        body:
          "Reliable student records, attendance, and role-based access—with clean workflows.",
        examples: ["SIS", "Attendance", "RBAC"],
      },
      {
        title: "Quality-driven orgs",
        body:
          "Audit trails, evidence, approvals, and reports—so quality systems are actually used, not ignored.",
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
      "DFY education systems: LMS platforms, Student Information Systems, and quality workflows (QMS)—built for operations and reporting.",
    type: "article",
  },

  serviceSchema: {
    areaServed: "Worldwide",
    serviceType: "Education Systems",
  },
};

export const educationSystemsSolutionAr: SolutionTemplateData = {
  slug: "education-systems",
  title: "أنظمة تعليم — LMS / SIS / QMS",
  subtitle:
    "ابني عمود التشغيل بتاع منظومتك التعليمية: تعليم، إدارة طلبة، وجودة—مع تقارير فريقك يثق فيها.",

  whatItIs: {
    eyebrow: "منصة تشغيل",
    body:
      "تنفيذ DFY لمنظومة تعليم: نظام إدارة تعلم (LMS)، نظام معلومات طلبة (SIS)، وWorkflows جودة (QMS)—متصممة للاستخدام الحقيقي، الحوكمة، والتقارير.",
    bullets: [
      "LMS: كورسات، محتوى، اختبارات، شهادات",
      "SIS: تسجيل، حضور، مجموعات، ملفات طلبة",
      "QMS: تدقيقات، مخالفات، CAPA، حفظ أدلة",
      "داشبوردز + Exports للإدارة",
    ],
  },

  whoItsFor: {
    title: "مناسب لمين؟",
    segments: [
      {
        title: "مراكز تدريب",
        body: "لمّ الطلبة والكورسات والشهادات والتشغيل في مكان واحد—التسليم يكبر من غير فوضى.",
        examples: ["Cohorts", "شهادات", "تقارير"],
      },
      {
        title: "مدارس ومشغّلين تعليم",
        body: "ملفات طلبة وحضور وصلاحيات واضحة—مع Workflows نظيفة.",
        examples: ["SIS", "حضور", "صلاحيات"],
      },
      {
        title: "شركات بتشتغل بالجودة",
        body: "سجل تدقيق وأدلة وموافقات وتقارير—عشان نظام الجودة يتستخدم بجد مش يبقى ورق.",
        examples: ["QMS", "تدقيق", "CAPA"],
      },
    ],
  },

  deliverables: {
    title: "هتستلم إيه؟",
    items: [
      "خريطة تشغيل (as-is → to-be)",
      "Data model (طلبة، كورسات، سجلات، أدلة)",
      "UI system + صلاحيات",
      "داشبوردز + Exports",
      "Pilot + تدريب + توثيق وتسليم",
    ],
  },

  timeline: {
    title: "المدة",
    items: [
      "أسبوع 1 — فهم وتشغيل + رسم العمليات",
      "أسبوع 2 — Prototype + Data model",
      "أسبوع 3–4 — تنفيذ + تكاملات",
      "أسبوع 5 — Pilot + تدريب + تعميم",
    ],
    note: "ممكن نقسّمها Modules: نبدأ بـLMS وبعدين SIS وبعدها QMS.",
  },

  integrations: {
    title: "التكاملات",
    note: "بنربط اللي يقلل شغل الإدارة.",
    items: ["مدفوعات", "إيميل/SMS", "واتساب", "Analytics", "تقارير"],
  },

  faqs: {
    title: "أسئلة شائعة",
    items: [
      {
        q: "لازم الثلاثة (LMS/SIS/QMS)؟",
        a: "مش لازم. هنرشح أصغر سيستم يحل عنق الزجاجة. أغلب الفرق بتبدأ بـLMS وتقارير وبعدها تضيف SIS/QMS.",
      },
      {
        q: "ينفع ننقل الداتا القديمة؟",
        a: "أيوه. بنحدد المصادر وبننقل على مراحل مع تحقق (طلبة، كورسات، حضور، شهادات… إلخ).",
      },
      {
        q: "الإدارة هتستخدمه ولا هيتساب؟",
        a: "ده هدفنا: Workflows على واقعك (موافقات/استثناءات/صلاحيات) وتقارير واضحة.",
      },
    ],
  },

  seo: {
    title: "أنظمة تعليم (LMS/SIS/QMS) | Adawaty",
    description:
      "أنظمة تعليم DFY: LMS، نظام معلومات طلبة (SIS)، وWorkflows جودة (QMS)—تشغيل وتقارير بشكل عملي.",
    type: "article",
  },

  serviceSchema: {
    areaServed: "Worldwide",
    serviceType: "أنظمة تعليم",
  },
};

export function getEducationSystemsSolution(lang: Lang): SolutionTemplateData {
  return lang === "ar" ? educationSystemsSolutionAr : educationSystemsSolutionEn;
}
