# Section 03: Project Rules

**Slides:** 12–14 | **Duration:** ~20 min | **Break after:** No

## Learning Goals

- Understand the four Cursor rule application modes (Always, Auto Attached, Agent Requested, Manual)
- Create effective `.cursor/rules/*.mdc` files for a real project
- Understand AGENTS.md and CLAUDE.md as "power tool" context files
- Know when rules help vs. when they're overkill

## Prerequisites

- McKay's template open in Cursor (continuing from Section 02)

## Demo Checklist

- [ ] Explain the four rule modes with examples
- [ ] Create rules live for the quiz project (see [demo-rules-setup.md](demo-rules-setup.md))
- [ ] Show example .mdc files (see [example-rules/](example-rules/))
- [ ] Walk through AGENTS.md and CLAUDE.md examples
- [ ] Discuss when NOT to use rules (staff engineer perspective)

## Files in This Section

| File | Purpose |
|------|---------|
| [demo-rules-setup.md](demo-rules-setup.md) | Live demo: creating rules for the quiz project |
| [example-rules/nextjs-patterns.mdc](example-rules/nextjs-patterns.mdc) | Example: Next.js patterns rule |
| [example-rules/api-standards.mdc](example-rules/api-standards.mdc) | Example: API standards rule |
| [example-rules/testing.mdc](example-rules/testing.mdc) | Example: Testing conventions rule |
| [example-agents-md.md](example-agents-md.md) | Example AGENTS.md for a real project |
| [example-claude-md.md](example-claude-md.md) | Example CLAUDE.md for a real project |
| [prompts.md](prompts.md) | Prompts for rule creation demos |

## Key Talking Points

- Rules are like onboarding docs for your AI — they encode team standards
- Start without rules, add them only when you notice patterns of mistakes
- AGENTS.md (Cursor) and CLAUDE.md (Claude Code) serve as project-level context
- The four modes give you control over when rules activate
- Don't over-engineer rules — they add processing overhead to every request
