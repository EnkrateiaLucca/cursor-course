"use client"

import { useState } from "react"
import type { OpenEndedQuestion } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Lightbulb } from "lucide-react"

interface OpenEndedProps {
  question: OpenEndedQuestion
  onAnswer: (isCorrect: boolean) => void
  answered: boolean
}

type OpenEndedPhase = "writing" | "grading" | "done"

export function OpenEnded({ question, onAnswer, answered }: OpenEndedProps) {
  const [userText, setUserText] = useState("")
  const [phase, setPhase] = useState<OpenEndedPhase>(
    answered ? "done" : "writing"
  )

  function handleSubmit() {
    setPhase("grading")
  }

  function handleSelfGrade(correct: boolean) {
    setPhase("done")
    onAnswer(correct)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>

      {question.hint && phase === "writing" && (
        <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">{question.hint}</p>
        </div>
      )}

      <Textarea
        value={userText}
        onChange={e => setUserText(e.target.value)}
        placeholder="Type your answer..."
        rows={4}
        disabled={phase !== "writing"}
      />

      {phase === "writing" && (
        <Button onClick={handleSubmit} disabled={!userText.trim()}>
          Submit Answer
        </Button>
      )}

      {phase === "grading" && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
              Sample Answer
            </p>
            <p className="text-sm">{question.sampleAnswer}</p>
          </div>

          <p className="text-sm font-medium">
            Compare your answer to the sample. Did you get it right?
          </p>

          <div className="flex gap-3">
            <Button
              onClick={() => handleSelfGrade(true)}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <Check className="mr-2 h-4 w-4" />
              I got it right
            </Button>
            <Button
              onClick={() => handleSelfGrade(false)}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <X className="mr-2 h-4 w-4" />
              I got it wrong
            </Button>
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
            Sample Answer
          </p>
          <p className="text-sm">{question.sampleAnswer}</p>
        </div>
      )}
    </div>
  )
}
