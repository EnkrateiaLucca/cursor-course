"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { ParsedQuiz, QuizAnswer } from "@/lib/types"
import { ScoreRing } from "@/components/results/score-ring"
import { QuestionBreakdown } from "@/components/results/question-breakdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Upload } from "lucide-react"

interface QuizResult {
  quiz: ParsedQuiz
  answers: QuizAnswer[]
  score: number
  total: number
  completedAt: string
}

interface ResultsPageClientProps {
  slug: string
}

export function ResultsPageClient({ slug }: ResultsPageClientProps) {
  const router = useRouter()
  const [result, setResult] = useState<QuizResult | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem(`quizResult:${slug}`)
    if (stored) {
      setResult(JSON.parse(stored))
    }
  }, [slug])

  if (!result) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">No results found.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardContent className="space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{result.quiz.title}</h1>
            <p className="mt-1 text-muted-foreground">Quiz Complete!</p>
          </div>

          <ScoreRing score={result.score} total={result.total} />

          <QuestionBreakdown quiz={result.quiz} answers={result.answers} />

          <div className="flex justify-center gap-3">
            <Button
              onClick={() => router.push(`/quiz/${slug}`)}
              variant="outline"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry Quiz
            </Button>
            <Button onClick={() => router.push("/upload")}>
              <Upload className="mr-2 h-4 w-4" />
              Upload New Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
