import { Request, Response, NextFunction } from "express";
import { generateToken } from "../utils/jwt.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";
import { prisma } from "../utils/prisma.js";
import { createUserSchema } from "../validations/userValidation.js";
import { requestValidation } from "../utils/validateRequest.js";

/**
 * Create a new user
 */
export async function createUserOrLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, phone } = req.body;

    const validation = requestValidation(createUserSchema, { name, phone });
    if (!validation.success) {
      throw new ValidationError(validation.errors || "Validation failed");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    // login if user already exists
    if (existingUser) {
      const token = generateToken({
        userId: existingUser.id,
        phone: existingUser.phone,
      });

      return res.json({
        status: "success",
        data: {
          user: {
            id: existingUser.id,
            name: existingUser.name,
            phone: existingUser.phone,
          },
          token,
        },
      });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        phone: phone,
      },
    });

    const token = generateToken({
      userId: user.id,
      phone: user.phone,
    });

    return res.json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get user by ID
 */
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    res.json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}
