import { Request, Response, NextFunction } from "express";
import {
  bot,
  sendMessage,
  sendProducts,
  sendPaymentLink,
  sendOrderHistoryLink,
  getOrCreateTelegramUser,
} from "../services/telegramBotService.js";
import {
  matchProductsFromText,
  matchProductsFromImage,
} from "../services/imageAnalysisService.js";
import { prisma } from "../utils/prisma.js";
import { PaystackService } from "../services/paystackService.js";
import { getSession, setSession } from "../services/sessionService.js";
import { detectIntent } from "../services/intentDetectionService.js";

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    date: number;
    text?: string;
    photo?: Array<{
      file_id: string;
      file_size: number;
      width: number;
      height: number;
    }>;
    contact?: {
      phone_number: string;
      first_name: string;
    };
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name: string;
    };
    message: {
      message_id: number;
      chat: { id: number };
    };
    data: string;
  };
}

/**
 * Handle Telegram webhook
 */
export async function handleTelegramWebhook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const update: TelegramUpdate = req.body;

    res.status(200).json({ ok: true });

    // Process update asynchronously
    processTelegramUpdate(update).catch((error) => {
      console.error("Error processing Telegram update:", error);
    });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(200).json({ ok: true });
  }
}

/**
 * Process Telegram update
 */
async function processTelegramUpdate(update: TelegramUpdate) {
  const chatId =
    update.message?.chat.id || update.callback_query?.message.chat.id;

  if (!chatId) return;

  // Handle callback queries (button clicks)
  if (update.callback_query) {
    await handleCallbackQuery(update.callback_query);
    return;
  }

  // Handle messages
  if (!update.message) return;

  const message = update.message;
  const userId = message.from.id;
  const userName = message.from.first_name || "User";

  // Handle text commands
  if (message.text) {
    await handleTextMessage(chatId, message.text, userId, userName);
    return;
  }

  // Handle images (secondary support)
  if (message.photo && message.photo.length > 0) {
    await handleImageMessage(
      chatId,
      message.photo[message.photo.length - 1].file_id,
      userId,
      userName
    );
    return;
  }

  // Handle contact (phone number)
  if (message.contact) {
    await handleContactMessage(chatId, message.contact, userId, userName);
    return;
  }
}

/**
 * Handle text messages (PRIMARY METHOD)
 */
async function handleTextMessage(
  chatId: number,
  text: string,
  userId: number,
  userName: string
) {
  const lowerText = text.toLowerCase().trim();

  // Help command
  if (lowerText === "/start" || lowerText === "/help") {
    await sendMessage(
      chatId,
      `👋 Welcome ${userName}!\n\n` +
        `*How to use:*\n` +
        `1. Link your phone number using /phone <your-phone-number>\n` +
        `2. Describe a product you're looking for (e.g., "running shorts" or "running t-shirt")\n` +
        `3. I'll find matching products\n` +
        `4. Click "Order This Product" to order\n` +
        `5. Complete payment via the link provided \n\n` +
        `*Commands:*\n` +
        `/start - Show this help\n` +
        `/orders - View your order history\n` +
        `/phone <number> - Link your phone number\n\n` +
        `*Tip:* You can also send product images!`,
      { parse_mode: "Markdown" }
    );
    return;
  }

  // Orders command
  if (lowerText === "/orders") {
    try {
      const user = await getOrCreateTelegramUser(chatId, userName);
      const frontendUrl = process.env.FRONTEND_URL;
      if (!frontendUrl || frontendUrl.includes("localhost")) {
        await sendMessage(
          chatId,
          "❌ Order history is not available. Please set FRONTEND_URL environment variable with a public URL."
        );
        return;
      }
      const orderHistoryUrl = `${frontendUrl}/orders?userId=${user.id}`;

      await sendMessage(chatId, "📦 View your order history:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📦 Open Order History",
                url: orderHistoryUrl,
              },
            ],
          ],
        },
      });
    } catch (error: any) {
      if (error.message === "PHONE_REQUIRED") {
        await sendMessage(
          chatId,
          "❌ Please share your phone number first using /phone <your-phone-number>"
        );
      } else {
        await sendMessage(chatId, "❌ Error: " + error.message);
      }
    }
    return;
  }

  // Phone number command: /phone +2341234567890
  if (lowerText.startsWith("/phone ")) {
    const phoneNumber = text.substring(7).trim();
    try {
      await getOrCreateTelegramUser(chatId, userName, phoneNumber);
      await sendMessage(
        chatId,
        "✅ Phone number linked successfully! You can now place orders."
      );
    } catch (error: any) {
      await sendMessage(chatId, "❌ Error: " + error.message);
    }
    return;
  }

  // Order command: /order <product-id> [quantity]
  if (lowerText.startsWith("/order ")) {
    const parts = text.substring(7).trim().split(" ");
    const productId = parts[0];
    const quantity = parseInt(parts[1]) || 1;

    try {
      const user = await getOrCreateTelegramUser(chatId, userName);
      await createOrderFromTelegram(chatId, user.id, productId, quantity);
    } catch (error: any) {
      if (error.message === "PHONE_REQUIRED") {
        await sendMessage(
          chatId,
          "❌ Please share your phone number first using /phone <your-phone-number>"
        );
      } else {
        await sendMessage(chatId, "❌ Error: " + error.message);
      }
    }
    return;
  }

  // Check for context-aware queries using AI intent detection
  const session = await getSession(chatId);
  const hasProductContext = !!session?.lastViewedProductId;

  if (hasProductContext) {
    // Use AI to detect intent
    const intent = await detectIntent(text, hasProductContext);

    if (intent === "product_images") {
      await handleProductImagesRequest(chatId, session.lastViewedProductId!);
      return;
    }

    if (intent === "product_info") {
      await handleProductInfoRequest(
        chatId,
        session.lastViewedProductId!,
        text
      );
      return;
    }

    // If intent is "search" or "other", fall through to product search
  }

  // Default: Treat as product search query
  await handleProductSearch(chatId, text, userId, userName);
}

