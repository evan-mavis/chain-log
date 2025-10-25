"use server";

import { db } from "@/db/db";
import { goals } from "@/db/schemas/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type GoalFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function mapKeyToType(
  key: "long" | "short" | "daily",
): "long_term" | "short_term" | "daily" {
  if (key === "long") return "long_term";
  if (key === "short") return "short_term";
  return "daily";
}

export async function upsertActiveGoal(
  _prev: GoalFormState,
  formData: FormData,
): Promise<GoalFormState> {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) return { status: "error", message: "Not authenticated" };

  const goalType = formData.get("goalType")?.toString();
  const description = formData.get("description")?.toString();

  if (!goalType || !description) {
    return { status: "error", message: "Missing goal type or description" };
  }

  const type = mapKeyToType(goalType as "long" | "short" | "daily");

  try {
    await db
      .insert(goals)
      .values({
        userId,
        type,
        description,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [goals.userId, goals.type],
        set: { description, isActive: true, updatedAt: new Date() },
      });

    revalidatePath("/dashboard");
    return { status: "success" };
  } catch (e) {
    return { status: "error", message: "Failed to save goal" };
  }
}
