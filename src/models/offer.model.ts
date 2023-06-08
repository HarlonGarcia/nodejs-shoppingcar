import { z } from "zod";

const offerCommonSchema = {
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  price: z.number(),
  color: z.string(),
  mileage: z.string(),
  licensePlate: z.string({
    required_error: "License plate is required",
    invalid_type_error: "License plate must be a string",
  }),
  city: z.string(),
  photos: z.array(z.string()),
  views: z.number(),
};

const createOfferSchema = z.object({
  ...offerCommonSchema,
  registrationDate: z.date(),
});

const updateOfferSchema = z.object({
  ...offerCommonSchema,
});

export type createOfferType = z.infer<typeof createOfferSchema>;
export type updateOfferType = z.infer<typeof updateOfferSchema>;
