/*
Cairo Circuit Futurism — NotFound
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <SiteLayout title={t("notFound.title")} subtitle={t("notFound.subtitle")}>
      <SeoHead title={`404 | ${site.name}`} description={t("notFound.title")} path="/404" noindex />
      <div className="pt-10 flex flex-wrap gap-2">
        <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10">
          <Link href="/">{t("notFound.home")}</Link>
        </Button>
        <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10">
          <Link href="/work">{t("notFound.work")}</Link>
        </Button>
      </div>
    </SiteLayout>
  );
}
