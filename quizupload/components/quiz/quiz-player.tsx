"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { ParsedQuiz, QuizAnswer } from "@/lib/types"
import { QuizProgressBar } from "./progress-bar"
import { QuestionCard } from "./question-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

type Phase = "playing" | "answered" | "complete"

interface QuizPlayerProps {
  quiz: ParsedQuiz
  slug: string
}

export function QuizPlayer({ quiz, slug }: QuizPlayerProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("playing")
  const [answers, setAnswers] = useState<QuizAnswer[]>([])

  const currentQuestion = quiz.questions[currentIndex]
  const isLastQuestion = currentIndex === quiz.questions.length - 1

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      setAnswers(prev => [
        ...prev,
        {
          questionIndex: currentIndex,
          userAnswer: "", // simplified — tracked via isCorrect
          isCorrect
        }
      ])
      setPhase("answered")
    },
    [currentIndex]
  )

  function handleNext() {
    if (isLastQuestion) {
      // Store results in sessionStorage and navigate
      const finalAnswers = answers
      const score = finalAnswers.filter(a => a.isCorrect).length

      sessionStorage.setItem(
        `quizResult:${slug}`,
        JSON.stringify({
          quiz,
          answers: finalAnswers,
          score,
          total: quiz.questions.length,
          completedAt: new Date().toISOString()
        })
      )

      router.push(`/quiz/${slug}/results`)
    } else {
      setCurrentIndex(prev => prev + 1)
      setPhase("playing")
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        {quiz.description && (
          <p className="mt-1 text-muted-foreground">{quiz.description}</p>
        )}
      </div>

      <QuizProgressBar current={currentIndex} total={quiz.questions.length} />

      <QuestionCard
        key={currentIndex}
        question={currentQuestion}
        onAnswer={handleAnswer}
        answered={phase === "answered"}
      />

      {phase === "answered" && (
        <div className="flex justify-end">
          <Button onClick={handleNext} size="lg">
            {isLastQuestion ? "See Results" : "Next Question"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
