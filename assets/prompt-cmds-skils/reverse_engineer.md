---
description: Reverse engineer a project to understand and create implementation plan for replication
model: opus
---

# Reverse Engineer Project

You are tasked with reverse engineering an entire project repository to understand what the application does and generate a comprehensive `PLAN.md` implementation plan that would allow someone to recreate the project from scratch.

## Initial Response

When this command is invoked:

1. **If a path was provided as parameter:**
   - Use that path as the target project directory
   - Begin the analysis immediately

2. **If no path provided:**
   - Use the current working directory
   - Confirm with the user before proceeding

Respond with:
```
I'll reverse engineer this project to understand its architecture and generate a replication plan.

Target: [path or current directory]

Starting comprehensive analysis...
```

## Phase 1: Project Discovery (Parallel)

Spawn multiple sub-agents concurrently to gather initial project intelligence:

### 1.1 Project Identity Agent
```
Analyze the project to determine:
- Project name and purpose (from README, package.json, pyproject.toml, etc.)
- Primary programming language(s)
- Framework(s) used (React, Next.js, FastAPI, Django, etc.)
- Project type (web app, CLI tool, library, API, mobile app, etc.)

Look for: README.md, package.json, pyproject.toml, Cargo.toml, go.mod, pom.xml, build.gradle, Makefile
Return: Structured summary of project identity
```

### 1.2 Dependency Mapper Agent
```
Map all project dependencies:
- Production dependencies with versions
- Development dependencies
- Peer dependencies or optional dependencies
- System requirements (Node version, Python version, etc.)
- External services (databases, APIs, cloud services)

Look for: package.json, requirements.txt, pyproject.toml, Cargo.toml, go.mod, Gemfile, composer.json
Return: Categorized dependency list with purposes where identifiable
```

### 1.3 File Structure Agent
```
Analyze the complete file structure:
- Directory organization pattern (feature-based, layer-based, domain-driven)
- Key directories and their purposes
- Configuration file locations
- Test file organization
- Asset/static file locations

Use: Glob patterns to map the entire structure, LS for directory contents
Return: Annotated directory tree with purpose descriptions
```

### 1.4 Configuration Agent
```
Identify all configuration:
- Environment variables used (.env.example, config files)
- Build configuration (webpack, vite, tsconfig, etc.)
- Deployment configuration (Docker, CI/CD, cloud configs)
- Runtime configuration

Look for: .env*, config/, *.config.js, *.config.ts, tsconfig.json, docker*, .github/
Return: Configuration inventory with descriptions
```

## Phase 2: Architecture Deep Dive (Parallel)

After Phase 1 completes, spawn architecture analysis agents:

### 2.1 Entry Points Agent
```
Find and analyze all entry points:
- Main application entry (main.ts, index.js, app.py, main.go)
- API routes/endpoints
- CLI commands
- Event handlers
- Scheduled jobs/cron

Trace the initialization flow from each entry point.
Return: Entry point map with initialization sequences
```

### 2.2 Data Layer Agent
```
Analyze data management:
- Database schemas (migrations, models, entities)
- ORM/ODM usage patterns
- State management (Redux, Zustand, Context, Vuex)
- Data flow patterns
- Caching strategies

Look for: models/, schemas/, migrations/, store/, state/, database/
Return: Data architecture documentation
```

### 2.3 Business Logic Agent
```
Identify core business logic:
- Services/use cases
- Domain models
- Business rules and validations
- Algorithms and computations
- Integration patterns

Look for: services/, domain/, core/, lib/, utils/, helpers/
Return: Business logic inventory with descriptions
```

### 2.4 UI/Presentation Agent (if applicable)
```
Analyze UI architecture:
- Component hierarchy
- Routing structure
- Layout patterns
- Styling approach (CSS modules, Tailwind, styled-components)
- State-to-UI bindings

Look for: components/, pages/, views/, layouts/, styles/
Return: UI architecture documentation
```

### 2.5 API/Integration Agent
```
Map external integrations:
- REST/GraphQL API definitions
- Third-party service integrations
- Webhook handlers
- Message queue consumers/producers
- File upload/download handlers

Look for: api/, routes/, handlers/, integrations/, webhooks/
Return: Integration map with protocols and patterns
```

## Phase 3: Pattern Recognition (Parallel)

### 3.1 Design Patterns Agent
```
Identify design patterns used:
- Architectural patterns (MVC, MVVM, Clean Architecture, Hexagonal)
- Creational patterns (Factory, Singleton, Builder)
- Structural patterns (Adapter, Facade, Decorator)
- Behavioral patterns (Observer, Strategy, Command)
- Domain patterns (Repository, Unit of Work, Aggregate)

Return: Pattern inventory with examples from codebase
```

### 3.2 Code Conventions Agent
```
Document coding conventions:
- Naming conventions (files, variables, functions, classes)
- Code organization within files
- Import/export patterns
- Error handling patterns
- Logging patterns
- Comment/documentation style

Return: Convention guide with examples
```

### 3.3 Testing Patterns Agent
```
Analyze testing approach:
- Test framework(s) used
- Test organization
- Testing patterns (unit, integration, e2e)
- Mocking strategies
- Test data management
- Coverage expectations

Look for: __tests__/, test/, *.test.*, *.spec.*, jest.config.*, vitest.config.*
Return: Testing strategy documentation
```