/**
 * Handle product images request
 */
async function handleProductImagesRequest(chatId: number, productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        productImages: true,
      },
    });

    if (!product) {
      await sendMessage(chatId, "❌ Product not found.");
      return;
    }

    if (!product.productImages || product.productImages.length === 0) {
      await sendMessage(
        chatId,
        `📷 No additional images available for *${product.name}*.`,
        { parse_mode: "Markdown" }
      );
      return;
    }

    await sendMessage(
      chatId,
      `📷 Showing ${product.productImages.length} image(s) for *${product.name}*:`,
      { parse_mode: "Markdown" }
    );

    // Send all product images
    for (const img of product.productImages) {
      await bot.sendPhoto(chatId, img.url, {
        caption: img.alt || product.name,
      });
    }

    // Keep context
    await setSession(chatId, {
      lastViewedProductId: productId,
      conversationState: "viewing_product",
    });
  } catch (error: any) {
    console.error("Error fetching product images:", error);
    await sendMessage(chatId, "❌ Failed to load product images.");
  }
}

/**
 * Handle product info request
 */
async function handleProductInfoRequest(
  chatId: number,
  productId: string,
  userQuery: string
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        productImages: true,
      },
    });

    if (!product) {
      await sendMessage(chatId, "❌ Product not found.");
      return;
    }

    // Build product info message
    let infoMessage = `*${product.name}*\n\n`;
    infoMessage += `💰 Price: ₦${product.price.toLocaleString()}\n`;
    infoMessage += `🎨 Color: ${product.color}\n`;
    infoMessage += `📏 Fit: ${product.fit}\n`;
    infoMessage += `⭐ Rating: ${product.rating}\n`;
    infoMessage += `📦 Stock: ${product.stock} available\n`;

    if (product.description) {
      infoMessage += `\n📝 Description: ${product.description}\n`;
    }

    if (product.aiDescription) {
      infoMessage += `\n🤖 AI Description: ${product.aiDescription}\n`;
    }

    await sendMessage(chatId, infoMessage, { parse_mode: "Markdown" });

    // Keep context
    await setSession(chatId, {
      lastViewedProductId: productId,
      conversationState: "viewing_product",
    });
  } catch (error: any) {
    console.error("Error fetching product info:", error);
    await sendMessage(chatId, "❌ Failed to load product information.");
  }
}

/**
 * Handle product search from text description
 */
async function handleProductSearch(
  chatId: number,
  searchQuery: string,
  userId: number,
  userName: string
) {
  try {
    // Validate search query
    if (!searchQuery || searchQuery.trim().length < 2) {
      await sendMessage(
        chatId,
        "❌ Please provide a more detailed product description (at least 2 characters)."
      );
      return;
    }

    await sendMessage(chatId, "🔍 Searching for products... Please wait.");

    // Match products from text description
    const matches = await matchProductsFromText(searchQuery.trim());

    if (matches.length === 0) {
      await sendMessage(
        chatId,
        "❌ No products found matching your description. Please try:\n" +
          "• Using different keywords\n" +
          "• Being more specific (e.g., 'red t-shirt' instead of 'shirt')\n" +
          "• Sending a product image"
      );
      return;
    }

    // Send products to user
    await sendProducts(
      chatId,
      matches.map((m) => ({
        product: m.product,
        matchType: m.matchType,
      }))
    );

    // Update session state to searching
    await setSession(chatId, {
      conversationState: "searching",
    });
  } catch (error: any) {
    console.error("Product search error:", error);
    await sendMessage(
      chatId,
      "❌ Sorry, I couldn't process your search. Please try again with a different description or send an image."
    );
  }
}

