# Instructor Guide

Run-of-show checklist for the 6-hour Cursor course. Tick boxes as you go. Every prompt is in a code block so you can copy it with one click.

**Setup:** Window 1 is this repo. Window 2 is the McKay's App Template clone, where you code live. Keep a browser tab open with `presentation/presentation.html`.

| # | Section | Slides | Time | Break after |
|---|---------|--------|------|-------------|
| 01 | Cursor Intro (modes + rules + MCP) | 1–21 | 95 min | Yes |
| 02 | Explore-Plan-Build | 22–26 | 45 min | |
| 03 | AI Quiz App | 27–37 | 60 min | Yes |
| 04 | Testing | 38–41 | 20 min | |
| 05 | Diagrams & Design | 42–50 | 30 min | Yes |
| 06 | Backend, Auth & Payments | 51–58 | 45 min | Yes |
| 07 | Deployment | 59–67 | 30 min | |
| 08 | Finishing | — | 15 min | |

## Before the Session

- [ ] Cursor installed and signed in
- [ ] McKay's template cloned, `pnpm install` done, `pnpm dev` runs
- [ ] GitHub PAT ready (Section 01 — MCP)
- [ ] Supabase project, Clerk app, and Stripe test-mode account created, keys at hand (Section 06)
- [ ] Anthropic API key ready (Section 03)
- [ ] Vercel account connected to GitHub (Section 07)
- [ ] Stripe CLI installed: `brew install stripe/stripe-cli/stripe`
- [ ] Vitest and Playwright installed in the demo project (Section 04)
- [ ] Mermaid preview extension installed, or [mermaid.live](https://mermaid.live) open (Section 05)
- [ ] Presentation open in the browser

---

## Section 01: Cursor Intro (Slides 1–21, ~95 min)

### Part A — Interface & modes (Slides 1–6, ~45 min)

Folder: [sections/01-cursor-intro/](sections/01-cursor-intro/) · Demo: [demo-toy-app.md](sections/01-cursor-intro/demo-toy-app.md) · Prompts: [prompts.md](sections/01-cursor-intro/prompts.md)

**Goal:** Show Agent modes (Agent / Ask / Plan / Debug), Inline Edit, and Tab on a single HTML file.

- [ ] Tour the Cursor interface: panels, Chat (`Cmd+L`), Agent mode
- [ ] Open an empty folder and create `toy-app.html`
- [ ] **Chat:** generate the app. Point out the Apply button and the diff view.

```text
Create a single-file HTML page with embedded CSS and JS that has:
- A centered card with a title "My First Cursor App"
- A counter with + and - buttons
- A color theme picker (3-4 preset colors) that changes the card background
- Clean, modern styling with rounded corners and subtle shadows
- No external dependencies — pure HTML/CSS/JS
```

- [ ] **Inline Edit:** select the `<h1>`, press `Cmd+K`. Point out that it only touches the selection.

```text
Make this a gradient text with a subtle animation
```

- [ ] **Inline Edit (optional):** select the buttons, press `Cmd+K`

```text
Add hover effects with scale transform and smooth transitions
```

- [ ] **Tab:** start typing a new `<div>` below the content, pause, and accept multi-line suggestions with Tab
- [ ] **Agent** (`Cmd+I`): show it plan and then edit multiple parts of the file

```text
Add a dark mode toggle button to this page:
- Toggle between light and dark themes
- Save preference to localStorage so it persists on refresh
- Use a sun/moon icon (emoji is fine)
- Smooth transition between themes
```

- [ ] **Agent (optional):** add another feature

```text
Add a simple to-do list below the counter:
- Input field with an "Add" button
- List items with a delete button
- Items stored in localStorage
- Clean styling matching the existing design
```

- [ ] Open the file in the browser and toggle dark mode to prove it works
- [ ] **Chat:** ask it to explain the code

```text
Explain how this HTML page works. Break it down section by section:
- What does the CSS do?
- How does the JavaScript handle state?
- How does localStorage persistence work?
```

- [ ] *(Optional)* Show the larger example: [plan.md](sections/01-cursor-intro/plan.md) → [image-pdf-layout.html](sections/01-cursor-intro/image-pdf-layout.html) → Next.js version in [image-pdf-app/](sections/01-cursor-intro/image-pdf-app/)
- [ ] Discuss when to use each mode

**Talking points**
- [ ] Cursor is AI-first, not AI-bolted-on
- [ ] Each mode fits a different job: quick edits, multi-file changes, exploration
- [ ] The "try 5 times" rule: if a prompt fails, rephrase and retry
- [ ] Commit to git often. Cursor checkpoints are not a replacement for git.

**Fallback:** If the demo breaks, simplify to a counter or to-do app. The point is to show all four modes.

**⏱ BREAK (~10 min)**

---

## Section 02: Explore-Plan-Build (Slides 7–11, ~45 min)

Folder: [sections/02-explore-plan-build/](sections/02-explore-plan-build/) · Demo: [demo-simple-quiz.md](sections/02-explore-plan-build/demo-simple-quiz.md) · Prompts: [prompts.md](sections/02-explore-plan-build/prompts.md) · Template: [context-file-template.md](sections/02-explore-plan-build/context-file-template.md)

**Goal:** Build a hardcoded quiz page (no AI) on McKay's template using Explore → Plan → Build.

### Explore (~5 min)

- [ ] Switch to Window 2 (McKay's template)
- [ ] Ask about the overall architecture

```text
@codebase What is the overall architecture of this project?
What framework does it use, and how are files organized?
```

- [ ] Ask about routing

```text
@codebase Where is the main layout defined? How does routing work?
```

- [ ] Demo `@file`

```text
@app/page.tsx Explain what this page does and how it's structured.
```

- [ ] Demo `@folder`

```text
@components/ What components exist in this folder? Give me a summary of each.
```

- [ ] Demo `@codebase` semantic search

```text
@codebase Where is authentication handled in this project?
```

- [ ] Demo `@docs`

```text
@docs How do I create a new page in Next.js App Router?
```

- [ ] Demo `@web`

```text
@web What are the latest best practices for Next.js Server Actions?
```

### Plan (~5 min)

- [ ] Walk through [context-file-template.md](sections/02-explore-plan-build/context-file-template.md) and explain it as the project's "north star"
- [ ] *(Two-stage workflow)* Show how a planning tool produces a full plan. Result: [PLAN.md](sections/02-explore-plan-build/PLAN.md)

```text
I want to create a quiz app where students can upload a structured file like a .json or a markdown file and do an interactive quiz on the browser. I want to use the template from this repo I like: https://github.com/mckaywrigley/mckays-app-template right now your output should be a PLAN.md file with the planning structure for the full app following the structure inside @sections/02-explore-plan-build/context-file-template.md
```

- [ ] Ask Cursor to plan the quiz page without writing code, then review the plan

```text
@codebase I want to add a simple quiz page to this app.

The quiz should:
- Show one question at a time with 4 multiple-choice answers
- Track score as the user progresses
- Show results at the end
- Use hardcoded questions (no AI, no API)

Create a step-by-step plan. Don't write code yet — just outline the files to create/modify.
```

### Build (~20 min)

- [ ] **Agent:** implement the plan

```text
Now implement the quiz page following the plan above.
Use the existing UI components and styling patterns from this project.
Hardcode 5 sample questions about web development.
```

- [ ] Run `pnpm dev`, open the quiz page, and click through the whole flow
- [ ] Fix anything visual with `Cmd+K`
- [ ] Add navigation

```text
Add a link to the quiz page in the main navigation/homepage so users can find it.
```

- [ ] *(Optional polish)* Add a progress bar

```text
@app/quiz/page.tsx Add a progress bar showing which question
the user is on (e.g., "Question 3 of 5").
Use the existing design system.
```

- [ ] *(Optional polish)* Improve the results screen

```text
@app/quiz/page.tsx The results screen should show which questions
were answered correctly vs incorrectly, with the correct answers revealed.
```

- [ ] Commit to git

**Talking points**
- [ ] Don't jump straight to code: explore, plan, then build
- [ ] `@file` is for precision, `@codebase` is for discovery
- [ ] A context file saves you from repeating yourself in every prompt
- [ ] Two-stage workflow: ChatGPT/Claude for planning, Cursor for implementation
- [ ] More context is not always better. Curate what the AI sees.
- [ ] Tease the next step: Section 03 adds AI question generation

---

### Part B — Project Rules (Slides 12–14, ~20 min)

> Formerly standalone Section 03 — now part of the Cursor Intro.

Folder: [sections/01-cursor-intro/project-rules/](sections/01-cursor-intro/project-rules/) · Demo: [demo-rules-setup.md](sections/01-cursor-intro/project-rules/demo-rules-setup.md) · Prompts: [prompts.md](sections/01-cursor-intro/project-rules/prompts.md)

**Goal:** Create one rule for each of the four modes, then test that they activate.

- [ ] Explain the four rule types: Always Apply, Apply Intelligently, Apply to Specific Files, Apply Manually
- [ ] Create the rules folder

```bash
mkdir -p .cursor/rules
```

- [ ] **Always:** create `.cursor/rules/core-standards.mdc`. It runs on every prompt, so keep it short.

```markdown
---
description: Core project standards that apply to every interaction
alwaysApply: true
---

- Use TypeScript with strict mode
- Use functional components with hooks (no class components)
- Use Server Components by default; add "use client" only when needed
- Follow existing patterns in the codebase before introducing new ones
- Never commit .env files or secrets
```

- [ ] **Auto Attached:** create `.cursor/rules/api-routes.mdc`. It only activates on files matching the glob.

```markdown
---
description: Standards for API route handlers
glob: ["**/api/**/*.ts", "**/actions/**/*.ts"]
---

- Validate all inputs with Zod schemas
- Return consistent response format: { success, data, error }
- Use proper HTTP status codes
- Handle errors with try/catch and return meaningful messages
- Use Server Actions for mutations when possible
```

- [ ] **Agent Requested:** create `.cursor/rules/supabase-patterns.mdc`. The AI decides when it is relevant.

```markdown
---
description: Supabase database patterns and conventions for this project
agentRequestable: true
---

- Use Drizzle ORM for all database queries (not raw SQL)
- Define schemas in db/schema/ directory
- Use migrations for schema changes
- Row Level Security (RLS) is enabled — always set up policies
- Use the Supabase client from lib/supabase.ts
```

- [ ] **Manual:** create `.cursor/rules/performance-audit.mdc`. It only activates when you type `@performance-audit`.

```markdown
---
description: Performance audit checklist
manuallyApply: true
---

When auditing performance:
- Check for unnecessary re-renders (React DevTools Profiler)
- Verify images use next/image with proper sizing
- Check bundle size with @next/bundle-analyzer
- Ensure proper code splitting with dynamic imports
- Verify Server Components aren't accidentally client components
- Check database queries for N+1 problems
```

- [ ] *(Alternative)* Have Cursor write a rule for you

```text
Create a .cursor/rules/react-patterns.mdc file with rules for:
- Functional components only (no class components)
- Props defined with TypeScript interfaces
- Server Components by default
- "use client" only for interactive components
- Use shadcn/ui for all UI elements
Set it to auto-attach for all .tsx files.
```

- [ ] Test the rules. Afterwards, check: TypeScript? Functional component? shadcn/ui? Server Component?

```text
Create a new component called QuizCard that displays a quiz question
with four answer choices. Follow our project rules.
```

- [ ] Open an API route to show the auto-attached rule, ask a database question to show the agent-requested rule, then type `@performance-audit` to show the manual rule
- [ ] Show the example rules: [nextjs-patterns.mdc](sections/01-cursor-intro/project-rules/example-rules/nextjs-patterns.mdc), [api-standards.mdc](sections/01-cursor-intro/project-rules/example-rules/api-standards.mdc), [testing.mdc](sections/01-cursor-intro/project-rules/example-rules/testing.mdc)
- [ ] Walk through [example-agents-md.md](sections/01-cursor-intro/project-rules/example-agents-md.md) and [example-claude-md.md](sections/01-cursor-intro/project-rules/example-claude-md.md)
- [ ] Generate an AGENTS.md live

```text
@codebase Generate an AGENTS.md file for this project that describes:
- The project's purpose and architecture
- Key directories and their roles
- Coding standards and conventions
- Database and API patterns
- Testing approach
Keep it concise — under 50 lines.
```

- [ ] Discuss when *not* to use rules (the staff engineer view)

```text
I'm working across 5 different codebases this week.
What's the most efficient way to give Cursor context
without maintaining rules for each project?
```

**Talking points**
- [ ] Rules are onboarding docs for your AI
- [ ] Start without rules. Add them when you see the same mistakes repeat.
- [ ] AGENTS.md (Cursor) and CLAUDE.md (Claude Code) are project-level context
- [ ] Don't over-engineer rules. Every rule adds overhead to every request.

---

### Part C — MCP & Tooling (Slides 15–21, ~30 min)

> Formerly standalone Section 04 — now part of the Cursor Intro.

Folder: [sections/01-cursor-intro/mcp-and-tooling/](sections/01-cursor-intro/mcp-and-tooling/) · Demo: [demo-playwright-mcp.md](sections/01-cursor-intro/mcp-and-tooling/demo-playwright-mcp.md) · Prompts: [prompts.md](sections/01-cursor-intro/mcp-and-tooling/prompts.md)

**Goal:** Let Cursor see and click through the running app via Playwright MCP.

- [ ] Explain MCP with the "USB for AI" analogy
- [ ] Add Playwright to `.cursor/mcp.json` (see [playwright.json](sections/01-cursor-intro/mcp-and-tooling/mcp-config-examples/playwright.json)), then restart Cursor

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

- [ ] Run `pnpm dev` and confirm `http://localhost:3000` loads
- [ ] **Agent:** take a screenshot. Point out that the AI is seeing the actual running app.

```text
Navigate to http://localhost:3000 and take a screenshot.
Describe the current state of the page — layout, content, and any obvious issues.
```

- [ ] **Agent:** click through the quiz like a user would

```text
Navigate to http://localhost:3000/quiz and complete the entire quiz flow:
1. Answer each question (pick any answer)
2. Submit and move to the next question
3. At the end, screenshot the results page

Report:
- Did all navigation work correctly?
- Were there any visual glitches or layout issues?
- Did the score calculate correctly?
```

- [ ] **Agent:** fix and verify. This closes the loop: see the app, find the bug, fix the code, check it visually.

```text
Fix the issues you found on the quiz page.
After fixing, navigate back and verify the fix works.
```

- [ ] Show the other configs: [github.json](sections/01-cursor-intro/mcp-and-tooling/mcp-config-examples/github.json) and [gitmcp.json](sections/01-cursor-intro/mcp-and-tooling/mcp-config-examples/gitmcp.json)
- [ ] *(Optional)* GitHub MCP demo

```text
List my open pull requests and summarize each one in 1-2 sentences.
```

- [ ] *(Optional)* GitMCP docs demo

```text
Using the Next.js docs, explain the best practices for
Server Actions in Next.js 15. Include code examples.
```

- [ ] *(Optional)* Have Cursor set up all three servers

```text
Help me set up MCP for this project. I want to configure:
1. Playwright for browser testing
2. GitHub for PR management
3. GitMCP for Next.js documentation

Create the .cursor/mcp.json file with all three servers.
```

- [ ] Discuss CLI vs MCP using [cli-vs-mcp-comparison.md](sections/01-cursor-intro/mcp-and-tooling/cli-vs-mcp-comparison.md)

**Talking points**
- [ ] MCP is an open protocol from Anthropic: one standard interface, many tools
- [ ] Playwright MCP lets the AI see and interact with your running app
- [ ] GitMCP turns any GitHub repo into a context source: replace `github.com` with `gitmcp.io`
- [ ] CLI tools (Claude Code, Aider) complement Cursor. Use the right tool for the job.

**Fallback:** If MCP setup fails live, show the config and explain the concept. Have a pre-recorded clip ready.

**⏱ BREAK (~10 min)**

---

## Section 03: AI Quiz App (Slides 27–37, ~60 min)

Folder: [sections/03-ai-quiz-app/](sections/03-ai-quiz-app/) · Plan: [PLAN.md](sections/03-ai-quiz-app/PLAN.md) · Ship guide: [prod-guide.md](sections/03-ai-quiz-app/prod-guide.md)

**Goal:** Take the simple quiz from Section 02 and add AI question generation, with the plan file driving the build.

- [ ] Walk through [PLAN.md](sections/03-ai-quiz-app/PLAN.md): features F1–F12, the data schema, and phases 0–8
- [ ] Explain the Hierarchy of Leverage: **Rules > Context > Prompts > Model**. Before blaming the AI, check whether you have rules, gave good context, and wrote a specific prompt.
- [ ] Add `ANTHROPIC_API_KEY` to `.env.local`

### Live build

- [ ] **Step 1 — AI generation (~10 min)**

```text
@sections/03-ai-quiz-app/PLAN.md Implement feature F7 (AI Quiz Generation) as a server-side route at /api/generate:
- Accept raw text content and a question count
- Use @anthropic-ai/sdk with a two-stage pipeline: generate questions, then convert them to structured JSON
- Validate the output with a Zod schema matching the Question JSON Schema in the plan
- Mix multiple-choice and open-ended questions
- Never expose ANTHROPIC_API_KEY to the client
```

- [ ] **Step 2 — Create page (~10 min)**

```text
@sections/03-ai-quiz-app/PLAN.md Build the /quiz/create page from Phase 3:
- Two tabs: "Upload JSON" and "Generate with AI"
- Drag-and-drop JSON upload with validation and a collapsible format guide
- A textarea for content plus a question count selector and a Generate button that calls /api/generate
- Loading states while generating
- Use existing shadcn/ui components
```

- [ ] **Step 3 — Quiz player (~10 min)**

```text
@sections/03-ai-quiz-app/PLAN.md Upgrade the quiz UI to match Phase 4:
- One question at a time with "Question X of Y" progress
- Multiple-choice option cards and an open-ended text input
- Submit, Skip, Previous, and Next buttons
- Instant feedback panel (correct/incorrect/skipped) with the explanation and source link
- Answered questions stay locked when revisited
- Last question shows "See Results"
```

- [ ] **Step 4 — Results page (~10 min)**

```text
@sections/03-ai-quiz-app/PLAN.md Build the results page from Phase 5:
- Score display with percentage, skipped count, and incorrect count
- Per-question cards with Correct/Incorrect/Skipped badges and checkboxes
- Select all / deselect all
- Export selected questions as CSV, LLM Review Markdown, and Anki cards (client-side)
- Retake Quiz and New Quiz buttons
```

- [ ] **Step 5 — Database (~15 min).** This previews Section 06. Keep it light if time is short.

```text
@sections/03-ai-quiz-app/PLAN.md Persist quizzes and attempts using the schema in the plan:
- Save created quizzes to the quizzes table
- Save each completed attempt to quiz_attempts
- Add a /dashboard page listing the user's quizzes and recent attempts
```

- [ ] **Step 6 — Polish with Playwright MCP (~5 min)**

```text
Navigate to http://localhost:3000/quiz/create, generate a quiz from a short paragraph of text, take the whole quiz, and screenshot the results page. Report any bugs or visual issues, fix them, then verify the fix in the browser.
```

- [ ] Commit to git

**Talking points**
- [ ] The plan/context file drives the entire build
- [ ] Two-stage workflow: plan elsewhere, implement in Cursor
- [ ] Build phase by phase and verify each one before moving on

**⏱ BREAK (~10 min)**

---

## Section 04: Testing (Slides 38–41, ~20 min)

Folder: [sections/04-testing/](sections/04-testing/) · Demo: [demo-tdd-workflow.md](sections/04-testing/demo-tdd-workflow.md) · Prompts: [prompts.md](sections/04-testing/prompts.md)

**Goal:** Run the TDD loop: you write the test, the AI writes the code.

- [ ] Draw the testing pyramid: many unit tests, some component tests, few E2E tests
- [ ] Explain the loop: write test → RED → AI implements → GREEN → refactor
- [ ] Create `lib/quiz-utils.test.ts` (you define the behavior)

```typescript
import { describe, it, expect } from 'vitest'
import { calculateScore, getScoreLabel } from './quiz-utils'

describe('calculateScore', () => {
  it('should return 100% for all correct answers', () => {
    const answers = [0, 1, 2, 3]
    const correctAnswers = [0, 1, 2, 3]
    expect(calculateScore(answers, correctAnswers)).toBe(100)
  })

  it('should return 0% for all wrong answers', () => {
    const answers = [1, 0, 3, 2]
    const correctAnswers = [0, 1, 2, 3]
    expect(calculateScore(answers, correctAnswers)).toBe(0)
  })

  it('should handle partial scores', () => {
    const answers = [0, 1, 3, 2]
    const correctAnswers = [0, 1, 2, 3]
    expect(calculateScore(answers, correctAnswers)).toBe(50)
  })
})

describe('getScoreLabel', () => {
  it('should return "Excellent" for scores above 80', () => {
    expect(getScoreLabel(90)).toBe('Excellent')
  })

  it('should return "Good" for scores 60-80', () => {
    expect(getScoreLabel(70)).toBe('Good')
  })

  it('should return "Needs Practice" for scores below 60', () => {
    expect(getScoreLabel(40)).toBe('Needs Practice')
  })
})
```

- [ ] Run it and show RED

```bash
pnpm test lib/quiz-utils.test.ts
```

- [ ] **Agent:** implement against the tests

```text
@lib/quiz-utils.test.ts
The tests define the expected behavior.
Create lib/quiz-utils.ts that implements calculateScore and getScoreLabel
to pass all the tests. Don't modify the tests.
```

- [ ] Run again and show GREEN. If anything fails, paste the error back to Cursor.

```text
@lib/quiz-utils.test.ts The test "should handle empty arrays" is failing.
Here's the error:
[paste error output]

Fix the implementation in lib/quiz-utils.ts to pass this test.
Don't modify the test.
```

- [ ] Add edge cases

```text
@lib/quiz-utils.test.ts @lib/quiz-utils.ts
Add tests for edge cases:
- Empty arrays
- Mismatched array lengths
- Boundary scores (exactly 60, exactly 80)
Then update the implementation to pass them.
```

- [ ] Show the examples: [unit-test.example.ts](sections/04-testing/test-examples/unit-test.example.ts), [component-test.example.tsx](sections/04-testing/test-examples/component-test.example.tsx), [e2e-test.example.ts](sections/04-testing/test-examples/e2e-test.example.ts)
- [ ] *(Optional)* Generate an E2E test

```text
@app/quiz/new/page.tsx @app/quiz/[id]/page.tsx

Generate a Playwright E2E test that covers the full quiz flow:
1. Navigate to /quiz/new
2. Paste study material into the text area
3. Click "Generate Quiz"
4. Answer all generated questions
5. Verify the results page shows a score

Save to e2e/quiz-flow.spec.ts.
```

- [ ] *(Optional)* Find coverage gaps

```text
@codebase What parts of the quiz feature have no test coverage?
Suggest the most important tests to add, prioritized by risk.
```

**Talking points**
- [ ] You control the WHAT (tests), the AI handles the HOW (implementation)
- [ ] The test is the source of truth, which keeps the AI from hallucinating behavior
- [ ] AI is great at finding edge cases you missed
- [ ] Playwright MCP closes the loop: the AI can run E2E tests and see the results

---

## Section 05: Diagrams & Design (Slides 42–50, ~30 min)

Folder: [sections/05-diagrams-design/](sections/05-diagrams-design/) · Demos: [demo-mermaid-diagrams.md](sections/05-diagrams-design/demo-mermaid-diagrams.md), [demo-design-iteration.md](sections/05-diagrams-design/demo-design-iteration.md) · Prompts: [prompts.md](sections/05-diagrams-design/prompts.md)

**Goal:** Generate diagrams from real code, then turn a screenshot into a component.

### Mermaid diagrams (~15 min)

- [ ] Architecture diagram

```text
@codebase Create a Mermaid architecture diagram showing:
- The main components of this application
- How data flows between frontend, API, database, and AI service
- The authentication layer

Output as a Mermaid diagram in a code block.
```

- [ ] Preview it with the Mermaid extension, [mermaid.live](https://mermaid.live), or GitHub markdown
- [ ] User flow diagram

```text
@codebase Create a Mermaid flowchart showing the complete user journey:
1. User lands on homepage
2. Signs in with Clerk
3. Creates a new quiz (uploads material)
4. AI generates questions
5. User takes the quiz
6. Views results
7. Can retake or create new quiz

Use clear labels and decision points.
```

- [ ] Database ERD. Point out that it matches the actual schema.

```text
@db/schema/ Create a Mermaid Entity Relationship Diagram from these
Drizzle schema files. Show all tables, columns with types,
primary keys, foreign keys, and relationships.
```

- [ ] Iterate on the diagram

```text
Update the architecture diagram to also show:
- The Stripe payment flow
- The Vercel deployment target
- MCP connections (Playwright, GitHub)
```

- [ ] Show the reference examples: [architecture.md](sections/05-diagrams-design/mermaid-examples/architecture.md), [user-flow.md](sections/05-diagrams-design/mermaid-examples/user-flow.md), [database-erd.md](sections/05-diagrams-design/mermaid-examples/database-erd.md)

### Sketch → code (~15 min)

- [ ] Take a screenshot of a UI you like, or photograph a hand-drawn wireframe
- [ ] **Agent:** paste the image and prompt

```text
Look at this design. Create a React component that matches this layout.
Use Tailwind CSS and shadcn/ui components.
Make it responsive (mobile-first).
Match the visual style as closely as possible.
```

- [ ] Iterate. The first pass gets about 70% right, and 2–3 iterations get to about 95%.

```text
The spacing between cards needs to be larger.
The header text should be bolder.
Add a subtle gradient background matching the reference.
```

- [ ] *(Optional, no image)* Description → design

```text
Design a quiz results page that shows:
- A large score circle at the top (animated fill)
- A summary row: correct/incorrect/total
- A scrollable list of questions with expand/collapse
- Green checkmarks for correct, red X for incorrect
- A "Share Results" button at the bottom

Make it visually appealing with subtle animations.
Use our existing design system (Tailwind + shadcn/ui).
```

**Talking points**
- [ ] Mermaid is text-based, so it works with version control and AI generation
- [ ] Diagrams help you think before building and document afterwards
- [ ] You can paste images straight into Cursor
- [ ] Pair with Playwright MCP to verify the result visually

**⏱ BREAK (~10 min)**

---

## Section 06: Backend, Auth & Payments (Slides 51–58, ~45 min)

Folder: [sections/06-backend-auth-payments/](sections/06-backend-auth-payments/) · Prompts: [prompts.md](sections/06-backend-auth-payments/prompts.md) · Env vars: [env-vars-reference.md](sections/06-backend-auth-payments/env-vars-reference.md)

**Goal:** Connect the dots McKay's template already has: Supabase + Drizzle, Clerk, Stripe, and Server Actions.

### Supabase + Drizzle (~10 min) · [demo-supabase-drizzle.md](sections/06-backend-auth-payments/demo-supabase-drizzle.md)

- [ ] Copy the connection string from Supabase (Project Settings → Database → URI) into `.env.local`

```bash
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

- [ ] Generate the schema

```text
@context-file.md Create the Drizzle schema files in db/schema/ for:
- users table
- quizzes table
- questions table
- quiz_attempts table

Use the database schema from the context file.
Include proper relations, indexes, and timestamps.
Export everything from a db/schema/index.ts barrel file.
```

- [ ] Create the client

```text
@db/schema/index.ts Create the Drizzle database client configuration.
Use the Supabase PostgreSQL connection string from DATABASE_URL env var.
Export a db instance and type-safe query helpers.
```

- [ ] Push the schema, then check Supabase → Table Editor

```bash
pnpm drizzle-kit push
```

- [ ] Test the connection

```text
@db/drizzle.ts @db/schema/index.ts
Create a simple Server Action that inserts a test user
and then reads them back. Run it to verify the connection works.
```

### Clerk auth (~10 min) · [demo-clerk-auth.md](sections/06-backend-auth-payments/demo-clerk-auth.md)

- [ ] Add the keys to `.env.local`

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

- [ ] Check whether the template already has middleware. If it doesn't:

```text
Create a middleware.ts at the project root that uses Clerk's
clerkMiddleware() to protect routes.

Public routes (no auth needed): /, /sign-in, /sign-up
Protected routes (auth required): /dashboard, /quiz/*
```

- [ ] Add the auth UI

```text
@middleware.ts Add Clerk authentication UI to the app:
1. Add <SignInButton> and <UserButton> to the header/navbar
2. When signed in, show the user's avatar and name
3. When signed out, show a "Sign In" button
4. Wrap the app with <ClerkProvider> in the root layout

Follow the existing layout patterns in this project.
```

- [ ] Protect the quiz routes

```text
@middleware.ts @app/quiz/new/page.tsx
The quiz creation and history pages should require authentication.
Add auth checks:
- If not signed in, redirect to /sign-in
- After sign in, redirect back to the original page
- Associate quizzes with the authenticated user's Clerk ID
```

- [ ] Sync users to the database

```text
@db/schema/users.ts @actions/
Create a Server Action that syncs a Clerk user to our database.
When a user signs in for the first time, create a record in the users table
with their Clerk ID and email.
Use this in the dashboard page to ensure the user exists in our DB.
```

- [ ] Sign in live to prove it works

### Stripe payments (~15 min) · [demo-stripe-payments.md](sections/06-backend-auth-payments/demo-stripe-payments.md)

- [ ] Add the keys to `.env.local`

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

- [ ] In the Stripe Dashboard (test mode), create "Quiz App Pro" at $9.99/month and copy the **Price ID**
- [ ] Create the checkout session

```text
@actions/ Create a Server Action called createCheckoutSession that:
1. Takes a userId and priceId
2. Creates a Stripe Checkout Session
3. Redirects the user to Stripe's hosted checkout page
4. Sets success_url and cancel_url back to our app

Use the stripe npm package. Follow the Server Action patterns in this project.
```

- [ ] Handle webhooks

```text
Create an API route at app/api/webhooks/stripe/route.ts that:
1. Receives Stripe webhook events
2. Verifies the webhook signature
3. Handles these events:
   - checkout.session.completed → mark user as premium in DB
   - customer.subscription.deleted → remove premium status
4. Returns 200 on success

Use the STRIPE_WEBHOOK_SECRET for verification.
```

- [ ] Add the pricing UI

```text
@components/ Create a pricing component that shows:
- Free tier: 3 quizzes per day
- Pro tier: Unlimited quizzes, $9.99/month
- A "Upgrade" button that triggers the checkout flow
- Show the user's current plan status

Check the user's premium status from the database.
```

- [ ] Forward webhooks locally (keep this terminal open)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

- [ ] Pay with the test card `4242 4242 4242 4242` (any future expiry and CVC) and show the user flip to premium

### Server Actions (~10 min) · [demo-server-actions.md](sections/06-backend-auth-payments/demo-server-actions.md)

- [ ] Build the CRUD actions

```text
@actions/ Create a Server Action file called quiz-actions.ts with these actions:

1. createQuiz(userId, title, sourceText, questions)
   - Validate input with Zod
   - Insert quiz + questions into DB
   - Return the quiz ID

2. getQuiz(quizId)
   - Fetch quiz with all questions
   - Return structured data

3. submitAttempt(quizId, userId, answers)
   - Calculate score
   - Save to quiz_attempts table
   - Return score and correct answers

4. getUserQuizzes(userId)
   - Fetch all quizzes for a user
   - Include latest attempt score
   - Order by created_at descending

Each action should:
- Use "use server" directive
- Validate inputs with Zod
- Handle errors with try/catch
- Return { success, data?, error? }
- Use revalidatePath after mutations
```

- [ ] Connect auth to data

```text
@middleware.ts @actions/quiz-actions.ts
Update the quiz Server Actions to:
1. Get the current user from Clerk using auth()
2. Only return quizzes belonging to the authenticated user
3. Associate new quizzes with the user's Clerk ID
4. Reject requests from unauthenticated users
```

- [ ] Show the "Server Actions vs API Routes" table in the demo file. Webhooks stay as API routes.
- [ ] Run an integration check

```text
@codebase Verify the full backend integration:
1. Is the Clerk middleware protecting the right routes?
2. Are all Server Actions using Zod validation?
3. Is the Drizzle schema matching the actual Supabase tables?
4. Are there any missing error handlers?

List any issues found.
```

- [ ] Commit to git

**Talking points**
- [ ] McKay's template already wires most of this up. We are connecting the dots.
- [ ] Drizzle gives type-safe queries, so column typos fail at compile time
- [ ] Clerk middleware protects routes from a single config file
- [ ] Stripe test mode behaves like production, so it's safe to demo live
- [ ] Always verify webhook signatures
- [ ] Server Actions are the Next.js way to do mutations

**⏱ BREAK (~10 min)**

---

## Section 07: Deployment (Slides 59–67, ~30 min)

Folder: [sections/07-deployment/](sections/07-deployment/) · Demo: [demo-vercel-deploy.md](sections/07-deployment/demo-vercel-deploy.md) · Prompts: [prompts.md](sections/07-deployment/prompts.md) · Checklist: [production-checklist.md](sections/07-deployment/production-checklist.md) · Costs: [cost-breakdown.md](sections/07-deployment/cost-breakdown.md)

**Goal:** Ship the quiz app to Vercel and show it live.

- [ ] Walk through [production-checklist.md](sections/07-deployment/production-checklist.md)
- [ ] Run a pre-deploy check with Cursor

```text
@codebase Run a pre-deployment check:
1. Are there any console.log statements that should be removed?
2. Are all environment variables properly referenced (not hardcoded)?
3. Are there any TODO comments that need addressing?
4. Is error handling in place for all Server Actions?
5. Are all TypeScript types strict (no 'any')?

List any issues found with file paths and line numbers.
```

- [ ] Build locally. If it builds here, it will build on Vercel.

```bash
pnpm build
```

- [ ] Push to GitHub

```bash
git add -A
git commit -m "feat: complete AI quiz app with auth and payments"
git push origin main
```

- [ ] Go to [vercel.com/new](https://vercel.com/new) and import the repo. Next.js is auto-detected. **Don't deploy yet.**
- [ ] Add env vars from [env-vars-reference.md](sections/06-backend-auth-payments/env-vars-reference.md). Call out the differences in production:
  - `DATABASE_URL` uses the **pooled** Supabase string (port 6543, not 5432)
  - `NEXT_PUBLIC_APP_URL` is the Vercel URL
  - Clerk uses production keys. Stripe stays on test keys for now.
- [ ] *(Optional)* Review env vars with Cursor

```text
@env-vars-reference.md Review all environment variables and tell me:
1. Which ones need different values for production vs development?
2. Which ones are exposed to the client (NEXT_PUBLIC_*)?
3. Are there any security concerns with the current setup?
```

- [ ] Click **Deploy** and watch the build logs
- [ ] Add the Stripe production webhook at `https://your-app.vercel.app/api/webhooks/stripe` with events `checkout.session.completed` and `customer.subscription.deleted`. Copy the signing secret to Vercel and redeploy.
- [ ] Show the live app: sign up → create a quiz → take it → view results → checkout
- [ ] *(Optional)* Generate RLS policies for production

```text
@db/schema/ Generate the SQL commands needed to:
1. Enable Row Level Security on all tables
2. Create RLS policies so users can only access their own data
3. Add indexes on frequently queried columns (user_id, quiz_id)
4. Set up the user isolation policy for Clerk user IDs
```

- [ ] *(Optional)* Generate a smoke-test checklist

```text
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

- [ ] Review [cost-breakdown.md](sections/07-deployment/cost-breakdown.md) (free-tier limits)
- [ ] For the full test-mode → live-payments path, point students to [prod-guide.md](sections/03-ai-quiz-app/prod-guide.md)

**Talking points**
- [ ] Vercel is zero-config for Next.js
- [ ] Env vars are the #1 deployment issue, so double-check them all. `NEXT_PUBLIC_*` vars need a redeploy to change.
- [ ] Free tiers are generous: Vercel, Supabase, and Clerk all have usable free plans
- [ ] Production differs from dev: enable RLS, use connection pooling, set up monitoring

**Common failures:** missing env vars (undefined errors), wrong Node.js version (Settings → General), wrong root directory (404 or blank page).

---

## Section 08: Finishing (~15 min)

Folder: [sections/08-finishing/](sections/08-finishing/) · [resources.md](sections/08-finishing/resources.md) · [troubleshooting.md](sections/08-finishing/troubleshooting.md)

- [ ] Quick recap of all 8 sections (2 min)
- [ ] Key takeaways (3 min):
  - [ ] Cursor multiplies your work. It doesn't replace thinking.
  - [ ] Explore → Plan → Build. Don't skip the first two steps.
  - [ ] Context quality beats prompt cleverness
  - [ ] Add project rules incrementally
  - [ ] MCP extends Cursor's reach: Playwright, GitHub, docs, databases
  - [ ] Two-stage workflow: plan with ChatGPT/Claude, build with Cursor
  - [ ] TDD with AI: you write the test, the AI implements
  - [ ] Full stack is achievable: Supabase + Clerk + Stripe + Vercel
  - [ ] Git discipline is non-negotiable
  - [ ] Try 5 times before giving up
- [ ] Share [resources.md](sections/08-finishing/resources.md) (5 min)
- [ ] Q&A (5 min). Keep [troubleshooting.md](sections/08-finishing/troubleshooting.md) open.
