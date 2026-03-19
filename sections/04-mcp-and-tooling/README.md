# Section 04: MCP & Tooling

**Slides:** 15–21 | **Duration:** ~30 min | **Break after:** Yes

## Learning Goals

- Understand what MCP (Model Context Protocol) is and why it matters
- Configure and use Playwright MCP for browser testing
- Set up GitHub and GitMCP integrations
- Understand CLI tools (Claude Code, Aider) vs. IDE-integrated MCP
- Make informed choices about when to use which tool

## Prerequisites

- Cursor IDE with McKay's template open
- GitHub PAT ready
- Node.js installed (for npx MCP server commands)

## Demo Checklist

- [ ] Explain MCP with the "USB for AI" analogy
- [ ] Configure Playwright MCP live (see [demo-playwright-mcp.md](demo-playwright-mcp.md))
- [ ] Demonstrate browser testing through MCP
- [ ] Show MCP config examples (see [mcp-config-examples/](mcp-config-examples/))
- [ ] Discuss CLI vs MCP trade-offs (see [cli-vs-mcp-comparison.md](cli-vs-mcp-comparison.md))

## Files in This Section

| File | Purpose |
|------|---------|
| [demo-playwright-mcp.md](demo-playwright-mcp.md) | Playwright MCP demo steps |
| [mcp-config-examples/playwright.json](mcp-config-examples/playwright.json) | Playwright config |
| [mcp-config-examples/github.json](mcp-config-examples/github.json) | GitHub MCP config |
| [mcp-config-examples/gitmcp.json](mcp-config-examples/gitmcp.json) | GitMCP config |
| [cli-vs-mcp-comparison.md](cli-vs-mcp-comparison.md) | CLI vs MCP trade-offs |
| [prompts.md](prompts.md) | MCP demo prompts |

## Key Talking Points

- MCP is an open protocol by Anthropic — standardizes how AI connects to external tools
- Think of it like USB: one standard interface, many devices
- Playwright MCP lets the AI see and interact with your running app
- GitMCP turns any GitHub repo into an MCP context source (replace github.com → gitmcp.io)
- CLI tools (Claude Code) complement Cursor — use the right tool for the right job
