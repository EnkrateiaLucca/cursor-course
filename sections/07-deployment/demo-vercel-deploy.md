# Demo: Vercel Deployment

**Goal:** Deploy the quiz app to production on Vercel.

---

## Step 1: Pre-Deploy Check

Run through [production-checklist.md](production-checklist.md) first.

Quick verification:
```bash
pnpm build
```
If the build succeeds locally, it'll succeed on Vercel.

## Step 2: Push to GitHub

```bash
git add -A
git commit -m "feat: complete AI quiz app with auth and payments"
git push origin main
```

## Step 3: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import Git Repository → select your quiz app repo
3. Framework Preset: Next.js (auto-detected)
4. Root Directory: `./` (default)
5. **Don't deploy yet** — configure env vars first

## Step 4: Configure Environment Variables

In the Vercel project settings → Environment Variables, add all variables from [env-vars-reference.md](../08-backend-auth-payments/env-vars-reference.md).

Important differences for production:
- `DATABASE_URL` — Use the **pooled** connection string from Supabase (port 6543, not 5432)
- Clerk keys — Use **production** keys, not test keys
- Stripe keys — Use **live** keys when ready (keep test for now)

## Step 5: Deploy

Click "Deploy" and watch the build logs.

Common issues:
- Missing env vars → build fails with undefined errors
- Wrong Node.js version → set in Settings → General → Node.js Version
- Build timeout → check for infinite loops or heavy operations in build

## Step 6: Configure Custom Domain (Optional)

1. Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Step 7: Set Up Stripe Webhook for Production

1. In Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://your-app.vercel.app/api/webhooks/stripe`
3. Events: `checkout.session.completed`, `customer.subscription.deleted`
4. Copy the webhook signing secret to Vercel env vars

## Step 8: Verify

1. Visit the deployed URL
2. Test sign in/sign up
3. Create a quiz
4. Take the quiz
5. Check results page

## Timing

- Pre-check + push: ~5 min
- Vercel import + env vars: ~10 min
- Deploy + verify: ~10 min
- Discussion: ~5 min
