/*
Cairo Circuit Futurism — Pricing Calculator (DFY rollout estimator)
- No backend: client-side estimation
- Clear disclaimers: estimate only
*/

import { useMemo, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import { site, services, industries } from "@/lib/content";
import { ArrowRight, Calculator, Info } from "lucide-react";

type Stage = "starter" | "growth" | "enterprise";

type Currency = "EGP" | "USD";

const stageBase: Record<Stage, number> = {
  // Base DFY engagement (strategy + PM + delivery overhead)
  starter: 45000,
  growth: 120000,
  enterprise: 280000,
};

const pillarAddOns: Record<string, { label: string; egp: number; note: string }> = {
  "brand-intelligence": {
    label: "Brand Intelligence & Positioning",
    egp: 25000,
    note: "Positioning, ICP, offer architecture.",
  },
  "brand-system": {
    label: "Brand System (Identity + Assets)",
    egp: 40000,
    note: "Design system + templates.",
  },
  "dfy-website": {
    label: "DFY Website Build",
    egp: 70000,
    note: "Multi-page build + conversion instrumentation.",
  },
  "content-engine": {
    label: "Content Engine",
    egp: 35000,
    note: "Voice kit + workflows + calendar.",
  },
  "ai-visibility": {
    label: "Search + AI Visibility",
    egp: 30000,
    note: "SEO/AEO/LLMSEO foundations.",
  },
  concierge: {
    label: "Concierge partner (monthly)",
    egp: 18000,
    note: "Ongoing iteration and governance.",
  },
};

const usdRate = 50; // simple displayed rate for estimation

function fmt(n: number, currency: Currency) {
  const value = currency === "USD" ? n / usdRate : n;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "USD" ? 0 : 0,
  }).format(value);
}

