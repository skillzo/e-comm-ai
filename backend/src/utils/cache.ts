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
  console.error("Redis cache connection error:", error);
});

redis.on("connect", () => {
  console.log("Redis cache connected successfully");
});

class Cache {
  private keyPrefix = "cache:";

  /**
   * Set a value in cache with TTL in milliseconds
   */
  async set<T>(key: string, value: T, ttlMs: number): Promise<void> {
    try {
      const redisKey = `${this.keyPrefix}${key}`;
      const ttlSeconds = Math.ceil(ttlMs / 1000);
      await redis.setex(redisKey, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting cache:", error);
      // Don't throw - cache failures shouldn't break the app
    }
  }

  /**
   * Get a value from cache, returns null if expired or not found
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const redisKey = `${this.keyPrefix}${key}`;
      const data = await redis.get(redisKey);

      if (!data) {
        return null;
      }

      return JSON.parse(data) as T;
    } catch (error) {
      console.error("Error getting cache:", error);
      return null;
    }
  }

  /**
   * Delete a key from cache
   */
  async delete(key: string): Promise<void> {
    try {
      const redisKey = `${this.keyPrefix}${key}`;
      await redis.del(redisKey);
    } catch (error) {
      console.error("Error deleting cache:", error);
      // Don't throw - cache failures shouldn't break the app
    }
  }

  /**
   * Clear all cache entries (with the cache prefix)
   */
  async clear(): Promise<void> {
    try {
      const keys = await redis.keys(`${this.keyPrefix}*`);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error("Error clearing cache:", error);
      // Don't throw - cache failures shouldn't break the app
    }
  }

  /**
   * Generate a cache key from input parts
   */
  generateKey(prefix: string, ...parts: (string | number)[]): string {
    const normalized = parts
      .map((p) => String(p).toLowerCase().trim().replace(/\s+/g, "_"))
      .join(":");
    return `${prefix}:${normalized}`;
  }

  /**
   * Hash a long string for cache key (useful for URLs or long text)
   */
  hashString(str: string): string {
    // Simple hash function for cache keys
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

export const cache = new Cache();

/**
 * Close Redis connection (for graceful shutdown)
 */
export async function closeCacheRedis(): Promise<void> {
  await redis.quit();
}
