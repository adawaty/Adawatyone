/*
Cairo Circuit Futurism — Admin Leads Dashboard
- Minimal, practical admin surface
- Login (JWT) + table view

NOTE: This is a UI only. The backend must be deployed separately.
Set VITE_ADMIN_API_BASE to your backend URL (or leave empty for same-origin).
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
import { adminLogin, fetchLeads, setAdminToken, type LeadItem } from "@/lib/adminApi";
import { useI18n } from "@/contexts/I18nContext";
import { getServices } from "@/lib/contentLocalized";

const STATUS_OPTIONS = [
  { v: "", labelEn: "All", labelAr: "الكل" },
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  const [status, setStatus] = useState<string>("");
  const [serviceInterest, setServiceInterest] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<LeadItem[]>([]);

  const strings = {
    title: dir === "rtl" ? "لوحة الإدارة — الليدز" : "Admin Dashboard — Leads",
    subtitle: dir === "rtl" ? "عرض وفِلترة كل الليدز اللي اتجمعت من الموقع." : "View and filter all collected leads.",
    loginTitle: dir === "rtl" ? "تسجيل دخول الإدارة" : "Admin login",
    loginHint: dir === "rtl" ? "استخدم إيميل وباسورد الأدمن (JWT)." : "Use your admin email + password (JWT).",
    login: dir === "rtl" ? "دخول" : "Sign in",
    logout: dir === "rtl" ? "تسجيل خروج" : "Sign out",
    filters: dir === "rtl" ? "فلاتر" : "Filters",
    status: dir === "rtl" ? "الحالة" : "Status",
    service: dir === "rtl" ? "الخدمة" : "Service interest",
    refresh: dir === "rtl" ? "تحديث" : "Refresh",
    allServices: dir === "rtl" ? "كل الخدمات" : "All services",
    tableEmpty: dir === "rtl" ? "مفيش ليدز مطابقة للفلاتر الحالية." : "No leads match the current filters.",
  };

  async function load() {
    setLoading(true);
    const res = await fetchLeads({ status: status || undefined, service_interest: serviceInterest || undefined, limit: 200 });
    setLoading(false);
    if (!res.ok) {
      setAuthed(false);
      toast.error(dir === "rtl" ? "مش مصرح" : "Unauthorized");
      return;
    }
    setItems(res.data?.items ?? []);
  }

  useEffect(() => {
    if (!authed) return;
    load();
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
                const res = await adminLogin(email, password);
                if (!res.ok) {
                  toast.error(dir === "rtl" ? "بيانات الدخول غلط" : "Invalid credentials");
                  return;
                }
                const token = res.data?.token;
                if (!token) {
                  toast.error(dir === "rtl" ? "مفيش توكن" : "No token returned");
                  return;
                }
                setAdminToken(token);
                setAuthed(true);
                toast.success(dir === "rtl" ? "تم" : "Signed in");
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="admin-email">{dir === "rtl" ? "الإيميل" : "Email"}</Label>
                <Input id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="admin-pass">{dir === "rtl" ? "الباسورد" : "Password"}</Label>
                <Input id="admin-pass" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
              </div>
              <Button type="submit" size="lg">
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
                          <SelectItem key={o.v || "all"} value={o.v}>
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
                        <SelectItem value="">{strings.allServices}</SelectItem>
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
                    <Button variant="secondary" className="bg-white/6 hover:bg-white/10" onClick={() => load()} disabled={loading}>
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
                    {items.map((x) => (
                      <tr key={x.id} className="border-b border-white/6 hover:bg-white/3">
                        <td className="p-3 whitespace-nowrap text-muted-foreground">{fmt(x.created_at)}</td>
                        <td className="p-3 font-medium">{x.name}</td>
                        <td className="p-3 text-muted-foreground">{x.email}</td>
                        <td className="p-3 text-muted-foreground">{x.phone ?? "-"}</td>
                        <td className="p-3 text-muted-foreground">{x.company ?? "-"}</td>
                        <td className="p-3 text-muted-foreground">{x.service_interest ?? "-"}</td>
                        <td className="p-3">
                          <span className="text-xs rounded-full bg-white/6 border border-white/10 px-2.5 py-1">
                            {x.status}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground max-w-[320px] truncate" title={x.page_url ?? ""}>
                          {x.page_url ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!loading && items.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground">{strings.tableEmpty}</div>
              ) : null}
            </Card>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
