interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class Cache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Set a value in cache with TTL in milliseconds
   */
  set<T>(key: string, value: T, ttlMs: number): void {
    const expiresAt = Date.now() + ttlMs;
    this.cache.set(key, { data: value, expiresAt });
  }

  /**
   * Get a value from cache, returns null if expired or not found
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Delete a key from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Clean expired entries (can be called periodically)
   */
  cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new Cache();

// Clean expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    cache.cleanExpired();
  }, 5 * 60 * 1000); // 5 minutes
}

