import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const connectionString =
  "postgresql://postgres.opvkmkpzlpketbkzskpi:83tzVM0BcUoay8UH@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
if (!connectionString) throw new Error("Missing DATABASE_URL");

export const pool = new Pool({
  connectionString,
  max: Number(process.env?.DB_POOL_MAX ?? 10),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000,
  keepAlive: true
});

pool.on("connect", () => console.log("PG CONNECT"));
pool.on("acquire", () => console.log("PG ACQUIRE"));


export const db = drizzle(pool, { schema });

process.on("SIGTERM", async () => {
  await pool.end().catch(() => {});
});
