/*
Cairo Circuit Futurism — AI Visibility Audit (programmatic SEO landing)
Keyword cluster target: AI visibility audit, LLM SEO audit, AEO audit, AI Overviews optimization.
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { site } from "@/lib/content";
import { useI18n } from "@/contexts/I18nContext";
import { ArrowLeft, ArrowRight, Search, ShieldCheck, Spline, BarChart3 } from "lucide-react";

export default function AiVisibilityAudit() {
  const { dir, t } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const title = `${t("audit.page.title")} | ${site.name}`;
  const description = t("audit.page.subtitle");

  const faq = [0, 1, 2].map((i) => ({
    q: t(`audit.faq.${i}.q`),
    a: t(`audit.faq.${i}.a`),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const cards = [
    { i: Search, t: t("audit.cards.0.t"), d: t("audit.cards.0.d") },
    { i: Spline, t: t("audit.cards.1.t"), d: t("audit.cards.1.d") },
    { i: ShieldCheck, t: t("audit.cards.2.t"), d: t("audit.cards.2.d") },
  ];

  return (
    <SiteLayout title={t("audit.page.title")} subtitle={t("audit.page.subtitle")}>
      <SeoHead title={title} description={description} path="/ai-visibility-audit" type="article" jsonLd={faqJsonLd} />

      <section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Card className="glass rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
            <div className="flex items-center justify-between gap-3">
              <Badge className="bg-accent/20 text-accent border border-accent/40">{t("audit.badge")}</Badge>
              <span className="text-xs text-primary">{t("audit.tag")}</span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-balance">{t("audit.what")}</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{description}</p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {cards.map((x) => (
                <Card key={x.t} className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <div className="flex items-center gap-2">
                    <x.i className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div className="text-base font-semibold">{x.t}</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                </Card>
              ))}
            </div>

            <div className="mt-6 circuit-divider" />

            <h3 className="mt-6 text-lg font-semibold">{t("audit.outputs")}</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{t(`audit.outputs.${i}`)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-[0_0_40px_oklch(0.73_0.16_190/0.25)] w-full sm:w-auto">
                <Link href="/contact">
                  {t("audit.cta")} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                <Link href="/services">{t("audit.cta.services")}</Link>
              </Button>
            </div>
          </Card>

          <Card className="glass rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
            <div className="flex items-center gap-2 text-sm font-medium">
              <BarChart3 className="h-4 w-4 text-accent" aria-hidden="true" />
              {t("audit.own.title")}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t("audit.own.body")}</p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{t(`audit.own.${i}`)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-6">
              <div className="text-sm font-medium">{t("audit.tip.title")}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t("audit.tip.body")}</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 pb-6">
        <Card className="glass rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
          <div className="text-lg font-semibold">{t("audit.faq.title")}</div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {faq.map((f) => (
              <Card key={f.q} className="rounded-2xl border border-white/10 bg-white/3 p-6">
                <div className="text-base font-semibold">{f.q}</div>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
}
