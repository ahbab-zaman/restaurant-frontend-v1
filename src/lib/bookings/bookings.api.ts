import { API_V1_PREFIX, apiFetch } from "@/lib/auth/api-client";
import { Booking, BookingListResponse, CreateBookingPayload } from "@/types/booking";

export const createBookingApi = (payload: CreateBookingPayload) =>
  apiFetch<Booking>(`${API_V1_PREFIX}/bookings`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getMyBookingsApi = (page = 1, limit = 10) =>
  apiFetch<BookingListResponse>(`${API_V1_PREFIX}/bookings/me?page=${page}&limit=${limit}`);

export const getBookingByIdApi = (bookingId: string) =>
  apiFetch<Booking>(`${API_V1_PREFIX}/bookings/${bookingId}`);
