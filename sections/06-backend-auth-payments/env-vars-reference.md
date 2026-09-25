# Environment Variables Reference

All environment variables needed for the full quiz app. Add to `.env.local`.

## Supabase (Database)

| Variable | Where to Find | Required |
|----------|--------------|----------|
| `DATABASE_URL` | Supabase → Settings → Database → Connection String | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key | For admin ops |

## Clerk (Authentication)

| Variable | Where to Find | Required |
|----------|--------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys | Yes |
| `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Set to `/sign-in` | Optional |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Set to `/sign-up` | Optional |

## Stripe (Payments)

| Variable | Where to Find | Required |
|----------|--------------|----------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys | For payments |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys | For payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI or Dashboard → Webhooks | For webhooks |

## AI Provider

| Variable | Where to Find | Required |
|----------|--------------|----------|
| `OPENAI_API_KEY` | OpenAI → API Keys | Yes (or DeepSeek) |
| `DEEPSEEK_API_KEY` | DeepSeek → API Keys | Alternative to OpenAI |

## Template

```env
# Supabase
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
OPENAI_API_KEY=sk-...
```

## Security Notes

- **Never** commit `.env.local` to git
- The `.gitignore` should include `.env*` patterns
- `NEXT_PUBLIC_*` vars are exposed to the browser — only use for public keys
- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS — use only in server code
