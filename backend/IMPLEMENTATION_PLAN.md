# E-Commerce Backend Implementation Plan

## Overview

Simple e-commerce app with checkout and order tracking. Users only need name and phone number. Payment processing via Paystack APIs (direct API calls, no package).

---

## Section 1: Project Setup & Configuration

**Goal:** Set up TypeScript structure and dependencies

**Tasks:**

1. Create `src/` directory structure
2. Move `server.js` → `src/index.ts` (convert to TypeScript)
3. Update `package.json` dependencies:
   - Remove: `bcryptjs`
   - Add: `@prisma/client`, `dotenv`
   - Keep: `express`, `cors`, `pg`, `zod`, `jsonwebtoken`
4. Create `tsconfig.json` for backend
5. Create `.env.example` template
6. Update scripts in `package.json`

**Files to Create:**

- `backend/src/index.ts`
- `backend/tsconfig.json`
- `backend/.env.example`

---

## Section 2: Database Schema (Prisma)

**Goal:** Define all database models

**Tasks:**

1. Initialize Prisma: `npx prisma init`
2. Create `prisma/schema.prisma` with models:
   - **User**: id, name, phone, createdAt, updatedAt
   - **Product**: id, name, description, price, image, stock, createdAt, updatedAt
   - **Order**: id, userId, totalAmount, status, paystackReference, phone, createdAt, updatedAt
   - **OrderItem**: id, orderId, productId, quantity, price
3. Set up relationships
4. Run initial migration

**Files to Create:**

- `backend/prisma/schema.prisma`

---

## Section 3: Type Definitions & Utilities

**Goal:** Create shared types and utility functions

**Tasks:**

1. Create type definitions for:
   - User, Product, Order, OrderItem
   - API request/response types
   - Paystack webhook types
2. Create utility functions:
   - Paystack API client (using fetch, not package)
   - JWT token helpers (for phone-based auth)
   - Error handling utilities

**Files to Create:**

- `backend/src/types/index.ts`
- `backend/src/utils/paystack.ts`
- `backend/src/utils/jwt.ts`
- `backend/src/utils/errors.ts`

---

## Section 4: Middleware

**Goal:** Request handling middleware

**Tasks:**

1. Error handling middleware
2. Request validation middleware (using Zod)
3. Phone number validation helper
4. Optional: Request logging middleware

**Files to Create:**

- `backend/src/middleware/errorHandler.ts`
- `backend/src/middleware/validate.ts`
- `backend/src/middleware/auth.ts` (phone-based JWT)

---

## Section 5: User Routes & Controllers

**Goal:** User management (phone-only authentication)

**Tasks:**

1. Create user controller:
   - `createUser` - Register with name + phone
   - `getUser` - Get user by ID
   - `login` - Login with phone (returns JWT)
2. Create user routes:
   - `POST /api/users` - Create user
   - `POST /api/users/login` - Login with phone
   - `GET /api/users/:id` - Get user profile
3. Add Zod validation schemas

**Files to Create:**

- `backend/src/controllers/userController.ts`
- `backend/src/routes/userRoutes.ts`
- `backend/src/validations/userValidation.ts`

---

## Section 6: Product Routes & Controllers

**Goal:** Product management

**Tasks:**

1. Create product controller:
   - `getAllProducts` - List all products
   - `getProductById` - Get single product
   - `createProduct` - Create product (admin, optional)
   - `updateProduct` - Update product (admin, optional)
2. Create product routes:
   - `GET /api/products` - List products
   - `GET /api/products/:id` - Get product
3. Add Zod validation schemas

**Files to Create:**

- `backend/src/controllers/productController.ts`
- `backend/src/routes/productRoutes.ts`
- `backend/src/validations/productValidation.ts`

---

## Section 7: Order Routes & Controllers

**Goal:** Order management

**Tasks:**

