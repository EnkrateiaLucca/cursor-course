# Cursor AI IDE Advanced Course: Building Production Applications
## Complete Course Proposal

---

# Section 1: Advanced Features & Building Full Apps
## 45-Minute Presentation + Demo

### Course Overview
This section introduces experienced Cursor users to advanced features and demonstrates how to build complete applications using Cursor's AI capabilities.

---

## Part 1: Presentation (45 minutes)

### 1. Introduction & Context (5 minutes)
- **Quick Cursor Refresher**
  - AI-powered code editor that understands your codebase
  - Natural language to code generation
  - Multi-language and framework support
  
- **Today's Focus**
  - Moving beyond basic completions
  - Building production-ready applications
  - Leveraging advanced AI features for rapid development

### 2. Advanced Context Management (10 minutes)
- **Codebase Indexing**
  - How Cursor analyzes your entire project
  - Optimizing indexing for large codebases
  - Using ignore files strategically
  
- **"@" Symbol Mastery**
  - `@codebase` - Reference entire project context
  - `@docs` - Include documentation
  - `@web` - Search and include web results
  - Custom @ symbols for project-specific contexts
  
- **Context Windows**
  - Understanding token limits
  - Strategies for managing large contexts
  - Prioritizing relevant information

### 3. Project Rules: Your AI's Playbook (10 minutes)
- **Understanding Project Rules**
  - Location: `.cursor/rules/*.mdc` files
  - Persistent instructions that guide AI behavior
  
- **Rule Types & When to Use Them**
  - "Always" rules - Core project standards
  - "Auto Attached" rules - File-specific guidance
  - "Agent Requested" rules - AI-initiated context
  - "Manual" rules - On-demand guidance
  
- **Best Practices**
  - Keep rules under 500 lines
  - Use concrete examples
  - Split by concern (styling, architecture, domain)
  - Version control your rules
  
- **Example Rules**
  ```markdown
  # .cursor/rules/api-standards.mdc
  ---
  description: REST API design standards
  glob: ["**/api/**/*.ts", "**/routes/**/*.ts"]
  ---
  
  Always use:
  - RESTful naming conventions
  - Proper HTTP status codes
  - Input validation with Zod
  - Error handling middleware
  
  Example endpoint:
  ```

### 4. Agents & Background Agents (10 minutes)
- **Agent Types**
  - Chat Agents - Interactive coding assistance
  - Inline Agents - Direct code manipulation
  - Background Agents - Continuous monitoring
  
- **Agent Modes**
  - Planning Mode - Architecture and design
  - Review Mode - Code quality checks
  - Tools Mode - Integration with external tools
  
- **Background Agents**
  - Continuous code improvement
  - Real-time error detection
  - Performance optimization suggestions
  - Security vulnerability scanning
  
- **Configuring Agents**
  - Custom agent behaviors
  - Agent chaining for complex tasks
  - Performance tuning

### 5. Model Context Protocol (MCP) (5 minutes)
- **What is MCP?**
  - Advanced context management protocol
  - Extends Cursor's AI capabilities
  - Custom tool integration
  
- **Installing MCP Servers**
  - Finding compatible MCP servers
  - Installation process
  - Configuration and setup
  
- **Use Cases**
  - Database schema awareness
  - API documentation integration
  - Custom domain knowledge

### 6. Building Full Applications (5 minutes)
- **Development Workflow**
  - Project initialization with AI
  - Architecture planning with agents
  - Iterative development cycles
  - Testing and deployment
  
- **Real-World Patterns**
  - Full-stack application structure
  - Database design with AI
  - API development patterns
  - Frontend component generation

---

## Part 2: Live Demo (Time as needed)

### Demo 1: Setting Up Advanced Project Configuration
1. **Initialize a new full-stack project**
   - Create project structure
   - Set up `.cursor/rules` directory
   
2. **Create project rules**
   - Architecture rules
   - Coding standards
   - Domain-specific knowledge

