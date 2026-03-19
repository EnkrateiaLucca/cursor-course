# Demo: Supabase + Drizzle Setup

**Goal:** Connect the quiz app to Supabase via Drizzle ORM for persistent data storage.

---

## Step 1: Configure Supabase Connection

1. Get your Supabase connection string from the Supabase dashboard:
   - Project Settings → Database → Connection String (URI)
2. Add to `.env.local`:
   ```
   DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
   ```

## Step 2: Define the Drizzle Schema

Use Cursor to generate the schema from the context file:

```
@context-file.md Create the Drizzle schema files in db/schema/ for:
- users table
- quizzes table
- questions table
- quiz_attempts table

Use the database schema from the context file.
Include proper relations, indexes, and timestamps.
Export everything from a db/schema/index.ts barrel file.
```

## Step 3: Configure Drizzle

Create `db/drizzle.ts`:

```
@db/schema/index.ts Create the Drizzle database client configuration.
Use the Supabase PostgreSQL connection string from DATABASE_URL env var.
Export a db instance and type-safe query helpers.
```

## Step 4: Push Schema to Database

```bash
pnpm drizzle-kit push
```

Verify tables were created in the Supabase dashboard → Table Editor.

## Step 5: Test with a Query

```
@db/drizzle.ts @db/schema/index.ts
Create a simple Server Action that inserts a test user
and then reads them back. Run it to verify the connection works.
```

## What to Emphasize

- Drizzle schema = TypeScript source of truth for your database
- `drizzle-kit push` syncs schema to database (no migration files for development)
- `drizzle-kit generate` creates migration files (for production)
- Type safety means you catch column name typos at compile time

## Timing

~10 min
