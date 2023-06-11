import cloudinary from "cloudinary";
import { Multipart, MultipartFile } from "@fastify/multipart";

import prisma from "../utils/prisma";
import {
  FieldsType,
  createOfferType,
  updateOfferType,
} from "../models/offer.model";

export async function createOffer(parts: AsyncIterableIterator<Multipart>) {
  try {
    const filesUrl = [];
    const fields: FieldsType = {};

    for await (const part of parts) {
      if (part.type == "file") {
        const buffer = await part.toBuffer();
        const base64Image = buffer.toString("base64");

        const uploadedFileResponse = await uploadFiles(part, base64Image);

        filesUrl.push(uploadedFileResponse.secure_url);
      } else {
        const fieldValue = part.value;
        fields[part.fieldname] = fieldValue;
      }
    }

    const offerData: createOfferType = {
      registrationDate: new Date(),
      brand: fields.brand,
      model: fields.model,
      year: fields.year,
      price: parseFloat(fields.price),
      color: fields.color,
      mileage: fields.mileage,
      licensePlate: fields.licensePlate,
      city: fields.city,
      photos: filesUrl,
      views: 0,
    };

    const offer = await prisma.offer.create({
      data: offerData,
    });

    return offer;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create an offer!");
  }
}

async function uploadFiles(part: MultipartFile, base64Image: string) {
  return await cloudinary.v2.uploader.upload(
    `data:${part.mimetype};base64,${base64Image}`,
    {
      resource_type: "image",
    }
  );
}

export async function getOffers() {
  const offers = await prisma.offer.findMany({
    orderBy: {
      model: "asc",
    },
  });

  return offers;
}

export async function getOfferById(offerId: number) {
  const offer = await prisma.offer.findUnique({
    where: {
      id: Number(offerId),
    },
  });

  if (offer) {
    return offer;
  }

  throw new Error(`This offer with id ${offerId} doesn't exist!`);
}

export async function getOffersByPrice(price: number) {
  const offers = await prisma.offer.findMany({
    where: {
      price: {
        lt: price,
      },
    },
  });

  return offers;
}

export async function getOfferByModel(startsWith: string) {
  const offers = await prisma.offer.findMany({
    where: {
      model: startsWith,
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
