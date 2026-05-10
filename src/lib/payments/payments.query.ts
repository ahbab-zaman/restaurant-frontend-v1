"use client";

import { useMutation } from "@tanstack/react-query";
import { CreatePaymentIntentPayload } from "@/types/payment";
import { createPaymentIntentApi } from "./payments.api";

export const useCreatePaymentIntentMutation = () =>
  useMutation({
    mutationFn: (payload: CreatePaymentIntentPayload) => createPaymentIntentApi(payload),
  });
