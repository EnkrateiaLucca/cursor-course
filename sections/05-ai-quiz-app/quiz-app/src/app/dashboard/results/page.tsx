import { currentUser } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function ResultsHistoryPage() {
  const user = await currentUser();
  const supabase = createServiceClient();

  const { data: attempts } = await supabase
    .from("quiz_attempts")
    .select("*, quizzes(title)")
    .eq("user_id", user!.id)
    .order("completed_at", { ascending: false })
    .limit(50);

  const rows = attempts ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Results History</h1>
      </div>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              No attempts yet. Take a quiz to see your history here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {rows.map((a) => (
            <Card key={a.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {a.quizzes?.title ?? "Untitled Quiz"}
                  </CardTitle>
                  <Badge
                    variant={Number(a.percentage) >= 70 ? "default" : "secondary"}
                  >
                    {a.percentage}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    {a.score}/{a.total_questions} correct
                  </span>
                  {a.skipped_count > 0 && (
                    <span>{a.skipped_count} skipped</span>
                  )}
                  {a.incorrect_count > 0 && (
                    <span>{a.incorrect_count} incorrect</span>
                  )}
                  <span className="ml-auto">
                    {new Date(a.completed_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
