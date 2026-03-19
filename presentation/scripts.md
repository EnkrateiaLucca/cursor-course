# Presentation Scripts & Speaker Notes

> 10 sections | 62 slides | ~6 hours total
> Each section links to its folder in `sections/` for demo files and prompts.

---

## Section 01: Cursor Intro (Slides 1–6, ~45 min)

**[Section folder →](../sections/01-cursor-intro/)**

### Slide 1: Title / Welcome

- Welcome to the course. Introductions.
- "By the end of today, you'll have built a full AI-powered quiz app from scratch — and more importantly, you'll have a repeatable workflow for building any production app with Cursor."
- Quick audience poll: "Who's used Cursor before? Who's used GitHub Copilot? Who's new to AI coding tools?"

### Slide 2: What is Cursor?

- Cursor is AI-first — not a plugin bolted onto VS Code
- Key differentiators: Agent mode, multi-file editing, MCP integrations, codebase-aware AI
- This isn't autocomplete — it's a development partner

**Key point:** "Your value as a developer is in decision-making, not typing speed. Cursor amplifies your decisions."

### Slide 3: Core Interaction Modes

| Mode | Shortcut | When to Use |
|------|----------|-------------|
| Chat | Cmd+L | Explore, ask questions, single-file edits |
| Agent | Cmd+I | Multi-file changes, feature implementation |
| Inline Edit | Cmd+K | Quick in-place modifications |
| Tab | Tab | Accept AI predictions while typing |

### Slide 4-5: Demo — Build a Toy HTML App

**→ Follow [demo-toy-app.md](../sections/01-cursor-intro/demo-toy-app.md)**

1. Create `toy-app.html` from scratch
2. Generate with Chat → show Apply button
3. Enhance with Inline Edit (Cmd+K) → gradient text
4. Show Tab autocomplete predictions
5. Add feature with Agent → dark mode toggle
6. Open in browser → working app

**Timing:** ~25 min for the demo with explanation

### Slide 6: Key Principles

- **Try 5 times rule:** If a prompt fails, rephrase and retry — don't give up after one attempt
- **Git is non-negotiable:** Commit after each working milestone. Cursor checkpoints are not a replacement.
- **One task = one chat:** Start fresh chats to maintain narrative integrity

**⏱ BREAK / RECAP** (~5 min)

---

## Section 02: Explore-Plan-Build (Slides 7–11, ~45 min)

**[Section folder →](../sections/02-explore-plan-build/)**

### Slide 7: The Framework

```
EXPLORE → PLAN → BUILD
```

- **Explore:** Share context, discuss options, identify relevant files
- **Plan:** Create step-by-step plans, break down complex tasks
- **Build:** Execute iteratively, review each step, commit regularly

"Don't jump straight to code. The best AI-assisted developers spend more time exploring and planning than building."

### Slide 8: The @ Symbol — Context Navigator

**Live demo:** Open McKay's template in Cursor and demonstrate each:

| Symbol | Example | Purpose |
|--------|---------|---------|
| @file | `@app/page.tsx` | Reference specific file |
| @folder | `@components/` | Reference directory |
| @codebase | `@codebase "auth logic"` | Semantic search |
| @docs | `@docs "React hooks"` | Query documentation |
| @web | `@web "Next.js 15 changes"` | Web search |

**→ Use prompts from [prompts.md](../sections/02-explore-plan-build/prompts.md)**

### Slide 9: Context Files

Walk through the [context-file-template.md](../sections/02-explore-plan-build/context-file-template.md):
- Problem statement, users, features, tech stack, schema
- This becomes your project's "north star"
- Reference it in every prompt: `@context.md`

### Slide 10: Two-Stage Workflow

1. **Stage 1 (Planning):** Use ChatGPT or Claude to brainstorm and structure
2. **Stage 2 (Building):** Bring the plan to Cursor for implementation

"Use the right tool for the right phase. ChatGPT for thinking, Cursor for building."

### Slide 11: Demo — Build Simple Quiz

**→ Follow [demo-simple-quiz.md](../sections/02-explore-plan-build/demo-simple-quiz.md)**

1. Explore McKay's template structure with @codebase
2. Plan the quiz page (ask Cursor to plan, not build)
3. Build the quiz with Agent mode (hardcoded questions)
4. Show the working quiz in the browser

**Timing:** ~25 min for demo

---

## Section 03: Project Rules (Slides 12–14, ~20 min)

**[Section folder →](../sections/03-project-rules/)**

### Slide 12: Four Rule Modes

| Mode | When Active | Example |
|------|-------------|---------|
| Always | Every prompt | Core coding standards |
| Auto Attached | File pattern match | API validation rules for `**/api/**` |
| Agent Requested | AI determines relevance | Database patterns |
| Manual | Explicit @-mention | Performance audit checklist |

### Slide 13: Demo — Create Rules

**→ Follow [demo-rules-setup.md](../sections/03-project-rules/demo-rules-setup.md)**

