"use client"

import { Info } from "lucide-react"

interface ExplanationBoxProps {
  explanation?: string
}

export function ExplanationBox({ explanation }: ExplanationBoxProps) {
  if (!explanation) return null

  return (
    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <div className="flex gap-2">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
        <p className="text-sm text-blue-800">{explanation}</p>
      </div>
    </div>
  )
}
