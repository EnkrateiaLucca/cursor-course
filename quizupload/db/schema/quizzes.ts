import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { customers } from "./customers"

export const quizzes = pgTable("quizzes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id"), // nullable — anonymous uploads allowed
  title: text("title").notNull(),
  description: text("description"),
  slug: text("slug").unique().notNull(),
  sourceFormat: text("source_format").notNull(), // "json" | "md"
  questionCount: integer("question_count").notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
  customer: one(customers, {
    fields: [quizzes.userId],
    references: [customers.userId]
  }),
  questions: many(questions),
  attempts: many(attempts)
}))

export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => quizzes.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // "multiple-choice" | "yes-no" | "open-ended"
  questionText: text("question_text").notNull(),
  options: text("options"), // JSON stringified array for MC
  correctAnswer: text("correct_answer"), // index for MC, "true"/"false" for YN
  explanation: text("explanation"),
  hint: text("hint"),
  sampleAnswer: text("sample_answer"),
  orderIndex: integer("order_index").notNull()
})

export const questionsRelations = relations(questions, ({ one }) => ({
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id]
  })
}))

export const attempts = pgTable("attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => quizzes.id, { onDelete: "cascade" }),
  userId: text("user_id"), // nullable — anonymous attempts allowed
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  timeTakenSeconds: integer("time_taken_seconds"),
  completedAt: timestamp("completed_at").defaultNow().notNull()
})

export const attemptsRelations = relations(attempts, ({ one, many }) => ({
  quiz: one(quizzes, {
    fields: [attempts.quizId],
    references: [quizzes.id]
  }),
  responses: many(responses)
}))

export const responses = pgTable("responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  attemptId: uuid("attempt_id")
    .notNull()
    .references(() => attempts.id, { onDelete: "cascade" }),
  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  userAnswer: text("user_answer"),
  isCorrect: boolean("is_correct").notNull()
})

export const responsesRelations = relations(responses, ({ one }) => ({
  attempt: one(attempts, {
    fields: [responses.attemptId],
    references: [attempts.id]
  }),
  question: one(questions, {
    fields: [responses.questionId],
    references: [questions.id]
  })
}))

export type InsertQuiz = typeof quizzes.$inferInsert
export type SelectQuiz = typeof quizzes.$inferSelect
export type InsertQuestion = typeof questions.$inferInsert
export type SelectQuestion = typeof questions.$inferSelect
export type InsertAttempt = typeof attempts.$inferInsert
export type SelectAttempt = typeof attempts.$inferSelect
export type InsertResponse = typeof responses.$inferInsert
export type SelectResponse = typeof responses.$inferSelect
