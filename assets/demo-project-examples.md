# Cursor Course - Demo Project Examples

## Project 1: Real-time Todo Application

### Project Structure
```
cursor-todo-app/
├── .cursor/
│   └── rules/
│       ├── architecture.mdc
│       ├── api-standards.mdc
│       ├── frontend-patterns.mdc
│       └── testing.mdc
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── websocket/
│   └── prisma/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── stores/
│   └── public/
├── shared/
│   └── types/
└── tests/
```

### Key Features to Demonstrate
1. **CRUD Operations** - Show AI generating complete REST API
2. **Real-time Updates** - WebSocket implementation
3. **Type Safety** - Shared types between frontend/backend
4. **State Management** - Zustand with optimistic updates
5. **Testing** - Automated test generation

### Example Prompts Sequence

#### 1. Initial Setup
```
"Create a full-stack TypeScript todo application with:
- Express backend with Prisma ORM
- React frontend with Vite
- PostgreSQL database
- Shared types package
- WebSocket support for real-time updates"
```

#### 2. Database Schema
```
"Design a Prisma schema for todos with:
- User authentication
- Todo items with title, description, status, priority
- Tags for categorization
- Timestamps and soft deletes"
```

#### 3. API Implementation
```
"Implement REST API endpoints for todos with:
- Full CRUD operations
- Zod validation
- Proper error handling
- Pagination support
- Authentication middleware"
```

#### 4. Real-time Features
```
"Add WebSocket support to broadcast:
- Todo creation/updates/deletion
- User presence
- Optimistic UI updates with conflict resolution"
```

---

## Project 2: E-commerce Dashboard

### Technologies
- Next.js 14 (App Router)
- tRPC for type-safe APIs
- Tailwind CSS + shadcn/ui
- React Query
- Chart.js for analytics

### Features to Build
1. **Product Management**
   - CRUD for products
   - Image upload
   - Inventory tracking

2. **Order Processing**
   - Order listing
   - Status updates
   - Real-time notifications

3. **Analytics Dashboard**
   - Sales charts
   - Customer insights
   - Performance metrics

### Demo Flow
1. Set up project with proper rules
2. Generate database schema
3. Build tRPC API layer
4. Create dashboard components
5. Add real-time features

---

## Project 3: AI-Powered Code Review Tool

### Concept
Build a tool that uses Cursor's AI to review code automatically

### Components
1. **File Watcher**
   - Monitor code changes
   - Trigger reviews

2. **Review Engine**
   - Code quality checks
   - Best practices validation
   - Security scanning

3. **Reporting UI**
   - Review results
   - Suggestions
   - Metrics

### Advanced Cursor Features Used
- Background agents for monitoring
- Custom rules for review criteria
- MCP integration for extended analysis

---

## Quick Demo Snippets

### 1. Project Rules Example
```markdown
# .cursor/rules/architecture.mdc
---
description: Clean architecture principles
type: always
---

Follow these architectural principles:

1. Separation of Concerns
   - Controllers handle HTTP
   - Services contain business logic
   - Repositories handle data access

2. Dependency Injection
   - Use interfaces for dependencies
   - Inject through constructors

3. Error Handling
   - Use custom error classes
   - Centralized error middleware
   - Consistent error responses

Example controller:
\```typescript
export class TodoController {
  constructor(private todoService: ITodoService) {}
  
  async create(req: Request, res: Response) {
    try {
      const todo = await this.todoService.create(req.body);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  }
}
\```
```

### 2. Background Agent Configuration
```json
{
  "backgroundAgent": {
    "enabled": true,
    "features": {
      "codeReview": true,
      "securityScanning": true,
      "performanceHints": true,
      "refactoringSuggestions": true
    },
    "sensitivity": "medium",
    "excludePaths": [
      "node_modules",
      "dist",
      "build"
    ]
  }
}
```

### 3. MCP Server Example
```typescript
// Custom MCP server for company API docs
import { createMCPServer } from '@cursor/mcp';

const server = createMCPServer({
  name: 'company-api',
  version: '1.0.0',
  tools: [
    {
      name: 'getEndpoint',
      description: 'Get API endpoint documentation',
      parameters: {
        endpoint: { type: 'string', required: true }
      },
      handler: async ({ endpoint }) => {
        // Return OpenAPI spec for endpoint
        return apiDocs[endpoint];
      }
    },
    {
      name: 'generateClient',
      description: 'Generate TypeScript client for API',
      handler: async () => {
        // Generate typed client code
        return generateClientCode();
      }
    }
  ]
});
```

### 4. Complex Agent Prompt
```
"Using the planning agent, design a microservices architecture for an e-commerce platform with:
- User service (authentication, profiles)
- Product service (catalog, inventory)
- Order service (cart, checkout, payment)
- Notification service (email, SMS, push)

Consider:
- Service communication patterns
- Data consistency
- Scalability
- Error handling
- Monitoring

Provide:
1. Service boundaries and responsibilities
2. API contracts between services
3. Database design per service
4. Deployment architecture"
```

---

## Pre-Demo Checklist

### Environment Setup
- [ ] PostgreSQL running
- [ ] Node.js 18+ installed
- [ ] Cursor with all features enabled
- [ ] Sample data ready
- [ ] Network connection stable

### Cursor Configuration
- [ ] Background agents enabled
- [ ] MCP servers configured
- [ ] Project rules in place
- [ ] Proper .cursorignore file

### Backup Plans
- [ ] Pre-written code snippets
- [ ] Recorded demo videos
- [ ] Offline documentation
- [ ] Alternative examples

---

## Time-Saving Tips

### Quick Wins
1. **Template Starters**
   ```bash
   # Have these ready
   npx create-vite@latest frontend --template react-ts
   npm init -y && npm i express typescript @types/node
   ```

2. **Database Seeding**
   ```typescript
   // Quick seed script
   const seedData = {
     users: [...],
     todos: [...],
     tags: [...]
   };
   ```

3. **UI Components**
   - Use shadcn/ui for quick, polished components
   - Have Tailwind classes memorized
   - Keep component library bookmarked

### Common Issues & Fixes

1. **Slow Generation**
   - Break into smaller prompts
   - Use specific file references
   - Clear context if needed

2. **Incorrect Output**
   - Add examples to prompt
   - Reference project rules
   - Use step-by-step approach

3. **Demo Failures**
   - Have git commits at each stage
   - Can rollback quickly
   - Explain learning opportunity