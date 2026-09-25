# Cursor AI IDE: Building Production Applications

> **O'Reilly Live Training** — 6 hours, 8 sections, 57 slides (65 deck pages with incremental builds)
> Master AI-assisted development by building a full-stack AI quiz app from scratch using Cursor, MCP, and modern tooling.

**Instructor:** Lucas Soares ([@EnkrateiaLucca](https://github.com/EnkrateiaLucca))

---

## Course Arc

```
Cursor interface (modes + rules + MCP) → Explore-Plan-Build simple app → Full AI quiz app → Backend/Auth/Payments → Deployment
```

All demos from Section 02 onward build on **McKay's App Template** as the single project foundation.

---

## Sections

| # | Section | Duration | Key Topics |
|---|---------|----------|------------|
| 01 | [Cursor Intro](sections/01-cursor-intro/) | ~95 min | Agent modes (Agent/Ask/Plan/Debug), Inline Edit, Tab, Project Rules, MCP |
| 02 | [Explore-Plan-Build](sections/02-explore-plan-build/) | ~45 min | Framework, @ symbols, context files, simple HTML/JS / quiz app |
| 03 | [AI Quiz App Build](sections/03-ai-quiz-app/) | ~60 min | Full AI quiz build, context file, two-stage workflow |
| 04 | [Testing](sections/04-testing/) | ~20 min | TDD, unit/component/E2E tests |
| 05 | [Diagrams & Design](sections/05-diagrams-design/) | ~30 min | Mermaid diagrams, Figma/sketch to code |
| 06 | [Backend/Auth/Payments](sections/06-backend-auth-payments/) | ~45 min | Supabase, Drizzle, Clerk, Stripe, Server Actions |
| 07 | [Deployment](sections/07-deployment/) | ~30 min | Vercel, env vars, production checklist |
| 08 | [Finishing](sections/08-finishing/) | ~15 min | Recap, resources, troubleshooting |

**Total: ~6 hours (including breaks)**

> **Restructure note:** Former Sections 03 (Project Rules) and 04 (MCP & Tooling) are now Part B and Part C of [Section 01](sections/01-cursor-intro/). Content lives under `sections/01-cursor-intro/project-rules/` and `sections/01-cursor-intro/mcp-and-tooling/`.

---

## Prerequisites

See **[SETUP.md](SETUP.md)** for the complete pre-course checklist.

**Quick version:**
- Cursor IDE installed
- Node.js 20+
- Accounts: GitHub (with PAT), Supabase, Vercel, Clerk, Stripe, Anthropic, OpenAI, or DeepSeek
- McKay's App Template cloned

---

## Repo Structure

```
cursor-course/
├── README.md                    ← You are here
├── SETUP.md                     ← Pre-course checklist
├── cursor-explainer.html        ← Handout: "What is Cursor?" quick guide
├── presentation/                ← Slides and speaker notes
│   ├── scripts.md               ← 8-section speaker notes
│   ├── presentation.html
│   └── cursor-for-modern-dev.pdf
├── assets/                      ← Student-facing handouts
│   ├── cursor-course-cheatsheet.html ← Course cheatsheet (source)
│   ├── cursor-course-cheatsheet.pdf  ← Printable course cheatsheet
│   └── cursor-explainer.pdf     ← Printable "What is Cursor?" handout
├── sections/                    ← Section-by-section content
│   ├── 01-cursor-intro/         ← includes project-rules/ + mcp-and-tooling/
│   ├── 02-explore-plan-build/
│   ├── 03-ai-quiz-app/
│   ├── 04-testing/
│   ├── 05-diagrams-design/
│   ├── 06-backend-auth-payments/
│   ├── 07-deployment/
│   └── 08-finishing/
├── assets/                      ← Handouts + reference materials
└── archive/                     ← Old course files
```

---

## Presenter Navigation

```
Browser Tab: presentation.html (slides)
    │
    ├─→ Cursor Window 1: course repo
    │   └─→ sections/XX/README.md (pinned — section dashboard)
    │       ├─→ demo-*.md (follow step by step)
    │       └─→ prompts.md (copy-paste into live demo)
    │
    └─→ Cursor Window 2: live demo project (McKay's template clone)
        └─→ This is where actual coding happens
```

---

## Tech Stack (Demo Project)

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL) + Drizzle ORM
- **Auth:** Clerk
- **Payments:** Stripe
- **AI:** Anthropic / OpenAI / DeepSeek API
- **Testing:** Vitest + Playwright
- **Deployment:** Vercel

---

## Resources

### Handouts in this repo (share with students)

- **[Course Cheatsheet (PDF)](assets/cursor-course-cheatsheet.pdf)** — 4‑page printable quick reference for the whole course: Cursor modes and shortcuts, @ symbols, project rules, MCP, the build workflow, env vars, the production checklist and free‑tier limits. Source: [HTML](assets/cursor-course-cheatsheet.html).
- **[Cursor Quick Guide](cursor-explainer.html)** — standalone "What is Cursor?" explainer: the four ways to work with AI, the explore‑plan‑build workflow, and tips. Open in a browser; good pre‑reading or a break‑time link.
- **[Cursor Quick Guide (PDF)](assets/cursor-explainer.pdf)** — the same guide as a 6‑page printable handout. This is the version sent to O'Reilly for attendees.

### External docs

- [Cursor Docs](https://docs.cursor.com/)
- [Agent mode](https://cursor.com/help/ai-features/agent)
- [Rules](https://cursor.com/docs/rules)
- [MCP](https://cursor.com/docs/context/mcp)
- [McKay's App Template](https://github.com/mckaywrigley/mckays-app-template)
- [MCP Servers Registry](https://github.com/modelcontextprotocol/servers)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

## License

This course material is proprietary and intended for O'Reilly live training participants. Please do not redistribute without permission.
