/*
Admin API client (email+password session)
- Stores token in localStorage and sends x-admin-token
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
  const res = await jsonFetch("/api/admin-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (res.ok && res.data?.token) setAdminToken(String(res.data.token));
  return res;
}

export async function fetchAdminLeads(params: {
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

  return jsonFetch(`/api/admin-leads?${qs.toString()}`, {
    headers: {
      "x-admin-token": token ?? "",
    },
  });
}

export async function adminCrm(action: any) {
  const token = getAdminToken();
  return jsonFetch("/api/admin-crm", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-token": token ?? "" },
    body: JSON.stringify(action),
  });
}

export async function adminSiteGet(slug: string) {
  const token = getAdminToken();
  return jsonFetch(`/api/admin-site?slug=${encodeURIComponent(slug)}`, {
    headers: { "x-admin-token": token ?? "" },
  });
}

export async function adminSiteSave(slug: string, content_json: any, title?: string | null) {
  const token = getAdminToken();
  return jsonFetch("/api/admin-site", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-token": token ?? "" },
    body: JSON.stringify({ slug, title: title ?? null, content_json }),
  });
}
