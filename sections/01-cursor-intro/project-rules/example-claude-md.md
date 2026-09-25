# Example CLAUDE.md

> CLAUDE.md is Claude Code's project-level context file. Place it in your project root. Claude Code reads it automatically when working in that directory.

```markdown
# CLAUDE.md

## What This Is

AI quiz app — users upload study materials, generate quizzes with AI, track progress.
Built on McKay's App Template (Next.js 15 + Supabase + Clerk + Stripe).

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm db:push` — push Drizzle schema to Supabase
- `pnpm db:generate` — generate Drizzle migrations
- `pnpm test` — run Vitest
- `pnpm test:e2e` — run Playwright E2E tests

## Key Files

- `db/schema/` — Drizzle schema definitions (source of truth for DB)
- `actions/` — Server Actions (all mutations go through here)
- `middleware.ts` — Clerk auth middleware
- `app/api/webhooks/stripe/route.ts` — Stripe webhook handler

## Conventions

- TypeScript strict, no `any`
- Server Components default, "use client" only when needed
- Zod validation on all inputs
- Drizzle ORM for all DB access (no raw SQL)
- shadcn/ui components (don't reinvent)
- Tailwind only (no CSS modules or styled-components)

## Environment

Required env vars documented in SETUP.md. Never commit .env files.
```
