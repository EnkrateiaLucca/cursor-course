# AI Quiz App - Product Requirements Document

## Overview

An intelligent quiz application that allows students to upload study materials (PDFs, images, text), generate AI-powered quizzes, practice with those quizzes, and track their performance over time. Built with a lightweight architecture that processes and extracts content from uploads without permanent file storage.

### Target Users

- Students preparing for exams who need targeted practice questions
- Learners who want AI-generated quizzes based on their specific study materials
- Teachers/instructors who want to create custom quizzes from their course content
- Anyone looking to test and track their knowledge retention

---

## Core Features

### 1. User Authentication

- **Sign Up / Sign In**: Email/password authentication via Clerk
- **Session Management**: Persistent sessions across devices
- **Protected Routes**: All quiz operations require authentication
- **User Profile**: Display user avatar/name in header with sign-out option

### 2. Material Upload & Processing

#### Upload Interface

- Drag-and-drop file upload zone
- Support multiple file types:
  - PDFs (extract text via pdf-parse or similar)
  - Images (OCR via Tesseract.js or Cloud Vision API)
  - Plain text files (.txt, .md)
  - DOCX files (extract text via mammoth)
- Multiple file upload support (batch processing)
- File size limits (e.g., 10MB per file, 50MB total per upload)
- Progress indicators during upload and processing

#### Content Extraction Pipeline

```
User uploads file → Frontend sends to API
                  → API stores temporarily in memory/tmp
                  → Extract text content
                  → Store extracted text in database
                  → Delete original file immediately
                  → Return material metadata to frontend
```

#### Material Management

- View list of uploaded materials (title, upload date, word count)
- Preview extracted text content
- Edit material title/description
- Delete materials (removes associated questions if not used in quizzes)
- Material status indicator (processing, ready, failed)

### 3. AI Quiz Generation

#### Generation Interface

- Select one or multiple materials as source
- Configure quiz parameters:
  - Number of questions (5, 10, 15, 20, 30)
  - Question types (Multiple Choice, True/False, Short Answer)
  - Difficulty level (Easy, Medium, Hard, Mixed)
  - Topic focus (optional - specific concepts to emphasize)
- "Generate Quiz" button with loading state
- Preview generated questions before saving

#### AI Integration

