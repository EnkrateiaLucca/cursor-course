1. write prompts that describe the diff you want in your PR.
2. think of the end state, then prompt for steps to get there.
3. adjust your prompt scope based on results: aim higher if the agent performs well, or break tasks down if it struggles.
4. use 
@branch
 to get working state
5. understand the problem and solution before prompting the agent
6. reference existing code patterns when prompting.
7. start new chats frequently with a clear purpose to keep context clean.
8. configure your linter to guide the agent's fixes effectively.
9. set up reusable workflows with cursor rules
10. use 
@file
, 
@folder
, and 
@git
 to target relevant context.
11. limit tasks per prompt and provide solid initial context.
12. provide validation methods to guide agents, like TDD
13. add rules when the model makes recurring mistakes.
14. commit regularly.
15. ask for the model's plan before applying code changes.
16. maintain a diary file for complex multi-chat sessions.
17. define 5 to 10 rules upfront for new projects.
18. treat prompts like mini specs with stack, behavior, and constraints.
19. work file by file in focused, testable chunks.
20. lock tests first, then generate code until they pass.
21. always review agent output
22. use chat history to iterate on and improve previous prompts.
23. choose models intentionally based on precision or breadth.
24. link official documentation for unfamiliar stacks and have cursor explain errors line by line.
25. treat the agent like a powerful junior. it can move fast with guidance.
26. store domain knowledge in .cursor/rules.
27. break down large tasks into small, incremental steps.
28. use git for safe, versioned iteration.
29. create docs like http://prd.md and http://specs.md for reference.
30. track tasks and progress in http://todo.md.
31. use MCP to access external context