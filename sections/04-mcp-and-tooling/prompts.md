# Section 04: Prompts

## Playwright MCP: Screenshot

```
Navigate to http://localhost:3000 and take a screenshot.
Describe the current state of the page — layout, content, and any obvious issues.
```

## Playwright MCP: Interactive Testing

```
Navigate to http://localhost:3000/quiz and complete the entire quiz flow:
1. Answer each question (pick any answer)
2. Submit and move to the next question
3. At the end, screenshot the results page

Report:
- Did all navigation work correctly?
- Were there any visual glitches or layout issues?
- Did the score calculate correctly?
```

## Playwright MCP: Fix and Verify

```
The quiz results page has a layout issue — [describe what you saw].
Fix the component, then navigate back to the results page and verify it looks correct.
```

## GitHub MCP: PR Review

```
List my open pull requests and summarize each one in 1-2 sentences.
```

```
Review PR #[number] — check for code quality issues,
potential bugs, and adherence to our project conventions.
```

## GitMCP: External Docs

```
Using the Next.js docs, explain the best practices for
Server Actions in Next.js 15. Include code examples.
```

## MCP Configuration

```
Help me set up MCP for this project. I want to configure:
1. Playwright for browser testing
2. GitHub for PR management
3. GitMCP for Next.js documentation

Create the .cursor/mcp.json file with all three servers.
```
