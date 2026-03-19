# QuizUpload — Context File

## Problem Statement

Students and educators need a fast way to turn structured content into interactive quizzes. Currently, creating web-based quizzes requires dedicated platforms with complex editors. QuizUpload lets users upload a simple `.json` or `.md` file and instantly get a polished, interactive quiz experience in the browser — no account required to take a quiz, but signing in unlocks history and analytics.

## Target Users

- **Students** — want to self-test by uploading study material as structured quiz files
- **Educators / Course creators** — want to quickly generate shareable quizzes from existing content
- **Self-learners** — want spaced-repetition style practice from their own notes

## Core Features

1. **File Upload & Parsing** — Drag-and-drop or click-to-upload `.json` and `.md` files; validate and parse into a normalized quiz format
2. **Three Question Types** — Multiple-choice (pick one from N options), Yes/No (binary true/false), and Open-ended (free text with sample answer)
3. **Instant Answer Feedback** — After answering each question, the correct answer highlights in green and any wrong selection highlights in red; open-ended questions reveal the sample answer for self-assessment
4. **Interactive Quiz Player** — Question-by-question navigation with progress bar; ends with a final score page showing total correct / total questions and a per-question breakdown
5. **Quiz Dashboard** — Authenticated users can view past quizzes, scores, and retry attempts
6. **Shareable Quiz Links** — Each uploaded quiz gets a unique URL that anyone can take without signing in
7. **Quiz History & Analytics** — Track scores over time, see which questions were missed most, and review answers

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 15 (App Router) | Server components, file-based routing (from template) |
| Language | TypeScript | Type safety across full stack |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI with consistent design system (from template) |
| Database | Supabase (PostgreSQL) | Managed DB + real-time + file storage (from template) |
| ORM | Drizzle | Type-safe queries, lightweight migrations (from template) |
| Auth | Clerk | Drop-in auth, social logins (from template) |
| Payments | Stripe | Pro tier for unlimited quizzes (from template) |
| File Parsing | Custom + gray-matter + remark | Parse .md frontmatter and content into quiz format |
| Animations | Framer Motion | Smooth quiz transitions (from template) |
| Deployment | Vercel | Zero-config Next.js hosting (from template) |

## Supported File Formats

### JSON Format

```json
{
  "title": "JavaScript Basics",
  "description": "Test your JS fundamentals",
  "questions": [
    {
      "type": "multiple-choice",
      "question": "What does `typeof null` return?",
      "options": ["null", "undefined", "object", "boolean"],
      "answer": 2,
      "explanation": "This is a known JS quirk — typeof null returns 'object'."
    },
    {
      "type": "yes-no",
      "question": "JavaScript is a statically typed language.",
      "answer": false,
      "explanation": "JavaScript is dynamically typed — types are determined at runtime."
    },
    {
      "type": "open-ended",
      "question": "Explain the difference between let and var.",
      "hint": "Think about scope and hoisting.",
      "sampleAnswer": "let is block-scoped while var is function-scoped..."
    }
  ]
}
```

### Markdown Format

```markdown
---
title: JavaScript Basics
description: Test your JS fundamentals
---

## Q1 (multiple-choice)
What does `typeof null` return?

- [ ] null
- [ ] undefined
- [x] object
- [ ] boolean

> **Explanation:** This is a known JS quirk — typeof null returns 'object'.

## Q2 (yes-no)
JavaScript is a statically typed language.

- [ ] Yes
- [x] No

> **Explanation:** JavaScript is dynamically typed — types are determined at runtime.

## Q3 (open-ended)
Explain the difference between let and var.

> **Hint:** Think about scope and hoisting.

> **Sample Answer:** let is block-scoped while var is function-scoped...
```

## Database Schema (High-Level)

- **users** — id, clerk_id, email, name, plan (free/pro), created_at
- **quizzes** — id, user_id (nullable), title, description, share_slug, source_format (json/md), question_count, is_public, created_at
- **questions** — id, quiz_id, type (multiple-choice/yes-no/open-ended), question_text, options (jsonb, nullable), correct_answer, explanation, hint, sample_answer, order_index
- **attempts** — id, quiz_id, user_id (nullable), score, total_questions, completed_at, time_taken_seconds
- **responses** — id, attempt_id, question_id, user_answer, is_correct

### Relationships

```
users 1──∞ quizzes
users 1──∞ attempts
quizzes 1──∞ questions
quizzes 1──∞ attempts
attempts 1──∞ responses
questions 1──∞ responses
```

