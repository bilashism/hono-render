import { auth } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";

export const authRouteName = "auth";

// const router = new OpenAPIHono().basePath("/auth");
const router = createRouter().basePath(`/${authRouteName}`);

router.on(["POST", "GET"], "/**", (c) => {
  return auth.handler(c.req.raw);
});

export default router;
