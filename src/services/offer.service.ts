import { createOfferType, updateOfferType } from "../models/offer.model";
import prisma from "../utils/prisma";

export async function createOffer(body: createOfferType) {
  const offer = await prisma.offer.create({
    data: body,
  });

  return offer;
}

export async function getOffers() {
  const offers = await prisma.offer.findMany();

  return offers;
}

export async function getOffersByPrice(price: number) {
  const offers = await prisma.offer.findMany({
    where: {
      price: {
        gt: price,
      },
    },
  });

  return offers;
}

export async function updateOffer(offerId: number, body: updateOfferType) {
  const offers = await prisma.offer.update({
    where: {
      id: Number(offerId),
    },
    data: body,
  });

  return offers;
}

export async function updateOfferViews(offerId: number) {
  const offers = await prisma.offer.update({
    where: {
      id: Number(offerId),
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return offers;
}

export async function deleteOffer(offerId: number) {
  const existentOffer = await prisma.offer.findUnique({
    where: { id: Number(offerId) },
  });

  if (existentOffer) {
    const offer = await prisma.offer.delete({
      where: {
        id: Number(offerId),
      },
    });

    return offer;
  }

  throw new Error(`This offer with id ${offerId} doesn't exist!`);
}
