"use client"

import { useEffect, useState } from "react"
import type { ParsedQuiz } from "@/lib/types"
import { sampleQuiz } from "@/lib/sample-quiz"
import { getQuizBySlug } from "@/actions/quiz-actions"
import { QuizPlayer } from "@/components/quiz/quiz-player"
import { Loader2 } from "lucide-react"

interface QuizPageClientProps {
  slug: string
}

export function QuizPageClient({ slug }: QuizPageClientProps) {
  const [quiz, setQuiz] = useState<ParsedQuiz | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadQuiz() {
      // "sample" slug uses the hardcoded sample quiz
      if (slug === "sample") {
        setQuiz(sampleQuiz)
        return
      }

      // "preview" slug reads from sessionStorage (uploaded but not yet saved)
      if (slug === "preview") {
        const stored = sessionStorage.getItem("pendingQuiz")
        if (stored) {
          setQuiz(JSON.parse(stored))
        } else {
          setError("No quiz data found. Try uploading a file first.")
        }
        return
      }

      // Try fetching from DB
      try {
        const dbQuiz = await getQuizBySlug(slug)
        if (dbQuiz) {
          setQuiz({
            title: dbQuiz.title,
            description: dbQuiz.description || undefined,
            questions: dbQuiz.questions
          })
        } else {
          setError("Quiz not found.")
        }
      } catch {
        setError("Quiz not found.")
      }
    }

    loadQuiz()
  }, [slug])

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <QuizPlayer quiz={quiz} slug={slug} />
    </div>
  )
}
