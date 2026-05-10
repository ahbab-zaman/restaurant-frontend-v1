"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateBookingPayload } from "@/types/booking";
import { createBookingApi, getBookingByIdApi, getMyBookingsApi } from "./bookings.api";

export const bookingKeys = {
  me: (page = 1, limit = 10) => ["bookings", "me", page, limit] as const,
  byId: (bookingId: string) => ["bookings", bookingId] as const,
};

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBookingApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "me"] });
    },
  });
};

export const useMyBookingsQuery = (page = 1, limit = 10) =>
  useQuery({
    queryKey: bookingKeys.me(page, limit),
    queryFn: () => getMyBookingsApi(page, limit),
  });

export const useBookingByIdQuery = (bookingId: string, enabled = true) =>
  useQuery({
    queryKey: bookingKeys.byId(bookingId),
    queryFn: () => getBookingByIdApi(bookingId),
    enabled: enabled && Boolean(bookingId),
    refetchInterval: 3000,
  });
