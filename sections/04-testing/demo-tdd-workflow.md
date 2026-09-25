# Demo: TDD Workflow with Cursor

**Goal:** Show the Test-Driven Development cycle powered by AI — write a failing test, then let Cursor implement the code to pass it.

---

## The TDD Cycle with AI

```
1. YOU write the test (defines expected behavior)
2. Run test → RED (fails)
3. AI implements the code
4. Run test → GREEN (passes)
5. AI refactors (optional)
```

**Why this works:** You control the WHAT (tests define behavior), the AI handles the HOW (implementation). This prevents AI hallucination because the test is the source of truth.

## Demo: Quiz Score Calculator

### Step 1: Write the test first

Create `lib/quiz-utils.test.ts`:

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

### Step 2: Run the test (RED)

```bash
pnpm test lib/quiz-utils.test.ts
```

Tests fail because `quiz-utils.ts` doesn't exist yet.

### Step 3: Let Cursor implement

```
@lib/quiz-utils.test.ts
The tests define the expected behavior.
Create lib/quiz-utils.ts that implements calculateScore and getScoreLabel
to pass all the tests. Don't modify the tests.
```

### Step 4: Run the test (GREEN)

```bash
pnpm test lib/quiz-utils.test.ts
```

All tests should pass. If not, show Cursor the error and let it fix.

### Step 5: Ask for more edge cases

```
@lib/quiz-utils.test.ts @lib/quiz-utils.ts
Add tests for edge cases:
- Empty arrays
- Mismatched array lengths
- Boundary scores (exactly 60, exactly 80)
Then update the implementation to pass them.
```

## Timing

- Write test + explain TDD: ~5 min
- Run RED → implement → GREEN: ~5 min
- Edge cases + discussion: ~5 min
- Q&A: ~5 min
