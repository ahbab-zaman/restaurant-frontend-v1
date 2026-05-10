"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateBookingPayload } from "@/types/booking";
import { hotelKeys } from "@/lib/hotels/hotels.query";
import { createBookingApi, getBookingByIdApi, getMyBookingsApi, getRoomAvailabilityApi } from "./bookings.api";

export const bookingKeys = {
  me: (page = 1, limit = 10) => ["bookings", "me", page, limit] as const,
  byId: (bookingId: string) => ["bookings", bookingId] as const,
  availability: (roomId: string, startDate: string, days = 7) =>
    ["bookings", "availability", roomId, startDate, days] as const,
};

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBookingApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "me"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["rooms-bulk"] });
      queryClient.invalidateQueries({ queryKey: hotelKeys.list });
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

export const useRoomAvailabilityQuery = (roomId: string, startDate: string, days = 7, enabled = true) =>
  useQuery({
    queryKey: bookingKeys.availability(roomId, startDate, days),
    queryFn: () => getRoomAvailabilityApi(roomId, startDate, days),
    enabled: enabled && Boolean(roomId) && Boolean(startDate),
  });
