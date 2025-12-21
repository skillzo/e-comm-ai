import { z } from "zod";

export const initializePaymentSchema = z.object({
  orderId: z.string().cuid("Invalid order ID format"),
  email: z.string().email("Invalid email format"),
  callbackUrl: z.string().url("Invalid callback URL").optional(),
});

export const verifyPaymentParamsSchema = z.object({
  reference: z.string().min(1, "Reference is required"),
});

