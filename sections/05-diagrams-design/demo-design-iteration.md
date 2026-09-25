# Demo: Sketch/Design → Code Workflow

**Goal:** Show how to turn a visual design reference (sketch, screenshot, Figma) into working code using Cursor.

---

## Approach 1: Screenshot → Code

### Step 1: Take a screenshot

- Screenshot a UI you like (a landing page, a dashboard, a component)
- Or use a hand-drawn wireframe on paper, photographed with your phone

### Step 2: Paste into Cursor

1. Open Agent mode
2. Paste the image directly into the chat
3. Prompt:

```
Look at this design. Create a React component that matches this layout.
Use Tailwind CSS and shadcn/ui components.
Make it responsive (mobile-first).
Match the visual style as closely as possible.
```

### Step 3: Iterate

```
The spacing between cards needs to be larger.
The header text should be bolder.
Add a subtle gradient background matching the reference.
```

## Approach 2: Figma MCP (Advanced)

If Figma MCP is configured:

```
Using the Figma MCP, read the design at [Figma URL].
Extract the design tokens (colors, spacing, typography).
Generate a React component that matches the Figma design exactly.
```

## Approach 3: Description → Design

No visual reference needed:

```
Design a quiz results page that shows:
- A large score circle at the top (animated fill)
- A summary row: correct/incorrect/total
- A scrollable list of questions with expand/collapse
- Green checkmarks for correct, red X for incorrect
- A "Share Results" button at the bottom

Make it visually appealing with subtle animations.
Use our existing design system (Tailwind + shadcn/ui).
```

## What to Emphasize

- AI understands visual context — you can paste images directly
- The sketch → code workflow removes the "design gap" for developers
- Iteration is key: first pass gets ~70% right, 2-3 iterations get to 95%
- Combine with Playwright MCP to verify the result visually

## Timing

- Screenshot → code demo: ~10 min
- Iteration + polish: ~10 min
- Discussion: ~5 min
