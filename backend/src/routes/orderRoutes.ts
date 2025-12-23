import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  createOrderSchema,
  getOrderParamsSchema,
  getUserOrdersParamsSchema,
  updateOrderStatusSchema,
} from "../validations/orderValidation.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// POST /api/orders - Create order
router.post("/", validateBody(createOrderSchema), createOrder);

// GET /api/orders/user/:userId - Get user orders
router.get(
  "/user/:userId",
  authenticate,
  validateParams(getUserOrdersParamsSchema),
  getUserOrders
);

// PATCH /api/orders/:id/status - Update order status
router.patch(
  "/:id/status",
  validateParams(getOrderParamsSchema),
  validateBody(updateOrderStatusSchema),
  updateOrderStatus
);

// GET /api/orders/:id - Get order (for tracking)
router.get("/:id", validateParams(getOrderParamsSchema), getOrderById);

export default router;
