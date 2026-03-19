# Section 05: AI Quiz App Build

**Slides:** 22–32 | **Duration:** ~60 min | **Break after:** Yes

## Learning Goals

- Use the context file approach to drive a complex feature build
- Implement AI-powered quiz generation using OpenAI/DeepSeek API
- Apply the two-stage workflow (planning tool → Cursor implementation)
- Understand the Hierarchy of Leverage for AI-assisted development
- Build iteratively: scaffold → core logic → AI integration → polish

## Prerequisites

- Simple quiz from Section 02 working on McKay's template
- OpenAI or DeepSeek API key configured
- Context file created (from Section 02 template)

## Demo Checklist

- [ ] Present the filled-in context file (see [context-file.md](context-file.md))
- [ ] Walk through the build sequence (see [demo-build-steps.md](demo-build-steps.md))
- [ ] Explain the Hierarchy of Leverage (see [hierarchy-of-leverage.md](hierarchy-of-leverage.md))
- [ ] Build the AI quiz generation feature live
- [ ] Show the two-stage workflow in action
- [ ] Test the full flow: upload material → generate quiz → take quiz → see results

## Files in This Section

| File | Purpose |
|------|---------|
| [context-file.md](context-file.md) | THE context file for the AI quiz app |
| [demo-build-steps.md](demo-build-steps.md) | Numbered build sequence |
| [hierarchy-of-leverage.md](hierarchy-of-leverage.md) | Reference card |
| [prompts.md](prompts.md) | Build prompts for each step |

## Key Talking Points

- The context file is your project's "north star" — reference it in every prompt
- Two-stage workflow: use ChatGPT/Claude for planning, Cursor for implementation
- The Hierarchy of Leverage: rules > context > prompts > model capability
- Build iteratively — don't try to build everything in one giant prompt
- This is where sections 01-04 come together in practice
