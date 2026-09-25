# Demo: Build a Toy HTML App

**Goal:** Show Cursor's core modes by building a simple, self-contained HTML page from scratch.

---

## Step 1: Create the file

1. Open Cursor with an empty folder (or the course repo)
2. Create a new file: `toy-app.html`
3. Open Chat (Cmd+L)

## Step 2: Generate the initial app via Agent (Ask or Agent mode)

Use the prompt from [prompts.md](prompts.md) — "Create a simple HTML app" prompt.

Open the Agent panel (`Cmd+I` / `Ctrl+I`). Start in **Ask** to discuss the approach, or go straight to **Agent** to generate the file.

**What to show the audience:**
- How Agent generates a complete file
- The Apply / diff view showing what was added
- Mode picker (`Shift+Tab`): Ask (read-only) vs Agent (edits)

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

## Step 5: Demonstrate Agent Mode (and Plan)

1. Open the Agent panel (`Cmd+I` / `Ctrl+I`)
2. Optionally switch to **Plan** (`Shift+Tab`), ask for an approach for dark mode, approve it
3. Switch to **Agent** and ask it to "Add a dark mode toggle with localStorage persistence"
4. Watch it execute multi-step edits

**What to show:**
- Plan mode reviews the approach before edits; Agent implements
- Agent can modify multiple parts of the file and run commands
- Checkpoints let you roll back (still commit with git)

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
