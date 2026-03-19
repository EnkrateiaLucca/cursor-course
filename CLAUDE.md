# Cursor Course — O'Reilly Live Training

## What This Is

Course repository for a 6-hour O'Reilly live training on building production applications with Cursor AI IDE. The course has 10 sections across 62 slides, following a progressive arc: HTML toy app → simple quiz → full AI-powered quiz app → backend/auth/payments → deployment.

## Structure

- `sections/01-10` — Each section has a README.md (dashboard), demo-*.md (step-by-step instructions), and prompts.md (copy-paste prompts)
- `presentation/` — Slides (presentation.html) and speaker notes (scripts.md)
- `assets-resources/` — Internal reference materials (not student-facing)
- `archive/` — Old course files from the previous 5-section structure

## Tech Stack (Demo Project)

All demos build on McKay's App Template (Next.js 15, TypeScript, Tailwind, shadcn/ui, Supabase, Drizzle, Clerk, Stripe).

## Conventions

- Demo files use numbered steps the presenter follows live
- Prompts files contain copy-paste-ready prompts for Cursor demos
- Section READMEs include timing, learning goals, and demo checklists
- Example files (.mdc rules, .json configs, .ts tests) are illustrative — not meant to be run directly

## Key Context

- The single demo project throughout the course is an AI-powered quiz app
- McKay's App Template is the project foundation (not included in this repo — cloned separately)
- Sections build on each other progressively but each section's folder is self-contained for reference
