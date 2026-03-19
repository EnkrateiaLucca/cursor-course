"use client"

import { useState } from "react"
import type { MultipleChoiceQuestion } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ExplanationBox } from "./explanation-box"
import { Check, X } from "lucide-react"

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion
  onAnswer: (isCorrect: boolean) => void
  answered: boolean
}

export function MultipleChoice({
  question,
  onAnswer,
  answered
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null)

  function handleSelect(index: number) {
    if (answered) return
    setSelected(index)
  }

  function handleSubmit() {
    if (selected === null) return
    onAnswer(selected === question.answer)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>

      <div className="space-y-2">
        {question.options.map((option, i) => {
          const isCorrect = i === question.answer
          const isSelected = i === selected

          let variant: "default" | "correct" | "incorrect" | "missed" = "default"
          if (answered) {
            if (isSelected && isCorrect) variant = "correct"
            else if (isSelected && !isCorrect) variant = "incorrect"
            else if (!isSelected && isCorrect) variant = "missed"
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all",
                !answered && isSelected && "border-blue-500 bg-blue-50",
                !answered && !isSelected && "hover:border-gray-400",
                variant === "correct" &&
                  "border-green-500 bg-green-100 text-green-800",
                variant === "incorrect" &&
                  "border-red-500 bg-red-100 text-red-800",
                variant === "missed" &&
                  "border-green-500 bg-green-50 text-green-800"
              )}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                {answered && variant === "correct" ? (
                  <Check className="h-4 w-4" />
                ) : answered && variant === "incorrect" ? (
                  <X className="h-4 w-4" />
                ) : answered && variant === "missed" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="text-sm">{option}</span>
            </button>
          )
        })}
      </div>

      {!answered && (
        <Button onClick={handleSubmit} disabled={selected === null}>
          Submit Answer
        </Button>
      )}

      {answered && <ExplanationBox explanation={question.explanation} />}
    </div>
  )
}
