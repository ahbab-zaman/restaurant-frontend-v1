"use client";

import { useMutation } from "@tanstack/react-query";
import { CreatePaymentIntentPayload } from "@/types/payment";
import { PaymentStatus } from "@/types/booking";
import { createPaymentIntentApi, updatePaymentStatusApi } from "./payments.api";

export const useCreatePaymentIntentMutation = () =>
  useMutation({
    mutationFn: (payload: CreatePaymentIntentPayload) => createPaymentIntentApi(payload),
  });

export const useUpdatePaymentStatusMutation = () =>
  useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: PaymentStatus }) =>
      updatePaymentStatusApi(bookingId, status),
  });
