/*
Adawaty — localized content helpers
- Keeps canonical IDs/URLs stable
- Provides per-language text for services/industries/personas/solutions/audiences/case studies
*/

import {
  type Lang,
} from "@/contexts/I18nContext";

import {
  services as servicesEn,
  industries as industriesEn,
  personas as personasEn,
  solutions as solutionsEn,
  audiences as audiencesEn,
  caseStudies as caseStudiesEn,
  type Service,
  type Industry,
  type PersonaPage,
  type Solution,
  type Audience,
  type CaseStudy,
} from "@/lib/content";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

function merge<T extends Record<string, any>>(base: T, patch?: DeepPartial<T>): T {
  if (!patch) return base;
  const out: any = Array.isArray(base) ? [...base] : { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) out[k] = v;
    else if (v && typeof v === "object" && base[k] && typeof base[k] === "object") out[k] = merge(base[k], v as any);
    else out[k] = v;
  }
  return out;
}

const patches: Record<Exclude<Lang, "en">, {
  services: Record<string, DeepPartial<Service>>;
  industries: Record<string, DeepPartial<Industry>>;
  personas: Record<string, DeepPartial<PersonaPage>>;
  solutions: Record<string, DeepPartial<Solution>>;
  audiences: Record<string, DeepPartial<Audience>>;
  caseStudies: Record<string, DeepPartial<CaseStudy>>;
}> = {
  fr: {
    services: {
      "brand-intelligence": {
        title: "Intelligence de marque \u0026 Positionnement",
        summary: "Stratégie assistée par IA, menée par l’humain — un récit évident et mémorisable.",
        bullets: [
          "Positionnement + proposition de valeur (clarté)",
          "ICP + segments",
          "Architecture d’offre (packs/retainers)",
          "Carte narrative concurrents + différenciation",
        ],
      },
      "brand-system": {
        title: "Système de marque (Identité + Assets)",
        summary: "Un système visuel cohérent, avec des templates et des règles faciles à maintenir.",
        bullets: [
          "Logo/marque (si nécessaire)",
          "Typo + couleurs + règles de mise en page",
          "Templates social et documents",
          "Guide de marque (cohérence)",
        ],
      },
      "dfy-website": {
        title: "Site DFY (Premium + Rapide)",
        summary: "Design et développement end-to-end avec instrumentation de conversion.",
        bullets: ["Architecture UX", "Design system responsive", "Performance + SEO", "Analytics + tracking"],
      },
      "content-engine": {
        title: "Content Engine (IA + Relecture)",
        summary: "Création de contenu, planification et analyse — en workflow répétable.",
        bullets: ["Capture de voix + prompt kits", "Templates + calendrier éditorial", "Workflow d’approbation", "Itération basée sur performance"],
      },
      "ai-visibility": {
        title: "Visibilité Recherche + IA (SEO/AEO/LLMSEO)",
        summary: "Apparaître dans Google ET dans les assistants IA.",
        bullets: ["SEO on-page + technique", "AEO: requêtes conversationnelles", "Audit visibilité IA + benchmarks", "Suivi citations/mentions"],
      },
      concierge: {
        title: "Partenaire Concierge (Croissance)",
        summary: "Mises à jour VIP continues — pour ne jamais stagner après le lancement.",
        bullets: ["Updates prioritaires + tests", "Roadmap mensuelle", "Itérations contenu + SEO", "Gouvernance + documentation"],
      },
    },
    industries: {
      ecommerce: {
        title: "E-commerce",
        summary: "Transformer la découverte en confiance et conversion — UX CRO-ready et visibilité à l’ère IA.",
      },
      saas: {
        title: "SaaS",
        summary: "Positionnement et demande qui rendent un produit complexe évident — puis scale via contenu + visibilité IA.",
      },
      "real-estate": {
        title: "Immobilier",
        summary: "Systèmes DFY pour confiance, leads et visibilité locale + IA.",
      },
    },
    personas: {
      lawyers: {
        title: "Sites pour Avocats (Autorité + Consultations)",
        summary: "Site premium orienté confiance avec intake + réservation — conçu pour convertir la recherche en demandes.",
      },
      doctors: {
        title: "Sites pour Médecins \u0026 Cliniques (Confiance + RDV)",
        summary: "Pages patient-friendly, avis et planning — pour augmenter les RDV et réduire les no-shows.",
      },
      "business-owners": {
        title: "Web + Systèmes pour Dirigeants (Demande + Workflows)",
        summary: "Un front premium + workflows internes: dashboards, approvals, pipelines, ERP-lite.",
      },
    },
    solutions: {
      "app-development": { title: "Développement d’apps (Web + Mobile)" },
      "bio-pages": { title: "Bio Pages (Hub de marque personnelle)" },
      "scheduling-intake": { title: "Planning + Intake (Réservation qui marche)" },
      "erp-workflows": { title: "ERP-lite (Workflows autour de votre business)" },
    },
    audiences: {
      personal: { title: "Marque personnelle", summary: "Fondateurs, dirigeants et créateurs qui veulent une présence premium." },
      smb: { title: "PME", summary: "Des équipes qui ont besoin d’un système DFY brand + web + demande." },
      enterprise: { title: "Grandes entreprises", summary: "Des systèmes scalables avec gouvernance et transfert de ownership." },
    },
    caseStudies: {
      "personal-brand-rebuild": { title: "Refonte de site de marque personnelle", highlightMetric: "+2× leads entrants" },
      "smb-turnkey-launch": { title: "Lancement DFY pour PME", highlightMetric: "Lancement en 21 jours" },
      "ai-visibility-foundations": { title: "Fondations de visibilité IA", highlightMetric: "Hausse en 4 semaines" },
    },
  },
  es: {
    services: {
      "brand-intelligence": {
        title: "Inteligencia de Marca \u0026 Posicionamiento",
        summary: "Estrategia asistida por IA, liderada por humanos — narrativa clara y repetible.",
      },
      "brand-system": { title: "Sistema de Marca (Identidad + Assets)" },
      "dfy-website": { title: "Web DFY (Premium + Rápida)" },
      "content-engine": { title: "Content Engine (IA + Revisión)" },
      "ai-visibility": { title: "Visibilidad en Búsqueda + IA (SEO/AEO/LLMSEO)" },
      concierge: { title: "Partner Concierge" },
    },
    industries: {
      ecommerce: { title: "E-commerce" },
      saas: { title: "SaaS" },
      "real-estate": { title: "Bienes Raíces" },
    },
    personas: {
      lawyers: { title: "Webs para Abogados (Autoridad + Consultas)" },
      doctors: { title: "Webs para Médicos \u0026 Clínicas (Confianza + Citas)" },
      "business-owners": { title: "Web + Sistemas para Empresarios (Demanda + Workflows)" },
    },
    solutions: {
      "app-development": { title: "Desarrollo de Apps (Web + Móvil)" },
      "bio-pages": { title: "Bio Pages (Hub de Marca Personal)" },
      "scheduling-intake": { title: "Agenda + Intake (Reservas que funcionan)" },
      "erp-workflows": { title: "ERP-lite (Workflows a tu medida)" },
    },
    audiences: {
      personal: { title: "Marca personal" },
      smb: { title: "PyMEs" },
      enterprise: { title: "Empresas" },
    },
    caseStudies: {
      "personal-brand-rebuild": { title: "Rebuild de web de marca personal" },
      "smb-turnkey-launch": { title: "Lanzamiento turnkey para PyME" },
      "ai-visibility-foundations": { title: "Fundamentos de visibilidad IA" },
    },
  },
  de: {
    services: {
      "brand-intelligence": { title: "Brand Intelligence \u0026 Positionierung" },
      "brand-system": { title: "Brand System (Identität + Assets)" },
      "dfy-website": { title: "DFY Website (Premium + Schnell)" },
      "content-engine": { title: "Content Engine (KI + Review)" },
      "ai-visibility": { title: "Search + KI-Sichtbarkeit (SEO/AEO/LLMSEO)" },
      concierge: { title: "Concierge Partner" },
    },
    industries: {
      ecommerce: { title: "E-Commerce" },
      saas: { title: "SaaS" },
      "real-estate": { title: "Immobilien" },
    },
    personas: {
      lawyers: { title: "Websites für Anwälte (Autorität + Erstgespräch)" },
      doctors: { title: "Websites für Ärzte \u0026 Kliniken (Vertrauen + Termine)" },
      "business-owners": { title: "Web + Systeme für Unternehmer (Nachfrage + Workflows)" },
    },
    solutions: {
      "app-development": { title: "App-Entwicklung (Web + Mobile)" },
      "bio-pages": { title: "Bio-Seiten (Personal Brand Hub)" },
      "scheduling-intake": { title: "Scheduling + Intake" },
      "erp-workflows": { title: "ERP-lite (Workflows für Ihr Business)" },
    },
    audiences: {
      personal: { title: "Personal Branding" },
      smb: { title: "KMU" },
      enterprise: { title: "Enterprises" },
    },
    caseStudies: {
      "personal-brand-rebuild": { title: "Personal-Brand Website Rebuild" },
      "smb-turnkey-launch": { title: "KMU Turnkey Launch" },
      "ai-visibility-foundations": { title: "KI-Sichtbarkeit: Foundations" },
    },
  },
  ar: {
    services: {
      "brand-intelligence": {
        title: "ذكاء البراند والتمركز",
        summary: "استراتيجية بمساعدة الذكاء الاصطناعي بس قيادة بشرية — قصة واضحة وسهلة تتكرر.",
        bullets: [
          "تمركز + عرض قيمة (وضوح عالي)",
          "تحديد عميلك المثالي + تقسيمات",
          "بناء الباكدجات/الريتينر",
          "خريطة منافسين + فرق واضح",
        ],
      },
      "brand-system": {
        title: "نظام البراند (هوية + أصول)",
        summary: "هوية متماسكة مع قواعد وقوالب تقدر تحافظ عليها من غير وجع دماغ.",
        bullets: [
          "لوغو/مارك (لو محتاج)",
          "خطوط + ألوان + قواعد تخطيط",
          "قوالب سوشيال وملفات",
          "دليل البراند للاتساق",
        ],
      },
      "dfy-website": {
        title: "موقع تنفيذ كامل (بريميوم + سريع)",
        summary: "ديزاين + تطوير من أولها لآخرها مع قياس وتحسين التحويل.",
        bullets: ["هيكلة تجربة الاستخدام", "واجهة المستخدم نظام ريسبونسف", "سرعة + تهيئة محركات البحث", "تحليلات + تتبّع"],
      },
      "content-engine": {
        title: "محرك محتوى (الذكاء الاصطناعي + مراجعة)",
        summary: "كونتنت على البراند + تخطيط وجدولة — كـ سير عمل يتكرر.",
        bullets: ["ضبط نبرة البراند + حِزم برومبت", "قوالب + تقويم محتوى", "مراجعة/اعتماد", "تحسين بناءً على الأداء"],
      },
      "ai-visibility": {
        title: "ظهور في البحث + الذكاء الاصطناعي (تهيئة محركات البحث + الظهور في إجابات الذكاء الاصطناعي)",
        summary: "تطلع في جوجل وكمان في أنظمة المساعدة بالذكاء.",
        bullets: ["تهيئة محركات البحث داخل الصفحة + تكنيكال", "تهيئة للإجابات: أسئلة بصياغة بشرية", "مراجعة + مقارنة منافسين", "متابعة الإشارات والاستشهادات"],
      },
      "lead-generation": {
        title: "ليدز بي تو بي (تارجتينج + إثراء بيانات)",
        summary: "قوائم ليدز عالية النية تحت براندك: تارجتينج، إثراء بيانات، تحقق من الإيميلات، وتسليمات جاهزة للأوتريتش.",
        bullets: ["العميل المثالي + فلترة (صناعة/وظيفة/دولة)", "إثراء بيانات (شركة + أصحاب قرار)", "تحقق من الإيميلات + قابلية وصول الإيميل", "تصدير للـإدارة علاقات العملاء وأدوات الأوتريتش"],
      },
      concierge: {
        title: "شريك كونسيرج (متابعة كبار العملاء)",
        summary: "متابعة كبار العملاء بعد الإطلاق: تحديثات وتجارب وتحسين مستمر.",
        bullets: ["تحديثات وتجارب سريعة", "خارطة طريق شهري", "دورات تحسين تهيئة محركات البحث/كونتنت", "توثيق وحوكمة"],
      },
    },
    industries: {
      ecommerce: {
        title: "التجارة الإلكترونية",
        summary: "حوّل الترافيك لمبيعات: تجربة شراء أسرع، صفحات تحويل، ومحتوى يرد على أسئلة العميل — مع ظهور قوي في عصر الذكاء الاصطناعي.",
      },
      saas: {
        title: "برمجيات كخدمة (برمجيات كخدمة)",
        summary: "حوّل منتج برمجيات كخدمة المعقد لقرار شراء واضح — تمركز ورسائل وموقع يحوّل، وبعدها نمو بالكونتنت والظهور في الذكاء الاصطناعي.",
      },
      "real-estate": {
        title: "عقارات",
        summary: "ثقة وليدز وظهور محلي + الذكاء الاصطناعي — بنظام تنفيذ كامل.",
      },
    },
    personas: {
      lawyers: {
        title: "مواقع للمحامين (ثقة + استشارات)",
        summary: "موقع بريميوم يبني ثقة بسرعة + استقبال الطلبات وحجز — عشان البحث يبقى استشارات فعلًا.",
        pains: [
          "شكل الموقع زي أي مكتب تاني",
          "ليدز غلط (قضايا مش مناسبة)",
          "العميل بيتردد لأنه مش واثق",
          "مفيش صفحات بتستهدف نية البحث لكل تخصص",
        ],
        outcomes: [
          "صفحات تخصصات واضحة + إثبات",
          "حجز استشارة + فورم يفلتر ويروّت",
          "تهيئة محركات البحث المحلي + صفحات سلطة",
          "سيستم تقدر تحدّثه من غير ما الجودة تقع",
        ],
        successStories: [
          {
            id: "law-1",
            headline: "من موقع عادي → بايبلاين استشارات",
            context: "مكتب متوسط كان محتاج ليدز أجود وروتينج حسب نوع القضية.",
            timeframe: "6 أسابيع",
            results: [
              { label: "طلبات الاستشارة", value: "+41%" },
              { label: "استفسارات غلط", value: "−28%" },
              { label: "زمن أول رد", value: "−52%" },
            ],
            whatWeDid: [
              "هيكلة صفحات التخصصات حسب نية البحث",
              "صفحات سلطة: بروفايل محامين + إطار لنتايج/قضايا",
              "فورم استقبال الطلبات بقواعد توجيه حسب نوع القضية",
              "تهيئة محركات البحث المحلي + أسئلة شائعة للأسئلة عالية النية",
            ],
          },
          {
            id: "law-2",
            headline: "مركز تعريف شخصي لمحامي كبير يحوّل الإحالات",
            context: "محامي كبير كان عايز صفحة واحدة بريميوم للإحالات وترافيك الميديا.",
            timeframe: "5 أيام",
            results: [
              { label: "مكالمات محجوزة من الإحالات", value: "+23%" },
              { label: "نسبة النقر من روابط واتساب", value: "+18%" },
              { label: "التسرب على الموبايل", value: "−17%" },
            ],
            whatWeDid: [
              "حزمة الثقة فوق (خبرة/اعتمادات/ميديا)",
              "زر دعوة واحد أساسي (حجز) + زر دعوة ثانوي (واتساب)",
              "تتبّع بالأحداث و أكواد تتبّع عشان نعرف المصدر",
            ],
          },
        ],
      },
      doctors: {
        title: "مواقع للدكاترة والعيادات (ثقة + حجز)",
        summary: "صفحات خدمات مفهومة للمريض + مراجعات + حجز — تقلل غياب عن المواعيد وتزود المواعيد.",
        pains: [
          "المريض مش فاهم يختار إيه",
          "الحجز يدوي وفيه غياب عن المواعيد",
          "ظهور ضعيف قدام المنافسين",
          "الموقع قديم وبيهز الثقة",
        ],
        outcomes: [
          "صفحات خدمات + أسئلة شائعة بتجاوب",
          "حجز أونلاين + تأكيدات وتذكير",
          "فروع + مراجعات + تهيئة محركات البحث المحلي",
          "محتوى يزود الثقة في جوجل والذكاء الاصطناعي",
        ],
        successStories: [
          {
            id: "med-1",
            headline: "مواعيد أكتر… وغياب عن المواعيد أقل",
            context: "عيادة كانت محتاجة تجربة أوضح للمريض + سيستم حجز يقلل الاحتكاك.",
            timeframe: "8 أسابيع",
            results: [
              { label: "مواعيد محجوزة", value: "+34%" },
              { label: "نسبة عدم الحضور", value: "−21%" },
              { label: "مكالمات أسئلة بسيطة", value: "−29%" },
            ],
            whatWeDid: [
              "صفحات خدمات + أسئلة شائعة كمسار قرار للمريض",
              "حجز مع فواصل زمنية + تأكيد + تذكيرات",
              "تهيئة محركات البحث المحلي للفروع والمراجعات والكيانات",
              "قياس: محجوز → حضر → تحوّل",
            ],
          },
          {
            id: "med-2",
            headline: "صفحة تعريف شخصية لدكتور يبني ثقة بسرعة",
            context: "دكتور متخصص كان عايز صفحة تجمع السوشيال والإعلانات والإحالات.",
            timeframe: "4 أيام",
            results: [
              { label: "وقت على الصفحة", value: "+27%" },
              { label: "تحويل الحجز", value: "+19%" },
              { label: "معدل الارتداد", value: "−14%" },
            ],
            whatWeDid: [
              "حزمة الثقة فوق: تخصص + اعتمادات + نتايج",
              "أسئلة شائعة لأسئلة المرضى الشائعة",
              "أداء موبايل سريع + خطوة واضحة",
            ],
          },
        ],
      },
      "business-owners": {
        title: "ويب + سيستم لرجال الأعمال (طلب + ووركفلو)",
        summary: "واجهة بريميوم + السيستم اللي وراها: داشبورد، موافقات، بايبلاين، و نظام تشغيل خفيف.",
        pains: [
          "التسويق متقطع ومش بيتقاس",
          "الفريق شغال واتساب وإكسيل",
          "العمليات بتبوظ مع النمو",
          "عايز سيستم ماشي مع شغلك بسرعة",
        ],
        outcomes: [
          "قصة واحدة عبر السيلز والموقع",
          "تتبع وتقارير واضحة",
          "سيستم مبني على ووركفلو حقيقي",
          "أتمتة تقلل الشغل اليدوي",
        ],
        successStories: [
          {
            id: "biz-1",
            headline: "نظام تشغيل خفيف اتعمل على مقاس الشغل",
            context: "شركة شركة متوسطة شغالة بإكسيل كانت محتاجة موافقات وبايبلاين وتقارير من غير نظام موارد تقيل.",
            timeframe: "10 أسابيع",
            results: [
              { label: "تسليمات بين الناس يدوي", value: "−36%" },
              { label: "وقت تقرير أسبوعي", value: "−48%" },
              { label: "التسليم في ميعاده", value: "+12%" },
            ],
            whatWeDid: [
              "رسم مسار العمل (من الوضع الحالي للوضع المستهدف) مع صلاحيات",
              "لوحات متابعة للبايبلاين والموافقات والاستثناءات",
              "تكاملات تقلل إدخال البيانات مرتين",
            ],
          },
          {
            id: "biz-2",
            headline: "بوابة عملاء نسخة أولية الناس بتستخدمه",
            context: "شركة خدمات كانت محتاجة بوابة للطلبات والستاتس والدفع.",
            timeframe: "6 أسابيع",
            results: [
              { label: "تذاكر دعم", value: "−22%" },
              { label: "شراء متكرر", value: "+16%" },
              { label: "زمن عمل عرض سعر", value: "−31%" },
            ],
            whatWeDid: [
              "هيكلة بسيطة: مهمة واحدة أساسية في كل شاشة",
              "تتبّع للأحداث عشان نعرف التسرب",
              "تحسين تهيئة المستخدم لرفع التفعيل",
            ],
          },
        ],
      },
    },
    solutions: {
      "app-development": { title: "تطوير تطبيقات (ويب + موبايل)" },
      "bio-pages": { title: "صفحات تعريف شخصية (صفحة شخصية بتبيع)" },
      "scheduling-استقبال الطلبات": { title: "حجز + استقبال طلبات" },
      "erp-مسارات عمل": { title: "نظام تشغيل خفيف (سيستم ماشي مع شغلك)" },
      "lead-generation": { title: "ليدز بي تو بي (قوائم + إثراء بيانات)" },
      "education-systems": { title: "أنظمة تعليم (نظام إدارة تعلم + نظام معلومات طلبة + نظام جودة)" },
    },
    audiences: {
      personal: { title: "براند شخصي" },
      smb: { title: "شركات صغيرة/متوسطة" },
      enterprise: { title: "مؤسسات" },
    },
    caseStudies: {
      "personal-brand-rebuild": { title: "تجديد موقع براند شخصي" },
      "smb-turnkey-launch": { title: "إطلاق تنفيذ كامل لشركة" },
      "ai-visibility-foundations": { title: "أساسيات ظهور الذكاء الاصطناعي" },
    },
  },
};

