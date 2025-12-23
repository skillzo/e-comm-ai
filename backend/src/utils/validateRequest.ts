import z from "zod";

export const requestValidation = (schema: z.ZodSchema, data: any) => {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.issues.map((error) => {
      const fieldPath = error.path.join(".");
      return `${fieldPath}: ${error.message}`;
    });

    return { success: false, errors: errors.join(", ") };
  }

  return { success: true, errors: null };
};
