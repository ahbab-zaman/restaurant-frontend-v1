import { store } from "@/store";
import { clearAuth, setAccessToken } from "@/store/auth.slice";
import { ApiSuccessResponse } from "@/types/auth";
import { hasSessionFlag } from "./session";

const RAW_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/api/v1");

if (!RAW_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is required in production.");
}

const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");
export const API_V1_PREFIX = /\/api\/v1$/i.test(API_BASE_URL) ? "" : "/api/v1";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const apiError = ApiError;

const refreshAccessToken = async (): Promise<string | null> => {
  const response = await fetch(`${API_BASE_URL}${API_V1_PREFIX}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const result = (await response.json()) as ApiSuccessResponse<{ accessToken: string }>;
  if (!result.success || !result.data?.accessToken) {
    return null;
  }

  store.dispatch(setAccessToken(result.data.accessToken));
  return result.data.accessToken;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const execute = async (token?: string | null) => {
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });
  };

  const token = store.getState().auth.accessToken;
  let response = await execute(token);

  const nextAccessToken = response.headers.get("x-access-token");
  if (nextAccessToken) {
    store.dispatch(setAccessToken(nextAccessToken));
  }

  if (response.status === 401 && hasSessionFlag() && !path.endsWith("/auth/refresh")) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      response = await execute(refreshedToken);
      const retriedAccessToken = response.headers.get("x-access-token");
      if (retriedAccessToken) {
        store.dispatch(setAccessToken(retriedAccessToken));
      }
    }
  }

  const result = (await response.json()) as ApiSuccessResponse<T>;

  if (!response.ok || !result.success) {
    const message = result?.message || "Request failed";

    if (response.status === 401 && !hasSessionFlag()) {
      store.dispatch(clearAuth());
    }

    throw new ApiError(message, response.status);
  }

  return result.data;
}

export async function apiFetchMultipart<T>(
  path: string,
  options: Omit<RequestInit, "body"> & { body: FormData },
): Promise<T> {
  const execute = async (token?: string | null) => {
    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      body: options.body,
      credentials: "include",
    });
  };

  const token = store.getState().auth.accessToken;
  let response = await execute(token);

  const nextAccessToken = response.headers.get("x-access-token");
  if (nextAccessToken) {
    store.dispatch(setAccessToken(nextAccessToken));
  }

  if (response.status === 401 && hasSessionFlag() && !path.endsWith("/auth/refresh")) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      response = await execute(refreshedToken);
      const retriedAccessToken = response.headers.get("x-access-token");
      if (retriedAccessToken) {
        store.dispatch(setAccessToken(retriedAccessToken));
      }
    }
  }

  const result = (await response.json()) as ApiSuccessResponse<T>;

  if (!response.ok || !result.success) {
    const message = result?.message || "Request failed";

    if (response.status === 401 && !hasSessionFlag()) {
      store.dispatch(clearAuth());
    }

    throw new ApiError(message, response.status);
  }

  return result.data;
}
