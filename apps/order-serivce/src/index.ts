import Fastify from "fastify";
import "dotenv/config";
import { clerkPlugin } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "repo-order-db";
import { orderRoute } from "./routes/order.js";
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});
fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  return reply.send({
    message: "Order serivce are authenticated!",
    userId: request.userId,
  });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    await connectOrderDB();
    await fastify.listen({ port: 8001 });
    console.log("order service is running");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
