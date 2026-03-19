"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/create/file-upload";
import { JsonFormatGuide } from "@/components/create/json-format-guide";
import { AiGenerateForm } from "@/components/create/ai-generate-form";

export default function CreateQuizPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const handleUpload = async (data: {
    title: string;
    questions: unknown[];
    fileName: string;
  }) => {
    setIsUploading(true);
    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          questions: data.questions,
          isPublic: false,
          sourceType: "upload",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create quiz");
      }

      const quiz = await res.json();
      toast.success("Quiz created successfully!");
      router.push(`/quiz/${quiz.id}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create quiz"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerate = async (data: {
    title: string;
    content: string;
    questionCount: number;
  }) => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || result.error || "Generation failed");
      }

      toast.success("Quiz generated successfully!");
      router.push(`/quiz/${result.id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to generate quiz";
      setGenerateError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create a Quiz</h1>
          <p className="text-muted-foreground mt-1">
            Upload a JSON file or generate questions with AI.
          </p>
        </div>

        <Card>
          <Tabs defaultValue={0}>
            <CardHeader>
              <TabsList className="w-full">
                <TabsTrigger value={0} className="flex-1 gap-1.5">
                  <Upload className="size-4" />
                  Upload JSON
                </TabsTrigger>
                <TabsTrigger value={1} className="flex-1 gap-1.5">
                  <Sparkles className="size-4" />
                  Generate with AI
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value={0}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <FileUpload
                    onUpload={handleUpload}
                    isLoading={isUploading}
                  />
                  <JsonFormatGuide />
                </motion.div>
              </TabsContent>

              <TabsContent value={1}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <AiGenerateForm
                    onGenerate={handleGenerate}
                    isLoading={isGenerating}
                    error={generateError}
                  />
                </motion.div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
}
