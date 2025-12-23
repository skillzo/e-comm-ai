import { z } from "zod";

const productImageSchema = z.object({
  url: z.url("Invalid image URL"),
  alt: z.string().min(1, "Image alt text is required"),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  fit: z.string().min(1, "Product fit is required"),
  color: z.string().min(1, "Product color is required"),
  rating: z.number().min(0).max(5).default(0),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  stock: z.number().int().nonnegative("Stock must be non-negative").default(0),
  productImages: z.array(productImageSchema).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const getProductParamsSchema = z.object({
  id: z.uuid("Invalid product ID format"),
});
