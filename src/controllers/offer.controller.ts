import { FastifyRequest, FastifyReply } from "fastify";
import multer from "fastify-multer";

import {
  createOffer,
  deleteOffer,
  getOfferById,
  getOffers,
  getOffersByPrice,
  updateOffer,
  updateOfferViews,
} from "../services/offer.service";
import { createOfferType } from "../models/offer.model";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export async function createOfferHandler(
  request: FastifyRequest<{
    Body: createOfferType;
  }>,
  response: FastifyReply
) {
  const parts = request.parts();

  try {
    const offer = await createOffer(parts);

    return response.code(201).send(offer);
  } catch (error) {
    console.error(error);
    return response.code(500).send(error);
  }
}

export async function getOfferByIdHandler(
  request: FastifyRequest<{
    Params: { id: number };
  }>,
  response: FastifyReply
) {
  const { id } = request.params;

  const offer = await getOfferById(id);

  return offer;
}

export async function getOffersHandler(
  request: FastifyRequest,
  response: FastifyReply
) {
  const offers = await getOffers();

  return offers;
}

export async function getOffersByPriceHandler(
  request: FastifyRequest<{
    Querystring: { price: number };
  }>,
  response: FastifyReply
) {
  const { price } = request.query;

  const offers = await getOffersByPrice(price);

  return offers;
}

export async function updateOfferHandler(
  request: FastifyRequest<{
    Body: createOfferType;
    Params: { id: number };
  }>,
  response: FastifyReply
) {
  const reqBody = request.body;
  const id = request.params.id;

  try {
    const offer = await updateOffer(id, reqBody);

    return offer;
  } catch (error) {
    console.error(error);
    return response.code(500).send(error);
  }
}

export async function updateOfferViewsHandler(
  request: FastifyRequest<{
    Params: { id: number };
  }>,
  response: FastifyReply
) {
  const id = request.params.id;

  try {
    const offer = await updateOfferViews(id);

    return offer;
  } catch (error) {
    console.error(error);
    return response.code(500).send(error);
  }
}

export async function deleteOfferHandler(
  request: FastifyRequest<{
    Params: { id: number };
  }>,
  response: FastifyReply
) {
  const id = request.params.id;

  try {
    const offer = await deleteOffer(id);

    return response.code(200);
  } catch (error) {
    console.error(error);
    return response.code(500).send(error);
  }
}
