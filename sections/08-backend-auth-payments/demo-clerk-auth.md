# Demo: Clerk Authentication

**Goal:** Add user authentication to the quiz app using Clerk.

---

## Step 1: Add Clerk Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Step 2: Set Up Middleware

McKay's template likely has this already. If not:

```
Create a middleware.ts at the project root that uses Clerk's
clerkMiddleware() to protect routes.

Public routes (no auth needed): /, /sign-in, /sign-up
Protected routes (auth required): /dashboard, /quiz/*
```

## Step 3: Add Auth Components

```
@middleware.ts Add Clerk authentication UI to the app:
1. Add <SignInButton> and <UserButton> to the header/navbar
2. When signed in, show the user's avatar and name
3. When signed out, show a "Sign In" button
4. Wrap the app with <ClerkProvider> in the root layout

Follow the existing layout patterns in this project.
```

## Step 4: Protect Quiz Routes

```
@middleware.ts @app/quiz/new/page.tsx
The quiz creation and history pages should require authentication.
Add auth checks:
- If not signed in, redirect to /sign-in
- After sign in, redirect back to the original page
- Associate quizzes with the authenticated user's Clerk ID
```

## Step 5: Sync Users to Database

```
@db/schema/users.ts @actions/
Create a Server Action that syncs a Clerk user to our database.
When a user signs in for the first time, create a record in the users table
with their Clerk ID and email.
Use this in the dashboard page to ensure the user exists in our DB.
```

## What to Emphasize

- Clerk handles all the hard parts: OAuth, sessions, JWT, UI components
- Middleware gives route-level protection with zero per-page code
- Syncing users to your DB gives you a foreign key for data ownership

## Timing

~10 min
