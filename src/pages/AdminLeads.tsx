/*
Cairo Circuit Futurism — Admin Leads Dashboard
- PIN auth (x-admin-pin)
- Same-origin Vercel serverless functions:
  - GET /api/admin-leads (requires x-admin-pin)
  - POST /api/public-leads

Fixes:
- Prevent “enters then goes back”: validate PIN via API before setting authed.
- Mobile UX: render lead cards on small screens instead of a clipped wide table.
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { fetchLeads, getAdminPin, setAdminPin, type LeadItem } from "@/lib/adminApi";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/contexts/I18nContext";
import { getServices } from "@/lib/contentLocalized";

const STATUS_OPTIONS = [
  { v: "all", labelEn: "All", labelAr: "الكل" },
  { v: "new", labelEn: "New", labelAr: "جديد" },
  { v: "contacted", labelEn: "Contacted", labelAr: "تم التواصل" },
  { v: "qualified", labelEn: "Qualified", labelAr: "مؤهل" },
  { v: "won", labelEn: "Won", labelAr: "اتقفل" },
  { v: "lost", labelEn: "Lost", labelAr: "اترفض" },
];

function fmt(dt: string) {
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return dt;
  }
}

export default function AdminLeads() {
  const { dir, lang } = useI18n();
  const services = useMemo(() => getServices(lang), [lang]);

  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);

  const [status, setStatus] = useState<string>("all");
  const [serviceInterest, setServiceInterest] = useState<string>("all");

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<LeadItem[]>([]);

  const strings = {
    title: dir === "rtl" ? "لوحة الإدارة — الليدز" : "Admin Dashboard — Leads",
    subtitle: dir === "rtl" ? "شوف وفِلتر كل الليدز اللي اتجمعت من الموقع." : "View and filter all collected leads.",
    loginTitle: dir === "rtl" ? "تسجيل دخول الإدارة" : "Admin login",
    loginHint: dir === "rtl" ? "اكتب كود الإدارة (PIN)." : "Enter the admin PIN.",
    login: dir === "rtl" ? "دخول" : "Unlock",
    logout: dir === "rtl" ? "تسجيل خروج" : "Lock",
    filters: dir === "rtl" ? "فلاتر" : "Filters",
    status: dir === "rtl" ? "الحالة" : "Status",
    service: dir === "rtl" ? "الخدمة" : "Service interest",
    refresh: dir === "rtl" ? "تحديث" : "Refresh",
    allServices: dir === "rtl" ? "كل الخدمات" : "All services",
    tableEmpty: dir === "rtl" ? "مفيش ليدز مطابقة للفلاتر الحالية." : "No leads match the current filters.",
    unauthorized: dir === "rtl" ? "مش مصرح" : "Unauthorized",
    enterPin: dir === "rtl" ? "اكتب الـPIN" : "Enter PIN",
    unlocked: dir === "rtl" ? "تم" : "Unlocked",
  };

  async function loadCurrentFilters() {
    setLoading(true);
    const res = await fetchLeads({
      status: status === "all" ? undefined : status,
      service_interest: serviceInterest === "all" ? undefined : serviceInterest,
      limit: 200,
    });
    setLoading(false);

    if (!res.ok) {
      // Only treat 401 as auth failure. Other statuses are backend/DB issues.
      if (res.status === 401) {
        setItems([]);
        setAuthed(false);
        setAdminPin(null);
        toast.error(strings.unauthorized);
      } else {
        toast.error(dir === "rtl" ? "مشكلة في السيرفر/الداتا" : `Server/DB error (${res.status})`);
      }
      return { ok: false as const };
    }

    setItems(res.data?.items ?? []);
    return { ok: true as const };
  }

  async function tryUnlock(p: string) {
    setLoading(true);

    // Validate PIN without touching DB first (avoids confusing Unauthorized on DB crash)
    const pinCheck = await fetch("/api/admin-pin-check", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ pin: p }),
    }).then((r) => r.json().catch(() => null));

    if (!pinCheck?.ok) {
      setLoading(false);
      setAdminPin(null);
      setAuthed(false);
      toast.error(strings.unauthorized);
      return;
    }

    setAdminPin(p);
    setAuthed(true);
    toast.success(strings.unlocked);

    // Now try to load. If DB is broken, user will see a server error instead of being logged out.
    await loadCurrentFilters();
    setLoading(false);
  }

  useEffect(() => {
    const existing = getAdminPin();
    if (!existing) return;
    // Validate saved PIN first to avoid the “enters then goes back” flicker.
    tryUnlock(existing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authed) return;
    loadCurrentFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, status, serviceInterest]);

  return (
    <SiteLayout title={strings.title} subtitle={strings.subtitle}>
      <SeoHead title={strings.title} description={strings.subtitle} path="/admin" type="website" />

      <section className="pt-8">
        {!authed ? (
          <Card className="glass rounded-2xl p-7 max-w-xl">
            <div className="text-lg font-semibold">{strings.loginTitle}</div>
            <p className="mt-1 text-sm text-muted-foreground">{strings.loginHint}</p>

            <form
              className="mt-5 grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const p = pin.trim();
                if (!p) {
                  toast.error(strings.enterPin);
                  return;
                }
                await tryUnlock(p);
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="admin-pin">PIN</Label>
                <Input
                  id="admin-pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" size="lg" disabled={loading}>
                {strings.login}
              </Button>
            </form>
          </Card>
        ) : (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs tracking-[0.24em] uppercase text-primary/90">{strings.filters}</div>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="grid gap-2">
                    <Label>{strings.status}</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="bg-white/3 border-white/10 w-56">
                        <SelectValue placeholder={strings.status} />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((o) => (
                          <SelectItem key={o.v} value={o.v}>
                            {dir === "rtl" ? o.labelAr : o.labelEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>{strings.service}</Label>
                    <Select value={serviceInterest} onValueChange={setServiceInterest}>
                      <SelectTrigger className="bg-white/3 border-white/10 w-72">
                        <SelectValue placeholder={strings.service} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{strings.allServices}</SelectItem>
                        {services.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="not-sure">{dir === "rtl" ? "مش متأكد" : "Not sure"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="bg-white/6 hover:bg-white/10"
                      onClick={() => loadCurrentFilters()}
                      disabled={loading}
                    >
                      {strings.refresh}
                    </Button>
                    <Button
                      variant="secondary"
                      className="bg-white/6 hover:bg-white/10"
                      onClick={() => {
                        setAdminPin(null);
                        setAuthed(false);
                      }}
                    >
                      {strings.logout}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin tools (minimal file count: CRM + Site Editor live here) */}
            <div className="mt-6 grid gap-3">
              <details className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <summary className="cursor-pointer text-sm font-semibold">CRM — create client/project</summary>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="grid gap-2">
                    <div className="text-xs text-muted-foreground">Create / update client (for /portal)</div>
                    <Label>Email</Label>
                    <Input id="crm-client-email" placeholder="client@company.com" />
                    <Label>{dir === "rtl" ? "اسم" : "Name"}</Label>
                    <Input id="crm-client-name" placeholder={dir === "rtl" ? "اسم العميل" : "Client name"} />
                    <Label>PIN</Label>
                    <Input id="crm-client-pin" type="password" placeholder="••••••" />
                    <Button
                      className="mt-2"
                      onClick={async () => {
                        const email = (document.getElementById("crm-client-email") as HTMLInputElement)?.value?.trim();
                        const name = (document.getElementById("crm-client-name") as HTMLInputElement)?.value?.trim();
                        const pinVal = (document.getElementById("crm-client-pin") as HTMLInputElement)?.value?.trim();
                        if (!email || !pinVal) {
                          toast.error(dir === "rtl" ? "اكتب الإيميل والـPIN" : "Email + PIN required");
                          return;
                        }
                        const p = getAdminPin() ?? "";
                        const r = await fetch("/api/admin-crm", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", Accept: "application/json", "x-admin-pin": p },
                          body: JSON.stringify({ action: "create_client", email, name, pin: pinVal }),
                        });
                        if (!r.ok) {
                          toast.error(dir === "rtl" ? "مش مصرح / PIN غلط" : "Unauthorized / wrong PIN");
                          return;
                        }
                        toast.success(dir === "rtl" ? "تم" : "Saved");
                      }}
                    >
                      Save client
                    </Button>
                  </div>

                  <div className="grid gap-2">
                    <div className="text-xs text-muted-foreground">Create project</div>
                    <Label>{dir === "rtl" ? "إيميل العميل" : "Client email"}</Label>
                    <Input id="crm-proj-email" placeholder="client@company.com" />
                    <Label>{dir === "rtl" ? "عنوان المشروع" : "Project title"}</Label>
                    <Input id="crm-proj-title" placeholder={dir === "rtl" ? "مثلاً: Website + SEO" : "e.g. Website + AI Visibility"} />
                    <Label>{dir === "rtl" ? "تاريخ البداية" : "Start date"}</Label>
                    <Input id="crm-proj-start" type="date" />
                    <Button
                      className="mt-2"
                      onClick={async () => {
                        const email = (document.getElementById("crm-proj-email") as HTMLInputElement)?.value?.trim();
                        const title = (document.getElementById("crm-proj-title") as HTMLInputElement)?.value?.trim();
                        const start = (document.getElementById("crm-proj-start") as HTMLInputElement)?.value;
                        if (!email || !title) {
                          toast.error(dir === "rtl" ? "اكتب الإيميل والعنوان" : "Client email + title required");
                          return;
                        }
                        const p = getAdminPin() ?? "";
                        const r = await fetch("/api/admin-crm", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", Accept: "application/json", "x-admin-pin": p },
                          body: JSON.stringify({ action: "create_project", client_email: email, title, start_date: start || null }),
                        });
                        const j = await r.json().catch(() => ({}));
                        if (!r.ok) {
                          toast.error(j?.error || (dir === "rtl" ? "فشل" : "Failed"));
                          return;
                        }
                        toast.success(dir === "rtl" ? "اتعمل" : "Created");
                      }}
                    >
                      Create project
                    </Button>
                  </div>
                </div>
              </details>

              <details className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <summary className="cursor-pointer text-sm font-semibold">Site editor (Neon JSON)</summary>
                <div className="mt-4 grid gap-3">
                  <div className="grid gap-2">
                    <Label>Page slug</Label>
                    <Input id="cms-slug" defaultValue="home" />
                  </div>
                  <div className="grid gap-2">
                    <Label>content_json</Label>
                    <Textarea id="cms-json" rows={10} className="font-mono text-xs" defaultValue="{}" />
                    <div className="text-xs text-muted-foreground">Raw JSON for now. Next step is a visual block editor.</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="bg-white/6 hover:bg-white/10"
                      onClick={async () => {
                        const slug = (document.getElementById("cms-slug") as HTMLInputElement)?.value?.trim() || "home";
                        const p = getAdminPin() ?? "";
                        const r = await fetch(`/api/admin-site?slug=${encodeURIComponent(slug)}`, {
                          headers: { Accept: "application/json", "x-admin-pin": p },
                        });
                        const j = await r.json().catch(() => null);
                        if (!r.ok) {
                          toast.error(dir === "rtl" ? "مش مصرح" : "Unauthorized");
                          return;
                        }
                        (document.getElementById("cms-json") as HTMLTextAreaElement).value = JSON.stringify(j?.page?.content_json ?? {}, null, 2);
                        toast.success(dir === "rtl" ? "اتحمل" : "Loaded");
                      }}
                    >
                      Load
                    </Button>
                    <Button
                      onClick={async () => {
                        const slug = (document.getElementById("cms-slug") as HTMLInputElement)?.value?.trim() || "home";
                        const txt = (document.getElementById("cms-json") as HTMLTextAreaElement)?.value || "{}";
                        let parsed: any;
                        try {
                          parsed = JSON.parse(txt);
                        } catch (e: any) {
                          toast.error((dir === "rtl" ? "JSON غلط: " : "Invalid JSON: ") + (e?.message || ""));
                          return;
                        }
                        const p = getAdminPin() ?? "";
                        const r = await fetch(`/api/admin-site`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json", Accept: "application/json", "x-admin-pin": p },
                          body: JSON.stringify({ slug, content_json: parsed }),
                        });
                        if (!r.ok) {
                          toast.error(dir === "rtl" ? "مش مصرح" : "Unauthorized");
                          return;
                        }
                        toast.success(dir === "rtl" ? "اتحفظ" : "Saved");
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </details>
            </div>

            {/* Desktop/tablet table */}
            <Card className="glass rounded-2xl p-0 mt-6 overflow-hidden hidden sm:block">
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/4 border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-3 whitespace-nowrap">{dir === "rtl" ? "التاريخ" : "Created"}</th>
                      <th className="p-3 whitespace-nowrap">{dir === "rtl" ? "الاسم" : "Name"}</th>
                      <th className="p-3 whitespace-nowrap">{dir === "rtl" ? "الإيميل" : "Email"}</th>
                      <th className="p-3 whitespace-nowrap">{dir === "rtl" ? "موبايل" : "Phone"}</th>
                      <th className="p-3 whitespace-nowrap">{dir === "rtl" ? "شركة" : "Company"}</th>
                      <th className="p-3 whitespace-nowrap">{dir === "rtl" ? "الخدمة" : "Service"}</th>
                      <th className="p-3 whitespace-nowrap">{dir === "rtl" ? "الحالة" : "Status"}</th>
                      <th className="p-3 whitespace-nowrap">{dir === "rtl" ? "الصفحة" : "Page"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((x) => (
                      <tr key={x.id} className="border-b border-white/6 hover:bg-white/3">
                        <td className="p-3 whitespace-nowrap text-muted-foreground">{fmt(x.created_at)}</td>
                        <td className="p-3 font-medium">{x.name}</td>
                        <td className="p-3 text-muted-foreground">{x.email}</td>
                        <td className="p-3 text-muted-foreground">{x.phone ?? "-"}</td>
                        <td className="p-3 text-muted-foreground">{x.company ?? "-"}</td>
                        <td className="p-3 text-muted-foreground">{x.service_interest ?? "-"}</td>
                        <td className="p-3">
                          <span className="text-xs rounded-full bg-white/6 border border-white/10 px-2.5 py-1">{x.status}</span>
                        </td>
                        <td className="p-3 text-muted-foreground max-w-[320px] truncate" title={x.page_url ?? ""}>
                          {x.page_url ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!loading && items.length === 0 ? <div className="p-6 text-sm text-muted-foreground">{strings.tableEmpty}</div> : null}
            </Card>

            {/* Mobile cards */}
            <div className="mt-6 grid gap-3 sm:hidden">
              {items.map((x) => (
                <Card key={x.id} className="glass rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{x.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{fmt(x.created_at)}</div>
                    </div>
                    <span className="text-[11px] rounded-full bg-white/6 border border-white/10 px-2 py-1 shrink-0">{x.status}</span>
                  </div>

                  <div className="mt-3 grid gap-1 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">{dir === "rtl" ? "إيميل" : "Email"}</span>
                      <span className="truncate">{x.email}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">{dir === "rtl" ? "موبايل" : "Phone"}</span>
                      <span className="truncate">{x.phone ?? "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">{dir === "rtl" ? "شركة" : "Company"}</span>
                      <span className="truncate">{x.company ?? "-"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">{dir === "rtl" ? "الخدمة" : "Service"}</span>
                      <span className="truncate">{x.service_interest ?? "-"}</span>
                    </div>
                  </div>

                  {x.page_url ? (
                    <div className="mt-3 text-xs text-muted-foreground break-all">{x.page_url}</div>
                  ) : null}
                </Card>
              ))}

              {!loading && items.length === 0 ? <div className="text-sm text-muted-foreground">{strings.tableEmpty}</div> : null}
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
