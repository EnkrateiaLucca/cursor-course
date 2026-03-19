"use client"

import { useState } from "react"
import type { YesNoQuestion } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ExplanationBox } from "./explanation-box"
import { Check, X } from "lucide-react"

interface YesNoProps {
  question: YesNoQuestion
  onAnswer: (isCorrect: boolean) => void
  answered: boolean
}

export function YesNo({ question, onAnswer, answered }: YesNoProps) {
  const [selected, setSelected] = useState<boolean | null>(null)

  function handleSelect(value: boolean) {
    if (answered) return
    setSelected(value)
    onAnswer(value === question.answer)
  }

  function getStyle(value: boolean) {
    if (!answered) {
      return selected === value
        ? "border-blue-500 bg-blue-50"
        : "hover:border-gray-400"
    }

    const isCorrect = value === question.answer
    const isSelected = value === selected

    if (isSelected && isCorrect)
      return "border-green-500 bg-green-100 text-green-800"
    if (isSelected && !isCorrect)
      return "border-red-500 bg-red-100 text-red-800"
    if (!isSelected && isCorrect)
      return "border-green-500 bg-green-50 text-green-800"
    return "opacity-50"
  }

  function getIcon(value: boolean) {
    if (!answered) return null
    const isCorrect = value === question.answer
    const isSelected = value === selected
    if (isSelected && isCorrect) return <Check className="h-5 w-5" />
    if (isSelected && !isCorrect) return <X className="h-5 w-5" />
    if (!isSelected && isCorrect) return <Check className="h-5 w-5" />
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>

      <div className="grid grid-cols-2 gap-4">
        {[true, false].map(value => (
          <button
            key={String(value)}
            onClick={() => handleSelect(value)}
            disabled={answered}
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-8 text-lg font-semibold transition-all",
              getStyle(value)
            )}
          >
            {getIcon(value)}
            {value ? "Yes" : "No"}
          </button>
        ))}
      </div>

      {answered && <ExplanationBox explanation={question.explanation} />}
    </div>
  )
}
