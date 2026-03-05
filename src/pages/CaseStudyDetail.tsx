/*
Cairo Circuit Futurism — Case Study detail (updated)
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site } from "@/lib/content";
import { getCaseStudyBySlug } from "@/lib/contentLocalized";
import { useI18n } from "@/contexts/I18nContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CaseStudyDetail({ slug }: { slug: string }) {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const c = getCaseStudyBySlug(lang, slug);

  if (!c) {
    return (
      <SiteLayout title={t("case.notFound.title")} subtitle={t("case.notFound.subtitle")}>
        <div className="pt-10">
          <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
            <Link href="/work">
              <Arrow className={dir === "rtl" ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} /> {t("case.backWork")}
            </Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout title={c.title} subtitle={c.summary}>
      <SeoHead
        title={`${c.title} | ${site.name}`}
        description={c.summary}
        path={`/work/${c.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.title,
          description: c.summary,
          mainEntityOfPage: new URL(`/work/${c.slug}`, site.url).toString(),
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
        }}
      />

      <section className="pt-10" style={{ unicodeBidi: "plaintext" }}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-white/6 border border-white/10 text-foreground">{c.category}</Badge>
          <span className="text-sm text-primary">{c.highlightMetric}</span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="glass rounded-2xl p-6 lg:col-span-2">
            <div className="text-sm font-medium">{t("case.challenge")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{c.challenge}</p>

            <div className="mt-6 text-sm font-medium">{t("case.solution")}</div>
            <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
              {c.solution.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-sm font-medium">{t("case.results")}</div>
            <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
              {c.results.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="glass rounded-2xl p-6">
            <div className="text-sm font-medium">{t("case.themes")}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.tools.map((tool) => (
                <span key={tool} className="text-xs rounded-full bg-white/6 border border-white/10 px-2.5 py-1">
                  {tool}
                </span>
              ))}
            </div>

            <div className="mt-6 circuit-divider" />

            <div className="mt-6 text-sm font-medium">{t("case.wantSimilar")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t("case.wantSimilar.body")}</p>
            <div className="mt-4 grid gap-2">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  {t("cta.book")} <ArrowRight className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                <Link href="/work">
                  <ArrowLeft className={dir === "rtl" ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} /> {t("case.back")}
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
