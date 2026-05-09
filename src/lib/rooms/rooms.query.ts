"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hotelKeys } from "@/lib/hotels/hotels.query";
import { CreateRoomPayload, RoomFilters, RoomsListResponse, UpdateRoomPayload } from "@/types/room";
import { createRoomsApi, deleteRoomApi, getRoomsByHotelApi, getRoomsByHotelIdsApi, updateRoomApi } from "./rooms.api";

export const roomKeys = {
  listByHotel: (hotelId: string, filters?: RoomFilters, pagination?: { page?: number; limit?: number }) =>
    ["rooms", hotelId, filters?.type ?? "", filters?.isAvailable ?? "", pagination?.page ?? 1, pagination?.limit ?? 10] as const,
  listByHotelIds: (hotelIds: string[], filters?: RoomFilters, pagination?: { page?: number; limit?: number }) =>
    ["rooms-bulk", hotelIds.join(","), filters?.type ?? "", filters?.isAvailable ?? "", pagination?.page ?? 1, pagination?.limit ?? 100] as const,
};

/**
 * Fetches rooms for multiple hotels in ONE request (bulk endpoint).
 * Replaces the previous N+1 useQueries pattern.
 */
export const useRoomsByHotelsQuery = (
  hotelIds: string[],
  filters?: RoomFilters,
  pagination?: { page?: number; limit?: number },
) => {
  const enabled = hotelIds.length > 0;

  return useQuery({
    queryKey: roomKeys.listByHotelIds(hotelIds, filters, pagination),
    queryFn: () => getRoomsByHotelIdsApi(hotelIds, filters, pagination),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes — reduces refetches across tabs
    placeholderData: (prev) => prev, // keep previous data visible during refetch
  });
};

/**
 * Fetches rooms for a single hotel (used on hotel detail page).
 */
export const useRoomsByHotelQuery = (
  hotelId: string,
  filters?: RoomFilters,
  pagination?: { page?: number; limit?: number },
) =>
  useQuery({
    queryKey: roomKeys.listByHotel(hotelId, filters, pagination),
    queryFn: () => getRoomsByHotelApi(hotelId, filters, pagination),
    enabled: Boolean(hotelId),
    staleTime: 5 * 60 * 1000,
  });



export const useCreateRoomsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRoomPayload) => createRoomsApi(payload),
    onSuccess: (_result, payload) => {
      queryClient.invalidateQueries({ queryKey: ["rooms", payload.hotelId] });
      queryClient.invalidateQueries({ queryKey: hotelKeys.list });
    },
  });
};

export const useUpdateRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ hotelId, roomId, payload }: { hotelId: string; roomId: string; payload: UpdateRoomPayload }) =>
      updateRoomApi(hotelId, roomId, payload),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["rooms", variables.hotelId] });
      queryClient.invalidateQueries({ queryKey: hotelKeys.list });
    },
  });
};

export const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ hotelId, roomId }: { hotelId: string; roomId: string }) => deleteRoomApi(hotelId, roomId),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["rooms", variables.hotelId] });
      queryClient.invalidateQueries({ queryKey: hotelKeys.list });
    },
  });
};
