import { FastifyRequest, FastifyReply } from "fastify";
import { createOffer } from "../services/offer.service";
import { createOfferType } from "../models/offer.model";

export async function createOfferHandler(
  request: FastifyRequest<{
    Body: createOfferType;
  }>,
  response: FastifyReply
) {
  const reqBody = request.body;

  try {
    const offer = await createOffer(reqBody);

    return response.code(201).send(offer);
  } catch (error) {
    if (error) {
      console.error(error);
      return response.code(500).send(error);
    }
  }
}
