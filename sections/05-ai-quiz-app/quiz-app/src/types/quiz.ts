export type QuestionType = "multiple-choice" | "open-ended";

export interface MultipleChoiceQuestion {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  sourceUrl?: string;
}

export interface OpenEndedQuestion {
  type: "open-ended";
  question: string;
  acceptedAnswers: string[];
  explanation?: string;
}

export type Question = MultipleChoiceQuestion | OpenEndedQuestion;

export interface Quiz {
  id: string;
  userId: string;
  title: string;
  description?: string;
  questions: Question[];
  isPublic: boolean;
  sourceType: "upload" | "ai-generated" | "manual";
  questionCount: number;
  createdAt: string;
  updatedAt: string;
}

export type AnswerResult = "correct" | "incorrect" | "skipped";

export interface QuestionResult {
  questionIndex: number;
  userAnswer: string | number | null;
  result: AnswerResult;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  results: QuestionResult[];
  skippedCount: number;
  incorrectCount: number;
  completedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  stripeCustomerId?: string;
  subscriptionStatus: "free" | "pro" | "cancelled";
  aiGenerationsUsed: number;
  aiGenerationsResetAt?: string;
  createdAt: string;
  updatedAt: string;
}
