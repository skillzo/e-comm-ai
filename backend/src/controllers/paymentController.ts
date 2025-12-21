import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../utils/errors.js";
import { prisma } from "../utils/prisma.js";
import { PaystackService } from "../services/paystackService.js";
import { OrderStatus } from "@prisma/client";
import crypto from "crypto";

/**
 * Initialize Paystack payment
 */
export async function initializePayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orderId, email, callbackUrl } = req.body;

    // Find order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      throw new NotFoundError("Order");
    }

    if (order.status !== "pending" && order.status !== "payment_pending") {
      throw new ValidationError(
        `Cannot initialize payment for order with status: ${order.status}`
      );
    }

    // Generate unique reference
    const reference = `ORDER_${order.id}_${Date.now()}`;

    // Initialize payment with Paystack
    const { authorizationUrl } = await PaystackService.initializePayment({
      email,
      amount: Math.round(order.totalAmount * 100), // Convert to kobo
      reference,
      callback_url:
        callbackUrl ||
        `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment/callback?reference=${reference}`,
      metadata: {
        orderId: order.id,
        userId: order.userId,
        phone: order.phone,
      },
    });

    // Update order with payment reference and status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paystackReference: reference,
        status: "payment_pending" as OrderStatus,
      },
    });

    res.json({
      status: "success",
      data: {
        authorizationUrl,
        reference,
        orderId: order.id,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Verify payment (callback from Paystack)
 */
export async function verifyPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { reference } = req.params;

    // Verify payment with Paystack
    const verification = await PaystackService.verifyPayment(reference);

    if (!verification.status || !verification.data) {
      return res.status(400).json({
        status: "error",
        message: verification.message || "Payment verification failed",
      });
    }

    const transaction = verification.data;

    // Find order by reference
    const order = await prisma.order.findFirst({
      where: { paystackReference: reference },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found for this payment reference",
      });
    }

    // Update order status based on payment status
    if (transaction.status === "success" && transaction.gateway_response === "Successful") {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "paid" as OrderStatus,
        },
      });

      return res.json({
        status: "success",
        message: "Payment verified successfully",
        data: {
          orderId: order.id,
          status: "paid",
          amount: transaction.amount / 100, // Convert from kobo
        },
      });
    }

    // Payment failed or pending
    res.json({
      status: "pending",
      message: transaction.gateway_response || "Payment is pending",
      data: {
        orderId: order.id,
        status: transaction.status,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle Paystack webhook
 */
export async function webhookHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const signature = req.headers["x-paystack-signature"] as string;

    if (!signature) {
      return res.status(400).json({
        status: "error",
        message: "Missing Paystack signature",
      });
    }

    // Get raw body for signature verification
    // Use rawBody if available (from webhook), otherwise stringify parsed body
    const rawBody = (req as any).rawBody || JSON.stringify(req.body);

    // Verify webhook signature
    const isValid = PaystackService.verifyWebhook(rawBody, signature);

    if (!isValid) {
      return res.status(400).json({
        status: "error",
        message: "Invalid webhook signature",
      });
    }

    const event = req.body;

    // Handle charge.success event
    if (event.event === "charge.success") {
      const transaction = event.data;
      const reference = transaction.reference;

      // Find order by reference
      const order = await prisma.order.findFirst({
        where: { paystackReference: reference },
      });

      if (order && transaction.status === "success") {
        // Update order status to paid
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "paid" as OrderStatus,
          },
        });

        console.log(`Order ${order.id} marked as paid via webhook`);
      }
    }

    // Always return 200 to acknowledge webhook receipt
    res.status(200).json({
      status: "success",
      message: "Webhook received",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    // Still return 200 to prevent Paystack from retrying
    res.status(200).json({
      status: "error",
      message: "Webhook processing error",
    });
  }
}

