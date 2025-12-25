import { getBaseUrl } from "./baseUrl";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface ApiError {
  status: string;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Update the base URL dynamically
   */
  setBaseUrl(newUrl: string): void {
    this.baseURL = newUrl;
  }

  /**
   * Get the current base URL
   */
  getBaseUrl(): string {
    return this.baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        status: data.status || "error",
        message: data.message || "An error occurred",
        errors: data.errors,
      };
      throw error;
    }

    return data;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// Initialize with persisted BASE_URL or default
const initialBaseUrl = getBaseUrl();
export const api = new ApiClient(initialBaseUrl);

// Listen for storage changes to update API client
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "api_base_url") {
      const newUrl = e.newValue || API_BASE_URL;
      api.setBaseUrl(newUrl);
    }
  });
}
