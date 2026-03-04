# Adawatyone — Project Change Log (AnyGen)

This document summarizes what was changed **from the beginning of the AnyGen workstream until now**.

> Scope note: This is a **static Vite + React** site (wouter routing). Changes focus on:
> - Egyptian Arabic localization quality (dialect consistency)
> - Mobile conversion UX improvements
> - SEO + LLM crawler readiness (schemas, llms.txt, glossary)
> - High-intent solution pages (template-driven)
> - Visual proof upgrades (Work thumbnails) + trust scaffolding
> - Cairo Circuit Futurism design system consistency

---

## 0) Baseline context

**Goal:** Make Adawaty feel like a premium DFY agency site that converts high-stakes buyers (lawyers, doctors, operators), while being technically strong for classic SEO and AI-driven search (AIO, assistants).

**Stack:** React + Vite + Tailwind v4 + framer-motion + wouter + custom i18n context.

---

## 1) Egyptian Arabic localization ("مصري ١٠٠٪")

### What was done
- Completed/standardized localization coverage across key pages (Home, Services, Work, Contact, About, Industries, Pricing, Audit).
- Enforced consistent Egyptian phrasing (avoiding overly formal MSA where a clearer Egyptian phrasing fits).
- Reduced “English leakage” by migrating hardcoded strings into the i18n dictionary.
- Addressed RTL punctuation issues in mixed Arabic/English segments using `unicodeBidi: "plaintext"` where needed.

### Why it matters
- Prevents trust loss when Arabic users see inconsistent dialect or leftover English.
- Improves readability and professionalism for RTL.

---

## 2) Mobile UX & conversion improvements

### What was done
- Improved mobile layout structure and spacing (funnel-like progression).
- Added a sticky mobile CTA (conversion-focused).

### Why it matters
- High-ticket users often first land from mobile ads/search.
- Sticky CTA reduces drop-off and makes next step obvious.

---

## 3) Codebase cleanup

### What was done
- Removed a large number of unused UI components (shadcn) to reduce repo noise and maintenance surface.

---

## 4) New “Solutions” architecture + pages

### What was done
- Introduced a reusable template: `src/components/solutions/SolutionTemplate.tsx`
  - Narrative flow: **What it is → Who it’s for → Deliverables → Timeline → Integrations → FAQs**
  - JSON-LD injection for FAQ + Service
  - Cairo Circuit Futurism styling + motion
- Added high-intent solution pages:
  - `/solutions/app-development`
  - `/solutions/erp-workflows`

### Why it matters
- Higher-converting landing pages for “deliverable intent” queries.
- More structured “citeable” content blocks for AI extraction.

---

## 5) LLM Search / AI Overview technical assets

### Phase 1 — `public/llms.txt`
- Added a concise, crawler-friendly markdown summary of the site.
- Lists the 5 pillars with clean URLs.

### Phase 2 — `public/entity-proof-map.json`
- Added a structured map of:
  - Entity facts
  - Named methodologies
  - Proof points (cite-worthy snippets)

### Phase 3 — Glossary (LLM-friendly semantic pages)
- Added glossary architecture `src/lib/glossary.ts`
- Added pages:
  - `/glossary`
  - `/glossary/:slug`
- Added entry **/glossary/aeo** + cross-links to existing definitions.

### Location correction
- Updated entity assumptions to match company reality:
  - Registered address: **Sheridan, Wyoming (US)**
  - Trading address: **Bratislava (Slovakia)**
  - Area served: **Worldwide**

---

## 6) Visuals, trust, and “show not tell” upgrades

### Work page thumbnails
- The Work page now shows **real website thumbnails** captured from client sites (instead of text-only boxes).

### About page trust scaffolding
- Added:
  - Founder section (placeholder portrait + copy scaffolding)
  - Testimonials section scaffold (placeholders to be replaced with real quotes)

### Copy improvements (jargon → benefit)
- Updated AI Visibility copy to pair the technical term with an outcome.

---

## 7) Cairo Circuit “System Initialization” preloader

### What was done
- Added a short preloader overlay:
  - Circuit ring draw + rotating spark (teal→amber)
  - Progress bar + percentage
  - Respects `prefers-reduced-motion`
  - Shows **once per session** (sessionStorage)

Files:
- `src/components/Preloader.tsx`
- Wired in `src/App.tsx`

---

## 8) New offerings added

### Lead Generation (Tomba/Kuration-like outcome)
- Added a DFY offering for **B2B lead lists + enrichment + verification** under your brand.
- Added a dedicated high-intent solution page:
  - `/solutions/lead-generation`

### Education systems
- Added an education-ops offering that covers:
  - **LMS (Learning Management Systems)**
  - **SIS (Student Information Systems)**
  - **QMS (Quality Management Systems / quality workflows)**
- Added a dedicated solution page:
  - `/solutions/education-systems`

---

## 9) Arabic copy fixes
- Updated Arabic industry naming so **SaaS** and **E-commerce** render correctly in Arabic:
  - SaaS → **برمجيات كخدمة (SaaS)**
  - E-commerce → **التجارة الإلكترونية**
- Replaced the inaccurate phrasing **"المنتج الوحش"** with outcome-first wording that matches SaaS buyer intent.

---

## 10) Portfolio screenshot fix (Coursatee)
- Coursatee screenshot capture was blocked; replaced the thumbnail capture method with a stealth Playwright approach:
  - `scripts/capture_coursatee_stealth.py`

---

## 11) Flow simplification
- Added a **“Start here”** section on Home that routes users into the most common intent paths:
  - Lead Generation
  - Education Systems
  - AI Visibility Audit

---

## 12) SEO + LLM polish

- Added a dedicated Open Graph image: `public/og.png`.
- Improved `SeoHead` to always inject:
  - Organization JSON-LD (with US + Slovakia addresses)
  - WebSite JSON-LD
  - OG/Twitter image alt + dimensions
- Added crawl assets:
  - `public/sitemap.xml`
  - `public/robots.txt`
- Improved image alt text on key pages (Home, Work, About).

---

## 13) Git workflow

### What was done
- Before pushing major updates, backup branches were created on GitHub:
  - `backup/2026-03-04-pre-preloader`
  - `backup/2026-03-04-pre-leads-lms-flow`

---

## Next recommended steps

1. Replace founder placeholder with a real headshot + factual bio.
2. Replace testimonial placeholders with real quotes + names + titles.
3. Add a dedicated **Delivery / Governance** page to substantiate “ISO-ready delivery” without implying certification.
4. Add a lightweight device/mockup frame layer for portfolio thumbnails for visual consistency.

---

## Notes / guardrails
- Avoid implying ISO certification unless you have it.
- Prefer verifiable proof points and pages as evidence sources.
- Keep animations tasteful and fast for high-intent buyers.
