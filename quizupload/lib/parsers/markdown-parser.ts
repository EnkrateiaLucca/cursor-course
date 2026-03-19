import matter from "gray-matter"
import type { ParsedQuiz, Question } from "@/lib/types"

/**
 * Parses a markdown quiz file with the format:
 *
 * ---
 * title: Quiz Title
 * description: Optional description
 * ---
 *
 * ## Q1 (multiple-choice)
 * Question text
 * - [ ] Wrong option
 * - [x] Correct option
 * > **Explanation:** ...
 *
 * ## Q2 (yes-no)
 * Question text
 * - [ ] Yes
 * - [x] No
 * > **Explanation:** ...
 *
 * ## Q3 (open-ended)
 * Question text
 * > **Hint:** ...
 * > **Sample Answer:** ...
 */
export function parseMarkdownQuiz(content: string): ParsedQuiz {
  const { data: frontmatter, content: body } = matter(content)

  if (!frontmatter.title) {
    throw new Error("Markdown quiz must have a title in frontmatter")
  }

  const sections = body.split(/^## /m).filter(s => s.trim())
  if (sections.length === 0) {
    throw new Error("No questions found — use ## headings to separate questions")
  }

  const questions: Question[] = sections.map((section, i) => {
    const lines = section.split("\n")
    const headerLine = lines[0].trim()

    // Parse header: "Q1 (multiple-choice)" or "Q1 (yes-no)" or "Q1 (open-ended)"
    const typeMatch = headerLine.match(/\((multiple-choice|yes-no|open-ended)\)/)
    if (!typeMatch) {
      throw new Error(
        `Question ${i + 1}: Missing type. Use (multiple-choice), (yes-no), or (open-ended) in heading.`
      )
    }
    const type = typeMatch[1] as Question["type"]

    // Everything after header, before options/blockquotes, is the question text
    const contentLines: string[] = []
    const optionLines: string[] = []
    const blockquoteLines: string[] = []

    for (let j = 1; j < lines.length; j++) {
      const line = lines[j]
      if (line.match(/^- \[[ x]\]/)) {
        optionLines.push(line)
      } else if (line.startsWith(">")) {
        blockquoteLines.push(line)
      } else if (line.trim()) {
        contentLines.push(line.trim())
      }
    }

    const questionText = contentLines.join(" ")
    if (!questionText) {
      throw new Error(`Question ${i + 1}: No question text found`)
    }

    // Parse blockquotes for explanation, hint, sample answer
    const explanation = extractBlockquote(blockquoteLines, "Explanation")
    const hint = extractBlockquote(blockquoteLines, "Hint")
    const sampleAnswer = extractBlockquote(blockquoteLines, "Sample Answer")

    if (type === "multiple-choice") {
      const options: string[] = []
      let answerIndex = -1

      for (const line of optionLines) {
        const checked = line.startsWith("- [x]")
        const text = line.replace(/^- \[[ x]\]\s*/, "").trim()
        if (checked) answerIndex = options.length
        options.push(text)
      }

      if (options.length < 2) {
        throw new Error(
          `Question ${i + 1}: Multiple-choice needs at least 2 options`
        )
      }
      if (answerIndex === -1) {
        throw new Error(
          `Question ${i + 1}: Mark the correct answer with [x]`
        )
      }

      return {
        type: "multiple-choice",
        question: questionText,
        options,
        answer: answerIndex,
        ...(explanation && { explanation })
      }
    }

    if (type === "yes-no") {
      let answer: boolean | null = null
      for (const line of optionLines) {
        const checked = line.startsWith("- [x]")
        if (checked) {
          const text = line.replace(/^- \[[ x]\]\s*/, "").trim().toLowerCase()
          answer = text === "yes" || text === "true"
        }
      }

      if (answer === null) {
        throw new Error(
          `Question ${i + 1}: Mark the correct answer with [x] (Yes or No)`
        )
      }

      return {
        type: "yes-no",
        question: questionText,
        answer,
        ...(explanation && { explanation })
      }
    }

    // open-ended
    if (!sampleAnswer) {
      throw new Error(
        `Question ${i + 1}: Open-ended questions need a > **Sample Answer:** block`
      )
    }

    return {
      type: "open-ended",
      question: questionText,
      sampleAnswer,
      ...(hint && { hint })
    }
  })

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    questions
  }
}

function extractBlockquote(lines: string[], label: string): string | undefined {
  const prefix = `> **${label}:**`
  const match = lines.find(l => l.startsWith(prefix))
  return match ? match.slice(prefix.length).trim() : undefined
}
