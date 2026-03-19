# Quiz App — Implementation Progress

## Phase 0: Project Setup ✅

**Goal**: Initialize project with all tooling configured

**Completed**:
- [x] Created Next.js 16 app with TypeScript, Tailwind CSS 4, App Router, `src/` directory
- [x] Installed Shadcn/ui with components: button, card, input, textarea, dialog, dropdown-menu, badge, checkbox, sonner (toast replacement), tabs, progress, separator, avatar
- [x] Installed all dependencies: framer-motion, @clerk/nextjs, @supabase/supabase-js, @supabase/ssr, stripe, @anthropic-ai/sdk, zod, svix
- [x] Created `.env.local.example` with all required environment variables
- [x] App builds and runs locally (`npm run build` passes)

**Notes**:
- Next.js 16 renamed `middleware.ts` → `proxy.ts` (breaking change)
- Clerk Core 3 replaced `SignedIn`/`SignedOut` with unified `<Show when="signed-in">` component
- Clerk `UserButton` removed `afterSignOutUrl` prop
- Shadcn replaced `toast` component with `sonner`

---

## Phase 1: Auth & User Sync ✅

**Goal**: Users can sign up, sign in, and have their profile stored in Supabase

**Completed**:
- [x] Root layout with `ClerkProvider` wrapping the entire app
- [x] Sign-in page at `/sign-in/[[...sign-in]]` using Clerk's `<SignIn />` component
- [x] Sign-up page at `/sign-up/[[...sign-up]]` using Clerk's `<SignUp />` component
- [x] Clerk proxy (`src/proxy.ts`) protecting `/dashboard/*` and `/quiz/create/*` routes
- [x] Navbar with Clerk `<UserButton />`, conditional signed-in/signed-out navigation using `<Show>`
- [x] Clerk webhook handler at `/api/webhooks/clerk` — syncs user.created, user.updated, user.deleted events to Supabase `users` table via svix signature verification
- [x] Supabase browser client (`src/lib/supabase/client.ts`)
- [x] Supabase server client with cookie handling (`src/lib/supabase/server.ts`)
- [x] Supabase service role client for webhook operations
- [x] Initial database migration SQL (`supabase/migrations/001_initial_schema.sql`) with:
  - `users`, `quizzes`, `quiz_attempts` tables
  - Indexes for common queries
  - Row Level Security policies
- [x] TypeScript types for Quiz, Question, QuizAttempt, User (`src/types/quiz.ts`)
- [x] Dashboard page with stats cards and empty state
- [x] Landing page with hero section and auth-conditional CTAs
- [x] Footer component

**Success Criteria**:
- [x] App builds without errors
- [x] Protected routes configured via proxy middleware
- [x] Webhook handler validates signatures and upserts users
- [x] Database schema ready for deployment

---

## File Structure (Phase 0 + 1)

```
quiz-app/
├── .env.local.example
├── components.json
├── package.json
├── progress.md
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
└── src/
    ├── proxy.ts                          # Clerk middleware (Next.js 16 proxy)
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx                    # Root layout with ClerkProvider
    │   ├── page.tsx                      # Landing page
    │   ├── sign-in/[[...sign-in]]/
    │   │   └── page.tsx
    │   ├── sign-up/[[...sign-up]]/
    │   │   └── page.tsx
    │   ├── dashboard/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   └── api/
    │       └── webhooks/
    │           └── clerk/
    │               └── route.ts          # User sync webhook
    ├── components/
    │   ├── layout/
    │   │   ├── navbar.tsx
    │   │   └── footer.tsx
    │   └── ui/                           # Shadcn components
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── checkbox.tsx
    │       ├── dialog.tsx
    │       ├── dropdown-menu.tsx
    │       ├── input.tsx
    │       ├── progress.tsx
    │       ├── separator.tsx
    │       ├── sonner.tsx
    │       ├── tabs.tsx
    │       └── textarea.tsx
    ├── lib/
    │   ├── utils.ts
    │   └── supabase/
    │       ├── client.ts                 # Browser client
    │       └── server.ts                 # Server + service role clients
    └── types/
        └── quiz.ts                       # TypeScript types
```

---

## Phase 2: Quiz Data Layer ✅

**Goal**: CRUD for quizzes in Supabase

