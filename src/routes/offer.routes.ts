import { FastifyInstance } from "fastify";

import {
  createOfferHandler,
  getOffersByPriceHandler,
  getOffersHandler,
  updateOfferHandler,
  updateOfferViewsHandler,
  deleteOfferHandler,
  getOfferByIdHandler,
  getOfferByModelHandler,
} from "../controllers/offer.controller";

async function offerRoutes(server: FastifyInstance) {
  const paramsOptions = {
    schema: {
      params: {
        type: "object",
        properties: {
          startsWith: { type: "string", minLength: 1 },
        },
      },
    },
  };
  server.get("/filter", paramsOptions, getOfferByModelHandler);

  server.get("/:id", getOfferByIdHandler);

  server.get("/", getOffersHandler);

  server.post("/", createOfferHandler);

  server.put("/:id", updateOfferHandler);

  server.patch("/:id", updateOfferViewsHandler);

  server.delete("/:id", deleteOfferHandler);
}

export default offerRoutes;
