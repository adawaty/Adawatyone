/*
Cairo Circuit Futurism — Preloader
- Short, intentional “System Initialization” moment
- Must respect prefers-reduced-motion
- Must not block for long; designed for < 900ms
*/

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const durationMs = reduceMotion ? 250 : 850;

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = clamp((now - start) / durationMs, 0, 1);
      setProgress(p);
      if (p >= 1) onDone();
      else raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onDone]);

  const label = useMemo(() => {
    const pct = Math.round(progress * 100);
    return `${pct}%`;
  }, [progress]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
      role="status"
      aria-live="polite"
      aria-label={t("preloader.aria")}
    >
      <div className="relative w-full max-w-md px-6">
        {/* Core mark */}
        <div className="relative mx-auto h-40 w-40">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, oklch(0.73 0.16 190 / 0.10), transparent 55%)",
            }}
            animate={reduceMotion ? undefined : { opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden="true">
            <defs>
              <linearGradient id="adawaty-preload-glow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="oklch(0.73 0.16 190)" stopOpacity="0.95" />
                <stop offset="1" stopColor="oklch(0.78 0.16 80)" stopOpacity="0.9" />
              </linearGradient>
              <filter id="adawaty-preload-soft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* faint circuit ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="oklch(0.85 0 0 / 0.14)"
              strokeWidth="2"
              strokeDasharray="2 6"
            />

            {/* animated ring draw */}
            <motion.circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="url(#adawaty-preload-glow)"
              strokeWidth="2.8"
              filter="url(#adawaty-preload-soft)"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress }}
            />

            {/* moving spark */}
            {!reduceMotion ? (
              <motion.g
                animate={{ rotate: 360 }}
                style={{ transformOrigin: "50px 50px" }}
                transition={{ duration: 1.15, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="50" cy="12" r="2.6" fill="oklch(0.78 0.16 80)" filter="url(#adawaty-preload-soft)" />
              </motion.g>
            ) : (
              <circle cx="50" cy="12" r="2.4" fill="oklch(0.78 0.16 80)" />
            )}

            {/* center node */}
            <circle cx="50" cy="50" r="6" fill="oklch(0.73 0.16 190 / 0.20)" stroke="oklch(0.73 0.16 190 / 0.75)" />
            <circle cx="50" cy="50" r="2.2" fill="oklch(0.98 0 0)" />
          </svg>
        </div>

        {/* Text */}
        <div className="mt-7 text-center">
          <div className="text-[11px] tracking-[0.34em] uppercase text-primary/90">{t("preloader.eyebrow")}</div>
          <div className="mt-2 text-xl font-semibold" style={{ unicodeBidi: "plaintext" }}>
            {t("preloader.title")}
          </div>
          <div className="mt-2 text-sm text-muted-foreground" style={{ unicodeBidi: "plaintext" }}>
            {t("preloader.subtitle")}
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-2 w-full rounded-full bg-white/6 border border-white/10 overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.73 0.16 190 / 0.95), oklch(0.78 0.16 80 / 0.95))",
                }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
