# Quiz App - Implementation Plan

## Project Overview

A quiz platform where users can create, take, and share quizzes. The current app is a single HTML file that loads JSON quiz files locally. This plan rebuilds it as a full-stack SaaS with user accounts, persistent quiz storage, a quiz generation pipeline (via Claude API), result history, and a paid tier for premium features.

The core value: take any content (PDF, markdown, text), generate a quiz from it with AI, take it interactively, and track your learning over time.

---

## Technology Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15+ (App Router) | Full-stack React framework |
| Tailwind CSS | 4+ | Utility-first styling |
| Shadcn/ui | Latest | Component library (Radix-based) |
| Framer Motion | 12+ | Animations and transitions |
| Supabase | Latest | Database (Postgres), storage, realtime |
| Clerk | Latest | Authentication and user management |
| Stripe | Latest | Payment processing |
| Vercel | — | Deployment and hosting |

### Development Dependencies
| Tool | Purpose |
|------|---------|
| TypeScript | Type safety |
| ESLint + Prettier | Linting and formatting |
| Zod | Schema validation |
| `@anthropic-ai/sdk` | Quiz generation via Claude API |

### External Services
| Service | Purpose |
|---------|---------|
| Anthropic API | AI-powered quiz generation from content |
| Clerk | Auth (social login, email, session management) |
| Stripe | Subscription billing for premium tier |
| Supabase | Postgres DB + file storage for uploaded content |
| Vercel | Edge deployment, serverless functions |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Vercel (Edge)                     │
│                                                     │
│  ┌──────────────┐  ┌────────────────────────────┐   │
│  │  Next.js App │  │  API Routes (Server)       │   │
│  │  (App Router)│  │  /api/quizzes              │   │
│  │              │  │  /api/generate              │   │
│  │  Pages:      │  │  /api/results              │   │
│  │  / (landing) │  │  /api/webhooks/stripe      │   │
│  │  /dashboard  │  │  /api/webhooks/clerk       │   │
│  │  /quiz/[id]  │  └──────┬─────────────────────┘   │
│  │  /create     │         │                         │
│  │  /results    │         │                         │
│  └──────────────┘         │                         │
└───────────────────────────┼─────────────────────────┘
                            │
           ┌────────────────┼────────────────┐
           │                │                │
     ┌─────▼─────┐  ┌──────▼──────┐  ┌──────▼──────┐
     │  Supabase  │  │   Clerk     │  │   Stripe    │
     │  Postgres  │  │   Auth      │  │   Payments  │
     │  + Storage │  │             │  │             │
     └───────────┘  └─────────────┘  └─────────────┘
