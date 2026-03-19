# Demo: Playwright MCP

**Goal:** Configure Playwright MCP so Cursor can see and interact with the running app in a browser.

---

## Step 1: Install Playwright MCP

Add to your project's `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-playwright"]
    }
  }
}
```

Restart Cursor to activate the MCP server.

## Step 2: Start the dev server

```bash
pnpm dev
```

Verify the app is running at `http://localhost:3000`.

## Step 3: Let the AI see the app

Open Agent mode and use this prompt:

```
Navigate to http://localhost:3000 and take a screenshot.
Describe what you see on the page.
```

**What to show the audience:**
- The AI can actually see your running application
- It understands the visual layout, not just the code

## Step 4: Interactive testing

```
Navigate to the quiz page, answer all questions, and tell me:
1. Does the quiz flow work correctly?
2. Are there any visual issues?
3. Does the score display correctly at the end?
```

**What to show:**
- The AI clicks through the app like a real user
- It reports bugs it finds visually
- This is automated E2E testing powered by AI

## Step 5: Fix issues from the browser

If the AI found issues:

```
Fix the issues you found on the quiz page.
After fixing, navigate back and verify the fix works.
```

**What to show:**
- The loop: see the app → find bugs → fix code → verify visually
- No manual browser testing needed

## Timing

- Setup: ~5 min
- Demo navigation + screenshots: ~10 min
- Interactive testing + fixing: ~10 min
- Q&A: ~5 min

## Fallback

If MCP setup fails live, show the config file and explain conceptually. Have a pre-recorded GIF/video of the Playwright MCP in action as backup.
