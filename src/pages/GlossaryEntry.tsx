/*
Cairo Circuit Futurism — LLM Glossary Entry Template
Strict information scent:
- H1 = term
- First block = definition (2–3 sentences max)
- Bulleted “Key points” with bolded lead terms
- Related entities + sources

Schema:
- WebPage + BreadcrumbList + (lightweight) DefinedTerm (via CreativeWork/Thing pattern)
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getGlossaryEntry } from "@/lib/glossary";
import { useI18n } from "@/contexts/I18nContext";

export default function GlossaryEntryPage({ slug }: { slug: string }) {
  const { t } = useI18n();
  const entry = getGlossaryEntry(slug);

  if (!entry) {
    return (
      <SiteLayout>
        <SeoHead title={`${site.name} | ${t("glossary.badge")}`} description={t("glossary.badge")} noindex path={`/glossary/${slug}`} />
        <main className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12">
          <h1 className="text-3xl font-semibold">{t("glossary.notFound.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("glossary.notFound.subtitle")}</p>
          <div className="mt-6">
            <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10">
              <Link href="/glossary">{t("glossary.notFound.back")}</Link>
            </Button>
          </div>
        </main>
      </SiteLayout>
    );
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Glossary", item: `${site.url}/glossary` },
      { "@type": "ListItem", position: 3, name: entry.term, item: `${site.url}/glossary/${entry.slug}` },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: entry.term,
    description: entry.shortDefinition,
    url: `${site.url}/glossary/${entry.slug}`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    about: {
      "@type": "Thing",
      name: entry.term,
      description: entry.definition,
      alternateName: entry.synonyms ?? [],
    },
  };

  return (
    <SiteLayout>
      <SeoHead
        title={`${entry.term} | Glossary | ${site.name}`}
        description={entry.shortDefinition}
        type="article"
        path={`/glossary/${entry.slug}`}
        jsonLd={[breadcrumbJsonLd, webPageJsonLd]}
      />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3">
          <div className="relative p-6 sm:p-10">
            <div className="text-xs tracking-[0.24em] uppercase text-primary/90">{t("glossary.badge")}</div>
            <h1 className="mt-3 text-3xl sm:text-5xl font-semibold leading-[1.05] text-balance">{entry.term}</h1>

            <div className="mt-5 max-w-3xl text-muted-foreground">
              <p className="text-base sm:text-lg" style={{ unicodeBidi: "plaintext" }}>
                {entry.definition}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="shadow-[0_0_40px_oklch(0.73_0.16_190/0.25)]">
                <Link href="/ai-visibility-audit">{t("glossary.cta.audit")}</Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10">
                <Link href="/services/ai-visibility">{t("glossary.cta.service")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <Card className="glass rounded-2xl p-6 lg:col-span-2">
            <div className="text-sm font-semibold">{t("glossary.keyPoints")}</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>
                <b>{t("glossary.definition")}</b> {entry.shortDefinition}
              </li>
              {entry.synonyms?.length ? (
                <li>
                  <b>{t("glossary.synonyms")}</b> {entry.synonyms.join(", ")}
                </li>
              ) : null}
              {entry.related?.length ? (
                <li>
                  <b>{t("glossary.related")}</b> {entry.related.map((r) => r.term).join(", ")}
                </li>
              ) : null}
            </ul>
          </Card>

          <Card className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold">{t("glossary.sources")}</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {(entry.sources ?? []).map((s) => (
                <li key={s.url}>
                  <a className="underline underline-offset-4 hover:text-primary" href={s.url}>
                    {s.label}
                  </a>
                </li>
              ))}
              {!entry.sources?.length ? <li>{t("glossary.sources.fallback")}</li> : null}
            </ul>
          </Card>
        </section>

        {entry.related?.length ? (
          <section className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">{t("glossary.relatedEntries")}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {entry.related.map((r) => (
                <Card key={r.slug} className="glass premium-card rounded-2xl p-6">
                  <div className="text-lg font-semibold">
                    <Link href={`/glossary/${r.slug}`} className="hover:text-primary transition-colors">
                      {r.term}
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </SiteLayout>
  );
}
