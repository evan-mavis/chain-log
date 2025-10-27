"use server";

import { db } from "@/db/db";
import { goals } from "@/db/schemas/schema";
import { getSessionUserId } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";
import { GoalInputSchema, CompleteGoalSchema } from "@/validation/goals";
import { and, eq } from "drizzle-orm";

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
  const userId = await getSessionUserId();

  if (!userId) return { status: "error", message: "Not authenticated" };

  const goalType = formData.get("goalType")?.toString();
  const description = formData.get("description")?.toString();

  const validated = GoalInputSchema.safeParse({ goalType, description });

  if (!validated.success) {
    return {
      status: "error",
      message: validated.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const { goalType: validatedGoalType, description: validatedDescription } =
    validated.data;
  const type = mapKeyToType(validatedGoalType);

  try {
    const existingActiveGoal = await db.query.goals.findFirst({
      where: (t, { and, eq }) =>
        and(eq(t.userId, userId), eq(t.type, type), eq(t.isActive, true)),
    });

    if (existingActiveGoal) {
      await db
        .update(goals)
        .set({
          description: validatedDescription,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(goals.userId, userId),
            eq(goals.type, type),
            eq(goals.isActive, true),
          ),
        );
    } else {
      await db.insert(goals).values({
        userId,
        type,
        description: validatedDescription,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    revalidatePath("/dashboard");
    return { status: "success" };
  } catch (e) {
    console.error("Failed to save goal", e);
    return {
      status: "error",
      message: "Failed to save goal",
    };
  }
}

export async function completeGoal(
  _prev: GoalFormState,
  formData: FormData,
): Promise<GoalFormState> {
  const userId = await getSessionUserId();

  if (!userId) return { status: "error", message: "Not authenticated" };

  const goalType = formData.get("goalType")?.toString();

  const validated = CompleteGoalSchema.safeParse({ goalType });

  if (!validated.success) {
    return {
      status: "error",
      message: validated.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const { goalType: validatedGoalType } = validated.data;
  const type = mapKeyToType(validatedGoalType);

  try {
    const existingGoal = await db.query.goals.findFirst({
      where: (t, { and, eq }) =>
        and(eq(t.userId, userId), eq(t.type, type), eq(t.isActive, true)),
    });

    if (!existingGoal) {
      return { status: "error", message: "No active goal found to complete" };
    }

    if (!existingGoal.description.trim()) {
      return { status: "error", message: "Cannot complete an empty goal" };
    }

    await db
      .update(goals)
      .set({ isActive: false, updatedAt: new Date() })
      .where(
        and(
          eq(goals.userId, userId),
          eq(goals.type, type),
          eq(goals.isActive, true),
        ),
      );

    revalidatePath("/dashboard");
    return { status: "success" };
  } catch  {
    return { status: "error", message: "Failed to complete goal" };
  }
}
