"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trash2, Globe, Lock } from "lucide-react";
import { toast } from "sonner";

interface QuizRow {
  id: string;
  title: string;
  description: string | null;
  question_count: number;
  is_public: boolean;
  source_type: string;
  created_at: string;
}

interface QuizLibraryProps {
  quizzes: QuizRow[];
}

export function QuizLibrary({ quizzes: initial }: QuizLibraryProps) {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const res = await fetch(`/api/quizzes/${id}`, { method: "DELETE" });
    if (res.ok) {
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
      toast.success("Quiz deleted");
    } else {
      toast.error("Failed to delete quiz");
    }
    setDeleting(null);
  };

  if (quizzes.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground mb-4">
            No quizzes yet. Create your first one!
          </p>
          <Link href="/quiz/create">
            <Button>Create a Quiz</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {quizzes.map((quiz, i) => (
        <motion.div
          key={quiz.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
        >
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base leading-snug">
                  {quiz.title}
                </CardTitle>
                <div className="flex items-center gap-1 shrink-0">
                  {quiz.is_public ? (
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {quiz.question_count} questions
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {quiz.source_type}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(quiz.created_at).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-auto">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => router.push(`/quiz/${quiz.id}`)}
                >
                  <Play className="mr-1 h-3.5 w-3.5" />
                  Take
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={deleting === quiz.id}
                  onClick={() => handleDelete(quiz.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
