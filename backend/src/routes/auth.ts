import type { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { z } from "zod";
import type { Db } from "../lib/db";

export async function authRoutes(app: FastifyInstance, opts: { db: Db }) {
  const { db } = opts;

  app.post("/auth/login", async (req, reply) => {
    const body = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .parse(req.body);

    const { rows } = await db.query(
      "select id, email, password_hash from admin_users where email = $1 limit 1",
      [body.email.toLowerCase()]
    );
    const u = rows[0];
    if (!u) return reply.code(401).send({ error: "invalid_credentials" });

    const ok = await bcrypt.compare(body.password, u.password_hash);
    if (!ok) return reply.code(401).send({ error: "invalid_credentials" });

    await db.query("update admin_users set last_login_at = now() where id = $1", [u.id]);

    const token = await reply.jwtSign({ sub: u.id, email: u.email }, { expiresIn: "7d" });
    return { token };
  });

  app.get("/auth/me", async (req, reply) => {
    try {
      await req.jwtVerify();
      return { user: req.user };
    } catch {
      return reply.code(401).send({ error: "unauthorized" });
    }
  });
}
