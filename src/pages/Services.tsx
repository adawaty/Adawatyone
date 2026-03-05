/*
Cairo Circuit Futurism — Services (5 pillars)
- Present the blended offering as an elite, end-to-end system
- Mobile: bigger tap targets + clearer segmentation + less fear
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site } from "@/lib/content";
import type { ElementType } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { getServices } from "@/lib/contentLocalized";
import { useI18n } from "@/contexts/I18nContext";
import {
  ArrowLeft,
  ArrowRight,
  Radar,
  Shapes,
  MonitorSmartphone,
  PenLine,
  Search,
  Layers,
} from "lucide-react";

const pillarOrder = [
  "Brand Intelligence",
  "Brand System",
  "DFY Website",
  "Content Engine",
  "AI Visibility",
  "Concierge",
] as const;

const pillarMeta: Record<
  (typeof pillarOrder)[number],
  { icon: ElementType; eyebrowKey: string; noteKey: string; titleKey: string }
> = {
  "Brand Intelligence": {
    icon: Radar,
    eyebrowKey: "services.pillar.brandIntelligence.eyebrow",
    noteKey: "services.pillar.brandIntelligence.note",
    titleKey: "services.pillar.brandIntelligence.title",
  },
  "Brand System": {
    icon: Shapes,
    eyebrowKey: "services.pillar.brandSystem.eyebrow",
    noteKey: "services.pillar.brandSystem.note",
    titleKey: "services.pillar.brandSystem.title",
  },
  "DFY Website": {
    icon: MonitorSmartphone,
    eyebrowKey: "services.pillar.dfyWebsite.eyebrow",
    noteKey: "services.pillar.dfyWebsite.note",
    titleKey: "services.pillar.dfyWebsite.title",
  },
  "Content Engine": {
    icon: PenLine,
    eyebrowKey: "services.pillar.contentEngine.eyebrow",
    noteKey: "services.pillar.contentEngine.note",
    titleKey: "services.pillar.contentEngine.title",
  },
  "AI Visibility": {
    icon: Search,
    eyebrowKey: "services.pillar.aiVisibility.eyebrow",
    noteKey: "services.pillar.aiVisibility.note",
    titleKey: "services.pillar.aiVisibility.title",
  },
  Concierge: {
    icon: Layers,
    eyebrowKey: "services.pillar.concierge.eyebrow",
    noteKey: "services.pillar.concierge.note",
    titleKey: "services.pillar.concierge.title",
  },
};

export default function Services() {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const services = getServices(lang);
  const grouped = pillarOrder
    .map((pillar) => ({
      pillar,
      items: services.filter((s) => s.pillar === pillar),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <SiteLayout title={t("services.page.title")} subtitle={t("services.page.subtitle")}> 
      <SeoHead
        title={`${t("services.page.title")} | ${site.name}`}
        description={t("services.page.subtitle")}
        path="/services"
        type="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("services.page.title"),
          url: new URL("/services", site.url).toString(),
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        }}
      />

      {/* Pillars */}
      <section className="pt-8 sm:pt-10">
        <div className="grid gap-4">
          {grouped.map((g) => {
            const meta = pillarMeta[g.pillar];
            const Icon = meta.icon;

            return (
              <Card key={g.pillar} className="glass premium-card rounded-2xl p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      <div className="text-xs tracking-widest uppercase text-muted-foreground">
                        {t(meta.eyebrowKey)}
                      </div>
                    </div>
                    <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-balance">
                      {t(meta.titleKey)}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
                      {t(meta.noteKey)}
                    </p>
                  </div>

                  <Badge className="w-fit bg-white/6 border border-white/10 text-foreground">
                    {t("services.deliverablesBadge")}
                  </Badge>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {g.items.map((s) => (
                    <Card key={s.id} className="rounded-2xl border border-white/10 bg-white/3 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-lg font-semibold">
                          <Link href={`/services/${s.id}`} className="hover:text-primary transition-colors">
                            {s.title}
                          </Link>
                        </div>
                        <span className="text-[11px] rounded-full bg-white/6 border border-white/10 px-2 py-1 text-muted-foreground">
                          {t(meta.titleKey)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
                      <div className="mt-3">
                        <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                          <Link href={`/services/${s.id}`}>
                            {t("services.viewDetails")} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                          </Link>
                        </Button>
                      </div>

                      <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Audit CTA (funnel-style risk reversal) */}
      <section className="mt-12">
        <Card className="glass premium-card rounded-2xl p-6 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" aria-hidden="true" />
                <div className="text-xs tracking-widest uppercase text-muted-foreground">
                  {t("services.audit.eyebrow")}
                </div>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-balance">{t("services.audit.title")}</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{t("services.audit.subtitle")}</p>
            </div>
            <Badge className="w-fit bg-accent/20 text-accent border border-accent/40">{t("services.audit.badge")}</Badge>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="rounded-2xl border border-white/10 bg-white/3 p-6">
                <div className="text-lg font-semibold">{t(`services.audit.cards.${i}.t`)}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t(`services.audit.cards.${i}.d`)}</p>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Card className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <div className="text-sm font-medium">{t("services.audit.whatYouGet")}</div>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{t(`services.audit.list.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <div className="text-sm font-medium">{t("services.audit.howYouOutrank")}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t("services.audit.howYouOutrankDesc")}</p>
              <div className="mt-4">
                <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                  <Link href="/ai-visibility-audit">{t("services.audit.viewDetails")}</Link>
                </Button>
              </div>
            </Card>
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
}
