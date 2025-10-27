"use server";

import { db } from "@/db/db";
import { logs } from "@/db/schemas/schema";
import { auth } from "@/lib/auth";
import { LogInputSchema } from "@/validation/logs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export type LogFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function upsertLog(
  _prev: LogFormState,
  formData: FormData,
): Promise<LogFormState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  if (!userId) {
    return { status: "error", message: "Not authenticated" };
  }

  const validated = LogInputSchema.safeParse({
    day: formData.get("day"),
    notes: formData.get("notes"),
    mood: formData.get("mood"),
  });

  if (!validated.success) {
    return { status: "error", message: "Invalid input" };
  }

  const { day, notes, mood } = validated.data;

  try {
    await db
      .insert(logs)
      .values({
        userId,
        day,
        mood,
        notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [logs.userId, logs.day],
        set: { mood, notes, updatedAt: new Date() },
      });

    revalidatePath("/dashboard");
    return { status: "success" };
  } catch {
    return { status: "error", message: "Failed to save" };
  }
}
