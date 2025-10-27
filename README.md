<div align="center">

# 🔗 Chain Log

Make progress every day and don’t break the chain. Chain Log is a micro‑accountability app that helps you keep streaks, set simple goals, and build momentum.

Inspired by Jerry Seinfelds "Chain Method".

</div>

## Overview

Chain Log focuses on three goals at a time — Daily, Short‑term, and Long‑term — and a lightweight daily log. The calendar shows your streak visually, and a Stats bar summarizes recent progress. Demo mode lets anyone try the experience without creating an account.

### Features

- **Daily log**: quick notes + mood (happy/meh/sad) with one‑click edit
- **Streak calendar**: see your chain; prefetches and caches visible months
- **Goals**: one active goal per type (daily/short/long), complete to archive
- **Completed goals**: filter and browse history
- **Stats bar**: current/best streak, last 7 days, this month
- **Quote of the Day**: stable daily quote (cached with `unstable_cache`)
- **Email reminders**: scheduled daily reminders (Resend + cron)
- **Unsubscribe**: one‑click HMAC‑signed link; success page included
- **Demo mode**: no auth, seeded logs/goals/stats; server actions disabled

### Tech stack

- **UI**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI, Lucide
- **Data**: Drizzle ORM (Postgres/Neon), Zod validation
- **Auth**: Better Auth (Google + GitHub providers)
- **Email**: Resend with React Email template
- **Infra**: Vercel (app + cron) or GitHub Actions pinger

## Getting started

### Prerequisites

- Node 20+
- A Postgres database (Neon recommended)

### Environment

Create `.env.local` with at least:

```bash
DATABASE_URL=postgres://...
APP_ORIGIN=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000

# Auth providers (dev client credentials)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Email
RESEND_API_KEY=...
RESEND_FROM="Chain Log Reminders <no-reply@notifications.chain-log.app>"
EMAIL_UNSUBSCRIBE_SECRET=$(openssl rand -hex 32)

# Optional cron token for external schedulers
CRON_SECRET=$(openssl rand -hex 32)
```

### Install & run

```bash
pnpm install
pnpm drizzle-kit migrate
pnpm dev
```

Open http://localhost:3000

## Migrations

- Use versioned migrations in `src/db/migrations/`
- Apply: `pnpm drizzle-kit migrate`
- The build script supports conditional migrations via `RUN_DB_MIGRATIONS=true`

## Production setup

### Vercel env (production)

Set the same variables as above, but with production values:

- `DATABASE_URL` (Neon prod branch)
- `APP_ORIGIN` = `https://chain-log.app`
- `BETTER_AUTH_URL` = `https://chain-log.app`
- `RESEND_API_KEY`, `RESEND_FROM`
- `EMAIL_UNSUBSCRIBE_SECRET`
- `CRON_SECRET`
- `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET` (production apps)

### Reminders scheduling

- Vercel Cron (limited on free) via `vercel.json`
- Or GitHub Actions (recommended on free): see `.github/workflows/send-reminders.yml`
  - Add repo secrets: `APP_ORIGIN`, `CRON_SECRET`

### Domains

- Pick a canonical host (apex or www) and redirect the other in Vercel or `vercel.json`
- Update OAuth redirect URLs to match your canonical host exactly

## Demo mode

- `/dashboard-preview` renders seeded data; server actions are disabled
- `ModeProvider` gates actions; calendar opens popovers even without real logs

## Development notes

- **Drizzle/Kysely**: `pnpm.overrides` ensures a single version to avoid TS type clashes
- **Builder API**: All queries/mutations use Drizzle’s builder (no raw sql in app code)
- **Caching**: Quotes use `unstable_cache` with daily keys
- **Email**: Unsubscribe token uses HMAC with TTL

## License

MIT

