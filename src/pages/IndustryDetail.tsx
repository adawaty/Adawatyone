/*
Cairo Circuit Futurism — Industry detail (programmatic SEO)
- One page per industry with pains/outcomes and recommended pillars
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { site } from "@/lib/content";
import { getIndustries, getServices } from "@/lib/contentLocalized";
import { useI18n } from "@/contexts/I18nContext";
import NotFound from "@/pages/NotFound";
import { ArrowLeft, ArrowRight, Target, TrendingUp } from "lucide-react";

function formatTemplate(s: string, vars: Record<string, string>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

export default function IndustryDetail({ id }: { id: string }) {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const industries = getIndustries(lang);
  const services = getServices(lang);
  const industry = industries.find((x) => x.id === id);
  if (!industry) return <NotFound />;

  const recommended = industry.recommendedServices
    .map((sid) => services.find((s) => s.id === sid))
    .filter(Boolean) as typeof services;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: industry.seo.title,
    description: industry.seo.description,
    url: new URL(`/industries/${industry.id}`, site.url).toString(),
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  return (
    <SiteLayout title={industry.title} subtitle={industry.summary}>
      <SeoHead
        title={industry.seo.title}
        description={industry.seo.description}
        path={`/industries/${industry.id}`}
        type="article"
        jsonLd={jsonLd}
      />

      <section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="glass premium-card rounded-2xl p-7 lg:col-span-2">
            <div className="flex items-center justify-between gap-3" style={{ unicodeBidi: "plaintext" }}>
              <Badge className="bg-white/6 border border-white/10 text-foreground">{t("industry.badge")}</Badge>
              <span className="text-xs text-primary">{t("industry.tag")}</span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <Card className="rounded-2xl border border-white/10 bg-white/3 p-6">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div className="text-lg font-semibold">{t("industry.pains")}</div>
                </div>
                <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  {industry.pains.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="rounded-2xl border border-white/10 bg-white/3 p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div className="text-lg font-semibold">{t("industry.outcomes")}</div>
                </div>
                <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  {industry.outcomes.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="mt-6 circuit-divider" />

            <div className="mt-6 text-lg font-semibold">{t("industry.recommended")}</div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {recommended.map((s) => (
                <Card key={s.id} className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-base font-semibold">{s.title}</div>
                    <span className="text-[11px] rounded-full bg-white/6 border border-white/10 px-2 py-1 text-muted-foreground">
                      {s.pillar}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
                  <div className="mt-4">
                    <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                      <Link href={`/services/${s.id}`}>
                        {t("industry.viewDeliverables")} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="glass premium-card rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
            <div className="text-sm font-medium">{t("industry.side.title")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t("industry.side.body")}</p>
            <div className="mt-5 grid gap-2">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/ai-visibility-audit">
                  {t("industry.side.audit")} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                <Link href="/industries">{t("industry.side.back")}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 pb-6">
        <Card className="glass premium-card rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
          <div className="text-lg font-semibold">
            {formatTemplate(t("industry.final.title"), { industry: industry.title })}
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{t("industry.final.body")}</p>
          <div className="mt-5">
            <Button asChild size="lg" className="shadow-[0_0_40px_oklch(0.73_0.16_190/0.25)] w-full sm:w-auto">
              <Link href="/contact">{t("cta.requestScope")}</Link>
            </Button>
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
}
