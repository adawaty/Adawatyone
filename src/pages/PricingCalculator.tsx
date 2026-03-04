/*
Cairo Circuit Futurism — Pricing Calculator (DFY rollout estimator)
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { site } from "@/lib/content";
import { getIndustries, getServices } from "@/lib/contentLocalized";
import { useMemo, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { ArrowLeft, ArrowRight, Calculator, Info } from "lucide-react";

type Stage = "starter" | "growth" | "enterprise";
type Currency = "EGP" | "USD";

function fmt(n: number, currency: Currency) {
  const rate = 0.020; // EGP → USD (approx; keep stable for demo)
  const value = currency === "USD" ? Math.round(n * rate) : n;
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PricingCalculator() {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const industries = getIndustries(lang);
  const services = getServices(lang).filter((s) => s.pillar !== "Concierge");

  const [stage, setStage] = useState<Stage>("growth");
  const [industryId, setIndustryId] = useState<string>(industries[0]?.id ?? "saas");
  const [pages, setPages] = useState<number>(6);
  const [sprints, setSprints] = useState<number>(3);
  const [contentPerMonth, setContentPerMonth] = useState<number>(8);
  const [currency, setCurrency] = useState<Currency>("EGP");

  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    const base: Record<string, boolean> = {};
    for (const s of services) base[s.id] = true;
    base.concierge = false;
    return base;
  });

  const industry = industries.find((x) => x.id === industryId);

  const pillarAddOns: Record<string, { label: string; egp: number; note: string }> = {
    "brand-intelligence": { label: "Brand Intelligence", egp: 35000, note: "Positioning + ICP + offer structure." },
    "brand-system": { label: "Brand System", egp: 45000, note: "Identity system + templates + rules." },
    "dfy-website": { label: "DFY Website", egp: 60000, note: "Design + build + tracking." },
    "content-engine": { label: "Content Engine", egp: 30000, note: "Workflow + prompt kits + calendar." },
    "ai-visibility": { label: "AI Visibility", egp: 40000, note: "SEO/AEO/LLMSEO upgrades." },
    concierge: { label: "Concierge partner", egp: 12000, note: "Ongoing iteration after launch." },
  };

  const calc = useMemo(() => {
    const base = stage === "starter" ? 45000 : stage === "growth" ? 65000 : 90000;

    const pillarSum = Object.entries(selected)
      .filter(([k, v]) => v && k !== "concierge")
      .reduce((acc, [k]) => acc + (pillarAddOns[k]?.egp ?? 0), 0);

    const pageFactor = Math.round(Math.max(0, pages - 5) * 2500);
    const contentFactor = Math.round(Math.max(0, contentPerMonth - 6) * 1200);
    const sprintFactor = Math.round(Math.max(0, sprints - 2) * 7000);

    const subtotal = base + pillarSum + pageFactor + contentFactor + sprintFactor;
    const low = Math.round(subtotal * 0.92);
    const high = Math.round(subtotal * 1.12);

    return { base, pillarSum, pageFactor, contentFactor, sprintFactor, subtotal, low, high };
  }, [stage, pages, contentPerMonth, sprints, selected]);

  const title = `${t("pricing.page.title")} | ${site.name}`;
  const description = t("pricing.page.subtitle");

  return (
    <SiteLayout title={t("pricing.page.title")} subtitle={t("pricing.page.subtitle")}>
      <SeoHead title={title} description={description} path="/pricing-calculator" type="website" />

      <section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Card className="glass premium-card rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
                <div className="text-lg font-semibold">{t("pricing.inputs")}</div>
              </div>
              <Badge className="bg-white/6 border border-white/10 text-foreground">{t("pricing.estimateBadge")}</Badge>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>{t("pricing.stage")}</Label>
                <Select value={stage} onValueChange={(v) => setStage(v as Stage)}>
                  <SelectTrigger className="bg-white/3 border-white/10">
                    <SelectValue placeholder={t("pricing.stage.ph")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">{t("pricing.stage.starter")}</SelectItem>
                    <SelectItem value="growth">{t("pricing.stage.growth")}</SelectItem>
                    <SelectItem value="enterprise">{t("pricing.stage.enterprise")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>{t("pricing.industry")}</Label>
                <Select value={industryId} onValueChange={setIndustryId}>
                  <SelectTrigger className="bg-white/3 border-white/10">
                    <SelectValue placeholder={t("pricing.industry.ph")} />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">{t("pricing.industry.other")}</SelectItem>
                  </SelectContent>
                </Select>
                {industry ? <p className="text-xs text-muted-foreground">{industry.summary}</p> : null}
              </div>

              <div className="grid gap-2">
                <Label>
                  {t("pricing.pages")} ({pages})
                </Label>
                <Slider value={[pages]} min={1} max={20} step={1} onValueChange={(v) => setPages(v[0] ?? 6)} />
                <p className="text-xs text-muted-foreground">{t("pricing.pages.help")}</p>
              </div>

              <div className="grid gap-2">
                <Label>
                  {t("pricing.sprints")} ({sprints})
                </Label>
                <Slider value={[sprints]} min={1} max={6} step={1} onValueChange={(v) => setSprints(v[0] ?? 3)} />
                <p className="text-xs text-muted-foreground">{t("pricing.sprints.help")}</p>
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label>
                  {t("pricing.content")} ({contentPerMonth})
                </Label>
                <Slider value={[contentPerMonth]} min={0} max={30} step={1} onValueChange={(v) => setContentPerMonth(v[0] ?? 8)} />
                <p className="text-xs text-muted-foreground">{t("pricing.content.help")}</p>
              </div>
            </div>

            <div className="mt-7">
              <div className="text-sm font-medium">{t("pricing.selectPillars")}</div>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {services.map((s) => {
                  const checked = selected[s.id] ?? false;
                  const addon = pillarAddOns[s.id];
                  return (
                    <div key={s.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4">
                      <Checkbox
                        id={`pill-${s.id}`}
                        checked={checked}
                        onCheckedChange={(v) =>
                          setSelected((prev) => ({
                            ...prev,
                            [s.id]: Boolean(v),
                          }))
                        }
                      />
                      <div className="min-w-0">
                        <Label htmlFor={`pill-${s.id}`} className="text-sm font-semibold">
                          {addon?.label ?? s.title}
                          <span className="ml-2 text-xs text-muted-foreground">({fmt(addon?.egp ?? 0, currency)})</span>
                        </Label>
                        <p className="mt-1 text-xs text-muted-foreground">{addon?.note ?? s.summary}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4">
                  <Checkbox
                    id="pill-concierge"
                    checked={selected.concierge ?? false}
                    onCheckedChange={(v) =>
                      setSelected((prev) => ({
                        ...prev,
                        concierge: Boolean(v),
                      }))
                    }
                  />
                  <div>
                    <Label htmlFor="pill-concierge" className="text-sm font-semibold">
                      {pillarAddOns.concierge.label}
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({fmt(pillarAddOns.concierge.egp, currency)}{t("pricing.concierge.perMo")})
                      </span>
                    </Label>
                    <p className="mt-1 text-xs text-muted-foreground">{pillarAddOns.concierge.note}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass premium-card rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold">{t("pricing.estimate")}</div>
              <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
                <SelectTrigger className="w-28 bg-white/3 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EGP">EGP</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-6">
              <div className="text-xs text-muted-foreground">{t("pricing.range")}</div>
              <div className="mt-2 text-3xl sm:text-4xl font-semibold">
                {fmt(calc.low, currency)} – {fmt(calc.high, currency)}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("pricing.range.note")}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium">{t("pricing.breakdown")}</div>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>{t("pricing.break.base")}</span>
                  <span className="text-foreground">{fmt(calc.base, "EGP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("pricing.break.pillars")}</span>
                  <span className="text-foreground">{fmt(calc.pillarSum, "EGP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("pricing.break.pages")}</span>
                  <span className="text-foreground">{fmt(calc.pageFactor, "EGP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("pricing.break.content")}</span>
                  <span className="text-foreground">{fmt(calc.contentFactor, "EGP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("pricing.break.sprints")}</span>
                  <span className="text-foreground">{fmt(calc.sprintFactor, "EGP")}</span>
                </div>
                <div className="mt-2 circuit-divider" />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-foreground">{t("pricing.break.subtotal")}</span>
                  <span className="text-foreground">{fmt(calc.subtotal, "EGP")}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <Button asChild size="lg" className="shadow-[0_0_40px_oklch(0.73_0.16_190/0.25)] w-full sm:w-auto">
                <Link href="/contact">
                  {t("pricing.cta.quote")} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                <Link href="/services">{t("pricing.cta.deliverables")}</Link>
              </Button>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">
              <strong className="text-foreground">{t("pricing.disclaimer.label")}</strong> {t("pricing.disclaimer.body")}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 pb-6">
        <Card className="glass premium-card rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
          <div className="text-lg font-semibold">{t("pricing.extra.title")}</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{t("pricing.extra.body")}</p>
        </Card>
      </section>
    </SiteLayout>
  );
}
