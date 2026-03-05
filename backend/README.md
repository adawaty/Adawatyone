# Adawaty Backend (Neon)

A small but “powerful enough” admin backend for Adawaty:

- **Admin auth** (email + password) with JWT
- **Lead intake** endpoint for the website funnel
- **Admin API** to list/update leads
- **Postgres on Neon**

> This repo currently ships the frontend as a static app. The backend is a separate Node service in `backend/`.

## 1) Neon database

This project is intended to run on **Neon Postgres**.

Tables:
- `admin_users`
- `leads`

## 2) Environment variables

Copy the example:

```bash
cp .env.example .env
```

Set:
- `DATABASE_URL` (Neon connection string)
- `JWT_SECRET` (random, 32+ chars)
- `CORS_ORIGIN` (comma-separated allowed origins)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` (10+ chars)

## 3) Install + build

```bash
pnpm install
pnpm run build
```

## 4) Seed the first admin

```bash
pnpm run seed:admin
```

## 5) Run locally

```bash
pnpm run dev
# server on http://localhost:8787
```

## API

### Public
- `POST /api/public/leads`

Body:
```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "company": "...",
  "service_interest": "...",
  "goal": "...",
  "page_url": "...",
  "lang": "en"
}
```

### Admin
- `POST /api/auth/login` → `{ token }`
- `GET /api/admin/leads`
- `GET /api/admin/leads/:id`
- `PATCH /api/admin/leads/:id` (status/notes/archived)

Use `Authorization: Bearer <token>`.
