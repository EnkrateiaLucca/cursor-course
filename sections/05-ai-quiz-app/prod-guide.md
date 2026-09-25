# Production Deployment Guide

Take a working localhost app (Next.js + Clerk + Supabase + Stripe + Anthropic) and ship it for real users — from first prototype to live payments.

---

## What you're deploying

| Layer | Service | Role |
|---|---|---|
| Frontend + API | **Next.js on Vercel** | App UI, API routes, webhooks |
| Auth | **Clerk** | Sign up, sign in, session management |
| Database | **Supabase (Postgres)** | Users, quizzes, attempts, subscriptions |
| Payments | **Stripe** | Pro subscription checkout |
| AI | **Anthropic** | AI quiz generation |

### How the pieces connect

```
User → Vercel (Next.js)
         ├── Clerk (auth on protected routes)
         ├── Supabase (app data via service role + RLS)
         ├── Stripe Checkout (upgrade to Pro)
         └── Anthropic API (generate quizzes)

Webhooks (server-to-server):
  Clerk  → POST /api/webhooks/clerk   → sync users to Supabase
  Stripe → POST /api/webhooks/stripe  → update subscription_status
```

---

## Phase 0 — Local prerequisites

Before deploying, confirm everything works on `http://localhost:3000`.

### 0.1 Verify the build

```bash
npm install
npm run build
npm run dev
```

Fix any build errors before continuing.

### 0.2 Create `.env.local`

Copy this template and fill in real values (never commit this file):

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Keys must be the **full** strings from each dashboard — not placeholder text like `pk_test_...`. Real keys are 100+ characters.

Restart the dev server after every `.env.local` change.

---

## Phase 1 — Wire up each service locally

Do these in order. Each step unlocks the next.

### 1.1 Supabase (database)

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY`
3. Go to **SQL Editor** and run the full contents of:

   ```
   supabase/migrations/001_initial_schema.sql
   ```

   This creates `users`, `quizzes`, and `quiz_attempts` tables with Row Level Security.

4. Verify in **Table Editor** that all three tables exist.

### 1.2 Clerk (authentication)

1. Create an application at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Go to **API Keys** and copy:
   - Publishable key → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Secret key → `CLERK_SECRET_KEY`
3. Go to **Configure → Paths** and set:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
4. Set up the **Clerk webhook** (syncs users to Supabase):

   **Local testing with ngrok or Clerk's dashboard:**
   - For local dev, use [ngrok](https://ngrok.com) or the Clerk CLI to expose your webhook
   - Alternatively, set up the webhook after first deploy (Phase 3)

   **Webhook config:**
   - URL: `https://your-domain/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
   - Copy signing secret → `CLERK_WEBHOOK_SECRET`

   The handler upserts users into Supabase on create/update and deletes on `user.deleted`.

### 1.3 Stripe (payments)

