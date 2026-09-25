# Cursor Course - Demo Scripts

## Demo 1: Setting Up Advanced Project Configuration (5 minutes)

### Step-by-Step Script

1. **Create a new project**
   ```bash
   mkdir cursor-todo-app
   cd cursor-todo-app
   npm init -y
   ```

2. **Set up project structure**
   ```
   cursor-todo-app/
   ├── .cursor/
   │   └── rules/
   │       ├── architecture.mdc
   │       ├── api-standards.mdc
   │       └── frontend-patterns.mdc
   ├── backend/
   ├── frontend/
   └── shared/
   ```

3. **Create architecture rule**
   - Open Cursor
   - Create `.cursor/rules/architecture.mdc`
   - Show how to write:
     ```markdown
     ---
     description: Project architecture standards
     type: always
     ---
     
     This is a full-stack TypeScript application using:
     - Backend: Express.js with TypeScript
     - Frontend: React with Vite
     - Database: PostgreSQL with Prisma
     - State Management: Zustand
     - Styling: Tailwind CSS
     
     Follow clean architecture principles:
     - Separate business logic from frameworks
     - Use dependency injection
     - Keep components pure when possible
     ```

4. **Create API standards rule**
   ```markdown
   ---
   description: REST API design standards
   glob: ["**/api/**/*.ts", "**/routes/**/*.ts"]
   type: auto-attached
   ---
   
   API Guidelines:
   - Use RESTful conventions
   - Always validate input with Zod
   - Return consistent error formats
   - Include proper status codes
   
   Example:
   POST /api/todos -> 201 Created
   GET /api/todos/:id -> 200 OK or 404 Not Found
   ```

## Demo 2: Context Management in Action (5 minutes)

### Demonstrate @ Symbols

1. **Basic file reference**
   - Type: "Update the @todoController.ts to add pagination"
   - Show how Cursor understands the file context

2. **Codebase reference**
   - Type: "Based on @codebase, what's our current authentication strategy?"
   - Show Cursor analyzing multiple files

3. **Documentation reference**
   - Type: "Using @docs for Prisma, set up our database schema"
   - Show integration with external docs

4. **Web search integration**
   - Type: "Find @web best practices for React Query v5 and implement data fetching"

### Context Optimization

1. **Show .cursorignore file**
   ```
   node_modules/
   dist/
   build/
   *.log
   .env
   coverage/
   ```

2. **Demonstrate large file handling**
   - Open a large JSON file
   - Show how to reference specific parts

## Demo 3: Working with Agents (7 minutes)

### Chat Agent Workflow

1. **Planning Mode**
   - Prompt: "I need to add a notification system to our todo app. Plan the implementation."
   - Show agent creating detailed plan

2. **Implementation**
   - Follow the plan step-by-step
   - Show how agent maintains context

### Background Agent Demo

1. **Enable background agent**
   - Settings > Features > Background Agent
   - Set to "Active"

2. **Write intentionally problematic code**
   ```typescript
   // Intentionally problematic
   const getTodos = async (userId) => {
     const todos = await db.query(`SELECT * FROM todos WHERE user_id = ${userId}`)
     return todos
   }
   ```

3. **Show background agent suggestions**
   - SQL injection warning
   - Type safety suggestion
   - Error handling recommendation

## Demo 4: Building a Complete Feature (10 minutes)

### Feature: Todo List with Real-time Updates

1. **Start with requirements**
   ```
   Prompt: "Help me build a real-time todo list feature with:
   - CRUD operations
   - Real-time updates using WebSockets
   - Optimistic UI updates
   - Proper error handling
   
   Start by planning the architecture."
   ```

2. **Backend Implementation**
   ```
   Prompt: "Now implement the backend:
   1. Create Prisma schema for todos
   2. Set up Express routes with validation
   3. Add WebSocket support for real-time updates"
   ```

   Show generated:
   - `prisma/schema.prisma`
   - `backend/routes/todos.ts`
   - `backend/websocket/todoEvents.ts`

3. **Frontend Implementation**
   ```
   Prompt: "Create the React frontend:
   1. Todo list component with React Query
   2. WebSocket hook for real-time updates
   3. Optimistic updates with rollback"
   ```

   Show generated:
   - `frontend/components/TodoList.tsx`
   - `frontend/hooks/useWebSocket.ts`
   - `frontend/hooks/useTodos.ts`

4. **Testing**
   ```
   Prompt: "Generate comprehensive tests for:
   1. API endpoints
   2. React components
   3. WebSocket functionality"
   ```

## Demo 5: MCP Installation & Usage (5 minutes)

### Install PostgreSQL MCP Server

1. **Find MCP server**
   - Visit MCP registry
   - Choose PostgreSQL server

2. **Install via Cursor**
   ```
   Settings > Features > MCP Servers
   Add Server > PostgreSQL
   Configure connection string
   ```

3. **Use MCP-enhanced features**
   ```
   Prompt: "Using the connected database, analyze our current schema and suggest optimizations for query performance"
   ```

4. **Show enhanced context**
   - Cursor now understands actual database structure
   - Can suggest indexes based on real queries
   - Provides migration scripts

### Custom MCP Server (Advanced)

1. **Show example custom MCP server**
   ```typescript
   // mcp-server-example.ts
   import { MCPServer } from '@cursor/mcp'
   
   const server = new MCPServer({
     name: 'company-api-docs',
     tools: [{
       name: 'getAPISchema',
       description: 'Get OpenAPI schema',
       handler: async () => {
         // Return company API documentation
       }
     }]
   })
   ```

## Demo Best Practices

### Tips for Smooth Demos

1. **Pre-setup**
   - Have project templates ready
   - Test all commands beforehand
   - Have backup plans for failures

2. **During Demo**
   - Explain what you're typing before you type
   - Pause to show generated code
   - Highlight key features as they appear

3. **Time Management**
   - Each demo has suggested time
   - Skip advanced parts if running late
   - Always leave time for Q&A

### Common Issues & Solutions

1. **Slow generation**
   - Have pre-generated examples ready
   - Explain what's happening during wait

2. **Incorrect output**
   - Show how to refine prompts
   - Demonstrate iterative improvement

3. **Connection issues**
   - Have offline examples prepared
   - Focus on local features if needed