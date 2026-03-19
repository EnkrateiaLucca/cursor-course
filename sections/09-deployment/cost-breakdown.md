# Cost Breakdown

Estimated costs for running the quiz app in production.

## Free Tier Limits

| Service | Free Tier | Limit Details |
|---------|-----------|---------------|
| **Vercel** | Hobby plan | 100 GB bandwidth/mo, 100 hrs serverless/mo |
| **Supabase** | Free plan | 500 MB database, 1 GB file storage, 50K monthly active users |
| **Clerk** | Free plan | 10,000 monthly active users |
| **Stripe** | No monthly fee | 2.9% + 30c per transaction |
| **OpenAI** | Pay per use | ~$0.15 per 1M input tokens (gpt-4o-mini) |

## Cost Estimate: Small App (< 100 users)

| Service | Monthly Cost |
|---------|-------------|
| Vercel | $0 (free tier) |
| Supabase | $0 (free tier) |
| Clerk | $0 (free tier) |
| Stripe | $0 base + per-transaction fees |
| OpenAI (est. 1K quiz generations) | ~$1-5 |
| **Total** | **~$1-5/mo** |

## Cost Estimate: Growing App (1K+ users)

| Service | Monthly Cost |
|---------|-------------|
| Vercel Pro | $20/mo |
| Supabase Pro | $25/mo |
| Clerk Pro | $25/mo (after 10K MAU) |
| Stripe | Per-transaction only |
| OpenAI (est. 10K generations) | ~$10-50 |
| **Total** | **~$80-120/mo** |

## Cost-Saving Tips

- **DeepSeek** is significantly cheaper than OpenAI for quiz generation (~10x cheaper)
- **Supabase** free tier is generous — most side projects never exceed it
- **Vercel** Hobby plan handles surprising amounts of traffic
- **Clerk** free tier supports 10K MAU — plenty for most apps
- Cache AI responses to avoid regenerating identical quizzes
- Use `gpt-4o-mini` instead of `gpt-4o` for quiz generation (much cheaper, quality is fine)

## When to Upgrade

- Vercel: When you need team features, analytics, or >100 GB bandwidth
- Supabase: When database exceeds 500 MB or you need daily backups
- Clerk: When you exceed 10K monthly active users
- OpenAI: Consider switching to DeepSeek if costs become significant
