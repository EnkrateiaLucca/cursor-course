# Section 09: Prompts

## Pre-Deploy Check

```
@codebase Run a pre-deployment check:
1. Are there any console.log statements that should be removed?
2. Are all environment variables properly referenced (not hardcoded)?
3. Are there any TODO comments that need addressing?
4. Is error handling in place for all Server Actions?
5. Are all TypeScript types strict (no 'any')?

List any issues found with file paths and line numbers.
```

## Vercel Configuration

```
Create a vercel.json configuration file with:
- Node.js 20 runtime
- Appropriate build settings for Next.js
- Headers for security (X-Frame-Options, Content-Security-Policy)
- Redirect from www to non-www (or vice versa)
```

## Production Environment

```
@env-vars-reference.md Review all environment variables and tell me:
1. Which ones need different values for production vs development?
2. Which ones are exposed to the client (NEXT_PUBLIC_*)?
3. Are there any security concerns with the current setup?
```

## Database Production Setup

```
@db/schema/ Generate the SQL commands needed to:
1. Enable Row Level Security on all tables
2. Create RLS policies so users can only access their own data
3. Add indexes on frequently queried columns (user_id, quiz_id)
4. Set up the user isolation policy for Clerk user IDs
```

## Post-Deploy Verification

```
After deploying to Vercel, create a quick smoke test checklist:
1. Homepage loads
2. Sign in/sign up works
3. Creating a quiz succeeds
4. Taking a quiz works
5. Results display correctly
6. Stripe checkout redirects properly
7. All images and assets load

Format as a numbered checklist I can run through in 5 minutes.
```
