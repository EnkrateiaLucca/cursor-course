import type { ParsedQuiz } from "./types"

export const sampleQuiz: ParsedQuiz = {
  title: "JavaScript Basics",
  description: "Test your fundamental JavaScript knowledge with 5 quick questions.",
  questions: [
    {
      type: "multiple-choice",
      question: "What does `typeof null` return?",
      options: ["null", "undefined", "object", "boolean"],
      answer: 2,
      explanation:
        "This is a known JavaScript quirk — typeof null returns 'object' due to a bug in the original implementation that was never fixed."
    },
    {
      type: "yes-no",
      question: "JavaScript is a statically typed language.",
      answer: false,
      explanation:
        "JavaScript is dynamically typed — types are determined at runtime, not at compile time."
    },
    {
      type: "multiple-choice",
      question: "Which method removes the last element from an array?",
      options: ["shift()", "pop()", "splice()", "slice()"],
      answer: 1,
      explanation:
        "pop() removes and returns the last element. shift() removes the first. splice() can remove from any position. slice() doesn't modify the original array."
    },
    {
      type: "open-ended",
      question: "Explain the difference between `let` and `var`.",
      hint: "Think about scope and hoisting.",
      sampleAnswer:
        "let is block-scoped while var is function-scoped. Variables declared with var are hoisted to the top of their scope and initialized as undefined, while let variables are hoisted but not initialized (temporal dead zone)."
    },
    {
      type: "yes-no",
      question: "The `===` operator checks both value and type.",
      answer: true,
      explanation:
        "The strict equality operator (===) checks both value and type without type coercion, unlike == which performs type coercion."
    }
  ]
}
