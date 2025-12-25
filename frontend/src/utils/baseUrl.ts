const BASE_URL_KEY = "api_base_url";
const DEFAULT_BASE_URL = "http://localhost:3000/api";

/**
 * Get the persisted BASE_URL from localStorage
 * Returns default if not set
 */
export function getBaseUrl(): string {
  const stored = localStorage.getItem(BASE_URL_KEY);
  return stored || DEFAULT_BASE_URL;
}

/**
 * Set and persist BASE_URL to localStorage
 * If empty string, removes from storage (will use default)
 */
export function setBaseUrl(url: string): void {
  if (url.trim() === "") {
    localStorage.removeItem(BASE_URL_KEY);
  } else {
    // Ensure URL ends with /api if it doesn't already
    let finalUrl = url.trim();
    if (!finalUrl.endsWith("/api")) {
      finalUrl = finalUrl.replace(/\/$/, "") + "/api";
    }
    localStorage.setItem(BASE_URL_KEY, finalUrl);
  }
}

/**
 * Get the current BASE_URL (for display purposes)
 */
export function getCurrentBaseUrl(): string {
  return getBaseUrl();
}
