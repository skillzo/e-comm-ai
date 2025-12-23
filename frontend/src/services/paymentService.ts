import { api } from "../utils/api";
import type {
  PaymentInitializeRequest,
  PaymentInitializeResponse,
  ApiResponse,
} from "../types";

export const paymentService = {
  async initializePayment(
    data: PaymentInitializeRequest
  ): Promise<PaymentInitializeResponse> {
    const response = await api.post<PaymentInitializeResponse>(
      "/payments/initialize",
      data
    );
    return response;
  },

  async verifyPayment(reference: string): Promise<any> {
    const response = await api.get<ApiResponse<any>>(
      `/payments/verify/${reference}`
    );
    return response;
  },
};
