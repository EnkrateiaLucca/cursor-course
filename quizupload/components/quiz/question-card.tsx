"use client"

import type { Question } from "@/lib/types"
import { MultipleChoice } from "./multiple-choice"
import { YesNo } from "./yes-no"
import { OpenEnded } from "./open-ended"
import { Card, CardContent } from "@/components/ui/card"

interface QuestionCardProps {
  question: Question
  onAnswer: (isCorrect: boolean) => void
  answered: boolean
}

export function QuestionCard({
  question,
  onAnswer,
  answered
}: QuestionCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {question.type === "multiple-choice" && (
          <MultipleChoice
            question={question}
            onAnswer={onAnswer}
            answered={answered}
          />
        )}
        {question.type === "yes-no" && (
          <YesNo
            question={question}
            onAnswer={onAnswer}
            answered={answered}
          />
        )}
        {question.type === "open-ended" && (
          <OpenEnded
            question={question}
            onAnswer={onAnswer}
            answered={answered}
          />
        )}
      </CardContent>
    </Card>
  )
}
