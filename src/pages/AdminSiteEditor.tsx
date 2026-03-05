/*
Admin Site Editor (CMS)
- Uses /api/admin-site (admin PIN header from /admin)
- Edit JSON per page slug

This is a pragmatic first step for a “site editor”.
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
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

export default function AdminSiteEditor() {
  const { dir } = useI18n();
  const [slug, setSlug] = useState("home");
  const [title, setTitle] = useState("");
  const [jsonText, setJsonText] = useState("{}\n");
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!getAdminPin()) {
      toast.error(dir === "rtl" ? "افتح /admin الأول" : "Unlock /admin first" );
      return;
    }
    setLoading(true);
    const r = await adminFetch(`/api/admin-site?slug=${encodeURIComponent(slug)}`);
    setLoading(false);
    if (!r.ok) {
      toast.error(dir === "rtl" ? "مش مصرح" : "Unauthorized");
      return;
    }
    setTitle(r.data?.page?.title ?? "");
    setJsonText(JSON.stringify(r.data?.page?.content_json ?? {}, null, 2));
  }

  async function save() {
    let parsed: any = null;
    try {
      parsed = JSON.parse(jsonText || "{}");
    } catch (e: any) {
      toast.error((dir === "rtl" ? "JSON غلط: " : "Invalid JSON: ") + (e?.message || ""));
      return;
    }

    setLoading(true);
    const r = await adminFetch(`/api/admin-site`, {
      method: "POST",
      body: JSON.stringify({ slug, title: title || null, content_json: parsed }),
    });
    setLoading(false);
    if (!r.ok) {
      toast.error(dir === "rtl" ? "فشل" : "Failed");
      return;
    }
    toast.success(dir === "rtl" ? "اتحفظ" : "Saved");
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SiteLayout title={dir === "rtl" ? "محرر الموقع" : "Site Editor"} subtitle={dir === "rtl" ? "عدّل بيانات الصفحات من قاعدة البيانات." : "Edit page data stored in Neon."}>
      <SeoHead title="Admin Site Editor" description="Admin site editor" path="/admin/site" type="website" />

      <section className="pt-8 grid gap-4">
        <Card className="glass rounded-2xl p-6">
          <div className="grid gap-4 lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
            <div className="grid gap-2">
              <Label>{dir === "rtl" ? "Slug" : "Page slug"}</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="home" />
              <div className="text-xs text-muted-foreground">Examples: home, services, pricing, contact</div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="bg-white/6 hover:bg-white/10" onClick={load} disabled={loading}>
                {dir === "rtl" ? "تحميل" : "Load"}
              </Button>
              <Button onClick={save} disabled={loading}>{dir === "rtl" ? "حفظ" : "Save"}</Button>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="grid gap-2">
              <Label>{dir === "rtl" ? "عنوان" : "Title"}</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="(optional)" />
            </div>
            <div className="grid gap-2">
              <Label>content_json</Label>
              <Textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} rows={16} className="font-mono text-xs" />
              <div className="text-xs text-muted-foreground">
                This is raw JSON. Next step: convert this into a visual block editor.
              </div>
            </div>
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
}
