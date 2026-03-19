# Task Manager App - Product Requirements Document

## Overview

A clean, modern task management application that allows users to create, manage, and track their personal tasks. Built with security-first architecture using server-side API routes with authentication.

### Target Users
- Individuals who need a simple, distraction-free way to manage daily tasks
- Users who value privacy and want their data secured properly
- People who want quick access from any device (responsive design)

---

## Core Features

### 1. User Authentication
- **Sign Up / Sign In**: Email/password authentication via Clerk
- **Session Management**: Persistent sessions across devices
- **Protected Routes**: All task operations require authentication
- **User Profile**: Display user avatar/name in header with sign-out option

### 2. Task Management (CRUD Operations)

#### Create Tasks
- Input field at top of page for quick task entry
- "Add" button to submit new tasks
- Tasks appear immediately at top of list (newest first)
- Input clears after successful creation

#### Read/View Tasks
- Display all tasks in a clean, scrollable list
- Show task title and completion status
- Visual distinction between completed and active tasks
- Empty state message when no tasks exist
- Loading state while fetching tasks

#### Update Tasks
- Toggle completion status via checkbox
- Completed tasks show strike-through text
- Visual feedback on hover/interaction
- Optimistic UI updates (instant response)

#### Delete Tasks
- "Delete" button on each task
- Immediate removal from UI
- No confirmation dialog (quick action)

### 3. Visual Design & User Experience

#### Current Implementation
- Gradient background (blue to indigo)
- White cards with shadows for depth
- Clean, minimal interface
- Responsive layout (mobile and desktop)

#### Aesthetic Improvements to Add
- **Animations**:
  - Smooth fade-in when tasks appear
  - Slide-out animation when deleting
  - Checkbox bounce on completion
  - Button hover effects with scale/color transitions

- **Color Enhancements**:
  - Use a more sophisticated color palette (consider warm/cool tone options)
  - Add subtle accent colors for different task states
  - Improve contrast for accessibility (WCAG AA compliance)
  - Dark mode toggle option

- **Typography**:
  - Use a more distinctive font for headers (consider Inter, Poppins, or SF Pro)
  - Better hierarchy with font sizes and weights
  - Improved line-height and letter-spacing for readability

- **Micro-interactions**:
  - Task completion celebration (confetti, subtle pulse, or checkmark animation)
  - Haptic feedback on mobile devices
  - Progress indicator showing completed vs. total tasks
  - Success toast notifications for actions

- **Layout Improvements**:
  - Add subtle task dividers or cards
  - Implement task grouping (Today, This Week, etc.)
  - Add drag-and-drop reordering
  - Implement task filtering (All, Active, Completed)
  - Search/filter functionality for large task lists

- **Visual Polish**:
  - Glass-morphism effects on cards
  - Smooth page transitions
  - Custom scrollbar styling
  - Skeleton loaders instead of spinner
  - Add illustrations for empty states

---

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React useState/useEffect (simple local state)
- **Authentication UI**: Clerk React components

### Backend Stack
- **API Layer**: Next.js API Routes (server-side)
- **Authentication**: Clerk (server-side validation)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

### Architecture Pattern: Server-Side API

**Why This Approach:**
- Security: Authentication happens server-side, never exposed to client
- Scalability: Easy to add server-side logic (email notifications, webhooks, etc.)
- Separation: Clean boundary between UI and data layer
- Flexibility: Easy to add caching, rate limiting, logging

**Data Flow:**
```
User Action → Frontend (React)
           → API Route (validates Clerk session)
           → Supabase (queries database)
           → API Route (returns data)
           → Frontend (updates UI)
```

---

## Database Schema

