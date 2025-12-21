import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors.js";
import { prisma } from "../utils/prisma.js";

/**
 * Get all products
 */
export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      status: "success",
      data: { products },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get product by ID
 */
export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError("Product");
    }

    res.json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Create product (optional admin function)
 */
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description, price, image, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image: image || null,
        stock: stock || 0,
      },
    });

    res.status(201).json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update product (optional admin function)
 */
export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, description, price, image, stock } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundError("Product");
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(price && { price }),
        ...(image !== undefined && { image: image || null }),
        ...(stock !== undefined && { stock }),
      },
    });

    res.json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    next(error);
  }
}

