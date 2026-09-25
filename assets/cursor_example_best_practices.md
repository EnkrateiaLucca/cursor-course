I'm using cursor, so I'm wondering if I should go over best practices of using it first. This is to ensure as I work on my projects, I don't get overwhelmed by complexity.

- ﻿﻿Before using cursor, ask claude to create a clear and detailed plan in markdown (ask it to ask clarifying questions and then critique its own plan and then regenerate). Add it to instructions.md (so you can ask cursor to refer to it frequently)  
    I tell chatgpt what i want to create, then i ask it to provide instructions for another ai which will do the coding. Then i paste everything into the cursor composer agent.
- ﻿﻿Basically chatgpt adds another layer of planning which reduces the rate of encountering problems.
- ﻿﻿On one project cursor was running into some issues and couldn't figure it out no matter what. I wasted hours stuck in a loop. Then i started from scratch, but this time i asked chatgpt o1 to write clear instructions for another coding ai. It worked like charm.
- ﻿﻿Use cursorrules (they are always in Al context) to tell broad rules. See https://cursor.directory/
- ﻿﻿E.g. Write tests first, then the code, then run the tests and update the code until tests pass.
- ﻿﻿Get agent to write code incrementally, in small chunks of Edit-Test loops
- ﻿﻿Define a small task or feature increment.  
    Write (or have the Al write) a test case that fails for this increment.
- ﻿﻿Instruct the Al (typically in Agent mode) to write the code to make the test pass.  
    Instruct the Al to run the test.  
    If the test fails, the Al analyzes the failure and attempts to fix the code, looping back to step 4.
- ﻿﻿Once the test passes, the developer reviews the changes.
- ﻿﻿Encourage chain of thought in your prompts
- ﻿﻿When you run into problems, ask cursor to write a report with all files listed and what they do and the problems encountered. Ask claude/chatgpt how to fix the problem  
    gitingest.com to get all the scripts configs and relevant files (you can filter by extension) in a single page ingestible by chatgpt  
    https://context7.com/MCP for referring to latest docs
- ﻿﻿Use git to version control frequently. Don't have too many uncommitted changes.
- ﻿﻿Keep context short by explicitly adding files via @. Longer the context, more derailed Al will go.  
    Start new chats when context gets longer
- ﻿﻿Resync / index code frequently
- ﻿﻿Use cursorignore to exclude irrelevant files
- ﻿﻿Use /Reference open editors to quickly add them to context
- ﻿﻿Notepads are frequently used prompts
- ﻿﻿Optional: enable YOLO mode so it writes tests
- ﻿﻿any kind of tests are always allowed like vitest, pm test, nr test, etc. also basic build commands like build, tsc, etc. creating files and making directories (like touch, mkdir, etc) is always ok too
- ﻿﻿Optional: System prompt in "Rules for Al" in cursor settings
- ﻿﻿- Keep answers concise and direct
- ﻿﻿- Suggest alternative solutions
- ﻿﻿- Avoid unnecessary explanations
- ﻿﻿- Prioritize technical details over generic advice

---


- ﻿﻿