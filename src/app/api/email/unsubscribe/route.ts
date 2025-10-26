import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const parsed = verifyUnsubscribeToken(token);
  if (!parsed) {
    return new NextResponse("Invalid or expired link", { status: 400 });
  }

  const userId = parsed.userId;
  try {
    await db.execute(
      (await import("drizzle-orm"))
        .sql`update "user" set "email_opt_in" = false, "email_consent_source" = ${"email:unsubscribe"}, "updated_at" = ${new Date()} where "id" = ${userId}` as any,
    );
  } catch {
    return new NextResponse("Failed to process unsubscribe", { status: 500 });
  }

  const base = process.env.APP_ORIGIN ?? "http://localhost:3000";
  return NextResponse.redirect(`${base}/unsubscribe/success`);
}
