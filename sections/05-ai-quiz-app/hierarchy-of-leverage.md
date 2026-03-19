# Hierarchy of Leverage

How to maximize the quality of AI-assisted code output, ordered from **most impact** to **least impact**:

```
┌─────────────────────────────┐
│   1. Project Rules          │ ← Highest leverage
│   (AGENTS.md, .cursor/rules)│
├─────────────────────────────┤
│   2. Context Quality        │
│   (@ symbols, context file) │
├─────────────────────────────┤
│   3. Prompt Specificity     │
│   (clear, tactical prompts) │
├─────────────────────────────┤
│   4. Model Capability       │ ← Lowest leverage (you can't control this)
│   (GPT-4o, Claude, etc.)    │
└─────────────────────────────┘
```

## 1. Project Rules (Highest Leverage)

Rules are processed on every interaction. They encode patterns the AI should always follow.

**Impact:** Prevents entire categories of mistakes (wrong imports, missing validation, bad patterns).

**Example:** A rule saying "always validate with Zod" means you never have to remember to ask for it.

## 2. Context Quality

What the AI can see determines what it can do. Precise context > more context.

**Impact:** The difference between "hallucinated API" and "correct implementation using your actual codebase."

**Example:** `@db/schema/quizzes.ts @actions/generate-quiz.ts` gives the AI exactly what it needs.

## 3. Prompt Specificity

Clear, tactical prompts with numbered steps produce better results than vague requests.

**Impact:** The difference between "build a quiz" (vague) and a numbered build plan (actionable).

**Example:** "Create a Server Action in actions/generate-quiz.ts that takes source text and returns 10 multiple-choice questions as JSON" is far better than "add AI quiz generation."

## 4. Model Capability (Lowest Personal Leverage)

You can't change how smart the model is — but you can maximize what it gets from 1-3 above.

**Impact:** Better models help, but a great prompt with bad context still produces bad code.

**Key Insight:** Invest your time in levels 1-3. The model improves on its own over time.

---

## Practical Takeaway

Before blaming the AI for bad output, ask:
1. Do I have rules for this pattern? → If not, add one.
2. Did I give it the right context? → If not, add @ references.
3. Was my prompt specific enough? → If not, rewrite with numbered steps.
4. Only then consider switching models.
