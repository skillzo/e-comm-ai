// Frontend types matching backend structure
export interface Product {
  id: string;
  name: string;
  fit: string;
  color: string;
  rating: number;
  price: number;
  description?: string;
  image?: string;
  stock: number;
  productImages?: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
  badge?: {
    text: string;
    bgColor: string;
  };
}

export interface HeroImage {
  alt: string;
  src: string;
}

export interface Color {
  name: string;
  image: string | null;
}

export interface Size {
  value: string;
  disabled?: boolean;
}

export interface ProductImage {
  alt: string;
  src: string;
  id?: string;
  url?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  paystackReference?: string;
  phone: string;
  createdAt: string;
  updatedAt?: string;
  orderItems?: OrderItem[];
  user?: User;
}

export type OrderStatus =
  | "pending"
  | "payment_pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CreateOrderRequest {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface PaymentInitializeRequest {
  orderId: string;
  email: string;
  callbackUrl?: string;
}

export interface PaymentInitializeResponse {
  status: string;
  data: {
    authorizationUrl: string;
    reference: string;
    orderId: string;
  };
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}
