import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getScoreColor(percent: number): string {
  if (percent >= 70) return "text-green-600"
  if (percent >= 40) return "text-yellow-600"
  return "text-red-600"
}

export function getScoreRingColor(percent: number): string {
  if (percent >= 70) return "stroke-green-500"
  if (percent >= 40) return "stroke-yellow-500"
  return "stroke-red-500"
}

export function formatScore(correct: number, total: number): string {
  const percent = Math.round((correct / total) * 100)
  return `${correct}/${total} — ${percent}%`
}
