import TelegramBot from "node-telegram-bot-api";
import { PaystackService } from "./paystackService.js";
import { prisma } from "../utils/prisma.js";

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set in environment variables");
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: false, // We'll use webhooks
});

/**
 * Send message to user
 */
export async function sendMessage(
  chatId: number,
  text: string,
  options?: TelegramBot.SendMessageOptions
): Promise<TelegramBot.Message> {
  try {
    return await bot.sendMessage(chatId, text, options);
  } catch (error: any) {
    console.error(`Failed to send message to chat ${chatId}:`, error.message);
    throw error;
  }
}

/**
 * Send product information with inline keyboard
 */
export async function sendProduct(
  chatId: number,
  product: any,
  matchType: "exact" | "related"
): Promise<void> {
  const caption =
    `*${product.name}*\n\n` +
    `💰 Price: ₦${product.price.toLocaleString()}\n` +
    `🎨 Color: ${product.color}\n` +
    `📏 Fit: ${product.fit}\n` +
    `⭐ Rating: ${product.rating}\n` +
    `\n${matchType === "exact" ? "✅ Exact Match!" : "🔍 Related Product"}`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "🛒 Order This Product",
          callback_data: `order_${product.id}`,
        },
      ],
    ],
  };

  if (product.image) {
    await bot.sendPhoto(chatId, product.image, {
      caption,
      parse_mode: "Markdown",
      reply_markup: keyboard,
    });
  } else {
    await bot.sendMessage(chatId, caption, {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    });
  }
}

/**
 * Send multiple products
 */
export async function sendProducts(
  chatId: number,
  products: Array<{ product: any; matchType: "exact" | "related" }>
): Promise<void> {
  if (products.length === 0) {
    await sendMessage(
      chatId,
      "❌ No matching products found. Please try describing the product differently or send an image."
    );
    return;
  }

  // Send exact matches first
  const exactMatches = products.filter((p) => p.matchType === "exact");
  const relatedMatches = products.filter((p) => p.matchType === "related");

  if (exactMatches.length > 0) {
    await sendMessage(
      chatId,
      `✅ Found ${exactMatches.length} exact match(es):`
    );
    for (const { product, matchType } of exactMatches) {
      await sendProduct(chatId, product, matchType);
    }
  }

  if (relatedMatches.length > 0 && exactMatches.length === 0) {
    await sendMessage(
      chatId,
      `🔍 Found ${relatedMatches.length} related product(s):`
    );
    for (const { product, matchType } of relatedMatches.slice(0, 3)) {
      await sendProduct(chatId, product, matchType);
    }
  }
}

/**
 * Send payment link
 */
export async function sendPaymentLink(
  chatId: number,
  orderId: string,
  authorizationUrl: string,
  totalAmount: number
): Promise<void> {
  const message =
    `💳 *Payment Required*\n\n` +
    `Order ID: \`${orderId.slice(0, 8)}\`\n` +
    `Total: ₦${totalAmount.toLocaleString()}\n\n` +
    `Click the button below to pay:`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "💳 Pay with Paystack",
          url: authorizationUrl,
        },
      ],
    ],
  };

  await bot.sendMessage(chatId, message, {
    parse_mode: "Markdown",
    reply_markup: keyboard,
  });
}

/**
 * Send order history link
 */
export async function sendOrderHistoryLink(
  chatId: number,
  userId: string
): Promise<void> {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const orderHistoryUrl = `${frontendUrl}/orders?userId=${userId}`;

  const message =
    `✅ *Payment Successful!*\n\n` +
    `Your order has been confirmed. View your order history:`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "📦 View Order History",
          url: orderHistoryUrl,
        },
      ],
    ],
  };

  await bot.sendMessage(chatId, message, {
    parse_mode: "Markdown",
    reply_markup: keyboard,
  });
}

/**
 * Get or create user from Telegram
 */
export async function getOrCreateTelegramUser(
  chatId: number,
  telegramName: string,
  phoneNumber?: string
): Promise<{ id: string; phone: string }> {
  try {
    // If phone number provided, try to find or create user
    if (phoneNumber) {
      const normalizedPhone = phoneNumber.replace(/\D/g, ""); // Remove non-digits

      // Validate phone number format (at least 10 digits)
      if (normalizedPhone.length < 10) {
        throw new Error(
          "Invalid phone number format. Please provide a valid phone number."
        );
      }

      let user = await prisma.user.findUnique({
        where: { phone: normalizedPhone },
      });

      if (!user) {
        // Create new user
        user = await prisma.user.create({
          data: {
            name: telegramName || "Telegram User",
            phone: normalizedPhone,
            telegramChatId: chatId.toString(),
          },
        });
      } else {
        // Update telegram chat ID if not set or different
        if (user.telegramChatId !== chatId.toString()) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { telegramChatId: chatId.toString() },
          });
        }
      }

      return { id: user.id, phone: user.phone };
    }

    // No phone number - check if user exists by chatId
    const user = await prisma.user.findFirst({
      where: { telegramChatId: chatId.toString() },
    });

    if (user) {
      return { id: user.id, phone: user.phone };
    }

    // User doesn't exist and no phone - ask for phone number
    throw new Error("PHONE_REQUIRED");
  } catch (error: any) {
    if (error.message === "PHONE_REQUIRED") {
      throw error; // Re-throw as-is
    }
    console.error("Error in getOrCreateTelegramUser:", error);
    throw new Error("Failed to process user information. Please try again.");
  }
}

export { bot };
