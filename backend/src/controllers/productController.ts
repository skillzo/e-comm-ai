import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors.js";
import { prisma } from "../utils/prisma.js";
import { cache } from "../utils/cache.js";

const PRODUCTS_CACHE_KEY = "products:all";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

/**
 * Get all products (with caching)
 */
export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Check cache first
    const cachedProducts = await cache.get<any[]>(PRODUCTS_CACHE_KEY);

    if (cachedProducts) {
      return res.json({
        status: "success",
        data: { products: cachedProducts },
      });
    }

    // Cache miss - fetch from database
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Store in cache with 30 minute TTL
    await cache.set(PRODUCTS_CACHE_KEY, products, CACHE_TTL);

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
      include: {
        productImages: true,
      },
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
    const {
      name,
      description,
      price,
      image,
      stock,
      fit,
      color,
      rating,
      productImages,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image: image || null,
        stock: stock || 0,
        fit,
        color,
        rating: rating || 0,
        productImages: productImages
          ? {
              create: productImages.map(
                (img: { url: string; alt: string }) => ({
                  url: img.url,
                  alt: img.alt,
                })
              ),
            }
          : undefined,
      },
      include: {
        productImages: true,
      },
    });

    // Invalidate products cache when new product is created
    await cache.delete(PRODUCTS_CACHE_KEY);

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

    // Invalidate products cache when product is updated
    await cache.delete(PRODUCTS_CACHE_KEY);

    res.json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    next(error);
  }
}
