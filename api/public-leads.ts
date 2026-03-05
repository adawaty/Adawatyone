import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { getPool, send } from "./_db";

const LeadCreate = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  service_interest: z.string().optional().nullable(),
  goal: z.string().optional().nullable(),
  page_url: z.string().optional().nullable(),
  lang: z.string().optional().nullable(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });

  try {
    const body = LeadCreate.parse(req.body);
    const db = getPool();

    const status = "new";
    const q = await db.query(
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

    return send(res, 201, { id: q.rows[0].id, created_at: q.rows[0].created_at });
  } catch (e: any) {
    const code = e?.statusCode || 400;
    return send(res, code, { error: "bad_request" });
  }
}
