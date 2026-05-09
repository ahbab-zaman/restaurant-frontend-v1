"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createHotelApi, deleteHotelApi, getHotelByIdApi, getHotelsApi, updateHotelApi } from "./hotels.api";
import { HotelMutationPayload } from "@/types/hotel";

export const hotelKeys = {
  list: ["hotels"] as const,
  detail: (id: string) => ["hotels", id] as const,
};

export const useHotelsQuery = (params?: { page?: number; limit?: number }) =>
  useQuery({
    queryKey: [...hotelKeys.list, params?.page ?? 1, params?.limit ?? 10],
    queryFn: () => getHotelsApi(params?.page ?? 1, params?.limit ?? 10),
  });

export const useHotelByIdQuery = (id: string) =>
  useQuery({
    queryKey: hotelKeys.detail(id),
    queryFn: () => getHotelByIdApi(id),
    enabled: !!id,
  });

export const useCreateHotelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: HotelMutationPayload) => createHotelApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hotelKeys.list });
    },
  });
};

export const useUpdateHotelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: HotelMutationPayload }) =>
      updateHotelApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hotelKeys.list });
    },
  });
};

export const useDeleteHotelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteHotelApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hotelKeys.list });
    },
  });
};
