import { API_V1_PREFIX, apiFetch } from "@/lib/auth/api-client";
import { AdminUpdateUserPayload, AdminUser, UsersListResponse } from "@/types/user";

const USERS_BASE_PATH = `${API_V1_PREFIX}/auth/users`;

export const listUsersApi = (page = 1, limit = 10) => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  return apiFetch<UsersListResponse>(`${USERS_BASE_PATH}?${params.toString()}`);
};

export const getUserByIdApi = (userId: string) =>
  apiFetch<AdminUser>(`${USERS_BASE_PATH}/${userId}`);

export const adminUpdateUserApi = (userId: string, payload: AdminUpdateUserPayload) =>
  apiFetch<AdminUser>(`${USERS_BASE_PATH}/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const deleteUserApi = (userId: string) =>
  apiFetch<null>(`${USERS_BASE_PATH}/${userId}`, {
    method: "DELETE",
  });
