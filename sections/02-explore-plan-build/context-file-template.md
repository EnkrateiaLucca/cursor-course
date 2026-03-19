# Context File Template

Use this template as a starting point for any project. Save it as `context.md` in your project root and reference it with `@context.md` in Cursor.

---

```markdown
# [Project Name] — Context File

## Problem Statement

[What problem does this app solve? Who is it for? 2-3 sentences.]

## Target Users

- [User type 1] — [what they need]
- [User type 2] — [what they need]

## Core Features

1. **[Feature Name]** — [Brief description]
2. **[Feature Name]** — [Brief description]
3. **[Feature Name]** — [Brief description]

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 15 (App Router) | Server components, file-based routing |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI development |
| Database | Supabase (PostgreSQL) | Managed DB + auth + real-time |
| ORM | Drizzle | Type-safe queries, lightweight |
| Auth | Clerk | Drop-in auth, social logins |
| Payments | Stripe | Industry standard |
| AI | OpenAI API | Quiz generation |
| Deployment | Vercel | Zero-config Next.js hosting |

## Database Schema (High-Level)

- **users** — id, email, name, created_at
- **[table]** — [columns and relationships]
- **[table]** — [columns and relationships]

## Key Pages / Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/dashboard` | Main user dashboard |
| `/[feature]` | [Description] |

## Design Principles

- Mobile-first responsive design
- Consistent use of shadcn/ui components
- Server components by default, client components only when needed
- All API calls through Server Actions

## Out of Scope (v1)

- [Thing we're NOT building]
- [Thing we're NOT building]
```

---

## How to Use This

1. Copy the template above into a `context.md` file in your project root
2. Fill in the sections with your project's specifics
3. Reference it in every major Cursor prompt: `@context.md [your request]`
4. Update it as requirements evolve — this is a living document
5. Share with your team for alignment on architecture decisions