## Key Pages / Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page — upload a file or see how it works |
| `/upload` | Drag-and-drop file upload with live preview |
| `/quiz/[slug]` | Interactive quiz player (public, no auth needed) |
| `/quiz/[slug]/results` | Score summary and answer review |
| `/dashboard` | Authenticated user's quiz history and analytics |
| `/dashboard/quizzes` | List of all uploaded quizzes with edit/delete |
| `/dashboard/analytics` | Score trends, weak areas, retry stats |
| `/pricing` | Free vs Pro tier comparison |

## Implementation Phases

### Phase 1 — File Upload & Parsing (Core MVP)
1. Set up project from McKay's app template (`npx create-next-app` + template)
2. Create file upload component with drag-and-drop (shadcn/ui + react-dropzone)
3. Build JSON parser with Zod validation schema
4. Build Markdown parser using gray-matter + remark
5. Create normalized quiz data type shared across both parsers
6. Add upload preview — show parsed questions before starting quiz

### Phase 2 — Quiz Player & Answer Feedback
7. Build quiz player page with question-by-question navigation
8. Add multiple-choice interaction — user selects one option, then on submit: correct answer highlights green, wrong selection highlights red
9. Add yes/no interaction — two large buttons (Yes / No), same green/red feedback on submit
10. Add open-ended interaction — text area input, on submit: reveal sample answer side-by-side for self-grading (user marks themselves correct or incorrect)
11. Add progress bar and question counter (e.g., "Question 3 of 10")
12. Add optional timer (per-question or total quiz)
13. Build final score page — shows total score (e.g., "7/10 — 70%"), color-coded per-question breakdown (green = correct, red = incorrect), and option to review each answer

### Phase 3 — Database & Persistence
14. Define Drizzle schema for quizzes, questions, attempts, responses
15. Run Supabase migrations
16. Create server actions: saveQuiz, saveAttempt, getQuizBySlug
17. Generate unique share slugs for each uploaded quiz
18. Store quiz data on upload so shareable links work

### Phase 4 — Auth & Dashboard
19. Configure Clerk authentication (sign up / sign in)
20. Build dashboard page — list of user's quizzes
21. Build quiz history — past attempts with scores
22. Add retry functionality (take same quiz again)
23. Add delete quiz functionality

### Phase 5 — Polish & Analytics
24. Add analytics page — score trends over time (chart)
25. Add "most missed questions" breakdown
26. Add Framer Motion transitions between questions
27. Mobile-responsive quiz player
28. Error handling and edge cases (malformed files, empty quizzes)

### Phase 6 — Payments (Optional / Pro)
29. Configure Stripe for Pro tier
30. Free tier: 5 quizzes, 50 questions max
31. Pro tier: unlimited quizzes, analytics, custom branding
32. Add paywall checks in server actions

## Answer Feedback UX

After the user submits an answer for each question:

| Question Type | Correct Behavior | Incorrect Behavior |
| ------------- | ---------------- | ------------------ |
| Multiple-choice | Selected option turns **green** with a checkmark | Selected option turns **red** with an X; correct option highlights **green** |
| Yes/No | Selected button turns **green** with a checkmark | Selected button turns **red** with an X; correct button highlights **green** |
| Open-ended | User sees the sample answer and self-grades via "I got it right" / "I got it wrong" buttons | Same — no auto-grading for free text |

- All question types show the **explanation** text (if provided) after submission
- User must acknowledge the feedback before advancing to the next question (click "Next" button)
- Colors: green = `bg-green-100 border-green-500 text-green-800`, red = `bg-red-100 border-red-500 text-red-800` (Tailwind classes)

### Final Score Page

- Large score display: **"7 / 10"** with percentage and a color-coded ring (green > 70%, yellow 40-70%, red < 40%)
- Per-question list below: each row shows question number, truncated question text, and a green checkmark or red X
- "Review Answers" button expands each question to show the full question, user's answer, and correct answer
- "Retry Quiz" button to take the same quiz again

## Design Principles

- Mobile-first responsive design
- Consistent use of shadcn/ui components
- Server components by default, client components only for interactive quiz elements
- All data mutations through Server Actions
- File parsing happens client-side for instant preview, then validated server-side on save
- Quiz player works without authentication — auth only required for persistence
- Accessible: keyboard navigation for quiz answers, proper ARIA labels

## Out of Scope (v1)

- AI-generated questions from raw text (future feature)
- Real-time multiplayer quizzes
- PDF or DOCX file support
- Quiz editor UI (users edit source files instead)
- Leaderboards or social features
- Email notifications or reminders
- Native mobile app
