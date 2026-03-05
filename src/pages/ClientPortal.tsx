/*
Client portal
- Signup + Login
- View projects with itemized services + pricing
- View roadmap milestones + updates
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  clientLogin,
  clientSignup,
  fetchClientProject,
  fetchClientProjects,
  getClientToken,
  setClientToken,
} from "@/lib/clientApi";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";

type Project = {
  id: string;
  title: string;
  status: string;
  start_date: string | null;
  selected_services: any[];
  total_usd: number;
  created_at: string;
};

export default function ClientPortal() {
  const { dir } = useI18n();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<any>(null);

  const authed = !!getClientToken();

  async function loadProjects() {
    setLoading(true);
    const res = await fetchClientProjects();
    setLoading(false);
    if (!res.ok) {
      setClientToken(null);
      toast.error(dir === "rtl" ? "مش مصرح" : "Unauthorized");
      return;
    }
    setProjects(res.data?.items ?? []);
  }

  async function openProject(id: string) {
    setLoading(true);
    const res = await fetchClientProject(id);
    setLoading(false);
    if (!res.ok) {
      toast.error(dir === "rtl" ? "مش قادر أفتح المشروع" : "Couldn't load project");
      return;
    }
    setActive(res.data);
  }

  useEffect(() => {
    if (!authed) return;
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  return (
    <SiteLayout
      title={dir === "rtl" ? "بوابة العميل" : "Client Portal"}
      subtitle={dir === "rtl" ? "تسجيل حساب ومتابعة المشروع والخطوات." : "Sign up and track your project steps."}
    >
      <SeoHead title={dir === "rtl" ? "بوابة العميل" : "Client Portal"} description="Client portal" path="/portal" type="website" />

      <section className="pt-8">
        {!authed ? (
          <Card className="glass rounded-2xl p-7 max-w-xl">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{mode === "login" ? (dir === "rtl" ? "تسجيل دخول" : "Login") : dir === "rtl" ? "حساب جديد" : "Sign up"}</div>
              <Button
                variant="secondary"
                className="bg-white/6 hover:bg-white/10"
                onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))}
              >
                {mode === "login" ? (dir === "rtl" ? "حساب جديد" : "Sign up") : dir === "rtl" ? "تسجيل دخول" : "Login"}
              </Button>
            </div>

            <form
              className="mt-5 grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const res =
                  mode === "login"
                    ? await clientLogin(email.trim(), password)
                    : await clientSignup(email.trim(), password, name.trim() || undefined);
                setLoading(false);
                if (!res.ok) {
                  toast.error(res.data?.error || (dir === "rtl" ? "مش مصرح" : "Unauthorized"));
                  return;
                }
                toast.success(dir === "rtl" ? "تم" : "Welcome");
              }}
            >
              {mode === "signup" ? (
                <div className="grid gap-2">
                  <Label>{dir === "rtl" ? "الاسم" : "Name"}</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              ) : null}

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              </div>
              <div className="grid gap-2">
                <Label>{dir === "rtl" ? "باسورد" : "Password"}</Label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
              </div>

              <Button type="submit" size="lg" disabled={loading}>
                {mode === "login" ? (dir === "rtl" ? "دخول" : "Login") : dir === "rtl" ? "تسجيل" : "Create account"}
              </Button>

              <div className="text-xs text-muted-foreground">
                {dir === "rtl" ? "بعد التسجيل، الإدارة هتربط حسابك بالمشروع والخطة." : "After signup, admin will attach your account to your project + roadmap."}
              </div>
            </form>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">{dir === "rtl" ? "مشاريعي" : "Your projects"}</div>
                <Button
                  variant="secondary"
                  className="bg-white/6 hover:bg-white/10"
                  onClick={() => {
                    setClientToken(null);
                    setProjects([]);
                    setActive(null);
                  }}
                >
                  {dir === "rtl" ? "تسجيل خروج" : "Logout"}
                </Button>
              </div>

              <div className="mt-3 grid gap-2">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    className="text-left rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 px-4 py-3"
                    onClick={() => openProject(p.id)}
                  >
                    <div className="font-semibold truncate">{p.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground flex items-center justify-between">
                      <span>{p.status}</span>
                      <span>${p.total_usd}</span>
                    </div>
                  </button>
                ))}
                {projects.length === 0 && !loading ? (
                  <div className="text-sm text-muted-foreground">
                    {dir === "rtl" ? "مفيش مشاريع مرتبطة بالحساب ده." : "No projects linked yet."}
                  </div>
                ) : null}
              </div>
            </Card>

            <Card className="glass rounded-2xl p-6">
              {!active ? (
                <div className="text-sm text-muted-foreground">
                  {dir === "rtl" ? "اختار مشروع عشان تشوف الخطة." : "Select a project to see services + roadmap."}
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{active.project?.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{active.project?.status} • ${active.project?.total_usd}</div>
                    </div>
                    <Button asChild variant="secondary" className="bg-white/6 hover:bg-white/10">
                      <Link href="/contact">{dir === "rtl" ? "اسأل سؤال" : "Ask a question"}</Link>
                    </Button>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm font-semibold">{dir === "rtl" ? "الخدمات" : "Services"}</div>
                    <div className="mt-3 grid gap-2">
                      {(active.project?.selected_services ?? []).map((s: any, idx: number) => (
                        <div key={idx} className="rounded-xl border border-white/10 bg-white/3 px-4 py-3 flex items-center justify-between">
                          <div className="font-medium">{s.name ?? s.id ?? "Service"}</div>
                          <div className="text-xs text-muted-foreground">${s.usd ?? ""}</div>
                        </div>
                      ))}
                      {(active.project?.selected_services ?? []).length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                          {dir === "rtl" ? "لسه مفيش خدمات متسجلة." : "No itemized services saved."}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="text-sm font-semibold">{dir === "rtl" ? "الروودماب" : "Roadmap"}</div>
                    <div className="mt-3 grid gap-2">
                      {(active.milestones ?? []).map((m: any) => (
                        <div key={m.id} className="rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-medium">{m.title}</div>
                            <div className="text-xs text-muted-foreground">{m.due_date ?? ""}</div>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">{m.state}</div>
                        </div>
                      ))}
                      {(active.milestones ?? []).length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                          {dir === "rtl" ? "لسه مفيش مراحل." : "No milestones yet."}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="text-sm font-semibold">{dir === "rtl" ? "تحديثات" : "Updates"}</div>
                    <div className="mt-3 grid gap-2">
                      {(active.updates ?? []).map((u: any) => (
                        <div key={u.id} className="rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                          <div className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleString()}</div>
                          <div className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{u.body}</div>
                        </div>
                      ))}
                      {(active.updates ?? []).length === 0 ? (
                        <div className="text-sm text-muted-foreground">{dir === "rtl" ? "مفيش تحديثات" : "No updates yet."}</div>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
