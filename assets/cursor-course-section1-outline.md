# Cursor AI IDE Course - Section 1: Advanced Features & Building Full Apps
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