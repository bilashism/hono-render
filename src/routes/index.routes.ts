import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "../lib/create-app";
import { db } from "../db";
import { user } from "../db/auth";
import { sql } from "drizzle-orm";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: z.object({
                message: z.string()
              })
            }
          }
        }
      }
    }),
    async c => {
      const data = await db.select().from(user).limit(1);
      return c.json({ message: "Hello World", data }, 200);
    }
  )
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/ping",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: z.object({
                pingMs: z.number()
              })
            }
          }
        }
      }
    }),
    async c => {
      const t0 = performance.now();
      await db.execute(sql`select 1`);
      const t1 = performance.now();
      return c.json({ pingMs: Math.round(t1 - t0) });
    }
  );




export default router;
