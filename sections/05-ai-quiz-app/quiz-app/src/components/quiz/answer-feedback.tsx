"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, MinusCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnswerResult, Question } from "@/types/quiz";

interface AnswerFeedbackProps {
  result: AnswerResult;
  question: Question;
}

export function AnswerFeedback({ result, question }: AnswerFeedbackProps) {
  const correctAnswer =
    question.type === "multiple-choice"
      ? question.options[question.correctAnswer]
      : question.acceptedAnswers.join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "space-y-2 rounded-lg border p-4",
        result === "correct" && "border-green-500/30 bg-green-500/5",
        result === "incorrect" && "border-destructive/30 bg-destructive/5",
        result === "skipped" && "border-amber-500/30 bg-amber-500/5"
      )}
    >
      <div className="flex items-center gap-2">
        {result === "correct" && (
          <CheckCircle2 className="size-5 text-green-500" />
        )}
        {result === "incorrect" && (
          <XCircle className="size-5 text-destructive" />
        )}
        {result === "skipped" && (
          <MinusCircle className="size-5 text-amber-500" />
        )}
        <span
          className={cn(
            "font-semibold",
            result === "correct" && "text-green-500",
            result === "incorrect" && "text-destructive",
            result === "skipped" && "text-amber-500"
          )}
        >
          {result === "correct"
            ? "Correct!"
            : result === "incorrect"
              ? "Incorrect"
              : "Skipped"}
        </span>
      </div>

      {result !== "correct" && (
        <p className="text-sm">
          <span className="text-muted-foreground">Correct answer: </span>
          <span className="font-medium">{correctAnswer}</span>
        </p>
      )}

      {question.explanation && (
        <p className="text-sm text-muted-foreground">{question.explanation}</p>
      )}

      {question.type === "multiple-choice" && question.sourceUrl && (
        <a
          href={question.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <ExternalLink className="size-3" /> Source
        </a>
      )}
    </motion.div>
  );
}
