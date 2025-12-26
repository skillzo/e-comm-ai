import OpenAI from "openai";
import { prisma } from "../utils/prisma.js";
import type { Product } from "@prisma/client";
import { logTokenUsage } from "../utils/tokenLogger.js";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ProductMatch {
  product: Product;
  confidence: number;
  matchType: "exact" | "related";
}

/**
 * Find similar products based on reference products
 */
export async function findSimilarProducts(
  referenceProductIds: string[]
): Promise<ProductMatch[]> {
  // Get all products
  const allProducts = await prisma.product.findMany({
    include: {
      productImages: true,
    },
  });

  if (allProducts.length === 0) {
    return [];
  }

  // Get reference products
  const referenceProducts = allProducts.filter((p) =>
    referenceProductIds.includes(p.id)
  );

  if (referenceProducts.length === 0) {
    return [];
  }

  // Build description from reference products
  const referenceDescription = referenceProducts
    .map((p) => {
      const descriptionParts = [
        p.name,
        p.color,
        p.fit,
        p.aiDescription,
        p.alt,
      ].filter(Boolean);
      return descriptionParts.join(" ");
    })
    .join(", ");

  // Use OpenAI to find similar products
  const productList = allProducts
    .map((p) => {
      const descriptionParts = [
        p.name,
        p.color,
        p.fit,
        p.aiDescription,
        p.alt,
      ].filter(Boolean);

      const description =
        descriptionParts.length > 0 ? descriptionParts.join(" ") : p.name || "";

      return `ID: ${p.id}, Name: ${p.name}, Color: ${p.color}, Fit: ${p.fit}, Description: ${description}`;
    })
    .join("\n");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a product recommendation assistant. Given reference products and a list of all products, 
          find products that are similar in style, type, color, or fit to the reference products.
          Exclude the reference products themselves from the results.
          Return format: { "similarProducts": ["product-id-1", "product-id-2", "product-id-3"] }
          Maximum 5 similar products. Prioritize products that share similar characteristics (color, fit, style, type).`,
        },
        {
          role: "user",
          content: `Reference products: ${referenceDescription}\n\nFind similar products from:\n${productList}\n\nReturn JSON with similarProducts array (exclude reference product IDs: ${referenceProductIds.join(
            ", "
          )}).`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const usage = response.usage;
    if (usage) {
      logTokenUsage("similar_products", {
        promptTokens: usage.prompt_tokens || 0,
        completionTokens: usage.completion_tokens || 0,
        totalTokens: usage.total_tokens || 0,
      });
    }

    const matches = JSON.parse(response.choices[0]?.message?.content || "{}");

    const similarProducts: ProductMatch[] = (matches.similarProducts || [])
      .filter((id: string) => !referenceProductIds.includes(id)) // Exclude reference products
      .map((id: string) => {
        const product = allProducts.find((p) => p.id === id);
        return product
          ? { product, confidence: 0.7, matchType: "related" as const }
          : null;
      })
      .filter(Boolean) as ProductMatch[];

    return similarProducts.slice(0, 5);
  } catch (error) {
    console.error("Similar products error:", error);
    // Fallback: find products with similar attributes
    return findSimilarProductsFallback(referenceProducts, allProducts);
  }
}

/**
 * Fallback: Find similar products by matching attributes
 */
function findSimilarProductsFallback(
  referenceProducts: Product[],
  allProducts: Product[]
): ProductMatch[] {
  // Extract common attributes from reference products
  const commonColors = new Set(
    referenceProducts.map((p) => p.color.toLowerCase())
  );
  const commonFits = new Set(referenceProducts.map((p) => p.fit.toLowerCase()));
  const commonTypes = new Set(
    referenceProducts.map((p) => p.name.toLowerCase().split(" ")[0])
  );

  const referenceIds = new Set(referenceProducts.map((p) => p.id));

  const scored = allProducts
    .filter((p) => !referenceIds.has(p.id))
    .map((product) => {
      let score = 0;
      const productColor = product.color.toLowerCase();
      const productFit = product.fit.toLowerCase();
      const productType = product.name.toLowerCase().split(" ")[0];

      if (commonColors.has(productColor)) score += 2;
      if (commonFits.has(productFit)) score += 2;
      if (commonTypes.has(productType)) score += 3;

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => ({
      product: item.product,
      confidence: Math.min(0.5 + item.score * 0.1, 0.8),
      matchType: "related" as const,
    }));

  return scored;
}

/**
 * Match products based on text description (PRIMARY METHOD)
 */
export async function matchProductsFromText(
  userDescription: string
): Promise<ProductMatch[]> {
  // Get all products
  const allProducts = await prisma.product.findMany({
    include: {
      productImages: true,
    },
  });

  if (allProducts.length === 0) {
    return [];
  }

  // Use OpenAI to find best matches from text description
  const productList = allProducts
    .map((p) => {
      const descriptionParts = [
        p.name,
        p.color,
        p.fit,
        p.aiDescription,
        p.alt,
      ].filter(Boolean);

      const description =
        descriptionParts.length > 0 ? descriptionParts.join(" ") : p.name || "";

      return `ID: ${p.id}, Name: ${p.name}, Color: ${p.color}, Fit: ${p.fit}, Description: ${description}`;
    })
    .join("\n");

  try {
    const response = await openai.chat.completions.create({
      //  model: "gpt-4", //
      model: "gpt-3.5-turbo",
      // model: "gpt-4o-mini"
      messages: [
        {
          role: "system",
          content: `You are a product matching assistant. Given a user's product description and a list of products, 
          return the best matching product IDs in JSON format. Prioritize exact matches first, then related products.

          if the user asks "can i see more pictures of [product name]" or anything related to pictures, first identify the product and return the product-id of the product in the exactMatches array.
          
          If the user asks for "more products like [product names]" or "similar to [product names]", first identify the 
          reference products mentioned, then find similar products based on those references. Include the reference products 
          in the referenceProducts array.
          
          Return format: { 
            "exactMatches": ["product-id-1"], 
            "relatedMatches": ["product-id-2", "product-id-3"],
            "referenceProducts": ["product-id-4", "product-id-5"] // If user mentions specific products to find similar ones
          }
          If no exact match, return empty exactMatches array and populate relatedMatches with similar products.
          Maximum 5 products total (prioritize exact matches). 
          If referenceProducts are provided, find products similar to those (exclude reference products from results).`,
        },
        {
          role: "user",
          content: `User description: "${userDescription}"\n\nAvailable products:\n${productList}\n\nReturn JSON with exactMatches, relatedMatches, and optionally referenceProducts arrays. If user asks for "more like X", include X in referenceProducts and find similar products.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    // Log token usage
    const usage = response.usage;
    if (usage) {
      logTokenUsage("product_matching", {
        promptTokens: usage.prompt_tokens || 0,
        completionTokens: usage.completion_tokens || 0,
        totalTokens: usage.total_tokens || 0,
      });
    }

    const matches = JSON.parse(response.choices[0]?.message?.content || "{}");

    // If reference products are mentioned, use them to find similar products
    if (matches.referenceProducts && matches.referenceProducts.length > 0) {
      const similarProducts = await findSimilarProducts(
        matches.referenceProducts
      );
      return similarProducts;
    }

    const exactMatches: ProductMatch[] = (matches.exactMatches || [])
      .map((id: string) => {
        const product = allProducts.find((p) => p.id === id);
        return product
          ? { product, confidence: 0.9, matchType: "exact" as const }
          : null;
      })
      .filter(Boolean) as ProductMatch[];

    const relatedMatches: ProductMatch[] = (matches.relatedMatches || [])
      .filter((id: string) => !matches.exactMatches?.includes(id))
      .map((id: string) => {
        const product = allProducts.find((p) => p.id === id);
        return product
          ? { product, confidence: 0.6, matchType: "related" as const }
          : null;
      })
      .filter(Boolean) as ProductMatch[];

    // Return exact matches first, then related (limit to 5 total)
    const results = [...exactMatches, ...relatedMatches].slice(0, 5);
    return results;
  } catch (error) {
    console.error("Product matching error:", error);
    // Fallback: simple text search
    return fallbackTextSearch(userDescription, allProducts);
  }
}