## Phase 4: Feature Extraction

### 4.1 Feature Inventory Agent
```
List all user-facing features:
- Core features (what the app primarily does)
- Secondary features (supporting functionality)
- Admin features
- Authentication/authorization features
- Settings/configuration features

For each feature, identify:
- Entry point (route, command, button)
- Components involved
- Data requirements
- External dependencies

Return: Prioritized feature list with implementation complexity estimates
```

## Phase 5: Synthesis and Plan Generation

After all agents complete, synthesize findings into `PLAN.md`:

1. **Wait for all sub-agents to complete**
2. **Cross-reference findings** to identify:
   - Core vs peripheral components
   - Critical path for MVP
   - Dependencies between features
   - Build order requirements

3. **Generate PLAN.md** with this structure:

```markdown
# [Project Name] - Implementation Plan

> Reverse-engineered implementation plan for recreating [Project Name]
> Generated: [Date]
> Source: [Repository/Path]

## Executive Summary

[2-3 paragraph overview of what the application does and its core value proposition]

## Technology Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| [Tech] | [Version] | [Why it's used] |

### Development Dependencies
[List with purposes]

### External Services
[List with purposes and alternatives]

## Architecture Overview

### High-Level Architecture
[Describe the overall architecture pattern]

```
[ASCII diagram of architecture]
```

### Key Architectural Decisions
1. [Decision] - [Rationale inferred from code]
2. ...

## Project Structure

```
[Annotated directory tree]
```

### Directory Purposes
| Directory | Purpose |
|-----------|---------|
| src/ | [Purpose] |
| ... | ... |

## Data Architecture

### Data Models
[List each model with fields and relationships]

### State Management
[How application state is managed]

### Database Schema
[Schema overview or migrations list]

## Implementation Phases

### Phase 0: Project Setup
**Goal**: Initialize project with all tooling configured

**Steps**:
1. Initialize project with [package manager]
2. Install core dependencies
3. Configure [build tool]
4. Set up [linting/formatting]
5. Configure [testing framework]
6. Create directory structure

**Success Criteria**:
- [ ] Project builds without errors
- [ ] Linting passes
- [ ] Test runner works
- [ ] Development server starts

### Phase 1: Foundation Layer
**Goal**: Implement core infrastructure

**Components**:
- [ ] [Component 1] - [Brief description]
- [ ] [Component 2] - [Brief description]

**Key Files to Create**:
- `path/to/file.ts` - [Purpose]

**Success Criteria**:
- [ ] [Testable criterion]

### Phase 2: Data Layer
**Goal**: Implement data models and persistence

[Similar structure...]

### Phase 3: Core Features
**Goal**: Implement primary functionality

**Feature: [Feature Name]**
- Components needed: [list]
- Data requirements: [list]
- Dependencies: [Phase X must be complete]

[Continue for each feature...]

### Phase 4: Secondary Features
[Additional features...]

### Phase 5: Polish and Production
**Goal**: Production readiness

- [ ] Error handling
- [ ] Logging
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Documentation

## API Reference

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | /api/... | [Purpose] |

### Events/Messages
[If applicable]

## Configuration Reference

### Environment Variables
| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| [VAR] | Yes/No | [Purpose] | [Example] |

### Build Configuration
[Key configuration options]

## Testing Strategy

### Test Types
- Unit tests: [approach]
- Integration tests: [approach]
- E2E tests: [approach]

### Running Tests
```bash
[Commands]
```

## Deployment

### Build Process
```bash
[Commands]
```

### Deployment Options
[Inferred deployment approaches]

## Appendix

### Code Patterns Used
[Quick reference of patterns found in codebase]

### Potential Improvements
[Observations about possible enhancements - optional section]

### Original File References
[Key files to study for implementation details]
```

## Output Location

Write the plan to: `PLAN.md` in the project root (or specified output directory)

## Important Guidelines

1. **Be Comprehensive**: Capture enough detail that someone unfamiliar with the project could recreate it
2. **Be Accurate**: Only document what you observe, don't make assumptions
3. **Be Practical**: Order phases by dependency - each phase should build on the previous
4. **Be Specific**: Include actual file paths, actual dependency versions, actual configuration
5. **Identify Patterns**: Note reusable patterns that appear throughout the codebase
6. **Estimate Complexity**: Help readers understand relative complexity of components
7. **Preserve Intent**: Try to capture not just WHAT but WHY decisions were made

## Progress Updates

Use TodoWrite to track progress through phases:
- Phase 1: Project Discovery
- Phase 2: Architecture Deep Dive
- Phase 3: Pattern Recognition
- Phase 4: Feature Extraction
- Phase 5: Plan Generation

Provide status updates after each phase completes.

## Final Output

After writing PLAN.md:

```
Reverse engineering complete!

I've analyzed [X files] across [Y directories] and generated a comprehensive implementation plan.

## Key Findings:
- **Project Type**: [type]
- **Tech Stack**: [primary technologies]
- **Architecture**: [pattern]
- **Features**: [count] features identified
- **Phases**: [count] implementation phases

## Plan Location:
`PLAN.md`

## Recommended Next Steps:
1. Review the plan for accuracy
2. Adjust phase ordering if needed
3. Add any missing domain knowledge
4. Begin implementation with Phase 0

Would you like me to explain any part of the analysis in more detail?
```
