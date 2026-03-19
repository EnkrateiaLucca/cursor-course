"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";
import type { Question, QuestionResult } from "@/types/quiz";

interface QuestionBreakdownProps {
  questions: Question[];
  results: QuestionResult[];
  selectedIndices: Set<number>;
  onToggle: (index: number) => void;
}

function getCorrectAnswer(question: Question): string {
  if (question.type === "multiple-choice") {
    return question.options[question.correctAnswer] ?? "N/A";
  }
  return question.acceptedAnswers.join(" / ");
}

function getUserAnswerText(question: Question, result: QuestionResult): string {
  if (result.result === "skipped") return "(skipped)";
  if (question.type === "multiple-choice" && typeof result.userAnswer === "number") {
    return question.options[result.userAnswer] ?? "N/A";
  }
  return String(result.userAnswer ?? "");
}

const resultConfig = {
  correct: {
    icon: CheckCircle,
    label: "Correct",
    badgeClass: "bg-green-100 text-green-700 border-green-300",
    borderClass: "border-l-green-500",
  },
  incorrect: {
    icon: XCircle,
    label: "Incorrect",
    badgeClass: "bg-red-100 text-red-700 border-red-300",
    borderClass: "border-l-red-500",
  },
  skipped: {
    icon: MinusCircle,
    label: "Skipped",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-300",
    borderClass: "border-l-amber-500",
  },
};

export function QuestionBreakdown({
  questions,
  results,
  selectedIndices,
  onToggle,
}: QuestionBreakdownProps) {
  return (
    <div className="space-y-3">
      {results.map((r, i) => {
        const q = questions[r.questionIndex];
        const config = resultConfig[r.result];
        const Icon = config.icon;

        return (
          <motion.div
            key={r.questionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
          >
            <Card className={`border-l-4 ${config.borderClass}`}>
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedIndices.has(r.questionIndex)}
                    onCheckedChange={() => onToggle(r.questionIndex)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        Q{r.questionIndex + 1}
                      </span>
                      <Badge variant="outline" className={config.badgeClass}>
                        <Icon className="mr-1 h-3 w-3" />
                        {config.label}
                      </Badge>
                    </div>
                    <p className="font-medium">{q.question}</p>
                    <div className="mt-2 text-sm text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium">Your answer:</span>{" "}
                        {getUserAnswerText(q, r)}
                      </p>
                      <p>
                        <span className="font-medium">Correct answer:</span>{" "}
                        {getCorrectAnswer(q)}
                      </p>
                      {q.explanation && (
                        <p className="italic">{q.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
