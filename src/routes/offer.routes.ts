import { FastifyInstance } from "fastify";

import {
  createOfferHandler,
  getOffersByPriceHandler,
  getOffersHandler,
  updateOfferHandler,
  updateOfferViewsHandler,
  deleteOfferHandler,
} from "../controllers/offer.controller";

async function offerRoutes(server: FastifyInstance) {
  const priceParamOptions = {
    schema: {
      querystring: {
        price: { type: "number" },
        require: true,
      },
    },
  };
  server.get("/filter", priceParamOptions, getOffersByPriceHandler);

  server.get("/", getOffersHandler);

  server.post("/", createOfferHandler);

  server.put("/:id", updateOfferHandler);

  server.patch("/:id", updateOfferViewsHandler);

  server.delete("/:id", deleteOfferHandler);
}

export default offerRoutes;
