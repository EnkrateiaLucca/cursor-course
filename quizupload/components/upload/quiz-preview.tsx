"use client"

import type { ParsedQuiz } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, HelpCircle, ToggleLeft } from "lucide-react"

interface QuizPreviewProps {
  quiz: ParsedQuiz
}

const typeIcons = {
  "multiple-choice": CheckCircle,
  "yes-no": ToggleLeft,
  "open-ended": HelpCircle
}

const typeColors = {
  "multiple-choice": "bg-blue-100 text-blue-800",
  "yes-no": "bg-purple-100 text-purple-800",
  "open-ended": "bg-amber-100 text-amber-800"
}

export function QuizPreview({ quiz }: QuizPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{quiz.title}</CardTitle>
        {quiz.description && (
          <p className="text-sm text-muted-foreground">{quiz.description}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {quiz.questions.map((q, i) => {
            const Icon = typeIcons[q.type]
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <span className="mt-0.5 text-sm font-medium text-muted-foreground">
                  {i + 1}.
                </span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{q.question}</p>
                  <Badge
                    variant="secondary"
                    className={typeColors[q.type]}
                  >
                    <Icon className="mr-1 h-3 w-3" />
                    {q.type}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
