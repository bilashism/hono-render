import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { db } from "@/db";
import * as schemas from "@/db/schema";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  secret: "fMfIfXvVdmlu0yg+exauZ+uEdezIpkoA/2TYhODo/H62lDAp1bReyaNpUr4=",
  basePath: `/auth`,
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
        input: true
      },
      lastName: {
        type: "string",
        required: false,
        input: true
      },
      phoneNumber: {
        type: "string",
        required: true,
        input: true
      },
      googleCalendarConnectedAt: {
        type: "date",
        required: false,
        input: false
      },
      // type: {
      //   type: "string", // registered | unregistered
      //   required: false,
      //   default: ["unregistered"],
      //   input: false, // don't allow user to set
      // },
      roles: {
        type: "string[]",
        required: false
        // input: false, // don't allow user to set
      }
    }
  },
  hooks: {
    // before: createAuthMiddleware(async (ctx) => {
    //   if (ctx.path === "/sign-up/email") {
    //     return {
    //       context: {
    //         ...ctx,
    //         body: {
    //           ...ctx.body,
    //           roles: ["agent"],
    //         },
    //       },
    //     };
    //   }
    // }),
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: schemas
  }),
  // database: new Pool({
  //   connectionString: env.DATABASE_URL,
  // }),
  // Allow requests from the frontend development server
  trustedOrigins: [
    "http://local.host:3000",
    "http://localhost:3000",
    "https://domain.com"
  ],
  emailAndPassword: {
    enabled: true
    // eslint-disable-next-line unused-imports/no-unused-vars
    // sendResetPassword: async ({ user, url, token }, request) => {
    //   await RESEND.emails.send({
    //     from: "Prime Perspectives <info@primeperspectives.com>",
    //     to: [user.email],
    //     subject: "Reset your password",
    //     // @ts-expect-error - user is of type User
    //     react: PasswordResetTemplate({
    //       firstName: user?.firstName || "",
    //       url
    //     }) as ReactNode
    //     // html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    //   });
    // }
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true
      // domain: isProduction ? ".vercel.app" : ".localhost",
    },
    defaultCookieAttributes: {
      domain: `.${new URL("http://localhost:3000").hostname}`, // Domain with a leading period
      // domain: ".localhost",
      secure: false, // Set to true in production
      httpOnly: true,
      sameSite: "lax" // Allows CORS-based cookie sharing across subdomains
      // partitioned: true, // New browser standards will mandate this for foreign cookies
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
    // cookieCache: {
    //   enabled: true,
    //   maxAge: 5 * 60, // Cache duration in seconds
    // },
  },
  // logger: {
  //   disabled: false,
  //   level: "debug", // error,warn,info,debug
  //   log: (level, message, ...args) => {
  //     // Custom logging implementation
  //     console.log(`[BetterAuth][${level}] ${message}`, ...args);
  //   },
  // },
  plugins: [
    // bearer(),
    openAPI({
      disableDefaultReference: true
    })
  ]
});

export interface AuthType {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
}

const openAPISchemaRaw = await auth.api.generateOpenAPISchema();
export const openAPISchema = {
  ...openAPISchemaRaw,
  info: {
    ...openAPISchemaRaw.info,
    title: `${openAPISchemaRaw.info.title} API`,
    version: "1.0.0"
  }
};
