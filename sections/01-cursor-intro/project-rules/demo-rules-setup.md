# Demo: Creating Project Rules

**Goal:** Create practical `.cursor/rules/*.mdc` files for the quiz project, demonstrating all four application types (current Cursor docs naming).

---

## Step 1: Create the rules directory

```bash
mkdir -p .cursor/rules
```

You can also type `/create-rule` in Agent, or use **Customize → Rules → Add Rule**.

## Step 2: Always Apply — Core Standards

Create `.cursor/rules/core-standards.mdc`:

```markdown
---
description: Core project standards that apply to every interaction
alwaysApply: true
---

- Use TypeScript with strict mode
- Use functional components with hooks (no class components)
- Use Server Components by default; add "use client" only when needed
- Follow existing patterns in the codebase before introducing new ones
- Never commit .env files or secrets
```

**What to explain:** Always Apply is processed on every Agent/Ask/Plan/Debug prompt — keep it short and essential. Rules do **not** apply to Tab or Inline Edit.

## Step 3: Apply to Specific Files — File-Scoped Rules

Create `.cursor/rules/api-routes.mdc`:

```markdown
---
description: Standards for API route handlers
globs: "**/api/**/*.ts,**/actions/**/*.ts"
alwaysApply: false
---

- Validate all inputs with Zod schemas
- Return consistent response format: { success, data, error }
- Use proper HTTP status codes
- Handle errors with try/catch and return meaningful messages
- Use Server Actions for mutations when possible
```

**What to explain:** Auto-attaches when matching files are in context. Zero overhead elsewhere.

## Step 4: Apply Intelligently — Domain Knowledge

Create `.cursor/rules/supabase-patterns.mdc`:

```markdown
---
description: Supabase database patterns and conventions for this project
alwaysApply: false
---

- Use Drizzle ORM for all database queries (not raw SQL)
- Define schemas in db/schema/ directory
- Use migrations for schema changes
- Row Level Security (RLS) is enabled — always set up policies
- Use the Supabase client from lib/supabase.ts
```

**What to explain:** With a description and no globs, Agent decides when the rule is relevant.

## Step 5: Apply Manually — Specialized Tasks

Create `.cursor/rules/performance-audit.mdc`:

```markdown
---
alwaysApply: false
---

When auditing performance:
- Check for unnecessary re-renders (React DevTools Profiler)
- Verify images use next/image with proper sizing
- Check bundle size with @next/bundle-analyzer
- Ensure proper code splitting with dynamic imports
- Verify Server Components aren't accidentally client components
- Check database queries for N+1 problems
```

**What to explain:** No description + no globs → included only when `@`-mentioned (e.g. `@performance-audit`).

## Step 6: Test the Rules

1. Open Agent and work on an API route — observe the file-scoped rule activating
2. Ask about database patterns — observe intelligent apply
3. Manually reference `@performance-audit` — show manual activation

## Timing

- Steps 1-2: ~5 min
- Steps 3-4: ~5 min
- Steps 5-6: ~5 min
- Discussion (when NOT to use rules): ~5 min
