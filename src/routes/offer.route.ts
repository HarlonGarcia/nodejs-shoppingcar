import { FastifyInstance } from "fastify";
import { createOfferHandler } from "../controllers/offer.controller";

async function offerRoutes(server: FastifyInstance) {
  server.post("/", createOfferHandler);
}

export default offerRoutes;