1. Create order controller:
   - `createOrder` - Create order with items
   - `getOrderById` - Get order details (for tracking)
   - `getUserOrders` - Get all orders for a user
   - `updateOrderStatus` - Update order status
2. Create order routes:
   - `POST /api/orders` - Create order
   - `GET /api/orders/:id` - Get order (tracking)
   - `GET /api/orders/user/:userId` - Get user orders
3. Add Zod validation schemas
4. Implement order status logic

**Files to Create:**

- `backend/src/controllers/orderController.ts`
- `backend/src/routes/orderRoutes.ts`
- `backend/src/validations/orderValidation.ts`

---

## Section 8: Paystack Integration

**Goal:** Payment processing with Paystack APIs

**Tasks:**

1. Create Paystack service (using fetch):
   - `initializeTransaction` - POST to Paystack API
   - `verifyTransaction` - GET from Paystack API
   - `handleWebhook` - Verify webhook signature
2. Create payment controller:
   - `initializePayment` - Initialize Paystack payment
   - `verifyPayment` - Verify payment callback
   - `webhookHandler` - Handle Paystack webhook
3. Create payment routes:
   - `POST /api/payments/initialize` - Initialize payment
   - `GET /api/payments/verify/:reference` - Verify payment
   - `POST /api/payments/webhook` - Paystack webhook endpoint
4. Update order status on payment success

**Files to Create:**

- `backend/src/services/paystackService.ts`
- `backend/src/controllers/paymentController.ts`
- `backend/src/routes/paymentRoutes.ts`

---

## Section 9: Main Server Setup

**Goal:** Wire everything together

**Tasks:**

1. Update `src/index.ts`:
   - Import all routes
   - Set up middleware chain
   - Error handling
   - Server startup
2. Connect to database (Prisma Client)
3. Test all endpoints

**Files to Update:**

- `backend/src/index.ts`

---

## Section 10: Testing & Documentation

**Goal:** Verify everything works

**Tasks:**

1. Test user registration/login flow
2. Test product listing
3. Test order creation
4. Test Paystack payment flow
5. Test order tracking
6. Create API documentation (optional)

---

## Implementation Order

1. ✅ Section 1: Project Setup
2. ✅ Section 2: Database Schema
3. ✅ Section 3: Types & Utilities
4. ✅ Section 4: Middleware
5. ✅ Section 5: Users
6. ✅ Section 6: Products
7. ✅ Section 7: Orders
8. ✅ Section 8: Paystack
9. ✅ Section 9: Server Setup
10. ✅ Section 10: Testing

---

## Paystack API Endpoints (Direct API Calls)

### Initialize Transaction

```
POST https://api.paystack.co/transaction/initialize
Headers:
  Authorization: Bearer {SECRET_KEY}
  Content-Type: application/json
Body:
{
  email: string,
  amount: number (in kobo),
  reference: string,
  callback_url: string,
  metadata: object
}
```

### Verify Transaction

```
GET https://api.paystack.co/transaction/verify/{reference}
Headers:
  Authorization: Bearer {SECRET_KEY}
```

### Webhook

```
POST /api/payments/webhook
Headers:
  x-paystack-signature: string (verify signature)
Body:
  Paystack event data
```

---

## Order Status Flow

- `pending` - Order created, payment not initiated
- `payment_pending` - Payment initialized, awaiting payment
- `paid` - Payment verified
- `processing` - Order being prepared
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

---

## Environment Variables

Create `.env` file with:

```
DATABASE_URL="postgresql://user:password@localhost:5432/ecomm_ai"
PAYSTACK_SECRET_KEY="sk_test_..."
PAYSTACK_PUBLIC_KEY="pk_test_..."
JWT_SECRET="your-secret-key"
PORT=3000
```

---

## Notes

- No password hashing needed (phone-only auth)
- Use Paystack APIs directly via fetch (no package)
- JWT tokens for phone-based authentication
- Simple user model: name + phone only
