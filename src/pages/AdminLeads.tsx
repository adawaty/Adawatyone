/*
Cairo Circuit Futurism — Admin Leads + CRM + Site Editor
Auth:
- Admin email/password session via /api/admin-session
- Header: x-admin-token
Default admin credentials (fallback, can be overridden by Vercel env):
- email: alazzeh.ml@gmail.com
- password: Adawaty!!26
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { getServices } from "@/lib/contentLocalized";
import {
  adminCrm,
  adminLogin,
  adminSiteGet,
  adminSiteSave,
  fetchAdminLeads,
  getAdminToken,
  setAdminToken,
} from "@/lib/adminAuthApi";

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

  const [email, setEmail] = useState("alazzeh.ml@gmail.com");
  const [password, setPassword] = useState("Adawaty!!26");

  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<string>("all");
  const [serviceInterest, setServiceInterest] = useState<string>("all");
  const [items, setItems] = useState<any[]>([]);

  // Site editor state
  const [cmsSlug, setCmsSlug] = useState("home");
  const [cmsJson, setCmsJson] = useState("{}\n");

  const strings = {
    title: dir === "rtl" ? "لوحة الإدارة" : "Admin Dashboard",
    subtitle:
      dir === "rtl"
        ? "ليدز + CRM + محرر الموقع. تسجيل الدخول بالإيميل والباسورد."
        : "Leads + CRM + site editor. Login with email + password.",
    loginTitle: dir === "rtl" ? "تسجيل دخول الإدارة" : "Admin login",
    loginHint:
      dir === "rtl"
        ? "اكتب إيميل الإدارة والباسورد."
        : "Enter admin email + password.",
    login: dir === "rtl" ? "دخول" : "Login",
    logout: dir === "rtl" ? "تسجيل خروج" : "Logout",
    filters: dir === "rtl" ? "فلاتر" : "Filters",
    status: dir === "rtl" ? "الحالة" : "Status",
    service: dir === "rtl" ? "الخدمة" : "Service interest",
    refresh: dir === "rtl" ? "تحديث" : "Refresh",
    allServices: dir === "rtl" ? "كل الخدمات" : "All services",
    tableEmpty: dir === "rtl" ? "مفيش ليدز" : "No leads.",
    unauthorized: dir === "rtl" ? "مش مصرح" : "Unauthorized",
  };

  async function loadLeads() {
    setLoading(true);
    const res = await fetchAdminLeads({
      status: status === "all" ? undefined : status,
      service_interest: serviceInterest === "all" ? undefined : serviceInterest,
      limit: 200,
    });
    setLoading(false);

    if (!res.ok) {
      if (res.status === 401) toast.error(strings.unauthorized);
      else toast.error(dir === "rtl" ? `مشكلة سيرفر (${res.status})` : `Server error (${res.status})`);
      return;
    }
    setItems(res.data?.items ?? []);
  }

  useEffect(() => {
    setAuthed(!!getAdminToken());
  }, []);

  useEffect(() => {
    if (!authed) return;
    loadLeads();
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
                setLoading(true);
                const r = await adminLogin(email.trim(), password);
                setLoading(false);
                if (!r.ok) {
                  toast.error(strings.unauthorized);
                  return;
                }
                toast.success(dir === "rtl" ? "تم" : "Logged in");
                setAuthed(true);
              }}
            >
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              </div>
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "باسورد" : "Password"}</Label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
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
                    <Button variant="secondary" className="bg-white/6 hover:bg-white/10" onClick={() => loadLeads()} disabled={loading}>
                      {strings.refresh}
                    </Button>
                    <Button
                      variant="secondary"
                      className="bg-white/6 hover:bg-white/10"
                      onClick={() => {
                        setAdminToken(null);
                        setAuthed(false);
                      }}
                    >
                      {strings.logout}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <details className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <summary className="cursor-pointer text-sm font-semibold">CRM — create client/project</summary>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Client email</Label>
                    <Input id="crm-client-email" placeholder="client@company.com" />
                    <Label>Name</Label>
                    <Input id="crm-client-name" placeholder="Client name" />
                    <Label>Password</Label>
                    <Input id="crm-client-pass" type="password" placeholder="••••••" />
                    <Button
                      className="mt-2"
                      onClick={async () => {
                        const email = (document.getElementById("crm-client-email") as HTMLInputElement)?.value?.trim();
                        const name = (document.getElementById("crm-client-name") as HTMLInputElement)?.value?.trim();
                        const pass = (document.getElementById("crm-client-pass") as HTMLInputElement)?.value?.trim();
                        if (!email || !pass) {
                          toast.error(dir === "rtl" ? "اكتب الإيميل والباسورد" : "Email + password required");
                          return;
                        }
                        const r = await adminCrm({ action: "create_client", email, name, password: pass });
                        if (!r.ok) {
                          toast.error(r.data?.error || strings.unauthorized);
                          return;
                        }
                        toast.success(dir === "rtl" ? "اتحفظ" : "Saved");
                      }}
                    >
                      Save client
                    </Button>
                  </div>

                  <div className="grid gap-2">
                    <Label>Client email</Label>
                    <Input id="crm-proj-email" placeholder="client@company.com" />
                    <Label>Project title</Label>
                    <Input id="crm-proj-title" placeholder="e.g. Website + AI Visibility" />
                    <Label>Start date</Label>
                    <Input id="crm-proj-start" type="date" />
                    <Label>Selected services (JSON array)</Label>
                    <Textarea id="crm-proj-services" rows={4} className="font-mono text-xs" defaultValue="[]" />
                    <Label>Total USD</Label>
                    <Input id="crm-proj-total" type="number" defaultValue="0" />
                    <Button
                      className="mt-2"
                      onClick={async () => {
                        const email = (document.getElementById("crm-proj-email") as HTMLInputElement)?.value?.trim();
                        const title = (document.getElementById("crm-proj-title") as HTMLInputElement)?.value?.trim();
                        const start = (document.getElementById("crm-proj-start") as HTMLInputElement)?.value;
                        const servicesTxt = (document.getElementById("crm-proj-services") as HTMLTextAreaElement)?.value || "[]";
                        const total = Number((document.getElementById("crm-proj-total") as HTMLInputElement)?.value || 0);
                        let parsed: any = [];
                        try {
                          parsed = JSON.parse(servicesTxt);
                        } catch {
                          toast.error(dir === "rtl" ? "JSON غلط" : "Invalid JSON");
                          return;
                        }
                        if (!email || !title) {
                          toast.error(dir === "rtl" ? "اكتب الإيميل والعنوان" : "Email + title required");
                          return;
                        }
                        const r = await adminCrm({ action: "create_project", client_email: email, title, start_date: start || null, selected_services: parsed, total_usd: total });
                        if (!r.ok) {
                          toast.error(r.data?.error || (dir === "rtl" ? "فشل" : "Failed"));
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
                    <Input value={cmsSlug} onChange={(e) => setCmsSlug(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>content_json</Label>
                    <Textarea value={cmsJson} onChange={(e) => setCmsJson(e.target.value)} rows={10} className="font-mono text-xs" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="bg-white/6 hover:bg-white/10"
                      onClick={async () => {
                        const r = await adminSiteGet(cmsSlug);
                        if (!r.ok) {
                          toast.error(r.data?.error || strings.unauthorized);
                          return;
                        }
                        setCmsJson(JSON.stringify(r.data?.page?.content_json ?? {}, null, 2));
                        toast.success(dir === "rtl" ? "اتحمل" : "Loaded");
                      }}
                    >
                      Load
                    </Button>
                    <Button
                      onClick={async () => {
                        let parsed: any;
                        try {
                          parsed = JSON.parse(cmsJson || "{}");
                        } catch {
                          toast.error(dir === "rtl" ? "JSON غلط" : "Invalid JSON");
                          return;
                        }
                        const r = await adminSiteSave(cmsSlug, parsed);
                        if (!r.ok) {
                          toast.error(r.data?.error || strings.unauthorized);
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

            <Card className="glass rounded-2xl p-0 mt-6 overflow-hidden">
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
                    {items.map((x: any) => (
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
          </>
        )}
      </section>
    </SiteLayout>
  );
}
