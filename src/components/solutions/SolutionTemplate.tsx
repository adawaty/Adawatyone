/*
Cairo Circuit Futurism — Solution Page Template
Narrative flow (strict): What it is → Who it’s for → Deliverables → Timeline → Integrations → FAQs

Design motifs:
- deep ink background, luminous teal accents, amber CTA
- circuit dividers, overlapping panels, diagonal edges
- subtle data-line connector + motion
*/

import SeoHead from "@/components/SeoHead";
import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { site } from "@/lib/content";
import { useI18n } from "@/contexts/I18nContext";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type SolutionFaq = { q: string; a: string };

export type SolutionTemplateData = {
  slug: string;
  title: string;
  subtitle: string;

  whatItIs: {
    eyebrow?: string;
    body: string;
    bullets: string[];
  };

  whoItsFor: {
    title: string;
    segments: Array<{ title: string; body: string; examples?: string[] }>;
  };

  deliverables: { title: string; items: string[] };
  timeline: { title: string; items: string[]; note?: string };
  integrations: { title: string; items: string[]; note?: string };
  faqs: { title: string; items: SolutionFaq[] };

  seo: {
    title: string;
    description: string;
    type?: "article" | "website";
  };

  serviceSchema: {
    areaServed?: string;
    serviceType?: string;
  };
};

function CircuitDivider() {
  return <div className="circuit-divider my-8" aria-hidden="true" />;
}

function MagneticCta({ href, children }: { href: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.2 });

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        x.set(dx * 0.08);
        y.set(dy * 0.08);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Button asChild size="lg" className="w-full sm:w-auto shadow-[0_0_44px_oklch(0.73_0.16_190/0.25)]">
        <Link href={href}>{children}</Link>
      </Button>
    </motion.div>
  );
}

function IntegrationMarquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-2 p-3"
        initial={{ x: 0 }}
        animate={{ x: [0, -420] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        {row.map((x, idx) => (
          <span
            key={`${x}-${idx}`}
            className="shrink-0 text-xs rounded-full bg-white/6 border border-white/10 px-3 py-1.5 text-muted-foreground"
          >
            {x}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function SolutionTemplate({ data }: { data: SolutionTemplateData }) {
  const { dir } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.subtitle,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: data.serviceSchema.areaServed ?? "Worldwide",
    serviceType: data.serviceSchema.serviceType ?? "DFY Solution",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${site.url}/solutions` },
      { "@type": "ListItem", position: 3, name: data.title, item: `${site.url}/solutions/${data.slug}` },
    ],
  };

  return (
    <SiteLayout>
      <SeoHead
        title={data.seo.title}
        description={data.seo.description}
        path={`/solutions/${data.slug}`}
        type={data.seo.type ?? "article"}
        jsonLd={[serviceJsonLd, faqJsonLd, breadcrumbJsonLd]}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12" style={{ unicodeBidi: "plaintext" }}>
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          </div>

          <div className="relative p-6 sm:p-10">
            {data.whatItIs.eyebrow ? (
              <div className="text-xs tracking-[0.24em] uppercase text-primary/90">{data.whatItIs.eyebrow}</div>
            ) : null}

            <h1 className="mt-3 text-3xl sm:text-5xl font-semibold leading-[1.05] text-balance">
              {data.title}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground text-balance">{data.subtitle}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticCta href="/contact">
                {dir === "rtl" ? "اطلب نطاق" : "Request scope"} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
              </MagneticCta>
              <Button asChild size="lg" variant="secondary" className="bg-white/6 hover:bg-white/10 w-full sm:w-auto">
                <Link href="/solutions">{dir === "rtl" ? "كل الحلول" : "All solutions"}</Link>
              </Button>
            </div>

            <div className="mt-6">
              <IntegrationMarquee items={data.integrations.items} />
            </div>
          </div>
        </section>

        <CircuitDivider />

        {/* What it is */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold">{dir === "rtl" ? "إيه ده؟" : "What it is"}</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Card className="glass premium-card rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">{data.whatItIs.body}</p>
              <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                {data.whatItIs.bullets.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="glass rounded-2xl p-6">
              <div className="text-sm font-semibold">{dir === "rtl" ? "مؤشر ثقة" : "Trust lever"}</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {dir === "rtl"
                  ? "نقفل النطاق بدري، ونسلم كل مرحلة بمخرجات واضحة. ده بيشيل خوف المفاجآت."
                  : "We lock scope early and ship each stage as visible deliverables. That removes surprise risk."}
              </p>
              <div className="mt-5 circuit-divider" />
              <div className="text-sm font-semibold">{dir === "rtl" ? "النتيجة" : "Outcome"}</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {dir === "rtl"
                  ? "سيستم شغال الناس بتستخدمه—مش ديمو حلو وخلاص."
                  : "A working system that teams actually adopt — not a pretty demo."}
              </p>
            </Card>
          </div>
        </section>

        <CircuitDivider />

        {/* Who it's for */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold">{data.whoItsFor.title}</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {data.whoItsFor.segments.map((s) => (
              <Card key={s.title} className="glass premium-card rounded-2xl p-6">
                <div className="text-lg font-semibold">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                {s.examples?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.examples.map((x) => (
                      <span key={x} className="text-xs rounded-full bg-white/6 border border-white/10 px-2.5 py-1">
                        {x}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </section>

        <CircuitDivider />

        {/* Deliverables + Timeline */}
        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="glass rounded-2xl p-6 lg:col-span-2">
            <div className="text-sm font-semibold">{data.deliverables.title}</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {data.deliverables.items.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold">{data.timeline.title}</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {data.timeline.items.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            {data.timeline.note ? <p className="mt-4 text-xs text-muted-foreground">{data.timeline.note}</p> : null}
          </Card>
        </section>

        <CircuitDivider />

        {/* Integrations */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold">{data.integrations.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{data.integrations.note}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.integrations.items.map((i) => (
              <span key={i} className="text-xs rounded-full bg-white/6 border border-white/10 px-3 py-1.5">
                {i}
              </span>
            ))}
          </div>
        </section>

        <CircuitDivider />

        {/* FAQs */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold">{data.faqs.title}</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {data.faqs.items.map((f) => (
              <Card key={f.q} className="glass rounded-2xl p-6">
                <div className="text-sm font-semibold">{f.q}</div>
                <div className="mt-2 text-sm text-muted-foreground">{f.a}</div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-10" style={{ unicodeBidi: "plaintext" }}>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {dir === "rtl" ? "جاهز نركّب السيستم ده عندك؟" : "Ready to ship this in your business?"}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            {dir === "rtl"
              ? "ابعت نطاقك الحالي والـworkflow اللي عندك. هنرد بخطة مراحل وتسليمات واضحة."
              : "Send your current scope and workflow. We’ll reply with a staged plan and clear deliverables."}
          </p>
          <div className="mt-6">
            <MagneticCta href="/contact">
              {dir === "rtl" ? "احجز مكالمة" : "Book a call"} <Arrow className={dir === "rtl" ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
            </MagneticCta>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
