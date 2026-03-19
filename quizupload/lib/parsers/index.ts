import type { ParsedQuiz } from "@/lib/types"
import { parseJsonQuiz } from "./json-parser"
import { parseMarkdownQuiz } from "./markdown-parser"

export type ParseResult =
  | { success: true; quiz: ParsedQuiz }
  | { success: false; error: string }

export async function parseQuizFile(file: File): Promise<ParseResult> {
  try {
    const content = await file.text()
    const ext = file.name.split(".").pop()?.toLowerCase()

    let quiz: ParsedQuiz

    if (ext === "json") {
      quiz = parseJsonQuiz(content)
    } else if (ext === "md" || ext === "markdown") {
      quiz = parseMarkdownQuiz(content)
    } else {
      return { success: false, error: `Unsupported file type: .${ext}. Use .json or .md` }
    }

    if (quiz.questions.length === 0) {
      return { success: false, error: "Quiz has no questions" }
    }

    return { success: true, quiz }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to parse file"
    return { success: false, error: message }
  }
}