export default function PricingCalculator() {
  const [currency, setCurrency] = useState<Currency>("EGP");
  const [stage, setStage] = useState<Stage>("growth");
  const [industryId, setIndustryId] = useState<string>("saas");

  // Scope inputs
  const [pages, setPages] = useState(6); // website pages
  const [contentPerMonth, setContentPerMonth] = useState(8);
  const [sprints, setSprints] = useState(3);

  // Pillar toggles
  const [selected, setSelected] = useState<Record<string, boolean>>({
    "brand-intelligence": true,
    "brand-system": stage !== "starter",
    "dfy-website": true,
    "content-engine": stage !== "starter",
    "ai-visibility": true,
    concierge: stage === "enterprise",
  });

  const industry = industries.find((x) => x.id === industryId);

  const calc = useMemo(() => {
    const base = stageBase[stage];

    // Scope multipliers (kept gentle so it feels believable)
    const pageFactor = Math.max(0, pages - 5) * 4500; // per extra page beyond 5
    const contentFactor = Math.max(0, contentPerMonth - 6) * 1800; // per extra content beyond 6/mo
    const sprintFactor = Math.max(0, sprints - 2) * 22000; // per sprint beyond 2

    const pillarSum = Object.entries(selected)
      .filter(([, v]) => v)
      .reduce((sum, [k]) => sum + (pillarAddOns[k]?.egp ?? 0), 0);

    const subtotal = base + pillarSum + pageFactor + contentFactor + sprintFactor;

    // Confidence range (+/- 12%)
    const low = Math.round(subtotal * 0.88);
    const high = Math.round(subtotal * 1.12);

    return {
      base,
      pillarSum,
      pageFactor,
      contentFactor,
      sprintFactor,
      subtotal,
      low,
      high,
    };
  }, [stage, pages, contentPerMonth, sprints, selected]);

  const title = `Pricing Calculator | ${site.name}`;
  const description =
    "Estimate the cost of a custom DFY Brand → Build → Demand rollout. Get a range and a breakdown by pillars and scope.";

  return (
    <SiteLayout
      title="Pricing calculator"
      subtitle="Get a fast estimate for your custom DFY rollout. Transparent breakdown. No surprises on the discovery call."
    >
      <SeoHead title={title} description={description} path="/pricing-calculator" type="website" />

      <section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Card className="glass premium-card rounded-2xl p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
                <div className="text-lg font-semibold">Your inputs</div>
              </div>
              <Badge className="bg-white/6 border border-white/10 text-foreground">Estimate</Badge>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Stage</Label>
                <Select value={stage} onValueChange={(v) => setStage(v as Stage)}>
                  <SelectTrigger className="bg-white/3 border-white/10">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter (personal / early)</SelectItem>
                    <SelectItem value="growth">Growth (SMB)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (governance)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Industry</Label>
                <Select value={industryId} onValueChange={setIndustryId}>
                  <SelectTrigger className="bg-white/3 border-white/10">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {industry ? (
                  <p className="text-xs text-muted-foreground">{industry.summary}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label>Website pages ({pages})</Label>
                <Slider
                  value={[pages]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={(v) => setPages(v[0] ?? 6)}
                />
                <p className="text-xs text-muted-foreground">Core pages include: Home, Services, Work, Industry, Contact.</p>
              </div>

              <div className="grid gap-2">
                <Label>Sprints ({sprints})</Label>
                <Slider
                  value={[sprints]}
                  min={1}
                  max={6}
                  step={1}
                  onValueChange={(v) => setSprints(v[0] ?? 3)}
                />
                <p className="text-xs text-muted-foreground">Each sprint ships visible outputs and approvals.</p>
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label>Content/month ({contentPerMonth})</Label>
                <Slider
                  value={[contentPerMonth]}
                  min={0}
                  max={30}
                  step={1}
                  onValueChange={(v) => setContentPerMonth(v[0] ?? 8)}
                />
                <p className="text-xs text-muted-foreground">Used to size the Content Engine and approvals.</p>
              </div>
            </div>

            <div className="mt-7">
              <div className="text-sm font-medium">Select pillars</div>
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

                {/* Concierge as optional recurring */}
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
                      <span className="ml-2 text-xs text-muted-foreground">({fmt(pillarAddOns.concierge.egp, currency)}/mo)</span>
                    </Label>
                    <p className="mt-1 text-xs text-muted-foreground">{pillarAddOns.concierge.note}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass premium-card rounded-2xl p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold">Your estimate</div>
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
              <div className="text-xs text-muted-foreground">Estimated range</div>
              <div className="mt-2 text-3xl sm:text-4xl font-semibold">
                {fmt(calc.low, currency)} – {fmt(calc.high, currency)}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Info className="h-3.5 w-3.5" aria-hidden="true" />
                  Estimate only. Final scope is confirmed on the discovery call.
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium">Breakdown (EGP)</div>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Base (delivery + PM)</span>
                  <span className="text-foreground">{fmt(calc.base, "EGP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pillars selected</span>
                  <span className="text-foreground">{fmt(calc.pillarSum, "EGP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Website scope</span>
                  <span className="text-foreground">{fmt(calc.pageFactor, "EGP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Content scale</span>
                  <span className="text-foreground">{fmt(calc.contentFactor, "EGP")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sprints</span>
                  <span className="text-foreground">{fmt(calc.sprintFactor, "EGP")}</span>
                </div>
                <div className="mt-2 circuit-divider" />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-foreground">Subtotal</span>
                  <span className="text-foreground">{fmt(calc.subtotal, "EGP")}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <Button asChild size="lg" className="shadow-[0_0_40px_oklch(0.73_0.16_190/0.25)]">
                <Link href="/contact">
                  Get a fixed quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10">
                <Link href="/services">See deliverables</Link>
              </Button>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">
              <strong className="text-foreground">Disclaimer:</strong> This tool provides a rough estimate based on typical scopes. Real pricing depends on
              timeline, approvals, content volume, integrations, and governance requirements.
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 pb-6">
        <Card className="glass premium-card rounded-2xl p-7">
          <div className="text-lg font-semibold">Want a calculator like Meteory’s “Build a Quote”? </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
            This estimator is intentionally simple so it stays believable. If you want a more granular, product-style quoting flow
            (multi-step, add-ons, downloadable PDF quote), we can ship it next.
          </p>
        </Card>
      </section>
    </SiteLayout>
  );
}
