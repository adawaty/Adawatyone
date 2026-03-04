/*
Cairo Circuit Futurism — Brand → Build → Demand diagram
AIO-friendly: simple semantic SVG that can be parsed by crawlers.
*/

import { useI18n } from "@/contexts/I18nContext";

export default function BrandBuildDemandDiagram({
  className = "",
}: {
  className?: string;
}) {
  const { dir, t } = useI18n();
  const flip = dir === "rtl";
  return (
    <svg
      className={className}
      viewBox="0 0 900 160"
      role="img"
      aria-label={t("diagram.bbd.aria")}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <title>{t("diagram.bbd.title")}</title>
      <desc>{t("diagram.bbd.desc")}</desc>

      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="oklch(0.73 0.16 190)" stopOpacity="0.9" />
          <stop offset="1" stopColor="oklch(0.78 0.16 80)" stopOpacity="0.9" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0"
            result="blurAlpha"
          />
          <feMerge>
            <feMergeNode in="blurAlpha" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* connectors */}
      <path d="M 285 80 L 365 80" stroke="url(#glow)" strokeWidth="6" strokeLinecap="round" filter="url(#soft)" />
      <path d="M 585 80 L 665 80" stroke="url(#glow)" strokeWidth="6" strokeLinecap="round" filter="url(#soft)" />

      {/* arrow heads */}
      <path d="M 365 80 L 350 70 L 350 90 Z" fill="oklch(0.73 0.16 190)" />
      <path d="M 665 80 L 650 70 L 650 90 Z" fill="oklch(0.78 0.16 80)" />

      {/* nodes */}
      {[
        { x: 40, label: t("diagram.bbd.brand"), sub: t("diagram.bbd.brandSub") },
        { x: 340, label: t("diagram.bbd.build"), sub: t("diagram.bbd.buildSub") },
        { x: 640, label: t("diagram.bbd.demand"), sub: t("diagram.bbd.demandSub") },
      ].map((n) => (
        <g key={n.label} transform={`translate(${n.x} 28)`}>
          <rect width="240" height="104" rx="22" fill="oklch(0.20 0.02 250 / 0.65)" stroke="oklch(0.85 0 0 / 0.12)" />
          <text
            x="120"
            y="48"
            textAnchor="middle"
            fontSize="26"
            fill="oklch(0.98 0 0)"
            fontFamily="Onest, system-ui"
            style={flip ? { transform: "scaleX(-1)", transformOrigin: "120px 48px" } : undefined}
          >
            {n.label}
          </text>
          <text
            x="120"
            y="74"
            textAnchor="middle"
            fontSize="14"
            fill="oklch(0.82 0 0 / 0.7)"
            fontFamily="Onest, system-ui"
            style={flip ? { transform: "scaleX(-1)", transformOrigin: "120px 74px" } : undefined}
          >
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
