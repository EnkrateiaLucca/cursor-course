# Cursor AI IDE Course - Presentation Slides Structure

## Slide Deck Overview
- **Total Slides**: ~30-35 slides
- **Duration**: 45 minutes
- **Format**: Technical presentation with live coding elements

---

## Section 1: Introduction (Slides 1-4) - 5 minutes

### Slide 1: Title Slide
- **Cursor AI IDE: Building Full Applications with Advanced Features**
- Instructor name
- Course objectives

### Slide 2: Who This Course Is For
- Experienced Cursor users ready to level up
- Developers building production applications
- Teams wanting to maximize AI-assisted development

### Slide 3: What We'll Cover Today
- Advanced context management
- Project rules as your AI playbook
- Agents & background agents
- Model Context Protocol (MCP)
- Building complete applications

### Slide 4: Cursor in 30 Seconds
- AI-powered code editor
- Understands your entire codebase
- Natural language → Working code
- [Visual: Cursor interface screenshot]

---

## Section 2: Advanced Context Management (Slides 5-10) - 10 minutes

### Slide 5: The Power of Context
- Why context matters in AI coding
- Token limits and optimization
- [Diagram: Context window visualization]

### Slide 6: Codebase Indexing
- How Cursor analyzes your project
- Indexing strategies for performance
- [Visual: File tree with indexing indicators]

### Slide 7: Mastering @ Symbols
- `@codebase` - Full project awareness
- `@docs` - Documentation integration  
- `@web` - Live web search
- `@[custom]` - Project-specific contexts
- [Visual: @ symbol examples in action]

### Slide 8: Context Optimization Strategies
- Using .cursorignore effectively
- Chunking large files
- Prioritizing relevant context
- [Code example: .cursorignore file]

### Slide 9: Multi-File Context
- Referencing multiple files simultaneously
- Cross-file refactoring
- [Visual: Multiple file references in prompt]

### Slide 10: Context Best Practices
- ✅ Be specific with references
- ✅ Use ignore patterns wisely
- ✅ Leverage codebase search
- ❌ Don't include everything

---

## Section 3: Project Rules (Slides 11-16) - 10 minutes

### Slide 11: Project Rules Introduction
- Persistent AI instructions
- Located in `.cursor/rules/*.mdc`
- Your AI's behavioral playbook
- [Visual: Rules file structure]

### Slide 12: Rule Types
- **Always**: Core standards
- **Auto Attached**: File-specific  
- **Agent Requested**: AI-initiated
- **Manual**: On-demand
- [Diagram: Rule type hierarchy]

### Slide 13: Anatomy of a Rule
```markdown
---
description: REST API standards
glob: ["**/api/**/*.ts"]
type: auto-attached
---

Rule content here...
```

### Slide 14: Effective Rule Examples
- Architecture decisions
- Coding standards
- Domain knowledge
- Security requirements
- [Code: Real rule examples]

### Slide 15: Rule Best Practices
- Keep under 500 lines
- Use concrete examples
- Split by concern
- Version control rules
- [Visual: Good vs Bad rules]

### Slide 16: Rules in Action
- Live demo preview
- How rules affect AI behavior
- [Screenshot: AI following rules]

---

## Section 4: Agents & Background Agents (Slides 17-22) - 10 minutes

### Slide 17: Agent Ecosystem
- Chat Agents
- Inline Agents  
- Background Agents
- [Diagram: Agent types and interactions]

### Slide 18: Agent Modes
- **Planning**: Architecture & design
- **Review**: Code quality
- **Tools**: External integrations
- [Visual: Mode selector UI]

### Slide 19: Chat Agent Capabilities
- Interactive development
- Multi-step planning
- Context-aware suggestions
- [Screenshot: Chat agent conversation]

### Slide 20: Background Agents
- Continuous monitoring
- Real-time suggestions
- Performance optimization
- Security scanning
- [Visual: Background agent notifications]

### Slide 21: Configuring Agents
- Settings and preferences
- Custom behaviors
- Performance tuning
- [Screenshot: Agent settings panel]

### Slide 22: Agent Orchestration
- Chaining agents for complex tasks
- Agent collaboration patterns
- [Diagram: Agent workflow]

---

## Section 5: Model Context Protocol (Slides 23-25) - 5 minutes

### Slide 23: What is MCP?
- Advanced context management
- Extends Cursor capabilities
- Custom tool integration
- [Diagram: MCP architecture]

### Slide 24: MCP Servers
- Database awareness
- API documentation
- Custom domain tools
- [Visual: MCP server examples]

### Slide 25: Installing & Using MCP
- Server discovery
- Installation process
- Configuration
- [Screenshot: MCP setup]

---

## Section 6: Building Full Applications (Slides 26-30) - 5 minutes

### Slide 26: Development Workflow
- Project initialization
- Architecture planning
- Iterative development
- Testing & deployment
- [Diagram: Development cycle]

### Slide 27: Full-Stack Patterns
- Database design with AI
- API development
- Frontend generation
- [Visual: Full-stack architecture]

### Slide 28: Real Project Structure
```
my-app/
├── .cursor/rules/
├── backend/
├── frontend/
├── shared/
└── tests/
```

### Slide 29: Demo Preview
- What we'll build
- Technologies used
- Key features
- [Screenshot: Final app]

### Slide 30: Key Takeaways
- Rules = Consistent AI behavior
- Agents = Continuous assistance
- Context = Maximized effectiveness
- MCP = Extended capabilities

---

## Slide Design Guidelines

### Visual Style
- Clean, modern design
- Cursor brand colors (dark theme)
- Code examples with syntax highlighting
- Diagrams for complex concepts

### Typography
- Headers: 32-40pt bold
- Body: 20-24pt regular
- Code: 18-20pt monospace

### Layout Principles
- Minimal text per slide
- Visual examples preferred
- Progressive disclosure
- Clear hierarchy

### Interactive Elements
- Live code snippets
- Animated diagrams
- Demo transition slides
- Q&A prompts