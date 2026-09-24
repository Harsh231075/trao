"use client";

function getApiBaseUrl(): string {
  // 1. Next.js standard client-side env variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // 2. Fallback client-side env variable
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  // 3. Fallback server-side env variable
  if (process.env.API_URL) {
    return process.env.API_URL;
  }

  // 4. Auto-detect production deployment (Vercel / Production domain)
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      return "https://trao-vuf3.onrender.com/api";
    }
  }

  // 5. Local development default
  return "http://localhost:5001/api";
}

const API_BASE = getApiBaseUrl();

interface ApiOptions extends RequestInit {
  skipAuth?: boolean;
}

class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("trao_token");
}

function setToken(token: string): void {
  localStorage.setItem("trao_token", token);
}

function clearToken(): void {
  localStorage.removeItem("trao_token");
}

async function request<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { skipAuth = false, headers: customHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((customHeaders as Record<string, string>) || {}),
  };

  if (!skipAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE}${endpoint}`;

  const res = await fetch(url, {
    ...rest,
    headers,
  });

  // Handle 204 No Content
  if (res.status === 204) return {} as T;

  let data: any;
  try {
    data = await res.json();
  } catch {
    throw new ApiError("Invalid server response", res.status);
  }

  if (!res.ok) {
    // If 401, clear token (session expired)
    if (res.status === 401) {
      clearToken();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    throw new ApiError(
      data?.error || data?.message || `Request failed (${res.status})`,
      res.status,
      data?.code
    );
  }

  return data as T;
}

// Convenience methods
const api = {
  get: <T = any>(endpoint: string, options?: ApiOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body?: any, options?: ApiOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: ApiOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T = any>(endpoint: string, body?: any, options?: ApiOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: ApiOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};

export { api, ApiError, getToken, setToken, clearToken };
export default api;
