import { Request, Response, NextFunction } from "express";
import { generateToken } from "../utils/jwt.js";
import { normalizePhoneNumber, validatePhoneNumber } from "../utils/phone.js";
import { NotFoundError, ConflictError, ValidationError } from "../utils/errors.js";
import { prisma } from "../utils/prisma.js";

/**
 * Create a new user
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, phone } = req.body;

    // Validate phone number format
    if (!validatePhoneNumber(phone)) {
      throw new ValidationError("Invalid phone number format");
    }

    // Normalize phone number
    const normalizedPhone = normalizePhoneNumber(phone);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone: normalizedPhone },
    });

    if (existingUser) {
      throw new ConflictError("User with this phone number already exists");
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        phone: normalizedPhone,
      },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      phone: user.phone,
    });

    res.status(201).json({
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
 * Login with phone number
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { phone } = req.body;

    // Validate phone number format
    if (!validatePhoneNumber(phone)) {
      throw new ValidationError("Invalid phone number format");
    }

    // Normalize phone number
    const normalizedPhone = normalizePhoneNumber(phone);

    // Find user
    const user = await prisma.user.findUnique({
      where: { phone: normalizedPhone },
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      phone: user.phone,
    });

    res.json({
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
export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

