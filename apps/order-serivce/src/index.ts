import Fastfiy from "fastify";

const fastify = Fastfiy();

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("order service is running");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();