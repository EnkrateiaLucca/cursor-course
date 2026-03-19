"use server"

import { db } from "@/db"
import { quizzes, questions } from "@/db/schema/quizzes"
import type { ParsedQuiz, Question } from "@/lib/types"
import { generateSlug } from "@/lib/slug"
import { eq, desc } from "drizzle-orm"

export async function saveQuiz(
  quiz: ParsedQuiz,
  sourceFormat: "json" | "md",
  userId?: string
) {
  const slug = generateSlug()

  const [insertedQuiz] = await db
    .insert(quizzes)
    .values({
      userId: userId || null,
      title: quiz.title,
      description: quiz.description || null,
      slug,
      sourceFormat,
      questionCount: quiz.questions.length,
      isPublic: true
    })
    .returning()

  // Insert all questions
  const questionValues = quiz.questions.map((q: Question, i: number) => ({
    quizId: insertedQuiz.id,
    type: q.type,
    questionText: q.question,
    options:
      q.type === "multiple-choice" ? JSON.stringify(q.options) : null,
    correctAnswer:
      q.type === "multiple-choice"
        ? String(q.answer)
        : q.type === "yes-no"
          ? String(q.answer)
          : null,
    explanation:
      q.type !== "open-ended" ? (q.explanation || null) : null,
    hint: q.type === "open-ended" ? (q.hint || null) : null,
    sampleAnswer:
      q.type === "open-ended" ? q.sampleAnswer : null,
    orderIndex: i
  }))

  await db.insert(questions).values(questionValues)

  return { slug, quizId: insertedQuiz.id }
}

export async function getQuizBySlug(slug: string) {
  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.slug, slug),
    with: {
      questions: {
        orderBy: (q, { asc }) => [asc(q.orderIndex)]
      }
    }
  })

  if (!quiz) return null

  // Convert DB format back to ParsedQuiz
  const parsedQuestions: Question[] = quiz.questions.map(q => {
    if (q.type === "multiple-choice") {
      return {
        type: "multiple-choice" as const,
        question: q.questionText,
        options: JSON.parse(q.options || "[]"),
        answer: parseInt(q.correctAnswer || "0"),
        ...(q.explanation && { explanation: q.explanation })
      }
    }
    if (q.type === "yes-no") {
      return {
        type: "yes-no" as const,
        question: q.questionText,
        answer: q.correctAnswer === "true",
        ...(q.explanation && { explanation: q.explanation })
      }
    }
    return {
      type: "open-ended" as const,
      question: q.questionText,
      sampleAnswer: q.sampleAnswer || "",
      ...(q.hint && { hint: q.hint })
    }
  })

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    slug: quiz.slug,
    questions: parsedQuestions,
    questionCount: quiz.questionCount,
    createdAt: quiz.createdAt
  }
}

export async function getUserQuizzes(userId: string) {
  return db.query.quizzes.findMany({
    where: eq(quizzes.userId, userId),
    orderBy: [desc(quizzes.createdAt)]
  })
}

export async function deleteQuiz(quizId: string, userId: string) {
  // Only allow deletion by owner
  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, quizId)
  })

  if (!quiz || quiz.userId !== userId) {
    throw new Error("Not authorized to delete this quiz")
  }

  await db.delete(quizzes).where(eq(quizzes.id, quizId))
  return { success: true }
}
