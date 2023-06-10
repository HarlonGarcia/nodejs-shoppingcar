import Fastify, { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";
import cloudinary from "cloudinary";
import fastifyCors from "fastify-cors";

import offerRoutes from "./routes/offer.routes";

const server = Fastify();

server.register(fastifyCors, {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
});

server.get("/works", async function name(request, response) {
  return { status: "OK" };
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run() {
  server.register(multipart);
  server.register(offerRoutes, { prefix: "offers" });
  const port = 3000;

  try {
    await server.listen({ port: port, host: "0.0.0.0" });
    console.log(`Server is running now on port ${port}!`);
  } catch (error) {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

run();
