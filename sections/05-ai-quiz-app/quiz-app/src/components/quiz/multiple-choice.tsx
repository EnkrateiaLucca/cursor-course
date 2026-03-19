"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultipleChoiceProps {
  options: string[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
  disabled: boolean;
  correctAnswer?: number;
  showResult: boolean;
}

export function MultipleChoice({
  options,
  selectedOption,
  onSelect,
  disabled,
  correctAnswer,
  showResult,
}: MultipleChoiceProps) {
  return (
    <div className="grid gap-3">
      {options.map((option, index) => {
        const isSelected = selectedOption === index;
        const isCorrect = showResult && correctAnswer === index;
        const isWrong = showResult && isSelected && correctAnswer !== index;

        return (
          <motion.button
            key={index}
            whileHover={disabled ? {} : { scale: 1.01 }}
            whileTap={disabled ? {} : { scale: 0.99 }}
            onClick={() => !disabled && onSelect(index)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors",
              isCorrect && "border-green-500 bg-green-500/10",
              isWrong && "border-destructive bg-destructive/10",
              isSelected && !showResult && "border-primary bg-primary/5",
              !isSelected &&
                !showResult &&
                !disabled &&
                "border-border hover:border-muted-foreground/50",
              !isSelected && !isCorrect && !isWrong && "border-border",
              disabled &&
                !isCorrect &&
                !isWrong &&
                "cursor-not-allowed opacity-60"
            )}
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium",
                isCorrect && "border-green-500 bg-green-500 text-white",
                isWrong && "border-destructive bg-destructive text-white",
                isSelected &&
                  !showResult &&
                  "border-primary bg-primary text-primary-foreground",
                !isSelected &&
                  !isCorrect &&
                  !isWrong &&
                  "border-muted-foreground/30"
              )}
            >
              {isCorrect ? (
                <Check className="size-4" />
              ) : isWrong ? (
                <X className="size-4" />
              ) : (
                String.fromCharCode(65 + index)
              )}
            </span>
            <span className="flex-1">{option}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
