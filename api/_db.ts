import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool() {
  if (pool) return pool;
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("Missing DATABASE_URL (or POSTGRES_URL)");
  pool = new Pool({ connectionString: url, max: 5 });
  return pool;
}

export function requireAdminPin(req: VercelRequest) {
  const expected = process.env.ADMIN_PIN || "Adawaty1@2026";
  const got = String(req.headers["x-admin-pin"] || "").trim();
  if (!got || got !== expected) {
    const err: any = new Error("unauthorized");
    err.statusCode = 401;
    throw err;
  }
}

export function send(res: VercelResponse, status: number, data: any) {
  res.status(status);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}
