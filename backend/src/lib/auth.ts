/*
Admin PIN auth (no JWT)
- Client sends: x-admin-pin: <pin>
- Server compares with ADMIN_PIN env (fallback dev pin)
*/

import type { FastifyInstance } from "fastify";

export function getAdminPin(): string {
  return process.env.ADMIN_PIN || "Adawaty1@2026";
}

export function requireAdminPin(app: FastifyInstance, req: any) {
  const pin = String(req.headers["x-admin-pin"] || "").trim();
  if (!pin || pin !== getAdminPin()) {
    const err: any = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }
}
