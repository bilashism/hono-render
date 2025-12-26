# Hono Backend (Node) — SSE + Socket.IO + Drizzle (Supabase Postgres) + Zod/OpenAPI + Stripe Webhooks + Resend

## Requirements
- Node 20+
- pnpm (recommended)
- A Postgres database (Supabase)

## Setup
1) Copy env file:
   - `cp .env.example .env`
2) Fill in:
   - `DATABASE_URL`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`, `MAIL_FROM`

## Run locally (dev)
- `pnpm install`
- `pnpm dev`
- Health: `GET http://localhost:3000/health`
- SSE: `GET http://localhost:3000/sse`
- Socket.IO: `ws/http` via `/socket.io`
- OpenAPI JSON: `GET http://localhost:3000/openapi.json`

## Build + run (prod)
- `pnpm build`
- `pnpm start`

## Docker
Dev:
- `docker build --target dev -t hono-backend-dev .`
- `docker run --rm -it -p 3000:3000 --env-file .env hono-backend-dev`

Prod:
- `docker build --target prod -t hono-backend-prod .`
- `docker run --rm -p 3000:3000 --env-file .env hono-backend-prod`

## Notes
- Stripe webhook endpoint: `POST /webhooks/stripe`
- Webhook handler returns quickly; add idempotency using a DB table with unique(event_id) if needed.
- Auth integration is a placeholder (wire Better Auth verification where noted).
