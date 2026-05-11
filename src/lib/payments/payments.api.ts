import { API_V1_PREFIX, apiFetch } from "@/lib/auth/api-client";
import { CreatePaymentIntentPayload, CreatePaymentIntentResponse } from "@/types/payment";
import { PaymentStatus } from "@/types/booking";

export const createPaymentIntentApi = (payload: CreatePaymentIntentPayload) =>
  apiFetch<CreatePaymentIntentResponse>(`${API_V1_PREFIX}/payments/intent`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updatePaymentStatusApi = (bookingId: string, status: PaymentStatus) =>
  apiFetch(`${API_V1_PREFIX}/payments/${bookingId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
