export type RoomType = "SINGLE" | "DOUBLE" | "TWIN" | "SUITE" | "DELUXE" | "FAMILY";

import { Hotel, PaginationMeta } from "./hotel";

export interface Room {
  id: string;
  hotelId: string;
  roomNumber: string;
  type: RoomType;
  price: number;
  capacity: number;
  floor: number;
  description?: string | null;
  amenities: string[];
  isAvailable: boolean;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  createdAt: string;
  updatedAt: string;
  hotel?: Hotel;
}

export interface RoomsListResponse {
  items: Room[];
  meta: PaginationMeta;
}

export interface RoomFilters {
  type?: RoomType | "";
  isAvailable?: "" | "true" | "false";
}

export interface CreateRoomPayload {
  hotelId: string;
  roomNumber: string;
  type: RoomType;
  price: number;
  capacity: number;
  floor: number;
  description?: string;
  amenities: string[];
  isAvailable?: boolean;
  quantity: number;
  image?: File | null;
}

export interface UpdateRoomPayload {
  type?: RoomType;
  price?: number;
  capacity?: number;
  floor?: number;
  description?: string;
  amenities?: string[];
  isAvailable?: boolean;
  image?: File | null;
}
