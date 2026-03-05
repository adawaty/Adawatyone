import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureCrmSchema, getPool, send } from "./_db";
import { newToken, verifySecret } from "./_crypto";

// Admin session
// POST { email, password } -> { token, expires_at }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureCrmSchema();
    const pool = getPool();

    if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();

    const expectedEmail = (process.env.ADMIN_EMAIL || "alazzeh.ml@gmail.com").trim().toLowerCase();
    const expectedPassword = (process.env.ADMIN_PASSWORD || "Adawaty!!26").trim();

    if (!email || !password) return send(res, 400, { error: "email_and_password_required" });
    if (email !== expectedEmail || password !== expectedPassword) return send(res, 401, { error: "unauthorized" });

    const token = newToken();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);

    await pool.query(
      "insert into admin_sessions(token, email, expires_at) values($1,$2,$3)",
      [token, expectedEmail, expires.toISOString()]
    );

    return send(res, 200, { token, expires_at: expires.toISOString() });
  } catch (e: any) {
    return send(res, 500, { error: e?.message || "server_error" });
  }
}
