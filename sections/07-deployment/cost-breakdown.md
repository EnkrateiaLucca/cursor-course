# Cost Breakdown

Estimated costs for running the quiz app in production.

## Free Tier Limits

| Service | Free Tier | Limit Details |
|---------|-----------|---------------|
| **Vercel** | Hobby plan | 100 GB fast data transfer/mo, 1M edge requests/mo, 4 hrs Active CPU/mo + 360 GB-hrs provisioned memory (Fluid compute) |
| **Supabase** | Free plan | 500 MB database, 1 GB file storage, 50K monthly active users |
| **Clerk** | Free plan | 50,000 monthly retained users (MRU) |
| **Stripe** | No monthly fee | 2.9% + 30c per transaction |
| **OpenAI** | Pay per use | ~$2.00 per 1M input tokens (gpt-5.6-terra); ~$0.20 cheapest (gpt-5.6-luna) |

> **Clerk counts MRU, not MAU.** A signup only becomes a billable *monthly retained user* once it comes back 24h or more after registering — so trials, bots, and one-off signups never count against the 50,000.

## Cost Estimate: Small App (< 100 users)

| Service | Monthly Cost |
|---------|-------------|
| Vercel | $0 (free tier) |
| Supabase | $0 (free tier) |
| Clerk | $0 (free tier) |
| Stripe | $0 base + per-transaction fees |
| OpenAI (est. 1K quiz generations) | ~$3-15 |
| **Total** | **~$3-15/mo** |

## Cost Estimate: Growing App (1K+ users)

| Service | Monthly Cost |
|---------|-------------|
| Vercel Pro | $20/mo |
| Supabase Pro | $25/mo |
| Clerk | $0 at this scale (Pro is $25/mo, or $20/mo annual, above 50K MRU) |
| Stripe | Per-transaction only |
| OpenAI (est. 10K generations) | ~$25-135 |
| **Total** | **~$70-180/mo** |

## Cost-Saving Tips

- **DeepSeek** (`deepseek-flash`) prices by time of day: $0.15 in / $0.60 out per 1M off-peak, doubling to $0.30 / $1.20 during peak (01:00-04:00 and 06:00-10:00 UTC, Mon-Fri), versus `gpt-5.6-luna`'s flat $0.20 / $1.20
- Quiz generation is output-heavy, so DeepSeek's off-peak output price is a genuine saving — half of luna's, and off-peak DeepSeek is cheaper on input too. At peak, though, output is *exactly level* ($1.20 either way) and input is 1.5x *more* expensive, so a provider switch only pays off if your traffic lands off-peak
- **Supabase** free tier is generous — most side projects never exceed it
- **Vercel** Hobby plan handles surprising amounts of traffic
- **Clerk** free tier supports 50K MRU — plenty for most apps
- Cache AI responses to avoid regenerating identical quizzes
- Use `gpt-5.6-terra` for quiz generation (quality is fine), or `gpt-5.6-luna` for the cheapest option when quality needs are modest

## When to Upgrade

- Vercel: When you need team features, analytics, or >100 GB fast data transfer
- Supabase: When database exceeds 500 MB or you need daily backups
- Clerk: When you exceed 50K monthly retained users
- OpenAI: DeepSeek only pays off if your traffic lands off-peak — check the peak window against your usage before switching providers
