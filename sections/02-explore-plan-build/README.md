# Section 02: Explore-Plan-Build Framework

**Slides:** follow Section 01 | **Duration:** ~45 min | **Break after:** No

## Learning Goals

- Understand the Explore → Plan → Build framework for AI-assisted development
- Master context navigation (@file, @folder, @codebase, @docs, @web) and Plan mode
- Create a context file that serves as the project's "north star"
- Build a simple HTML/JS (or template-based) app to practice the framework end-to-end

## Prerequisites

- Section 01 complete (you know Agent modes, rules basics, and MCP)
- For the quiz-on-template path: McKay's App Template cloned and running locally
- Optional pure HTML/JS path: empty folder or the course repo (reuse the Section 01 toy app)

## Demo Checklist

- Open the project in Cursor and explore with Ask mode + @ symbols
- Demonstrate @file, @folder, @codebase, @docs in Ask/Agent
- Use **Plan mode** for the approach before switching to Agent to build
- Walk through the context file template (see [context-file-template.md](context-file-template.md))
- Build a simple app:
  - **Primary:** simple quiz page on McKay's template (see [demo-simple-quiz.md](demo-simple-quiz.md))
  - **Alt / warm-up:** explore → plan → extend the Section 01 HTML/JS toy app with a new feature
- **Show the Explore → Plan → Build cycle in action**

## Files in This Section

| File | Purpose |
|------|---------|
| [demo-simple-quiz.md](demo-simple-quiz.md) | Build a quiz WITHOUT AI features on McKay's template |
| [context-file-template.md](context-file-template.md) | Reusable context file template |
| [prompts.md](prompts.md) | @ symbol demos and exploration prompts |
| [PLAN.md](PLAN.md) | Example planning output |
| [presentation.html](presentation.html) | Section slides (optional) |

## Key Talking Points

- Don't jump straight to code — EXPLORE first, PLAN your approach (Plan mode), then BUILD (Agent)
- The @ symbol is your context navigator: @file for precision, @codebase for discovery
- A context file saves you from repeating yourself in every prompt
- The two-stage workflow: ChatGPT/Claude for planning → Cursor for implementation (or Plan mode inside Cursor)
- More context != better results — curate what the AI sees
- This section is the bridge from "knowing the Cursor UI" (Section 01) to "shipping a real app" (Section 03+)
