import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createServiceClient } from "@/lib/supabase/server";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { QuizLibrary } from "@/components/dashboard/quiz-library";
import { RecentAttempts } from "@/components/dashboard/recent-attempts";

export default async function DashboardPage() {
  const user = await currentUser();
  const supabase = createServiceClient();

  const [quizzesRes, attemptsRes] = await Promise.all([
    supabase
      .from("quizzes")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("quiz_attempts")
      .select("*, quizzes(title)")
      .eq("user_id", user!.id)
      .order("completed_at", { ascending: false })
      .limit(10),
  ]);

  const quizzes = quizzesRes.data ?? [];
  const attempts = attemptsRes.data ?? [];

  const totalAttempts = attempts.length;
  const averageScore =
    totalAttempts > 0
      ? Math.round(
          attempts.reduce((sum, a) => sum + Number(a.percentage), 0) / totalAttempts
        )
      : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.firstName || "there"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Your quiz dashboard — create, take, and track your quizzes.
          </p>
        </div>
        <Link href="/quiz/create">
          <Button>Create Quiz</Button>
        </Link>
      </div>

      <StatsOverview
        totalQuizzes={quizzes.length}
        totalAttempts={totalAttempts}
        averageScore={averageScore}
      />

      <RecentAttempts attempts={attempts} />

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Quizzes</h2>
        <QuizLibrary quizzes={quizzes} />
      </div>
    </div>
  );
}
