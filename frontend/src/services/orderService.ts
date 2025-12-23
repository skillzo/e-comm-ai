import { api } from "../utils/api";
import type { Order, CreateOrderRequest, ApiResponse } from "../types";

export const orderService = {
  async createOrder(data: CreateOrderRequest): Promise<Order> {
    const response = await api.post<ApiResponse<{ order: Order }>>(
      "/orders",
      data
    );
    return response.data.order;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await api.get<ApiResponse<{ order: Order }>>(
      `/orders/${id}`
    );
    return response.data.order;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await api.get<ApiResponse<{ orders: Order[] }>>(
      `/orders/user/${userId}`
    );
    return response.data.orders;
  },
};