**Completed**:
- [x] Zod schema validation for quiz JSON (`src/lib/validators.ts`):
  - `multipleChoiceQuestionSchema` — validates MC questions with options, correctAnswer index, optional explanation/sourceUrl
  - `openEndedQuestionSchema` — validates open-ended questions with acceptedAnswers array
  - `questionSchema` — discriminated union on `type` field
  - `createQuizSchema` — full quiz creation input with title, description, questions, isPublic, sourceType
  - `quizQuestionsSchema` — standalone array validator for question arrays
  - Exported `CreateQuizInput` type inferred from schema
- [x] API route: `POST /api/quizzes` — creates a quiz from validated JSON
  - Clerk auth required (returns 401 if unauthenticated)
  - Validates request body against `createQuizSchema` (returns 400 with Zod issue details on invalid input)
  - Inserts into Supabase `quizzes` table via service role client
  - Returns created quiz row with 201 status
- [x] API route: `GET /api/quizzes` — lists the authenticated user's quizzes
  - Clerk auth required
  - Returns quizzes ordered by `created_at` descending
- [x] API route: `GET /api/quizzes/[id]` — fetches a single quiz
  - Public quizzes accessible without auth
  - Private quizzes require auth + ownership check
  - Returns 404 for non-existent or unauthorized access
- [x] API route: `DELETE /api/quizzes/[id]` — deletes a quiz
  - Clerk auth required + ownership check
  - Returns 403 if user doesn't own the quiz
  - Returns `{ success: true }` on deletion
- [x] RLS policies already configured in Phase 1 migration (service role client bypasses RLS; auth enforced at API layer via Clerk)

**Design Decisions**:
- Uses Supabase service role client (bypasses RLS) since auth is handled by Clerk, not Supabase Auth
- Zod validation at the API boundary ensures only well-formed quiz data enters the database
- `RouteContext` helper type from Next.js 16 used for typed dynamic route params

**Success Criteria**:
- [x] Can create a quiz via API with valid JSON
- [x] Invalid JSON is rejected with clear Zod error details
- [x] Users can only see/modify their own quizzes (enforced at API layer)
- [x] Public quizzes accessible without auth
- [x] App builds without errors (`npm run build` passes)

---

## File Structure (Phase 0 + 1 + 2)

```
quiz-app/
├── .env.local.example
├── components.json
├── package.json
├── progress.md
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
└── src/
    ├── proxy.ts                          # Clerk middleware (Next.js 16 proxy)
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx                    # Root layout with ClerkProvider
    │   ├── page.tsx                      # Landing page
    │   ├── sign-in/[[...sign-in]]/
    │   │   └── page.tsx
    │   ├── sign-up/[[...sign-up]]/
    │   │   └── page.tsx
    │   ├── dashboard/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   └── api/
    │       ├── quizzes/
    │       │   ├── route.ts              # POST (create), GET (list)
    │       │   └── [id]/
    │       │       └── route.ts          # GET (single), DELETE
    │       └── webhooks/
    │           └── clerk/
    │               └── route.ts          # User sync webhook
    ├── components/
    │   ├── layout/
    │   │   ├── navbar.tsx
    │   │   └── footer.tsx
    │   └── ui/                           # Shadcn components
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── checkbox.tsx
    │       ├── dialog.tsx
    │       ├── dropdown-menu.tsx
    │       ├── input.tsx
    │       ├── progress.tsx
    │       ├── separator.tsx
    │       ├── sonner.tsx
    │       ├── tabs.tsx
    │       └── textarea.tsx
    ├── lib/
    │   ├── utils.ts
    │   ├── validators.ts                 # Zod schemas for quiz validation
    │   └── supabase/
    │       ├── client.ts                 # Browser client
    │       └── server.ts                 # Server + service role clients
    └── types/
        └── quiz.ts                       # TypeScript types
```

---

## Phase 3: Quiz Creation Page ✅

**Goal**: Users can create quizzes by uploading JSON or pasting content for AI generation

**Completed**:
- [x] `/quiz/create` page with two tabs: "Upload JSON" and "Generate with AI"
- [x] `file-upload.tsx` — drag-and-drop JSON file upload with client-side Zod validation
  - Drag-over visual state, validation spinner, success/error states with Framer Motion transitions
  - Accepts `.json` files, validates against `quizQuestionsSchema`, supports both raw arrays and `{ questions: [...] }` wrapper
  - Shows question count on successful validation, then "Create Quiz" button calls `POST /api/quizzes`
- [x] `json-format-guide.tsx` — collapsible expected format reference
  - Animated expand/collapse with Framer Motion
  - Example JSON for both `multiple-choice` and `open-ended` question types
