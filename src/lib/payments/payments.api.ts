import { API_V1_PREFIX, apiFetch } from "@/lib/auth/api-client";
import { CreatePaymentIntentPayload, CreatePaymentIntentResponse } from "@/types/payment";

export const createPaymentIntentApi = (payload: CreatePaymentIntentPayload) =>
  apiFetch<CreatePaymentIntentResponse>(`${API_V1_PREFIX}/payments/intent`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