### Demo 2: Context Management in Action
1. **Demonstrate @ symbols**
   - Reference multiple files
   - Include web documentation
   - Cross-reference codebase
   
2. **Show context optimization**
   - Managing large files
   - Strategic use of ignore patterns

### Demo 3: Working with Agents
1. **Chat Agent workflow**
   - Planning a new feature
   - Implementing with guidance
   
2. **Background Agent setup**
   - Enable continuous monitoring
   - Review suggestions in real-time

### Demo 4: Building a Complete Feature
1. **Start with requirements**
   - Use planning agent for architecture
   
2. **Implement backend**
   - Database schema
   - API endpoints
   - Business logic
   
3. **Build frontend**
   - Component generation
   - State management
   - API integration
   
4. **Testing & refinement**
   - Generate tests
   - Performance optimization

### Demo 5: MCP Installation & Usage
1. **Install an MCP server**
   - Choose appropriate server
   - Configure settings
   
2. **Use MCP-enhanced features**
   - Show improved context awareness
   - Demonstrate custom tools

---

## Key Takeaways
- Project rules are your secret weapon for consistent AI behavior
- Background agents provide continuous improvement
- Strategic context management maximizes AI effectiveness
- MCP extends Cursor beyond standard capabilities
- Building full apps requires thoughtful AI orchestration

## Resources
- Cursor Documentation: https://docs.cursor.com/
- Project Rules Best Practices
- MCP Server Registry
- Example Projects Repository

---

# Section 2: Building Your First Full App with Cursor
## 60-Minute Hands-On Workshop

### Section Overview
Transform from Cursor user to Cursor app builder. Create a complete todo application with real-time features, demonstrating practical AI-driven development workflows.

---

## Part 1: Project Setup & Architecture (15 minutes)

### 1. AI-Driven Project Initialization
- **Using Cursor to Bootstrap**
  ```
  "Create a modern todo app with:
  - Vanilla JS for simplicity
  - Local storage for persistence
  - Clean, responsive design
  - Modular architecture"
  ```
  
- **Project Structure Generation**
  - Let AI suggest optimal file organization
  - Review and refine structure
  - Setting up initial project rules

### 2. Creating Project Rules for Todo App
- **Architecture Rules**
  ```markdown
  # .cursor/rules/architecture.mdc
  ---
  description: Todo app architecture standards
  glob: ["**/*.js", "**/*.html", "**/*.css"]
  ---
  
  Follow these patterns:
  - Separate concerns: DOM manipulation, data management, storage
  - Use ES6 modules for organization
  - Event-driven architecture
  - Pure functions where possible
  ```

- **Styling Rules**
  ```markdown
  # .cursor/rules/styling.mdc
  ---
  description: CSS and design patterns
  glob: ["**/*.css", "**/*.html"]
  ---
  
  Design principles:
  - Mobile-first responsive design
  - CSS Grid for layouts
  - CSS custom properties for theming
  - BEM naming convention
  - Smooth transitions and animations
  ```

---

## Part 2: Core Feature Development (30 minutes)

### 1. Building the Data Layer
- **Prompt Engineering for Storage Module**
  ```
  "@architecture.mdc Create a storage module that:
  - Handles todo CRUD operations
  - Uses localStorage with fallback
  - Includes data validation
  - Exports clean API"
  ```

- **Generated Code Structure**
  ```javascript
  // storage.js
  export class TodoStorage {
    constructor() {
      this.storageKey = 'todos';
      this.todos = this.load();
    }
    
    load() { /* AI-generated implementation */ }
    save() { /* AI-generated implementation */ }
    create(todo) { /* AI-generated implementation */ }
    update(id, updates) { /* AI-generated implementation */ }
    delete(id) { /* AI-generated implementation */ }
    getAll() { /* AI-generated implementation */ }
  }
  ```

### 2. UI Component Generation
- **Using Context for Component Creation**
  ```
  "@storage.js @styling.mdc Create a TodoList component that:
  - Renders todos with proper state
  - Handles user interactions
  - Updates UI reactively
  - Includes animations"
  ```

