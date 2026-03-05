import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { makeDb } from "./lib/db";
import { authRoutes } from "./routes/auth";
import { leadRoutes } from "./routes/leads";
import "dotenv/config";

const app = Fastify({ logger: true });

const db = makeDb();

await app.register(cors, {
  origin: (origin, cb) => {
    const allow = (process.env.CORS_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (!origin) return cb(null, true);
    if (!allow.length) return cb(null, true);
    if (allow.includes(origin)) return cb(null, true);
    cb(new Error("CORS"), false);
  },
  credentials: true,
});

await app.register(jwt, {
  secret: process.env.JWT_SECRET || "dev-secret-change-me",
});

app.get("/health", async () => ({ ok: true }));

await app.register(authRoutes, { prefix: "/api", db });
await app.register(leadRoutes, { prefix: "/api", db });

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "0.0.0.0";

app.listen({ port, host });
