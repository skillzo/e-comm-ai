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

  async verifyPayment(
    reference: string,
    telegramChatId?: string
  ): Promise<any> {
    let url = `/payments/verify/${reference}`;
    if (telegramChatId) {
      url += `?telegramChatId=${telegramChatId}`;
    }
    const response = await api.get<ApiResponse<any>>(url);
    return response;
  },
};
