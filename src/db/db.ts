import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as appSchema from "@/db/schemas/schema";
import * as authSchema from "@/db/schemas/auth-schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({
  client: sql,
  schema: { ...appSchema, ...authSchema },
});
