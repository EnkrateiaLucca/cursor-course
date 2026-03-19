"use client";

import { motion } from "framer-motion";
import type { Question } from "@/types/quiz";
import { MultipleChoice } from "./multiple-choice";
import { OpenEndedInput } from "./open-ended-input";

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedOption: number | null;
  textAnswer: string;
  onSelectOption: (index: number) => void;
  onTextChange: (text: string) => void;
  disabled: boolean;
  showResult: boolean;
}

export function QuestionCard({
  question,
  index,
  selectedOption,
  textAnswer,
  onSelectOption,
  onTextChange,
  disabled,
  showResult,
}: QuestionCardProps) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold leading-relaxed">
        {question.question}
      </h2>

      {question.type === "multiple-choice" ? (
        <MultipleChoice
          options={question.options}
          selectedOption={selectedOption}
          onSelect={onSelectOption}
          disabled={disabled}
          correctAnswer={showResult ? question.correctAnswer : undefined}
          showResult={showResult}
        />
      ) : (
        <OpenEndedInput
          value={textAnswer}
          onChange={onTextChange}
          disabled={disabled}
        />
      )}
    </motion.div>
  );
}
