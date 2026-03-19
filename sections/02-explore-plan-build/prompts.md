# Section 02: Prompts

## Creating the plan file with Claude code:

```I want to create a quiz app where students can upload a structured file like a .json or a markdown file and do an interactive quiz on    
                                                                          
    the browser. I want to use the template from this repo I like:  
  https://github.com/mckaywrigley/mckays-app-template right now your      
  output should be a PLAN.md file with the planning structure for the     
  full app following the structure inside                                 
  @sections/02-explore-plan-build/context-file-template.md```

## Explore: Understanding a Codebase

```
@codebase What is the overall architecture of this project?
What framework does it use, and how are files organized?
```

```
@codebase Where is the main layout defined? How does routing work?
```

```
@codebase What UI component library does this project use?
Show me examples of how components are imported and used.
```

## Explore: @ Symbol Demos

### @file — Reference a specific file
```
@app/page.tsx Explain what this page does and how it's structured.
```

### @folder — Reference a directory
```
@components/ What components exist in this folder? Give me a summary of each.
```

### @codebase — Semantic search
```
@codebase Where is authentication handled in this project?
```

### @docs — Query documentation
```
@docs How do I create a new page in Next.js App Router?
```

### @web — Search the web
```
@web What are the latest best practices for Next.js Server Actions in 2025?
```

## Plan: Quiz Page Architecture

```
@codebase I want to add a quiz feature to this app.

Before writing any code, help me plan:
1. What files need to be created?
2. What existing components can we reuse?
3. What's the data flow for a quiz session?
4. Where should quiz state be managed?

Don't write code yet — just create a clear plan.
```

## Build: Simple Quiz Implementation

```
@codebase Create a quiz page at /quiz with these requirements:
- Display one question at a time with 4 multiple choice answers
- Track the user's score
- Show a results screen at the end
- Use 5 hardcoded web development questions
- Follow the existing component patterns in this project
- Use the existing UI components (buttons, cards, etc.)
```

## Iterate: Polish the Quiz

```
@app/quiz/page.tsx Add a progress bar showing which question
the user is on (e.g., "Question 3 of 5").
Use the existing design system.
```

```
@app/quiz/page.tsx The results screen should show which questions
were answered correctly vs incorrectly, with the correct answers revealed.
```
