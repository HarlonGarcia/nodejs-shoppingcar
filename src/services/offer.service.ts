import { createOfferType } from "../models/offer.model";
import prisma from "../utils/prisma";

export async function createOffer(body: createOfferType) {
  const offer = await prisma.offer.create({
    data: body,
  });

  return offer;
}
