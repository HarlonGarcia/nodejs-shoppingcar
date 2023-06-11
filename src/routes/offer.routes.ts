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
  const modelParamOptions = {
    schema: {
      querystring: {
        startsWith: { type: "string" },
        require: true,
      },
    },
  };

  const priceParamOptions = {
    schema: {
      querystring: {
        price: { type: "number" },
        require: true,
      },
    },
  };
  server.get("/filter/:startsWith", modelParamOptions, getOfferByModelHandler);

  server.get("/filter", priceParamOptions, getOffersByPriceHandler);

  server.get("/:id", getOfferByIdHandler);

  server.get("/", getOffersHandler);

  server.post("/", createOfferHandler);

  server.put("/:id", updateOfferHandler);

  server.patch("/:id", updateOfferViewsHandler);

  server.delete("/:id", deleteOfferHandler);
}

export default offerRoutes;