/**
 * Analyze image using OpenAI Vision API (SECONDARY METHOD - for image support)
 */
export async function analyzeImage(imageUrl: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview", // or "gpt-4o" if available
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this product in detail. Include: product name, type, color, style, fit, and any distinguishing features. Be specific and detailed.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    // Log token usage
    const usage = response.usage;
    if (usage) {
      logTokenUsage(
        "image_analysis",
        {
          promptTokens: usage.prompt_tokens || 0,
          completionTokens: usage.completion_tokens || 0,
          totalTokens: usage.total_tokens || 0,
        },
        "gpt-4-vision-preview"
      );
    }

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("OpenAI Vision API error:", error);
    throw new Error("Failed to analyze image");
  }
}

/**
 * Match products from image (uses analyzeImage then matchProductsFromText)
 */
export async function matchProductsFromImage(
  imageUrl: string
): Promise<ProductMatch[]> {
  try {
    // First, analyze the image to get description
    const aiDescription = await analyzeImage(imageUrl);

    // Then match products using the description
    return matchProductsFromText(aiDescription);
  } catch (error) {
    console.error("Image matching error:", error);
    throw error;
  }
}

/**
 * Fallback: Simple text search if OpenAI fails
 */
function fallbackTextSearch(
  description: string,
  products: Product[]
): ProductMatch[] {
  const lowerDescription = description.toLowerCase();
  const keywords = lowerDescription.split(/\s+/);

  const scored = products.map((product) => {
    const productText = `${product.name} ${product.color} ${product.fit} ${
      product.description || ""
    }`.toLowerCase();

    let score = 0;
    keywords.forEach((keyword) => {
      if (productText.includes(keyword)) {
        score += 1;
      }
    });

    return {
      product,
      score,
    };
  });

  // Sort by score and return top 5
  const topMatches = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => ({
      product: item.product,
      confidence: Math.min(0.5 + item.score * 0.1, 0.8),
      matchType: item.score >= 3 ? ("exact" as const) : ("related" as const),
    }));

  return topMatches;
}
