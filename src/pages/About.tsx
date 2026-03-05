/*
Cairo Circuit Futurism — About
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/contexts/I18nContext";
import founderImg from "@/assets/founder-placeholder.png";

export default function About() {
  const { t } = useI18n();

  const howWeWork = [
    { t: t("about.how.items.0.t"), d: t("about.how.items.0.d") },
    { t: t("about.how.items.1.t"), d: t("about.how.items.1.d") },
    { t: t("about.how.items.2.t"), d: t("about.how.items.2.d") },
    { t: t("about.how.items.3.t"), d: t("about.how.items.3.d") },
  ];

  const whoWeServe = [
    t("about.serve.list.0"),
    t("about.serve.list.1"),
    t("about.serve.list.2"),
  ];

  return (
    <SiteLayout title={t("about.page.title")} subtitle={t("about.page.subtitle")}>
      <SeoHead
        title={`${t("about.page.title")} | ${site.name}`}
        description={t("about.seo.desc")}
        path="/about"
        type="website"
      />
      <section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="glass premium-card rounded-2xl p-7 lg:col-span-2">
            <div className="text-lg font-semibold">{t("about.what.title")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t("about.what.p1")}</p>
            <p className="mt-4 text-sm text-muted-foreground">{t("about.what.p2")}</p>

            <div className="mt-6 circuit-divider" />

            <div className="mt-6 text-lg font-semibold">{t("about.how.title")}</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {howWeWork.map((x) => (
                <div key={x.t} className="rounded-2xl border border-white/10 bg-white/3 p-5">
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{x.d}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass premium-card rounded-2xl p-7">
            <div className="text-lg font-semibold">{t("about.serve.title")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t("about.serve.p1")}</p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {whoWeServe.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          <Card className="glass premium-card rounded-2xl p-7 lg:col-span-2">
            <div className="text-lg font-semibold">{t("about.founder.title")}</div>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{t("about.founder.subtitle")}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-[180px_1fr]">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/4">
                <img src={founderImg} alt="Adawaty founder portrait" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <div className="text-base font-semibold">{t("about.founder.name")}</div>
                <div className="mt-1 text-xs tracking-wide uppercase text-primary/90" style={{ unicodeBidi: "plaintext" }}>
                  {t("about.founder.role")}
                </div>
                <p className="mt-3 text-sm text-muted-foreground" style={{ unicodeBidi: "plaintext" }}>
                  {t("about.founder.body")}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass premium-card rounded-2xl p-7">
            <div className="text-lg font-semibold">{t("about.testimonials.title")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t("about.testimonials.subtitle")}</p>

            <div className="mt-5 grid gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/3 p-5">
                  <div className="text-sm" style={{ unicodeBidi: "plaintext" }}>
                    {t(`about.testimonials.${i}.q`)}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{t(`about.testimonials.${i}.n`)}</span>
                    <span className="opacity-50"> — </span>
                    <span>{t(`about.testimonials.${i}.t`)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </section>
    </SiteLayout>
  );
}
