import { Hono } from "hono";
import stripe from "../utils/stripe.js";
import { shouldBeUser } from "../middleware/authMiddleware.js";

const paymentRoute = new Hono();

// Add GET /sessions route for browser access
paymentRoute.get("/", (c) => {
  return c.json({
    message: "Payment sessions endpoint. Use POST /create-payment-intent.",
  });
});

console.log("STRIPE SECRET:", process.env.STRIPE_SECRET_KEY);

paymentRoute.post("/create-payment-intent", shouldBeUser, async (c) => {
  try {
    const cart: any[] = await c.req.json();

    const totalAmount = cart.reduce((acc, item) => {
      const variant = item.variants?.find((v: any) =>
        v.name.includes(item.selectedSize),
      );
      const price = variant?.price ?? 0;
      return acc + price * (item.quantity || 1);
    }, 0);

    const amount = Math.round(totalAmount * 100);

    if (amount <= 0) {
      return c.json({ error: "Invalid cart total" }, 400);
    }

    // Create a PaymentIntent for embedded PaymentElement
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return c.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to create checkout session" }, 500);
  }
});

export default paymentRoute;
