import { api } from "../utils/api";
import type { Product, ApiResponse } from "../types";

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get<ApiResponse<{ products: Product[] }>>(
      "/products"
    );
    return response.data.products;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await api.get<ApiResponse<{ product: Product }>>(
      `/products/${id}`
    );
    return response.data.product;
  },
};
