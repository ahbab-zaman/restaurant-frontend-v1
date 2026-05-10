export type BookingStatus =
  | "PENDING"
  | "AWAITING_PAYMENT"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

export type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";

export interface BookingPayment {
  id: string;
  bookingId: string;
  stripePaymentId: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  totalPrice: number;
  guestCount: number;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  payment?: BookingPayment | null;
}

export interface CreateBookingPayload {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  notes?: string;
}

export interface RoomAvailabilityItem {
  date: string;
  isAvailable: boolean;
}

export interface RoomAvailabilityResponse {
  roomId: string;
  startDate: string;
  days: number;
  items: RoomAvailabilityItem[];
}

export interface BookingListResponse {
  items: Booking[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
