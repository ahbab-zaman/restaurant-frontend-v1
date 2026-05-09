"use client";

import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { hotelKeys } from "@/lib/hotels/hotels.query";
import { CreateRoomPayload, RoomFilters, RoomsListResponse, UpdateRoomPayload } from "@/types/room";
import { createRoomsApi, deleteRoomApi, getRoomsByHotelApi, updateRoomApi } from "./rooms.api";

export const roomKeys = {
  listByHotel: (hotelId: string, filters?: RoomFilters, pagination?: { page?: number; limit?: number }) =>
    ["rooms", hotelId, filters?.type ?? "", filters?.isAvailable ?? "", pagination?.page ?? 1, pagination?.limit ?? 10] as const,
};

export const useRoomsByHotelsQuery = (
  hotelIds: string[],
  filters?: RoomFilters,
  pagination?: { page?: number; limit?: number },
) => {
  const queries = useQueries({
    queries: hotelIds.map((hotelId) => ({
      queryKey: roomKeys.listByHotel(hotelId, filters, pagination),
      queryFn: () => getRoomsByHotelApi(hotelId, filters, pagination),
      enabled: Boolean(hotelId),
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isFetching = queries.some((query) => query.isFetching);
  const isError = queries.some((query) => query.isError);

  const data: RoomsListResponse = {
    items: queries.flatMap((query) => query.data?.items ?? []),
    meta: {
      page: pagination?.page ?? 1,
      limit: queries.reduce((sum, query) => sum + (query.data?.meta.limit ?? 0), 0),
      total: queries.reduce((sum, query) => sum + (query.data?.meta.total ?? 0), 0),
      totalPages: Math.max(1, ...queries.map((query) => query.data?.meta.totalPages ?? 1)),
    },
  };

  return { data, isLoading, isFetching, isError };
};

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
