/*
Client Portal API client
- Session token stored in localStorage
- Uses x-client-token header
*/

const TOKEN_KEY = "adawaty_client_token";

export function getClientToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setClientToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (!token) localStorage.removeItem(TOKEN_KEY);
  else localStorage.setItem(TOKEN_KEY, token);
}

function apiBase(): string {
  return (import.meta.env.VITE_CLIENT_API_BASE as string | undefined) ?? "";
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

export async function clientLogin(email: string, password: string) {
  const res = await jsonFetch("/api/client-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", email, password }),
  });
  if (res.ok && res.data?.token) setClientToken(String(res.data.token));
  return res;
}

export async function clientSignup(email: string, password: string, name?: string) {
  const res = await jsonFetch("/api/client-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "signup", email, password, name }),
  });
  if (res.ok && res.data?.token) setClientToken(String(res.data.token));
  return res;
}

export async function fetchClientProjects() {
  const token = getClientToken();
  return jsonFetch("/api/client-projects", {
    headers: {
      "x-client-token": token ?? "",
    },
  });
}

export async function fetchClientProject(id: string) {
  const token = getClientToken();
  const qs = new URLSearchParams({ id });
  return jsonFetch(`/api/client-project?${qs.toString()}`, {
    headers: {
      "x-client-token": token ?? "",
    },
  });
}
