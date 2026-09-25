# Section 01: Cursor Intro

**Slides:** 1–21 | **Duration:** ~95 min | **Break after:** Yes

## Learning Goals

- Understand what Cursor is and how it differs from traditional IDEs
- Use the core interaction surfaces: Agent panel modes (Agent, Ask, Plan, Debug), Inline Edit, and Tab
- Configure Project Rules (`.cursor/rules`), AGENTS.md, and CLAUDE.md
- Connect external tools via MCP (Model Context Protocol)
- Build intuition for when to use each mode, rule type, and MCP server

## Prerequisites

- Cursor IDE installed and signed in
- No project setup needed for the modes demo (we start from an empty file)
- For Rules/MCP demos: McKay's App Template open (or continue after Section 02)

## Teaching Arc

1. **What is Cursor?** — AI-first editor; Agent as development partner
2. **Core interaction modes** — Agent / Ask / Plan / Debug, Inline Edit, Tab
3. **Live demo** — Toy HTML app to exercise each surface
4. **Project Rules** — Always / Intelligently / Specific Files / Manual + AGENTS.md
5. **MCP & tooling** — Playwright MCP, GitHub/GitMCP, CLI vs IDE

## Demo Checklist

### Part A — Interface & modes (~45 min)

- **Show Cursor interface** — sidebar, Agent panel (`Cmd+I` / `Ctrl+I`), mode picker (`Shift+Tab`)
- Build a toy HTML app live (see [demo-toy-app.md](demo-toy-app.md))
- Demonstrate Inline Edit (`Cmd+K` / `Ctrl+K`) on the HTML app
- Show Tab autocomplete predicting code
- Switch Agent modes: Ask (read-only) → Plan → Agent (multi-step edits)
- Discuss when to use each mode

### Part B — Project Rules (~20 min)

- Explain the four rule application types with current Cursor naming
- Create rules live (see [project-rules/demo-rules-setup.md](project-rules/demo-rules-setup.md))
- Show example `.mdc` files in [project-rules/example-rules/](project-rules/example-rules/)
- Walk through AGENTS.md and CLAUDE.md examples
- Discuss when NOT to use rules

### Part C — MCP & tooling (~30 min)

- Explain MCP ("USB for AI") and install paths (Customize sidebar or `.cursor/mcp.json`)
- Configure Playwright MCP (see [mcp-and-tooling/demo-playwright-mcp.md](mcp-and-tooling/demo-playwright-mcp.md))
- Show MCP config examples in [mcp-and-tooling/mcp-config-examples/](mcp-and-tooling/mcp-config-examples/)
- Discuss CLI vs MCP trade-offs ([cli-vs-mcp-comparison.md](mcp-and-tooling/cli-vs-mcp-comparison.md))

## Files in This Section

| File | Purpose |
|------|---------|
| [demo-toy-app.md](demo-toy-app.md) | Step-by-step: build a simple HTML app (modes demo) |
| [prompts.md](prompts.md) | Copy-paste prompts for modes demos |
| [image-pdf-layout.html](image-pdf-layout.html) | Single-file HTML prototype: image-to-PDF layout tool |
| [image-pdf-app/](image-pdf-app/) | Next.js version (deployable on Vercel) |
| [project-rules/](project-rules/) | Rules demos, examples, and prompts (merged from former §03) |
| [mcp-and-tooling/](mcp-and-tooling/) | MCP demos, configs, and prompts (merged from former §04) |

## Key Talking Points

- Cursor is AI-first — Agent searches, edits, runs commands, and verifies
- **Agent modes** (cycle with `Shift+Tab`): Agent (build), Ask (explore, read-only), Plan (approve approach first), Debug (runtime evidence)
- **Inline Edit** (`Cmd/Ctrl+K`) for surgical in-place changes; **Tab** for predictive completions — rules do **not** apply to Tab or Inline Edit
- Rules are onboarding docs for your AI — start without them; add when you see repeated mistakes
- Current rule types: Always Apply · Apply Intelligently · Apply to Specific Files · Apply Manually ([docs](https://cursor.com/docs/rules))
- MCP standardizes how Agent connects to browsers, GitHub, docs, and more ([docs](https://cursor.com/docs/context/mcp))
- Emphasize the "try 5 times" rule — if a prompt doesn't work, rephrase and retry
- Git commits are critical — Cursor's checkpoint system is NOT a replacement for git

## Docs Reference (keep current)

- [Agent mode](https://cursor.com/help/ai-features/agent)
- [Inline Edit](https://cursor.com/help/ai-features/inline-edit)
- [Rules](https://cursor.com/docs/rules)
- [MCP](https://cursor.com/docs/context/mcp)
