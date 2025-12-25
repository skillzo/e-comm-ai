import OpenAI from "openai";
import { logTokenUsage } from "../utils/tokenLogger.js";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type Intent = "product_images" | "product_info" | "search" | "other";

/**
 * Detect user intent using AI
 */
export async function detectIntent(
  userMessage: string,
  hasProductContext: boolean
): Promise<Intent> {
  // If no product context, it's likely a search
  if (!hasProductContext) {
    return "search";
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an intent classifier for an e-commerce Telegram bot. 
          Classify user messages into one of these categories:
          - "product_images": User wants to see more pictures/images of the current product
          - "product_info": User is asking for information about the current product (price, size, details, etc.)
          - "search": User wants to search for new/different products
          - "other": Any other intent
          
          Return ONLY the classification word (one of: product_images, product_info, search, other).
          Do not include any explanation or additional text.`,
        },
        {
          role: "user",
          content: `User message: "${userMessage}"

                    Context: User just viewed a product and is asking a follow-up question.

                    Classify the intent:`,
        },
      ],
      temperature: 0.1,
      max_tokens: 10,
    });

    // Log token usage
    const usage = response.usage;
    if (usage) {
      logTokenUsage("intent_detection", {
        promptTokens: usage.prompt_tokens || 0,
        completionTokens: usage.completion_tokens || 0,
        totalTokens: usage.total_tokens || 0,
      });
    }

    const intent = response.choices[0]?.message?.content?.trim().toLowerCase();

    // Validate intent
    const validIntents: Intent[] = [
      "product_images",
      "product_info",
      "search",
      "other",
    ];
    if (intent && validIntents.includes(intent as Intent)) {
      return intent as Intent;
    }

    // Fallback to keyword matching if AI response is invalid
    return fallbackIntentDetection(userMessage);
  } catch (error) {
    console.error("Error in intent detection:", error);
    // Fallback to keyword matching
    return fallbackIntentDetection(userMessage);
  }
}

/**
 * Fallback intent detection using keyword matching
 */
function fallbackIntentDetection(userMessage: string): Intent {
  const lower = userMessage.toLowerCase();

  // Product images keywords
  const imageKeywords = [
    "picture",
    "pictures",
    "image",
    "images",
    "photo",
    "photos",
    "gallery",
    "see more",
    "show more",
    "more images",
    "more pictures",
    "all images",
    "all pictures",
  ];

  // Product info keywords
  const infoKeywords = [
    "price",
    "cost",
    "size",
    "sizes",
    "color",
    "colors",
    "fit",
    "rating",
    "details",
    "description",
    "spec",
    "specs",
    "what is",
    "tell me about",
    "how much",
  ];

  if (imageKeywords.some((keyword) => lower.includes(keyword))) {
    return "product_images";
  }

  if (infoKeywords.some((keyword) => lower.includes(keyword))) {
    return "product_info";
  }

  // Default to search
  return "search";
}
