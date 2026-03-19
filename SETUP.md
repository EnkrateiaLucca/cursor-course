# Pre-Course Setup Checklist

Complete these steps **before** the live training to ensure a smooth experience.

---

## Required Software

- [ ] **Cursor IDE** — [cursor.com](https://cursor.com) (latest version)
- [ ] **Node.js 20+** — [nodejs.org](https://nodejs.org) (LTS recommended)
- [ ] **Git** — configured with your GitHub account
- [ ] **pnpm** (recommended) or npm — `npm install -g pnpm`

## Required Accounts (Free Tier)

| Service | Sign Up | What We Use It For |
|---------|---------|-------------------|
| **GitHub** | [github.com](https://github.com) | Version control, MCP integration |
| **GitHub PAT** | Settings → Developer settings → Personal access tokens | MCP GitHub server |
| **Supabase** | [supabase.com](https://supabase.com) | PostgreSQL database |
| **Vercel** | [vercel.com](https://vercel.com) | Deployment |
| **Clerk** | [clerk.com](https://clerk.com) | Authentication |
| **Stripe** | [stripe.com](https://stripe.com) | Payments (test mode) |

## Required API Keys

| Provider | Get Key | Purpose |
|----------|---------|---------|
| **OpenAI** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | AI quiz generation |
| **DeepSeek** (alternative) | [platform.deepseek.com](https://platform.deepseek.com) | Budget-friendly AI alternative |

## Clone McKay's App Template

This is the foundation for all demos from Section 02 onward:

```bash
git clone https://github.com/mckaywrigley/mckays-app-template.git
cd mckays-app-template
pnpm install
```

Verify it runs:
```bash
pnpm dev
# Should open at http://localhost:3000
```

## Cursor Configuration

1. Open Cursor IDE
2. Sign in to your Cursor account (Pro recommended for the course)
3. Verify models are accessible: Open Chat (Cmd+L) and send a test message
4. Install recommended extensions (optional):
   - ESLint
   - Tailwind CSS IntelliSense
   - Prettier

## Environment Variables Template

Create a `.env.local` file in your McKay template project:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key
CLERK_SECRET_KEY=your-secret-key

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# AI
OPENAI_API_KEY=your-openai-key
# OR
DEEPSEEK_API_KEY=your-deepseek-key
```

> You don't need all keys immediately — we'll set them up progressively through the course.

## Verification Checklist

Run through these to confirm everything works:

- [ ] `cursor --version` prints a version number
- [ ] `node --version` prints v20+
- [ ] `git --version` prints a version number
- [ ] `pnpm --version` prints a version number
- [ ] McKay's template runs with `pnpm dev`
- [ ] You can open Cursor Chat and get a response
- [ ] You have your GitHub PAT saved somewhere accessible

## Troubleshooting

**Cursor won't install:** Make sure you're on macOS 12+, Windows 10+, or Ubuntu 20.04+.

**Node version too old:** Use [nvm](https://github.com/nvm-sh/nvm) to manage versions: `nvm install 20 && nvm use 20`

**Template won't start:** Delete `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again.

**Can't access AI models in Cursor:** Check your Cursor subscription status in Settings → Account.
