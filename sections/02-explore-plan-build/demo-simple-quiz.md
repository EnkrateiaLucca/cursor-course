# Demo: Build a Simple Quiz (No AI)

**Goal:** Practice the Explore-Plan-Build framework by adding a hardcoded quiz page to McKay's template. No AI generation — just static questions to establish the UI pattern.

---

## Explore Phase (~5 min)

### Step 1: Understand the template structure

1. Open McKay's template in Cursor
2. Use Chat: `@codebase What is the file structure of this project? What framework and patterns does it use?`
3. Explore key directories: `app/`, `components/`, `lib/`

### Step 2: Identify where to add the quiz page

1. Look at existing pages in `app/`
2. Check how routing works (App Router)
3. Identify shared components and layouts

## Plan Phase (~5 min)

### Step 3: Create the plan

Ask Cursor to plan (don't build yet):

```
@codebase I want to add a simple quiz page to this app.

The quiz should:
- Show one question at a time with 4 multiple-choice answers
- Track score as the user progresses
- Show results at the end
- Use hardcoded questions (no AI, no API)

Create a step-by-step plan. Don't write code yet — just outline the files to create/modify.
```

Review the plan. Adjust if needed.

## Build Phase (~20 min)

### Step 4: Create the quiz page

Use Agent mode to execute the plan:

```
Now implement the quiz page following the plan above.
Use the existing UI components and styling patterns from this project.
Hardcode 5 sample questions about web development.
```

### Step 5: Verify and iterate

1. Run the dev server: `pnpm dev`
2. Navigate to the quiz page
3. Walk through the quiz flow
4. If something doesn't look right, use Inline Edit (Cmd+K) to fix it

### Step 6: Add navigation

```
Add a link to the quiz page in the main navigation/homepage so users can find it.
```

## What to Emphasize

- The Explore phase prevented us from creating something that doesn't match the template's patterns
- The Plan phase gave us a clear roadmap before writing any code
- The Build phase was fast because the AI had good context
- This is a simple quiz — in Section 05, we'll add AI-powered question generation

## Timing

- Explore: ~5 min
- Plan: ~5 min
- Build: ~20 min
- Review/Q&A: ~5 min
