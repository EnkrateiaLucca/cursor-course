# Demo: Build a Toy HTML App

**Goal:** Show Cursor's core modes by building a simple, self-contained HTML page from scratch.

---

## Step 1: Create the file

1. Open Cursor with an empty folder (or the course repo)
2. Create a new file: `toy-app.html`
3. Open Chat (Cmd+L)

## Step 2: Generate the initial app via Chat

Use the prompt from [prompts.md](prompts.md) — "Create a simple HTML app" prompt.

**What to show the audience:**
- How Chat generates a complete file
- The Apply button to accept changes
- The diff view showing what was added

## Step 3: Demonstrate Inline Edit (Cmd+K)

1. Select the `<h1>` tag in the HTML
2. Press Cmd+K
3. Type: "Make this a gradient text with a subtle animation"
4. Show how it edits in-place without touching the rest of the file

**What to show:**
- Inline Edit is surgical — it only changes what you select
- Great for quick tweaks without context overhead

## Step 4: Demonstrate Tab Autocomplete

1. Start typing a new `<div>` element below the existing content
2. Pause and let Tab suggestions appear
3. Accept a suggestion with Tab
4. Show how it predicts based on the surrounding context

**What to show:**
- Tab goes beyond single-line — it predicts multi-line blocks
- It understands your current file's patterns

## Step 5: Demonstrate Agent Mode

1. Open Agent mode (Cmd+I or switch in Chat)
2. Ask it to "Add a dark mode toggle with localStorage persistence"
3. Watch it plan and execute multiple changes

**What to show:**
- Agent creates a plan before executing
- It can modify multiple parts of the file
- It understands the full context of the file

## Step 6: Open in Browser

1. Right-click → Open with Live Server (or just open the HTML file)
2. Show the working app to the audience
3. Toggle dark mode to prove it works

## Timing

- Steps 1-2: ~10 min (with explanation)
- Steps 3-4: ~10 min
- Steps 5-6: ~10 min
- Q&A buffer: ~5 min

## Fallback

If something goes wrong, the key point is showing the four modes. You can simplify the app (e.g., a counter or a to-do list) and still demonstrate Chat → Inline Edit → Tab → Agent.
