# AI Quiz App — Context File

> This is the actual context file used during the Section 05 demo. Reference with `@context-file.md` in Cursor.

## Problem Statement

Students need a way to create practice quizzes from their study materials. They upload PDFs, text, or notes, and the app generates multiple-choice questions using AI. They can take the quiz, see their score, and review correct answers.

## Target Users

- Students preparing for exams
- Self-learners testing their comprehension
- Teachers creating quick assessments from course material

## Core Features

1. **Material Upload** — Upload text or paste content to generate quizzes from
2. **AI Quiz Generation** — Use OpenAI/DeepSeek to create multiple-choice questions
3. **Interactive Quiz** — Take the quiz one question at a time with score tracking
4. **Results Review** — See score, correct/incorrect answers, and explanations
5. **Quiz History** — View past quizzes and scores (requires auth)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) + Drizzle ORM |
| Auth | Clerk |
| AI | OpenAI API (gpt-4o-mini) or DeepSeek |
| Deployment | Vercel |

## Database Schema

```
users
  - id (uuid, PK)
  - clerk_id (text, unique)
  - email (text)
  - created_at (timestamp)

quizzes
  - id (uuid, PK)
  - user_id (uuid, FK → users)
  - title (text)
  - source_text (text) — the uploaded material
  - created_at (timestamp)

questions
  - id (uuid, PK)
  - quiz_id (uuid, FK → quizzes)
  - question_text (text)
  - options (jsonb) — array of 4 choices
  - correct_answer (integer) — index of correct option
  - explanation (text) — AI-generated explanation
  - order (integer)

quiz_attempts
  - id (uuid, PK)
  - quiz_id (uuid, FK → quizzes)
  - user_id (uuid, FK → users)
  - score (integer)
  - answers (jsonb) — user's selected answers
  - completed_at (timestamp)
```

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/dashboard` | User's quizzes and history |
| `/quiz/new` | Upload material + generate quiz |
| `/quiz/[id]` | Take a specific quiz |
| `/quiz/[id]/results` | Review quiz results |

## AI Prompt Strategy

For quiz generation, send this to the AI:

```
Given the following study material, generate {count} multiple-choice questions.

For each question:
- Write a clear question
- Provide exactly 4 answer options
- Indicate which option is correct (0-indexed)
- Write a brief explanation of why the correct answer is right

Return as JSON array.

Study material:
{source_text}
```

## Out of Scope (v1)

- Image/PDF upload (text paste only for v1)
- Real-time multiplayer quizzes
- Spaced repetition / learning algorithms
- Payment features (added in Section 08)
