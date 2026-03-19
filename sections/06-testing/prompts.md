# Section 06: Prompts

## Generate Unit Tests

```
@lib/quiz-utils.ts Generate comprehensive unit tests for this file.
Cover:
- Happy path for each function
- Edge cases (empty inputs, boundary values)
- Error conditions

Use Vitest. Write tests in lib/quiz-utils.test.ts.
```

## Generate Component Tests

```
@components/quiz-card.tsx Generate component tests using Vitest
and React Testing Library.

Test:
- Rendering the question and all options
- Click handling (selecting an answer)
- Visual state changes (selected, disabled)
- Accessibility (keyboard navigation)

Write tests in components/quiz-card.test.tsx.
```

## Generate E2E Tests

```
@app/quiz/new/page.tsx @app/quiz/[id]/page.tsx

Generate a Playwright E2E test that covers the full quiz flow:
1. Navigate to /quiz/new
2. Paste study material into the text area
3. Click "Generate Quiz"
4. Answer all generated questions
5. Verify the results page shows a score

Save to e2e/quiz-flow.spec.ts.
```

## TDD: Write Test First

```
I want a function called `generateQuizTitle` that takes source text
and returns a short, descriptive title for the quiz (max 60 chars).

Write the TEST FIRST in lib/quiz-utils.test.ts.
Don't implement the function yet — just the test cases.
```

## Fix Failing Tests

```
@lib/quiz-utils.test.ts The test "should handle empty arrays" is failing.
Here's the error:
[paste error output]

Fix the implementation in lib/quiz-utils.ts to pass this test.
Don't modify the test.
```

## Add Test Coverage

```
@codebase What parts of the quiz feature have no test coverage?
Suggest the most important tests to add, prioritized by risk.
```
