import { OpenAPIHono } from "@hono/zod-openapi";
import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";
import { cors } from "hono/cors";
import { appLoggerPino } from "../middleware/pino-logger";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

// export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
// eslint-disable-next-line ts/no-empty-object-type
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(
    "*", // or replace with "*" to enable cors for all routes
    cors({
      origin: ["http://local.host:3000", "https://domain.com"], // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: [
        "GET",
        "HEAD",
        "PUT",
        "POST",
        "DELETE",
        "PATCH",
        "OPTIONS"
      ],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true
    })
  );
  // app.use("*", async (c, next) => {
  //   const sessionToken = c.req.raw.headers.get("cookie")?.split(";").find(cookie => cookie.trim().startsWith(`${isProduction ? "__Secure-" : ""}better-auth.session_token=`))?.split("=")[1];
  //   const session = await auth.api.getSession({ headers: c.req.raw.headers });
  //   // eslint-disable-next-line no-console
  //   console.log(c.req.path, session?.user?.email, sessionToken);

  //   c.set("user", session?.user ?? null);
  //   c.set("session", session?.session ?? null);
  //   return next();
  // });
  app.use(appLoggerPino());
  // app.notFound(notFound);
  // app.onError(onError);
  return app;
}

// export function createTestApp<R extends AppOpenAPI>(router: R) {
//   return createApp().route("/", router);
// }
export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route("/", router);
}
