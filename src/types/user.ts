import { UserRole } from "./auth";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UsersListResponse {
  items: AdminUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AdminUpdateUserPayload {
  name?: string;
  email?: string;
  role?: UserRole;
}
