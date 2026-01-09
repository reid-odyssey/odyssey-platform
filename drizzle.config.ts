import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DIRECT_URL) {
  console.warn("⚠️ DIRECT_URL is invalid, using DATABASE_URL. Migrations might fail if using Transaction Pooler.");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
});
