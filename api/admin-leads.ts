import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { getPool, requireAdminPin, send } from "./_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return send(res, 405, { error: "method_not_allowed" });

  try {
    requireAdminPin(req);

    const q = z
      .object({
        status: z.string().optional(),
        service_interest: z.string().optional(),
        archived: z.enum(["true", "false"]).optional(),
        limit: z.string().optional(),
        offset: z.string().optional(),
      })
      .parse(req.query);

    const limit = Math.min(Number(q.limit ?? 50), 200);
    const offset = Math.max(Number(q.offset ?? 0), 0);

    const where: string[] = [];
    const params: any[] = [];

    if (q.status) {
      params.push(q.status);
      where.push(`status = $${params.length}`);
    }
    if (q.service_interest) {
      params.push(q.service_interest);
      where.push(`service_interest = $${params.length}`);
    }
    if (q.archived) {
      params.push(q.archived === "true");
      where.push(`archived = $${params.length}`);
    }

    const whereSql = where.length ? `where ${where.join(" and ")}` : "";

    const db = getPool();
    const r = await db.query(
      `select id, created_at, name, email, phone, company, service_interest, goal, page_url, lang, status, notes, archived
       from leads
       ${whereSql}
       order by created_at desc
       limit ${limit} offset ${offset}`,
      params
    );

    return send(res, 200, { items: r.rows, limit, offset });
  } catch (e: any) {
    const code = e?.statusCode || 500;
    return send(res, code, { error: code === 401 ? "unauthorized" : "server_error" });
  }
}
