import {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";
import { apiFetch, API_V1_PREFIX } from "./api-client";

const AUTH_BASE_PATH = `${API_V1_PREFIX}/auth`;

export const loginApi = (payload: LoginPayload) =>
  apiFetch<AuthResponse>(`${AUTH_BASE_PATH}/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const registerApi = (payload: RegisterPayload) =>
  apiFetch<AuthResponse>(`${AUTH_BASE_PATH}/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const logoutApi = () =>
  apiFetch<null>(`${AUTH_BASE_PATH}/logout`, {
    method: "POST",
  });

export const meApi = () => apiFetch<AuthUser>(`${AUTH_BASE_PATH}/me`);

export const refreshTokenApi = () =>
  apiFetch<{ accessToken: string }>(`${AUTH_BASE_PATH}/refresh`, {
    method: "POST",
  });

