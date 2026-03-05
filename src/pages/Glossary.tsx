/*
Cairo Circuit Futurism — Glossary hub
Simple hub for internal linking + crawl discovery.
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { glossaryEntries } from "@/lib/glossary";
import { useI18n } from "@/contexts/I18nContext";

export default function Glossary() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <SeoHead
        title={`Glossary | ${site.name}`}
        description={t("glossary.hub.subtitle")}
        path="/glossary"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Glossary",
          url: `${site.url}/glossary`,
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        }}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div>
          <div className="text-xs tracking-[0.24em] uppercase text-primary/90">{t("glossary.badge")}</div>
          <h1 className="mt-3 text-3xl sm:text-5xl font-semibold leading-[1.05] text-balance">{t("glossary.hub.title")}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t("glossary.hub.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {glossaryEntries.map((e) => (
            <Card key={e.slug} className="glass premium-card rounded-2xl p-6">
              <div className="text-lg font-semibold">
                <Link href={`/glossary/${e.slug}`} className="hover:text-primary transition-colors">
                  {e.term}
                </Link>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{e.shortDefinition}</p>
            </Card>
          ))}
        </div>
      </main>
    </SiteLayout>
  );
}
