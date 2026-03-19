import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { ensureUser } from "@/lib/ensure-user";

const createAttemptSchema = z.object({
  quizId: z.string().uuid(),
  score: z.number().int().min(0),
  totalQuestions: z.number().int().min(1),
  percentage: z.number().min(0).max(100),
  results: z.array(
    z.object({
      questionIndex: z.number().int().min(0),
      userAnswer: z.union([z.string(), z.number(), z.null()]),
      result: z.enum(["correct", "incorrect", "skipped"]),
    })
  ),
  skippedCount: z.number().int().min(0),
  incorrectCount: z.number().int().min(0),
});

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure user exists in Supabase before inserting attempt
  const ensuredUserId = await ensureUser();
  if (!ensuredUserId) {
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }

  const body = await request.json();
  const parsed = createAttemptSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid attempt data", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { quizId, score, totalQuestions, percentage, results, skippedCount, incorrectCount } =
    parsed.data;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("quiz_attempts")
    .insert({
      quiz_id: quizId,
      user_id: userId,
      score,
      total_questions: totalQuestions,
      percentage,
      results: JSON.stringify(results),
      skipped_count: skippedCount,
      incorrect_count: incorrectCount,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to save attempt" }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("*, quizzes(title)")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Supabase query error:", error);
    return NextResponse.json({ error: "Failed to fetch attempts" }, { status: 500 });
  }

  return NextResponse.json(data);
}