- **Component Architecture**
  ```javascript
  // todoList.js
  export class TodoList {
    constructor(storage, container) {
      this.storage = storage;
      this.container = container;
      this.init();
    }
    
    render() { /* AI-generated implementation */ }
    bindEvents() { /* AI-generated implementation */ }
    handleAdd(text) { /* AI-generated implementation */ }
    handleToggle(id) { /* AI-generated implementation */ }
    handleDelete(id) { /* AI-generated implementation */ }
  }
  ```

### 3. Real-Time Features
- **Adding Advanced Functionality**
  - Filter todos (all/active/completed)
  - Drag and drop reordering
  - Bulk operations
  - Search functionality
  - Export/import data

- **AI-Assisted Feature Implementation**
  ```
  "@todoList.js Add drag-and-drop reordering:
  - Use HTML5 drag API
  - Visual feedback during drag
  - Persist new order
  - Smooth animations"
  ```

---

## Part 3: Polish & Enhancement (15 minutes)

### 1. Performance Optimization
- **Using Background Agents**
  - Enable performance monitoring
  - Identify rendering bottlenecks
  - Implement suggested optimizations
  
- **Code Review with AI**
  ```
  "Review the entire todo app for:
  - Performance issues
  - Accessibility problems
  - Security vulnerabilities
  - Code smells"
  ```

### 2. Adding Professional Touches
- **Progressive Enhancement**
  - Offline support with service worker
  - Keyboard shortcuts
  - Theme switching
  - Local notifications

- **Testing Strategy**
  ```
  "@codebase Generate comprehensive tests:
  - Unit tests for storage module
  - Integration tests for components
  - E2E test scenarios
  - Performance benchmarks"
  ```

---

## Live Coding Demos

### Demo 1: Speed Building Core Features
- Start with blank project
- Use Cursor to generate entire structure in 5 minutes
- Show iterative refinement process

### Demo 2: Debugging with AI
- Introduce intentional bug
- Use Cursor to identify and fix
- Demonstrate error prevention strategies

### Demo 3: Feature Extension
- Add real-time collaboration feature
- Use WebSockets for sync
- Show how AI handles complex integrations

---

## Hands-On Exercises

### Exercise 1: Personalize Your Todo App
- Add custom feature (voice input, categories, etc.)
- Use project rules to maintain consistency
- Share implementation with class

### Exercise 2: Performance Challenge
- Optimize for 1000+ todos
- Implement virtual scrolling
- Measure improvements

---

## Key Takeaways
- Start with clear project rules for consistent AI output
- Use iterative prompting for complex features
- Leverage context references for cohesive code
- Always review and refine AI-generated code
- Think in components and modules

---

# Section 3: Advanced App Development & Architecture
## 90-Minute Deep Dive

### Section Overview
Level up to building complex, multi-page applications. Create a full-featured note-taking app with React, showcasing advanced Cursor workflows and architectural patterns.

---

## Part 1: React Project Setup & Architecture (20 minutes)

### 1. Intelligent Project Scaffolding
- **Advanced Project Initialization**
  ```
  "Create a React note-taking app with:
  - Vite for fast builds
  - React Router for navigation
  - Zustand for state management
  - Tailwind CSS for styling
  - MDX support for rich content"
  ```

- **Folder Structure & Organization**
  ```
  src/
  ├── components/     # Reusable UI components
  ├── features/       # Feature-based modules
  ├── hooks/          # Custom React hooks
  ├── lib/            # Utilities and helpers
  ├── pages/          # Route components
  ├── services/       # API and external services
  ├── stores/         # State management
  └── styles/         # Global styles
  ```

