import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool() {
  if (pool) return pool;
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.VERCEL_POSTGRES_URL ||
    process.env.VERCEL_POSTGRES_URL_NON_POOLING;
  if (!url) throw new Error("Missing database env (DATABASE_URL/POSTGRES_URL/...)");
  pool = new Pool({ connectionString: url, max: 5 });
  return pool;
}

export async function requireAdmin(req: VercelRequest) {
  const token = String(req.headers["x-admin-token"] || "").trim();
  if (!token) {
    const err: any = new Error("unauthorized");
    err.statusCode = 401;
    throw err;
  }

  const pool = getPool();
  const r = await pool.query(
    `select email from admin_sessions where token=$1 and expires_at > now()` ,
    [token]
  );
  if (!r.rows[0]) {
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

    -- Leads (public funnel)
    create table if not exists leads (
      id uuid primary key default gen_random_uuid(),
      created_at timestamptz not null default now(),
      name text not null,
      email text not null,
      phone text,
      company text,
      service_interest text,
      goal text,
      page_url text,
      lang text,
      status text not null default 'new',
      notes text,
      archived boolean not null default false
    );

    create index if not exists idx_leads_created_at on leads(created_at desc);
    create index if not exists idx_leads_status on leads(status);
    create index if not exists idx_leads_service_interest on leads(service_interest);

    create table if not exists clients (
      id uuid primary key default gen_random_uuid(),
      email text unique not null,
      name text,
      password_hash text,
      created_at timestamptz not null default now()
    );

    -- Migration: old schema used pin_hash
    alter table clients add column if not exists password_hash text;
    alter table clients add column if not exists pin_hash text;
    update clients set password_hash = coalesce(password_hash, pin_hash) where password_hash is null and pin_hash is not null;
    alter table clients alter column password_hash set not null;

    create table if not exists projects (
      id uuid primary key default gen_random_uuid(),
      client_id uuid not null references clients(id) on delete cascade,
      title text not null,
      status text not null default 'active',
      start_date date,
      selected_services jsonb not null default '[]'::jsonb,
      total_usd int not null default 0,
      created_at timestamptz not null default now()
    );

    alter table projects add column if not exists selected_services jsonb not null default '[]'::jsonb;
    alter table projects add column if not exists total_usd int not null default 0;

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

    create table if not exists admin_sessions (
      token text primary key,
      email text not null,
      expires_at timestamptz not null,
      created_at timestamptz not null default now()
    );

    -- Simple CMS / site editor
    create table if not exists site_pages (
      slug text primary key,
      title text,
      content_json jsonb not null default '{}'::jsonb,
      updated_at timestamptz not null default now()
    );

    create index if not exists idx_projects_client_id on projects(client_id);
    create index if not exists idx_milestones_project_id on project_milestones(project_id);
    create index if not exists idx_updates_project_id on project_updates(project_id);
  `);
}
