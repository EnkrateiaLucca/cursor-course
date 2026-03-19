import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateQuizQuestions } from "@/lib/quiz-generator";
import { createServiceClient } from "@/lib/supabase/server";

const generateSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(20, "Content must be at least 20 characters"),
  questionCount: z.number().int().min(1).max(30).default(5),
});

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = generateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { title, content, questionCount } = parsed.data;

  const supabase = createServiceClient();

  const { data: user } = await supabase
    .from("users")
    .select("subscription_status, ai_generations_used, ai_generations_reset_at")
    .eq("id", userId)
    .single();

  const FREE_TIER_LIMIT = 3;
  if (user && user.subscription_status !== "pro") {
    const resetAt = user.ai_generations_reset_at
      ? new Date(user.ai_generations_reset_at)
      : null;
    const now = new Date();

    if (resetAt && now > resetAt) {
      await supabase
        .from("users")
        .update({
          ai_generations_used: 0,
          ai_generations_reset_at: new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
          ).toISOString(),
        })
        .eq("id", userId);
    } else if ((user.ai_generations_used ?? 0) >= FREE_TIER_LIMIT) {
      return NextResponse.json(
        {
          error: "Free tier limit reached",
          message: `You've used all ${FREE_TIER_LIMIT} free AI generations this month. Upgrade to Pro for unlimited generations.`,
        },
        { status: 403 }
      );
    }
  }

  try {
    const questions = await generateQuizQuestions(content, questionCount);

    const { data: quiz, error: insertError } = await supabase
      .from("quizzes")
      .insert({
        user_id: userId,
        title,
        description: `AI-generated quiz with ${questions.length} questions`,
        questions: JSON.stringify(questions),
        is_public: false,
        source_type: "ai-generated",
        question_count: questions.length,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save generated quiz" },
        { status: 500 }
      );
    }

    await supabase
      .from("users")
      .update({
        ai_generations_used: (user?.ai_generations_used ?? 0) + 1,
        ai_generations_reset_at:
          user?.ai_generations_reset_at ??
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            1
          ).toISOString(),
      })
      .eq("id", userId);

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      {
        error: "Generation failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
