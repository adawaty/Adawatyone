/*
LLM Glossary — data-first architecture

Principles:
- Each entry is a stable entity definition node.
- Keep a tight, extractable definition block (first 2–3 sentences).
- Store synonyms and related entities for internal linking + Knowledge Graph consistency.
*/

export type GlossaryEntry = {
  slug: string;
  term: string;
  shortDefinition: string; // 1 sentence
  definition: string; // 2–5 sentences, plain and factual
  synonyms?: string[];
  related?: Array<{ term: string; slug: string }>;
  sources?: Array<{ label: string; url: string }>; // optional external refs
};

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "ai-enablement",
    term: "AI Enablement",
    shortDefinition:
      "AI enablement is the process of operationalizing AI inside a business through workflows, governance, and measurement—not just tools.",
    definition:
      "AI enablement is the practical work of making AI useful in day-to-day operations. It typically includes identifying high-value use cases, defining human review and governance, integrating tools with existing systems, and measuring outcomes (time saved, quality, revenue impact).",
    synonyms: ["AI operations", "AI adoption"],
    related: [
      { term: "LLMSEO", slug: "llmseo" },
      { term: "AEO", slug: "aeo" },
      { term: "Answer Engine Optimization", slug: "answer-engine-optimization" },
    ],
    sources: [{ label: "Adawaty AI Visibility", url: "/services/ai-visibility" }],
  },
  {
    slug: "llmseo",
    term: "LLMSEO",
    shortDefinition:
      "LLMSEO is the practice of structuring web content so large language models can extract, cite, and attribute it accurately.",
    definition:
      "LLMSEO focuses on making a page easy to interpret for AI systems: clear entities, unambiguous definitions, scannable sectioning, and consistent structured data. It overlaps with technical SEO and AEO, but prioritizes extraction quality and citation likelihood in AI answers.",
    synonyms: ["LLM search optimization", "AI search optimization"],
    related: [
      { term: "AEO", slug: "aeo" },
      { term: "Answer Engine Optimization", slug: "answer-engine-optimization" },
      { term: "AI Visibility", slug: "ai-visibility" },
    ],
    sources: [{ label: "Adawaty AI Visibility", url: "/services/ai-visibility" }],
  },

  {
    slug: "aeo",
    term: "AEO",
    shortDefinition:
      "AEO (Answer Engine Optimization) is optimizing content so it can be selected as a direct answer in search and AI assistants.",
    definition:
      "AEO stands for Answer Engine Optimization. It improves the probability that a page is used to answer a question by making intent coverage, definitions, and Q&A blocks easy to extract. AEO overlaps with SEO and LLMSEO, but is primarily focused on answer selection and citation in assistant-style results.",
    synonyms: ["Answer Engine Optimization"],
    related: [
      { term: "Answer Engine Optimization (AEO)", slug: "answer-engine-optimization" },
      { term: "LLMSEO", slug: "llmseo" },
      { term: "Structured Data", slug: "structured-data" },
    ],
    sources: [{ label: "Adawaty AI Visibility", url: "/services/ai-visibility" }],
  },

  {
    slug: "answer-engine-optimization",
    term: "Answer Engine Optimization (AEO)",
    shortDefinition:
      "AEO is optimizing content so it can be selected as a direct answer in search and AI assistants.",
    definition:
      "Answer Engine Optimization (AEO) improves the probability that a page is used to answer a question. It relies on clear intent coverage, concise definitions, structured Q&A blocks, and consistent entity naming across the site.",
    synonyms: ["AI answer optimization"],
    related: [
      { term: "AEO", slug: "aeo" },
      { term: "LLMSEO", slug: "llmseo" },
      { term: "Structured Data", slug: "structured-data" },
    ],
    sources: [{ label: "Adawaty AI Visibility", url: "/services/ai-visibility" }],
  },
  {
    slug: "structured-data",
    term: "Structured Data",
    shortDefinition:
      "Structured data is machine-readable metadata (often JSON-LD) that describes entities and relationships on a page.",
    definition:
      "Structured data helps crawlers interpret a page by explicitly stating what a page is about (entities, services, FAQs, breadcrumbs). For AI-driven search, structured data improves disambiguation and consistency across pages.",
    synonyms: ["JSON-LD"],
    related: [
      { term: "AEO", slug: "aeo" },
      { term: "FAQPage schema", slug: "faqpage-schema" },
    ],
  },
  {
    slug: "faqpage-schema",
    term: "FAQPage Schema",
    shortDefinition:
      "FAQPage schema is a structured data type that marks up question-and-answer pairs on a page.",
    definition:
      "FAQPage schema (JSON-LD) encodes questions and accepted answers in a standardized format. It can improve extraction clarity for search engines and AI systems when the on-page FAQ matches the markup exactly.",
    synonyms: ["FAQ structured data"],
    related: [{ term: "Structured Data", slug: "structured-data" }],
  },
];

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}
