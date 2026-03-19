# Demo: Next.js Server Actions

**Goal:** Show the Server Actions pattern — the Next.js-native way to handle data mutations.

---

## What Are Server Actions?

Server Actions are async functions that run on the server, called directly from client components. No need for separate API routes for most operations.

```typescript
// actions/quiz-actions.ts
"use server"

export async function createQuiz(formData: FormData) {
  // This runs on the server
  // Has access to DB, env vars, auth — securely
}
```

## Pattern: Server Action with Validation

```
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

## When to Use Server Actions vs. API Routes

| Use Server Actions for | Use API Routes for |
|------------------------|--------------------|
| Form submissions | Webhooks (Stripe, etc.) |
| Button click mutations | External API consumers |
| CRUD operations | File uploads (streaming) |
| Auth-gated operations | Long-running processes |

## What to Emphasize

- Server Actions are simpler than API routes for most use cases
- They're automatically secure — run on the server, no CORS issues
- Zod validation is critical — never trust client input
- `revalidatePath` triggers Next.js to re-fetch data after a mutation

## Timing

~10 min
