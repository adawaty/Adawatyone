-- Adawaty: Neon schema
create extension if not exists pgcrypto;

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
  status text not null,
  notes text,
  archived boolean not null default false
);

create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists leads_status_idx on leads(status);
create index if not exists leads_service_idx on leads(service_interest);
create index if not exists leads_email_idx on leads(email);
