/*
Cairo Circuit Futurism — Pricing Calculator (redo)
Goals:
- If nothing selected: total = 0
- Make package concept explicit and understandable
- Keep logic simple and believable
- Multi-currency live FX (USD base)

Model:
1) Choose a Package (optional) — explains what “base” means
2) Choose Pillars (optional add-ons)
3) Scale (pages, sprints, content)
4) Optional Lead Generation (starts from $99)

If user selects nothing (no package, no pillars, no scale, no leads): show 0.
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
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { ArrowLeft, ArrowRight, Calculator, Info, RefreshCcw } from "lucide-react";
import { convert, fetchFxUSD, getCachedFx, setCachedFx, type FxRates } from "@/lib/fx";

type Currency = "USD" | "EGP" | "SAR" | "EUR" | "CNY" | "JPY";
const CURRENCIES: Array<{ c: Currency; label: string }> = [
  { c: "USD", label: "USD" },
  { c: "EGP", label: "EGP" },
  { c: "SAR", label: "SAR" },
  { c: "EUR", label: "EUR" },
  { c: "CNY", label: "CNY" },
  { c: "JPY", label: "JPY" },
];

type PackageId = "none" | "starter" | "growth" | "enterprise";
const PACKAGES: Array<{ id: PackageId; title: string; usd: number; includes: string[] }> = [
  {
    id: "none",
    title: "No package (build your own)",
    usd: 0,
    includes: ["Pick only what you need."],
  },
  {
    id: "starter",
    title: "Starter package",
    usd: 299,
    includes: ["Kickoff + strategy notes", "PM + delivery system", "Basic tracking setup"],
  },
  {
    id: "growth",
    title: "Growth package",
    usd: 599,
    includes: ["Everything in Starter", "Conversion instrumentation", "QA + launch checklist"],
  },
  {
    id: "enterprise",
    title: "Enterprise package",
    usd: 999,
    includes: ["Everything in Growth", "Governance + approvals flow", "Documentation handover"],
  },
];

function fmtUsdTo(nUsd: number, currency: Currency, fx: FxRates | null) {
  const v = convert(nUsd, currency, fx);
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(v);
}

export default function PricingCalculator() {
  const { lang, dir, t } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const industries = getIndustries(lang);
  const services = getServices(lang).filter((s) => s.pillar !== "Concierge");

  const [packageId, setPackageId] = useState<PackageId>("none");
  const [industryId, setIndustryId] = useState<string>(industries[0]?.id ?? "saas");

  // Scale sliders default to 0 (so “nothing selected” becomes 0)
  const [pagesExtra, setPagesExtra] = useState<number>(0);
  const [contentExtra, setContentExtra] = useState<number>(0);
  const [sprintsExtra, setSprintsExtra] = useState<number>(0);

  // Lead-gen
  const [leadCount, setLeadCount] = useState<number>(0);
  const [leadEnrichment, setLeadEnrichment] = useState<boolean>(true);
  const [leadOutreachCopy, setLeadOutreachCopy] = useState<boolean>(false);

  const [currency, setCurrency] = useState<Currency>("USD");
  const [fx, setFx] = useState<FxRates | null>(() => getCachedFx());
  const [fxLoading, setFxLoading] = useState(false);

  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    const base: Record<string, boolean> = {};
    for (const s of services) base[s.id] = false;
    base.concierge = false;
    return base;
  });

  const industry = industries.find((x) => x.id === industryId);

  // Simple, memorable add-ons (USD)
  const addOnsUsd: Record<string, { label: string; usd: number; note: string }> = {
    "brand-intelligence": { label: "Brand Intelligence", usd: 399, note: "Positioning + ICP + offer structure." },
    "brand-system": { label: "Brand System", usd: 599, note: "Identity system + templates + rules." },
    "dfy-website": { label: "DFY Website", usd: 999, note: "Design + build + tracking." },
    "content-engine": { label: "Content Engine", usd: 299, note: "Workflow + prompt kits + calendar." },
    "ai-visibility": { label: "AI Visibility", usd: 499, note: "SEO/AEO/LLMSEO upgrades." },
    concierge: { label: "Concierge partner", usd: 99, note: "Ongoing iteration after launch." },
  };

  const leadPriceUsd = useMemo(() => {
    if (leadCount <= 0) return 0;
    const blocks = Math.ceil(leadCount / 100);
    const base = 99 + blocks * 35;
    const enrich = leadEnrichment ? blocks * 12 : 0;
    const copy = leadOutreachCopy ? 149 : 0;
    return base + enrich + copy;
  }, [leadCount, leadEnrichment, leadOutreachCopy]);

  const pkg = PACKAGES.find((p) => p.id === packageId) ?? PACKAGES[0];

  const calc = useMemo(() => {
    const packageUsd = pkg.usd;

    const pillarUsd = Object.entries(selected)
      .filter(([k, v]) => v && k !== "concierge")
      .reduce((acc, [k]) => acc + (addOnsUsd[k]?.usd ?? 0), 0);

    // Scale factors: each slider is “extra” units priced in simple steps
    const pagesUsd = pagesExtra * 35; // each extra page block
    const contentUsd = contentExtra * 15; // each extra content unit
    const sprintsUsd = sprintsExtra * 120; // extra sprint

    const subtotalUsd = packageUsd + pillarUsd + pagesUsd + contentUsd + sprintsUsd + leadPriceUsd;

    const anySelected = subtotalUsd > 0;
    const lowUsd = anySelected ? Math.round(subtotalUsd * 0.92) : 0;
    const highUsd = anySelected ? Math.round(subtotalUsd * 1.12) : 0;

    return { packageUsd, pillarUsd, pagesUsd, contentUsd, sprintsUsd, leadPriceUsd, subtotalUsd, lowUsd, highUsd };
  }, [pkg.usd, selected, pagesExtra, contentExtra, sprintsExtra, leadPriceUsd]);

  async function refreshFx() {
    try {
      setFxLoading(true);
      const data = await fetchFxUSD();
      setFx(data);
      setCachedFx(data);
    } catch {
      // keep cached
    } finally {
      setFxLoading(false);
    }
  }

  useEffect(() => {
    if (fx) return;
    refreshFx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <div className="grid gap-2 sm:col-span-2">
                <Label>Package (what “base” means)</Label>
                <Select value={packageId} onValueChange={(v) => setPackageId(v as PackageId)}>
                  <SelectTrigger className="bg-white/3 border-white/10">
                    <SelectValue placeholder="Choose a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {PACKAGES.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title} — {fmtUsdTo(p.usd, currency, fx)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground">
                  <span className="text-foreground">Base package</span> = delivery system + PM + kickoff + QA/launch checklist.
                  It’s the minimum to run a project cleanly.
                </div>
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
                <Label>Scope sliders (extras)</Label>
                <div className="text-xs text-muted-foreground">Keep 0 unless you want to scale.</div>
              </div>

              <div className="grid gap-2">
                <Label>Extra pages ({pagesExtra})</Label>
                <Slider value={[pagesExtra]} min={0} max={15} step={1} onValueChange={(v) => setPagesExtra(v[0] ?? 0)} />
                <p className="text-xs text-muted-foreground">Adds pages beyond the core set.</p>
              </div>

              <div className="grid gap-2">
                <Label>Extra sprints ({sprintsExtra})</Label>
                <Slider value={[sprintsExtra]} min={0} max={6} step={1} onValueChange={(v) => setSprintsExtra(v[0] ?? 0)} />
                <p className="text-xs text-muted-foreground">Adds delivery cycles beyond baseline.</p>
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label>Extra content units / month ({contentExtra})</Label>
                <Slider value={[contentExtra]} min={0} max={30} step={1} onValueChange={(v) => setContentExtra(v[0] ?? 0)} />
                <p className="text-xs text-muted-foreground">Used to size the content engine, approvals, and output.</p>
              </div>
            </div>

            <div className="mt-7">
              <div className="text-sm font-medium">Pillars (optional)</div>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {services.map((s) => {
                  const checked = selected[s.id] ?? false;
                  const addon = addOnsUsd[s.id];
                  return (
                    <div key={s.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-4">
                      <Checkbox
                        id={`pill-${s.id}`}
                        checked={checked}
                        onCheckedChange={(v) => setSelected((prev) => ({ ...prev, [s.id]: Boolean(v) }))}
                      />
                      <div className="min-w-0">
                        <Label htmlFor={`pill-${s.id}`} className="text-sm font-semibold">
                          {addon?.label ?? s.title}
                          <span className="ml-2 text-xs text-muted-foreground">({fmtUsdTo(addon?.usd ?? 0, currency, fx)})</span>
                        </Label>
                        <p className="mt-1 text-xs text-muted-foreground">{addon?.note ?? s.summary}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-7">
              <div className="text-sm font-medium">Lead generation (starts from $99)</div>
              <p className="mt-1 text-xs text-muted-foreground">If you want outreach-ready leads, set a monthly volume.</p>

              <div className="mt-3 grid gap-4 rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="grid gap-2">
                  <Label>Leads / month ({leadCount === 0 ? "off" : leadCount})</Label>
                  <Slider value={[leadCount]} min={0} max={2000} step={50} onValueChange={(v) => setLeadCount(v[0] ?? 0)} />
                  <div className="text-xs text-muted-foreground">0 = not included.</div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/2 p-4">
                    <Checkbox id="lead-enrich" checked={leadEnrichment} onCheckedChange={(v) => setLeadEnrichment(Boolean(v))} />
                    <div className="min-w-0">
                      <Label htmlFor="lead-enrich" className="text-sm font-semibold">
                        Enrichment (+email/phone)
                        <span className="ml-2 text-xs text-muted-foreground">(scales)</span>
                      </Label>
                      <p className="mt-1 text-xs text-muted-foreground">Adds verified contacts when possible.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/2 p-4">
                    <Checkbox id="lead-copy" checked={leadOutreachCopy} onCheckedChange={(v) => setLeadOutreachCopy(Boolean(v))} />
                    <div className="min-w-0">
                      <Label htmlFor="lead-copy" className="text-sm font-semibold">
                        Outreach copy pack
                        <span className="ml-2 text-xs text-muted-foreground">(+{fmtUsdTo(149, currency, fx)})</span>
                      </Label>
                      <p className="mt-1 text-xs text-muted-foreground">3 email variants + 2 follow-ups.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Lead service estimate</div>
                  <div className="text-lg font-semibold">{fmtUsdTo(leadPriceUsd, currency, fx)}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass premium-card rounded-2xl p-7" style={{ unicodeBidi: "plaintext" }}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold">{t("pricing.estimate")}</div>
              <div className="flex items-center gap-2">
                <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
                  <SelectTrigger className="w-32 bg-white/3 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((x) => (
                      <SelectItem key={x.c} value={x.c}>
                        {x.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/6 hover:bg-white/10"
                  onClick={refreshFx}
                  disabled={fxLoading}
                  aria-label="Refresh exchange rates"
                >
                  <RefreshCcw className={fxLoading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                </Button>
              </div>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              Live FX: {fx?.time_last_update_unix ? new Date(fx.time_last_update_unix * 1000).toLocaleString() : "loading…"}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-6">
              <div className="text-xs text-muted-foreground">{t("pricing.range")}</div>
              <div className="mt-2 text-3xl sm:text-4xl font-semibold">{fmtUsdTo(calc.lowUsd, currency, fx)} – {fmtUsdTo(calc.highUsd, currency, fx)}</div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" aria-hidden="true" />
                  If you select nothing, this shows 0. Add only what you need.
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium">Breakdown (USD base)</div>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Package</span>
                  <span className="text-foreground">{fmtUsdTo(calc.packageUsd, currency, fx)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pillars</span>
                  <span className="text-foreground">{fmtUsdTo(calc.pillarUsd, currency, fx)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Extra pages</span>
                  <span className="text-foreground">{fmtUsdTo(calc.pagesUsd, currency, fx)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Extra content</span>
                  <span className="text-foreground">{fmtUsdTo(calc.contentUsd, currency, fx)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Extra sprints</span>
                  <span className="text-foreground">{fmtUsdTo(calc.sprintsUsd, currency, fx)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Lead generation</span>
                  <span className="text-foreground">{fmtUsdTo(calc.leadPriceUsd, currency, fx)}</span>
                </div>

                <div className="mt-2 circuit-divider" />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-foreground">Subtotal</span>
                  <span className="text-foreground">{fmtUsdTo(calc.subtotalUsd, currency, fx)}</span>
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
                <Link href="/solutions/lead-generation">See lead generation details</Link>
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
