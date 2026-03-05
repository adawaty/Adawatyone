import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureCrmSchema, getPool, send } from "./_db";

// Health endpoint to validate DB connectivity and schema.

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const pool = getPool();
    await pool.query("select 1 as ok");
    await ensureCrmSchema();
    return send(res, 200, { ok: true });
  } catch (e: any) {
    return send(res, 500, { ok: false, error: e?.message || "error" });
  }
}
