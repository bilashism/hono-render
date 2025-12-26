import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.opvkmkpzlpketbkzskpi:83tzVM0BcUoay8UH@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
  }
} satisfies Config;
