import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import dotenv from "dotenv"
import { shouldBeUser } from "./middleware/authMiddleware.js";

dotenv.config()
const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test",shouldBeUser, (c) => {
  // so we dont use get auth again and again and again we use middleware
  // what happens here is first it runs the shouldBeUser function, then it runs the next function!
  return c.json({
    message: 'Payment serivce are authenticated!', userId:c.get("userId")
  })
})

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log("payment service is running");
      },
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
