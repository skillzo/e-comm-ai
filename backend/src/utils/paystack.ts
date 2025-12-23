import axios from "axios";
import type {
  PaystackInitializeRequest,
  PaystackInitializeResponse,
  PaystackVerifyResponse,
  RefundTransactionData,
} from "../types/index.js";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("PAYSTACK_SECRET_KEY is not set in environment variables");
}

const paystackClient = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

/**
 * Initialize a Paystack transaction
 */
export async function initializeTransaction(
  data: PaystackInitializeRequest
): Promise<PaystackInitializeResponse> {
  try {
    const response = await paystackClient.post<PaystackInitializeResponse>(
      "/transaction/initialize",
      data
    );
    console.log("paystack initializeTransaction response", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(
        error.response.data.message || "Failed to initialize transaction"
      );
    }
    throw new Error("Failed to initialize transaction");
  }
}

/**
 * Verify a Paystack transaction
 */
export async function verifyTransaction(
  reference: string
): Promise<PaystackVerifyResponse> {
  try {
    const response = await paystackClient.get<PaystackVerifyResponse>(
      `/transaction/verify/${reference}`
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Transaction verification failed"
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(
        error.response.data.message || "Failed to verify transaction"
      );
    }
    throw new Error("Failed to verify transaction");
  }
}

/**
 * Verify Paystack webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const crypto = require("crypto");
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(payload)
    .digest("hex");

  return hash === signature;
}

/**
 * Refund a Paystack transaction
 */
export async function refundTransaction(data: RefundTransactionData) {
  try {
    const response = await paystackClient.post(`/transaction/refund`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(
        error.response.data.message || "Failed to refund transaction"
      );
    }
    throw new Error("Failed to refund transaction");
  }
}