### 2. Advanced Project Rules
- **React Best Practices**
  ```markdown
  # .cursor/rules/react-patterns.mdc
  ---
  description: React development patterns
  glob: ["**/*.jsx", "**/*.tsx"]
  ---
  
  Component Guidelines:
  - Functional components with hooks
  - Props destructuring with defaults
  - Custom hooks for logic extraction
  - Memoization for expensive operations
  
  Example component:
  ```jsx
  const NoteCard = memo(({ note, onEdit, onDelete }) => {
    const { title, content, updatedAt } = note;
    
    return (
      <article className="note-card">
        {/* Implementation */}
      </article>
    );
  });
  ```

- **State Management Rules**
  ```markdown
  # .cursor/rules/state-management.mdc
  ---
  description: Zustand store patterns
  glob: ["**/stores/**/*.js"]
  ---
  
  Store Structure:
  - Slice pattern for organization
  - Async actions with proper error handling
  - Computed values with selectors
  - Middleware for persistence
  ```

---

## Part 2: Core Feature Development (40 minutes)

### 1. Building the Note Editor
- **Rich Text Editing with AI Assistance**
  ```
  "@react-patterns.mdc Create a MarkdownEditor component:
  - Real-time preview
  - Syntax highlighting
  - Toolbar for formatting
  - Image upload support
  - Auto-save functionality"
  ```

- **Component Architecture**
  ```jsx
  // features/editor/MarkdownEditor.jsx
  export const MarkdownEditor = ({ noteId, initialContent, onSave }) => {
    const [content, setContent] = useState(initialContent);
    const [isPreview, setIsPreview] = useState(false);
    const debouncedSave = useDebouncedCallback(onSave, 1000);
    
    // AI-generated implementation
  };
  ```

### 2. State Management & Data Flow
- **Complex State with Zustand**
  ```
  "@state-management.mdc Create a notes store that handles:
  - CRUD operations for notes
  - Categories and tags
  - Search and filtering
  - Sync with backend API
  - Optimistic updates"
  ```

- **Store Implementation**
  ```javascript
  // stores/notesStore.js
  export const useNotesStore = create((set, get) => ({
    notes: [],
    categories: [],
    filters: { search: '', category: null, tags: [] },
    
    // Actions
    createNote: async (noteData) => { /* AI implementation */ },
    updateNote: async (id, updates) => { /* AI implementation */ },
    deleteNote: async (id) => { /* AI implementation */ },
    
    // Computed
    filteredNotes: () => { /* AI implementation */ },
    notesByCategory: () => { /* AI implementation */ },
  }));
  ```

### 3. Advanced Features
- **Real-Time Collaboration**
  ```
  "@web Create collaborative editing:
  - WebSocket connection for real-time sync
  - Operational transformation for conflicts
  - Presence indicators
  - Cursor positions"
  ```

- **AI-Powered Features**
  - Smart tagging suggestions
  - Content summarization
  - Related notes discovery
  - Writing assistance

### 4. Routing & Navigation
- **Dynamic Route Generation**
  ```jsx
  // App.jsx with AI-generated routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "notes/:id", element: <NoteEditor /> },
        { path: "categories", element: <Categories /> },
        { path: "search", element: <SearchResults /> },
      ],
    },
  ]);
  ```

---

## Part 3: Advanced Patterns & Optimization (30 minutes)

### 1. Performance Optimization
- **React Performance Patterns**
  ```
  "Analyze and optimize the notes app for:
  - Unnecessary re-renders
  - Bundle size optimization
  - Lazy loading strategies
  - Virtual scrolling for long lists"
  ```

- **Implementation Examples**
  ```jsx
  // Virtualized note list
  const NotesList = () => {
    const notes = useNotesStore(state => state.filteredNotes());
    
    return (
      <VirtualList
        height={600}
        itemCount={notes.length}
        itemSize={120}
        renderItem={({ index, style }) => (
          <NoteCard key={notes[index].id} note={notes[index]} style={style} />
        )}
      />
    );
  };
  ```

### 2. Advanced UI/UX Features
- **Gesture Support**
  - Swipe to delete
  - Pull to refresh
  - Pinch to zoom in editor

- **Offline Support**
  ```
  "@web Implement offline-first architecture:
  - Service worker for caching
  - IndexedDB for local storage
  - Background sync for updates
  - Conflict resolution"
  ```

### 3. Testing Strategies
- **Comprehensive Test Suite**
  ```
  "@codebase Generate tests using React Testing Library:
  - Component unit tests
  - Hook testing
  - Store testing
  - Integration tests
  - E2E with Playwright"
  ```

---

## Live Coding Sessions

### Session 1: Component Composition
- Build complex component hierarchy
- Demonstrate prop drilling solutions
- Show Context API integration

### Session 2: State Management Mastery
- Create complex state interactions
- Implement middleware
- Debug state issues with DevTools

### Session 3: Performance Profiling
- Use React DevTools Profiler
- Identify performance bottlenecks
- Implement optimizations live

---

## Hands-On Labs

### Lab 1: Feature Addition
- Add voice note recording
- Implement with Web Audio API
- Store and playback audio notes

### Lab 2: Custom Hook Creation
- Create reusable hooks
- Share logic between components
- Test hooks in isolation

### Lab 3: Advanced Styling
- Implement theme system
- Add animations with Framer Motion
- Create responsive layouts

---

## Key Takeaways
- Use feature-based architecture for scalability
- Leverage Cursor's context for consistent patterns
- Implement performance optimizations early
- Test as you build with AI assistance
- Keep components focused and reusable

---

# Section 4: Real-World Project - Full-Stack Application
## 2-Hour Intensive Workshop

### Section Overview
Build a complete full-stack application: a project management tool with real-time updates, user authentication, and deployment to Vercel. This section brings together everything learned.

---

## Part 1: Full-Stack Architecture (30 minutes)

### 1. Project Planning with AI
- **Architecture Design Session**
  ```
  "Design a project management app architecture:
  - Next.js 14 with App Router
  - Prisma ORM with PostgreSQL
  - NextAuth for authentication
  - Server Actions for mutations
  - Vercel for deployment"
  ```

- **System Design Output**
  ```
  Frontend (Next.js)
  ├── Authentication flow
  ├── Dashboard with projects
  ├── Kanban board view
  ├── Real-time updates
  └── User collaboration
  
  Backend (Next.js API)
  ├── RESTful + Server Actions
  ├── Database models
  ├── Authentication/Authorization
  ├── WebSocket support
  └── File uploads
  
  Infrastructure
  ├── Vercel deployment
  ├── Vercel Postgres
  ├── Vercel Blob storage
  └── Edge functions
  ```

### 2. Database Design & Setup
- **Schema Generation with Prisma**
  ```
  "@web Design Prisma schema for project management:
  - Users with roles
  - Projects with members
  - Tasks with assignees
  - Comments and activities
  - File attachments"
  ```

- **Generated Schema**
  ```prisma
  // schema.prisma
  model User {
    id        String   @id @default(cuid())
    email     String   @unique
    name      String?
    role      Role     @default(USER)
    projects  ProjectMember[]
    tasks     Task[]
    comments  Comment[]
    createdAt DateTime @default(now())
  }
  
  model Project {
    id          String   @id @default(cuid())
    name        String
    description String?
    members     ProjectMember[]
    tasks       Task[]
    createdAt   DateTime @default(now())
  }
  
  // Additional models...
  ```

### 3. Authentication Setup
- **NextAuth Configuration**
  ```
  "Set up NextAuth with:
  - Google OAuth provider
  - Email magic links
  - JWT strategy
  - Role-based access control"
  ```

---

## Part 2: Backend Development (40 minutes)

### 1. API Development with Server Actions
- **CRUD Operations**
  ```typescript
  // app/actions/projects.ts
  'use server'
  
  export async function createProject(data: ProjectInput) {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');
    
    const project = await prisma.project.create({
      data: {
        ...data,
        members: {
          create: {
            userId: session.user.id,
            role: 'OWNER'
          }
        }
      }
    });
    
    revalidatePath('/projects');
    return project;
  }
  ```

- **Real-time Updates**
  ```
  "@web Implement real-time updates using:
  - Pusher for WebSocket management
  - Server-sent events as fallback
  - Optimistic UI updates
  - Conflict resolution"
  ```

### 2. File Upload & Storage
- **Vercel Blob Integration**
  ```typescript
  // app/api/upload/route.ts
  export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    const blob = await put(filename, request.body, {
      access: 'public',
    });
    
    return Response.json(blob);
  }
  ```

### 3. Advanced Features
- **Task Automation**
  - Recurring tasks
  - Due date notifications
  - Activity logs
  - Email notifications

- **Search & Filtering**
  ```
  "Implement full-text search with:
  - Prisma text search
  - Faceted filtering
  - Search suggestions
  - Recent searches"
  ```

---

## Part 3: Frontend Implementation (40 minutes)

### 1. Dashboard Development
- **Server Components Architecture**
  ```tsx
  // app/dashboard/page.tsx
  export default async function Dashboard() {
    const projects = await getProjects();
    const recentActivity = await getRecentActivity();
    
    return (
      <div className="dashboard">
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsList projects={projects} />
        </Suspense>
        
        <Suspense fallback={<ActivitySkeleton />}>
          <ActivityFeed activities={recentActivity} />
        </Suspense>
      </div>
    );
  }
  ```

### 2. Kanban Board Implementation
- **Drag & Drop with Optimistic Updates**
  ```
  "@web Create Kanban board with:
  - react-beautiful-dnd for drag/drop
  - Optimistic updates for instant feedback
  - Real-time sync across users
  - Undo/redo functionality"
  ```

- **Component Structure**
  ```tsx
  // components/KanbanBoard.tsx
  export function KanbanBoard({ projectId }) {
    const { tasks, moveTask } = useTasks(projectId);
    const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);
    
    const handleDragEnd = async (result) => {
      // Optimistic update
      setOptimisticTasks(/* new state */);
      
      // Server update
      await moveTask(result);
    };
    
    // Implementation
  }
  ```

### 3. Real-time Collaboration
- **Live Cursors & Presence**
  ```tsx
  // hooks/usePresence.ts
  export function usePresence(projectId: string) {
    const [presence, setPresence] = useState<Presence[]>([]);
    
    useEffect(() => {
      const channel = pusher.subscribe(`project-${projectId}`);
      
      channel.bind('user-joined', (user) => {
        setPresence(prev => [...prev, user]);
      });
      
      // More events...
      
      return () => channel.unsubscribe();
    }, [projectId]);
    
    return presence;
  }
  ```

---

## Part 4: Deployment & Production (10 minutes)

### 1. Vercel Deployment Setup
- **Configuration**
  ```json
  // vercel.json
  {
    "buildCommand": "prisma generate && next build",
    "env": {
      "DATABASE_URL": "@database-url",
      "NEXTAUTH_URL": "@nextauth-url",
      "NEXTAUTH_SECRET": "@nextauth-secret"
    }
  }
  ```

- **Environment Variables**
  - Database connection
  - Authentication secrets
  - Third-party API keys
  - Feature flags

### 2. Production Optimizations
- **Performance Tuning**
  ```
  "Optimize for production:
  - Image optimization with next/image
  - Font optimization
  - Code splitting
  - Edge caching strategies"
  ```

- **Monitoring Setup**
  - Vercel Analytics
  - Error tracking with Sentry
  - Performance monitoring
  - User analytics

---

## Live Deployment Demo

### Demo 1: Local to Production
1. Complete local development
2. Set up GitHub repository
3. Connect to Vercel
4. Configure environment
5. Deploy and test

### Demo 2: CI/CD Pipeline
1. Set up GitHub Actions
2. Automated testing
3. Preview deployments
4. Production deployment

### Demo 3: Post-Deployment
1. Monitor performance
2. Set up alerts
3. Configure domains
4. Enable analytics

---

## Hands-On Challenges

### Challenge 1: Add New Feature
- Implement time tracking
- Add reporting dashboard
- Deploy changes

### Challenge 2: Performance Optimization
- Implement caching strategy
- Optimize database queries
- Measure improvements

### Challenge 3: Scale Testing
- Load test the application
- Identify bottlenecks
- Implement solutions

---

## Key Takeaways
- Plan architecture before coding
- Use Server Components for performance
- Implement real-time features thoughtfully
- Deploy early and often
- Monitor production metrics

---

# Section 5: Deployment, Testing & Production Best Practices
## 90-Minute Masterclass

### Section Overview
Master the complete lifecycle from development to production. Learn testing strategies, deployment workflows, monitoring, and maintaining applications built with Cursor.

---

## Part 1: Comprehensive Testing Strategy (30 minutes)

### 1. Test-Driven Development with Cursor
- **Setting Up Testing Environment**
  ```
  "Configure testing setup for our project:
  - Vitest for unit tests
  - React Testing Library for components
  - Playwright for E2E tests
  - MSW for API mocking"
  ```

- **Project Rules for Testing**
  ```markdown
  # .cursor/rules/testing.mdc
  ---
  description: Testing standards and patterns
  glob: ["**/*.test.js", "**/*.spec.js"]
  ---
  
  Testing Guidelines:
  - Test behavior, not implementation
  - Use data-testid for E2E selectors
  - Mock external dependencies
  - Aim for 80% coverage
  
  Example test structure:
  ```javascript
  describe('Component', () => {
    it('should handle user interaction', async () => {
      // Arrange
      // Act
      // Assert
    });
  });
  ```

