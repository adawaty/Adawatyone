/*
Cairo Circuit Futurism — Industries (programmatic SEO index)
- Lists target sectors and links to detailed pages
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { site } from "@/lib/content";
import { getIndustries } from "@/lib/contentLocalized";
import { useI18n } from "@/contexts/I18nContext";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";

export default function Industries() {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const industries = getIndustries(lang);

  return (
    <SiteLayout title={t("industries.page.title")} subtitle={t("industries.page.subtitle")}>
      <SeoHead
        title={`${t("industries.page.title")} | ${site.name}`}
        description={t("industries.page.subtitle")}
        path="/industries"
        type="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("industries.page.title"),
          url: new URL("/industries", site.url).toString(),
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        }}
      />

      <section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-3">
          {industries.map((i) => (
            <Card key={i.id} className="glass premium-card rounded-2xl p-7">
              <div className="flex items-center justify-between gap-3">
                <Badge className="bg-white/6 border border-white/10 text-foreground">{t("industries.badge")}</Badge>
                <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div className="mt-3 text-xl font-semibold">{i.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{i.summary}</p>
              <div className="mt-5">
                <Button asChild className="w-full sm:w-auto">
                  <Link href={`/industries/${i.id}`}>
                    {t("industries.view")} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 pb-6">
        <Card className="glass premium-card rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
          <div className="text-lg font-semibold">{t("industries.why.title")}</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{t("industries.why.body")}</p>
          <div className="mt-5">
            <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
              <Link href="/ai-visibility-audit">{t("industries.why.cta")}</Link>
            </Button>
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
}