/**
 * Handle image messages (SECONDARY SUPPORT)
 */
async function handleImageMessage(
  chatId: number,
  fileId: string,
  userId: number,
  userName: string
) {
  try {
    await sendMessage(chatId, "🔍 Analyzing image... Please wait.");

    // Get file URL from Telegram
    const file = await bot.getFile(fileId);
    const imageUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;

    // Match products from image
    const matches = await matchProductsFromImage(imageUrl);

    // Send products to user
    await sendProducts(
      chatId,
      matches.map((m) => ({
        product: m.product,
        matchType: m.matchType,
      }))
    );
  } catch (error: any) {
    console.error("Image processing error:", error);
    await sendMessage(
      chatId,
      "❌ Sorry, I couldn't process that image. Please try again with a clearer product photo or describe the product in text."
    );
  }
}

/**
 * Handle contact messages (phone number sharing)
 */
async function handleContactMessage(
  chatId: number,
  contact: { phone_number: string; first_name: string },
  userId: number,
  userName: string
) {
  try {
    await getOrCreateTelegramUser(chatId, userName, contact.phone_number);
    await sendMessage(
      chatId,
      "✅ Phone number linked successfully! You can now place orders."
    );
  } catch (error: any) {
    await sendMessage(chatId, "❌ Error: " + error.message);
  }
}

/**
 * Handle callback queries (button clicks)
 */
async function handleCallbackQuery(callbackQuery: any) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  const userName = callbackQuery.from.first_name || "User";

  // Acknowledge callback
  await bot.answerCallbackQuery(callbackQuery.id);

  // Handle order button
  if (data.startsWith("order_")) {
    const productId = data.substring(6);
    try {
      const user = await getOrCreateTelegramUser(chatId, userName);
      await createOrderFromTelegram(chatId, user.id, productId, 1);
    } catch (error: any) {
      if (error.message === "PHONE_REQUIRED") {
        await sendMessage(
          chatId,
          "❌ Please share your phone number first. Use the contact button or send /phone <your-phone-number>",
          {
            reply_markup: {
              keyboard: [
                [
                  {
                    text: "📱 Share Phone Number",
                    request_contact: true,
                  },
                ],
              ],
              one_time_keyboard: true,
            },
          }
        );
      } else {
        await sendMessage(chatId, "❌ Error: " + error.message);
      }
    }
  }
}

/**
 * Create order from Telegram and send payment link
 */
async function createOrderFromTelegram(
  chatId: number,
  userId: string,
  productId: string,
  quantity: number
) {
  try {
    // Validate quantity
    if (quantity < 1 || quantity > 10) {
      throw new Error("Quantity must be between 1 and 10");
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error(
        "Product not found. Please try selecting a product again."
      );
    }

    if (product.stock < quantity) {
      throw new Error(
        `Insufficient stock. Available: ${product.stock}. Please select a different quantity or product.`
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found. Please link your phone number first.");
    }

    // Create order
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount: product.price * quantity,
          status: "pending",
          phone: user.phone,
          orderItems: {
            create: {
              productId,
              quantity,
              price: product.price,
            },
          },
        },
      });

      // Update stock
      await tx.product.update({
        where: { id: productId },
        data: {
          stock: {
            decrement: quantity,
          },
        },
      });

      return newOrder;
    });

    // Initialize payment
    const reference = `ORDER_${order.id}_${Date.now()}`;
    const { authorizationUrl } = await PaystackService.initializePayment({
      // email: `${user.phone}@telegram.local`, // Use phone as email placeholder
      email: "ymessi30@gmail.com",
      amount: Math.round(order.totalAmount * 100),
      reference,
      callback_url: `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/payment/callback?reference=${reference}`,
      metadata: {
        orderId: order.id,
        userId: user.id,
        phone: user.phone,
        telegramChatId: chatId.toString(),
      },
    });

    // Update order with reference
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paystackReference: reference,
        status: "payment_pending",
      },
    });

    // Send payment link
    await sendPaymentLink(
      chatId,
      order.id,
      authorizationUrl,
      order.totalAmount
    );
  } catch (error: any) {
    console.error("Order creation error:", error);
    throw error; // Re-throw to be handled by caller
  }
}
