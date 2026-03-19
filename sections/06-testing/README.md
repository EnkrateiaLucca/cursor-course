# Section 06: Testing

**Slides:** 33–36 | **Duration:** ~20 min | **Break after:** No

## Learning Goals

- Apply TDD (Test-Driven Development) workflow with Cursor
- Understand the testing pyramid: unit → component → integration → E2E
- Generate and run tests using AI assistance
- Use Playwright for E2E testing

## Prerequisites

- AI Quiz App from Section 05 running
- Vitest and Playwright installed in the project

## Demo Checklist

- [ ] Explain the TDD workflow with Cursor (see [demo-tdd-workflow.md](demo-tdd-workflow.md))
- [ ] Write a failing test first, then let Cursor implement the code
- [ ] Show unit, component, and E2E test examples (see [test-examples/](test-examples/))
- [ ] Run the test suite and show results

## Files in This Section

| File | Purpose |
|------|---------|
| [demo-tdd-workflow.md](demo-tdd-workflow.md) | TDD cycle demo steps |
| [test-examples/unit-test.example.ts](test-examples/unit-test.example.ts) | Unit test example |
| [test-examples/component-test.example.tsx](test-examples/component-test.example.tsx) | Component test example |
| [test-examples/e2e-test.example.ts](test-examples/e2e-test.example.ts) | Playwright E2E example |
| [prompts.md](prompts.md) | Testing prompts |

## Key Talking Points

- TDD with AI: write the test first (you define behavior), let AI implement the code
- AI is excellent at generating test cases — it thinks of edge cases you might miss
- The testing pyramid still matters: many unit tests, fewer E2E tests
- Playwright MCP closes the loop: AI can run E2E tests and see the results visually
