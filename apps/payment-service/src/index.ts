import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import dotenv from "dotenv";
import { shouldBeUser } from "./middleware/authMiddleware.js";
// import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import sessionRoute from "./routes/session.route.js";

dotenv.config();

const app = new Hono();

app.use("*", clerkMiddleware() as any);
app.use("*", cors({ origin: ["http://localhost:3000"] }));

// app.onError((err, c) => {
//   console.error(err);
//   if (err instanceof HTTPException){
//   return c.text(err.message, err.status)
//   }
//   return c.text("Internal Server Error", 500 )
// })

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.route("/sessions", sessionRoute);

// app.post("/create-stripe-product", async (c) => {
//   const res = await stripe.products.create({
//     id: "231",
//     name: "Candy Product",
//     default_price_data: {
//       currency: "usd",
//       unit_amount: 10 * 100,
//     },
//   });
//   return c.json(res);
// });

// app.get("/stripe-product-price", async (c) => {
//   const res = await stripe.prices.list({
//     product: "123",
//   });
//   return c.json(res);
// });

// app.get("/test", shouldBeUser, (c) => {
//   return c.json({
//     message: "test is working",
//     userId: c.get("userId")
//   })
// })

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
