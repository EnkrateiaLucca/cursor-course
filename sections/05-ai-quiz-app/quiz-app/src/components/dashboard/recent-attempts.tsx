import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Attempt {
  id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  percentage: number;
  completed_at: string;
  quizzes: { title: string } | null;
}

interface RecentAttemptsProps {
  attempts: Attempt[];
}

export function RecentAttempts({ attempts }: RecentAttemptsProps) {
  if (attempts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No quiz attempts yet. Take a quiz to see your results here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Attempts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium text-sm">
                  {attempt.quizzes?.title ?? "Untitled Quiz"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(attempt.completed_at).toLocaleDateString()}
                </p>
              </div>
              <Badge
                variant={attempt.percentage >= 70 ? "default" : "secondary"}
              >
                {attempt.score}/{attempt.total_questions} ({attempt.percentage}%)
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
