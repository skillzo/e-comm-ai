import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { prisma } from "./utils/prisma.js";
import { webhookHandler } from "./controllers/paymentController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Webhook route needs raw body for signature verification - handle separately before JSON parser
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    // Store raw body for signature verification
    const rawBody = req.body.toString();
    
    // Parse body to JSON for handler
    let parsedBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Invalid JSON" });
    }
    
    // Create modified request with both raw and parsed body
    const modifiedReq = {
      ...req,
      body: parsedBody,
      rawBody: rawBody,
    } as typeof req & { rawBody: string };
    
    await webhookHandler(modifiedReq, res, () => {});
  }
);

// Regular JSON middleware for all other routes
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
