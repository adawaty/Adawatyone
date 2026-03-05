import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureCrmSchema, getPool, send } from "./_db";
import { newToken, verifyPin } from "./_crypto";

// Client login
// POST { email, pin } -> { token, expires_at }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureCrmSchema();
    const pool = getPool();

    if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
    const email = String(body.email || "").trim().toLowerCase();
    const pin = String(body.pin || "").trim();
    if (!email || !pin) return send(res, 400, { error: "email_and_pin_required" });

    const c = await pool.query("select id, pin_hash from clients where email=$1", [email]);
    if (!c.rows[0]) return send(res, 401, { error: "unauthorized" });

    const ok = verifyPin(pin, c.rows[0].pin_hash);
    if (!ok) return send(res, 401, { error: "unauthorized" });

    const token = newToken();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14); // 14 days

    await pool.query(
      "insert into client_sessions(token, client_id, expires_at) values($1,$2,$3)",
      [token, c.rows[0].id, expires.toISOString()]
    );

    return send(res, 200, { token, expires_at: expires.toISOString() });
  } catch (e: any) {
    const status = e?.statusCode || 500;
    return send(res, status, { error: e?.message || "server_error" });
  }
}
