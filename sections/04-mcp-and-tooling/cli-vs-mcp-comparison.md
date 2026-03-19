# CLI vs MCP Comparison

## Quick Reference

| Feature | Cursor (IDE + MCP) | Claude Code (CLI) | Aider (CLI) |
|---------|-------------------|-------------------|-------------|
| **Interface** | Visual IDE | Terminal | Terminal |
| **Multi-file editing** | Agent mode | Built-in | Built-in |
| **Visual context** | Playwright MCP | Screenshot tools | No |
| **Git integration** | Basic | Deep (auto-commits) | Deep (auto-commits) |
| **Project rules** | .cursor/rules/*.mdc | CLAUDE.md | .aider* config |
| **External tools** | MCP protocol | MCP + bash tools | Bash tools |
| **Background work** | Background agents | Background tasks | No |
| **Cost** | Cursor subscription | API usage | API usage |
| **Best for** | Visual development | Infrastructure, scripts, CLI work | Focused code changes |

## When to Use Each

### Cursor (IDE)
- Building UI components (you need to see them)
- Design iteration (Figma → code → preview)
- Learning a new codebase (visual exploration)
- Live demos and pair programming

### Claude Code (CLI)
- Server-side scripts and automation
- Complex git operations
- Working over SSH / remote servers
- When you want full terminal control
- CI/CD and DevOps tasks

### Aider (CLI)
- Quick targeted code changes
- Working with non-Anthropic models (GPT-4, local models)
- Lightweight alternative when Cursor is too heavy

## They're Complementary, Not Competing

The best workflow often combines them:
1. **Cursor** for building and visual work
2. **Claude Code** for deployment, scripts, and infrastructure
3. Both share the same project — CLAUDE.md works in both
