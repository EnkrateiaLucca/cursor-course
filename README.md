# Cursor AI IDE: Building Production Applications

> **O'Reilly Live Training** — 6 hours, 10 sections, 62 slides
> Master AI-assisted development by building a full-stack AI quiz app from scratch using Cursor, MCP, and modern tooling.

**Instructor:** Lucas Soares ([@EnkrateiaLucca](https://github.com/EnkrateiaLucca))

---

## Course Arc

```
HTML toy app → Simple quiz (no AI) → Full AI-powered quiz app → Backend/Auth/Payments → Deployment
```

All demos build on **McKay's App Template** as the single project foundation.

---

## Sections

| # | Section | Duration | Key Topics |
|---|---------|----------|------------|
| 01 | [Cursor Intro](sections/01-cursor-intro/) | ~45 min | Chat, Agent, Inline Edit, Tab, first HTML app |
| 02 | [Explore-Plan-Build](sections/02-explore-plan-build/) | ~45 min | Framework, @ symbols, context files, simple quiz |
| 03 | [Project Rules](sections/03-project-rules/) | ~20 min | .cursor/rules, AGENTS.md, CLAUDE.md |
| 04 | [MCP & Tooling](sections/04-mcp-and-tooling/) | ~30 min | MCP protocol, Playwright, CLI vs MCP |
| 05 | [AI Quiz App Build](sections/05-ai-quiz-app/) | ~60 min | Full AI quiz build, context file, two-stage workflow |
| 06 | [Testing](sections/06-testing/) | ~20 min | TDD, unit/component/E2E tests |
| 07 | [Diagrams & Design](sections/07-diagrams-design/) | ~30 min | Mermaid diagrams, Figma/sketch to code |
| 08 | [Backend/Auth/Payments](sections/08-backend-auth-payments/) | ~45 min | Supabase, Drizzle, Clerk, Stripe, Server Actions |
| 09 | [Deployment](sections/09-deployment/) | ~30 min | Vercel, env vars, production checklist |
| 10 | [Finishing](sections/10-finishing/) | ~15 min | Recap, resources, troubleshooting |

**Total: ~6 hours (including breaks)**

---

## Prerequisites

See **[SETUP.md](SETUP.md)** for the complete pre-course checklist.

**Quick version:**
- Cursor IDE installed
- Node.js 20+
- Accounts: GitHub (with PAT), Supabase, Vercel, Clerk, Stripe, OpenAI or DeepSeek
- McKay's App Template cloned

---

## Repo Structure

```
cursor-course/
├── README.md                    ← You are here
├── SETUP.md                     ← Pre-course checklist
├── CLAUDE.md                    ← AI assistant context
├── presentation/                ← Slides and speaker notes
│   ├── scripts.md               ← 10-section speaker notes
│   ├── presentation.html
│   └── cursor-for-modern-dev.pdf
├── sections/                    ← Section-by-section content
│   ├── 01-cursor-intro/
│   ├── 02-explore-plan-build/
│   ├── 03-project-rules/
│   ├── 04-mcp-and-tooling/
│   ├── 05-ai-quiz-app/
│   ├── 06-testing/
│   ├── 07-diagrams-design/
│   ├── 08-backend-auth-payments/
│   ├── 09-deployment/
│   └── 10-finishing/
├── assets-resources/            ← Internal reference materials
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
- **AI:** OpenAI / DeepSeek API
- **Testing:** Vitest + Playwright
- **Deployment:** Vercel

---

## Resources

- [Cursor Docs](https://docs.cursor.com/)
- [McKay's App Template](https://github.com/mckaywrigley/mckays-app-template)
- [MCP Servers Registry](https://github.com/modelcontextprotocol/servers)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

## License

This course material is proprietary and intended for O'Reilly live training participants. Please do not redistribute without permission.
