import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";

export const shouldBeUser = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  // shouldBeUser function
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  c.set("userId", auth.userId);

  // the next function!
  await next();
});
