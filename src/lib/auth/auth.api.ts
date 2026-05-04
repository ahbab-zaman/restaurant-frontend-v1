import {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";
import { apiFetch } from "./api-client";

export const loginApi = (payload: LoginPayload) =>
  apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const registerApi = (payload: RegisterPayload) =>
  apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const logoutApi = () =>
  apiFetch<null>("/auth/logout", {
    method: "POST",
  });

export const meApi = () => apiFetch<AuthUser>("/auth/me");

export const refreshTokenApi = () =>
  apiFetch<{ accessToken: string }>("/auth/refresh", {
    method: "POST",
  });

