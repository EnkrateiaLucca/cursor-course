# Demo: AI Quiz App Build Steps

**Goal:** Build the AI-powered quiz generation feature step by step, demonstrating the two-stage workflow and context file approach.

---

## Build Sequence

### Step 1: Set up the AI route (~10 min)

**What:** Create a Server Action that takes text input and returns AI-generated quiz questions.

1. Create `actions/generate-quiz.ts` with a Server Action
2. Connect to OpenAI/DeepSeek API
3. Define the expected response schema with Zod
4. Parse and validate the AI response

**Prompt:** See [prompts.md](prompts.md) — "Step 1: AI Generation"

**Verify:** Test the action with a sample text input in a test page.

### Step 2: Build the upload/input UI (~10 min)

**What:** Create the page where users paste study material and trigger quiz generation.

1. Create `app/quiz/new/page.tsx`
2. Add a textarea for pasting study material
3. Add a "Generate Quiz" button
4. Show loading state during AI generation
5. Redirect to the quiz page on success

**Prompt:** See [prompts.md](prompts.md) — "Step 2: Upload UI"

**Verify:** Paste sample text → click Generate → see loading state → redirect.

### Step 3: Upgrade the quiz-taking UI (~10 min)

**What:** Upgrade the simple quiz from Section 02 to work with AI-generated questions.

1. Update `app/quiz/[id]/page.tsx` to fetch quiz data from the database
2. Display AI-generated questions one at a time
3. Track user answers
4. Calculate and store the score

**Prompt:** See [prompts.md](prompts.md) — "Step 3: Quiz UI"

**Verify:** Navigate through all questions → see score at the end.

### Step 4: Build the results page (~10 min)

**What:** Show detailed results with correct answers and explanations.

1. Create `app/quiz/[id]/results/page.tsx`
2. Show each question with the user's answer vs. correct answer
3. Display AI-generated explanations
4. Show overall score with pass/fail indicator

**Prompt:** See [prompts.md](prompts.md) — "Step 4: Results Page"

**Verify:** Complete a quiz → see detailed results with explanations.

### Step 5: Connect to database (~15 min)

**What:** Persist quizzes and results in Supabase via Drizzle.

1. Define Drizzle schema for quizzes, questions, quiz_attempts tables
2. Create Server Actions for CRUD operations
3. Wire up the UI to save/load from the database
4. Add user association (Clerk userId)

**Prompt:** See [prompts.md](prompts.md) — "Step 5: Database Integration"

**Verify:** Generate quiz → take it → results saved → visible in dashboard.

### Step 6: Polish and iterate (~5 min)

Use Playwright MCP to visually test the full flow and fix any issues.

---

## Two-Stage Workflow in Action

For each step above:
1. **Stage 1 (Plan):** Describe what you want in ChatGPT/Claude → get a structured approach
2. **Stage 2 (Build):** Bring that plan to Cursor with `@context-file.md` → let Agent mode implement

This prevents the AI from going off track — you've already validated the approach.

## Timing

| Step | Duration |
|------|----------|
| Step 1: AI route | ~10 min |
| Step 2: Upload UI | ~10 min |
| Step 3: Quiz UI | ~10 min |
| Step 4: Results | ~10 min |
| Step 5: Database | ~15 min |
| Step 6: Polish | ~5 min |
| **Total** | **~60 min** |
