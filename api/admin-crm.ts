import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureCrmSchema, getPool, requireAdminPin, send } from "./_db";
import { hashPin } from "./_crypto";

// Admin CRM endpoint
// - GET ?type=projects|clients (simple listing)
// - POST { action: 'create_client' | 'create_project' | 'add_milestone' | 'add_update', ... }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    requireAdminPin(req);
    await ensureCrmSchema();
    const pool = getPool();

    if (req.method === "GET") {
      const type = String(req.query.type || "projects");
      if (type === "clients") {
        const r = await pool.query(
          "select id, email, name, created_at from clients order by created_at desc limit 200"
        );
        return send(res, 200, { items: r.rows });
      }

      const r = await pool.query(
        `select p.id, p.title, p.status, p.start_date, p.created_at,
                c.id as client_id, c.email as client_email, c.name as client_name
           from projects p
           join clients c on c.id = p.client_id
          order by p.created_at desc
          limit 200`
      );
      return send(res, 200, { items: r.rows });
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
      const action = String(body.action || "");

      if (action === "create_client") {
        const email = String(body.email || "").trim().toLowerCase();
        const name = body.name ? String(body.name).trim() : null;
        const pin = String(body.pin || "").trim();
        if (!email || !pin) return send(res, 400, { error: "email_and_pin_required" });

        const pin_hash = hashPin(pin);
        const r = await pool.query(
          `insert into clients(email, name, pin_hash)
           values($1,$2,$3)
           on conflict(email) do update set name=excluded.name, pin_hash=excluded.pin_hash
           returning id, email, name, created_at`,
          [email, name, pin_hash]
        );
        return send(res, 200, { client: r.rows[0] });
      }

      if (action === "create_project") {
        const client_email = String(body.client_email || "").trim().toLowerCase();
        const title = String(body.title || "").trim();
        const status = body.status ? String(body.status).trim() : "active";
        const start_date = body.start_date ? String(body.start_date).trim() : null;
        if (!client_email || !title) return send(res, 400, { error: "client_email_and_title_required" });

        const c = await pool.query("select id from clients where email=$1", [client_email]);
        if (!c.rows[0]) return send(res, 404, { error: "client_not_found" });

        const r = await pool.query(
          `insert into projects(client_id, title, status, start_date)
           values($1,$2,$3,$4)
           returning id, client_id, title, status, start_date, created_at`,
          [c.rows[0].id, title, status, start_date]
        );
        return send(res, 200, { project: r.rows[0] });
      }

      if (action === "add_milestone") {
        const project_id = String(body.project_id || "").trim();
        const title = String(body.title || "").trim();
        const due_date = body.due_date ? String(body.due_date).trim() : null;
        const state = body.state ? String(body.state).trim() : "planned";
        const sort = Number.isFinite(body.sort) ? Number(body.sort) : 0;
        if (!project_id || !title) return send(res, 400, { error: "project_id_and_title_required" });

        const r = await pool.query(
          `insert into project_milestones(project_id, title, due_date, state, sort)
           values($1,$2,$3,$4,$5)
           returning id, project_id, title, due_date, state, sort, created_at`,
          [project_id, title, due_date, state, sort]
        );
        return send(res, 200, { milestone: r.rows[0] });
      }

      if (action === "add_update") {
        const project_id = String(body.project_id || "").trim();
        const bodyText = String(body.body || "").trim();
        if (!project_id || !bodyText) return send(res, 400, { error: "project_id_and_body_required" });

        const r = await pool.query(
          `insert into project_updates(project_id, body)
           values($1,$2)
           returning id, project_id, body, created_at`,
          [project_id, bodyText]
        );
        return send(res, 200, { update: r.rows[0] });
      }

      return send(res, 400, { error: "unknown_action" });
    }

    return send(res, 405, { error: "method_not_allowed" });
  } catch (e: any) {
    const status = e?.statusCode || 500;
    return send(res, status, { error: e?.message || "server_error" });
  }
}
