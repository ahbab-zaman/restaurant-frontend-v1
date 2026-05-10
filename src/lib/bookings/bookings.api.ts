import { API_V1_PREFIX, apiFetch } from "@/lib/auth/api-client";
import { Booking, BookingListResponse, CreateBookingPayload, RoomAvailabilityResponse } from "@/types/booking";

export const createBookingApi = (payload: CreateBookingPayload) =>
  apiFetch<Booking>(`${API_V1_PREFIX}/bookings`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getMyBookingsApi = (page = 1, limit = 10) =>
  apiFetch<BookingListResponse>(`${API_V1_PREFIX}/bookings/me?page=${page}&limit=${limit}`);

export const getAdminBookingsApi = (page = 1, limit = 10) =>
  apiFetch<BookingListResponse>(`${API_V1_PREFIX}/bookings?page=${page}&limit=${limit}`);

export const getBookingByIdApi = (bookingId: string) =>
  apiFetch<Booking>(`${API_V1_PREFIX}/bookings/${bookingId}`);

export const getRoomAvailabilityApi = (roomId: string, startDate: string, days = 7) => {
  const params = new URLSearchParams({
    roomId,
    startDate,
    days: String(days),
  });
  return apiFetch<RoomAvailabilityResponse>(`${API_V1_PREFIX}/bookings/availability?${params.toString()}`);
};

export const updateBookingStatusApi = (bookingId: string, status: Booking["status"]) =>
  apiFetch<Booking>(`${API_V1_PREFIX}/bookings/${bookingId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