1. Create an account at [dashboard.stripe.com](https://dashboard.stripe.com)
2. Stay in **Test mode** (toggle top-right) for prototype testing
3. **Product catalog → Add product:**
   - Name: `Quiz App Pro`
   - Pricing: **Recurring**, e.g. `$9/month`
   - Copy the **Price ID** (`price_...`) — not the Product ID (`prod_...`)
   - → `STRIPE_PRO_PRICE_ID`
4. **Developers → API keys:**
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
5. **Local webhook forwarding** (keep this terminal open while testing):

   ```bash
   brew install stripe/stripe-cli/stripe
   stripe login
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Copy the printed signing secret → `STRIPE_WEBHOOK_SECRET`

   Events the app handles:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 1.4 Anthropic (AI generation)

1. Get an API key at [console.anthropic.com](https://console.anthropic.com)
2. → `ANTHROPIC_API_KEY`

Free tier users get 3 AI generations/month. Pro users get unlimited.

---

## Phase 2 — Local smoke test

Run through this checklist on `http://localhost:3000`:

| # | Test | Pass criteria |
|---|---|---|
| 1 | Landing page | Loads without errors |
| 2 | Sign up | Clerk flow completes |
| 3 | Dashboard | Loads (proves Clerk webhook synced user to Supabase) |
| 4 | Upload quiz JSON | Quiz appears in library |
| 5 | Take quiz | Results page shows score |
| 6 | AI generate | Quiz created from text (uses Anthropic key) |
| 7 | Hit free limit | 4th AI generation shows upgrade prompt |
| 8 | Upgrade to Pro | Stripe Checkout opens |
| 9 | Pay with test card | `4242 4242 4242 4242`, any future expiry/CVC |
| 10 | Return to dashboard | `subscription_status` = `pro` in Supabase |
| 11 | AI generate again | Unlimited — no limit message |

### Stripe test cards

| Card | Result |
|---|---|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Declined |
| `4000 0025 0000 3155` | Requires 3D Secure |

---

## Phase 3 — Deploy a prototype (test mode)

Ship a URL testers can hit. Keep Clerk test keys and Stripe test mode — no real charges.

### 3.1 Push code to GitHub

```bash
git add -A
git commit -m "Add full-stack quiz app"
git push origin main
```

Confirm `.env.local` is **not** in the commit (it's gitignored).

### 3.2 Deploy on Vercel

**Dashboard:**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Root directory: set if the app lives in a subfolder (e.g. `sections/05-ai-quiz-app/quiz-app`)
5. Add environment variables (see table below)
6. Click **Deploy**

**CLI alternative:**

```bash
npm i -g vercel
vercel
```

Note your deployment URL: `https://your-app.vercel.app`

### 3.3 Environment variables on Vercel

Add all of these in **Project Settings → Environment Variables**:

| Variable | Local value | Production value |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | Same (test keys OK for prototype) |
| `CLERK_SECRET_KEY` | `sk_test_...` | Same |
| `CLERK_WEBHOOK_SECRET` | Local secret | **New** production webhook secret (Step 3.4) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | `/sign-up` |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Same |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | Same |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Same |
| `ANTHROPIC_API_KEY` | Your API key | Same |
| `STRIPE_SECRET_KEY` | `sk_test_...` | Same (test mode for prototype) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Same |
| `STRIPE_WEBHOOK_SECRET` | Local CLI secret | **New** production webhook secret (Step 3.4) |
| `STRIPE_PRO_PRICE_ID` | `price_...` | Same |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | **`https://your-app.vercel.app`** |

Set variables for **Production**, **Preview**, and **Development** environments unless you want different values per environment.

**Critical:** `NEXT_PUBLIC_APP_URL` must be your Vercel URL — Stripe uses it for checkout success/cancel redirects.

### 3.4 Configure production webhooks

Local `stripe listen` only works on localhost. Production needs real webhook endpoints.

**Stripe:**

1. [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks) (Test mode)
2. **Add endpoint:**
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
3. Copy **Signing secret** → update `STRIPE_WEBHOOK_SECRET` in Vercel

**Clerk:**

1. [Clerk Dashboard → Webhooks](https://dashboard.clerk.com/webhooks)
2. **Add endpoint:**
   - URL: `https://your-app.vercel.app/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
3. Copy **Signing secret** → update `CLERK_WEBHOOK_SECRET` in Vercel

### 3.5 Configure Clerk for your domain

1. Clerk Dashboard → **Configure → Domains**
2. Add `your-app.vercel.app`
3. **Configure → Paths** — confirm sign-in/sign-up paths match env vars
4. **Configure → Allowed redirect URLs** — add:
   - `https://your-app.vercel.app/*`

### 3.6 Redeploy

After updating webhook secrets and `NEXT_PUBLIC_APP_URL`:

- Vercel Dashboard → **Deployments** → ⋯ → **Redeploy**

Or:

```bash
vercel --prod
```

### 3.7 Prototype smoke test (live URL)

Repeat the Phase 2 checklist on your Vercel URL. Pay extra attention to:

- Sign up creates a row in Supabase `users` (Clerk webhook)
- Checkout upgrades to Pro (Stripe webhook)
- AI generation works (Anthropic key on Vercel)

Share with testers:

```
https://your-app.vercel.app
Test card: 4242 4242 4242 4242
```

---

## Phase 4 — Go live (real payments)

When you're ready for real users and real charges.

### 4.1 Clerk production instance

1. Clerk Dashboard → switch from **Development** to **Production**
2. Copy new **Production API keys** (`pk_live_...`, `sk_live_...`)
3. Update in Vercel env vars
4. Re-create the Clerk webhook endpoint on the production instance
5. Update `CLERK_WEBHOOK_SECRET`

### 4.2 Stripe live mode

1. Complete Stripe account activation (business details, bank account)
2. Toggle Stripe Dashboard to **Live mode**
3. Re-create the Pro product and price in live mode
4. Copy new live keys:
   - `sk_live_...` → `STRIPE_SECRET_KEY`
   - `pk_live_...` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - New `price_...` → `STRIPE_PRO_PRICE_ID`
5. Create a **live** webhook endpoint:
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Same events as test mode
   - Update `STRIPE_WEBHOOK_SECRET` with the live signing secret

### 4.3 Redeploy and verify

```bash
vercel --prod
```

Run one real checkout with a real card to confirm the full flow.

---

## Phase 5 — Custom domain (optional)

### 5.1 Vercel

1. Vercel Project → **Settings → Domains**
2. Add your domain (e.g. `quiz.yourdomain.com`)
3. Configure DNS as Vercel instructs

### 5.2 Update everywhere

| Service | What to update |
|---|---|
| Vercel | `NEXT_PUBLIC_APP_URL` → `https://quiz.yourdomain.com` |
| Clerk | Add domain + redirect URLs |
| Stripe | Update webhook endpoint URL (or add a second endpoint) |
| Supabase | No change needed |

Redeploy after updating env vars.

---

## Environment variable reference

Complete list of every env var the app reads:

```bash
# Clerk — authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY   # Client-side Clerk init
CLERK_SECRET_KEY                    # Server-side Clerk API
CLERK_WEBHOOK_SECRET                # Verify Clerk webhook signatures
NEXT_PUBLIC_CLERK_SIGN_IN_URL       # Default: /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL       # Default: /sign-up

# Supabase — database
NEXT_PUBLIC_SUPABASE_URL            # Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY       # Client-side (RLS-protected)
SUPABASE_SERVICE_ROLE_KEY           # Server-side (bypasses RLS — keep secret)

# Anthropic — AI quiz generation
ANTHROPIC_API_KEY                   # Server-side only

# Stripe — payments
STRIPE_SECRET_KEY                   # Server-side Stripe API
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  # Client-side (if needed)
STRIPE_WEBHOOK_SECRET               # Verify Stripe webhook signatures
STRIPE_PRO_PRICE_ID                 # Subscription price (price_...)

# App
NEXT_PUBLIC_APP_URL                 # Base URL for Stripe redirects
```

### Which keys are public vs secret

| Public (safe in browser) | Secret (server only) |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `CLERK_SECRET_KEY` |
| `NEXT_PUBLIC_SUPABASE_URL` | `SUPABASE_SERVICE_ROLE_KEY` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `STRIPE_SECRET_KEY` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `STRIPE_WEBHOOK_SECRET` |
| `NEXT_PUBLIC_APP_URL` | `CLERK_WEBHOOK_SECRET` |
| | `ANTHROPIC_API_KEY` |

Never prefix secrets with `NEXT_PUBLIC_`.

---

## API routes reference

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/quizzes` | GET, POST | Clerk | List/create quizzes |
| `/api/quizzes/[id]` | GET, DELETE | Clerk | Get/delete a quiz |
| `/api/attempts` | GET, POST | Clerk | List/save quiz attempts |
| `/api/generate` | POST | Clerk | AI quiz generation |
| `/api/stripe/checkout` | POST | Clerk | Create Stripe Checkout session |
| `/api/webhooks/clerk` | POST | Svix signature | Sync users to Supabase |
| `/api/webhooks/stripe` | POST | Stripe signature | Update subscription status |

Webhook routes must **not** require Clerk auth — they authenticate via their own signing secrets.

---

## Troubleshooting

### Clerk: "Publishable key not valid"

- `.env.local` still has placeholder text (`pk_test_...`) instead of the full key
- Wrong key copied (Stripe key instead of Clerk key — both start with `pk_test_`)
- Dev server not restarted after env change

### Stripe: "Invalid API Key provided"

- Same placeholder issue — paste the full `sk_test_...` key from Stripe Dashboard
- Using publishable key where secret key is expected

### Checkout works but user stays on free tier

- Stripe webhook not reaching the app
- Locally: `stripe listen` not running, or wrong `STRIPE_WEBHOOK_SECRET`
- Production: webhook URL wrong, or Vercel env var not updated after creating endpoint
- Check Stripe Dashboard → Webhooks → event log for delivery failures

### Dashboard loads but "User not found" on checkout

- Clerk webhook not syncing users to Supabase
- Check Clerk Dashboard → Webhooks → event log
- Verify `CLERK_WEBHOOK_SECRET` matches the endpoint
- Confirm user row exists in Supabase `users` table

### AI generation fails

- `ANTHROPIC_API_KEY` missing or invalid on Vercel
- User hit free tier limit (3/month) — upgrade to Pro or wait for reset

### 404 or blank page after deploy

- Wrong root directory in Vercel project settings
- Build failed — check Vercel deployment logs
- `NEXT_PUBLIC_APP_URL` mismatch causing redirect loops

### Env vars not taking effect

- Vercel requires a **redeploy** after changing env vars
- `NEXT_PUBLIC_*` vars are baked in at build time — redeploy after changing them

---

## Post-deploy checklist

### Prototype (test mode)

- [ ] App loads at Vercel URL
- [ ] Sign up / sign in works
- [ ] User row appears in Supabase after sign-up
- [ ] Create quiz via JSON upload
- [ ] Take quiz and view results
- [ ] AI quiz generation works
- [ ] Free tier limit enforced (3/month)
- [ ] Stripe Checkout opens from dashboard
- [ ] Test card completes payment
- [ ] `subscription_status` updates to `pro` in Supabase
- [ ] Unlimited AI generation after upgrade
- [ ] Webhook delivery succeeds in Stripe and Clerk dashboards

### Production (live mode)

- [ ] Clerk production keys configured
- [ ] Stripe live keys and live price ID configured
- [ ] Live webhook endpoints created with correct secrets
- [ ] Custom domain configured (if applicable)
- [ ] Real card checkout tested end-to-end
- [ ] Subscription cancellation updates status to `cancelled`
- [ ] No secrets committed to git
- [ ] `.env.local` in `.gitignore`

---

## Deployment timeline (live demo script)

Use this order when walking students through deployment:

```
1. npm run build          ← confirm it compiles
2. Supabase               ← database + migration
3. Clerk                  ← auth + keys
4. Stripe (test mode)     ← product + price + keys
5. Anthropic              ← API key
6. Local smoke test       ← full flow on localhost
7. git push               ← code to GitHub
8. Vercel import          ← deploy
9. Env vars on Vercel     ← copy from .env.local, update APP_URL
10. Production webhooks   ← Clerk + Stripe pointing at Vercel URL
11. Redeploy              ← pick up new secrets
12. Live smoke test       ← sign up → quiz → pay → pro
```

Estimated time: **45–60 minutes** for first deploy, **15 minutes** for subsequent deploys.

---

## Related files

| File | Purpose |
|---|---|
| `supabase/migrations/001_initial_schema.sql` | Database schema |
| `src/app/api/webhooks/clerk/route.ts` | Clerk → Supabase user sync |
| `src/app/api/webhooks/stripe/route.ts` | Stripe → subscription updates |
| `src/app/api/stripe/checkout/route.ts` | Creates Checkout session |
| `src/lib/stripe.ts` | Stripe client + plan config |
| `src/proxy.ts` | Auth middleware (protects `/dashboard`, `/quiz/create`) |
| `finish-up.md` | Shorter Stripe + Vercel quick reference |
