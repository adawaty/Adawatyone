/*
Cairo Circuit Futurism — Lead Funnel Section
Principles:
- one clear promise + low-friction fields
- redirects to /contact with prefilled details (static site)
- bilingual via i18n keys (EN + AR)
*/

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/contexts/I18nContext";
import { getServices } from "@/lib/contentLocalized";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getFormspreeEndpoint, submitLeadToFormspree } from "@/lib/formspree";
import { submitLead } from "@/lib/adminApi";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Sparkles, Timer, ShieldCheck } from "lucide-react";

function buildPrefillUrl(base: string, params: Record<string, string>) {
  const url = new URL(base, typeof window !== "undefined" ? window.location.origin : "https://example.com");
  Object.entries(params).forEach(([k, v]) => {
    if (!v) return;
    url.searchParams.set(k, v);
  });
  return url.pathname + url.search;
}

export default function LeadFunnelSection() {
  const { t, lang, dir } = useI18n();
  const services = useMemo(() => getServices(lang), [lang]);
  const [, navigate] = useLocation();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [service, setService] = useState<string | undefined>(undefined);

  return (
    <section className="mt-16">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/6 to-white/2">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          {/* Pitch */}
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-primary/90">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t("funnel.eyebrow")}
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl font-semibold leading-[1.08] text-balance">
              {t("funnel.title")}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">{t("funnel.subtitle")}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[t("funnel.chip.1"), t("funnel.chip.2"), t("funnel.chip.3")] 
                .filter(Boolean)
                .map((x) => (
                  <span
                    key={x}
                    className="text-xs rounded-full bg-white/6 border border-white/10 px-3 py-1.5 text-muted-foreground"
                  >
                    {x}
                  </span>
                ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { Icon: Timer, k: t("funnel.proof.1.k"), v: t("funnel.proof.1.v") },
                { Icon: ShieldCheck, k: t("funnel.proof.2.k"), v: t("funnel.proof.2.v") },
                { Icon: Sparkles, k: t("funnel.proof.3.k"), v: t("funnel.proof.3.v") },
              ].map(({ Icon, k, v }) => (
                <div key={k} className="rounded-2xl border border-white/10 bg-white/3 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    {k}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="glass premium-card rounded-2xl p-6">
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = String(fd.get("name") ?? "").trim();
                const email = String(fd.get("email") ?? "").trim();
                const company = String(fd.get("company") ?? "").trim();
                const phone = String(fd.get("phone") ?? "").trim();
                const goal = String(fd.get("goal") ?? "").trim();

                const serviceLabel =
                  service && service !== "not-sure"
                    ? services.find((s) => s.id === service)?.title ?? service
                    : t("funnel.service.notSure");

                const msgLines = [
                  `${t("funnel.msgLine.company")} ${company || "-"}`,
                  `${t("funnel.msgLine.service")} ${serviceLabel}`,
                  "",
                  goal,
                ].filter(Boolean);

                const pageUrl = typeof window !== "undefined" ? window.location.href : "";
                const timestampIso = new Date().toISOString();

                submitLead({
                  name,
                  email,
                  phone,
                  company,
                  service_interest: service ?? undefined,
                  goal,
                  page_url: pageUrl,
                  lang,
                })
                  .then((r) => {
                    if (r.ok) toast.success(dir === "rtl" ? "اتسجلت" : "Saved");
                    else toast.error(dir === "rtl" ? "مقدرتش أسجل" : "Could not save");
                  })
                  .catch(() => toast.error(dir === "rtl" ? "مقدرتش أسجل" : "Could not save"));

                const endpoint = getFormspreeEndpoint();
                if (endpoint) {
                  const subject = `${t("funnel.mail.subject")}: ${name}${company ? ` / ${company}` : ""} / ${serviceLabel}`;
                  submitLeadToFormspree({
                    name,
                    email,
                    phone,
                    company,
                    serviceLabel,
                    pageUrl,
                    timestampIso,
                    lang,
                    subject,
                  })
                    .then((r) => {
                      if (r.ok) toast.success(t("funnel.mail.sent"));
                      else toast.error(t("funnel.mail.failed"));
                    })
                    .catch(() => toast.error(t("funnel.mail.failed")));
                } else {
                  toast.message(t("funnel.mail.notConfigured"));
                }

                const url = buildPrefillUrl("/contact", {
                  name,
                  email,
                  phone,
                  service: service ?? "",
                  message: msgLines.join("\n"),
                });

                navigate(url);
              }}
            >
              <div className="text-sm font-semibold">{t("funnel.form.title")}</div>
              <p className="text-xs text-muted-foreground">{t("funnel.form.subtitle")}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="f-name">{t("funnel.form.name")}</Label>
                  <Input id="f-name" name="name" required placeholder={t("funnel.form.namePh")} autoComplete="name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="f-email">{t("funnel.form.email")}</Label>
                  <Input
                    id="f-email"
                    name="email"
                    required
                    type="email"
                    placeholder={t("funnel.form.emailPh")}
                    autoComplete="email"
                    spellCheck={false}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="f-company">{t("funnel.form.company")}</Label>
                  <Input id="f-company" name="company" placeholder={t("funnel.form.companyPh")} autoComplete="organization" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="f-phone">{t("funnel.form.phone")}</Label>
                  <Input id="f-phone" name="phone" placeholder={t("funnel.form.phonePh")} autoComplete="tel" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="f-service">{t("funnel.form.interested")}</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger id="f-service" className="bg-white/3 border-white/10">
                    <SelectValue placeholder={t("funnel.form.servicePh")} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="not-sure">{t("funnel.service.notSure")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="f-goal">{t("funnel.form.goal")}</Label>
                <Textarea
                  id="f-goal"
                  name="goal"
                  required
                  placeholder={t("funnel.form.goalPh")}
                  className="min-h-28 bg-white/3 border-white/10"
                />
              </div>

              <Button type="submit" size="lg" className="shadow-[0_0_44px_oklch(0.73_0.16_190/0.25)]">
                {t("funnel.form.cta")} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
              </Button>

              <div className="text-[11px] text-muted-foreground">
                {t("funnel.form.disclaimer")}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
