/*
Admin CRM Dashboard
- Uses /api/admin-crm (admin PIN header)
- Create/update client (email + name + pin)
- Create project for a client
- Add milestones + updates

This is intentionally minimal UI, but covers the workflow you asked for.
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { getAdminPin } from "@/lib/adminApi";
import { useI18n } from "@/contexts/I18nContext";

async function adminFetch(path: string, init?: RequestInit) {
  const pin = getAdminPin() ?? "";
  const res = await fetch(path, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-admin-pin": pin,
      ...(init?.headers ?? {}),
    },
  });
  const txt = await res.text();
  let data: any = null;
  try {
    data = txt ? JSON.parse(txt) : null;
  } catch {
    data = txt;
  }
  return { ok: res.ok, status: res.status, data };
}

type ClientRow = { id: string; email: string; name: string | null; created_at: string };

type ProjectRow = {
  id: string;
  title: string;
  status: string;
  start_date: string | null;
  created_at: string;
  client_id: string;
  client_email: string;
  client_name: string | null;
};

export default function AdminCrm() {
  const { dir } = useI18n();

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);

  // Create client
  const [cEmail, setCEmail] = useState("");
  const [cName, setCName] = useState("");
  const [cPin, setCPin] = useState("");

  // Create project
  const [pClientEmail, setPClientEmail] = useState("");
  const [pTitle, setPTitle] = useState("");
  const [pStart, setPStart] = useState("");

  // Add milestone
  const [mProjectId, setMProjectId] = useState("");
  const [mTitle, setMTitle] = useState("");
  const [mDue, setMDue] = useState("");
  const [mSort, setMSort] = useState(0);

  // Add update
  const [uProjectId, setUProjectId] = useState("");
  const [uBody, setUBody] = useState("");

  const hasPin = !!getAdminPin();

  async function refreshAll() {
    if (!hasPin) {
      toast.error(dir === "rtl" ? "افتح لوحة الإدارة الأول" : "Unlock /admin first (PIN)" );
      return;
    }

    setLoading(true);
    const [c, p] = await Promise.all([
      adminFetch("/api/admin-crm?type=clients"),
      adminFetch("/api/admin-crm?type=projects"),
    ]);
    setLoading(false);

    if (!c.ok || !p.ok) {
      toast.error(dir === "rtl" ? "مش مصرح" : "Unauthorized" );
      return;
    }

    setClients(c.data?.items ?? []);
    setProjects(p.data?.items ?? []);
  }

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectOptions = useMemo(() => {
    return projects.map((x) => ({ id: x.id, label: `${x.title} — ${x.client_email}` }));
  }, [projects]);

  return (
    <SiteLayout title={dir === "rtl" ? "CRM — لوحة الإدارة" : "CRM — Admin Dashboard"} subtitle={dir === "rtl" ? "إنشاء عملاء ومشاريع وروودماب." : "Create clients, projects, roadmaps."}>
      <SeoHead title="Admin CRM" description="Admin CRM" path="/admin/crm" type="website" />

      <section className="pt-8 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {dir === "rtl" ? "لازم تدخل الـPIN في /admin الأول" : "Requires PIN set in /admin"}
          </div>
          <Button variant="secondary" className="bg-white/6 hover:bg-white/10" onClick={refreshAll} disabled={loading}>
            {dir === "rtl" ? "تحديث" : "Refresh"}
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="glass rounded-2xl p-6">
            <div className="text-lg font-semibold">{dir === "rtl" ? "عميل جديد" : "Create / update client"}</div>
            <div className="mt-4 grid gap-3">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder="client@company.com" type="email" />
              </div>
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "اسم" : "Name"}</Label>
                <Input value={cName} onChange={(e) => setCName(e.target.value)} placeholder={dir === "rtl" ? "اسم العميل" : "Client name"} />
              </div>
              <div className="grid gap-2">
                <Label>PIN</Label>
                <Input value={cPin} onChange={(e) => setCPin(e.target.value)} placeholder="••••••" type="password" />
                <div className="text-xs text-muted-foreground">
                  {dir === "rtl" ? "ده كود دخول العميل للـ /portal" : "This is the client login PIN for /portal"}
                </div>
              </div>
              <Button
                onClick={async () => {
                  if (!cEmail.trim() || !cPin.trim()) {
                    toast.error(dir === "rtl" ? "اكتب الإيميل والـPIN" : "Email + PIN required");
                    return;
                  }
                  setLoading(true);
                  const r = await adminFetch("/api/admin-crm", {
                    method: "POST",
                    body: JSON.stringify({ action: "create_client", email: cEmail.trim(), name: cName.trim(), pin: cPin.trim() }),
                  });
                  setLoading(false);
                  if (!r.ok) {
                    toast.error(dir === "rtl" ? "فشل" : "Failed");
                    return;
                  }
                  toast.success(dir === "rtl" ? "تم" : "Saved");
                  setCEmail("");
                  setCName("");
                  setCPin("");
                  refreshAll();
                }}
                disabled={loading}
              >
                {dir === "rtl" ? "حفظ" : "Save client"}
              </Button>
            </div>
          </Card>

          <Card className="glass rounded-2xl p-6">
            <div className="text-lg font-semibold">{dir === "rtl" ? "مشروع جديد" : "Create project"}</div>
            <div className="mt-4 grid gap-3">
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "إيميل العميل" : "Client email"}</Label>
                <Input value={pClientEmail} onChange={(e) => setPClientEmail(e.target.value)} placeholder="client@company.com" />
              </div>
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "عنوان المشروع" : "Project title"}</Label>
                <Input value={pTitle} onChange={(e) => setPTitle(e.target.value)} placeholder={dir === "rtl" ? "مثلاً: Website + SEO" : "e.g. Website + AI Visibility"} />
              </div>
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "تاريخ البداية" : "Start date"}</Label>
                <Input value={pStart} onChange={(e) => setPStart(e.target.value)} type="date" />
              </div>
              <Button
                onClick={async () => {
                  if (!pClientEmail.trim() || !pTitle.trim()) {
                    toast.error(dir === "rtl" ? "اكتب الإيميل والعنوان" : "Client email + title required");
                    return;
                  }
                  setLoading(true);
                  const r = await adminFetch("/api/admin-crm", {
                    method: "POST",
                    body: JSON.stringify({
                      action: "create_project",
                      client_email: pClientEmail.trim(),
                      title: pTitle.trim(),
                      start_date: pStart || null,
                    }),
                  });
                  setLoading(false);
                  if (!r.ok) {
                    toast.error(r.data?.error || (dir === "rtl" ? "فشل" : "Failed"));
                    return;
                  }
                  toast.success(dir === "rtl" ? "تم" : "Created");
                  setPClientEmail("");
                  setPTitle("");
                  setPStart("");
                  refreshAll();
                }}
                disabled={loading}
              >
                {dir === "rtl" ? "إنشاء" : "Create project"}
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="glass rounded-2xl p-6">
            <div className="text-lg font-semibold">{dir === "rtl" ? "إضافة مرحلة (Milestone)" : "Add milestone"}</div>
            <div className="mt-4 grid gap-3">
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "Project ID" : "Project"}</Label>
                <Input value={mProjectId} onChange={(e) => setMProjectId(e.target.value)} placeholder={dir === "rtl" ? "الصق الـID" : "Paste project id"} list="proj-list" />
                <datalist id="proj-list">
                  {projectOptions.map((p) => (
                    <option key={p.id} value={p.id} />
                  ))}
                </datalist>
                <div className="text-xs text-muted-foreground">Tip: click a project id from the list below.</div>
              </div>
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "عنوان" : "Title"}</Label>
                <Input value={mTitle} onChange={(e) => setMTitle(e.target.value)} placeholder={dir === "rtl" ? "مثلاً: تصميم" : "e.g. UI design"} />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>{dir === "rtl" ? "Due" : "Due date"}</Label>
                  <Input value={mDue} onChange={(e) => setMDue(e.target.value)} type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>{dir === "rtl" ? "ترتيب" : "Sort"}</Label>
                  <Input value={String(mSort)} onChange={(e) => setMSort(Number(e.target.value || 0))} type="number" />
                </div>
              </div>
              <Button
                onClick={async () => {
                  if (!mProjectId.trim() || !mTitle.trim()) {
                    toast.error(dir === "rtl" ? "اكتب الـProject ID والعنوان" : "Project id + title required");
                    return;
                  }
                  setLoading(true);
                  const r = await adminFetch("/api/admin-crm", {
                    method: "POST",
                    body: JSON.stringify({
                      action: "add_milestone",
                      project_id: mProjectId.trim(),
                      title: mTitle.trim(),
                      due_date: mDue || null,
                      sort: mSort,
                    }),
                  });
                  setLoading(false);
                  if (!r.ok) {
                    toast.error(r.data?.error || (dir === "rtl" ? "فشل" : "Failed"));
                    return;
                  }
                  toast.success(dir === "rtl" ? "تم" : "Added" );
                  setMTitle("");
                  setMDue("");
                  refreshAll();
                }}
                disabled={loading}
              >
                {dir === "rtl" ? "إضافة" : "Add milestone"}
              </Button>
            </div>
          </Card>

          <Card className="glass rounded-2xl p-6">
            <div className="text-lg font-semibold">{dir === "rtl" ? "إضافة تحديث" : "Add update"}</div>
            <div className="mt-4 grid gap-3">
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "Project ID" : "Project"}</Label>
                <Input value={uProjectId} onChange={(e) => setUProjectId(e.target.value)} placeholder={dir === "rtl" ? "الصق الـID" : "Paste project id"} list="proj-list-2" />
                <datalist id="proj-list-2">
                  {projectOptions.map((p) => (
                    <option key={p.id} value={p.id} />
                  ))}
                </datalist>
              </div>
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "التحديث" : "Update"}</Label>
                <Textarea value={uBody} onChange={(e) => setUBody(e.target.value)} placeholder={dir === "rtl" ? "اكتب تحديث بسيط" : "Write a short update"} rows={6} />
              </div>
              <Button
                onClick={async () => {
                  if (!uProjectId.trim() || !uBody.trim()) {
                    toast.error(dir === "rtl" ? "اكتب الـProject ID والتحديث" : "Project id + update required");
                    return;
                  }
                  setLoading(true);
                  const r = await adminFetch("/api/admin-crm", {
                    method: "POST",
                    body: JSON.stringify({ action: "add_update", project_id: uProjectId.trim(), body: uBody.trim() }),
                  });
                  setLoading(false);
                  if (!r.ok) {
                    toast.error(r.data?.error || (dir === "rtl" ? "فشل" : "Failed"));
                    return;
                  }
                  toast.success(dir === "rtl" ? "تم" : "Added" );
                  setUBody("");
                  refreshAll();
                }}
                disabled={loading}
              >
                {dir === "rtl" ? "إضافة" : "Add update"}
              </Button>
            </div>
          </Card>
        </div>

        <Card className="glass rounded-2xl p-6">
          <div className="text-lg font-semibold">{dir === "rtl" ? "قائمة المشاريع" : "Projects (copy IDs)"}</div>
          <div className="mt-4 grid gap-2">
            {projects.map((p) => (
              <div key={p.id} className="rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{p.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {p.client_email} • {p.status} • {p.start_date ?? ""}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground break-all">{p.id}</div>
                </div>
              </div>
            ))}
            {projects.length === 0 && !loading ? (
              <div className="text-sm text-muted-foreground">{dir === "rtl" ? "مفيش مشاريع" : "No projects yet"}</div>
            ) : null}
          </div>
        </Card>

        <Card className="glass rounded-2xl p-6">
          <div className="text-lg font-semibold">{dir === "rtl" ? "قائمة العملاء" : "Clients"}</div>
          <div className="mt-4 grid gap-2">
            {clients.map((c) => (
              <div key={c.id} className="rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                <div className="font-semibold">{c.email}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.name ?? ""}</div>
              </div>
            ))}
            {clients.length === 0 && !loading ? (
              <div className="text-sm text-muted-foreground">{dir === "rtl" ? "مفيش عملاء" : "No clients yet"}</div>
            ) : null}
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
}
