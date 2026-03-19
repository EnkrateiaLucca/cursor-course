# Task Manager App - External Setup Guide

This guide covers all the setup steps you need to do **outside the code** - creating accounts, configuring services, getting API keys, and running SQL scripts.

## Prerequisites

Before starting, make sure you have:
- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)

You'll need to create **free accounts** on these platforms:
1. **Clerk** (https://clerk.com) - For user authentication
2. **Supabase** (https://supabase.com) - For PostgreSQL database
3. **Vercel** (https://vercel.com) - For deployment
4. **GitHub** (https://github.com) - For code hosting

---

## Part 1: Clerk Setup (Authentication)

Clerk provides drop-in authentication with sign-up, sign-in, and session management.

### Step 1: Create a Clerk Account

1. Go to https://dashboard.clerk.com
2. Sign up with your email or GitHub account
3. Verify your email if prompted

### Step 2: Create a New Application

1. Click **"Add application"** or **"Create application"**
2. **Application name**: `Task Manager` (or any name you prefer)
3. **Choose sign-in methods**:
   - ✅ Email/Password (simplest option)
   - You can enable Google, GitHub, etc. later if desired
4. Click **"Create application"**

### Step 3: Get Your API Keys

After creating the application, you'll see your API keys:

1. Look for **"API Keys"** section or tab
2. Find and copy these two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

3. Open your project's `.env.local` file and add:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   CLERK_SECRET_KEY=sk_test_your_actual_key_here
   ```

**Important Notes:**
- The `pk_test_` key is safe to expose in your frontend code
- The `sk_test_` key must remain secret (never commit to Git)
- Test keys (`pk_test_` and `sk_test_`) work on any domain (localhost, Vercel, etc.)
- You don't need to configure domains when using test keys

### Step 4: Configure Authentication Settings (Optional)

Clerk's default settings work great, but you can customize:

1. **Session duration**: Go to "Sessions" → Set how long users stay logged in (default: 7 days)
2. **User profile fields**: Go to "User & Authentication" → Customize what info to collect
3. **Branding**: Go to "Customization" → Add your logo and colors

**No domain configuration needed!** Test keys work everywhere automatically.

---

## Part 2: Supabase Setup (Database)

Supabase provides a managed PostgreSQL database with a great dashboard.

### Step 1: Create a Supabase Account

1. Go to https://app.supabase.com
2. Sign up with GitHub (recommended) or email
3. Verify your email if prompted

### Step 2: Create a New Project

1. Click **"New project"** or **"Create a new project"**
2. **Choose an organization**: Create one if this is your first time (e.g., "Personal")
3. Fill in project details:
   - **Name**: `task-manager` (or your choice)
   - **Database Password**: Generate a strong password
     - ⚠️ **SAVE THIS PASSWORD!** You'll need it to access the database directly
     - Store it in a password manager
   - **Region**: Choose the one closest to you (e.g., US East, EU West)
   - **Pricing Plan**: Free (perfect for development)
4. Click **"Create new project"**
5. Wait 1-2 minutes while Supabase provisions your database

### Step 3: Get Your API Credentials

Once the project is created:

1. Click on **"Project Settings"** (gear icon at bottom left sidebar)
2. Go to **"API"** section
3. You'll see several important values:

   **Copy these two:**
   - **Project URL** (at the top, looks like `https://abcdefgh.supabase.co`)
   - **Publishable key** (scroll down, labeled "anon public" or starts with `sb_publishable_...`)

4. Open your project's `.env.local` file and add:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_actual_key_here
   ```

**About Supabase Keys:**
- **Publishable key** (`sb_publishable_...`): Safe to use in client-side code
- **Service role key**: Don't use this (we don't need it for this app)
- The publishable key respects security rules but we're handling auth server-side

### Step 4: Create the Database Table

Now you need to create the `tasks` table where all task data will be stored.

1. In Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"** button
3. Copy the SQL from your project's `supabase-schema.sql` file:

```sql
-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);

-- Disable Row Level Security since we handle auth server-side via API routes
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
```

4. Paste it into the SQL editor
5. Click **"Run"** (or press `Cmd/Ctrl + Enter`)
6. You should see: ✅ **"Success. No rows returned"**

### Step 5: Verify the Table Was Created

1. Click **"Table Editor"** in the left sidebar
2. You should see a table named **"tasks"**
3. Click on it to see the schema:
   - `id` - UUID (Primary Key)
   - `user_id` - TEXT
   - `title` - TEXT
   - `completed` - BOOLEAN
   - `created_at` - TIMESTAMPTZ

**What This Table Does:**
- Stores all tasks for all users
- `user_id` links tasks to Clerk users
- `completed` tracks if task is done
- `created_at` allows sorting by newest first

**Security Note:**
- Row Level Security (RLS) is **disabled**
- Security is enforced in the Next.js API routes
- All database queries go through authenticated API endpoints
- API routes validate the Clerk session and filter by `user_id`

---

## Part 3: Local Development Setup

Now that external services are configured, let's test locally.

### Step 1: Verify Environment Variables

Check that your `.env.local` file has all 4 variables:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Development Server

```bash
npm run dev
```

### Step 4: Test the Application

1. Open http://localhost:3000 in your browser
2. You'll be redirected to Clerk's sign-in page
3. Click **"Sign up"** to create a new account
4. Enter your email and password
5. You'll be redirected back to the app
6. Try these operations:
   - ✅ Add a new task
   - ✅ Toggle a task as completed
   - ✅ Delete a task
   - ✅ Sign out (using the user button in top-right)

**If everything works, you're ready for deployment!**

---

## Part 4: GitHub Repository Setup

To deploy on Vercel, your code needs to be on GitHub.

### Option A: Automatic (Using GitHub CLI)

If you have GitHub CLI installed:

```bash
gh repo create task-manager-app --private --source=. --remote=origin --push
```

This creates the repo and pushes your code in one command!

### Option B: Manual Setup

1. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Repository name: `task-manager-app`
   - Privacy: **Private** (recommended)
   - Don't initialize with README (you already have one)
   - Click **"Create repository"**

2. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/task-manager-app.git
   git branch -M main
   git push -u origin main
   ```

Your code is now on GitHub! 🎉

---

## Part 5: Vercel Deployment

Vercel is a hosting platform optimized for Next.js applications.

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your **`task-manager-app`** repository in the list
3. Click **"Import"**

### Step 3: Configure Project Settings

Vercel auto-detects Next.js, so most settings are already correct:

- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅

**Don't click Deploy yet!** You need to add environment variables first.

### Step 4: Add Environment Variables

This is the **most important step**! Scroll down to **"Environment Variables"** section.

Add all 4 variables (click "+ Add New" for each):

| Name | Value | Where to Find |
|------|-------|---------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | Your `.env.local` file |
| `CLERK_SECRET_KEY` | `sk_test_...` | Your `.env.local` file |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://....supabase.co` | Your `.env.local` file |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` | Your `.env.local` file |

**Tips:**
- Copy-paste directly from your `.env.local` to avoid typos
- Double-check there are no extra spaces or quotes
- All 4 variables apply to all environments (Production, Preview, Development)

### Step 5: Deploy!

1. Click **"Deploy"** button
2. Wait 1-2 minutes while Vercel:
   - Installs dependencies
   - Builds your Next.js app
   - Deploys to their global CDN
3. You'll see a success screen with confetti 🎉
4. **Copy your deployment URL** (looks like `https://task-manager-app-abc123.vercel.app`)

### Step 6: Test Your Production App

1. Click **"Visit"** or open your Vercel URL
2. You should be redirected to Clerk sign-in
3. Sign in with your account (or create a new one)
4. Test all functionality:
   - ✅ Add tasks
   - ✅ Toggle completion
   - ✅ Delete tasks
   - ✅ Sign out and sign back in

**That's it! Your app is live! 🚀**

---

## Part 6: Post-Deployment (Optional)

### Set Up Custom Domain (Optional)

If you have your own domain:

1. In Vercel, go to your project → **"Settings"** → **"Domains"**
2. Add your custom domain (e.g., `tasks.yourdomain.com`)
3. Follow Vercel's instructions to configure DNS
4. Vercel automatically provisions SSL certificate

### Enable Vercel Analytics (Optional)

1. In Vercel project, go to **"Analytics"** tab
2. Click **"Enable"**
3. This gives you:
   - Page view tracking
   - Performance metrics (Core Web Vitals)
   - User session data

### Monitor Your App

**Vercel Dashboard:**
- View deployment logs
- Monitor build status
- Check error logs
- See performance metrics

**Supabase Dashboard:**
- Monitor database queries
- View table data
- Check database performance
- Manage backups

**Clerk Dashboard:**
- View user signups
- Monitor authentication events
- Manage user accounts
- See session activity

---

## Troubleshooting Common Issues

### Issue: "Environment variables not defined"

**Symptoms:** Build fails or app doesn't work in production

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all 4 variables are present
3. Check for typos or extra spaces
4. Redeploy: Deployments → ⋯ Menu → Redeploy

---

### Issue: "Clerk authentication not working"

**Symptoms:** Stuck in redirect loop or can't sign in

**Solution with Test Keys (pk_test_):**
- Test keys work on ANY domain automatically
- No configuration needed in Clerk dashboard
- Just verify your keys are correct in Vercel environment variables

**If using Production Keys (pk_live_):**
- You need to add your Vercel domain in Clerk dashboard
- Go to Clerk → Domains → Add your Vercel URL

---

### Issue: "Can't load tasks" or "Error loading tasks"

**Symptoms:** Authenticated but tasks don't load

**Solutions:**
1. **Check Supabase table exists:**
   - Go to Supabase → Table Editor
   - Verify `tasks` table is there
   - If missing, run the SQL schema again

2. **Verify Supabase credentials:**
   - Go to Vercel → Settings → Environment Variables
   - Check `NEXT_PUBLIC_SUPABASE_URL` is correct
   - Check `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is correct

3. **Check browser console:**
   - Press F12 to open developer tools
   - Look for error messages
   - Check Network tab for failed API requests

---

### Issue: "API route returns 401 Unauthorized"

**Symptoms:** Can sign in but can't create/view tasks

**Solution:**
- This means Clerk session validation is failing
- Check that `CLERK_SECRET_KEY` is set in Vercel
- Try signing out and signing back in
- Check browser cookies aren't blocked

---

### Issue: Build fails on Vercel

**Symptoms:** Deployment fails during build step

**Common Causes:**
1. **TypeScript errors**: Fix locally first, test with `npm run build`
2. **Missing dependencies**: Commit `package-lock.json`
3. **Environment variables**: Some might be needed at build time

**Solution:**
- Check build logs in Vercel dashboard
- Fix errors locally first
- Test build with `npm run build` before pushing

---

## Security Checklist

Before going live with real users:

- [ ] Change Supabase database password from default
- [ ] Never commit `.env.local` to Git (it's in `.gitignore`)
- [ ] Use environment variable manager (1Password, etc.) for backups
- [ ] Enable 2FA on Clerk, Supabase, Vercel, and GitHub accounts
- [ ] Review Clerk security settings
- [ ] Set up Supabase database backups (automatic on paid plans)
- [ ] Monitor Vercel deployment logs for errors
- [ ] Consider upgrading to production keys (`pk_live_`) for Clerk
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Review API rate limits

---

## Quick Reference

### API Keys Locations

**Clerk:**
- Dashboard: https://dashboard.clerk.com
- Location: API Keys section
- Keys needed: Publishable (`pk_test_...`) and Secret (`sk_test_...`)

**Supabase:**
- Dashboard: https://app.supabase.com
- Location: Project Settings → API
- Keys needed: Project URL and Publishable key (`sb_publishable_...`)

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- Location: Project → Settings → Environment Variables
- Add: All 4 environment variables from `.env.local`

### Important URLs

- **Local Development**: http://localhost:3000
- **Production**: Your Vercel URL (e.g., `https://your-app.vercel.app`)
- **GitHub Repo**: https://github.com/YOUR-USERNAME/task-manager-app
- **Clerk Dashboard**: https://dashboard.clerk.com
- **Supabase Dashboard**: https://app.supabase.com
- **Vercel Dashboard**: https://vercel.com/dashboard

### Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Clerk Docs**: https://clerk.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

---

## Summary

You've successfully set up:

✅ **Clerk** - User authentication with test keys that work everywhere
✅ **Supabase** - PostgreSQL database with tasks table created
✅ **GitHub** - Code repository for version control
✅ **Vercel** - Production deployment with environment variables

Your task manager is now:
- 🔒 Secure (server-side API routes with authentication)
- 🌍 Live (accessible from anywhere)
- 📱 Responsive (works on mobile and desktop)
- 🚀 Fast (deployed on Vercel's global CDN)

**Next Steps:**
- Add custom features (see PLAN.md for ideas)
- Invite friends to try your app
- Monitor usage in dashboards
- Consider adding analytics

Congratulations! 🎉
