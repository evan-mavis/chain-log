import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";
import { and, eq, sql } from "drizzle-orm";
import { user } from "@/db/schemas/auth-schema";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const parsed = verifyUnsubscribeToken(token);
  if (!parsed) {
    return new NextResponse("Invalid or expired link", { status: 400 });
  }

  const userId = parsed.userId;
  try {
    await db
      .update(user)
      .set({
        emailOptIn: false,
        emailConsentSource: "email:unsubscribe",
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));
  } catch {
    return new NextResponse("Failed to process unsubscribe", { status: 500 });
  }

  const base = process.env.APP_ORIGIN ?? "http://localhost:3000";
  return NextResponse.redirect(`${base}/unsubscribe/success`);
}
