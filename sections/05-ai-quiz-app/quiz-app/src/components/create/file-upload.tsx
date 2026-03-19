"use client";

import { useCallback, useState } from "react";
import { Upload, FileJson, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { quizQuestionsSchema } from "@/lib/validators";

interface FileUploadProps {
  onUpload: (data: {
    title: string;
    questions: unknown[];
    fileName: string;
  }) => void;
  isLoading: boolean;
}

type UploadState =
  | { status: "idle" }
  | { status: "dragging" }
  | { status: "validating" }
  | { status: "valid"; fileName: string; questionCount: number; questions: unknown[] }
  | { status: "error"; message: string };

export function FileUpload({ onUpload, isLoading }: FileUploadProps) {
  const [state, setState] = useState<UploadState>({ status: "idle" });

  const processFile = useCallback((file: File) => {
    if (!file.name.endsWith(".json")) {
      setState({ status: "error", message: "Only .json files are accepted" });
      return;
    }

    setState({ status: "validating" });

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target?.result as string);

        const questions = raw.questions ?? raw;
        const parsed = quizQuestionsSchema.safeParse(questions);

        if (!parsed.success) {
          const firstIssue = parsed.error.issues[0];
          setState({
            status: "error",
            message: `Invalid quiz format: ${firstIssue?.message ?? "unknown error"} (at ${firstIssue?.path.join(".")})`,
          });
          return;
        }

        setState({
          status: "valid",
          fileName: file.name,
          questionCount: parsed.data.length,
          questions: parsed.data,
        });
      } catch {
        setState({ status: "error", message: "File is not valid JSON" });
      }
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleSubmit = () => {
    if (state.status !== "valid") return;
    const title = state.fileName.replace(/\.json$/i, "").replace(/[-_]/g, " ");
    onUpload({ title, questions: state.questions, fileName: state.fileName });
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setState((s) => (s.status === "valid" ? s : { status: "dragging" }));
        }}
        onDragLeave={() => {
          setState((s) => (s.status === "valid" ? s : { status: "idle" }));
        }}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
          state.status === "dragging"
            ? "border-primary bg-primary/5"
            : state.status === "error"
              ? "border-destructive/50 bg-destructive/5"
              : state.status === "valid"
                ? "border-green-500/50 bg-green-500/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
      >
        <AnimatePresence mode="wait">
          {state.status === "valid" ? (
            <motion.div
              key="valid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <CheckCircle2 className="size-10 text-green-500" />
              <div>
                <p className="font-medium">{state.fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {state.questionCount} question{state.questionCount !== 1 && "s"} found
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Creating Quiz…" : "Create Quiz"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setState({ status: "idle" })}
                  disabled={isLoading}
                >
                  Choose Different File
                </Button>
              </div>
            </motion.div>
          ) : state.status === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <AlertCircle className="size-10 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Upload Failed</p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {state.message}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setState({ status: "idle" })}
              >
                Try Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              {state.status === "validating" ? (
                <div className="size-10 animate-spin rounded-full border-2 border-muted-foreground/25 border-t-primary" />
              ) : state.status === "dragging" ? (
                <FileJson className="size-10 text-primary" />
              ) : (
                <Upload className="size-10 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">
                  {state.status === "dragging"
                    ? "Drop your JSON file here"
                    : "Drag & drop a quiz JSON file"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  document.getElementById("quiz-file-input")?.click()
                }
              >
                Browse Files
              </Button>
              <input
                id="quiz-file-input"
                type="file"
                accept=".json"
                onChange={handleFileInput}
                className="hidden"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
