# Adawatyone — Project Change Log (AnyGen)

This document summarizes what was changed **from the beginning of the AnyGen workstream until now**.

> Scope note: This is a **static Vite + React** site (wouter routing). Changes focus on:
> - Egyptian Arabic localization quality (dialect consistency)
> - Mobile conversion UX improvements
> - SEO + LLM crawler readiness (schemas, llms.txt, glossary)
> - New solution pages using a reusable template
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
- Enforced consistent Egyptian phrasing (e.g., avoiding overly formal MSA where a clearer Egyptian phrasing fits).
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
- Added two new high-intent solution pages:
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

## 8) Git workflow

### What was done
- Before pushing new changes, a backup branch was created on GitHub:
  - `backup/2026-03-04-pre-preloader`

---

## Next recommended steps

1. Replace founder placeholder with a real headshot + factual bio.
2. Replace testimonial placeholders with real quotes + names + titles.
3. Add a dedicated **Delivery / Governance** page to substantiate “ISO-ready delivery” without implying certification.
4. Optimize portfolio thumbnails:
   - Curate crops
   - Add a lightweight “device mockup frame” layer for consistency

---

## Notes / guardrails
- Avoid implying ISO certification unless you have it.
- Prefer verifiable proof points and pages as evidence sources.
- Keep animations tasteful and fast for high-intent buyers.
