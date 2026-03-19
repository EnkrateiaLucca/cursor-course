"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText, BookOpen } from "lucide-react";
import { toast } from "sonner";
import type { Question, QuestionResult } from "@/types/quiz";
import {
  exportCSV,
  exportLLMReviewMarkdown,
  exportAnkiCards,
  downloadFile,
} from "@/lib/export";

interface ExportButtonsProps {
  title: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  questions: Question[];
  results: QuestionResult[];
  selectedIndices: Set<number>;
}

export function ExportButtons({
  title,
  score,
  totalQuestions,
  percentage,
  questions,
  results,
  selectedIndices,
}: ExportButtonsProps) {
  const hasSelection = selectedIndices.size > 0;

  const handleCSV = () => {
    if (!hasSelection) {
      toast.error("Select at least one question to export");
      return;
    }
    const csv = exportCSV(questions, results, selectedIndices);
    downloadFile(csv, "quiz_results.csv", "text/csv");
    toast.success("CSV downloaded");
  };

  const handleMarkdown = () => {
    if (!hasSelection) {
      toast.error("Select at least one question to export");
      return;
    }
    const md = exportLLMReviewMarkdown(
      title,
      score,
      totalQuestions,
      percentage,
      questions,
      results,
      selectedIndices
    );
    downloadFile(md, "quiz_review.md", "text/markdown");
    toast.success("LLM Review downloaded");
  };

  const handleAnki = () => {
    if (!hasSelection) {
      toast.error("Select at least one question to export");
      return;
    }
    const anki = exportAnkiCards(questions, results, selectedIndices);
    downloadFile(anki, "anki_cards.txt", "text/plain");
    toast.success("Anki cards downloaded");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={handleCSV}>
        <Download className="mr-2 h-4 w-4" />
        CSV
      </Button>
      <Button variant="outline" size="sm" onClick={handleMarkdown}>
        <FileText className="mr-2 h-4 w-4" />
        LLM Review
      </Button>
      <Button variant="outline" size="sm" onClick={handleAnki}>
        <BookOpen className="mr-2 h-4 w-4" />
        Anki Cards
      </Button>
    </div>
  );
}