### 2. AI-Assisted Test Generation
- **Unit Test Generation**
  ```
  "@TodoStorage.js Generate comprehensive unit tests:
  - Test all CRUD operations
  - Edge cases and error handling
  - Mock localStorage
  - Test data validation"
  ```

- **Component Testing**
  ```
  "@KanbanBoard.tsx Create component tests:
  - User interactions
  - Drag and drop behavior
  - Loading states
  - Error boundaries"
  ```

### 3. E2E Testing Workflows
- **Playwright Test Scenarios**
  ```typescript
  // e2e/project-flow.spec.ts
  test.describe('Project Management Flow', () => {
    test('complete project workflow', async ({ page }) => {
      // Login
      await page.goto('/login');
      await page.fill('[name="email"]', 'test@example.com');
      
      // Create project
      await page.click('text=New Project');
      await page.fill('[name="projectName"]', 'Test Project');
      
      // Add tasks
      // Assign members
      // Complete workflow
    });
  });
  ```

- **Visual Regression Testing**
  ```
  "Set up visual regression testing:
  - Percy or Chromatic integration
  - Component screenshots
  - Responsive design tests
  - Dark mode testing"
  ```

---

## Part 2: Deployment Strategies (30 minutes)

### 1. Multi-Environment Setup
- **Environment Configuration**
  ```
  Development
  ├── Local database
  ├── Mock services
  ├── Debug logging
  └── Hot reload
  
  Staging
  ├── Production-like data
  ├── Real services
  ├── Performance profiling
  └── QA testing
  
  Production
  ├── Optimized builds
  ├── CDN distribution
  ├── Error tracking
  └── Analytics
  ```

