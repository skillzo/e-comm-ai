import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.string().cuid("Invalid user ID format"),
  items: z
    .array(
      z.object({
        productId: z.string().cuid("Invalid product ID format"),
        quantity: z.number().int().positive("Quantity must be positive"),
      })
    )
    .min(1, "Order must have at least one item"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

export const getOrderParamsSchema = z.object({
  id: z.string().cuid("Invalid order ID format"),
});

export const getUserOrdersParamsSchema = z.object({
  userId: z.string().cuid("Invalid user ID format"),
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

