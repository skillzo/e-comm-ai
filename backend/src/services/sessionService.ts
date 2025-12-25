import Redis from "ioredis";

// Initialize Redis client with error handling
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

// Handle Redis connection errors
redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

// Session TTL: 30 minutes
const SESSION_TTL = 30 * 60;

interface SessionData {
  lastViewedProductId?: string;
  conversationState?: "viewing_product" | "searching" | "ordering";
  lastMessageTime: number;
}

/**
 * Get session data for a chat
 */
export async function getSession(chatId: number): Promise<SessionData | null> {
  try {
    const key = `session:${chatId}`;
    const data = await redis.get(key);

    if (!data) {
      return null;
    }

    const session = JSON.parse(data) as SessionData;

    // Check if session expired
    const now = Date.now();
    if (now - session.lastMessageTime > SESSION_TTL * 1000) {
      await redis.del(key);
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Set session data for a chat
 */
export async function setSession(
  chatId: number,
  data: Partial<Omit<SessionData, "lastMessageTime">>
): Promise<void> {
  try {
    const key = `session:${chatId}`;
    const existing = await getSession(chatId);

    const session: SessionData = {
      ...existing,
      ...data,
      lastMessageTime: Date.now(),
    };

    await redis.setex(key, SESSION_TTL, JSON.stringify(session));
  } catch (error) {
    console.error("Error setting session:", error);
  }
}

/**
 * Clear session for a chat
 */
export async function clearSession(chatId: number): Promise<void> {
  try {
    const key = `session:${chatId}`;
    await redis.del(key);
  } catch (error) {
    console.error("Error clearing session:", error);
  }
}

/**
 * Close Redis connection (for graceful shutdown)
 */
export async function closeRedis(): Promise<void> {
  await redis.quit();
}