1. Create `.cursor/rules/` directory
2. Create one rule for each mode (live)
3. Test that rules activate correctly

### Slide 14: AGENTS.md & CLAUDE.md

- AGENTS.md → Cursor's project context file
- CLAUDE.md → Claude Code's project context file
- Show examples from [example-agents-md.md](../sections/03-project-rules/example-agents-md.md) and [example-claude-md.md](../sections/03-project-rules/example-claude-md.md)

**Hot take:** "Start without rules. Add them only when you notice patterns of mistakes. Rules aren't always the answer."

---

## Section 04: MCP & Tooling (Slides 15–21, ~30 min)

**[Section folder →](../sections/04-mcp-and-tooling/)**

### Slide 15: What is MCP?

- **Model Context Protocol** — open standard by Anthropic
- "Think of it like USB for AI — one standard interface, many devices"
- Connects AI to: browsers, GitHub, databases, documentation, Figma

### Slide 16-17: MCP Architecture

Five components: Tools, Prompts, Resources, Roots, Elicitation

Show the configuration format — `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": { "TOKEN": "value" }
    }
  }
}
```

### Slide 18-19: Demo — Playwright MCP

**→ Follow [demo-playwright-mcp.md](../sections/04-mcp-and-tooling/demo-playwright-mcp.md)**

1. Configure Playwright MCP
2. AI navigates to the running app
3. AI screenshots and describes the page
4. AI tests the quiz flow interactively
5. AI finds and fixes visual bugs

### Slide 20: GitMCP & GitHub MCP

- GitMCP: Replace `github.com` with `gitmcp.io` in any repo URL → instant MCP context
- GitHub MCP: Manage PRs, issues, code reviews from Cursor
- Show config examples from [mcp-config-examples/](../sections/04-mcp-and-tooling/mcp-config-examples/)

### Slide 21: CLI vs MCP

**→ Reference [cli-vs-mcp-comparison.md](../sections/04-mcp-and-tooling/cli-vs-mcp-comparison.md)**

- Cursor: Visual development, UI building, design iteration
- Claude Code: Infrastructure, scripts, CI/CD, terminal work
- They complement each other — use both

**⏱ BREAK** (~10 min)

---

## Section 05: AI Quiz App Build (Slides 22–32, ~60 min)

**[Section folder →](../sections/05-ai-quiz-app/)**

### Slide 22: Section Overview

"This is the main build section. We're taking the simple quiz from Section 02 and adding AI-powered question generation."

### Slide 23: The Context File

**→ Show [context-file.md](../sections/05-ai-quiz-app/context-file.md)**

Walk through the filled-in context file. This drives the entire build.

### Slide 24: Hierarchy of Leverage

**→ Reference [hierarchy-of-leverage.md](../sections/05-ai-quiz-app/hierarchy-of-leverage.md)**

```
Rules > Context > Prompts > Model
```

"Before blaming the AI, check: Do I have rules? Did I give good context? Was my prompt specific?"

### Slides 25-32: Live Build

**→ Follow [demo-build-steps.md](../sections/05-ai-quiz-app/demo-build-steps.md)**

| Step | What | Time |
|------|------|------|
| 1 | AI generation Server Action | ~10 min |
| 2 | Upload/input UI | ~10 min |
| 3 | Quiz-taking UI upgrade | ~10 min |
| 4 | Results page | ~10 min |
| 5 | Database integration | ~15 min |
| 6 | Polish with Playwright MCP | ~5 min |

**→ Use prompts from [prompts.md](../sections/05-ai-quiz-app/prompts.md) for each step**

**⏱ BREAK** (~10 min)

---

## Section 06: Testing (Slides 33–36, ~20 min)

**[Section folder →](../sections/06-testing/)**

### Slide 33: Testing Pyramid

```
         ╱  E2E  ╲        ← Few, slow, high confidence
        ╱ Component╲      ← Some, moderate speed
       ╱    Unit    ╲     ← Many, fast, focused
```

### Slide 34-35: Demo — TDD with Cursor

**→ Follow [demo-tdd-workflow.md](../sections/06-testing/demo-tdd-workflow.md)**

1. Write test first (YOU define behavior)
2. Run test → RED
3. Let Cursor implement → GREEN
4. Add edge cases → iterate

"You control the WHAT (tests), AI handles the HOW (implementation)."

### Slide 36: Test Examples

Show examples from [test-examples/](../sections/06-testing/test-examples/):
- Unit test for quiz utilities
- Component test for QuizCard
- E2E test for the full quiz flow

---

## Section 07: Diagrams & Design (Slides 37–45, ~30 min)

**[Section folder →](../sections/07-diagrams-design/)**

### Slide 37-39: Mermaid Diagrams

**→ Follow [demo-mermaid-diagrams.md](../sections/07-diagrams-design/demo-mermaid-diagrams.md)**

