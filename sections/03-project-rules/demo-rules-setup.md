# Demo: Creating Project Rules

**Goal:** Create practical `.cursor/rules/*.mdc` files for the quiz project, demonstrating all four application modes.

---

## Step 1: Create the rules directory

```bash
mkdir -p .cursor/rules
```

## Step 2: Always Apply — Core Standards

Create `.cursor/rules/core-standards.mdc`:

```
This rule always applies. Show how to set the frontmatter:
```

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

**What to explain:** This rule is processed on every prompt — keep it short and essential.

## Step 3: Auto Attached — File-Specific Rules

Create `.cursor/rules/api-routes.mdc`:

```markdown
---
description: Standards for API route handlers
glob: ["**/api/**/*.ts", "**/actions/**/*.ts"]
---

- Validate all inputs with Zod schemas
- Return consistent response format: { success, data, error }
- Use proper HTTP status codes
- Handle errors with try/catch and return meaningful messages
- Use Server Actions for mutations when possible
```

**What to explain:** This rule only activates when working on files matching the glob pattern. Zero overhead on other files.

## Step 4: Agent Requested — Domain Knowledge

Create `.cursor/rules/supabase-patterns.mdc`:

```markdown
---
description: Supabase database patterns and conventions for this project
agentRequestable: true
---

- Use Drizzle ORM for all database queries (not raw SQL)
- Define schemas in db/schema/ directory
- Use migrations for schema changes
- Row Level Security (RLS) is enabled — always set up policies
- Use the Supabase client from lib/supabase.ts
```

**What to explain:** The AI decides when this rule is relevant (e.g., when you mention "database" or "Supabase"). It asks for permission to include it.

## Step 5: Manual — Specialized Tasks

Create `.cursor/rules/performance-audit.mdc`:

```markdown
---
description: Performance audit checklist
manuallyApply: true
---

When auditing performance:
- Check for unnecessary re-renders (React DevTools Profiler)
- Verify images use next/image with proper sizing
- Check bundle size with @next/bundle-analyzer
- Ensure proper code splitting with dynamic imports
- Verify Server Components aren't accidentally client components
- Check database queries for N+1 problems
```

**What to explain:** This only activates when explicitly referenced with `@performance-audit`. Useful for specialized workflows you don't need on every prompt.

## Step 6: Test the Rules

1. Open Chat and work on an API route — observe the auto-attached rule activating
2. Ask about database patterns — observe the agent-requested rule
3. Manually reference `@performance-audit` — show manual activation

## Timing

- Steps 1-2: ~5 min
- Steps 3-4: ~5 min
- Steps 5-6: ~5 min
- Discussion (when NOT to use rules): ~5 min
