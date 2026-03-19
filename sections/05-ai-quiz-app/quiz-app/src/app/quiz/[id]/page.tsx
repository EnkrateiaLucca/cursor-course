import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";
import { QuizPlayer } from "@/components/quiz/quiz-player";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();

  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !quiz) {
    notFound();
  }

  if (!quiz.is_public) {
    const { userId } = await auth();
    if (!userId || quiz.user_id !== userId) {
      notFound();
    }
  }

  return (
    <QuizPlayer
      quizId={quiz.id}
      questions={quiz.questions}
      title={quiz.title}
    />
  );
}