1. Generate architecture diagram from the codebase
2. Generate user flow diagram
3. Generate database ERD
4. Show examples from [mermaid-examples/](../sections/07-diagrams-design/mermaid-examples/)

### Slide 40-43: Design → Code Workflow

**→ Follow [demo-design-iteration.md](../sections/07-diagrams-design/demo-design-iteration.md)**

1. Screenshot → paste in Cursor → get code
2. Iterate: "make spacing larger", "add animation"
3. Discuss Figma MCP (advanced)

### Slide 44-45: Design Iteration

Show the feedback loop:
```
Design reference → AI generates code → Preview → Feedback → Iterate
```

"First pass: ~70% right. 2-3 iterations: ~95%. This removes the design gap for developers."

**⏱ BREAK** (~10 min)

---

## Section 08: Backend/Auth/Payments (Slides 46–53, ~45 min)

**[Section folder →](../sections/08-backend-auth-payments/)**

### Slide 46: Backend Architecture

Overview of the full stack:
- Supabase (PostgreSQL) + Drizzle ORM
- Clerk authentication
- Stripe payments
- Next.js Server Actions

### Slide 47-48: Supabase + Drizzle

**→ Follow [demo-supabase-drizzle.md](../sections/08-backend-auth-payments/demo-supabase-drizzle.md)**

~10 min: Schema definition, Drizzle config, push to database

### Slide 49-50: Clerk Auth

**→ Follow [demo-clerk-auth.md](../sections/08-backend-auth-payments/demo-clerk-auth.md)**

~10 min: Middleware, sign-in UI, route protection

### Slide 51-52: Stripe Payments

**→ Follow [demo-stripe-payments.md](../sections/08-backend-auth-payments/demo-stripe-payments.md)**

~15 min: Checkout, webhooks, premium tiers

### Slide 53: Server Actions Pattern

**→ Follow [demo-server-actions.md](../sections/08-backend-auth-payments/demo-server-actions.md)**

~10 min: CRUD actions with Zod validation

**→ Reference [env-vars-reference.md](../sections/08-backend-auth-payments/env-vars-reference.md) for all env vars**

**⏱ BREAK** (~5 min)

---

## Section 09: Deployment (Slides 54–62, ~30 min)

**[Section folder →](../sections/09-deployment/)**

### Slide 54-56: Production Readiness

**→ Walk through [production-checklist.md](../sections/09-deployment/production-checklist.md)**

Key checks: build passes, env vars set, RLS enabled, auth configured

### Slide 57-60: Deploy to Vercel

**→ Follow [demo-vercel-deploy.md](../sections/09-deployment/demo-vercel-deploy.md)**

1. Push to GitHub
2. Import to Vercel
3. Configure env vars
4. Deploy and verify

### Slide 61: Cost Breakdown

**→ Reference [cost-breakdown.md](../sections/09-deployment/cost-breakdown.md)**

"Free tier gets you surprisingly far. Most side projects never need to upgrade."

### Slide 62: The Full Stack

Show the complete architecture:
```
Cursor → GitHub → Vercel → Supabase + Clerk + Stripe + OpenAI
```

"You just built a production-ready, full-stack AI app in 6 hours."

---

## Section 10: Finishing (~15 min)

**[Section folder →](../sections/10-finishing/)**

### Recap

Quick walk through all 10 sections (1 sentence each):
1. **Cursor Intro** — Four interaction modes, your development partner
2. **Explore-Plan-Build** — The framework that makes AI-assisted dev reliable
3. **Project Rules** — Encode standards for consistent AI output
4. **MCP & Tooling** — Extend Cursor's reach to browsers, GitHub, docs
5. **AI Quiz App** — Context file drives the build, two-stage workflow
6. **Testing** — TDD with AI: you define behavior, AI implements
7. **Diagrams & Design** — Text-to-diagram, screenshot-to-code
8. **Backend/Auth/Payments** — Full stack with Supabase, Clerk, Stripe
9. **Deployment** — Zero-config Vercel, free tier is generous
10. **Finishing** — Resources and next steps

### Key Takeaway

"AI doesn't replace your engineering judgment — it amplifies it. The developers who thrive with these tools are the ones who think clearly about what they want before asking for it."

### Resources

**→ Reference [resources.md](../sections/10-finishing/resources.md)**

### Q&A

Open floor for questions. (~5 min)

---

## Presenter Quick Reference

### Before the Session
- [ ] McKay's template cloned and running locally
- [ ] All API keys tested and working
- [ ] Cursor signed in with Pro account
- [ ] MCP servers configured and verified
- [ ] Browser tabs ready: presentation.html, localhost:3000
- [ ] Two Cursor windows: course repo + demo project

### Emergency Fallbacks
- If MCP fails: Show config and explain conceptually
- If API keys fail: Use hardcoded data and explain the AI integration
- If build fails: Debug live (this is actually a great teaching moment)
- If ahead of schedule: Extra Q&A, deeper dives on any section
- If behind schedule: Abbreviate sections 07 and 09, prioritize 05 and 08