- **Vercel Project Setup**
  ```bash
  # Environment-specific deployments
  vercel --prod                    # Production
  vercel --env preview            # Staging
  vercel                          # Development preview
  ```

### 2. CI/CD Pipeline Configuration
- **GitHub Actions Workflow**
  ```yaml
  # .github/workflows/deploy.yml
  name: Deploy to Vercel
  
  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main]
  
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Install dependencies
          run: npm ci
        - name: Run tests
          run: npm test
        - name: Run E2E tests
          run: npm run test:e2e
    
    deploy:
      needs: test
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Deploy to Vercel
          uses: amondnet/vercel-action@v20
          with:
            vercel-token: ${{ secrets.VERCEL_TOKEN }}
            vercel-org-id: ${{ secrets.ORG_ID }}
            vercel-project-id: ${{ secrets.PROJECT_ID }}
  ```

### 3. Database Migrations & Seeding
- **Safe Migration Strategies**
  ```
  "Create migration workflow:
  - Preview migrations before applying
  - Backup before migrations
  - Rollback procedures
  - Zero-downtime migrations"
  ```

- **Seeding for Different Environments**
  ```typescript
  // prisma/seed.ts
  async function seed() {
    const env = process.env.NODE_ENV;
    
    if (env === 'development') {
      await seedDevelopmentData();
    } else if (env === 'staging') {
      await seedStagingData();
    }
  }
  ```