- [x] `ai-generate-form.tsx` — textarea for content + title input + question count selector (1–30) + generate button
  - Inline validation: title required, content minimum 20 characters
  - Loading state with spinner, error display panel
- [x] `lib/quiz-generator.ts` — Claude API two-stage pipeline
  - Single prompt to Claude (claude-sonnet-4-20250514) that generates structured quiz JSON directly
  - Strips markdown code fences if present, parses JSON, validates against `quizQuestionsSchema`
  - Typed return as `Question[]`
- [x] API route: `POST /api/generate` — authenticated AI quiz generation endpoint
  - Zod validation of input (title, content ≥20 chars, questionCount 1–30)
  - Free tier limit enforcement: 3 AI generations/month, monthly reset
  - Checks user's `subscription_status`, `ai_generations_used`, `ai_generations_reset_at`
  - Creates quiz in Supabase on success, increments generation counter
  - Returns 403 with upgrade message when limit reached
- [x] Framer Motion animations: page entry, tab content transitions, upload state transitions
- [x] Redirect to `/quiz/[id]` after successful creation (both upload and AI generation)
- [x] Toast notifications via Sonner for success/error feedback

**Design Decisions**:
- File upload validation runs entirely client-side (Zod `quizQuestionsSchema`) for instant feedback — only calls the API after validation passes
- AI generation uses `createServiceClient()` (service role) since auth is handled by Clerk at the API layer
- Free tier limit (3/month) tracked in `users` table fields; monthly reset checked on each generation request
- base-ui Tabs use numeric `value` props (0, 1) for tab/panel matching

**Success Criteria**:
- [x] Upload valid JSON → quiz created and stored
- [x] Upload invalid JSON → clear error message with Zod issue details
- [x] AI generation produces valid quiz from text content
- [x] Free tier limit enforced on AI generation
- [x] App builds without errors (`npm run build` passes)

---

## File Structure (Phase 0 + 1 + 2 + 3)

```
quiz-app/
├── .env.local.example
├── components.json
├── package.json
├── progress.md
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
└── src/
    ├── proxy.ts                          # Clerk middleware (Next.js 16 proxy)
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx                    # Root layout with ClerkProvider
    │   ├── page.tsx                      # Landing page
    │   ├── sign-in/[[...sign-in]]/
    │   │   └── page.tsx
    │   ├── sign-up/[[...sign-up]]/
    │   │   └── page.tsx
    │   ├── dashboard/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── quiz/
    │   │   └── create/
    │   │       └── page.tsx              # Two-tab quiz creation (Upload / AI)
    │   └── api/
    │       ├── generate/
    │       │   └── route.ts              # POST — AI quiz generation
    │       ├── quizzes/
    │       │   ├── route.ts              # POST (create), GET (list)
    │       │   └── [id]/
    │       │       └── route.ts          # GET (single), DELETE
    │       └── webhooks/
    │           └── clerk/
    │               └── route.ts          # User sync webhook
    ├── components/
    │   ├── create/
    │   │   ├── file-upload.tsx           # Drag-and-drop JSON upload
    │   │   ├── json-format-guide.tsx     # Collapsible format reference
    │   │   └── ai-generate-form.tsx      # AI generation form
    │   ├── layout/
    │   │   ├── navbar.tsx
    │   │   └── footer.tsx
    │   └── ui/                           # Shadcn components
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── checkbox.tsx
    │       ├── dialog.tsx
    │       ├── dropdown-menu.tsx
    │       ├── input.tsx
    │       ├── progress.tsx
    │       ├── separator.tsx
    │       ├── sonner.tsx
    │       ├── tabs.tsx
    │       └── textarea.tsx
    ├── lib/
    │   ├── utils.ts
    │   ├── validators.ts                 # Zod schemas for quiz validation
    │   ├── quiz-generator.ts             # Claude API quiz generation logic
    │   └── supabase/
    │       ├── client.ts                 # Browser client
    │       └── server.ts                 # Server + service role clients
    └── types/
        └── quiz.ts                       # TypeScript types
```

---

## Next Up: Phase 4 — Quiz Player (Core Experience)

- `/quiz/[id]` page — loads quiz from Supabase
- `quiz-player.tsx` — state machine managing quiz flow
- `question-card.tsx`, `multiple-choice.tsx`, `open-ended-input.tsx`
- `answer-feedback.tsx` — correct/incorrect/skipped panel
- `quiz-navigation.tsx` — Previous, Submit, Skip, Next buttons
- `progress-bar.tsx` — "Question X of Y"
- Framer Motion transitions between questions
