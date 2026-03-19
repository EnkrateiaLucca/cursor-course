import { z } from "zod"

const multipleChoiceSchema = z.object({
  type: z.literal("multiple-choice"),
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(8),
  answer: z.number().int().min(0),
  explanation: z.string().optional()
})

const yesNoSchema = z.object({
  type: z.literal("yes-no"),
  question: z.string().min(1),
  answer: z.boolean(),
  explanation: z.string().optional()
})

const openEndedSchema = z.object({
  type: z.literal("open-ended"),
  question: z.string().min(1),
  hint: z.string().optional(),
  sampleAnswer: z.string().min(1)
})

const questionSchema = z.discriminatedUnion("type", [
  multipleChoiceSchema,
  yesNoSchema,
  openEndedSchema
])

export const quizJsonSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1).max(100)
})

export type QuizJsonInput = z.input<typeof quizJsonSchema>
