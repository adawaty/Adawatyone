import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { Db } from "../lib/db";
import { requireAdmin } from "../lib/auth";

const LeadCreate = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_interest: z.string().optional(),
  goal: z.string().optional(),
  page_url: z.string().optional(),
  lang: z.string().optional(),
});

const LeadUpdate = z.object({
  status: z.string().optional(),
  notes: z.string().optional(),
  archived: z.boolean().optional(),
});

export async function leadRoutes(app: FastifyInstance, opts: { db: Db }) {
  const { db } = opts;

  app.post("/public/leads", async (req, reply) => {
    const body = LeadCreate.parse(req.body);

    const status = "new";
    const { rows } = await db.query(
      `insert into leads (name,email,phone,company,service_interest,goal,page_url,lang,status)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       returning id, created_at`,
      [
        body.name,
        body.email.toLowerCase(),
        body.phone ?? null,
        body.company ?? null,
        body.service_interest ?? null,
        body.goal ?? null,
        body.page_url ?? null,
        body.lang ?? null,
        status,
      ]
    );

    return reply.code(201).send({ id: rows[0].id, created_at: rows[0].created_at });
  });

  app.get("/admin/leads", async (req, reply) => {
    await requireAdmin(req);
    const q = z
      .object({
        status: z.string().optional(),
        archived: z.string().optional(),
        limit: z.string().optional(),
        offset: z.string().optional(),
      })
      .parse((req as any).query);

    const limit = Math.min(Number(q.limit ?? 50), 200);
    const offset = Math.max(Number(q.offset ?? 0), 0);

    const where: string[] = [];
    const params: any[] = [];

    if (q.status) {
      params.push(q.status);
      where.push(`status = $${params.length}`);
    }
    if (q.archived === "true" || q.archived === "false") {
      params.push(q.archived === "true");
      where.push(`archived = $${params.length}`);
    }

    const whereSql = where.length ? `where ${where.join(" and ")}` : "";

    const { rows } = await db.query(
      `select id, created_at, name, email, phone, company, service_interest, goal, page_url, lang, status, notes, archived
       from leads
       ${whereSql}
       order by created_at desc
       limit ${limit} offset ${offset}`,
      params
    );

    return { items: rows, limit, offset };
  });

  app.get("/admin/leads/:id", async (req, reply) => {
    await requireAdmin(req);
    const params = z.object({ id: z.string().uuid() }).parse((req as any).params);

    const { rows } = await db.query(
      `select id, created_at, name, email, phone, company, service_interest, goal, page_url, lang, status, notes, archived
       from leads where id = $1 limit 1`,
      [params.id]
    );
    if (!rows[0]) return reply.code(404).send({ error: "not_found" });
    return { item: rows[0] };
  });

  app.patch("/admin/leads/:id", async (req, reply) => {
    await requireAdmin(req);
    const params = z.object({ id: z.string().uuid() }).parse((req as any).params);
    const body = LeadUpdate.parse(req.body);

    const sets: string[] = [];
    const values: any[] = [];

    for (const [k, v] of Object.entries(body)) {
      if (v === undefined) continue;
      values.push(v);
      sets.push(`${k} = $${values.length}`);
    }

    if (!sets.length) return { ok: true };

    values.push(params.id);
    const { rowCount } = await db.query(`update leads set ${sets.join(", ")} where id = $${values.length}`, values);
    if (!rowCount) return reply.code(404).send({ error: "not_found" });
    return { ok: true };
  });
}
