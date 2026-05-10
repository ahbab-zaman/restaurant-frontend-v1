export interface CreatePaymentIntentPayload {
  bookingId: string;
}

export interface CreatePaymentIntentResponse {
  payment: {
    id: string;
    bookingId: string;
    stripePaymentId: string;
    amount: number;
    status: "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";
    createdAt: string;
    updatedAt: string;
  };
  clientSecret: string;
}