- Use Claude API (Anthropic) for question generation: 
  - [https://platform.claude.com/docs/en/home](https://platform.claude.com/docs/en/home)
  - the model to use is the new claude sonnet 4.5: `claude-sonnet-4-5`
    - [https://platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- Structured prompt engineering for consistent output format
- Parse AI response into structured question objects
- Validate generated questions (ensure all fields present)
- Retry mechanism for failed generations

#### Question Format

- **Multiple Choice**: Question + 4 options + correct answer + explanation
- **True/False**: Statement + correct answer + explanation
- **Short Answer**: Question + model answer + grading criteria

### 4. Quiz Taking Experience

#### Quiz Interface

- Clean, distraction-free quiz view
- Question counter (e.g., "Question 5 of 10")
- Progress bar
- Timer (optional - can be enabled per quiz)
- Navigation: Previous/Next buttons
- Flag questions for review
- Submit quiz with confirmation dialog

#### Question Display

- Large, readable question text
- For Multiple Choice: Radio buttons with clear labels
- For True/False: Large True/False buttons
- For Short Answer: Text area for response
- "Explain Answer" toggle (shows explanation after answering)

#### Quiz Submission

- Review screen showing flagged questions
- Confirmation before final submission
- Immediate scoring for objective questions
- Manual review needed indicator for short answers

### 5. Results & Performance Tracking

#### Quiz Results View

- Overall score percentage
- Questions correct/incorrect breakdown
- Time taken to complete
- Review each question with:
  - Your answer
  - Correct answer
  - Explanation
  - Mark correct/incorrect
- Option to retake quiz

#### Performance Dashboard

- Overall statistics:
  - Total quizzes taken
  - Average score
  - Total questions answered
  - Accuracy rate by question type
- Recent quiz history (list with scores and dates)
- Performance trends chart (scores over time)
- Subject/material breakdown (which materials have best/worst performance)
- Weak areas identification (topics with low scores)

#### Progress Tracking

- Quiz attempts linked to specific materials
- Track improvement over time per material
- Identify knowledge gaps
- Suggest materials to review based on performance

### 6. Question Bank & Custom Quizzes

#### Question Bank View

- Browse all generated questions across all materials
- Filter by:
  - Source material
  - Question type
  - Difficulty level
  - Topics/tags
  - Never/rarely practiced questions
- Search questions by keyword
- Preview question with answer and explanation

#### Custom Quiz Builder

- Select questions manually from question bank
- Drag and drop to reorder questions
- Mix questions from different materials
- Save custom quiz with name and description
- Share custom quiz (future feature)

#### Smart Quiz Suggestions

- "Practice Weak Areas" - auto-generates quiz from lowest-scoring topics
- "Review Recent Material" - quiz from recently uploaded content
- "Random Challenge" - mixed difficulty and topics

---

## Technical Architecture

### Frontend Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React useState/useEffect + Context API for quiz state
- **Authentication UI**: Clerk React components
- **File Upload**: react-dropzone
- **Charts**: Recharts or Chart.js for performance graphs
- **Rich Text**: Markdown rendering for explanations (react-markdown)

### Backend Stack

- **API Layer**: Next.js API Routes (server-side)
- **Authentication**: Clerk (server-side validation)
- **Database**: Supabase (PostgreSQL)
- **File Processing**: Server-side in API routes (no permanent storage)
- **AI Integration**: Anthropic Claude API or OpenAI API
- **Deployment**: Vercel

### Architecture Pattern: Server-Side API with Ephemeral File Processing

**Why This Approach:**

- Security: File processing happens server-side, never exposes API keys
- Cost-effective: No permanent file storage costs
- Privacy: User files not retained after content extraction
- Scalability: Stateless API design, easy to scale
- Flexibility: Easy to swap AI providers or add new processing methods

**Data Flow - Material Upload:**

```
User uploads file → Frontend (React)
                  → API Route /api/materials/upload
                  → Temporarily store in memory or /tmp
                  → Extract text content (PDF/image/doc parsing)
                  → Save extracted text to Supabase (materials table)
                  → Delete original file
                  → Return material metadata
                  → Frontend displays material
```

**Data Flow - Quiz Generation:**

```
User requests quiz → Frontend (React)
                   → API Route /api/quizzes/generate
                   → Fetch material content from Supabase
                   → Send to Claude/GPT API with structured prompt
                   → Parse AI response into questions
                   → Save questions to Supabase
                   → Create quiz record linking questions
                   → Return quiz with questions
                   → Frontend displays quiz interface
```

**Data Flow - Quiz Taking:**

```
User takes quiz → Frontend tracks answers locally
                → User submits quiz
                → API Route /api/quizzes/[id]/submit
                → Grade objective questions
                → Save attempt with answers and score
                → Return results
                → Frontend displays results dashboard
```

---

## Database Schema

### Materials Table

Stores extracted text content from uploaded files (not the files themselves).

```sql
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL, -- Extracted text content
  word_count INTEGER,
  source_type TEXT NOT NULL, -- 'pdf', 'image', 'text', 'docx'
  status TEXT DEFAULT 'ready', -- 'processing', 'ready', 'failed'
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_materials_user_id ON materials(user_id);
CREATE INDEX idx_materials_created_at ON materials(created_at DESC);
```

### Questions Table

Stores all generated questions from AI.

```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  material_id UUID REFERENCES materials(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL, -- 'multiple_choice', 'true_false', 'short_answer'
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  options JSONB, -- For multiple choice: ["option1", "option2", "option3", "option4"]
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  topic TEXT, -- Optional topic/category tag
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_material_id ON questions(material_id);
CREATE INDEX idx_questions_question_type ON questions(question_type);
```

### Quizzes Table

Represents a collection of questions (generated or custom).

```sql
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  quiz_type TEXT NOT NULL, -- 'generated', 'custom', 'smart'
  is_timed BOOLEAN DEFAULT false,
  time_limit_minutes INTEGER, -- NULL if not timed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quizzes_user_id ON quizzes(user_id);
```

### Quiz_Questions Table

Junction table linking quizzes to questions with ordering.

```sql
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  UNIQUE(quiz_id, question_id)
);

CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
```

### Quiz_Attempts Table

Stores each attempt at taking a quiz.

```sql
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  score DECIMAL(5,2), -- Percentage score
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  time_taken_seconds INTEGER,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX idx_quiz_attempts_created_at ON quiz_attempts(created_at DESC);
```

### Quiz_Answers Table

Stores individual answers for each question in an attempt.

```sql
CREATE TABLE quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  user_answer TEXT,
  is_correct BOOLEAN,
  time_taken_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_answers_attempt_id ON quiz_answers(attempt_id);
```

**Security Approach:**

- Row Level Security (RLS) disabled
- Security enforced in API routes via Clerk authentication
- All queries filter by authenticated user's ID
- Ownership verification on all operations
- Prevent access to other users' materials, questions, and quiz data

---

## API Endpoints

### POST /api/materials/upload

**Purpose**: Upload and process a file to extract content

**Authentication**: Required (Clerk session)

**Request**: FormData with file

**Process**:

1. Receive file upload
2. Validate file type and size
3. Extract text content based on file type
4. Save content to database
5. Delete temporary file
6. Return material metadata

**Response**:

```json
{
  "material": {
    "id": "uuid",
    "user_id": "user_xxxxx",
    "title": "Chapter 5 Notes",
    "content": "Extracted text content...",
    "word_count": 1500,
    "source_type": "pdf",
    "status": "ready",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

**Error Codes**:

- 400: Bad request (invalid file type, too large)
- 401: Unauthorized
- 500: Server error (processing failed)

---

### GET /api/materials

**Purpose**: Fetch all materials for authenticated user

**Authentication**: Required (Clerk session)

**Query Parameters**:

- `sort`: 'recent' | 'oldest' | 'title' (default: 'recent')
- `limit`: number (default: 50)
- `offset`: number (default: 0)

**Response**:

```json
{
  "materials": [
    {
      "id": "uuid",
      "title": "Chapter 5 Notes",
      "description": "Key concepts from chapter 5",
      "word_count": 1500,
      "source_type": "pdf",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "total": 10
}
```

---

### GET /api/materials/[id]

**Purpose**: Fetch a specific material with content

**Authentication**: Required (Clerk session)

**Ownership Check**: Verifies material belongs to authenticated user

**Response**:

```json
{
  "material": {
    "id": "uuid",
    "user_id": "user_xxxxx",
    "title": "Chapter 5 Notes",
    "content": "Full extracted text content...",
    "word_count": 1500,
    "source_type": "pdf",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### DELETE /api/materials/[id]

**Purpose**: Delete a material and its associated questions (if not used in completed quizzes)

**Authentication**: Required (Clerk session)

**Ownership Check**: Verifies material belongs to authenticated user

**Response**:

```json
{
  "success": true,
  "deletedQuestions": 15
}
```

---

### POST /api/quizzes/generate

**Purpose**: Generate AI quiz from selected materials

**Authentication**: Required (Clerk session)

**Request Body**:

```json
{
  "materialIds": ["uuid1", "uuid2"],
  "questionCount": 10,
  "questionTypes": ["multiple_choice", "true_false"],
  "difficulty": "medium",
  "topicFocus": "photosynthesis" // optional
}
```

**Process**:

1. Fetch content from specified materials
2. Construct AI prompt with parameters
3. Call Claude/GPT API
4. Parse response into structured questions
5. Save questions to database
6. Create quiz record
7. Link questions to quiz
8. Return quiz with questions

**Response**:

```json
{
  "quiz": {
    "id": "uuid",
    "title": "Generated Quiz - Chapter 5",
    "questionCount": 10,
    "created_at": "2025-01-01T00:00:00Z"
  },
  "questions": [
    {
      "id": "uuid",
      "question_text": "What is photosynthesis?",
      "question_type": "multiple_choice",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Option A",
      "explanation": "Photosynthesis is...",
      "difficulty": "medium"
    }
  ]
}
```

**Error Codes**:

- 400: Bad request (invalid parameters)
- 401: Unauthorized
- 429: Rate limit exceeded (AI API)
- 500: Server error (AI generation failed)

---

### GET /api/quizzes

**Purpose**: Fetch all quizzes for authenticated user

**Authentication**: Required (Clerk session)

**Query Parameters**:

- `sort`: 'recent' | 'oldest' | 'title'
- `type`: 'generated' | 'custom' | 'smart' | 'all'

**Response**:

```json
{
  "quizzes": [
    {
      "id": "uuid",
      "title": "Chapter 5 Quiz",
      "question_count": 10,
      "quiz_type": "generated",
      "created_at": "2025-01-01T00:00:00Z",
      "last_attempt": {
        "score": 85.5,
        "completed_at": "2025-01-02T00:00:00Z"
      }
    }
  ]
}
```

---

### GET /api/quizzes/[id]

**Purpose**: Fetch a specific quiz with questions

**Authentication**: Required (Clerk session)

**Ownership Check**: Verifies quiz belongs to authenticated user

**Response**:

```json
{
  "quiz": {
    "id": "uuid",
    "title": "Chapter 5 Quiz",
    "description": "Test your knowledge",
    "is_timed": false,
    "created_at": "2025-01-01T00:00:00Z"
  },
  "questions": [
    {
      "id": "uuid",
      "question_text": "What is photosynthesis?",
      "question_type": "multiple_choice",
      "options": ["A", "B", "C", "D"],
      "order_index": 0
    }
  ]
}
```

---

### POST /api/quizzes/[id]/start

**Purpose**: Start a quiz attempt (creates attempt record)

**Authentication**: Required (Clerk session)

**Response**:

```json
{
  "attempt": {
    "id": "uuid",
    "quiz_id": "uuid",
    "started_at": "2025-01-01T10:00:00Z"
  }
}
```

---

### POST /api/quizzes/[id]/submit

**Purpose**: Submit quiz answers and calculate score

**Authentication**: Required (Clerk session)

**Request Body**:

```json
{
  "attemptId": "uuid",
  "answers": [
    {
      "questionId": "uuid",
      "userAnswer": "Option A",
      "timeTaken": 30
    }
  ],
  "totalTime": 300
}
```

**Process**:

1. Validate attempt belongs to user
2. Grade each answer
3. Calculate overall score
4. Save quiz_answers records
5. Update quiz_attempts with score and completion time
6. Return results with correct answers and explanations

**Response**:

```json
{
  "attempt": {
    "id": "uuid",
    "score": 85.0,
    "correct_answers": 17,
    "total_questions": 20,
    "time_taken_seconds": 300,
    "completed_at": "2025-01-01T10:05:00Z"
  },
  "results": [
    {
      "questionId": "uuid",
      "question_text": "What is photosynthesis?",
      "user_answer": "Option A",
      "correct_answer": "Option A",
      "is_correct": true,
      "explanation": "..."
    }
  ]
}
```

---

### GET /api/stats

**Purpose**: Fetch performance statistics for authenticated user

**Authentication**: Required (Clerk session)

**Response**:

```json
{
  "overall": {
    "totalQuizzes": 25,
    "averageScore": 78.5,
    "totalQuestions": 500,
    "accuracyRate": 0.785,
    "totalTimeSpent": 7200
  },
  "byType": {
    "multiple_choice": { "accuracy": 0.82, "total": 350 },
    "true_false": { "accuracy": 0.88, "total": 100 },
    "short_answer": { "accuracy": 0.65, "total": 50 }
  },
  "recentAttempts": [
    {
      "quiz_title": "Chapter 5 Quiz",
      "score": 85.0,
      "completed_at": "2025-01-01T00:00:00Z"
    }
  ],
  "weakAreas": [
    {
      "topic": "Cellular Respiration",
      "accuracy": 0.55,
      "questionCount": 20
    }
  ]
}
```

---

### GET /api/questions

**Purpose**: Fetch all questions for question bank (with filtering)

**Authentication**: Required (Clerk session)

**Query Parameters**:

- `materialId`: UUID (filter by material)
- `questionType`: string (filter by type)
- `difficulty`: string (filter by difficulty)
- `search`: string (search in question text)
- `limit`: number
- `offset`: number

**Response**:

```json
{
  "questions": [
    {
      "id": "uuid",
      "question_text": "What is photosynthesis?",
      "question_type": "multiple_choice",
      "difficulty": "medium",
      "material": {
        "id": "uuid",
        "title": "Chapter 5 Notes"
      },
      "stats": {
        "timesAnswered": 5,
        "timesCorrect": 4,
        "accuracy": 0.80
      }
    }
  ],
  "total": 150
}
```

---

### POST /api/quizzes/custom

**Purpose**: Create a custom quiz from selected questions

**Authentication**: Required (Clerk session)

**Request Body**:

```json
{
  "title": "My Custom Quiz",
  "description": "Mixed topics quiz",
  "questionIds": ["uuid1", "uuid2", "uuid3"],
  "isTimed": true,
  "timeLimitMinutes": 30
}
```

**Response**:

```json
{
  "quiz": {
    "id": "uuid",
    "title": "My Custom Quiz",
    "question_count": 10,
    "quiz_type": "custom",
    "is_timed": true,
    "time_limit_minutes": 30,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

## AI Integration Details

### AI Provider Options

1. **Anthropic Claude** (Recommended)
  - Claude 3.5 Sonnet for balanced speed/quality
  - Claude 3 Opus for highest quality (slower, more expensive)
  - Better at following structured output instructions
  - Good at generating explanations
2. **OpenAI GPT**
  - GPT-4 Turbo for quality
  - GPT-3.5 Turbo for speed/cost
  - JSON mode for structured output

### Prompt Engineering Strategy

**System Prompt Template**:

```
You are an expert educational content creator. Generate quiz questions based on the provided study material.

Requirements:
- Create {count} questions
- Question types: {types}
- Difficulty level: {difficulty}
{topicFocus ? `- Focus on: ${topicFocus}` : ''}

For each question, provide:
1. question_text: The question itself
2. question_type: multiple_choice, true_false, or short_answer
3. options: Array of 4 options (for multiple choice only)
4. correct_answer: The correct answer
5. explanation: Detailed explanation of why the answer is correct
6. difficulty: easy, medium, or hard

Format your response as a JSON array of question objects.
Ensure questions are clear, unambiguous, and test understanding, not just memorization.
```

**User Prompt Template**:

```
Study Material:
---
{material_content}
---

Generate {count} quiz questions based on this material.
```

### Response Parsing

- Parse JSON response from AI
- Validate each question has required fields
- Sanitize question text and options
- Handle parsing errors with retry logic
- Fallback to manual question entry if AI fails

### Rate Limiting & Costs

- Implement request queuing for large batches
- Cache similar requests (same material + same params)
- Monitor API usage and costs
- Set per-user daily generation limits
- Display estimated cost/credits to user

---

## File Processing Details

### PDF Processing

```typescript
// Using pdf-parse library
import pdf from 'pdf-parse';

async function extractPdfText(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer);
  return data.text;
}
```

### Image OCR Processing

```typescript
// Using Tesseract.js for client-side OCR (lighter)
// OR Google Cloud Vision API for server-side (better accuracy)
import Tesseract from 'tesseract.js';

async function extractImageText(buffer: Buffer): Promise<string> {
  const result = await Tesseract.recognize(buffer, 'eng');
  return result.data.text;
}
```

### DOCX Processing

```typescript
// Using mammoth library
import mammoth from 'mammoth';

async function extractDocxText(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}
```

### Text File Processing

```typescript
// Simple text extraction
function extractTextFile(buffer: Buffer): string {
  return buffer.toString('utf-8');
}
```

### Processing Pipeline

1. Upload endpoint receives file
2. Detect file type from MIME type
3. Route to appropriate extraction function
4. Clean and normalize extracted text
5. Count words
6. Store in database
7. Delete file from memory/tmp
8. Return metadata

---

## File Structure

```
quiz-app/
├── app/
│   ├── api/
│   │   ├── materials/
│   │   │   ├── route.ts              # GET /api/materials
│   │   │   ├── upload/
│   │   │   │   └── route.ts          # POST /api/materials/upload
│   │   │   └── [id]/
│   │   │       └── route.ts          # GET, DELETE /api/materials/[id]
│   │   ├── quizzes/
│   │   │   ├── route.ts              # GET /api/quizzes
│   │   │   ├── generate/
│   │   │   │   └── route.ts          # POST /api/quizzes/generate
│   │   │   ├── custom/
│   │   │   │   └── route.ts          # POST /api/quizzes/custom
│   │   │   └── [id]/
│   │   │       ├── route.ts          # GET /api/quizzes/[id]
│   │   │       ├── start/
│   │   │       │   └── route.ts      # POST /api/quizzes/[id]/start
│   │   │       └── submit/
│   │   │           └── route.ts      # POST /api/quizzes/[id]/submit
│   │   ├── questions/
│   │   │   └── route.ts              # GET /api/questions
│   │   └── stats/
│   │       └── route.ts              # GET /api/stats
│   ├── dashboard/
│   │   └── page.tsx                  # Dashboard with stats and recent activity
│   ├── materials/
│   │   ├── page.tsx                  # Materials list
│   │   ├── upload/
│   │   │   └── page.tsx              # Upload interface
│   │   └── [id]/
│   │       └── page.tsx              # Material detail view
│   ├── quizzes/
│   │   ├── page.tsx                  # Quizzes list
│   │   ├── generate/
│   │   │   └── page.tsx              # Quiz generation interface
│   │   ├── [id]/
│   │   │   ├── page.tsx              # Quiz taking interface
│   │   │   └── results/
│   │   │       └── page.tsx          # Quiz results view
│   │   └── custom/
│   │       └── page.tsx              # Custom quiz builder
│   ├── questions/
│   │   └── page.tsx                  # Question bank view
│   ├── layout.tsx                    # Root layout with ClerkProvider
│   ├── page.tsx                      # Landing/home page
│   └── globals.css                   # Global styles
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── QuizCard.tsx                  # Quiz list item component
│   ├── QuestionCard.tsx              # Question display component
│   ├── MaterialCard.tsx              # Material list item component
│   ├── FileUploader.tsx              # Drag-drop upload component
│   ├── QuizTaker.tsx                 # Quiz interface component
│   ├── ResultsChart.tsx              # Performance chart component
│   └── StatsCard.tsx                 # Statistics display component
├── lib/
│   ├── supabase.ts                   # Supabase client
│   ├── ai.ts                         # AI API client (Claude/GPT)
│   ├── fileProcessing.ts             # File extraction utilities
│   └── utils.ts                      # Helper functions
├── types/
│   ├── database.ts                   # Database types
│   └── quiz.ts                       # Quiz-related types
├── middleware.ts                     # Clerk authentication middleware
├── supabase-schema.sql               # Database schema
├── .env.local                        # Environment variables (not committed)
├── .env.local.example                # Environment template
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind config
└── next.config.js                    # Next.js config
```

---

## Environment Variables

### Required Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# AI Provider (choose one or both)
ANTHROPIC_API_KEY=sk-ant-xxxxx
# OR
OPENAI_API_KEY=sk-xxxxx

# Optional: Google Cloud Vision for better OCR
GOOGLE_CLOUD_VISION_API_KEY=xxxxx
```

**Security Notes:**

- `NEXT_PUBLIC_`* variables are exposed to the browser
- API keys (ANTHROPIC, OPENAI, GOOGLE) are server-only
- Never expose AI API keys to client
- Use Supabase anon key (has RLS by default, though we disable it)

---

## Deployment Requirements

### Hosting Platform: Vercel

**Why Vercel:**

- Automatic Next.js optimizations
- Serverless API routes with long timeouts (important for AI calls)
- Edge middleware support (Clerk)
- Zero-config deployments
- Environment variable management
- Built-in CDN

### Deployment Checklist

1. **Code Repository**: Push to GitHub (private recommended)
2. **Vercel Project**: Import from GitHub
3. **Environment Variables**: Add all required variables
4. **Build Settings**: Auto-detected (Next.js)
5. **API Route Configuration**:
  - Increase timeout for /api/quizzes/generate (30s+)
  - Increase memory for file processing routes
6. **Domain Configuration**: Use Vercel subdomain or custom domain
7. **Clerk Configuration**: Add Vercel URL to allowed domains

### Database Setup

1. Create Supabase project
2. Run `supabase-schema.sql` in SQL Editor
3. Copy connection details to `.env.local`
4. Verify connections in development
5. Use same credentials in Vercel (production)

### AI API Setup

1. Create account with Anthropic or OpenAI
2. Generate API key
3. Set up billing (add credits/payment method)
4. Configure rate limits (optional)
5. Add API key to `.env.local` and Vercel

---

## TypeScript Types

### Core Types

```typescript
// types/database.ts

export interface Material {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  content: string;
  word_count: number;
  source_type: 'pdf' | 'image' | 'text' | 'docx';
  status: 'processing' | 'ready' | 'failed';
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  user_id: string;
  material_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  difficulty?: 'easy' | 'medium' | 'hard';
  options?: string[]; // For multiple choice
  correct_answer: string;
  explanation?: string;
  topic?: string;
  created_at: string;
}

export interface Quiz {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  quiz_type: 'generated' | 'custom' | 'smart';
  is_timed: boolean;
  time_limit_minutes?: number;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score?: number;
  total_questions: number;
  correct_answers: number;
  time_taken_seconds?: number;
  started_at: string;
  completed_at?: string;
  created_at: string;
}

export interface QuizAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  user_answer?: string;
  is_correct: boolean;
  time_taken_seconds?: number;
  created_at: string;
}
```

---

## Authentication Flow

### 1. Initial Load

```
User visits app → Clerk middleware checks session
                → No session: Redirect to sign-in
                → Has session: Allow access to dashboard
```

### 2. Material Upload

```
User uploads file → API validates session
                  → Process file server-side
                  → Extract text content
                  → Save to database (user_id from session)
                  → Delete file
                  → Return to frontend
```

### 3. Quiz Generation

```
User requests quiz → API validates session
                   → Fetch user's materials (by user_id)
                   → Call AI API (server-side only)
                   → Save questions (user_id from session)
                   → Return quiz
```

### 4. Quiz Taking

```
User takes quiz → Store answers locally (React state)
                → Submit to API
                → API validates session
                → Grade and save attempt (user_id from session)
                → Return results
```

---

## Future Enhancements

### Phase 2 Features

- Spaced repetition algorithm (show questions based on past performance)
- Collaborative quizzes (share with classmates)
- Quiz templates (save generation parameters)
- Flashcard mode (quick review without full quiz)
- Mobile app (React Native)
- Export quizzes to PDF
- Import questions from CSV/JSON
- Audio transcription (upload lecture recordings)

### Phase 3 Features

- Study groups (multiple users working together)
- Leaderboards (compare with friends)
- Badges and achievements
- Study streaks and reminders
- Advanced analytics (learning curve, retention rate)
- AI tutor chat (ask questions about materials)
- Video content support (extract transcripts)
- Integration with LMS platforms (Canvas, Blackboard)

### Technical Improvements

- Implement caching for AI responses (Redis)
- Add background job queue for file processing (BullMQ)
- Implement real-time updates (WebSockets)
- Add comprehensive error logging (Sentry)
- Add E2E tests (Playwright)
- Add unit tests for API routes (Jest)
- Implement pagination for all list views
- Add full-text search (Postgres FTS or Algolia)
- Optimize AI prompts for lower token usage
- Add AI response streaming for better UX

---

## Performance Targets

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Loading Times

- Initial page load: < 2s
- Material upload + processing: < 10s (depending on file size)
- Quiz generation: < 15s (AI call is the bottleneck)
- Quiz submission: < 1s

### Optimization Strategies

- Server-side rendering for initial load
- Optimistic UI updates for quiz answers
- Show progress indicators for long operations
- Lazy load quiz questions (one at a time)
- Cache AI responses for identical requests
- Compress extracted text before storing
- Use Vercel Edge Functions for faster API responses

---

## Cost Estimates

### Monthly Costs (for 100 active users)

**Vercel Hosting**: $0 - $20

- Free tier covers most small apps
- Pro tier ($20/month) if you need more bandwidth

**Supabase Database**: $0 - $25

- Free tier: 500MB database, 2GB bandwidth
- Pro tier ($25/month): 8GB database, 50GB bandwidth

**AI API Costs**: $50 - $200

- Anthropic Claude: ~$0.01 per quiz generation (1000 tokens)
- 10 quizzes per user per month = 1000 quizzes = ~$10-20
- Depends heavily on usage patterns

**Google Cloud Vision** (optional): $0 - $50

- $1.50 per 1000 images
- Most users will upload PDFs/text, not images

**Total**: $50 - $300/month for 100 users

**Per-user cost**: ~$0.50 - $3.00/month

---

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

- Color contrast ratios meet 4.5:1 minimum
- All interactive elements keyboard accessible
- Focus indicators visible on all focusable elements
- Screen reader compatibility (semantic HTML)
- Form labels properly associated
- Error messages descriptive and helpful
- Quiz timer has visual and audio cues
- Quiz questions are navigable with keyboard
- Results charts have accessible data tables

### Implementation Notes

- Use semantic HTML (`<button>`, `<form>`, `<label>`, `<fieldset>`)
- Add ARIA labels for complex interactions
- Test with screen readers (VoiceOver, NVDA)
- Support keyboard navigation (Tab, Enter, Space, Arrow keys)
- Ensure adequate touch target sizes (44x44px minimum)
- Provide text alternatives for all visualizations

---

## Testing Strategy

### Unit Tests

- File processing functions
- AI response parsing
- Quiz grading logic
- Input validation functions

### Integration Tests

- Material upload → content extraction → database storage
- Quiz generation → AI call → question parsing → database storage
- Quiz taking → answer submission → grading → results calculation

### End-to-End Tests

- User sign-up and sign-in flow
- Complete material upload workflow
- Generate quiz from material
- Take quiz and submit answers
- View results and performance stats

### Manual Testing Checklist

- Upload PDF, extract text correctly
- Upload image, OCR extracts text
- Generate quiz with various parameters
- Take quiz, all question types work
- Submit quiz, score calculated correctly
- View performance dashboard
- Create custom quiz from question bank
- Test on mobile device
- Test on different browsers
- Test with slow network (3G simulation)
- Test file upload failures (too large, wrong type)
- Test AI API failures (timeout, rate limit)

---

## Security Considerations

### Authentication & Authorization

- All API routes require Clerk authentication
- User ID extracted from Clerk session token
- All database queries filtered by user_id
- Ownership verification on update/delete operations
- No way to access other users' data

### File Upload Security

- Validate file types (whitelist approach)
- Validate file sizes (max 10MB per file)
- Sanitize file names
- Don't execute uploaded files
- Process in isolated environment
- Delete files immediately after processing

### AI API Security

- API keys stored server-side only
- Never expose keys to client
- Implement rate limiting per user
- Monitor for unusual usage patterns
- Set maximum token limits per request
- Sanitize user input before sending to AI

### Database Security

- Use parameterized queries (Supabase handles this)
- Disable RLS, enforce security in API routes
- Regular backups
- Monitor for SQL injection attempts
- Encrypt sensitive data at rest

### Content Security

- Sanitize AI-generated content before displaying
- Prevent XSS attacks in question text
- Validate JSON responses from AI
- Rate limit quiz generation
- Prevent abuse (spam, inappropriate content generation)

---

## AI Prompt Examples

### Multiple Choice Generation

```typescript
const prompt = `
Generate ${count} multiple choice questions based on this material.

Material:
---
${materialContent}
---

Requirements:
- Each question must have exactly 4 options
- Only one correct answer
- Options should be plausible (no obviously wrong answers)
- Include detailed explanation for the correct answer
- Difficulty: ${difficulty}

Return JSON array:
[
  {
    "question_text": "What is...",
    "question_type": "multiple_choice",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option A",
    "explanation": "...",
    "difficulty": "medium"
  }
]
`;
```

### True/False Generation

```typescript
const prompt = `
Generate ${count} true/false questions based on this material.

Material:
---
${materialContent}
---

Requirements:
- Statement should be clear and unambiguous
- Avoid double negatives
- Include explanation for why it's true or false
- Difficulty: ${difficulty}

Return JSON array:
[
  {
    "question_text": "Photosynthesis occurs only in plants.",
    "question_type": "true_false",
    "correct_answer": "False",
    "explanation": "Photosynthesis also occurs in algae and some bacteria.",
    "difficulty": "easy"
  }
]
`;
```

### Short Answer Generation

```typescript
const prompt = `
Generate ${count} short answer questions based on this material.

Material:
---
${materialContent}
---

Requirements:
- Questions should require understanding, not just recall
- Model answer should be 1-3 sentences
- Include grading criteria or key points
- Difficulty: ${difficulty}

Return JSON array:
[
  {
    "question_text": "Explain the process of photosynthesis.",
    "question_type": "short_answer",
    "correct_answer": "Photosynthesis is the process by which plants convert light energy into chemical energy. It involves capturing sunlight using chlorophyll and converting CO2 and water into glucose and oxygen.",
    "explanation": "Key points: light energy conversion, role of chlorophyll, inputs (CO2, water, sunlight), outputs (glucose, oxygen)",
    "difficulty": "medium"
  }
]
`;
```

---

## User Experience Flows

### Flow 1: First-Time User - Upload to Quiz

1. User signs up / signs in
2. Lands on dashboard (empty state)
3. Clicks "Upload Material" button
4. Drag-drops PDF file
5. Sees upload progress bar
6. File processes, shows success message
7. Redirected to material view with extracted content preview
8. Clicks "Generate Quiz" button
9. Selects quiz parameters (10 questions, multiple choice, medium difficulty)
10. Clicks "Generate" - sees loading state
11. Quiz generates (10-15 seconds)
12. Redirected to quiz list, new quiz appears
13. Clicks "Start Quiz"
14. Takes quiz, answering questions one by one
15. Clicks "Submit Quiz" when done
16. Sees results page with score, correct/incorrect breakdown
17. Reviews each question with explanations

### Flow 2: Returning User - Custom Quiz

1. User signs in
2. Lands on dashboard with performance stats
3. Sees "Weak Areas" section highlighting poor performance topics
4. Clicks "Browse Question Bank"
5. Filters questions by topic: "Cellular Respiration"
6. Selects 15 questions by checking boxes
7. Clicks "Create Custom Quiz"
8. Names quiz "Cellular Respiration Review"
9. Enables timer (20 minutes)
10. Saves quiz
11. Starts quiz immediately
12. Takes quiz with timer visible
13. Submits before time runs out
14. Reviews results
15. Dashboard updates with new attempt data

### Flow 3: Performance Review

1. User signs in
2. Clicks "Performance" in navigation
3. Sees overall stats:
  - 15 quizzes taken
  - 76% average score
  - 300 questions answered
  - 78% accuracy
4. Sees chart showing score trend over time
5. Sees "Weak Areas" breakdown:
  - Cellular Respiration: 55% accuracy
  - Photosynthesis: 82% accuracy
6. Clicks on "Cellular Respiration"
7. Sees all attempts related to this topic
8. Clicks "Practice This Topic"
9. App auto-generates 10-question quiz from cellular respiration materials
10. User practices weak area

---

## Rebuild Instructions for AI

### Step 1: Project Setup

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint
npm install @clerk/nextjs @supabase/supabase-js
npm install pdf-parse mammoth tesseract.js
npm install @anthropic-ai/sdk # or openai
npm install react-dropzone recharts react-markdown
npx shadcn-ui@latest init
```

### Step 2: Environment Configuration

Create `.env.local` with required variables (see Environment Variables section)

### Step 3: Implement Core Files

**Authentication & Layout:**

1. Create `middleware.ts` for Clerk authentication
2. Create `app/layout.tsx` with ClerkProvider
3. Create navigation component with auth state

**Backend Setup:**
4. Create `lib/supabase.ts` for database client
5. Create `lib/ai.ts` for AI API client (Claude or GPT)
6. Create `lib/fileProcessing.ts` for file extraction utilities
7. Create `types/database.ts` and `types/quiz.ts` for TypeScript types

**API Routes:**
8. Create `/api/materials/upload` endpoint (file processing)
9. Create `/api/materials` endpoints (CRUD)
10. Create `/api/quizzes/generate` endpoint (AI integration)
11. Create `/api/quizzes` endpoints (CRUD)
12. Create `/api/quizzes/[id]/submit` endpoint (grading logic)
13. Create `/api/questions` endpoint (question bank)
14. Create `/api/stats` endpoint (performance calculations)

**Frontend Pages:**
15. Create dashboard page (`app/dashboard/page.tsx`)
16. Create material upload page (`app/materials/upload/page.tsx`)
17. Create material list page (`app/materials/page.tsx`)
18. Create quiz generation page (`app/quizzes/generate/page.tsx`)
19. Create quiz taking page (`app/quizzes/[id]/page.tsx`)
20. Create quiz results page (`app/quizzes/[id]/results/page.tsx`)
21. Create question bank page (`app/questions/page.tsx`)
22. Create custom quiz builder page (`app/quizzes/custom/page.tsx`)

**UI Components:**
23. Create reusable components (QuizCard, QuestionCard, MaterialCard, etc.)
24. Add shadcn/ui components (Button, Card, Dialog, Select, etc.)

### Step 4: Database Setup

1. Create Supabase project
2. Run `supabase-schema.sql` in SQL Editor
3. Verify tables created correctly
4. Test connection from development

### Step 5: AI Setup

1. Create Anthropic or OpenAI account
2. Generate API key
3. Add to `.env.local`
4. Test API call in development
5. Verify structured output parsing

### Step 6: Test Locally

```bash
npm run dev
```

Test complete flows:

- Upload material (PDF, image, text)
- Generate quiz from material
- Take quiz
- View results
- Check performance dashboard
- Create custom quiz

### Step 7: Deploy

```bash
gh repo create quiz-app --private --source=. --remote=origin --push
```

1. Import to Vercel
2. Add environment variables
3. Configure API route timeouts
4. Deploy
5. Test production

### Step 8: Verify Production

- Test authentication flow
- Upload test material
- Generate test quiz
- Verify AI API calls work
- Check database writes
- Verify performance stats calculate correctly

---

## Success Metrics

### User Engagement

- Daily active users (DAU)
- Average materials uploaded per user
- Average quizzes generated per user
- Average quiz attempts per user
- Completion rate (quizzes started vs. completed)
- Time spent in app per session

### Learning Effectiveness

- Score improvement over time (per user)
- Quiz retake rate (users practicing same material)
- Weak area improvement (accuracy increase after targeted practice)
- Custom quiz creation rate (shows engagement with question bank)

### Technical Metrics

- Material upload success rate (>95% target)
- Quiz generation success rate (>95% target)
- Average generation time (<15s target)
- API error rate (<1% target)
- Uptime (99.9% target)

### Business Metrics

- User retention (Day 1, Day 7, Day 30)
- Conversion rate (sign-up to first quiz)
- AI API cost per user
- Total hosting costs vs. users

---

## Known Limitations & Trade-offs

### Current Limitations

1. **No permanent file storage**: Original files deleted after processing (privacy + cost trade-off)
2. **Single AI provider**: Must choose Claude OR GPT (not both simultaneously)
3. **No offline support**: Requires internet for all operations
4. **Limited question types**: Only multiple choice, true/false, short answer (no essay, matching, etc.)
5. **Manual grading for short answers**: AI doesn't auto-grade open-ended responses
6. **Basic analytics**: Simple stats, no advanced learning insights

### Trade-offs Made

1. **File deletion vs. storage**: Chose to delete for privacy/cost over keeping for re-processing
2. **Server-side processing vs. client-side**: Chose server-side for security over client-side for speed
3. **AI generation vs. manual entry**: Focused on AI generation, limited manual question creation UI
4. **Real-time updates vs. polling**: Chose polling for simplicity over WebSockets for complexity
5. **RLS disabled**: Simplified security model, relies on API route validation (like task manager)

---

## Conclusion

This quiz application provides a comprehensive learning platform with:

- ✅ Secure server-side authentication
- ✅ Intelligent file processing (no permanent storage)
- ✅ AI-powered quiz generation
- ✅ Comprehensive performance tracking
- ✅ Flexible quiz customization
- ✅ Scalable architecture
- ✅ Modern tech stack

The application balances cost-effectiveness (no file storage), user privacy (temporary files), and powerful AI features (quiz generation) to create an effective study tool for students preparing for exams.