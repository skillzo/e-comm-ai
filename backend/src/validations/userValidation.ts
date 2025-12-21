import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

export const loginSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

export const getUserParamsSchema = z.object({
  id: z.string().cuid("Invalid user ID format"),
});

