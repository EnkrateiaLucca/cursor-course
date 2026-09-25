# Production Checklist

Run through this before deploying to production.

## Build

- [ ] `pnpm build` succeeds with no errors
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] No console.log statements in production code
- [ ] All tests pass (`pnpm test`)

## Environment Variables

- [ ] All env vars set in Vercel (see [env-vars-reference.md](../08-backend-auth-payments/env-vars-reference.md))
- [ ] Using **pooled** Supabase connection string (port 6543)
- [ ] Clerk keys are for production (if going live)
- [ ] Stripe webhook secret updated for production endpoint
- [ ] No secrets in client-side code (only `NEXT_PUBLIC_*` exposed)

## Database

- [ ] Drizzle migrations applied to production database
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] RLS policies created for user data isolation
- [ ] Indexes added for frequently queried columns
- [ ] Connection pooling configured (Supabase uses PgBouncer)

## Authentication

- [ ] Clerk middleware protecting correct routes
- [ ] Sign-in/sign-up pages working
- [ ] Redirect URLs configured for production domain
- [ ] Social login providers configured (if using)

## Payments

- [ ] Stripe webhook endpoint registered for production URL
- [ ] Webhook signature verification working
- [ ] Test a checkout flow end-to-end (use test card)
- [ ] Cancel/refund flow tested

## Security

- [ ] `.env*` files in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] Input validation (Zod) on all Server Actions
- [ ] Auth checks on all protected Server Actions
- [ ] CORS configured if using API routes externally

## Performance

- [ ] Images using `next/image` with proper dimensions
- [ ] Large dependencies code-split with `dynamic()`
- [ ] No unnecessary client-side bundles
- [ ] Database queries are efficient (no N+1)

## Monitoring (Post-Deploy)

- [ ] Vercel Analytics enabled (optional)
- [ ] Error tracking set up (Sentry, etc. — optional)
- [ ] Uptime monitoring (optional)
