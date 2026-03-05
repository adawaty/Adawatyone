/*
Cairo Circuit Futurism — SiteFooter (updated)
*/

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { getServices } from "@/lib/contentLocalized";

export default function SiteFooter() {
  const { lang, t } = useI18n();
  const services = getServices(lang);
  const pillars = ["brand-intelligence", "brand-system", "dfy-website", "content-engine", "ai-visibility"] as const;
  const pillarServices = services.filter((s) => (pillars as readonly string[]).includes(s.id));

  return (
    <footer className="mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <div className="text-lg font-semibold">Adawaty</div>
              <p className="mt-2 text-sm text-muted-foreground" style={{ unicodeBidi: "plaintext" }}>
                {t("footer.description")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10">
                  <a href="mailto:alazzeh.ml@gmail.com">
                    <Mail className="mr-2 h-4 w-4" /> {t("footer.email")}
                  </a>
                </Button>
                <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10">
                  <a href="tel:+201000000000">
                    <Phone className="mr-2 h-4 w-4" /> {t("footer.call")}
                  </a>
                </Button>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <div className="text-sm font-medium">{t("footer.studio")}</div>
                <div className="mt-2 flex flex-col gap-2 text-sm">
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    {t("footer.about")}
                  </Link>
                  <Link href="/work" className="text-muted-foreground hover:text-foreground">
                    {t("footer.work")}
                  </Link>
                  <Link href="/industries" className="text-muted-foreground hover:text-foreground">
                    {t("footer.industries")}
                  </Link>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    {t("footer.contact")}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">{t("nav.services")}</div>
                <div className="mt-2 flex flex-col gap-2 text-sm">
                  {pillarServices.map((s) => (
                    <Link key={s.id} href={`/services/${s.id}`} className="text-muted-foreground hover:text-foreground">
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">{t("footer.getStarted")}</div>
                <div className="mt-2 flex flex-col gap-2 text-sm">
                  <Link className="text-muted-foreground hover:text-foreground inline-flex items-center" href="/contact">
                    {t("cta.book")} <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Link className="text-muted-foreground hover:text-foreground" href="/pricing-calculator">
                    {t("nav.pricingCalc")}
                  </Link>
                  <Link className="text-muted-foreground hover:text-foreground" href="/portal">
                    {lang === "ar" ? "بوابة العميل" : "Client portal"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 circuit-divider" />
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Adawaty. {t("footer.rights")}</div>
            <div className="text-xs text-muted-foreground" style={{ unicodeBidi: "plaintext" }}>{t("footer.tagline")}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
