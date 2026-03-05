/*
Admin API client
- Uses localStorage token
- Base URL can be set via VITE_ADMIN_API_BASE (default: same origin)
*/

const TOKEN_KEY = "adawaty_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (!token) localStorage.removeItem(TOKEN_KEY);
  else localStorage.setItem(TOKEN_KEY, token);
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

export async function adminLogin(email: string, password: string) {
  return jsonFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
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
  const token = getAdminToken();
  const qs = new URLSearchParams();
  if (params.status) qs.set("status", params.status);
  if (params.service_interest) qs.set("service_interest", params.service_interest);
  if (params.archived !== undefined) qs.set("archived", String(params.archived));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.offset) qs.set("offset", String(params.offset));

  return jsonFetch(`/api/admin/leads?${qs.toString()}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
