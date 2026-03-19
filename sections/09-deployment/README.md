# Section 09: Deployment

**Slides:** 54–62 | **Duration:** ~30 min | **Break after:** No

## Learning Goals

- Deploy a Next.js app to Vercel with proper configuration
- Manage environment variables across environments
- Understand production readiness requirements
- Estimate costs for the full stack (free tier limits)

## Prerequisites

- Vercel account connected to GitHub
- Quiz app with all features from Sections 05–08
- All environment variables ready

## Demo Checklist

- [ ] Walk through production checklist (see [production-checklist.md](production-checklist.md))
- [ ] Deploy to Vercel step by step (see [demo-vercel-deploy.md](demo-vercel-deploy.md))
- [ ] Configure production env vars in Vercel
- [ ] Review cost breakdown (see [cost-breakdown.md](cost-breakdown.md))
- [ ] Show the live deployed app

## Files in This Section

| File | Purpose |
|------|---------|
| [demo-vercel-deploy.md](demo-vercel-deploy.md) | Step-by-step Vercel deployment |
| [production-checklist.md](production-checklist.md) | Pre-deploy checklist |
| [cost-breakdown.md](cost-breakdown.md) | Free tier limits and costs |
| [prompts.md](prompts.md) | Deployment prompts |

## Key Talking Points

- Vercel is zero-config for Next.js — import the repo and deploy
- Environment variables are the #1 deployment issue — double-check them all
- Free tiers are generous: Vercel, Supabase, Clerk all have usable free plans
- Production is different from dev: enable RLS, use connection pooling, set up monitoring
