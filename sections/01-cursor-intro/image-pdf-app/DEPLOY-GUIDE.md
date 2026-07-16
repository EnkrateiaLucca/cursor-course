# Image PDF Layout — Production Deploy Guide

This guide covers the steps to take the prototype from local-only to a public, paid product with users and authentication.

**Current state:** The app is a fully client-side editor. Images never leave the browser. There is no auth, no database, and no billing. The Vercel deployment has been removed — redeploy when you're ready.

---

## Phase 1: Redeploy the Prototype

Get the working editor back online before adding complexity.

### 1.1 Prerequisites

- GitHub repo with the app pushed
- [Vercel](https://vercel.com) account (free tier is fine)

### 1.2 Deploy

```bash
cd sections/01-cursor-intro/image-pdf-app
npm install
npm run build   # verify locally first
vercel deploy --prod
```

Or connect via Vercel dashboard:

1. **Import** the GitHub repo
2. Set **Root Directory** to `sections/01-cursor-intro/image-pdf-app`
3. Deploy — no env vars needed at this stage

### 1.3 Security note

Use a patched Next.js version (15.3.6+). Vercel blocks deployments with known CVE-affected versions.

### 1.4 Optional: custom domain

In Vercel → Project → Settings → Domains, add something like `layout.yourdomain.com`.

---

## Phase 2: Add User Authentication

Gate the editor behind login so you know who's using it and can tie them to a subscription.

### 2.1 Recommended stack

| Service | Role | Why |
|---|---|---|
| [Clerk](https://clerk.com) | Auth (sign up, sign in, sessions) | Same stack as the course demo (`quizupload/`) — drop-in Next.js integration |
| Clerk middleware | Protect `/` route | Redirect unauthenticated users to `/login` |

### 2.2 Setup steps

1. Create a Clerk application at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Install dependencies:

```bash
npm install @clerk/nextjs
```

3. Add env vars (local `.env.local` + Vercel project settings):

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
```

4. Wrap the app in `ClerkProvider` in `app/layout.tsx`
5. Add middleware to protect the editor:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher(["/login(.*)", "/signup(.*)", "/pricing"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublic(req)) await auth.protect();
});

export const config = { matcher: ["/((?!.*\\..*|_next).*)"] };
```

6. Create `/login` and `/signup` pages using Clerk's prebuilt components
7. Add a `/pricing` page (public) that explains plans before sign-up

### 2.3 Reference in this repo

See `quizupload/` for a working Clerk + Next.js App Router setup:

- `middleware.ts` — route protection
- `app/(unauthenticated)/(marketing)/(auth)/` — login/signup pages
- `app/(authenticated)/` — protected app routes

---

## Phase 3: Add a Database (User Data & Saved Layouts)

The prototype stores everything in browser memory. To retain value for paying users, persist layouts.

### 3.1 Recommended stack

| Service | Role |
|---|---|
| [Supabase](https://supabase.com) or [Neon](https://neon.tech) | PostgreSQL hosting |
| [Drizzle ORM](https://orm.drizzle.team) | Type-safe schema + migrations |

### 3.2 Minimal schema

```sql
-- users are managed by Clerk; store clerk_user_id as the link

layouts (
  id            uuid primary key,
  clerk_user_id text not null,
  name          text not null,
  data          jsonb not null,   -- serialized EditorState (pages, items, image refs)
  created_at    timestamptz,
  updated_at    timestamptz
)

subscriptions (
  id              uuid primary key,
  clerk_user_id   text not null unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  status          text,           -- active | canceled | past_due
  plan            text,           -- free | pro | team
  current_period_end timestamptz
)
```

### 3.3 Image storage decision

Images are currently `data:` URLs in memory. For saved layouts you have two options:

| Approach | Pros | Cons |
|---|---|---|
| **Store data URLs in JSONB** | Simple, no new infra | Large DB rows, slow for many/high-res images |
| **Upload to object storage** (Supabase Storage / Vercel Blob / S3) | Scalable, smaller DB | More code — upload on add, fetch on load |

For a paid product, **object storage + DB metadata** is the right long-term choice.

### 3.4 Env vars

```bash
DATABASE_URL=postgresql://...
```

---

## Phase 4: Add Payments (Stripe)

Charge for premium features. Common model for a tool like this:

| Tier | Price | Features |
|---|---|---|
| **Free** | $0 | 1 page, watermarked PDF, 5 images per session |
| **Pro** | $8–12/mo | Unlimited pages/images, saved layouts, no watermark |
| **Team** | $25+/mo | Shared layouts, multiple seats |

### 4.1 Setup steps

1. Create a [Stripe](https://stripe.com) account
2. Create Products + Prices in Stripe Dashboard (monthly + yearly)
3. Install Stripe:

```bash
npm install stripe @stripe/stripe-js
```

4. Add env vars:

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY=https://buy.stripe.com/...
```

5. Create `/api/stripe/webhook` route to handle:
   - `checkout.session.completed` → mark subscription active in DB
   - `customer.subscription.updated` → sync plan/status
   - `customer.subscription.deleted` → downgrade to free

6. Add a **Upgrade** button in the toolbar that links to Stripe Checkout
7. Check subscription status in middleware or server components before allowing premium actions

### 4.2 Reference in this repo

See `quizupload/` for Stripe webhook + customer sync patterns:

- `app/api/stripe/webhooks/route.ts`
- `actions/customers.ts`
- `db/schema/customers.ts`

### 4.3 Clerk + Stripe billing portal (optional shortcut)

Clerk has a [Stripe integration](https://clerk.com/docs/integrations/overview) that can simplify customer linking. Alternatively use Stripe Customer Portal for self-service cancel/upgrade.

---

## Phase 5: Feature Gating

Wire auth + billing into the editor.

### 5.1 Server-side checks

```typescript
// lib/subscription.ts
export async function requirePro() {
  const { userId } = await auth();
  const sub = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.clerkUserId, userId),
  });
  if (sub?.status !== "active") throw new Error("Pro subscription required");
}
```

### 5.2 Client-side UX

| Feature | Free | Pro |
|---|---|---|
| Pages | 1 | Unlimited |
| Images per session | 5 | Unlimited |
| Save/load layouts | No | Yes |
| HEIC conversion | Yes | Yes |
| PDF export | Watermark | Clean |
| Image tray | Yes | Yes |

Show upgrade prompts inline (e.g. toast or modal) when a free user hits a limit — don't hide buttons silently.

---

## Phase 6: Launch Checklist

### Before going public

- [ ] Privacy policy + terms of service pages
- [ ] Cookie/consent banner if using analytics
- [ ] Stripe live mode keys (not test keys)
- [ ] Clerk production instance
- [ ] Error monitoring ([Sentry](https://sentry.io) free tier)
- [ ] Analytics ([Vercel Analytics](https://vercel.com/analytics) or [PostHog](https://posthog.com))
- [ ] Rate limiting on API routes (saved layouts, uploads)
- [ ] File size limits on image upload (e.g. 20 MB per file)

### Marketing / getting users

- [ ] Landing page at `/` with demo GIF + pricing
- [ ] Move editor to `/app` or `/editor` (keep `/` for marketing)
- [ ] Product Hunt / Twitter / course audience launch
- [ ] Free tier generous enough to try, limits clear enough to convert

### Ongoing

- [ ] Monitor Stripe webhook failures in Vercel logs
- [ ] Keep Next.js patched (security advisories block deploys)
- [ ] Back up Supabase/Neon on a schedule

---

## Suggested Folder Structure (Post-Launch)

```
image-pdf-app/
├── app/
│   ├── (marketing)/          # Public: landing, pricing, about
│   │   ├── page.tsx          # Landing page
│   │   └── pricing/page.tsx
│   ├── (auth)/               # Clerk login/signup
│   │   ├── login/[[...login]]/page.tsx
│   │   └── signup/[[...signup]]/page.tsx
│   ├── (app)/                # Protected editor
│   │   ├── editor/page.tsx
│   │   └── layouts/page.tsx  # Saved layouts list
│   └── api/
│       ├── stripe/webhooks/route.ts
│       └── layouts/route.ts
├── db/
│   ├── schema/
│   └── index.ts
├── actions/                  # Server actions (save layout, etc.)
└── middleware.ts             # Clerk auth + route protection
```

---

## Quick Reference: Env Vars (Full Production)

```bash
# Database
DATABASE_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY=

# Optional: object storage
BLOB_READ_WRITE_TOKEN=          # Vercel Blob
# or SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
```

---

## Estimated Effort

| Phase | Scope | Rough time |
|---|---|---|
| 1. Redeploy prototype | Vercel only | 30 min |
| 2. Auth (Clerk) | Login, protect routes | 2–4 hours |
| 3. Database + save layouts | Schema, CRUD, storage | 1–2 days |
| 4. Stripe billing | Checkout, webhooks, gating | 1–2 days |
| 5. Landing + pricing pages | Marketing site | 1 day |
| 6. Polish + launch | Legal, monitoring, limits | 1 day |

**Total to paid MVP:** ~1 week focused work, using patterns from `quizupload/` in this repo.

---

## What You Have Today

The prototype in this folder is the **editor core** — all the hard UX (drag, resize, multi-page, HEIC, print-to-PDF) is done. The remaining work is standard SaaS plumbing: auth, persistence, billing, and a landing page. The course demo project (`quizupload/`) is your blueprint for all of it.
