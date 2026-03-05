/*
Admin API client
- Uses localStorage PIN (x-admin-pin header)
- Base URL can be set via VITE_ADMIN_API_BASE (default: same origin)
*/

const PIN_KEY = "adawaty_admin_pin";

export function getAdminPin(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PIN_KEY);
}

export function setAdminPin(pin: string | null) {
  if (typeof window === "undefined") return;
  if (!pin) localStorage.removeItem(PIN_KEY);
  else localStorage.setItem(PIN_KEY, pin);
}

function apiBase(): string {
  return (import.meta.env.VITE_ADMIN_API_BASE as string | undefined) ?? "";
}

async function jsonFetch(path: string, init?: RequestInit) {
  const base = apiBase();
  const url = `${base}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
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

export function isPinSet(): boolean {
  return !!getAdminPin();
}

export type LeadItem = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_interest: string | null;
  goal: string | null;
  page_url: string | null;
  lang: string | null;
  status: string;
  notes: string | null;
  archived: boolean;
};

export async function fetchLeads(params: {
  status?: string;
  service_interest?: string;
  archived?: boolean;
  limit?: number;
  offset?: number;
}) {
  const pin = getAdminPin();
  const qs = new URLSearchParams();
  if (params.status) qs.set("status", params.status);
  if (params.service_interest) qs.set("service_interest", params.service_interest);
  if (params.archived !== undefined) qs.set("archived", String(params.archived));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.offset) qs.set("offset", String(params.offset));

  return jsonFetch(`/api/admin/leads?${qs.toString()}`, {
    headers: {
      "x-admin-pin": pin ?? "",
    },
  });
}
