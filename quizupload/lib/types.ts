// Discriminated union for question types
export type MultipleChoiceQuestion = {
  type: "multiple-choice"
  question: string
  options: string[]
  answer: number // index into options
  explanation?: string
}

export type YesNoQuestion = {
  type: "yes-no"
  question: string
  answer: boolean
  explanation?: string
}

export type OpenEndedQuestion = {
  type: "open-ended"
  question: string
  hint?: string
  sampleAnswer: string
}

export type Question = MultipleChoiceQuestion | YesNoQuestion | OpenEndedQuestion

export type ParsedQuiz = {
  title: string
  description?: string
  questions: Question[]
}

// Quiz player state
export type QuizAnswer = {
  questionIndex: number
  userAnswer: number | boolean | string
  isCorrect: boolean
}

export type QuizState = {
  currentIndex: number
  answers: QuizAnswer[]
  phase: "playing" | "answered" | "complete"
}
