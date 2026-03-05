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

// GET ?id=<project_id> -> { project, milestones, updates }
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureCrmSchema();
    const pool = getPool();

    if (req.method !== "GET") return send(res, 405, { error: "method_not_allowed" });

    const id = String(req.query.id || "").trim();
    if (!id) return send(res, 400, { error: "project_id_required" });

    const { client_id } = await requireClient(req);

    const p = await pool.query(
      "select id, client_id, title, status, start_date, created_at from projects where id=$1",
      [id]
    );
    if (!p.rows[0]) return send(res, 404, { error: "not_found" });
    if (p.rows[0].client_id !== client_id) return send(res, 403, { error: "forbidden" });

    const m = await pool.query(
      `select id, title, due_date, state, sort, created_at
         from project_milestones
        where project_id=$1
        order by sort asc, created_at asc`,
      [id]
    );

    const u = await pool.query(
      `select id, body, created_at
         from project_updates
        where project_id=$1
        order by created_at desc`,
      [id]
    );

    return send(res, 200, { project: p.rows[0], milestones: m.rows, updates: u.rows });
  } catch (e: any) {
    const status = e?.statusCode || 500;
    return send(res, status, { error: e?.message || "server_error" });
  }
}
