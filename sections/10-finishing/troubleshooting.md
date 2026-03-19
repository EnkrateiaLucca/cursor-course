# Troubleshooting

Common issues and solutions encountered during the course.

---

## Cursor Issues

### AI output is poor quality
**Causes:** Context overload, vague prompts, wrong chat mode.
**Fix:**
- Start a new chat (Cmd+L) with fresh context
- Be more specific — use numbered steps
- Use @-mentions to target exact files
- Try the prompt 5 different ways

### Context window is full
**Symptoms:** Slow responses, AI forgetting earlier conversation.
**Fix:** Start a new chat tab. Summarize progress and hand off to the new chat.

### Agent mode isn't making changes
**Causes:** Unclear instructions, file permissions, large codebase.
**Fix:**
- Give more specific file paths
- Break the task into smaller steps
- Check if the file is read-only

### MCP server won't connect
**Fix:**
- Restart Cursor completely (not just reload)
- Check `.cursor/mcp.json` syntax (valid JSON?)
- Verify the MCP command works manually: `npx -y @anthropic-ai/mcp-playwright`
- Check Cursor Settings → MCP for server status

---

## Next.js Issues

### "Module not found" errors
**Fix:** Run `pnpm install` to ensure all dependencies are installed. If using a new package, install it: `pnpm add [package]`.

### "use client" errors
**Cause:** Using hooks (useState, useEffect) or event handlers in a Server Component.
**Fix:** Add `"use client"` directive at the top of the file.

### Server Actions not working
**Cause:** Missing `"use server"` directive, or calling from wrong context.
**Fix:**
- Ensure `"use server"` is at the top of the action file
- Server Actions must be async functions
- Check that you're importing from the correct file

### Build fails but dev works
**Cause:** Dynamic server-only code in static pages, missing env vars.
**Fix:**
- Check for `process.env` usage in client components
- Ensure all env vars are set in the build environment
- Look for `headers()` or `cookies()` in pages that could be static

---

## Database Issues

### Can't connect to Supabase
**Fix:**
- Verify `DATABASE_URL` in `.env.local`
- Check if your IP is allowed (Supabase → Settings → Database → Network)
- Use the **pooled** connection string for serverless (port 6543)

### Drizzle schema push fails
**Fix:**
- Check for syntax errors in schema files
- Ensure the database URL is correct
- Try `pnpm drizzle-kit push --verbose` for detailed errors

### RLS blocking queries
**Cause:** Row Level Security is enabled but no policies are set.
**Fix:** Either create RLS policies or temporarily disable RLS for development (re-enable before production).

---

## Auth Issues

### Clerk sign-in not working
**Fix:**
- Verify both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set
- Check that `<ClerkProvider>` wraps the app in `layout.tsx`
- Verify middleware.ts is in the project root (not in `app/`)

### Redirect loop after sign-in
**Cause:** Middleware is protecting the sign-in page itself.
**Fix:** Ensure `/sign-in` and `/sign-up` are in the public routes list in `middleware.ts`.

---

## Payment Issues

### Stripe checkout not redirecting
**Fix:**
- Verify `STRIPE_SECRET_KEY` is set
- Check that `success_url` and `cancel_url` are valid URLs
- Look at Stripe Dashboard → Logs for API errors

### Webhook not receiving events
**Fix:**
- For local dev: Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- For production: Register webhook URL in Stripe Dashboard
- Verify `STRIPE_WEBHOOK_SECRET` matches the endpoint

### Test card being declined
**Fix:** Use `4242 4242 4242 4242` with any future expiry and any CVC.

---

## Deployment Issues

### Vercel build fails
**Fix:**
- Check build logs for specific errors
- Verify all env vars are set in Vercel project settings
- Run `pnpm build` locally to reproduce
- Check Node.js version matches (set in Vercel settings)

### App works locally but not in production
**Common causes:**
- Missing env vars in Vercel
- Different Supabase connection string needed (pooled vs direct)
- Clerk production keys not set
- Stripe webhook not registered for production URL

### 500 errors in production
**Fix:**
- Check Vercel → Deployments → Functions tab for error logs
- Look for missing env vars
- Check Supabase connection (pooled connection required for serverless)
