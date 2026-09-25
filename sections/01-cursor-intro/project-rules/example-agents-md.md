# Example AGENTS.md

> AGENTS.md is Cursor's project-level context file. Place it in your project root. Cursor reads it automatically to understand your project's conventions.

```markdown
# AGENTS.md

## Project Overview

AI-powered quiz application built with Next.js 15, TypeScript, and Supabase.
Users upload study materials, generate AI quizzes, and track their progress.

## Architecture

- **Framework:** Next.js 15 App Router with Server Components
- **Database:** Supabase (PostgreSQL) with Drizzle ORM
- **Auth:** Clerk (middleware in middleware.ts)
- **Payments:** Stripe (webhooks at /api/webhooks/stripe)
- **AI:** OpenAI API for quiz generation
- **Styling:** Tailwind CSS + shadcn/ui components

## Key Directories

- `app/` — Pages and API routes (App Router)
- `components/` — Reusable UI components
- `db/` — Drizzle schema and migrations
- `actions/` — Server Actions for mutations
- `lib/` — Utility functions and shared configs
- `types/` — TypeScript type definitions

## Coding Standards

- TypeScript strict mode — no `any` types
- Server Components by default — "use client" only when necessary
- Validate all inputs with Zod schemas
- Use Server Actions for data mutations
- Tailwind for styling — no custom CSS files
- shadcn/ui for UI components — don't create custom equivalents

## Database Conventions

- Drizzle schema files in `db/schema/`
- Always use migrations (never push directly)
- RLS policies required for all tables
- Use `userId` from Clerk for row-level access control

## Testing

- Vitest for unit/component tests
- Playwright for E2E tests
- Test files colocated: `Component.test.tsx` next to `Component.tsx`
```
