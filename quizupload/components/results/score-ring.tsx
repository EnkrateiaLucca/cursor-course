"use client"

import { getScoreColor, getScoreRingColor } from "@/lib/utils"

interface ScoreRingProps {
  score: number
  total: number
}

export function ScoreRing({ score, total }: ScoreRingProps) {
  const percent = Math.round((score / total) * 100)
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-40 w-40">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            className="stroke-muted"
          />
          {/* Score arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={getScoreRingColor(percent)}
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getScoreColor(percent)}`}>
            {percent}%
          </span>
        </div>
      </div>

      <p className="text-lg text-muted-foreground">
        <span className="font-semibold text-foreground">{score}</span> out of{" "}
        <span className="font-semibold text-foreground">{total}</span> correct
      </p>
    </div>
  )
}
