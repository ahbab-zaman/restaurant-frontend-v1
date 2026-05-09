import { API_V1_PREFIX, apiFetch, apiFetchMultipart } from "@/lib/auth/api-client";
import { CreateRoomPayload, Room, RoomFilters, RoomsListResponse, UpdateRoomPayload } from "@/types/room";

const toRoomFormData = (payload: Omit<CreateRoomPayload, "hotelId"> | UpdateRoomPayload, isCreate: boolean) => {
  const formData = new FormData();

  if ((payload as CreateRoomPayload).roomNumber !== undefined) {
    formData.append("roomNumber", String((payload as CreateRoomPayload).roomNumber));
  }

  if (payload.type !== undefined) formData.append("type", payload.type);
  if (payload.price !== undefined) formData.append("price", String(payload.price));
  if (payload.capacity !== undefined) formData.append("capacity", String(payload.capacity));
  if (payload.floor !== undefined) formData.append("floor", String(payload.floor));
  if (payload.description !== undefined) formData.append("description", payload.description);
  if (payload.amenities !== undefined) {
    payload.amenities.forEach((item) => formData.append("amenities", item));
  }
  if (payload.isAvailable !== undefined) formData.append("isAvailable", String(payload.isAvailable));

  if (isCreate && (payload as CreateRoomPayload).quantity !== undefined) {
    formData.append("quantity", String((payload as CreateRoomPayload).quantity));
  }

  if (payload.image) formData.append("image", payload.image);

  return formData;
};

const roomsBasePath = (hotelId: string) => `${API_V1_PREFIX}/hotels/${hotelId}/rooms`;

export const getRoomsByHotelApi = (
  hotelId: string,
  filters?: RoomFilters,
  pagination?: { page?: number; limit?: number },
) => {
  const params = new URLSearchParams();
  params.set('page', String(pagination?.page ?? 1));
  params.set('limit', String(pagination?.limit ?? 10));
  if (filters?.type) params.set('type', filters.type);
  if (filters?.isAvailable) params.set('isAvailable', filters.isAvailable);
  return apiFetch<RoomsListResponse>(`${roomsBasePath(hotelId)}?${params.toString()}`);
};

export const getRoomsByHotelIdsApi = (
  hotelIds: string[],
  filters?: RoomFilters,
  pagination?: { page?: number; limit?: number },
) => {
  const params = new URLSearchParams();
  params.set('hotelIds', hotelIds.join(','));
  params.set('page', String(pagination?.page ?? 1));
  params.set('limit', String(pagination?.limit ?? 100)); // fetch all for listing pages
  if (filters?.type) params.set('type', filters.type);
  if (filters?.isAvailable) params.set('isAvailable', filters.isAvailable);
  return apiFetch<RoomsListResponse>(`${API_V1_PREFIX}/rooms?${params.toString()}`);
};


export const createRoomsApi = (payload: CreateRoomPayload) =>
  apiFetchMultipart<Room[]>(roomsBasePath(payload.hotelId), {
    method: "POST",
    body: toRoomFormData(payload, true),
  });

export const updateRoomApi = (hotelId: string, roomId: string, payload: UpdateRoomPayload) =>
  apiFetchMultipart<Room>(`${roomsBasePath(hotelId)}/${roomId}`, {
    method: "PATCH",
    body: toRoomFormData(payload, false),
  });

export const deleteRoomApi = (hotelId: string, roomId: string) =>
  apiFetch<null>(`${roomsBasePath(hotelId)}/${roomId}`, {
    method: "DELETE",
  });
