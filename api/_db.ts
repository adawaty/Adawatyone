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

export async function ensureCrmSchema() {
  const p = getPool();
  await p.query(`
    create extension if not exists pgcrypto;

    create table if not exists clients (
      id uuid primary key default gen_random_uuid(),
      email text unique not null,
      name text,
      pin_hash text not null,
      created_at timestamptz not null default now()
    );

    create table if not exists projects (
      id uuid primary key default gen_random_uuid(),
      client_id uuid not null references clients(id) on delete cascade,
      title text not null,
      status text not null default 'active',
      start_date date,
      created_at timestamptz not null default now()
    );

    create table if not exists project_milestones (
      id uuid primary key default gen_random_uuid(),
      project_id uuid not null references projects(id) on delete cascade,
      title text not null,
      due_date date,
      state text not null default 'planned',
      sort int not null default 0,
      created_at timestamptz not null default now()
    );

    create table if not exists project_updates (
      id uuid primary key default gen_random_uuid(),
      project_id uuid not null references projects(id) on delete cascade,
      body text not null,
      created_at timestamptz not null default now()
    );

    create table if not exists client_sessions (
      token text primary key,
      client_id uuid not null references clients(id) on delete cascade,
      expires_at timestamptz not null,
      created_at timestamptz not null default now()
    );

    create index if not exists idx_projects_client_id on projects(client_id);
    create index if not exists idx_milestones_project_id on project_milestones(project_id);
    create index if not exists idx_updates_project_id on project_updates(project_id);
  `);
}
