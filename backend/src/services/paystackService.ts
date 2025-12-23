import {
  initializeTransaction,
  refundTransaction,
  verifyTransaction,
  verifyWebhookSignature,
} from "../utils/paystack.js";
import type {
  PaystackInitializeRequest,
  PaystackVerifyResponse,
} from "../types/index.js";

export class PaystackService {
  /**
   * Initialize a payment transaction
   */
  static async initializePayment(
    data: PaystackInitializeRequest
  ): Promise<{ authorizationUrl: string; reference: string }> {
    const response = await initializeTransaction(data);

    if (!response.status || !response.data) {
      throw new Error(response.message || "Failed to initialize payment");
    }

    return {
      authorizationUrl: response.data.authorization_url,
      reference: response.data.reference,
    };
  }

  /**
   * Verify a payment transaction
   */
  static async verifyPayment(
    reference: string
  ): Promise<PaystackVerifyResponse> {
    return verifyTransaction(reference);
  }

  /**
   * Verify webhook signature
   */
  static verifyWebhook(payload: string, signature: string): boolean {
    return verifyWebhookSignature(payload, signature);
  }

  /**
   * Refund a payment
   */
  static async refundPayment(
    reference: string,
    amount: number | null
  ): Promise<void> {
    return refundTransaction({ transaction: reference, amount });
  }
}
