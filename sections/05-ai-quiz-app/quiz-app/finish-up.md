# Finish-Up: Stripe & Vercel Deployment

All the code is already built. These steps wire up the external services.

---

## Part 1 — Stripe Setup

### 1.1 Create a Stripe Product + Price

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)
2. Click **Add product**
   - Name: `Quiz App Pro`
   - Pricing: **Recurring**, e.g. `$9/month`
3. After creation, copy the **Price ID** (starts with `price_`)
4. Add it to `.env.local`:
   ```
   STRIPE_PRO_PRICE_ID=price_xxxxxxxxxxxxx
   ```

### 1.2 Get Stripe API Keys

1. Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
2. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy **Secret key** → `STRIPE_SECRET_KEY`

### 1.3 Set Up Stripe Webhook (Local Testing)

1. Install the Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret it prints → `STRIPE_WEBHOOK_SECRET`
5. Events the app handles:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 1.4 Test the Flow Locally

1. Start the app: `npm run dev`
2. Sign up → go to Dashboard → click Upgrade / Pro CTA
3. Use Stripe test card: `4242 4242 4242 4242`, any future expiry, any CVC
4. After checkout, verify in Supabase that your user's `subscription_status` = `pro`
5. Verify AI generation limit is lifted (free tier = 3/month, pro = unlimited)

---

## Part 2 — Vercel Deployment

### 2.1 Push to GitHub

```bash
git add -A
git commit -m "Prepare for deployment"
git push origin main
```

### 2.2 Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Add **all** environment variables from `.env.local`:

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` (or `pk_test_...`) |
   | `CLERK_SECRET_KEY` | `sk_live_...` (or `sk_test_...`) |
   | `CLERK_WEBHOOK_SECRET` | `whsec_...` |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
   | `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` |
   | `ANTHROPIC_API_KEY` | `sk-ant-...` |
   | `STRIPE_SECRET_KEY` | `sk_live_...` (or `sk_test_...`) |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` (or `pk_test_...`) |
   | `STRIPE_WEBHOOK_SECRET` | `whsec_...` (production one, see 2.3) |
   | `STRIPE_PRO_PRICE_ID` | `price_...` |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

5. Click **Deploy**

### 2.3 Configure Production Webhooks

After deployment, update the webhook URLs to point to your Vercel domain.

**Stripe webhook:**
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
3. Copy the **Signing secret** → update `STRIPE_WEBHOOK_SECRET` in Vercel env vars

**Clerk webhook:**
1. Go to [Clerk Dashboard → Webhooks](https://dashboard.clerk.com/webhooks)
2. Add endpoint: `https://your-app.vercel.app/api/webhooks/clerk`
3. Events: `user.created`, `user.updated`, `user.deleted`
4. Copy the **Signing secret** → update `CLERK_WEBHOOK_SECRET` in Vercel env vars

### 2.4 Update Clerk Redirect URLs

In Clerk Dashboard → your application:
- Add your Vercel domain to **Allowed redirect URLs**
- Update the production domain if using a custom domain

### 2.5 Run the Supabase Migration

If you haven't already applied the schema to a production Supabase project:

1. Go to Supabase Dashboard → SQL Editor
2. Paste the contents of `supabase/migrations/001_initial_schema.sql`
3. Run it

### 2.6 Redeploy After Env Changes

After updating any environment variables in the Vercel dashboard:

```bash
vercel --prod
```

Or trigger a redeploy from the Vercel dashboard (Deployments → three dots → Redeploy).

---

## Post-Deploy Checklist

- [ ] App loads at your Vercel URL
- [ ] Sign up / sign in works (Clerk)
- [ ] Creating a quiz (JSON upload) works
- [ ] AI quiz generation works (Anthropic)
- [ ] Playing a quiz shows results
- [ ] Stripe checkout redirects and upgrades user to Pro
- [ ] Webhook events update `subscription_status` in Supabase
- [ ] Dashboard shows real stats and quiz library

---

## Going Live (Optional)

When ready to switch from Stripe test mode to live:

1. Toggle Stripe Dashboard to **Live mode**
2. Create the same Product + Price in live mode
3. Replace all `sk_test_` / `pk_test_` keys with `sk_live_` / `pk_live_` in Vercel
4. Create a new live webhook endpoint and update `STRIPE_WEBHOOK_SECRET`
5. Redeploy
