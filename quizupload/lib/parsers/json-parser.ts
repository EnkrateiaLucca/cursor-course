import type { ParsedQuiz } from "@/lib/types"
import { quizJsonSchema } from "@/lib/validators"

export function parseJsonQuiz(content: string): ParsedQuiz {
  const raw = JSON.parse(content)
  const result = quizJsonSchema.parse(raw)

  return {
    title: result.title,
    description: result.description,
    questions: result.questions.map(q => {
      if (q.type === "multiple-choice") {
        if (q.answer >= q.options.length) {
          throw new Error(
            `Answer index ${q.answer} out of range for question "${q.question}"`
          )
        }
      }
      return q
    })
  }
}
