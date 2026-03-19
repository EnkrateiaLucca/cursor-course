import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsOverviewProps {
  totalQuizzes: number;
  totalAttempts: number;
  averageScore: number | null;
}

export function StatsOverview({ totalQuizzes, totalAttempts, averageScore }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuizzes}</div>
          <CardDescription>quizzes created</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Quizzes Taken</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAttempts}</div>
          <CardDescription>attempts completed</CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {averageScore !== null ? `${averageScore}%` : "—"}
          </div>
          <CardDescription>across all attempts</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
