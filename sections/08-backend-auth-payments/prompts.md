# Section 08: Prompts

## Supabase + Drizzle Setup

```
@context-file.md Set up the database layer:
1. Create Drizzle schema files in db/schema/ matching the context file's database schema
2. Create the Drizzle client in db/drizzle.ts using DATABASE_URL
3. Create an index.ts barrel export in db/schema/
4. Include proper relations between tables

Follow the existing project patterns.
```

## Clerk Auth Setup

```
@app/layout.tsx Add Clerk authentication to this app:
1. Wrap the app with <ClerkProvider>
2. Add sign-in/sign-up routes at /sign-in and /sign-up
3. Add a <UserButton> to the header for signed-in users
4. Create middleware.ts to protect /dashboard and /quiz/* routes
```

## Stripe Checkout

```
@actions/ Create the Stripe payment flow:
1. A Server Action to create a Checkout Session for the Pro plan
2. A success page at /payment/success
3. A cancel page that redirects back to pricing
4. A webhook handler at /api/webhooks/stripe/route.ts

Use Stripe test mode. Price ID: [your-price-id].
```

## Server Actions CRUD

```
@db/schema/ @actions/ Create Server Actions for quiz CRUD:

- createQuiz: Insert quiz + questions, return quiz ID
- getQuiz: Fetch quiz with questions by ID
- submitAttempt: Save quiz attempt with score
- getUserQuizzes: List user's quizzes with latest scores
- deleteQuiz: Soft delete a quiz

Each action: validate with Zod, handle errors, revalidate paths.
```

## Connect Auth to Data

```
@middleware.ts @actions/quiz-actions.ts
Update the quiz Server Actions to:
1. Get the current user from Clerk using auth()
2. Only return quizzes belonging to the authenticated user
3. Associate new quizzes with the user's Clerk ID
4. Reject requests from unauthenticated users
```

## Full Stack Integration Check

```
@codebase Verify the full backend integration:
1. Is the Clerk middleware protecting the right routes?
2. Are all Server Actions using Zod validation?
3. Is the Drizzle schema matching the actual Supabase tables?
4. Are there any missing error handlers?

List any issues found.
```