function localizeArray<T extends { id?: string; slug?: string }>(lang: Lang, base: T[], table: Record<string, DeepPartial<T>>): T[] {
  if (lang === "en") return base;
  const patchTable = (patches as any)[lang]?.[table === (patches as any)[lang]?.services ? "services" : ""];
  return base.map((item: any) => {
    const key = item.id ?? item.slug;
    const patch = table[key];
    return merge(item, patch);
  });
}

export function getServices(lang: Lang): Service[] {
  if (lang === "en") return servicesEn;
  const table = patches[lang as Exclude<Lang, "en">].services;
  return servicesEn.map((s) => merge(s, table[s.id]));
}

export function getIndustries(lang: Lang): Industry[] {
  if (lang === "en") return industriesEn;
  const table = patches[lang as Exclude<Lang, "en">].industries;
  return industriesEn.map((x) => merge(x, table[x.id]));
}

export function getPersonas(lang: Lang): PersonaPage[] {
  if (lang === "en") return personasEn;
  const table = patches[lang as Exclude<Lang, "en">].personas;
  return personasEn.map((x) => merge(x, table[x.id]));
}

export function getSolutions(lang: Lang): Solution[] {
  if (lang === "en") return solutionsEn;
  const table = patches[lang as Exclude<Lang, "en">].solutions;
  return solutionsEn.map((x) => merge(x, table[x.id]));
}

export function getAudiences(lang: Lang): Audience[] {
  if (lang === "en") return audiencesEn;
  const table = patches[lang as Exclude<Lang, "en">].audiences;
  return audiencesEn.map((x) => merge(x, table[x.id]));
}


export function getCaseStudyBySlug(lang: Lang, slug: string): CaseStudy | undefined {
  return getCaseStudies(lang).find((c) => c.slug === slug);
}

export function getCaseStudies(lang: Lang): CaseStudy[] {
  if (lang === "en") return caseStudiesEn;
  const table = patches[lang as Exclude<Lang, "en">].caseStudies;
  return caseStudiesEn.map((x) => merge(x, table[x.slug]));
}
