# Demo: Mermaid Diagrams in Cursor

**Goal:** Generate architecture and flow diagrams from the quiz app codebase using Cursor.

---

## Step 1: Generate Architecture Diagram

Ask Cursor to analyze the codebase and create a diagram:

```
@codebase Create a Mermaid architecture diagram showing:
- The main components of this application
- How data flows between frontend, API, database, and AI service
- The authentication layer

Output as a Mermaid diagram in a code block.
```

**What to show:**
- Cursor analyzes actual code structure, not guessing
- The diagram reflects your real architecture

## Step 2: Preview the Diagram

Options for previewing:
1. **Mermaid Preview extension** in Cursor/VS Code
2. **mermaid.live** — paste the diagram code
3. **GitHub** — Mermaid renders natively in markdown files

## Step 3: Generate User Flow Diagram

```
@codebase Create a Mermaid flowchart showing the complete user journey:
1. User lands on homepage
2. Signs in with Clerk
3. Creates a new quiz (uploads material)
4. AI generates questions
5. User takes the quiz
6. Views results
7. Can retake or create new quiz

Use clear labels and decision points.
```

## Step 4: Generate Database ERD

```
@db/schema/ Create a Mermaid Entity Relationship Diagram (ERD)
from the actual database schema files.
Show all tables, columns, and relationships.
```

**What to show:**
- The diagram matches the actual Drizzle schema
- It's auto-generated from code, not manually maintained

## Step 5: Iterate on the Diagram

```
Update the architecture diagram to also show:
- The Stripe payment flow
- The Vercel deployment target
- MCP connections (Playwright, GitHub)
```

## Timing

- Architecture diagram: ~10 min
- User flow + ERD: ~10 min
- Design iteration demo: ~10 min
