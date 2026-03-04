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

                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {g.items.map((c) => (
                    <a
                      key={c.id}
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className={cx(
                        "group rounded-xl border border-white/10 bg-white/4 p-3 transition-colors hover:bg-white/8",
                        dir === "rtl" ? "text-right" : "text-left"
                      )}
                    >
                      <div className="text-sm font-medium leading-snug">{c.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{t(`client.industry.${c.id}`)}</div>
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