---

## Part 3: Production Monitoring & Maintenance (30 minutes)

### 1. Observability Setup
- **Application Monitoring**
  ```
  "Implement comprehensive monitoring:
  - APM with Datadog/New Relic
  - Error tracking with Sentry
  - Uptime monitoring
  - Custom metrics dashboard"
  ```

- **Logging Strategy**
  ```typescript
  // lib/logger.ts
  export const logger = {
    info: (message: string, meta?: any) => {
      console.log(JSON.stringify({
        level: 'info',
        timestamp: new Date().toISOString(),
        message,
        ...meta
      }));
    },
    error: (error: Error, meta?: any) => {
      console.error(JSON.stringify({
        level: 'error',
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        ...meta
      }));
      
      // Send to Sentry in production
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
      }
    }
  };
  ```

### 2. Performance Optimization
- **Core Web Vitals Monitoring**
  ```
  "@web Implement performance monitoring:
  - Track LCP, FID, CLS
  - Real user monitoring (RUM)
  - Synthetic monitoring
  - Performance budgets"
  ```

- **Optimization Techniques**
  - Bundle analysis and splitting
  - Image optimization pipeline
  - Caching strategies
  - Database query optimization

### 3. Security Best Practices
- **Security Checklist**
  ```
  "Implement security measures:
  - OWASP Top 10 protection
  - Content Security Policy
  - Rate limiting
  - Input validation
  - SQL injection prevention"
  ```

