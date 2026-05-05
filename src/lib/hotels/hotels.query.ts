"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createHotelApi, deleteHotelApi, getHotelsApi, updateHotelApi } from "./hotels.api";
import { HotelMutationPayload } from "@/types/hotel";

export const hotelKeys = {
  list: ["hotels"] as const,
};

export const useHotelsQuery = () =>
  useQuery({
    queryKey: hotelKeys.list,
    queryFn: getHotelsApi,
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
