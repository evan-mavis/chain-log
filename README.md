<div align="center">

# Chain Log <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>

Chain Log is a micro‑accountability app that helps you meet your goals. Inspired by Jerry Seinfeld's "Chain Method" -- make progress everyday and keep the streak alive.

</div>

## Overview

Chain Log focuses on three goals at a time — Daily, Short‑term, and Long‑term — and a lightweight daily log. The calendar shows your streak visually (of daily logs), and a Stats bar summarizes recent progress. Demo mode lets anyone try the experience without creating an account.

### Features

- **Daily log**: quick notes + mood (happy/meh/sad) with one‑click edit
- **Streak calendar**: see your chain; prefetches and caches visible months
- **Goals**: one active goal per type (daily/short/long), complete to archive
- **Completed goals**: filter and browse history
- **Stats bar**: current/best streak, last 7 days, this month, completed goals
- **Quote of the Day**: daily inspirational quote from ZenQuotes API, stored in database; updated via GitHub Actions cron job
- **Email reminders**: scheduled daily reminders based on user's timezone (Resend + cron)
- **Unsubscribe**: one‑click HMAC‑signed link; success page included
- **Demo mode**: no auth, seeded logs/goals/stats; server actions disabled

### Tech stack

- **UI**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI, Lucide
- **Data**: Drizzle ORM (Postgres/Neon), Zod validation
- **Auth**: Better Auth (Google + GitHub providers)
- **Email**: Resend with React Email template
- **Infra**: Vercel (app + cron) or GitHub Actions
  - **Email reminders job**: runs every 30 minutes (users can configure reminder times in 30 min intervals) via GitHub Actions to check and send reminder emails
  - **Quote of the Day job**: runs daily at midnight UTC via GitHub Actions to fetch and store daily quotes
