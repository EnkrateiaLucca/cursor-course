"use server"

import { db } from "@/db"
import { attempts, responses } from "@/db/schema/quizzes"
import type { QuizAnswer } from "@/lib/types"
import { eq, desc } from "drizzle-orm"

export async function saveAttempt(
  quizId: string,
  questionIds: string[],
  answers: QuizAnswer[],
  score: number,
  totalQuestions: number,
  userId?: string,
  timeTakenSeconds?: number
) {
  const [attempt] = await db
    .insert(attempts)
    .values({
      quizId,
      userId: userId || null,
      score,
      totalQuestions,
      timeTakenSeconds: timeTakenSeconds || null
    })
    .returning()

  // Insert individual responses
  const responseValues = answers.map((a, i) => ({
    attemptId: attempt.id,
    questionId: questionIds[i],
    userAnswer: typeof a.userAnswer === "string" ? a.userAnswer : String(a.userAnswer),
    isCorrect: a.isCorrect
  }))

  if (responseValues.length > 0) {
    await db.insert(responses).values(responseValues)
  }

  return { attemptId: attempt.id }
}

export async function getAttemptById(attemptId: string) {
  return db.query.attempts.findFirst({
    where: eq(attempts.id, attemptId),
    with: {
      responses: true
    }
  })
}

export async function getAttemptsByQuiz(quizId: string) {
  return db.query.attempts.findMany({
    where: eq(attempts.quizId, quizId),
    orderBy: [desc(attempts.completedAt)]
  })
}

export async function getAttemptsByUser(userId: string) {
  return db.query.attempts.findMany({
    where: eq(attempts.userId, userId),
    orderBy: [desc(attempts.completedAt)]
  })
}
