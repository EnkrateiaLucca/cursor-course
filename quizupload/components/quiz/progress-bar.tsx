"use client"

import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  current: number
  total: number
}

export function QuizProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round(((current + 1) / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{percent}%</span>
      </div>
      <Progress value={percent} className="h-2" />
    </div>
  )
}
