import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureCrmSchema, getPool, send } from "./_db";
import { hashSecret, newToken, verifySecret } from "./_crypto";

// Client auth
// POST { action: 'signup'|'login', email, password, name? } -> { token, expires_at }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureCrmSchema();
    const pool = getPool();

    if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
    const action = String(body.action || "login");
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();
    const name = body.name ? String(body.name).trim() : null;
    if (!email || !password) return send(res, 400, { error: "email_and_password_required" });

    if (action === "signup") {
      const password_hash = hashSecret(password);
      const r = await pool.query(
        `insert into clients(email, name, password_hash)
         values($1,$2,$3)
         on conflict(email) do nothing
         returning id`,
        [email, name, password_hash]
      );
      if (!r.rows[0]) return send(res, 409, { error: "already_exists" });
    }

    const c = await pool.query("select id, password_hash from clients where email=$1", [email]);
    if (!c.rows[0]) return send(res, 401, { error: "unauthorized" });

    const ok = verifySecret(password, c.rows[0].password_hash);
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
