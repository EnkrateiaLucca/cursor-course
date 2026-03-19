import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/quizzes/[id]">
) {
  const { id } = await ctx.params;
  const supabase = createServiceClient();

  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  if (quiz.is_public) {
    return NextResponse.json(quiz);
  }

  const { userId } = await auth();
  if (!userId || quiz.user_id !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(quiz);
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/quizzes/[id]">
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const supabase = createServiceClient();

  const { data: quiz, error: fetchError } = await supabase
    .from("quizzes")
    .select("user_id")
    .eq("id", id)
    .single();

  if (fetchError || !quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  if (quiz.user_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error: deleteError } = await supabase
    .from("quizzes")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Supabase delete error:", deleteError);
    return NextResponse.json(
      { error: "Failed to delete quiz" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
