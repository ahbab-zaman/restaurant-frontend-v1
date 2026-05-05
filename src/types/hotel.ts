import { AuthUser } from "./auth";

export interface Hotel {
  id: string;
  adminId: string;
  name: string;
  address: string;
  description?: string | null;
  imageUrl: string;
  imagePublicId?: string | null;
  createdAt: string;
  updatedAt: string;
  admin: AuthUser;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface HotelsListResponse {
  items: Hotel[];
  meta: PaginationMeta;
}

export interface HotelMutationPayload {
  name: string;
  address: string;
  description?: string;
  image?: File | null;
}
