import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureCrmSchema, getPool, send } from "./_db";

async function requireClient(req: VercelRequest) {
  const token = String(req.headers["x-client-token"] || "").trim();
  if (!token) {
    const err: any = new Error("unauthorized");
    err.statusCode = 401;
    throw err;
  }
  const pool = getPool();
  const r = await pool.query(
    `select s.client_id
       from client_sessions s
      where s.token=$1 and s.expires_at > now()`,
    [token]
  );
  if (!r.rows[0]) {
    const err: any = new Error("unauthorized");
    err.statusCode = 401;
    throw err;
  }
  return { token, client_id: r.rows[0].client_id as string };
}

// GET -> { projects: [...] }
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureCrmSchema();
    const pool = getPool();

    if (req.method !== "GET") return send(res, 405, { error: "method_not_allowed" });

    const { client_id } = await requireClient(req);

    const r = await pool.query(
      `select id, title, status, start_date, created_at
         from projects
        where client_id=$1
        order by created_at desc`,
      [client_id]
    );

    return send(res, 200, { items: r.rows });
  } catch (e: any) {
    const status = e?.statusCode || 500;
    return send(res, status, { error: e?.message || "server_error" });
  }
}
