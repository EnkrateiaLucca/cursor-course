import { z } from "zod";

export const multipleChoiceQuestionSchema = z.object({
  type: z.literal("multiple-choice"),
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(10),
  correctAnswer: z.number().int().min(0),
  explanation: z.string().optional(),
  sourceUrl: z.string().url().optional(),
});

export const openEndedQuestionSchema = z.object({
  type: z.literal("open-ended"),
  question: z.string().min(1),
  acceptedAnswers: z.array(z.string().min(1)).min(1),
  explanation: z.string().optional(),
});

export const questionSchema = z.discriminatedUnion("type", [
  multipleChoiceQuestionSchema,
  openEndedQuestionSchema,
]);

export const createQuizSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  questions: z.array(questionSchema).min(1).max(100),
  isPublic: z.boolean().optional().default(false),
  sourceType: z.enum(["upload", "ai-generated", "manual"]).optional().default("upload"),
});

export const quizQuestionsSchema = z.array(questionSchema).min(1).max(100);

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
