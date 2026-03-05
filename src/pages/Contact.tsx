/*
Cairo Circuit Futurism — Contact
- Local-only form (no backend). On submit: toast.
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { getServices } from "@/lib/contentLocalized";

export default function Contact() {
  const { lang, t } = useI18n();
  const [service, setService] = useState<string | undefined>(undefined);
  const [prefill, setPrefill] = useState<{ name?: string; email?: string; phone?: string; message?: string; service?: string }>({});
  const services = getServices(lang);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const p = {
      name: url.searchParams.get("name") ?? undefined,
      email: url.searchParams.get("email") ?? undefined,
      phone: url.searchParams.get("phone") ?? undefined,
      message: url.searchParams.get("message") ?? undefined,
      service: url.searchParams.get("service") ?? undefined,
    };
    setPrefill(p);
    if (p.service) setService(p.service);
  }, []);

  return (
    <SiteLayout title={t("contact.page.title")} subtitle={t("contact.page.subtitle")}>
      <SeoHead
        title={`${t("contact.page.title")} | ${site.name}`}
        description={t("contact.seo.desc")}
        path="/contact"
        type="website"
      />
      <section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="glass rounded-2xl p-7 lg:col-span-2">
            <form
              className="grid gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success(t("contact.toast.title"), {
                  description: t("contact.toast.desc"),
                });
                (e.currentTarget as HTMLFormElement).reset();
                setService(undefined);
                setPrefill({});
                if (typeof window !== "undefined") {
                  const url = new URL(window.location.href);
                  ["name", "email", "phone", "service", "message"].forEach((k) => url.searchParams.delete(k));
                  window.history.replaceState({}, "", url.toString());
                }
              }}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder={t("contact.form.namePh")}
                    defaultValue={prefill.name}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    required
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder={t("contact.form.emailPh")}
                    defaultValue={prefill.email}
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={t("contact.form.phonePh")}
                    defaultValue={prefill.phone}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service">{t("contact.form.interested")}</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger id="service" className="bg-white/3 border-white/10">
                      <SelectValue placeholder={t("contact.form.servicePh")} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="not-sure">{t("contact.form.notSure")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="service" value={service ?? ""} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">{t("contact.form.message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder={t("contact.form.messagePh")}
                  className="min-h-32 bg-white/3 border-white/10"
                  defaultValue={prefill.message}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg">
                  {t("contact.form.send")}
                </Button>
                <div className="text-xs text-muted-foreground">
                  {t("contact.form.preferEmail")} {" "}
                  <a className="underline hover:text-foreground" href="mailto:alazzeh.ml@gmail.com">
                    alazzeh.ml@gmail.com
                  </a>
                </div>
              </div>
            </form>
          </Card>

          <Card className="glass rounded-2xl p-7">
            <div className="text-lg font-semibold">{t("contact.direct.title")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t("contact.direct.subtitle")}</p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="text-sm font-semibold">{t("contact.direct.email")}</div>
                <a
                  className="mt-1 block text-sm text-muted-foreground underline hover:text-foreground"
                  href="mailto:alazzeh.ml@gmail.com"
                >
                  alazzeh.ml@gmail.com
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="text-sm font-semibold">{t("contact.direct.phone")}</div>
                <div className="mt-1 text-sm text-muted-foreground">+20 10 0000 0000</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="text-sm font-semibold">{t("contact.direct.hours")}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t("contact.direct.hoursValue")}</div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