```

---

## Feature Inventory (Extracted from Current App)

### F1. Quiz File Upload & Parsing
- Upload a JSON file containing quiz questions
- Validate JSON structure against expected schema
- Support two question types: `multiple-choice` and `open-ended`
- Show expected JSON format as reference (collapsible example)

### F2. Quiz Taking Experience
- Display one question at a time with progress indicator (`Question X of Y`)
- **Multiple-choice**: clickable option cards with visual selection state
- **Open-ended**: text area input with placeholder
- **Submit answer**: validates selection, shows immediate feedback
- **Skip question**: marks as skipped with yellow/golden feedback
- **Next/Previous navigation**: move between questions freely
- Previously answered questions show their result when revisited (locked state)
- Final question shows "See Results" instead of "Next Question"

### F3. Instant Answer Feedback
- After submitting or skipping, show feedback panel with:
  - Correct/Incorrect/Skipped status with color coding (green/red/yellow)
  - The correct answer
  - Explanation text (if provided in quiz data)
  - Source URL as a clickable link (if provided)
- For multiple-choice: open-ended matching is case-insensitive against accepted answers

### F4. Results Page
- **Score display**: `X / Y` with percentage, skip count, incorrect count
- **Question breakdown**: each question shown as a card with status badge (Correct/Incorrect/Skipped)
- **Selectable questions**: checkboxes on each question for selective export
- **Select All / Deselect All** toggle with selection count

### F5. Export Results
- **CSV export**: downloads `quiz_results.csv` with columns: Question, Your Answer, Correct Answer, Result
- **LLM Review (Markdown)**: generates a structured `.md` file designed for LLM review, includes:
  - Date, score, percentage
  - Prompt asking LLM to review mistakes and suggest study topics
  - Detailed per-question breakdown
  - Separate sections for skipped and incorrect questions
- **Anki Cards export**: generates `anki_cards.txt` in semicolon-separated format (`question; answer`)
- All exports respect the checkbox selection (only export selected questions)

### F6. Quiz Retake & Reset
- **Retake Quiz**: resets score and answers, starts same quiz from beginning
- **New Quiz**: full reset, returns to file upload screen

### F7. AI Quiz Generation (from `generate_quiz.py`)
- Accept any content source: PDF, markdown, text files, or raw text
- Two-stage Claude API pipeline:
  1. Generate raw questions from content (configurable count)
  2. Convert to structured JSON using Claude's structured output mode
- Mix of multiple-choice and open-ended questions
- Configurable number of questions and model selection
- Output as JSON file matching the quiz app schema

### F8. Brand Design System
- Custom color palette: ink-black, warm-cream, coral, golden, sage, sky (+ tints)
- Typography: IBM Plex Sans (body) + JetBrains Mono (UI labels, monospace)
- Design tokens via CSS custom properties
- Responsive layout with mobile breakpoints

---

## New Features (Enabled by New Stack)

### F9. User Authentication (Clerk)
- Sign up / Sign in (email, Google, GitHub)
- User profile with avatar
- Protected routes for dashboard, quiz creation, results history

### F10. Persistent Quiz Storage (Supabase)
- Save created quizzes to database
- Browse your quiz library
- Share quizzes via public link (`/quiz/[id]`)
- Track quiz attempt history per user

### F11. Quiz Results History (Supabase)
- Store every quiz attempt with full answer data
- Dashboard showing performance over time
- Filter by quiz, date range, score

### F12. Premium Tier (Stripe)
- Free tier: take quizzes, upload JSON, limited AI generations (e.g., 3/month)
- Pro tier: unlimited AI quiz generation, result analytics, priority support
- Stripe Checkout for subscription
- Webhook handling for subscription lifecycle

---

## Data Architecture

### Database Schema (Supabase / Postgres)

```sql
-- Users are managed by Clerk, synced via webhook
CREATE TABLE users (
    id TEXT PRIMARY KEY,           -- Clerk user ID
    email TEXT NOT NULL,
    name TEXT,
    avatar_url TEXT,
    stripe_customer_id TEXT,
    subscription_status TEXT DEFAULT 'free',  -- free | pro | cancelled
    ai_generations_used INTEGER DEFAULT 0,
    ai_generations_reset_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,       -- Array of question objects
    is_public BOOLEAN DEFAULT FALSE,
    source_type TEXT,               -- 'upload' | 'ai-generated' | 'manual'
    question_count INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    results JSONB NOT NULL,         -- Full answer data per question
    skipped_count INTEGER DEFAULT 0,
    incorrect_count INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Question JSON Schema (stored in `quizzes.questions`)

```json
[
  {
    "type": "multiple-choice",
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": 0,
    "explanation": "string (optional)",
    "sourceUrl": "string (optional)"
  },
  {
    "type": "open-ended",
    "question": "string",
    "acceptedAnswers": ["string"],
    "explanation": "string (optional)"
  }
]
```

---

## Project Structure

```
quiz-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (Clerk provider, fonts, metadata)
│   │   ├── page.tsx                   # Landing page
│   │   ├── sign-in/[[...sign-in]]/
│   │   │   └── page.tsx               # Clerk sign-in page
│   │   ├── sign-up/[[...sign-up]]/
│   │   │   └── page.tsx               # Clerk sign-up page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx             # Authenticated layout
│   │   │   ├── page.tsx               # Quiz library + stats
│   │   │   └── results/
│   │   │       └── page.tsx           # Results history
│   │   ├── quiz/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx           # Take quiz page
│   │   │   └── create/
│   │   │       └── page.tsx           # Create quiz (upload/AI generate)
│   │   └── api/
│   │       ├── quizzes/
│   │       │   ├── route.ts           # GET (list), POST (create)
│   │       │   └── [id]/
│   │       │       └── route.ts       # GET, PUT, DELETE single quiz
│   │       ├── attempts/
│   │       │   └── route.ts           # POST (save attempt), GET (history)
│   │       ├── generate/
│   │       │   └── route.ts           # POST (AI quiz generation)
│   │       ├── export/
│   │       │   └── route.ts           # POST (CSV, Markdown, Anki export)
│   │       └── webhooks/
│   │           ├── clerk/
│   │           │   └── route.ts       # Clerk user sync webhook
│   │           └── stripe/
│   │               └── route.ts       # Stripe subscription webhook
│   ├── components/
│   │   ├── ui/                        # Shadcn components (button, card, input, etc.)
│   │   ├── quiz/
│   │   │   ├── quiz-player.tsx        # Main quiz-taking component (state machine)
│   │   │   ├── question-card.tsx      # Single question display
│   │   │   ├── multiple-choice.tsx    # MC options grid
│   │   │   ├── open-ended-input.tsx   # Text area input
│   │   │   ├── answer-feedback.tsx    # Correct/incorrect/skipped feedback panel
│   │   │   ├── progress-bar.tsx       # Question progress indicator
│   │   │   └── quiz-navigation.tsx    # Prev/Next/Skip/Submit buttons
│   │   ├── results/
│   │   │   ├── results-summary.tsx    # Score display + stats
│   │   │   ├── question-breakdown.tsx # Per-question result cards with checkboxes
│   │   │   ├── export-buttons.tsx     # CSV, Markdown, Anki export
│   │   │   └── select-controls.tsx    # Select all / count
│   │   ├── create/
│   │   │   ├── file-upload.tsx        # JSON file upload with drag-and-drop
│   │   │   ├── ai-generate-form.tsx   # Content input + generate button
│   │   │   └── json-format-guide.tsx  # Collapsible format reference
│   │   ├── dashboard/
│   │   │   ├── quiz-library.tsx       # Grid of user's quizzes
│   │   │   ├── stats-overview.tsx     # Performance summary
│   │   │   └── recent-attempts.tsx    # Recent quiz attempts
│   │   └── layout/
│   │       ├── navbar.tsx             # Top nav with user menu
│   │       └── footer.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts              # Browser Supabase client
│   │   │   ├── server.ts              # Server Supabase client
│   │   │   └── types.ts              # Generated DB types
│   │   ├── stripe.ts                  # Stripe client + helpers
│   │   ├── quiz-generator.ts          # AI generation logic (Claude API)
│   │   ├── export.ts                  # CSV, Markdown, Anki export functions
│   │   ├── validators.ts             # Zod schemas for quiz JSON validation
│   │   └── utils.ts                   # General utilities
│   ├── hooks/
│   │   ├── use-quiz.ts               # Quiz state management hook
│   │   └── use-subscription.ts       # Stripe subscription status hook
│   └── types/
│       └── quiz.ts                    # TypeScript types for quiz data
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql     # Database migration
├── public/
│   └── ...                            # Static assets
├── .env.local.example                 # Required env vars
├── next.config.ts
├── tailwind.config.ts
├── components.json                    # Shadcn config
├── package.json
└── tsconfig.json
```

---

## Implementation Phases

### Phase 0: Project Setup
**Goal**: Initialize project with all tooling configured

**Steps**:
1. `npx create-next-app@latest quiz-app --typescript --tailwind --app --src-dir`
2. Install Shadcn: `npx shadcn@latest init` — add components: button, card, input, textarea, dialog, dropdown-menu, badge, checkbox, toast, tabs, progress
3. Install dependencies: `npm i framer-motion @clerk/nextjs @supabase/supabase-js @supabase/ssr stripe @anthropic-ai/sdk zod`
4. Configure Clerk (middleware, providers, env vars)
5. Configure Supabase project + run initial migration
6. Configure Stripe product + price + webhook endpoint
7. Set up `.env.local` with all keys
8. Deploy empty shell to Vercel to validate config

**Success Criteria**:
- [ ] App builds and runs locally
- [ ] Clerk sign-in/sign-up flow works
- [ ] Supabase connection confirmed
- [ ] Vercel deployment succeeds

---

### Phase 1: Auth & User Sync
**Goal**: Users can sign up, sign in, and have their profile stored in Supabase

**Components**:
- [ ] Root layout with `ClerkProvider`
- [ ] Sign-in and sign-up pages
- [ ] Clerk webhook handler → syncs user to `users` table
- [ ] Middleware protecting `/dashboard/*` routes
- [ ] Navbar with Clerk `<UserButton />`

**Success Criteria**:
- [ ] User signs up → row created in `users` table
- [ ] Protected routes redirect unauthenticated users
- [ ] User avatar and name visible in navbar

---

### Phase 2: Quiz Data Layer
**Goal**: CRUD for quizzes in Supabase

**Components**:
- [ ] Zod schema validation for quiz JSON (`validators.ts`)
- [ ] TypeScript types (`types/quiz.ts`)
- [ ] API route: `POST /api/quizzes` — create quiz from JSON
- [ ] API route: `GET /api/quizzes` — list user's quizzes
- [ ] API route: `GET /api/quizzes/[id]` — fetch single quiz
- [ ] API route: `DELETE /api/quizzes/[id]` — delete quiz
- [ ] Supabase Row Level Security policies

**Success Criteria**:
- [ ] Can create a quiz via API with valid JSON
- [ ] Invalid JSON is rejected with clear error
- [ ] Users can only see their own quizzes
- [ ] Public quizzes accessible without auth

---

### Phase 3: Quiz Creation Page
**Goal**: Users can create quizzes by uploading JSON or pasting content

**Components**:
- [ ] `/quiz/create` page with two tabs: "Upload JSON" and "Generate with AI"
- [ ] `file-upload.tsx` — drag-and-drop JSON file upload with validation
- [ ] `json-format-guide.tsx` — collapsible expected format reference
- [ ] `ai-generate-form.tsx` — textarea for content + question count selector + generate button
- [ ] API route: `POST /api/generate` — calls Claude API two-stage pipeline
- [ ] Loading states with Framer Motion skeleton animations
- [ ] Redirect to `/quiz/[id]` after successful creation

**Success Criteria**:
- [ ] Upload valid JSON → quiz created and stored
- [ ] Upload invalid JSON → clear error message
- [ ] AI generation produces valid quiz from text content
- [ ] Free tier limit enforced on AI generation

---

### Phase 4: Quiz Player (Core Experience)
**Goal**: Full interactive quiz-taking experience

**Components**:
- [ ] `/quiz/[id]` page — loads quiz from Supabase
- [ ] `quiz-player.tsx` — state machine managing quiz flow
- [ ] `question-card.tsx` with Framer Motion page transitions
- [ ] `multiple-choice.tsx` — option cards in grid, click to select, visual highlight
- [ ] `open-ended-input.tsx` — textarea with label
- [ ] `answer-feedback.tsx` — correct/incorrect/skipped panel with explanation + source link
- [ ] `quiz-navigation.tsx` — Previous, Submit, Skip, Next buttons
- [ ] `progress-bar.tsx` — "Question X of Y"
- [ ] Previously answered questions show locked state with their result
- [ ] Last question shows "See Results" button

**Animations** (Framer Motion):
- Question slide-in/slide-out transitions
- Option selection scale/highlight animation
- Feedback panel expand animation
- Score reveal animation on results page

**Success Criteria**:
- [ ] Can take a full quiz start to finish
- [ ] Can navigate forward and backward
- [ ] Can skip questions
- [ ] Feedback shows immediately after submit/skip
- [ ] Revisiting answered questions shows locked state

---

### Phase 5: Results Page & Export
**Goal**: Show results with export options

**Components**:
- [ ] `results-summary.tsx` — big score display with percentage, skip/incorrect counts
- [ ] `question-breakdown.tsx` — per-question cards with status badges (Correct/Incorrect/Skipped)
- [ ] `select-controls.tsx` — select all checkbox + count
- [ ] `export-buttons.tsx` — CSV, LLM Review (Markdown), Anki Cards
- [ ] Retake Quiz button — resets state, same questions
- [ ] New Quiz button — redirects to `/quiz/create`
- [ ] API route: `POST /api/attempts` — saves attempt to database
- [ ] Export logic in `lib/export.ts` (runs client-side, downloads files)

**Export formats** (matching current app exactly):
- **CSV**: `Question, Your Answer, Correct Answer, Result` columns
- **LLM Review Markdown**: date, score, prompt for LLM review, per-question breakdown, skipped/incorrect summaries
- **Anki Cards**: semicolon-separated `question; answer` format

**Success Criteria**:
- [ ] Score displays correctly with stats
- [ ] Checkbox selection filters exports
- [ ] All 3 export formats download correctly
- [ ] Attempt saved to database after completing quiz

---

### Phase 6: Dashboard
**Goal**: User's home base — quiz library and performance stats

**Components**:
- [ ] `/dashboard` page
- [ ] `quiz-library.tsx` — grid of quiz cards (title, question count, date, take/edit/delete actions)
- [ ] `stats-overview.tsx` — total quizzes taken, average score, streak
- [ ] `recent-attempts.tsx` — list of recent attempts with scores
- [ ] `/dashboard/results` page — full attempt history with filters

**Success Criteria**:
- [ ] User sees all their quizzes
- [ ] Can take a quiz from the library
- [ ] Can delete a quiz
- [ ] Stats update after completing a quiz

---

### Phase 7: Stripe Payments
**Goal**: Premium tier with AI generation limits

**Components**:
- [ ] Stripe product + price configured (monthly subscription)
- [ ] Upgrade button on dashboard → Stripe Checkout
- [ ] Webhook handler: `checkout.session.completed` → update user subscription status
- [ ] Webhook handler: `customer.subscription.deleted` → downgrade to free
- [ ] `use-subscription.ts` hook — checks user's plan
- [ ] Gate AI generation behind plan check (free: 3/month, pro: unlimited)
- [ ] Monthly reset of `ai_generations_used` counter

**Success Criteria**:
- [ ] Free user hits generation limit → shown upgrade prompt
- [ ] Payment flow completes → user upgraded to pro
- [ ] Cancellation → user downgraded
- [ ] Generation counter resets monthly

---

### Phase 8: Landing Page & Polish
**Goal**: Public landing page + production readiness

**Components**:
- [ ] Landing page with hero, feature highlights, pricing section, CTA
- [ ] Framer Motion scroll animations on landing page
- [ ] SEO metadata (Next.js `generateMetadata`)
- [ ] Error boundaries and loading states
- [ ] Toast notifications for actions (quiz created, export downloaded, etc.)
- [ ] Mobile responsive refinements
- [ ] Favicon and Open Graph images

**Success Criteria**:
- [ ] Landing page loads fast and looks polished
- [ ] All pages responsive on mobile
- [ ] No unhandled errors in production
- [ ] OG images render correctly when shared

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk frontend auth |
| `CLERK_SECRET_KEY` | Yes | Clerk backend auth |
| `CLERK_WEBHOOK_SECRET` | Yes | Verify Clerk webhooks |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase admin operations |
| `ANTHROPIC_API_KEY` | Yes | Claude API for quiz generation |
| `STRIPE_SECRET_KEY` | Yes | Stripe backend |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe frontend |
| `STRIPE_WEBHOOK_SECRET` | Yes | Verify Stripe webhooks |
| `NEXT_PUBLIC_APP_URL` | Yes | Base URL for callbacks |

---

## Deployment (Vercel)

```bash
# Build
npm run build

# Environment
# Set all env vars in Vercel dashboard

# Webhooks
# Clerk: https://your-domain.vercel.app/api/webhooks/clerk
# Stripe: https://your-domain.vercel.app/api/webhooks/stripe
```

---

## Key Design Decisions

1. **Quiz state lives in a React hook, not a state library** — the quiz player is self-contained; `useQuiz()` manages current question, answers, score, and navigation. No Redux/Zustand needed.

2. **Questions stored as JSONB in Postgres** — avoids a separate `questions` table with complex joins. Quiz data is always loaded as a unit.

3. **AI generation is server-side only** — the Anthropic API key never touches the client. The two-stage pipeline (generate → structure) runs in a Next.js API route.

4. **Exports run client-side** — CSV, Markdown, and Anki exports are generated in the browser from the results state. No API call needed, instant download.

5. **Clerk webhooks sync users to Supabase** — Clerk manages auth; Supabase manages app data. The webhook keeps them in sync so RLS policies can use `user_id`.