import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data: user } = await supabase
    .from("users")
    .select("subscription_status, ai_generations_used, ai_generations_reset_at")
    .eq("id", userId)
    .single();

  if (!user) {
    return NextResponse.json({
      subscriptionStatus: "free",
      aiGenerationsUsed: 0,
    });
  }

  return NextResponse.json({
    subscriptionStatus: user.subscription_status,
    aiGenerationsUsed: user.ai_generations_used,
    aiGenerationsResetAt: user.ai_generations_reset_at,
  });
}
