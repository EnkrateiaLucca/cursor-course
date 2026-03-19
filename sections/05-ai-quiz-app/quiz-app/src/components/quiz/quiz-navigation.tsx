"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  SkipForward,
  Send,
  Trophy,
} from "lucide-react";

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  canSubmit: boolean;
  isAnswered: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onSkip: () => void;
  onSeeResults: () => void;
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  canSubmit,
  isAnswered,
  onPrevious,
  onNext,
  onSubmit,
  onSkip,
  onSeeResults,
}: QuizNavigationProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
        <ChevronLeft className="mr-1 size-4" /> Previous
      </Button>

      <div className="flex gap-2">
        {!isAnswered && (
          <>
            <Button variant="outline" onClick={onSkip}>
              <SkipForward className="mr-1 size-4" /> Skip
            </Button>
            <Button onClick={onSubmit} disabled={!canSubmit}>
              <Send className="mr-1 size-4" /> Submit
            </Button>
          </>
        )}

        {isAnswered &&
          (isLast ? (
            <Button onClick={onSeeResults}>
              <Trophy className="mr-1 size-4" /> See Results
            </Button>
          ) : (
            <Button onClick={onNext}>
              Next <ChevronRight className="ml-1 size-4" />
            </Button>
          ))}
      </div>
    </div>
  );
}
