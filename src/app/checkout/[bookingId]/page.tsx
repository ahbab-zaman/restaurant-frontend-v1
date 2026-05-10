"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "@/app/components/checkout/StripeCheckoutForm";
import { useCreatePaymentIntentMutation } from "@/lib/payments/payments.query";
import { useBookingByIdQuery } from "@/lib/bookings/bookings.query";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export default function CheckoutPage() {
  const params = useParams<{ bookingId: string }>();
  const bookingId = params?.bookingId ?? "";

  const { data: booking } = useBookingByIdQuery(bookingId, Boolean(bookingId));
  const {
    mutate: createIntent,
    data: paymentIntentData,
    isPending,
    isError,
  } = useCreatePaymentIntentMutation();

  useEffect(() => {
    if (!bookingId) return;
    if (paymentIntentData?.clientSecret) return;
    createIntent({ bookingId });
  }, [bookingId, paymentIntentData?.clientSecret, createIntent]);

  if (!booking) {
    return <div className="mx-auto max-w-xl px-4 py-12">Loading booking...</div>;
  }

  if (isPending) {
    return <div className="mx-auto max-w-xl px-4 py-12">Preparing secure payment...</div>;
  }

  if (isError || !paymentIntentData?.clientSecret) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        Failed to initialize payment. If this booking is already paid, check your bookings page.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-12">
      <section className="rounded-2xl border border-[#e7dccd] bg-white p-5">
        <h1 className="text-xl font-semibold text-[#2f261f]">Checkout</h1>
        <p className="mt-2 text-sm text-[#6d5b4b]">Booking ID: {booking.id}</p>
        <p className="text-sm text-[#6d5b4b]">Total: ${booking.totalPrice.toFixed(2)}</p>
      </section>

      <section className="rounded-2xl border border-[#e7dccd] bg-white p-5">
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm bookingId={booking.id} clientSecret={paymentIntentData.clientSecret} />
        </Elements>
      </section>
    </main>
  );
}
