# Demo: Stripe Payments

**Goal:** Add a payment flow so users can upgrade to a premium plan with more quiz generations.

---

## Step 1: Add Stripe Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Step 2: Create a Stripe Product

In the Stripe Dashboard (test mode):
1. Products → Add product
2. Name: "Quiz App Pro" / Price: $9.99/month
3. Copy the Price ID

## Step 3: Create Checkout Session

```
@actions/ Create a Server Action called createCheckoutSession that:
1. Takes a userId and priceId
2. Creates a Stripe Checkout Session
3. Redirects the user to Stripe's hosted checkout page
4. Sets success_url and cancel_url back to our app

Use the stripe npm package. Follow the Server Action patterns in this project.
```

## Step 4: Handle Webhooks

```
Create an API route at app/api/webhooks/stripe/route.ts that:
1. Receives Stripe webhook events
2. Verifies the webhook signature
3. Handles these events:
   - checkout.session.completed → mark user as premium in DB
   - customer.subscription.deleted → remove premium status
4. Returns 200 on success

Use the STRIPE_WEBHOOK_SECRET for verification.
```

## Step 5: Add Premium UI

```
@components/ Create a pricing component that shows:
- Free tier: 3 quizzes per day
- Pro tier: Unlimited quizzes, $9.99/month
- A "Upgrade" button that triggers the checkout flow
- Show the user's current plan status

Check the user's premium status from the database.
```

## Step 6: Test with Stripe CLI

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Use test card: `4242 4242 4242 4242`

## What to Emphasize

- Stripe test mode is safe — no real charges
- Webhooks are essential: they're how Stripe tells your app about payment events
- Always verify webhook signatures to prevent spoofing
- The checkout page is hosted by Stripe — you don't handle card numbers

## Timing

~15 min
