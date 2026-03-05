/*
Solution page data — App Development
Bilingual (EN/AR): pages choose based on current lang.
*/

import type { Lang } from "@/contexts/I18nContext";
import type { SolutionTemplateData } from "@/components/solutions/SolutionTemplate";

export const appDevelopmentSolutionEn: SolutionTemplateData = {
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

export const appDevelopmentSolutionAr: SolutionTemplateData = {
  slug: "app-development",
  title: "تطوير تطبيقات — MVP وبورتال وسيستم داخلي",
  subtitle:
    "بنطلع منتج الفريق يستعمله فعلاً: MVP محدد، بورتال عملاء، وأدوات تشغيل داخلية—ومعاه قياس واضح مش تخمين.",

  whatItIs: {
    eyebrow: "تنفيذ DFY",
    body:
      "تنفيذ كامل من عندنا لمنتج أو سيستم تشغيل بسرعة وبحوكمة. بنثبت النطاق اللي هيتسلّم، نصمم تجربة استخدام تخلي العميل يثق، وبعدين نبني سيستم قابل للقياس والتطوير مع التكاملات اللي فريقك شغال بيها أصلاً.",
    bullets: [
      "تثبيت النطاق: إيه اللي هيتسلّم وإيه اللي لأ",
      "UX: مهمة واحدة أساسية في كل شاشة",
      "قياس: تفعيل/استخدام/تسرب",
      "تسليم وتمكين: توثيق وتسليم ملكية بدون اعتماد دائم",
    ],
  },

  whoItsFor: {
    title: "مناسب لمين؟",
    segments: [
      {
        title: "شركات خدمات محتاجة بورتال",
        body: "بدّل اللخبطة في الإيميلات ببورتال عملاء: طلبات، ستاتس، ملفات، ومدفوعات—الشغل يمشي من غير مطاردة.",
        examples: ["بورتال عملاء", "استلام الطلبات", "متابعة الحالة"],
      },
      {
        title: "فرق تشغيل فيها handoffs كتير",
        body: "أدوات داخلية تقلل التسليمات اليدوية: موافقات، Routing، داشبوردز، واستثناءات.",
        examples: ["موافقات", "Routing", "داشبورد"],
      },
      {
        title: "مؤسس بيطلع MVP",
        body: "منتج ينزل السوق بسرعة وتتعلم منه. بنسرّع feedback من غير ما نبني سيستم هش.",
        examples: ["MVP", "Tracking", "Iteration"],
      },
    ],
  },

  deliverables: {
    title: "هتستلم إيه؟",
    items: [
      "Product brief: أهداف، مستخدمين، قيود، ومؤشرات نجاح",
      "User journeys + Wireframes + مواصفات تفاعل",
      "UI system قابل للتوسع",
      "تطوير + تكاملات + صلاحيات",
      "Events + داشبوردز (نعرف المستخدم بيعمل إيه فعلاً)",
      "Checklist إطلاق + توثيق وتسليم",
    ],
  },

  timeline: {
    title: "المدة",
    items: [
      "أسبوع 1 — تثبيت النطاق + UX",
      "أسبوع 2 — UI system + Data model",
      "أسبوع 3 — تطوير + تكاملات",
      "أسبوع 4 — QA + إطلاق + تسليم",
    ],
    note: "لو الـflows والكونتنت جاهزين، مدة الـMVP ممكن تقل.",
  },

  integrations: {
    title: "التكاملات",
    note: "بنربط اللي يقلل حمل التشغيل: دفع، رسائل، حجز، CRM، وتقارير.",
    items: ["Stripe / Paymob", "واتساب", "إيميل/SMS", "Calendars", "CRM", "Analytics"],
  },

  faqs: {
    title: "أسئلة شائعة",
    items: [
      {
        q: "بتعملوا iOS/Android؟",
        a: "أيوه. هنرشح أسرع مسار يوصل لنتيجة بريميوم: Web app لو السرعة أهم، أو Mobile لو التوزيع وخصائص الجهاز أساسية.",
      },
      {
        q: "ينفع نشتغل على الـstack الحالي؟",
        a: "أيوه. بنفهم الـworkflow الأول، وبعدها نكمل على أدواتك أو نبدّل اللي عامل عنق زجاجة.",
      },
      {
        q: "إزاي نتجنب إننا نبني حاجة غلط؟",
        a: "بنثبت النطاق على نتيجة قابلة للقياس وبنركّب tracking. القرار بيتاخد بالأرقام (تفعيل/تحويل/تسرب) مش بالآراء.",
      },
    ],
  },

  seo: {
    title: "تطوير تطبيقات (MVP وبورتال وسيستم داخلي) | Adawaty",
    description:
      "تطوير تطبيقات DFY: MVP، بورتال عملاء، أدوات تشغيل داخلية، وتكاملات—مع قياس واضح للاستخدام.",
    type: "article",
  },

  serviceSchema: {
    areaServed: "Worldwide",
    serviceType: "تطوير تطبيقات",
  },
};

export function getAppDevelopmentSolution(lang: Lang): SolutionTemplateData {
  return lang === "ar" ? appDevelopmentSolutionAr : appDevelopmentSolutionEn;
}
