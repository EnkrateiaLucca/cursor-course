"use client"

import type { ParsedQuiz, QuizAnswer } from "@/lib/types"
import { Check, X } from "lucide-react"

interface QuestionBreakdownProps {
  quiz: ParsedQuiz
  answers: QuizAnswer[]
}

export function QuestionBreakdown({ quiz, answers }: QuestionBreakdownProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground uppercase">
        Question Breakdown
      </h3>

      <div className="divide-y rounded-lg border">
        {quiz.questions.map((question, i) => {
          const answer = answers[i]
          const isCorrect = answer?.isCorrect ?? false

          return (
            <div
              key={i}
              className="flex items-center gap-3 p-3"
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  isCorrect
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isCorrect ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  <span className="text-muted-foreground">Q{i + 1}.</span>{" "}
                  {question.question}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
