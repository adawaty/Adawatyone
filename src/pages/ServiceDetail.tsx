/*
Cairo Circuit Futurism — Service detail (programmatic SEO)
- One page per service to target specific query clusters
- Mobile: full-width CTAs + clear headers, less fear
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { site } from "@/lib/content";
import { getServices } from "@/lib/contentLocalized";
import { ArrowLeft, ArrowRight, Sparkles, Search, ShieldCheck } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { useI18n } from "@/contexts/I18nContext";

function getFaqs(id: string, t: (k: string) => string) {
  const map: Record<string, number> = {
    "ai-visibility": 3,
    "brand-intelligence": 2,
    "dfy-website": 1,
  };
  const count = map[id] ?? 0;
  return Array.from({ length: count }).map((_, idx) => ({
    q: t(`serviceDetail.faq.${id}.${idx}.q`),
    a: t(`serviceDetail.faq.${id}.${idx}.a`),
  }));
}

export default function ServiceDetail({ id }: { id: string }) {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const service = getServices(lang).find((s) => s.id === id);
  if (!service) return <NotFound />;

  const title = `${service.title} | ${site.name}`;
  const description = service.summary;

  const faqs = getFaqs(id, t);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    areaServed: "Worldwide",
    serviceType: service.pillar,
    offers: {
      "@type": "Offer",
      url: new URL(`/contact`, site.url).toString(),
    },
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <SiteLayout title={service.title} subtitle={t("serviceDetail.subtitle")}>
      <SeoHead
        title={title}
        description={description}
        path={`/services/${service.id}`}
        type="article"
        jsonLd={faqJsonLd ? [jsonLd, faqJsonLd] : jsonLd}
      />

      <section className="pt-8 sm:pt-10">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Card className="glass rounded-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <Badge className="bg-white/6 border border-white/10 text-foreground">{service.pillar}</Badge>
              <span className="text-xs text-primary">{t("serviceDetail.dfyTag")}</span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-balance">
              {t("serviceDetail.whatYouGet")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{service.summary}</p>

            <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
              {service.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-[0_0_40px_oklch(0.73_0.16_190/0.25)] w-full sm:w-auto">
                <Link href="/contact">
                  {t("cta.requestScope")} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                <Link href="/services">{t("serviceDetail.backToServices")}</Link>
              </Button>
            </div>
          </Card>

          <Card className="glass rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              {t("serviceDetail.aiWhy.title")}
            </div>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <div className="rounded-xl border border-white/10 bg-white/3 p-4">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Search className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t("serviceDetail.aiWhy.card0.t")}
                </div>
                <p className="mt-1">{t("serviceDetail.aiWhy.card0.d")}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/3 p-4">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t("serviceDetail.aiWhy.card1.t")}
                </div>
                <p className="mt-1">{t("serviceDetail.aiWhy.card1.d")}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {faqs.length ? (
        <section className="mt-12">
          <Card className="glass rounded-2xl p-6 sm:p-7">
            <div className="text-lg font-semibold">{t("serviceDetail.faq.title")}</div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {faqs.map((f) => (
                <Card key={f.q} className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <div className="text-base font-semibold">{f.q}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </Card>
              ))}
            </div>
          </Card>
        </section>
      ) : null}

      <section className="mt-12 pb-6">
        <Card className="glass rounded-2xl p-6 sm:p-7">
          <div className="text-lg font-semibold">{t("serviceDetail.finalCta.title")}</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{t("serviceDetail.finalCta.subtitle")}</p>
          <div className="mt-5">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/contact">{t("cta.book")}</Link>
            </Button>
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
}
