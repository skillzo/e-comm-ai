import { User, Product, Order, OrderItem, OrderStatus } from "@prisma/client";

export type { User, Product, Order, OrderItem, OrderStatus };

export interface UserWithOrders extends User {
  orders?: Order[];
}

export interface ProductWithOrderItems extends Product {
  orderItems?: OrderItem[];
}

export interface OrderWithItems extends Order {
  orderItems?: (OrderItem & { product: Product })[];
  user?: User;
}

// API Request/Response Types
export interface CreateUserRequest {
  name: string;
  phone: string;
}

export interface LoginRequest {
  phone: string;
}

export interface CreateOrderRequest {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  phone: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock?: number;
}

// Paystack Types
export interface PaystackInitializeRequest {
  email: string;
  amount: number; // in kobo
  reference: string;
  callback_url: string;
  metadata?: Record<string, any>;
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface RefundTransactionData {
  transaction: string;
  amount: number | null;
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string | null;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, any>;
    log: any;
    fees: number;
    fees_split: any;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    };
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any>;
      risk_action: string;
    };
    plan: any;
    split: any;
    order_id: number | null;
    paidAt: string | null;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: any;
    source: any;
    fees_breakdown: any;
  };
}

export interface PaystackWebhookEvent {
  event: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string | null;
    created_at: string;
    channel: string;
    currency: string;
    metadata: Record<string, any>;
    customer: {
      id: number;
      email: string;
      phone: string | null;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
  };
}

// JWT Payload
export interface JWTPayload {
  userId: string;
  phone: string;
}
