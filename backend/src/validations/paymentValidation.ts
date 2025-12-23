import { z } from "zod";

export const initializePaymentSchema = z.object({
  orderId: z.string(),
  email: z.email("Invalid email format"),
  callbackUrl: z.string().url("Invalid callback URL").optional(),
});

export const verifyPaymentParamsSchema = z.object({
  reference: z.string(),
});
