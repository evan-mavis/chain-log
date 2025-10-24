"use server";

import { db } from "@/db/db";
import { logs } from "@/db/schemas/schema";
import { auth } from "@/lib/auth";
import { LogInputSchema } from "@/validation/logs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function upsertLog(formData: FormData): Promise<void> {
  console.log("upsertLog", formData);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  const validated = LogInputSchema.safeParse({
    day: formData.get("day"),
    notes: formData.get("notes"),
    mood: formData.get("mood"),
  });

  if (!validated.success) {
    return;
  }

  const { day, notes, mood } = validated.data;

  await db
    .insert(logs)
    .values({
      userId,
      day,
      mood,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .onConflictDoUpdate({
      target: [logs.userId, logs.day],
      set: { mood, notes, updatedAt: new Date().toISOString() },
    });

  revalidatePath("/dashboard");
  return;
}
