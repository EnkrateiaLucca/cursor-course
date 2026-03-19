# Section 08: Backend, Auth & Payments

**Slides:** 46–53 | **Duration:** ~45 min | **Break after:** Yes

## Learning Goals

- Set up Supabase + Drizzle ORM for database management
- Implement Clerk authentication with middleware protection
- Add Stripe payments with checkout and webhooks
- Build Next.js Server Actions for all data mutations
- Understand the full backend architecture

## Prerequisites

- AI Quiz App from Section 05
- Supabase project created (with connection string)
- Clerk application created (with API keys)
- Stripe account in test mode (with API keys)

## Demo Checklist

- [ ] Set up Supabase + Drizzle (see [demo-supabase-drizzle.md](demo-supabase-drizzle.md))
- [ ] Add Clerk authentication (see [demo-clerk-auth.md](demo-clerk-auth.md))
- [ ] Implement Stripe payments (see [demo-stripe-payments.md](demo-stripe-payments.md))
- [ ] Build Server Actions (see [demo-server-actions.md](demo-server-actions.md))
- [ ] Reference env vars (see [env-vars-reference.md](env-vars-reference.md))

## Files in This Section

| File | Purpose |
|------|---------|
| [demo-supabase-drizzle.md](demo-supabase-drizzle.md) | Supabase + Drizzle setup |
| [demo-clerk-auth.md](demo-clerk-auth.md) | Clerk authentication |
| [demo-stripe-payments.md](demo-stripe-payments.md) | Stripe payments |
| [demo-server-actions.md](demo-server-actions.md) | Server Actions patterns |
| [env-vars-reference.md](env-vars-reference.md) | All env vars documented |
| [prompts.md](prompts.md) | Backend setup prompts |

## Key Talking Points

- McKay's template already has most of this wired up — we're connecting the dots
- Drizzle gives type-safe database queries (catches errors at compile time)
- Clerk middleware protects routes automatically — one config file
- Stripe test mode is identical to production — safe to demo live
- Server Actions are the Next.js way to handle mutations (no separate API layer)
