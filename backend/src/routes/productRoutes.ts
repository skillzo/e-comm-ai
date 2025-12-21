import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  createProductSchema,
  updateProductSchema,
  getProductParamsSchema,
} from "../validations/productValidation.js";

const router = Router();

// GET /api/products - List all products
router.get("/", getAllProducts);

// GET /api/products/:id - Get single product
router.get(
  "/:id",
  validateParams(getProductParamsSchema),
  getProductById
);

// POST /api/products - Create product (optional admin)
router.post(
  "/",
  validateBody(createProductSchema),
  createProduct
);

// PATCH /api/products/:id - Update product (optional admin)
router.patch(
  "/:id",
  validateParams(getProductParamsSchema),
  validateBody(updateProductSchema),
  updateProduct
);

export default router;

