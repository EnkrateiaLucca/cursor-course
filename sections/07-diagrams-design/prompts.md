# Section 07: Prompts

## Generate Architecture Diagram

```
@codebase Create a Mermaid diagram showing the full architecture of this app.
Include: frontend pages, server actions, API routes, database, external services
(Clerk auth, OpenAI, Stripe, Supabase).
Show data flow direction with arrows.
```

## Generate User Flow

```
@codebase Create a Mermaid flowchart showing the complete user journey
from landing page through quiz creation, taking, and results review.
Include decision points (e.g., "signed in?") and all possible paths.
```

## Generate Database ERD

```
@db/schema/ Create a Mermaid Entity Relationship Diagram from these
Drizzle schema files. Show all tables, columns with types,
primary keys, foreign keys, and relationships.
```

## Screenshot → Component

```
[paste screenshot]

Recreate this UI as a React component using:
- Tailwind CSS for styling
- shadcn/ui for interactive elements (buttons, cards, inputs)
- Make it responsive (mobile-first)
- Match the layout, spacing, and visual hierarchy
```

## Iterate on Design

```
@components/quiz-results.tsx Make these changes:
1. Increase spacing between question cards (gap-6)
2. Add a subtle animation when revealing correct answers
3. Make the score circle larger and add a gradient fill
4. Add a confetti animation for scores above 80%
```

## Generate Documentation Diagrams

```
@codebase Generate a set of three Mermaid diagrams for our README:
1. High-level architecture (services and connections)
2. Request flow for quiz generation (step by step)
3. Database schema (ERD)

Format each as a separate markdown code block.
```
