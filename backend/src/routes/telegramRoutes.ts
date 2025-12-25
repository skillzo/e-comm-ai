import express from "express";
import { handleTelegramWebhook } from "../controllers/telegramController.js";

const router = express.Router();

// Telegram webhook endpoint
router.post("/webhook", express.json(), handleTelegramWebhook);

export default router;
