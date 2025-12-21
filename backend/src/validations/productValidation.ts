import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  stock: z.number().int().nonnegative("Stock must be non-negative").default(0),
});

export const updateProductSchema = createProductSchema.partial();

export const getProductParamsSchema = z.object({
  id: z.string().cuid("Invalid product ID format"),
});

