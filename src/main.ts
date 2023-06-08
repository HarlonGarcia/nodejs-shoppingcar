import Fastify from "fastify";

import offerRoutes from "./routes/offer.route";

const server = Fastify();

server.get("/works", async function name(request, response) {
  return { status: "OK" };
});

async function run() {
  server.register(offerRoutes, { prefix: "offers" });

  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });

    console.log("Server is running now!");
  } catch (error) {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

run();
