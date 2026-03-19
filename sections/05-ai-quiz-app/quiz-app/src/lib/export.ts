import type { Question, QuestionResult } from "@/types/quiz";

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

export function exportCSV(
  questions: Question[],
  results: QuestionResult[],
  selectedIndices: Set<number>
): string {
  const header = "Question,Your Answer,Correct Answer,Result";
  const rows = results
    .filter((r) => selectedIndices.has(r.questionIndex))
    .map((r) => {
      const q = questions[r.questionIndex];
      const question = `"${q.question.replace(/"/g, '""')}"`;
      const userAnswer = `"${getUserAnswerText(q, r).replace(/"/g, '""')}"`;
      const correctAnswer = `"${getCorrectAnswer(q).replace(/"/g, '""')}"`;
      const result = r.result;
      return `${question},${userAnswer},${correctAnswer},${result}`;
    });

  return [header, ...rows].join("\n");
}

export function exportLLMReviewMarkdown(
  title: string,
  score: number,
  totalQuestions: number,
  percentage: number,
  questions: Question[],
  results: QuestionResult[],
  selectedIndices: Set<number>
): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const selected = results.filter((r) => selectedIndices.has(r.questionIndex));
  const incorrect = selected.filter((r) => r.result === "incorrect");
  const skipped = selected.filter((r) => r.result === "skipped");

  let md = `# Quiz Review: ${title}\n\n`;
  md += `**Date:** ${date}\n`;
  md += `**Score:** ${score} / ${totalQuestions} (${percentage}%)\n\n`;
  md += `---\n\n`;
  md += `> **Prompt:** Please review my quiz results below. Identify my knowledge gaps, explain the correct answers for questions I got wrong or skipped, and suggest specific topics I should study to improve.\n\n`;
  md += `---\n\n`;

  md += `## Question Breakdown\n\n`;
  for (const r of selected) {
    const q = questions[r.questionIndex];
    const icon = r.result === "correct" ? "✅" : r.result === "incorrect" ? "❌" : "⏭️";
    md += `### ${icon} Question ${r.questionIndex + 1}\n\n`;
    md += `**Q:** ${q.question}\n\n`;
    md += `**Your answer:** ${getUserAnswerText(q, r)}\n\n`;
    md += `**Correct answer:** ${getCorrectAnswer(q)}\n\n`;
    if (q.explanation) {
      md += `**Explanation:** ${q.explanation}\n\n`;
    }
    md += `---\n\n`;
  }

  if (incorrect.length > 0) {
    md += `## Incorrect Answers (${incorrect.length})\n\n`;
    for (const r of incorrect) {
      const q = questions[r.questionIndex];
      md += `- **Q${r.questionIndex + 1}:** ${q.question}\n`;
    }
    md += `\n`;
  }

  if (skipped.length > 0) {
    md += `## Skipped Questions (${skipped.length})\n\n`;
    for (const r of skipped) {
      const q = questions[r.questionIndex];
      md += `- **Q${r.questionIndex + 1}:** ${q.question}\n`;
    }
    md += `\n`;
  }

  return md;
}

export function exportAnkiCards(
  questions: Question[],
  results: QuestionResult[],
  selectedIndices: Set<number>
): string {
  return results
    .filter((r) => selectedIndices.has(r.questionIndex))
    .map((r) => {
      const q = questions[r.questionIndex];
      const answer = getCorrectAnswer(q);
      return `${q.question}; ${answer}`;
    })
    .join("\n");
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
