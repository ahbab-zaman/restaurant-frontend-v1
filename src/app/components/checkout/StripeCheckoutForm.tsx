"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

interface StripeCheckoutFormProps {
  bookingId: string;
  clientSecret: string;
}

export default function StripeCheckoutForm({ bookingId, clientSecret }: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message ?? "Payment failed");
      setIsSubmitting(false);
      return;
    }

    router.push(`/booking/success?bookingId=${bookingId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl border border-[#d8c7af] p-4">
        <CardElement />
      </div>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        className="w-full rounded-lg bg-[#2f261f] px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
