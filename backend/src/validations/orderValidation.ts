import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.uuid("Invalid user ID format"),
  items: z
    .array(
      z.object({
        productId: z.uuid("Invalid product ID format"),
        quantity: z.number().int().positive("Quantity must be positive"),
      })
    )
    .min(1, "Order must have at least one item"),
});

export const getOrderParamsSchema = z.object({
  id: z.uuid("Invalid order ID format"),
});

export const getUserOrdersParamsSchema = z.object({
  userId: z.uuid("Invalid user ID format"),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "payment_pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});
