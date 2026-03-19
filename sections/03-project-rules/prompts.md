# Section 03: Prompts

## Create a Project Rule

```
Create a .cursor/rules/react-patterns.mdc file with rules for:
- Functional components only (no class components)
- Props defined with TypeScript interfaces
- Server Components by default
- "use client" only for interactive components
- Use shadcn/ui for all UI elements
Set it to auto-attach for all .tsx files.
```

## Generate AGENTS.md

```
@codebase Generate an AGENTS.md file for this project that describes:
- The project's purpose and architecture
- Key directories and their roles
- Coding standards and conventions
- Database and API patterns
- Testing approach
Keep it concise — under 50 lines.
```

## Test That Rules Work

```
Create a new component called QuizCard that displays a quiz question
with four answer choices. Follow our project rules.
```

> After generating, check: Did it use TypeScript? Functional component? shadcn/ui? Server Component? If yes, the rules are working.

## Ask About Rule Modes

```
What are the four rule application modes in Cursor?
Give me a practical example of when to use each one
for a Next.js quiz application.
```

## When NOT to Use Rules

```
I'm working across 5 different codebases this week.
What's the most efficient way to give Cursor context
without maintaining rules for each project?
```

> Use this to spark the "rules aren't always the answer" discussion.
