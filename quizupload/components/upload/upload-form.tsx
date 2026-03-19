"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileDropzone } from "./file-dropzone"
import { QuizPreview } from "./quiz-preview"
import { parseQuizFile } from "@/lib/parsers"
import { saveQuiz } from "@/actions/quiz-actions"
import type { ParsedQuiz } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Play } from "lucide-react"

type UploadState =
  | { phase: "idle" }
  | { phase: "parsing" }
  | { phase: "preview"; quiz: ParsedQuiz; fileName: string }
  | { phase: "saving" }
  | { phase: "error"; message: string }

interface UploadFormProps {
  userId?: string
}

export function UploadForm({ userId }: UploadFormProps) {
  const [state, setState] = useState<UploadState>({ phase: "idle" })
  const router = useRouter()

  async function handleFileAccepted(file: File) {
    setState({ phase: "parsing" })

    const result = await parseQuizFile(file)

    if (result.success) {
      setState({ phase: "preview", quiz: result.quiz, fileName: file.name })
    } else {
      setState({ phase: "error", message: result.error })
    }
  }

  async function handleStartQuiz() {
    if (state.phase !== "preview") return

    const { quiz, fileName } = state
    const ext = fileName.split(".").pop()?.toLowerCase()
    const sourceFormat = ext === "md" || ext === "markdown" ? "md" : "json"

    try {
      // Try saving to DB first
      setState({ phase: "saving" })
      const { slug } = await saveQuiz(quiz, sourceFormat as "json" | "md", userId)
      router.push(`/quiz/${slug}`)
    } catch {
      // If DB not available, fall back to sessionStorage
      sessionStorage.setItem("pendingQuiz", JSON.stringify(quiz))
      router.push("/quiz/preview")
    }
  }

  function handleReset() {
    setState({ phase: "idle" })
  }

  return (
    <div className="space-y-6">
      {state.phase === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.phase !== "preview" && state.phase !== "saving" && (
        <FileDropzone
          onFileAccepted={handleFileAccepted}
          disabled={state.phase === "parsing"}
        />
      )}

      {(state.phase === "parsing" || state.phase === "saving") && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {state.phase === "parsing" ? "Parsing quiz file..." : "Saving quiz..."}
        </div>
      )}

      {state.phase === "preview" && (
        <>
          <QuizPreview quiz={state.quiz} />

          <div className="flex gap-3">
            <Button onClick={handleStartQuiz} size="lg">
              <Play className="mr-2 h-4 w-4" />
              Start Quiz
            </Button>
            <Button variant="outline" onClick={handleReset} size="lg">
              Upload Different File
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
