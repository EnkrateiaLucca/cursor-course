# Section 05: Prompts

## Step 1: AI Generation Server Action

```
@context-file.md Create a Server Action in actions/generate-quiz.ts that:

1. Takes a source text string and question count as parameters
2. Calls the OpenAI API (gpt-4o-mini) with a prompt to generate multiple-choice questions
3. Validates the AI response with Zod to ensure correct format
4. Returns an array of questions, each with:
   - question_text (string)
   - options (array of 4 strings)
   - correct_answer (number, 0-3)
   - explanation (string)

Use the AI prompt strategy from the context file.
Handle errors gracefully — return a meaningful error message if the API call fails.
```

## Step 2: Upload/Input UI

```
@context-file.md @actions/generate-quiz.ts

Create the quiz creation page at app/quiz/new/page.tsx:

1. A textarea where users paste their study material
2. A number input for how many questions to generate (default: 5, max: 20)
3. A "Generate Quiz" button that calls the generate-quiz Server Action
4. Loading state with a spinner while the AI generates questions
5. Error handling — show a toast if generation fails
6. On success, save the quiz to the database and redirect to /quiz/[id]

Use shadcn/ui components. Follow the existing layout patterns.
```

## Step 3: Quiz-Taking UI

```
@context-file.md @app/quiz/new/page.tsx

Create/update the quiz page at app/quiz/[id]/page.tsx:

1. Fetch the quiz and its questions from the database
2. Show one question at a time with a progress bar (e.g., "Question 3 of 10")
3. Display 4 answer options as clickable cards
4. Highlight the selected answer
5. "Next" button to advance (disabled until an answer is selected)
6. After the last question, calculate the score and redirect to results

Track the user's answers in component state.
Use the existing UI components and design patterns.
```

## Step 4: Results Page

```
@context-file.md @app/quiz/[id]/page.tsx

Create the results page at app/quiz/[id]/results/page.tsx:

1. Show the overall score as a percentage with a visual indicator
   (green for >70%, yellow for 50-70%, red for <50%)
2. List each question with:
   - The question text
   - The user's answer (highlighted red if wrong, green if right)
   - The correct answer (always shown)
   - The AI-generated explanation
3. A "Try Again" button to retake the quiz
4. A "New Quiz" button to go back to /quiz/new

Save the attempt to quiz_attempts table.
```

## Step 5: Database Integration

```
@context-file.md Set up the database layer:

1. Create Drizzle schema in db/schema/ for:
   - quizzes table (id, user_id, title, source_text, created_at)
   - questions table (id, quiz_id, question_text, options, correct_answer, explanation, order)
   - quiz_attempts table (id, quiz_id, user_id, score, answers, completed_at)

2. Create Server Actions in actions/:
   - createQuiz(userId, title, sourceText, questions)
   - getQuiz(quizId)
   - saveAttempt(quizId, userId, score, answers)
   - getUserQuizzes(userId)

3. Wire the UI to use these Server Actions instead of local state.

Follow the database schema from the context file.
```

## Full Flow Test

```
Test the complete quiz flow:
1. Navigate to /quiz/new
2. Paste this text: "React is a JavaScript library for building user interfaces.
   Components are the building blocks of React applications.
   Hooks like useState and useEffect manage state and side effects.
   The virtual DOM enables efficient rendering updates."
3. Generate 5 questions
4. Take the quiz
5. Check the results page

Report any issues you find.
```