- **Security Headers**
  ```typescript
  // middleware.ts
  export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline';"
    );
    
    return response;
  }
  ```

---

## Production Readiness Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Environment variables configured

### Deployment
- [ ] Database migrations tested
- [ ] Rollback plan prepared
- [ ] Monitoring alerts configured
- [ ] Load testing completed
- [ ] SSL certificates valid

### Post-Deployment
- [ ] Smoke tests passing
- [ ] Performance metrics normal
- [ ] Error rates acceptable
- [ ] User flows verified
- [ ] Backup verification

---

## Hands-On Labs

### Lab 1: Performance Optimization
1. Run Lighthouse audit
2. Identify bottlenecks
3. Implement fixes
4. Measure improvements

### Lab 2: Security Hardening
1. Run security audit
2. Fix vulnerabilities
3. Implement CSP
4. Test security measures

### Lab 3: Monitoring Setup
1. Install monitoring tools
2. Create custom dashboards
3. Set up alerts
4. Test incident response

---

## Course Wrap-Up

### Key Takeaways
1. **Cursor Mastery**
   - Advanced features accelerate development
   - Project rules ensure consistency
   - Context management is crucial
   - AI assists but doesn't replace thinking

2. **Application Development**
   - Start with solid architecture
   - Build incrementally with tests
   - Optimize for production early
   - Monitor everything in production

3. **Best Practices**
   - Test-driven development with AI
   - Continuous deployment workflow
   - Security-first mindset
   - Performance as a feature

### Next Steps
- Explore MCP servers for your domain
- Contribute to Cursor community
- Build and deploy your own apps
- Share your learnings

### Resources
- Course GitHub Repository
- Cursor Documentation
- Example Projects
- Community Discord
- Office Hours Schedule

---

## Final Project

### Build Your Own SaaS
Using everything learned, build a small SaaS application:
1. Choose a problem to solve
2. Design the architecture
3. Implement with Cursor
4. Deploy to production
5. Present to the class

### Evaluation Criteria
- Code quality and organization
- Effective use of Cursor features
- Test coverage
- Production readiness
- Innovation and creativity

---

Thank you for joining this advanced Cursor course! Keep building amazing applications with AI assistance. 🚀