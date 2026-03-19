import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const supabase = createServiceClient();

  switch (evt.type) {
    case "user.created":
    case "user.updated": {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;
      const email = email_addresses[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ") || null;

      const { error } = await supabase.from("users").upsert(
        {
          id,
          email,
          name,
          avatar_url: image_url,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) {
        console.error("Failed to upsert user:", error);
        return new Response("Database error", { status: 500 });
      }
      break;
    }

    case "user.deleted": {
      if (evt.data.id) {
        const { error } = await supabase
          .from("users")
          .delete()
          .eq("id", evt.data.id);

        if (error) {
          console.error("Failed to delete user:", error);
          return new Response("Database error", { status: 500 });
        }
      }
      break;
    }
  }

  return new Response("OK", { status: 200 });
}
