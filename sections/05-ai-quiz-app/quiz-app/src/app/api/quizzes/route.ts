import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createQuizSchema } from "@/lib/validators";
import { createServiceClient } from "@/lib/supabase/server";
import { ensureUser } from "@/lib/ensure-user";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure user exists in Supabase before inserting quiz
  const ensuredUserId = await ensureUser();
  if (!ensuredUserId) {
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }

  const body = await request.json();
  const parsed = createQuizSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid quiz data", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { title, description, questions, isPublic, sourceType } = parsed.data;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("quizzes")
    .insert({
      user_id: userId,
      title,
      description: description ?? null,
      questions,
      is_public: isPublic,
      source_type: sourceType,
      question_count: questions.length,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 }
    );
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
    .from("quizzes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
