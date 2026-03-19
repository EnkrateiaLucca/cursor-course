"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ResultsSummary } from "@/components/results/results-summary";
import { QuestionBreakdown } from "@/components/results/question-breakdown";
import { SelectControls } from "@/components/results/select-controls";
import { ExportButtons } from "@/components/results/export-buttons";
import type { Question, QuestionResult } from "@/types/quiz";

interface AttemptData {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  results: QuestionResult[];
  skippedCount: number;
  incorrectCount: number;
  questions: Question[];
  title: string;
}

export default function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<AttemptData | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`quiz-results-${id}`);
    if (!stored) {
      router.replace(`/quiz/${id}`);
      return;
    }
    const parsed: AttemptData = JSON.parse(stored);
    setData(parsed);
    setSelectedIndices(new Set(parsed.results.map((r) => r.questionIndex)));
  }, [id, router]);

  useEffect(() => {
    if (!data || saved) return;
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizId: data.quizId,
        score: data.score,
        totalQuestions: data.totalQuestions,
        percentage: data.percentage,
        results: data.results,
        skippedCount: data.skippedCount,
        incorrectCount: data.incorrectCount,
      }),
    })
      .then((res) => {
        if (res.ok) setSaved(true);
      })
      .catch(() => {
        // Attempt save is best-effort — quiz results are still shown from sessionStorage
      });
  }, [data, saved]);

  const toggleIndex = useCallback((index: number) => {
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    if (!data) return;
    setSelectedIndices(new Set(data.results.map((r) => r.questionIndex)));
  }, [data]);

  const deselectAll = useCallback(() => {
    setSelectedIndices(new Set());
  }, []);

  if (!data) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold tracking-tight mb-1">{data.title}</h1>
        <p className="text-muted-foreground">Quiz Results</p>
      </motion.div>

      <ResultsSummary
        score={data.score}
        totalQuestions={data.totalQuestions}
        percentage={data.percentage}
        skippedCount={data.skippedCount}
        incorrectCount={data.incorrectCount}
      />

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Question Breakdown</h2>
          <ExportButtons
            title={data.title}
            score={data.score}
            totalQuestions={data.totalQuestions}
            percentage={data.percentage}
            questions={data.questions}
            results={data.results}
            selectedIndices={selectedIndices}
          />
        </div>

        <SelectControls
          totalCount={data.results.length}
          selectedCount={selectedIndices.size}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
        />

        <QuestionBreakdown
          questions={data.questions}
          results={data.results}
          selectedIndices={selectedIndices}
          onToggle={toggleIndex}
        />
      </div>

      <Separator />

      <div className="flex gap-3">
        <Button
          onClick={() => {
            sessionStorage.removeItem(`quiz-results-${id}`);
            router.push(`/quiz/${id}`);
          }}
        >
          Retake Quiz
        </Button>
        <Button variant="outline" onClick={() => router.push("/quiz/create")}>
          New Quiz
        </Button>
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          Dashboard
        </Button>
      </div>
    </div>
  );
}
