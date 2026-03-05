import type { VercelRequest, VercelResponse } from "@vercel/node";
import { send } from "./_db";

// Quick debug endpoint (admin-only): verifies which PIN is being accepted.
// POST { pin } -> { ok }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });
  const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
  const pin = String(body.pin || "").trim();
  const ok = pin === "Adawaty1@2026";
  return send(res, 200, { ok });
}
