import { z } from "zod";

const createOfferSchema = z.object({
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
  registrationDate: z.date(),
  views: z.number(),
});

export type createOfferType = z.infer<typeof createOfferSchema>;
