/*
Cairo Circuit Futurism — Work (portfolio)

Mobile goals:
- Replace "pills" with tappable cards.
- Show each client’s industry context.
- Respect RTL alignment.
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site, clients } from "@/lib/content";

// Real portfolio thumbnails captured from client sites (lightweight, visual proof)
import tMeteory from "@/assets/portfolio/client-meteory.png";
import tSparx from "@/assets/portfolio/client-sparx.png";
import tAltawfeek from "@/assets/portfolio/client-altawfeek.png";
import tDnc from "@/assets/portfolio/client-dnc.png";
import t3a from "@/assets/portfolio/client-3a.png";
import tTawplast from "@/assets/portfolio/client-tawplast.png";
import tCrownycup from "@/assets/portfolio/client-crownycup.png";
import tEtehad from "@/assets/portfolio/client-el-etehad.png";
import tEgyspring from "@/assets/portfolio/client-egyspring.png";
import tNextsupply from "@/assets/portfolio/client-nextsupply.png";
import tHostocta from "@/assets/portfolio/client-hostocta.png";
import tBello from "@/assets/portfolio/client-bello-food.png";
import tCoursatee from "@/assets/portfolio/client-coursatee.png";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getCaseStudies } from "@/lib/contentLocalized";
import { useI18n } from "@/contexts/I18nContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Work() {
  const { lang, dir, t } = useI18n();

  const thumbs: Record<string, string> = {
    meteory: tMeteory,
    sparx: tSparx,
    altawfeek: tAltawfeek,
    dnc: tDnc,
    "3a": t3a,
    tawplast: tTawplast,
    crownycup: tCrownycup,
    "el-etehad": tEtehad,
    egyspring: tEgyspring,
    nextsupply: tNextsupply,
    hostocta: tHostocta,
    "bello-food": tBello,
    coursatee: tCoursatee,
  };
  const caseStudies = getCaseStudies(lang);
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const sectorOrder = [
    "Engineering",
    "Manufacturing",
    "Healthcare",
    "Food",
    "Distribution",
    "Education",
    "Hosting",
  ] as const;

  const grouped = sectorOrder
    .map((sector) => ({
      sector,
      items: clients.filter((c) => c.sector === sector),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <SiteLayout title={t("work.page.title")} subtitle={t("work.page.subtitle")}>
      <SeoHead
        title={`${t("work.page.title")} | ${site.name}`}
        description={t("work.page.subtitle")}
        path="/work"
        type="website"
      />

      <section className="pt-10">
        <div className="glass premium-card rounded-2xl border border-white/10 bg-white/2 p-6">
          <div className="text-sm font-medium">{t("work.clients.title")}</div>
          <div className="mt-1 text-xs text-muted-foreground">{t("work.clients.note")}</div>

          <div className="mt-5 grid gap-6">
            {grouped.map((g) => (
              <div key={g.sector} className="min-w-0">
                <div
                  className={cx(
                    "text-[11px] uppercase tracking-wider text-muted-foreground",
                    dir === "rtl" ? "text-right" : "text-left"
                  )}
                >
                  {t(`client.sector.${g.sector}`)}
                </div>

                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {g.items.map((c) => (
                    <a
                      key={c.id}
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className={cx(
                        "group overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-colors hover:bg-white/6",
                        dir === "rtl" ? "text-right" : "text-left"
                      )}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/20">
                        {thumbs[c.id] ? (
                          <img
                            src={thumbs[c.id]}
                            alt={`${c.name} — website screenshot`}
                            className="h-full w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-[1.02]"
                            style={{ objectPosition: "50% 24%" }}
                            loading="lazy"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold leading-snug truncate">{c.name}</div>
                            <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{t(`client.industry.${c.id}`)}</div>
                          </div>
                          <span className="text-[11px] shrink-0 rounded-full bg-white/6 border border-white/10 px-2 py-1 text-muted-foreground">
                            {t("work.clients.live")}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <Card key={c.slug} className="glass premium-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <Badge className="bg-white/6 border border-white/10 text-foreground">{c.category}</Badge>
                <span className="text-xs text-primary">{c.highlightMetric}</span>
              </div>
              <div className="mt-3 text-lg font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="text-xs rounded-full bg-white/6 border border-white/10 px-2.5 py-1"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <Button asChild className="w-full sm:w-auto">
                  <Link href={`/work/${c.slug}`}>
                    {t("work.caseStudy.view")}
                    <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
