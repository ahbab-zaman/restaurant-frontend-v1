"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookingStatus, CreateBookingPayload } from "@/types/booking";
import { hotelKeys } from "@/lib/hotels/hotels.query";
import {
  createBookingApi,
  getAdminBookingsApi,
  getBookingByIdApi,
  getMyBookingsApi,
  getRoomAvailabilityApi,
  updateBookingStatusApi,
} from "./bookings.api";

export const bookingKeys = {
  me: (page = 1, limit = 10) => ["bookings", "me", page, limit] as const,
  byId: (bookingId: string) => ["bookings", bookingId] as const,
  availability: (roomId: string, startDate: string, days = 7) =>
    ["bookings", "availability", roomId, startDate, days] as const,
  admin: (page = 1, limit = 10) => ["bookings", "admin", page, limit] as const,
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

export const useAdminBookingsQuery = (page = 1, limit = 10, enabled = true) =>
  useQuery({
    queryKey: bookingKeys.admin(page, limit),
    queryFn: () => getAdminBookingsApi(page, limit),
    enabled,
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

export const useUpdateBookingStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: BookingStatus }) =>
      updateBookingStatusApi(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "admin"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", "me"] });
    },
  });
};
