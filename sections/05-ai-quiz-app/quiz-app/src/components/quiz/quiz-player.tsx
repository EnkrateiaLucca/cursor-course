"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { Question, AnswerResult, QuestionResult } from "@/types/quiz";
import { QuizProgressBar } from "./progress-bar";
import { QuestionCard } from "./question-card";
import { AnswerFeedback } from "./answer-feedback";
import { QuizNavigation } from "./quiz-navigation";

interface QuizPlayerProps {
  quizId: string;
  questions: Question[];
  title: string;
}

interface QuestionState {
  status: "unanswered" | "answered" | "skipped";
  userAnswer: string | number | null;
  result: AnswerResult | null;
}

function checkAnswer(
  question: Question,
  answer: string | number | null
): AnswerResult {
  if (answer === null) return "skipped";

  if (question.type === "multiple-choice") {
    return answer === question.correctAnswer ? "correct" : "incorrect";
  }

  const userText = String(answer).trim().toLowerCase();
  return question.acceptedAnswers.some((a) => a.toLowerCase() === userText)
    ? "correct"
    : "incorrect";
}

export function QuizPlayer({ quizId, questions, title }: QuizPlayerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>(() =>
    questions.map(() => ({ status: "unanswered", userAnswer: null, result: null }))
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState("");

  const currentQuestion = questions[currentIndex];
  const currentState = questionStates[currentIndex];
  const isAnswered = currentState.status !== "unanswered";

  const restoreInputState = useCallback(
    (index: number, states: QuestionState[]) => {
      const state = states[index];
      if (state.status === "unanswered") {
        setSelectedOption(null);
        setTextAnswer("");
      } else if (questions[index].type === "multiple-choice") {
        setSelectedOption(state.userAnswer as number | null);
      } else {
        setTextAnswer((state.userAnswer as string) || "");
      }
    },
    [questions]
  );

  const handleSubmit = useCallback(() => {
    const answer =
      currentQuestion.type === "multiple-choice" ? selectedOption : textAnswer;
    if (answer === null && currentQuestion.type === "multiple-choice") return;
    if (currentQuestion.type === "open-ended" && !textAnswer.trim()) return;

    const result = checkAnswer(currentQuestion, answer);

    setQuestionStates((prev) => {
      const next = [...prev];
      next[currentIndex] = { status: "answered", userAnswer: answer, result };
      return next;
    });
  }, [currentIndex, currentQuestion, selectedOption, textAnswer]);

  const handleSkip = useCallback(() => {
    setQuestionStates((prev) => {
      const next = [...prev];
      next[currentIndex] = {
        status: "skipped",
        userAnswer: null,
        result: "skipped",
      };
      return next;
    });
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      restoreInputState(nextIndex, questionStates);
    }
  }, [currentIndex, questions.length, questionStates, restoreInputState]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      restoreInputState(prevIndex, questionStates);
    }
  }, [currentIndex, questionStates, restoreInputState]);

  const handleSeeResults = useCallback(() => {
    const finalStates = questionStates.map((s) =>
      s.status === "unanswered"
        ? { status: "skipped" as const, userAnswer: null, result: "skipped" as AnswerResult }
        : s
    );

    const results: QuestionResult[] = finalStates.map((s, i) => ({
      questionIndex: i,
      userAnswer: s.userAnswer,
      result: s.result || "skipped",
    }));

    const score = results.filter((r) => r.result === "correct").length;
    const skippedCount = results.filter((r) => r.result === "skipped").length;
    const incorrectCount = results.filter(
      (r) => r.result === "incorrect"
    ).length;

    const attemptData = {
      quizId,
      score,
      totalQuestions: questions.length,
      percentage:
        Math.round((score / questions.length) * 100 * 100) / 100,
      results,
      skippedCount,
      incorrectCount,
      questions,
      title,
    };

    sessionStorage.setItem(
      `quiz-results-${quizId}`,
      JSON.stringify(attemptData)
    );
    router.push(`/quiz/${quizId}/results`);
  }, [quizId, questions, questionStates, title, router]);

  const canSubmit =
    currentQuestion.type === "multiple-choice"
      ? selectedOption !== null
      : textAnswer.trim().length > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-6 text-2xl font-bold tracking-tight">{title}</h1>
        <QuizProgressBar current={currentIndex} total={questions.length} />
      </motion.div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentIndex}
              question={currentQuestion}
              index={currentIndex}
              selectedOption={selectedOption}
              textAnswer={textAnswer}
              onSelectOption={setSelectedOption}
              onTextChange={setTextAnswer}
              disabled={isAnswered}
              showResult={isAnswered}
            />
          </AnimatePresence>

          <AnimatePresence>
            {isAnswered && currentState.result && (
              <AnswerFeedback
                result={currentState.result}
                question={currentQuestion}
              />
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <QuizNavigation
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        canSubmit={canSubmit}
        isAnswered={isAnswered}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        onSkip={handleSkip}
        onSeeResults={handleSeeResults}
      />
    </div>
  );
}
