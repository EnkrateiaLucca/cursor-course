import { currentUser } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Ensures the authenticated Clerk user exists in the Supabase users table.
 * Acts as a safety net when the Clerk webhook hasn't fired yet (common in local dev).
 * Returns the userId on success, or null if upsert fails.
 */
export async function ensureUser(): Promise<string | null> {
  const user = await currentUser();
  if (!user) return null;

  const supabase = createServiceClient();
  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "unknown",
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || null,
      avatar_url: user.imageUrl,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id", ignoreDuplicates: true }
  );

  if (error) {
    console.error("ensureUser upsert error:", error);
    return null;
  }

  return user.id;
}
