/*
Adawaty i18n — lightweight in-app language switcher
- Supports: en, fr, es, de, ar (Modern Standard Arabic)
- Stores language in localStorage
- Provides t(key) and helpers for direction (RTL)
*/

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "fr" | "es" | "de" | "ar";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  en: {
    "nav.services": "Services",
    "nav.solutions": "Solutions",
    "nav.for": "For",
    "nav.industries": "Industries",
    "nav.work": "Work",
    "nav.studio": "Studio",
    "nav.pricing": "Pricing",
    "nav.aiAudit": "AI Visibility Audit",
    "nav.pricingCalc": "Pricing calculator",
    "nav.home": "Home",
    "cta.book": "Book a call",
    "mobile.safeNote": "Clear steps. Fixed scope. You keep ownership.",
    "cta.requestScope": "Request scope",
    "cta.getPlan": "Get a DFY plan",
    "cta.seeProof": "See proof",
    "cta.seeSolutions": "See solutions",
    "cta.choosePage": "Choose your page",
    "hero.badge": "We build brands — DFY",
    "hero.h1": "Brand → Build → Demand.",
    "hero.h1.sub": "DFY, end-to-end.",
    "hero.p": "Premium brand + web + demand, shipped as one system—without freelancers, handoffs, and chaos.",
    "hero.chip.1": "2–4 weeks to launch-ready",
    "hero.chip.2": "Sprint delivery (fixed scope)",
    "hero.chip.3": "Apps + bio pages + scheduling + ERP",
    "hero.chip.4": "SEO + AI visibility ready",
    "lang.label": "Language",

    "services.page.title": "Services",
    "services.page.subtitle": "An elite DFY system: Brand → Build → Demand. Shipped in sprints, documented for ownership, and upgraded with AI workflows + visibility.",
    "services.deliverablesBadge": "Deliverables",
    "services.viewDetails": "View details",

    "services.pillar.brandIntelligence.eyebrow": "Clarity",
    "services.pillar.brandIntelligence.title": "Brand Intelligence",
    "services.pillar.brandIntelligence.note": "Positioning and offer architecture so your message lands immediately.",

    "services.pillar.brandSystem.eyebrow": "Identity",
    "services.pillar.brandSystem.title": "Brand System",
    "services.pillar.brandSystem.note": "A maintainable system: templates + rules, not just a logo.",

    "services.pillar.dfyWebsite.eyebrow": "Build",
    "services.pillar.dfyWebsite.title": "DFY Website",
    "services.pillar.dfyWebsite.note": "Premium UI, performance, and conversion instrumentation.",

    "services.pillar.contentEngine.eyebrow": "Output",
    "services.pillar.contentEngine.title": "Content Engine",
    "services.pillar.contentEngine.note": "On-brand content workflows powered by AI with human review.",

    "services.pillar.aiVisibility.eyebrow": "Discover",
    "services.pillar.aiVisibility.title": "AI Visibility",
    "services.pillar.aiVisibility.note": "SEO + AEO + LLMSEO so you show up in search and AI answers.",

    "services.pillar.concierge.eyebrow": "Ongoing",
    "services.pillar.concierge.title": "Concierge",
    "services.pillar.concierge.note": "VIP iteration after launch: updates, experiments, governance.",

    "services.audit.eyebrow": "LLM answers",
    "services.audit.title": "AI Visibility Audit",
    "services.audit.subtitle": "A structured audit to help your brand outrank competitors in AI assistants by strengthening entity clarity, page semantics, and answer-worthiness.",
    "services.audit.badge": "Audit outputs",
    "services.audit.cards.0.t": "Competitive answer map",
    "services.audit.cards.0.d": "We identify the queries where competitors get cited in LLM answers (and why), then map gaps you can own.",
    "services.audit.cards.1.t": "Entity + narrative clarity",
    "services.audit.cards.1.d": "We tune positioning, entity signals, and internal linking so assistants understand who you are, who you serve, and what you do.",
    "services.audit.cards.2.t": "AEO + page upgrades",
    "services.audit.cards.2.d": "We rewrite priority pages for direct answers, improve structure, and add proof signals that models trust.",
    "services.audit.whatYouGet": "What you get",
    "services.audit.list.0": "Query set + competitor benchmark (what the models say today)",
    "services.audit.list.1": "Priority pages list + exact recommendations",
    "services.audit.list.2": "LLM-ready content briefs (FAQs, comparisons, definitions)",
    "services.audit.list.3": "Measurement plan: rankings, citations/mentions, and conversion signals",
    "services.audit.howYouOutrank": "How you outrank",
    "services.audit.howYouOutrankDesc": "LLMs reward clarity + evidence + coverage. We make your pages easier to cite than competitors: cleaner structure, stronger entity signals, and direct answers tied to proof.",
    "services.audit.viewDetails": "View audit details",

    "solution.notFound.title": "Solution not found",
    "solution.notFound.subtitle": "Try the solutions hub.",
    "solution.notFound.back": "Back to solutions",
    "solution.heroAlt": "Solution hero background",
    "solution.eyebrow": "Solution",
    "solution.cta.allSolutions": "All solutions",
    "solution.section.deliverables": "Deliverables",
    "solution.section.timeline": "Timeline",
    "solution.section.integrations": "Integrations",
    "solution.section.faqs": "FAQs",
    "solution.finalCta.title": "Want this built for your exact workflow?",
    "solution.finalCta.subtitle": "We’ll map your current process, remove bottlenecks, then build the smallest system that works—fast. No chaos, no handoffs.",

    "serviceDetail.subtitle": "DFY deliverables, built for clarity and AI-era discoverability.",
    "serviceDetail.dfyTag": "DFY • sprint delivery",
    "serviceDetail.whatYouGet": "What you get (deliverables)",
    "serviceDetail.backToServices": "Back to services",
    "serviceDetail.aiWhy.title": "Why this matters in AI search",
    "serviceDetail.aiWhy.card0.t": "Answer-worthiness",
    "serviceDetail.aiWhy.card0.d": "We structure content so assistants can lift direct answers (definitions, comparisons, FAQs), not vague marketing.",
    "serviceDetail.aiWhy.card1.t": "Trust signals",
    "serviceDetail.aiWhy.card1.d": "We connect claims to proof: measurable outcomes, clear scope, consistent entity signals, and clean semantics.",
    "serviceDetail.faq.title": "FAQ",
    "serviceDetail.finalCta.title": "Want this done-for-you?",
    "serviceDetail.finalCta.subtitle": "Book a call and we’ll propose the fastest DFY path from Brand → Build → Demand, including a measurement plan for SEO + AI visibility.",

    "serviceDetail.faq.ai-visibility.0.q": "What is LLM SEO (LLMSEO)?",
    "serviceDetail.faq.ai-visibility.0.a": "LLM SEO is optimizing your brand and pages so AI assistants can confidently cite and recommend you. It overlaps with SEO and AEO, but focuses on entity clarity, answer-worthiness, and brand mentions/citations across the web.",
    "serviceDetail.faq.ai-visibility.1.q": "How do you outrank competitors in AI answers?",
    "serviceDetail.faq.ai-visibility.1.a": "We improve: (1) entity clarity (who you are), (2) structured coverage (direct answers, FAQs, comparisons), and (3) proof signals (case studies, references, consistency). Then we track mentions and iterate.",
    "serviceDetail.faq.ai-visibility.2.q": "Does ranking #1 on Google guarantee AI citations?",
    "serviceDetail.faq.ai-visibility.2.a": "No. Strong rankings help, but assistants often cite sources based on clarity, relevance, and trust signals. We optimize for both classic rankings and AI citations.",

    "serviceDetail.faq.brand-intelligence.0.q": "What do you mean by Brand Intelligence?",
    "serviceDetail.faq.brand-intelligence.0.a": "A strategy sprint that clarifies positioning, audience, and offer structure. It turns your brand into a repeatable message that sales, content, and the website can all reuse.",
    "serviceDetail.faq.brand-intelligence.1.q": "What’s the output of the sprint?",
    "serviceDetail.faq.brand-intelligence.1.a": "A positioning doc, ICP segments, offer architecture, and a narrative map that guides your website and content engine.",

    "serviceDetail.faq.dfy-website.0.q": "Can you build fast without sacrificing quality?",
    "serviceDetail.faq.dfy-website.0.a": "Yes — because we use a tight design system, clear IA, and sprint delivery. We also instrument analytics so the site can be improved post-launch.",

    "persona.notFound.subtitle": "Try the personas hub.",
    "persona.notFound.back": "Back to personas",
    "persona.eyebrow": "Built for",
    "persona.heroAlt": "Persona hero background",
    "persona.faq.0.q": "What do I get, step-by-step?",
    "persona.faq.0.a": "We run DFY stages: scope lock → architecture → design → build → launch → handover. Every stage has visible deliverables.",
    "persona.faq.1.q": "Can you connect booking and forms to our workflow?",
    "persona.faq.1.a": "Yes. We map the current process first, then connect scheduling, intake, routing, and reporting so your team actually uses it.",
    "persona.psych.0.t": "Halo effect",
    "persona.psych.0.d": "Better aesthetics increase perceived competence—especially in high-stakes services.",
    "persona.psych.1.t": "Cognitive load",
    "persona.psych.1.d": "Fewer choices, clearer hierarchy, higher conversion.",
    "persona.psych.2.t": "Loss aversion",
    "persona.psych.2.d": "We frame costs of delay: missed bookings, weak trust, manual ops.",

    "home.successTeaser.title": "Success stories by persona",
    "home.successTeaser.subtitle": "Measurable outcomes — tied to conversion and workflows.",
    "home.successTeaser.cta": "See all personas",
    "home.successTeaser.view": "View results",

    "persona.breakingTrust": "What’s breaking trust",
    "persona.buildInstead": "What we build instead",
    "persona.successStories": "Success stories",
    "persona.successStories.subtitle": "Measurable outcomes, tied to conversion and workflow adoption.",
    "persona.timeframe": "Timeframe",
    "persona.shipped": "What we shipped",
    "persona.recommendedSolutions": "Recommended solutions",
    "persona.recommendedSolutions.subtitle": "Fastest path to impact. Choose one, or combine into a DFY system.",
    "persona.seeAllSolutions": "See all solutions",

    "persona.marketingPsychology": "Marketing psychology (ethical)",
    "persona.marketingPsychology.subtitle": "Premium design reduces cognitive load and increases perceived competence — helping the right clients decide faster.",

    "home.premiumSystem.title": "The premium system (in 4 moves)",
    "home.premiumSystem.p1.t": "Positioning",
    "home.premiumSystem.p1.d": "A clear story people repeat.",
    "home.premiumSystem.p2.t": "Premium website",
    "home.premiumSystem.p2.d": "Conversion-first, fast, and measurable.",
    "home.premiumSystem.p3.t": "Content Engine",
    "home.premiumSystem.p3.d": "On-brand output with AI + review.",
    "home.premiumSystem.p4.t": "AI Visibility",
    "home.premiumSystem.p4.d": "SEO/AEO/LLMSEO to get cited.",

    "home.trust.sprints.k": "Sprints",
    "home.trust.sprints.v": "Fixed scope. Weekly progress.",
    "home.trust.handover.k": "Handover",
    "home.trust.handover.v": "Templates + docs included.",
    "home.trust.ai.k": "AI visibility",
    "home.trust.ai.v": "SEO/AEO/LLMSEO readiness.",

    "home.scrollStopper.eyebrow": "Who we build for",
    "home.scrollStopper.title": "Lawyers. Doctors. Business owners.",
    "home.scrollStopper.subtitle": "Same problem: trust + demand + workflows.",
    "home.scrollStopper.desc": "This section is intentionally pinned. Scroll to see how the DFY system adapts.",
    "home.scrollStopper.progress1": "Clarity",
    "home.scrollStopper.progress2": "Proof",
    "home.scrollStopper.progress3": "Conversion",
    "home.scrollStopper.progress4": "Systems",

    "home.chapter.law.eyebrow": "Lawyers",
    "home.chapter.law.title": "Authority-first websites that convert consultations",
    "home.chapter.law.body": "Clarity + credibility + intake. High-trust from the first scroll — and easy booking.",
    "home.chapter.law.b1": "Practice areas pages that rank",
    "home.chapter.law.b2": "Consultation booking + forms",
    "home.chapter.law.b3": "Case-type filtering + routing",

    "home.chapter.med.eyebrow": "Doctors / Clinics",
    "home.chapter.med.title": "Patient trust + scheduling, without friction",
    "home.chapter.med.body": "We make services easy to choose, then connect booking and reminders to reduce no-shows.",
    "home.chapter.med.b1": "Service pages + FAQs",
    "home.chapter.med.b2": "Online booking + confirmations",
    "home.chapter.med.b3": "Locations + reviews + local SEO",

    "home.chapter.biz.eyebrow": "Business owners",
    "home.chapter.biz.title": "Brand + demand + workflows (ERP-lite)",
    "home.chapter.biz.body": "We map workflows, then build systems that match how your business actually runs.",
    "home.chapter.biz.b1": "Dashboards + pipelines",
    "home.chapter.biz.b2": "Approvals + roles",
    "home.chapter.biz.b3": "Automation + integrations",

    "home.chapter.exec.eyebrow": "Personal brands",
    "home.chapter.exec.title": "Bio pages that turn attention into authority",
    "home.chapter.exec.body": "One premium page for referrals, media, ads, and socials — with proof, booking, and tracking.",
    "home.chapter.exec.b1": "Credibility stack",
    "home.chapter.exec.b2": "Scheduling + WhatsApp",
    "home.chapter.exec.b3": "UTM + conversion tracking",


    "home.pillars.title": "The 5 pillars",
    "home.pillars.subtitle": "A blended system: positioning, identity, web, content, and discoverability (SEO/AEO/LLMSEO). One pillar per decision—no clutter.",
    "home.pillars.cta": "See solutions",
    "home.pillars.concierge": "شريك متابعة (Concierge)",
    "home.pillars.ongoing": "Ongoing",
    "home.pillars.conciergeDesc": "VIP iteration after launch: updates, experiments, governance, and continuous AI/search improvements.",

    "home.packages.title": "Turnkey DFY packages",
    "home.packages.subtitle": "Choose the scope that matches your timeline. Every package includes tracking, documentation, and a clean handover.",
    "home.packages.mostChosen": "Most chosen",
    "home.packages.cta": "Request scope",

    "home.audiences.title": "Built for personal brands, SMBs, and enterprises",
    "home.audiences.subtitle": "Same DFY system. Different constraints. We adapt the scope for speed, governance, and team size.",

    "home.clients.title": "Selected clients",
    "home.clients.subtitle": "A few teams we’ve supported across sectors. If you’re in a complex category, we’ll make your decision feel obvious.",
    "home.clients.cta": "Work with Adawaty",

    "home.proof.title": "Proof that ships",
    "home.proof.subtitle": "Case studies built around outcomes: conversion, visibility, speed, and adoption.",
    "home.proof.view": "View case study",
    "home.proof.browseAll": "Browse all",

    "home.packages.starter.t": "Starter",
    "home.packages.starter.tag": "Personal brand / early stage",
    "home.packages.starter.b1": "Brand Intelligence sprint",
    "home.packages.starter.b2": "Premium one-page website",
    "home.packages.starter.b3": "Content starter kit",
    "home.packages.starter.b4": "AI visibility foundations",

    "home.packages.growth.t": "Growth",
    "home.packages.growth.tag": "SMBs",
    "home.packages.growth.b1": "Brand System + templates",
    "home.packages.growth.b2": "Multi-page website",
    "home.packages.growth.b3": "Content Engine workflow",
    "home.packages.growth.b4": "Search + AI visibility plan",

    "home.packages.enterprise.t": "Enterprise",
    "home.packages.enterprise.tag": "Teams with governance",
    "home.packages.enterprise.b1": "Brand governance + templates",
    "home.packages.enterprise.b2": "Performance + SEO/AEO hardening",
    "home.packages.enterprise.b3": "Enablement + documentation",
    "home.packages.enterprise.b4": "AI workflows + guardrails",

    "home.work.subtitle": "Starter examples. Replace with deeper client work as you publish it.",

    "work.page.title": "Work",
    "work.page.subtitle": "Examples of outcomes: clarity, systems, premium execution. Includes selected clients (with industry notes).",
    "work.clients.title": "Selected clients",
    "work.clients.note": "Segmented by industry so prospects instantly recognize context.",
    "work.caseStudy.view": "View case study",

    "client.sector.Engineering": "Engineering",
    "client.sector.Healthcare": "Healthcare",
    "client.sector.Food": "Food",
    "client.sector.Manufacturing": "Manufacturing",
    "client.sector.Distribution": "Distribution",
    "client.sector.Education": "Education",
    "client.sector.Hosting": "Hosting",

    "client.industry.meteory": "Fire safety manufacturing",
    "client.industry.sparx": "Fire protection engineering",
    "client.industry.altawfeek": "Fire protection engineering",
    "client.industry.dnc": "Healthcare (endocrinology)",
    "client.industry.3a": "Food supply",
    "client.industry.tawplast": "Plastic injection molding",
    "client.industry.crownycup": "Food & beverage packaging",
    "client.industry.el-etehad": "PPE & industrial footwear",
    "client.industry.egyspring": "Industrial manufacturing (springs)",
    "client.industry.nextsupply": "Coffee distribution",
    "client.industry.hostocta": "Web hosting",
    "client.industry.bello-food": "FMCG (olives & pickles)",
    "client.industry.coursatee": "Education (exam prep)",

    "notFound.title": "Page not found",
    "notFound.subtitle": "The page you requested does not exist.",
    "notFound.home": "Back to home",
    "notFound.work": "View work",

    "about.page.title": "Studio",
    "about.page.subtitle": "Adawaty is a DFY studio for branding, websites, and solutions — designed to remove client fear through clarity and delivery.",
    "about.seo.desc": "About Adawaty: a DFY studio delivering Brand → Build → Demand with sprint delivery, systems, templates, and AI visibility.",
    "about.what.title": "What we do",
    "about.what.p1": "We build premium brand + web systems end-to-end. That means we can define positioning and messaging, create the identity, design and develop the website, and deliver a launch kit — without handoffs.",
    "about.what.p2": "We also bring AI enablement in a practical way: voice kits, workflows, and guardrails so you can scale output without losing quality.",
    "about.how.title": "How we work",
    "about.how.items.0.t": "Clarity first",
    "about.how.items.0.d": "Positioning and messaging before visuals.",
    "about.how.items.1.t": "Systems, not assets",
    "about.how.items.1.d": "Reusable templates + rules that teams can keep consistent.",
    "about.how.items.2.t": "Sprint delivery",
    "about.how.items.2.d": "Fast progress with stakeholder alignment.",
    "about.how.items.3.t": "Enablement",
    "about.how.items.3.d": "AI workflows + handover so you keep momentum.",
    "about.serve.title": "Who we serve",
    "about.serve.p1": "Personal brands, SMBs, and enterprise teams looking for turnkey outcomes.",
    "about.serve.list.0": "Founders, executives, creators",
    "about.serve.list.1": "Product and service businesses",
    "about.serve.list.2": "Teams that need scalable systems",

    "contact.page.title": "Contact",
    "contact.page.subtitle": "Tell us what you want to launch or improve. We’ll reply with a clear next step and a DFY scope proposal.",
    "contact.seo.desc": "Request a DFY scope for Brand → Build → Demand. Get a clear next step and a sprint plan.",
    "contact.toast.title": "Message received (demo)",
    "contact.toast.desc": "This is a static site. Connect a real form endpoint when you deploy.",
    "contact.form.name": "Name",
    "contact.form.namePh": "Your name",
    "contact.form.email": "Email",
    "contact.form.emailPh": "name@company.com",
    "contact.form.phone": "Phone",
    "contact.form.phonePh": "+20 …",
    "contact.form.interested": "Interested in",
    "contact.form.servicePh": "Select a service",
    "contact.form.notSure": "Not sure yet",
    "contact.form.message": "Message",
    "contact.form.messagePh": "What are you launching or improving (brand, website, content, AI workflows)?",
    "contact.form.send": "Send message",
    "contact.form.preferEmail": "Prefer email?",
    "contact.direct.title": "Direct lines",
    "contact.direct.subtitle": "Add your official business contacts here (phone/WhatsApp/address).",
    "contact.direct.email": "Email",
    "contact.direct.phone": "Phone",
    "contact.direct.hours": "Working hours",
    "contact.direct.hoursValue": "Sun–Thu, 9:00–18:00",

    "home.howWeWork.title": "How we work",

    "for.title": "High-stakes services and ambitious operators.",
    "for.subtitle": "Same DFY system. Different realities. Choose your page to see outcomes, solutions, and step-by-step delivery.",
    "for.cta": "Book a call",
    "for.button": "See the playbook",

    "solutions.eyebrow": "Solutions",
    "solutions.title": "Build what your business needs.",
    "solutions.subtitle": "Not “a site” in isolation. We ship complete solutions that connect brand, conversion, and workflows.",
    "solutions.cta": "Request scope",
    "solutions.dfytag": "DFY",
    "solutions.view": "View deliverables",
    "solutions.steps.title": "Step-by-step delivery (no chaos)",
    "solutions.steps.subtitle": "DFY sprints so you always know what happens next—what you’ll receive, when, and what we need from you.",
    "solutions.step0.t": "Step 0 — Scope lock",
    "solutions.step0.d": "Discovery, goals, constraints, and a fixed plan.",
    "solutions.step1.t": "Step 1 — Architecture",
    "solutions.step1.d": "User journeys, page/app structure, and conversion plan.",
    "solutions.step2.t": "Step 2 — Design",
    "solutions.step2.d": "Prototype + UI system that feels premium and is easy to iterate.",
    "solutions.step3.t": "Step 3 — Build",
    "solutions.step3.d": "Implementation + integrations + tracking.",
    "solutions.step4.t": "Step 4 — Launch",
    "solutions.step4.d": "QA, deployment, analytics, and handover docs.",
    "solutions.stepPost.t": "After — Partner",
    "solutions.stepPost.d": "Ongoing experiments, SEO/AI visibility, and iteration.",





  },
  fr: {
    "nav.services": "Services",
    "nav.solutions": "Solutions",
    "nav.for": "Profils",
    "nav.industries": "Secteurs",
    "nav.work": "Réalisations",
    "nav.studio": "Studio",
    "nav.pricing": "Tarifs",
    "nav.aiAudit": "Audit de visibilité IA",
    "nav.pricingCalc": "Calculateur de tarifs",
    "cta.book": "Réserver un appel",
    "cta.requestScope": "Demander un scope",
    "cta.getPlan": "Obtenir un plan DFY",
    "cta.seeProof": "Voir des preuves",
    "cta.seeSolutions": "Voir les solutions",
    "cta.choosePage": "Choisir votre page",
    "hero.badge": "Nous construisons des marques — DFY",
    "hero.h1": "Marque → Build → Demande.",
    "hero.h1.sub": "DFY, de bout en bout.",
    "hero.p": "Marque premium + web + demande, livrés comme un seul système — sans freelances, sans handoffs, sans chaos.",
    "hero.chip.1": "2–4 semaines jusqu’au lancement",
    "hero.chip.2": "Sprints (scope fixé)",
    "hero.chip.3": "Apps + bio pages + planning + ERP",
    "hero.chip.4": "SEO + visibilité IA prêts",
    "lang.label": "Langue",
  },
  es: {
    "nav.services": "Servicios",
    "nav.solutions": "Soluciones",
    "nav.for": "Para",
    "nav.industries": "Industrias",
    "nav.work": "Casos",
    "nav.studio": "Estudio",
    "nav.pricing": "Precios",
    "nav.aiAudit": "Auditoría de visibilidad IA",
    "nav.pricingCalc": "Calculadora de precios",
    "cta.book": "Agendar una llamada",
    "cta.requestScope": "Solicitar alcance",
    "cta.getPlan": "Obtener plan DFY",
    "cta.seeProof": "Ver pruebas",
    "cta.seeSolutions": "Ver soluciones",
    "cta.choosePage": "Elegir tu página",
    "hero.badge": "Construimos marcas — DFY",
    "hero.h1": "Marca → Build → Demanda.",
    "hero.h1.sub": "DFY, de punta a punta.",
    "hero.p": "Marca premium + web + demanda, entregadas como un solo sistema—sin freelancers, sin traspasos, sin caos.",
    "hero.chip.1": "2–4 semanas hasta lanzamiento",
    "hero.chip.2": "Sprints (alcance fijo)",
    "hero.chip.3": "Apps + bio pages + agenda + ERP",
    "hero.chip.4": "SEO + visibilidad IA listos",
    "lang.label": "Idioma",
  },
  de: {
    "nav.services": "Leistungen",
    "nav.solutions": "Lösungen",
    "nav.for": "Für",
    "nav.industries": "Branchen",
    "nav.work": "Referenzen",
    "nav.studio": "Studio",
    "nav.pricing": "Preise",
    "nav.aiAudit": "KI-Sichtbarkeits-Audit",
    "nav.pricingCalc": "Preisrechner",
    "cta.book": "Call buchen",
    "cta.requestScope": "Scope anfragen",
    "cta.getPlan": "DFY-Plan erhalten",
    "cta.seeProof": "Proof ansehen",
    "cta.seeSolutions": "Lösungen ansehen",
    "cta.choosePage": "Seite wählen",
    "hero.badge": "Wir bauen Marken — DFY",
    "hero.h1": "Brand → Build → Demand.",
    "hero.h1.sub": "DFY, end-to-end.",
    "hero.p": "Premium Brand + Web + Nachfrage als ein System—ohne Freelancer, Übergaben und Chaos.",
    "hero.chip.1": "2–4 Wochen bis Launch-ready",
    "hero.chip.2": "Sprints (fester Scope)",
    "hero.chip.3": "Apps + Bio-Seiten + Scheduling + ERP",
    "hero.chip.4": "SEO + KI-Sichtbarkeit bereit",
    "lang.label": "Sprache",
  },
  ar: {
    "nav.services": "الخدمات",
    "nav.solutions": "الحلول",
    "nav.for": "مناسب لـ",
    "nav.industries": "القطاعات",
    "nav.work": "أعمالنا",
    "nav.studio": "الاستوديو",
    "nav.pricing": "الأسعار",
    "nav.aiAudit": "تقييم الظهور في الـAI",
    "nav.pricingCalc": "حاسبة الأسعار",
    "cta.book": "احجز مكالمة",
    "mobile.safeNote": "خطوات واضحة. نطاق ثابت. وإنت ماسك الشغل بعد التسليم.",
    "nav.home": "الرئيسية",

    "services.page.title": "الخدمات",
    "services.page.subtitle": "نظام DFY بريميوم: براند ← بناء ← طلب. تسليم بمراحل واضحة، توثيق، وتمكين AI + ظهور.",
    "services.deliverablesBadge": "التسليمات",
    "services.viewDetails": "شوف التفاصيل",

    "services.pillar.brandIntelligence.eyebrow": "وضوح",
    "services.pillar.brandIntelligence.title": "ذكاء وتمركز البراند",
    "services.pillar.brandIntelligence.note": "تمركز وعرض وخطة رسائل تخلي كلامك يوصل بسرعة.",

    "services.pillar.brandSystem.eyebrow": "هوية",
    "services.pillar.brandSystem.title": "نظام البراند (هوية + أصول)",
    "services.pillar.brandSystem.note": "سيستم يتدار: قوالب + قواعد… مش لوجو وخلاص.",

    "services.pillar.dfyWebsite.eyebrow": "بناء",
    "services.pillar.dfyWebsite.title": "موقع DFY (بريميوم + سريع)",
    "services.pillar.dfyWebsite.note": "UI بريميوم + أداء + تتبع وتحويل.",

    "services.pillar.contentEngine.eyebrow": "إنتاج",
    "services.pillar.contentEngine.title": "Content Engine",
    "services.pillar.contentEngine.note": "Workflow كونتنت على البراند بـ AI + مراجعة بشرية.",

    "services.pillar.aiVisibility.eyebrow": "ظهور",
    "services.pillar.aiVisibility.title": "ظهور في البحث والـAI",
    "services.pillar.aiVisibility.note": "SEO + AEO + LLMSEO عشان تظهر في جوجل وكمان في إجابات الـAI.",

    "services.pillar.concierge.eyebrow": "متابعة",
    "services.pillar.concierge.title": "شريك متابعة",
    "services.pillar.concierge.note": "تحسين مستمر بعد الإطلاق: تحديثات، تجارب، وحوكمة.",

    "services.audit.eyebrow": "إجابات الـAI",
    "services.audit.title": "تقييم ظهور AI",
    "services.audit.subtitle": "تقييم منظّم يخلي البراند بتاعك يتذكر ويتذكر أكتر من المنافسين: وضوح كيان، معنى الصفحات، وإجابات سهلة الاقتباس.",
    "services.audit.badge": "مخرجات التقييم",
    "services.audit.cards.0.t": "خريطة إجابات المنافسين",
    "services.audit.cards.0.d": "بنحدد الأسئلة اللي المنافسين بيتذكروا فيها (وليه) وبنطلع فجوات تملكها.",
    "services.audit.cards.1.t": "وضوح الكيان والقصة",
    "services.audit.cards.1.d": "بنظبط إشارات البراند والربط الداخلي عشان الـAI يفهم إنت مين وبتخدم مين وبتعمل إيه.",
    "services.audit.cards.2.t": "AEO + ترقيات الصفحات",
    "services.audit.cards.2.d": "بنكتب صفحات بأجوبة مباشرة + تنظيم أحسن + دلائل ثقة تزيد الاقتباس.",
    "services.audit.whatYouGet": "هتاخد إيه؟",
    "services.audit.list.0": "مجموعة أسئلة + مقارنة بالمنافسين (الـAI بيقول إيه دلوقتي)",
    "services.audit.list.1": "قائمة الصفحات المهمة + توصيات واضحة",
    "services.audit.list.2": "بريفات محتوى جاهزة للـAI (FAQ، مقارنات، تعريفات)",
    "services.audit.list.3": "خطة قياس: ترتيب، ذكر/اقتباس، وإشارات تحويل",
    "services.audit.howYouOutrank": "إزاي تتفوق؟",
    "services.audit.howYouOutrankDesc": "الـAI بيكافئ الوضوح + الدليل + التغطية. بنخلي صفحاتك أسهل في الاقتباس: تنظيم أنضف، إشارات أقوى، وأجوبة مربوطة بproof.",
    "services.audit.viewDetails": "شوف تفاصيل التقييم",

    "solution.notFound.title": "الحل مش موجود",
    "solution.notFound.subtitle": "جرّب صفحة الحلول.",
    "solution.notFound.back": "ارجع للحلول",
    "solution.heroAlt": "خلفية البطل",
    "solution.eyebrow": "الحل",
    "solution.cta.allSolutions": "كل الحلول",
    "solution.section.deliverables": "التسليمات",
    "solution.section.timeline": "المدة",
    "solution.section.integrations": "الربط",
    "solution.section.faqs": "الأسئلة الشائعة",
    "solution.finalCta.title": "عايز ده يتبني على ورِكفلو شغلك بالظبط؟",
    "solution.finalCta.subtitle": "هنفهم العملية الحالية، نشيل الاختناقات، وبعدين نبني أصغر سيستم شغال—بسرعة. من غير فوضى ولا تسليمات.",

    "serviceDetail.subtitle": "تسليمات DFY معمولة للوضوح والظهور في زمن الـAI.",
    "serviceDetail.dfyTag": "DFY • تسليم بمراحل",
    "serviceDetail.whatYouGet": "هتستلم إيه؟ (التسليمات)",
    "serviceDetail.backToServices": "ارجع للخدمات",
    "serviceDetail.aiWhy.title": "ليه ده مهم في بحث الـAI؟",
    "serviceDetail.aiWhy.card0.t": "سهل الاقتباس",
    "serviceDetail.aiWhy.card0.d": "بننظم المحتوى عشان الـAI ياخد إجابات مباشرة (تعريفات/مقارنات/FAQ) مش كلام تسويق عام.",
    "serviceDetail.aiWhy.card1.t": "إشارات ثقة",
    "serviceDetail.aiWhy.card1.d": "بنربط الكلام بدليل: نتايج بالأرقام، نطاق واضح، إشارات كيان ثابتة، وتنظيم نظيف.",
    "serviceDetail.faq.title": "أسئلة شائعة",
    "serviceDetail.finalCta.title": "عايز ده يتعملك DFY؟",
    "serviceDetail.finalCta.subtitle": "احجز مكالمة وهنقترح أسرع طريق DFY من براند ← بناء ← طلب، ومعاه خطة قياس لـ SEO + ظهور AI.",

    "serviceDetail.faq.ai-visibility.0.q": "يعني إيه LLM SEO (LLMSEO)؟",
    "serviceDetail.faq.ai-visibility.0.a": "ده تحسين البراند والصفحات عشان أنظمة الـAI تقدر تقتبس وتوصّي بيك بثقة. قريب من SEO وAEO بس بيركز على وضوح الكيان وسهولة الاقتباس والذكر عبر الويب.",
    "serviceDetail.faq.ai-visibility.1.q": "إزاي نتفوق على المنافسين في إجابات الـAI؟",
    "serviceDetail.faq.ai-visibility.1.a": "بنحسن: (1) وضوح الكيان (إنت مين)، (2) تغطية منظمة (أجوبة مباشرة/FAQ/مقارنات)، (3) دلائل ثقة (قصص/مراجع/ثبات). وبعدين بنقيس الذِكر ونكرر التحسين.",
    "serviceDetail.faq.ai-visibility.2.q": "لو أنا رقم 1 في جوجل ده يضمن اقتباسات الـAI؟",
    "serviceDetail.faq.ai-visibility.2.a": "مش بالضرورة. الترتيب بيساعد، بس الـAI بيختار مصادر حسب الوضوح والملاءمة والثقة. بنظبط الاتنين: ترتيب جوجل + اقتباسات الـAI.",

    "serviceDetail.faq.brand-intelligence.0.q": "يعني إيه Brand Intelligence؟",
    "serviceDetail.faq.brand-intelligence.0.a": "مرحلة استراتيجية بتوضح التمركز والجمهور وبنية العرض. بتخلي رسالة البراند قابلة للتكرار في البيع والكونتنت والموقع.",
    "serviceDetail.faq.brand-intelligence.1.q": "هستلم إيه في المرحلة دي؟",
    "serviceDetail.faq.brand-intelligence.1.a": "مستند تمركز، شرائح ICP، بنية عروض، وخريطة رسائل توجه الموقع وContent Engine.",

    "serviceDetail.faq.dfy-website.0.q": "ينفع تبنوا بسرعة من غير ما الجودة تقل؟",
    "serviceDetail.faq.dfy-website.0.a": "أيوه — لأن عندنا نظام ديزاين واضح، IA مضبوط، وتسليم بمراحل. وكمان بنركب تتبع عشان نطوّر بعد الإطلاق.",

    "persona.notFound.subtitle": "جرّب صفحة “مناسب لـ”.",
    "persona.notFound.back": "ارجع للصفحات",
    "persona.eyebrow": "مناسب لـ",
    "persona.heroAlt": "خلفية البطل",
    "persona.faq.0.q": "هستلم إيه خطوة بخطوة؟",
    "persona.faq.0.a": "بنشتغل بمراحل DFY: تثبيت النطاق → الهيكلة → الديزاين → التنفيذ → الإطلاق → التسليم. كل مرحلة ليها تسليمات واضحة.",
    "persona.faq.1.q": "ينفع تربط الحجز والفورم بالوركفلو بتاعنا؟",
    "persona.faq.1.a": "أيوه. بنفهم العملية الحالية الأول وبعدين بنربط الحجز، الاستقبال، التوجيه، والتقارير عشان الفريق يستخدمه فعلاً.",
    "persona.psych.0.t": "Halo effect",
    "persona.psych.0.d": "الشكل الأحسن بيرفع الانطباع بالكفاءة — خصوصًا في الخدمات الحساسة.",
    "persona.psych.1.t": "Cognitive load",
    "persona.psych.1.d": "اختيارات أقل + هرمية أوضح = تحويل أعلى.",
    "persona.psych.2.t": "Loss aversion",
    "persona.psych.2.d": "بنوضح تكلفة التأخير: حجوزات ضايعة، ثقة أقل، وشغل يدوي أكتر.",

    "cta.requestScope": "اطلب نطاق الشغل",
    "cta.getPlan": "هات خطة DFY",
    "cta.seeProof": "شوف شغلنا",
    "cta.seeSolutions": "شوف الحلول",
    "cta.choosePage": "اختار صفحتك",
    "hero.badge": "بنِبني براندات — DFY",
    "hero.h1": "براند ← بناء ← طلب.",
    "hero.h1.sub": "DFY من الأول للآخر.",
    "hero.p": "براند قوي + ويب + طلب، كنظام واحد — من غير فوضى ولا تسليمات متقطعة.",
    "hero.chip.1": "2–4 أسابيع لحد ما تبقى جاهز للإطلاق",
    "hero.chip.2": "سبرنتات بنطاق ثابت",
    "hero.chip.3": "تطبيقات + صفحات سيرة + حجز + ERP",
    "hero.chip.4": "SEO + ظهور في أنظمة الذكاء",
    "lang.label": "اللغة",

    "home.successTeaser.title": "قصص نجاح حسب المجال",
    "home.successTeaser.subtitle": "نتايج بالأرقام — مرتبطة بالتحويل والوركفلو.",
    "home.successTeaser.cta": "شوف كل الصفحات",
    "home.successTeaser.view": "شوف النتايج",

    "persona.breakingTrust": "إيه اللي مكسّر الثقة؟",
    "persona.buildInstead": "إحنا بنبني إيه بدل كده؟",
    "persona.successStories": "قصص نجاح",
    "persona.successStories.subtitle": "نتايج قابلة للقياس — ومربوطة بالتحويل واعتماد السيستم.",
    "persona.timeframe": "المدة",
    "persona.shipped": "إحنا سلّمنا إيه؟",
    "persona.recommendedSolutions": "الحلول المقترحة",
    "persona.recommendedSolutions.subtitle": "أسرع طريق للنتيجة. اختار حل واحد أو ادمجهم كنظام DFY.",
    "persona.seeAllSolutions": "شوف كل الحلول",

    "persona.marketingPsychology": "سيكولوجية التسويق (بشكل محترم)",
    "persona.marketingPsychology.subtitle": "الديزاين البريميوم مش زينة — بيقلل الحمل الذهني وبيعلي الانطباع بالكفاءة عشان العميل الصح يقرر أسرع.",

    "home.premiumSystem.title": "النظام البريميوم (٤ خطوات)",
    "home.premiumSystem.p1.t": "تمركز",
    "home.premiumSystem.p1.d": "قصة واضحة الناس بتكررها.",
    "home.premiumSystem.p2.t": "موقع بريميوم",
    "home.premiumSystem.p2.d": "تحويل أولًا… سريع وقابل للقياس.",
    "home.premiumSystem.p3.t": "Content Engine",
    "home.premiumSystem.p3.d": "كونتنت على البراند مع AI + مراجعة.",
    "home.premiumSystem.p4.t": "ظهور AI",
    "home.premiumSystem.p4.d": "SEO/AEO/LLMSEO عشان تتذكر وتتذكر.",

    "home.trust.sprints.k": "مراحل",
    "home.trust.sprints.v": "نطاق ثابت. متابعة أسبوعية.",
    "home.trust.handover.k": "تسليم",
    "home.trust.handover.v": "قوالب + توثيق جاهز.",
    "home.trust.ai.k": "ظهور AI",
    "home.trust.ai.v": "جاهزية SEO/AEO/LLMSEO.",

    "home.scrollStopper.eyebrow": "بنشتغل لمين؟",
    "home.scrollStopper.title": "محامين. دكاترة. رجال أعمال.",
    "home.scrollStopper.subtitle": "نفس المشكلة: ثقة + طلب + ووركفلو.",
    "home.scrollStopper.desc": "القسم ده متثبت عمدًا عشان يركزك. اسكرول وشوف النظام بيتطبق إزاي.",
    "home.scrollStopper.progress1": "وضوح",
    "home.scrollStopper.progress2": "دليل",
    "home.scrollStopper.progress3": "تحويل",
    "home.scrollStopper.progress4": "سيستم",

    "home.chapter.law.eyebrow": "محامين",
    "home.chapter.law.title": "مواقع تبني هيبة… وتحول الاستشارات",
    "home.chapter.law.body": "وضوح + ثقة + Intake. انطباع عالي من أول اسكرول — وحجز سهل.",
    "home.chapter.law.b1": "صفحات تخصصات بتترتب",
    "home.chapter.law.b2": "حجز استشارة + فورم",
    "home.chapter.law.b3": "فلترة نوع القضية + توجيه",

    "home.chapter.med.eyebrow": "دكاترة / عيادات",
    "home.chapter.med.title": "ثقة المريض + حجز… من غير احتكاك",
    "home.chapter.med.body": "بنخلي الخدمات مفهومة، وبنوصل الحجز والتذكير عشان نقلل no-shows.",
    "home.chapter.med.b1": "صفحات خدمات + FAQ",
    "home.chapter.med.b2": "حجز أونلاين + تأكيد",
    "home.chapter.med.b3": "فروع + مراجعات + Local SEO",

    "home.chapter.biz.eyebrow": "رجال أعمال",
    "home.chapter.biz.title": "براند + طلب + ووركفلو (ERP-lite)",
    "home.chapter.biz.body": "بنرسم ووركفلو الشغل… وبنبني سيستم ماشي على واقعك.",
    "home.chapter.biz.b1": "Dashboards + بايبلاين",
    "home.chapter.biz.b2": "موافقات + صلاحيات",
    "home.chapter.biz.b3": "أتمتة + Integrations",

    "home.chapter.exec.eyebrow": "براند شخصي",
    "home.chapter.exec.title": "Bio page بتحول الانتباه لثقة",
    "home.chapter.exec.body": "صفحة واحدة بريميوم للإحالات والميديا والإعلانات — مع proof وحجز وtracking.",
    "home.chapter.exec.b1": "Credibility stack",
    "home.chapter.exec.b2": "حجز + واتساب",
    "home.chapter.exec.b3": "UTM + تتبع التحويل",


    "home.pillars.title": "الـ ٥ أعمدة",
    "home.pillars.subtitle": "نظام واحد متداخل: تمركز، هوية، ويب، كونتنت، وظهور (SEO/AEO/LLMSEO). عمود لكل قرار—من غير زحمة.",
    "home.pillars.cta": "شوف الحلول",
    "home.pillars.concierge": "Concierge partner",
    "home.pillars.ongoing": "متابعة",
    "home.pillars.conciergeDesc": "تطوير VIP بعد الإطلاق: تحديثات وتجارب وحوكمة وتحسين مستمر للـAI والبحث.",

    "home.packages.title": "باكدجات DFY جاهزة",
    "home.packages.subtitle": "اختار النطاق اللي يناسب وقتك. كل باكدج فيها tracking وتوثيق وتسليم نظيف.",
    "home.packages.mostChosen": "الأكثر اختيارًا",
    "home.packages.cta": "اطلب نطاق الشغل",

    "home.audiences.title": "مناسب لبراند شخصي، شركات، ومؤسسات",
    "home.audiences.subtitle": "نفس نظام DFY… بس بنظبط النطاق حسب السرعة والحوكمة وحجم الفريق.",

    "home.clients.title": "عملاء مختارين",
    "home.clients.subtitle": "شوية فرق اشتغلنا معاها في مجالات مختلفة. لو مجالك معقد، هنخلّي قرار العميل يبقى واضح.",
    "home.clients.cta": "اشتغل مع Adawaty",

    "home.proof.title": "دليل شغل بيتسلّم",
    "home.proof.subtitle": "قصص مبنية على نتايج: تحويل، ظهور، سرعة، واعتماد.",
    "home.proof.view": "شوف القصة",
    "home.proof.browseAll": "شوف الكل",

    "home.packages.starter.t": "ستارتر",
    "home.packages.starter.tag": "براند شخصي / بداية",
    "home.packages.starter.b1": "سبرنت تمركز",
    "home.packages.starter.b2": "موقع صفحة واحدة بريميوم",
    "home.packages.starter.b3": "Starter kit للكونتنت",
    "home.packages.starter.b4": "أساسيات ظهور AI",

    "home.packages.growth.t": "جروث",
    "home.packages.growth.tag": "شركات",
    "home.packages.growth.b1": "نظام براند + قوالب",
    "home.packages.growth.b2": "موقع متعدد الصفحات",
    "home.packages.growth.b3": "Workflow للكونتنت",
    "home.packages.growth.b4": "خطة ظهور بحث + AI",

    "home.packages.enterprise.t": "إنتربرايز",
    "home.packages.enterprise.tag": "فرق بحوكمة",
    "home.packages.enterprise.b1": "حوكمة براند + قوالب",
    "home.packages.enterprise.b2": "تقوية الأداء + SEO/AEO",
    "home.packages.enterprise.b3": "Enablement + توثيق",
    "home.packages.enterprise.b4": "Workflows AI + Guardrails",

    "home.work.subtitle": "أمثلة كبداية. ومع الوقت نستبدلها بشغل أعمق لما تنشره.",

    "work.page.title": "شغلنا",
    "work.page.subtitle": "أمثلة على نتايج: وضوح، سيستمز، وتنفيذ بريميوم. ومعاهم عملاء مختارين (ومجال كل عميل).",
    "work.clients.title": "عملاء مختارين",
    "work.clients.note": "مقسّمين حسب المجال عشان العميل يلقط السياق بسرعة.",
    "work.caseStudy.view": "شوف القصة",

    "client.sector.Engineering": "هندسة",
    "client.sector.Healthcare": "رعاية صحية",
    "client.sector.Food": "أغذية",
    "client.sector.Manufacturing": "تصنيع",
    "client.sector.Distribution": "تجارة وتوزيع",
    "client.sector.Education": "تعليم",
    "client.sector.Hosting": "استضافة",

    "client.industry.meteory": "تصنيع أنظمة سلامة ومكافحة الحريق",
    "client.industry.sparx": "هندسة أنظمة مكافحة الحريق",
    "client.industry.altawfeek": "هندسة أنظمة مكافحة الحريق",
    "client.industry.dnc": "عيادة / رعاية صحية",
    "client.industry.3a": "توريد أغذية",
    "client.industry.tawplast": "حقن بلاستيك",
    "client.industry.crownycup": "تعبئة وتغليف أغذية",
    "client.industry.el-etehad": "تصنيع أحذية سلامة صناعية",
    "client.industry.egyspring": "تصنيع (سوست/سبرنج)",
    "client.industry.nextsupply": "توزيع قهوة",
    "client.industry.hostocta": "استضافة مواقع",
    "client.industry.bello-food": "منتجات غذائية (زيتون ومخللات)",
    "client.industry.coursatee": "تعليم (تحضير اختبارات)",

    "notFound.title": "الصفحة مش موجودة",
    "notFound.subtitle": "اللينك ده مش موجود أو اتنقل.",
    "notFound.home": "ارجع للرئيسية",
    "notFound.work": "شوف شغلنا",

    "about.page.title": "الستوديو",
    "about.page.subtitle": "Adawaty ستوديو DFY للبراند والموقع والحلول — هدفه يخلّي قرار العميل سهل لأن الخوف بيختفي مع الوضوح والتسليم.",
    "about.seo.desc": "عن Adawaty: ستوديو DFY بيسلّم Brand → Build → Demand بمراحل واضحة، سيستمز، قوالب، وظهور بحث/AI.",
    "about.what.title": "بنقدّم إيه؟",
    "about.what.p1": "إحنا بنبني سيستم براند + ويب بريميوم من الأول للآخر: تمركز ورسالة، هوية، ديزاين وتطوير الموقع، وكِت إطلاق — من غير تسليمات بين ناس كتير.",
    "about.what.p2": "وكمان بنضيف Enablement للـ AI بشكل عملي: Voice kits، Workflows، وGuardrails عشان تكبّر الإنتاج من غير ما الجودة تقع.",
    "about.how.title": "بنشتغل إزاي؟",
    "about.how.items.0.t": "الوضوح أولاً",
    "about.how.items.0.d": "تمركز ورسالة قبل الشكل.",
    "about.how.items.1.t": "سيستمز مش ملفات",
    "about.how.items.1.d": "قوالب + قواعد تتطبق وتفضل ثابتة.",
    "about.how.items.2.t": "تسليم على مراحل",
    "about.how.items.2.d": "تقدّم سريع مع توافق أصحاب القرار.",
    "about.how.items.3.t": "تمكين وتسليم",
    "about.how.items.3.d": "Workflows AI + توثيق وتسليم عشان تكمل لوحدك.",
    "about.serve.title": "بنخدم مين؟",
    "about.serve.p1": "براندات شخصية، شركات، وفرق مؤسسات عايزة نتايج جاهزة للتشغيل.",
    "about.serve.list.0": "مؤسسين، مديرين، صناع محتوى",
    "about.serve.list.1": "شركات منتجات وخدمات",
    "about.serve.list.2": "فرق محتاجة سيستمز قابلة للتوسّع",

    "contact.page.title": "تواصل",
    "contact.page.subtitle": "قولنا إنت عايز تطلق إيه أو تطوّر إيه. هنرد عليك بخطوة واضحة وباقتراح نطاق DFY.",
    "contact.seo.desc": "اطلب نطاق DFY لـ Brand → Build → Demand. خطوة جاية واضحة وخطة مراحل.",
    "contact.toast.title": "وصلت رسالتك (ديمو)",
    "contact.toast.desc": "الموقع ستاتيك. لما تنشره اربطه بـ endpoint فورم حقيقي.",
    "contact.form.name": "الاسم",
    "contact.form.namePh": "اسمك",
    "contact.form.email": "الإيميل",
    "contact.form.emailPh": "name@company.com",
    "contact.form.phone": "الموبايل",
    "contact.form.phonePh": "+20 …",
    "contact.form.interested": "مهتم بإيه؟",
    "contact.form.servicePh": "اختار خدمة",
    "contact.form.notSure": "لسه مش متأكد",
    "contact.form.message": "الرسالة",
    "contact.form.messagePh": "إنت بتطلق/بتطوّر إيه؟ (براند، موقع، كونتنت، Workflows AI…)",
    "contact.form.send": "ابعت الرسالة",
    "contact.form.preferEmail": "تحب تبعت إيميل؟",
    "contact.direct.title": "خطوط مباشرة",
    "contact.direct.subtitle": "حط بيانات التواصل الرسمية هنا (موبايل/واتساب/عنوان).",
    "contact.direct.email": "الإيميل",
    "contact.direct.phone": "الموبايل",
    "contact.direct.hours": "مواعيد الشغل",
    "contact.direct.hoursValue": "الأحد–الخميس، 9:00–18:00",

    "home.howWeWork.title": "بنشتغل إزاي؟",

    "for.title": "خدمات حساسة وناس بتكبر بجد.",
    "for.subtitle": "نفس نظام DFY… بس واقع مختلف. اختار صفحتك وشوف النتايج والحلول وخطوة بخطوة.",
    "for.cta": "احجز مكالمة",
    "for.button": "شوف الخطة",

    "solutions.eyebrow": "الحلول",
    "solutions.title": "ابني اللي شغلك محتاجه.",
    "solutions.subtitle": "مش “موقع” لوحده. إحنا بنسلّم حلول كاملة تربط البراند بالتحويل وبالوركفلو.",
    "solutions.cta": "اطلب نطاق الشغل",
    "solutions.dfytag": "DFY",
    "solutions.view": "شوف التسليمات",
    "solutions.steps.title": "تسليم خطوة بخطوة (من غير فوضى)",
    "solutions.steps.subtitle": "مراحل DFY عشان تبقى عارف اللي جاي: هتاخد إيه وإمتى وإحنا محتاجين منك إيه.",
    "solutions.step0.t": "الخطوة 0 — تثبيت النطاق",
    "solutions.step0.d": "فهم الهدف والقيود والاتفاق على خطة واضحة.",
    "solutions.step1.t": "الخطوة 1 — الهيكلة",
    "solutions.step1.d": "رحلة المستخدم + هيكلة الصفحات/التطبيق + خطة تحويل.",
    "solutions.step2.t": "الخطوة 2 — الديزاين",
    "solutions.step2.d": "بروتوتايب + نظام UI بريميوم سهل يتكرر.",
    "solutions.step3.t": "الخطوة 3 — التنفيذ",
    "solutions.step3.d": "تطوير + ربط الأدوات + قياس وتتبع.",
    "solutions.step4.t": "الخطوة 4 — الإطلاق",
    "solutions.step4.d": "اختبار + نشر + تحليلات + تسليم توثيق.",
    "solutions.stepPost.t": "بعدها — شراكة",
    "solutions.stepPost.d": "تجارب وتحسين مستمر: SEO/AI visibility وتطوير.",





  },
};

const rtlLangs: Lang[] = ["ar"];

function detectInitialLang(): Lang {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const qp = (url.searchParams.get("lang") || "").toLowerCase();
    const fromUrl = (qp === "en" || qp === "fr" || qp === "es" || qp === "de" || qp === "ar") ? (qp as Lang) : null;
    if (fromUrl) return fromUrl;

    const stored = localStorage.getItem("adawaty_lang") as Lang | null;
    if (stored && dictionaries[stored]) return stored;
  }

  if (typeof navigator !== "undefined") {
    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("de")) return "de";
    if (nav.startsWith("ar")) return "ar";
  }
  return "en";
}

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
};

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang());

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("adawaty_lang", l);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", l);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const dir: "rtl" | "ltr" = rtlLangs.includes(lang) ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key;

  const value = useMemo<I18nCtx>(() => ({ lang, setLang, dir, t }), [lang, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
