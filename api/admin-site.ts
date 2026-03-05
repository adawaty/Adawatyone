import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureCrmSchema, getPool, requireAdmin, send } from "./_db";

// Admin Site Editor API (simple CMS)
// - Protected by x-admin-pin
// - GET  /api/admin-site?slug=home -> { page }
// - POST /api/admin-site { slug, title?, content_json } -> upsert

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await requireAdmin(req);
    await ensureCrmSchema();
    const pool = getPool();

    if (req.method === "GET") {
      const slug = String(req.query.slug || "home").trim();
      const r = await pool.query(
        "select slug, title, content_json, updated_at from site_pages where slug=$1",
        [slug]
      );
      return send(res, 200, {
        page: r.rows[0] ?? { slug, title: null, content_json: {}, updated_at: null },
      });
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
      const slug = String(body.slug || "").trim();
      const title = body.title ? String(body.title).trim() : null;
      const content_json = body.content_json ?? {};
      if (!slug) return send(res, 400, { error: "slug_required" });

      const r = await pool.query(
        `insert into site_pages(slug, title, content_json, updated_at)
         values($1,$2,$3::jsonb, now())
         on conflict(slug) do update
           set title=excluded.title,
               content_json=excluded.content_json,
               updated_at=now()
         returning slug, title, content_json, updated_at`,
        [slug, title, JSON.stringify(content_json)]
      );
      return send(res, 200, { page: r.rows[0] });
    }

    return send(res, 405, { error: "method_not_allowed" });
  } catch (e: any) {
    const status = e?.statusCode || 500;
    return send(res, status, { error: e?.message || "server_error" });
  }
}
