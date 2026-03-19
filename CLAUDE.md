# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Course repository for a 6-hour O'Reilly live training on building production applications with Cursor AI IDE. 10 sections, 62 slides, progressive arc: HTML toy app → simple quiz → full AI-powered quiz app → backend/auth/payments → deployment.

This repo is **presenter-facing reference material** — it is NOT the demo project itself. The actual coding demos happen in a separate clone of McKay's App Template (Next.js 15, TypeScript, Tailwind, shadcn/ui, Supabase, Drizzle, Clerk, Stripe).

## Presenter Workflow

Two Cursor windows are used during the live training:

- **Window 1 (this repo):** Section README pinned as dashboard → follow demo-*.md step-by-step → copy prompts from prompts.md
- **Window 2 (McKay's template clone):** Where actual live coding happens

A browser tab runs `presentation/presentation.html` (reveal.js slides) alongside the two Cursor windows.

## Structure

- `sections/01-10/` — Each section folder contains:
  - `README.md` — Section dashboard (slides range, duration, learning goals, demo checklist, talking points)
  - `demo-*.md` — Numbered step-by-step instructions for live demos
  - `prompts.md` — Copy-paste-ready prompts for Cursor demos
  - Additional reference files vary by section (context files, example configs, checklists)
- `presentation/` — reveal.js slides (`presentation.html`), speaker notes (`scripts.md`), PDF export
- `assets-resources/` — Internal reference materials (proposals, outlines, earlier drafts) — not student-facing
- `archive/` — Old course files from the previous 5-section structure (planning docs, setup guides)

## Conventions

- Demo files use numbered steps the presenter follows live
- Prompts files contain copy-paste-ready prompts for Cursor demos
- Section READMEs include timing, learning goals, and demo checklists
- Example files (.mdc rules, .json configs, .ts tests) are illustrative — not meant to be run directly
- Sections build on each other progressively but each section's folder is self-contained for reference

## Key Context

- The single demo project throughout the course is an AI-powered quiz app
- McKay's App Template is the project foundation (not included in this repo — cloned separately)
- The "Hierarchy of Leverage" concept (rules > context > prompts > model capability) is a core teaching point
- The "two-stage workflow" (planning tool for design, Cursor for implementation) is a recurring pattern

