import { Router } from "express";
import {
  initializePayment,
  verifyPayment,
  webhookHandler,
} from "../controllers/paymentController.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  initializePaymentSchema,
  verifyPaymentParamsSchema,
} from "../validations/paymentValidation.js";

const router = Router();

// POST /api/payments/initialize - Initialize payment
router.post(
  "/initialize",
  validateBody(initializePaymentSchema),
  initializePayment
);

// GET /api/payments/verify/:reference - Verify payment
router.get(
  "/verify/:reference",
  validateParams(verifyPaymentParamsSchema),
  verifyPayment
);

// POST /api/payments/webhook - Paystack webhook
// Note: This route is handled separately in index.ts with raw body parser
// Keeping it here for reference but it's not used
// router.post("/webhook", webhookHandler);

export default router;

