/*
FX helper (client-side)
- Fetches live rates without API key.
- Caches in localStorage to avoid rate-limits.

Source: open.er-api.com (free)
*/

export type FxBase = "USD";

export type FxRates = {
  base: FxBase;
  time_last_update_unix?: number;
  rates: Record<string, number>;
};

const CACHE_KEY = "adawaty_fx_cache_v1";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export function getCachedFx(): FxRates | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt: number; data: FxRates };
    if (!parsed?.savedAt || !parsed?.data) return null;
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function setCachedFx(data: FxRates) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // ignore
  }
}

export async function fetchFxUSD(): Promise<FxRates> {
  const url = "https://open.er-api.com/v6/latest/USD";
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = (await res.json()) as any;
  if (!res.ok || data?.result !== "success" || !data?.rates) {
    throw new Error("Failed to fetch FX rates");
  }
  return {
    base: "USD",
    time_last_update_unix: data.time_last_update_unix,
    rates: data.rates,
  };
}

export function convert(fromUsd: number, to: string, fx: FxRates | null): number {
  if (!fx) return fromUsd;
  if (to === "USD") return fromUsd;
  const r = fx.rates?.[to];
  if (!r || !Number.isFinite(r)) return fromUsd;
  return fromUsd * r;
}
