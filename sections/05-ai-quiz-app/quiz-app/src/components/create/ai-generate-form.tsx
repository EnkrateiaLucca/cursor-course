"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AiGenerateFormProps {
  onGenerate: (data: {
    title: string;
    content: string;
    questionCount: number;
  }) => void;
  isLoading: boolean;
  error?: string | null;
}

export function AiGenerateForm({
  onGenerate,
  isLoading,
  error,
}: AiGenerateFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [questionCount, setQuestionCount] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onGenerate({ title: title.trim(), content: content.trim(), questionCount });
  };

  const isValid = title.trim().length > 0 && content.trim().length >= 20;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="ai-title" className="text-sm font-medium">
          Quiz Title
        </label>
        <Input
          id="ai-title"
          placeholder="e.g. JavaScript Fundamentals"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="ai-content" className="text-sm font-medium">
          Content to Generate From
        </label>
        <Textarea
          id="ai-content"
          placeholder="Paste your notes, article text, study material, or any content you want to generate a quiz from…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
          className="min-h-[200px]"
        />
        <p className="text-xs text-muted-foreground">
          Minimum 20 characters. The more content you provide, the better the questions.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="ai-count" className="text-sm font-medium">
          Number of Questions
        </label>
        <div className="flex items-center gap-3">
          <Input
            id="ai-count"
            type="number"
            min={1}
            max={30}
            value={questionCount}
            onChange={(e) =>
              setQuestionCount(
                Math.max(1, Math.min(30, parseInt(e.target.value) || 1))
              )
            }
            disabled={isLoading}
            className="w-24"
          />
          <span className="text-sm text-muted-foreground">
            (1–30 questions)
          </span>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" disabled={!isValid || isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Generating Quiz…
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Generate Quiz with AI
          </>
        )}
      </Button>
    </form>
  );
}
