import { store } from "@/store";
import { clearAuth, setAccessToken } from "@/store/auth.slice";
import { ApiSuccessResponse } from "@/types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/api/v1");

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is required in production.");
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const apiError = ApiError;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = store.getState().auth.accessToken;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const nextAccessToken = response.headers.get("x-access-token");
  if (nextAccessToken) {
    store.dispatch(setAccessToken(nextAccessToken));
  }

  const result = (await response.json()) as ApiSuccessResponse<T>;

  if (!response.ok || !result.success) {
    const message = result?.message || "Request failed";

    if (response.status === 401) {
      store.dispatch(clearAuth());
    }

    throw new ApiError(message, response.status);
  }

  return result.data;
}
