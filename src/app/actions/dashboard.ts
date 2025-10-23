"use server";

import { revalidatePath } from "next/cache";

export async function updateGoal(_formData: FormData) {
  // TODO: implement real mutation against Postgres
  revalidatePath("/dashboard");
}