### Tasks Table

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
```

**Column Descriptions:**
- `id`: Auto-generated UUID, primary key
- `user_id`: Clerk user ID (TEXT format: `user_xxxxx`)
- `title`: Task description/title
- `completed`: Boolean flag for completion status
- `created_at`: Timestamp for sorting (newest first)

**Security Approach:**
- Row Level Security (RLS) is disabled
- Security enforced in API routes via Clerk authentication
- All queries filter by authenticated user's ID
- Ownership verification on update/delete operations

---

## API Endpoints

### GET /api/tasks
**Purpose**: Fetch all tasks for authenticated user

**Authentication**: Required (Clerk session)

**Response**:
```json
{
  "tasks": [
    {
      "id": "uuid",
      "user_id": "user_xxxxx",
      "title": "Task title",
      "completed": false,
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

**Error Codes**:
- 401: Unauthorized (no valid session)
- 500: Server error

---

### POST /api/tasks
**Purpose**: Create a new task

**Authentication**: Required (Clerk session)

**Request Body**:
```json
{
  "title": "New task title"
}
```

**Validation**:
- Title is required
- Title must be non-empty after trimming
- Title must be a string

**Response**:
```json
{
  "task": {
    "id": "uuid",
    "user_id": "user_xxxxx",
    "title": "New task title",
    "completed": false,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

**Error Codes**:
- 400: Bad request (invalid title)
- 401: Unauthorized
- 500: Server error

---

### PATCH /api/tasks/[id]
**Purpose**: Update a task (toggle completion, edit title)

**Authentication**: Required (Clerk session)

**Ownership Check**: Verifies task belongs to authenticated user

**Request Body**:
```json
{
  "completed": true
}
```
Or:
```json
{
  "title": "Updated title"
}
```

**Response**:
```json
{
  "task": {
    "id": "uuid",
    "user_id": "user_xxxxx",
    "title": "Task title",
    "completed": true,
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

**Error Codes**:
- 401: Unauthorized
- 403: Forbidden (task belongs to another user)
- 404: Task not found
- 500: Server error

---

### DELETE /api/tasks/[id]
**Purpose**: Delete a task

**Authentication**: Required (Clerk session)

**Ownership Check**: Verifies task belongs to authenticated user

**Response**:
```json
{
  "success": true
}
```

**Error Codes**:
- 401: Unauthorized
- 403: Forbidden (task belongs to another user)
- 404: Task not found
- 500: Server error

---

## Authentication Flow

### 1. Initial Load
```
User visits app → Clerk middleware checks session
                → No session: Redirect to Clerk sign-in
                → Has session: Allow access to app
```

### 2. Sign In
```
User enters credentials → Clerk validates
                        → Creates session
                        → Redirects to app (/)
                        → App loads user's tasks
```

### 3. API Requests
```
Frontend makes request → Includes session cookie
                       → API route calls auth()
                       → Gets userId from Clerk
                       → Queries Supabase with userId
                       → Returns filtered data
```

### 4. Sign Out
```
User clicks sign out → Clerk clears session
                     → Redirects to sign-in page
```

---

## File Structure

```
task-manager-app/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET, POST /api/tasks
│   │       └── [id]/
│   │           └── route.ts      # PATCH, DELETE /api/tasks/[id]
│   ├── layout.tsx                # Root layout with ClerkProvider
│   ├── page.tsx                  # Main UI (task list, forms)
│   └── globals.css               # Global styles
├── lib/
│   └── supabase.ts               # Supabase client configuration
├── types/
│   └── database.ts               # TypeScript database types
├── middleware.ts                 # Clerk authentication middleware
├── supabase-schema.sql           # Database schema
├── .env.local                    # Environment variables (not committed)
├── .env.local.example            # Environment template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
└── next.config.js                # Next.js config
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
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
```

**Security Notes:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- `CLERK_SECRET_KEY` is server-only (never exposed)
- Publishable keys are safe for client-side use
- Secret keys must remain server-side only

---

## Deployment Requirements

### Hosting Platform: Vercel

**Why Vercel:**
- Automatic Next.js optimizations
- Serverless API routes
- Edge middleware support (Clerk)
- Zero-config deployments
- Automatic HTTPS
- Global CDN

### Deployment Checklist

1. **Code Repository**: Push to GitHub (private recommended)
2. **Vercel Project**: Import from GitHub
3. **Environment Variables**: Add all 4 required variables
4. **Build Settings**: Auto-detected (Next.js)
5. **Domain Configuration**: Use Vercel subdomain or custom domain
6. **Clerk Configuration**: Test keys work on any domain (no config needed)

### CI/CD Pipeline

```
git push → GitHub → Vercel detects push
                  → Runs build (npm run build)
                  → Runs tests (if configured)
                  → Deploys to production
                  → Updates live URL
```

**Automatic Features:**
- Preview deployments for pull requests
- Rollback capability
- Build logs and debugging
- Performance monitoring

---

## Future Enhancements

### Phase 2 Features
- [ ] Task categories/tags
- [ ] Due dates with calendar picker
- [ ] Priority levels (High, Medium, Low)
- [ ] Task descriptions/notes
- [ ] Subtasks/checklist items
- [ ] Task search and filtering
- [ ] Keyboard shortcuts

### Phase 3 Features
- [ ] Task sharing between users
- [ ] Team/workspace functionality
- [ ] Email notifications for due dates
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Analytics dashboard (productivity insights)
- [ ] Mobile app (React Native)

### Technical Improvements
- [ ] Add Redis caching for task lists
- [ ] Implement optimistic locking for concurrent edits
- [ ] Add rate limiting to API routes
- [ ] Implement comprehensive error logging (Sentry)
- [ ] Add E2E tests (Playwright)
- [ ] Add unit tests for API routes (Jest)
- [ ] Implement pagination for large task lists
- [ ] Add real-time updates via WebSockets/Supabase Realtime

---

## Design System Guidelines

### Color Palette (Suggested Improvements)
```css
/* Primary */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Success */
--success-500: #10b981;

/* Danger */
--danger-500: #ef4444;

/* Neutral */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-500: #6b7280;
--gray-900: #111827;
```

### Typography Scale
```css
/* Headings */
h1: 2.5rem / 600 weight
h2: 2rem / 600 weight
h3: 1.5rem / 500 weight

/* Body */
body: 1rem / 400 weight
small: 0.875rem / 400 weight
```

### Spacing System
Based on Tailwind's 4px grid:
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

### Border Radius
- sm: 0.375rem (6px)
- md: 0.5rem (8px)
- lg: 0.75rem (12px)
- full: 9999px (pills)

---

## Performance Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Loading Times
- Initial page load: < 2s
- API response time: < 500ms
- Time to interactive: < 3s

### Optimization Strategies
- Server-side rendering for initial load
- Optimistic UI updates for instant feedback
- Image optimization (Next.js automatic)
- Code splitting (Next.js automatic)
- Minimize JavaScript bundle size
- Use Tailwind's JIT compiler

---

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance
- [ ] Color contrast ratios meet 4.5:1 minimum
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible on all focusable elements
- [ ] Screen reader compatibility (semantic HTML)
- [ ] Form labels properly associated
- [ ] Error messages descriptive and helpful
- [ ] Skip navigation link for keyboard users

### Implementation Notes
- Use semantic HTML (`<button>`, `<form>`, `<label>`)
- Add ARIA labels where needed
- Test with screen readers (VoiceOver, NVDA)
- Support keyboard navigation (Tab, Enter, Escape)
- Ensure adequate touch target sizes (44x44px minimum)

---

## Testing Strategy

### Unit Tests
- API route authentication logic
- API route authorization (ownership checks)
- Input validation functions
- Utility functions

### Integration Tests
- Complete API workflows (create → read → update → delete)
- Authentication flows
- Database operations

### End-to-End Tests
- User sign-up flow
- Task creation and management
- Sign-out flow
- Error handling and edge cases

### Manual Testing Checklist
- [ ] Sign up new user
- [ ] Sign in existing user
- [ ] Create task
- [ ] Toggle task completion
- [ ] Delete task
- [ ] Sign out
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Test with slow network (3G simulation)

---

## Success Metrics

### User Engagement
- Daily active users (DAU)
- Average tasks created per user
- Task completion rate
- Session duration

### Technical Metrics
- API response times (p50, p95, p99)
- Error rate (< 1% target)
- Uptime (99.9% target)
- Build success rate (100% target)

### Business Metrics
- User retention (Day 1, Day 7, Day 30)
- User acquisition cost
- Time to first task creation
- Feature adoption rates

---

## Known Limitations & Trade-offs

### Current Limitations
1. **No offline support**: Requires internet connection
2. **No task history**: Can't see edit history or restore deleted tasks
3. **No collaboration**: Single-user only (no sharing)
4. **Basic sorting**: Only by creation date (newest first)
5. **No search**: Must scroll to find specific tasks

### Trade-offs Made
1. **Client-side vs Server-side**: Chose server-side API for security over client-side for simplicity
2. **RLS disabled**: Simplified security model, relies on API route validation
3. **Test keys in production**: Acceptable for small apps, should use `pk_live_` for scale
4. **No pagination**: Works for small task lists, needs implementation for scale
5. **Optimistic UI**: Better UX but can show incorrect state if API fails

---

## Rebuild Instructions for AI

### Step 1: Project Setup
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint
npm install @clerk/nextjs @supabase/supabase-js
```

### Step 2: Environment Configuration
Create `.env.local` with 4 required variables (see Environment Variables section)

### Step 3: Implement Core Files
1. Create `middleware.ts` for Clerk authentication
2. Create `app/layout.tsx` with ClerkProvider
3. Create `lib/supabase.ts` for database client
4. Create `types/database.ts` for TypeScript types
5. Create API routes in `app/api/tasks/`
6. Create main UI in `app/page.tsx`

### Step 4: Database Setup
Run `supabase-schema.sql` in Supabase SQL Editor

### Step 5: Test Locally
```bash
npm run dev
```
Test all CRUD operations

### Step 6: Deploy
```bash
gh repo create task-manager-app --private --source=. --remote=origin --push
```
Then import to Vercel and add environment variables

### Step 7: Verify
Test production deployment, verify authentication works

---

## Support & Maintenance

### Monitoring
- Set up Vercel Analytics for performance monitoring
- Configure error tracking (Sentry or similar)
- Monitor API usage and rate limits
- Track database query performance in Supabase

### Updates
- Keep dependencies updated (monthly review)
- Monitor Clerk changelog for auth updates
- Monitor Supabase changelog for database updates
- Monitor Next.js releases for framework updates

### Backup Strategy
- Supabase automatic daily backups
- Export database weekly to external storage
- Keep environment variables in secure vault (1Password, etc.)
- Maintain documentation of external configurations

---

## Conclusion

This task manager demonstrates a production-ready architecture with:
- ✅ Secure server-side authentication
- ✅ Clean separation of concerns
- ✅ Scalable API design
- ✅ Modern tech stack
- ✅ Deployment-ready configuration

The application prioritizes security and maintainability while providing a simple, effective user experience. The modular architecture makes it easy to add features incrementally without major refactoring.
