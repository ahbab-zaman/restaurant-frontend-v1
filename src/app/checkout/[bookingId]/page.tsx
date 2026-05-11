"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "@/app/components/checkout/StripeCheckoutForm";
import { useCreatePaymentIntentMutation } from "@/lib/payments/payments.query";
import { useBookingByIdQuery } from "@/lib/bookings/bookings.query";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function CheckoutPage() {
  const params = useParams<{ bookingId: string }>();
  const bookingId = params?.bookingId ?? "";

  const { data: booking } = useBookingByIdQuery(bookingId, Boolean(bookingId));
  const {
    mutateAsync: createIntent,
    isPending,
  } = useCreatePaymentIntentMutation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [initError, setInitError] = useState(false);
  const [initMessage, setInitMessage] = useState("Preparing secure payment...");
  const initializedBookingIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;
    if (initializedBookingIdRef.current === bookingId && clientSecret) return;
    setClientSecret(null);
    setInitError(false);
    setInitMessage("Preparing secure payment...");

    let cancelled = false;

    const initPaymentIntent = async () => {
      try {
        const result = await createIntent({ bookingId });
        if (cancelled) return;
        if (!result?.clientSecret) {
          throw new Error("Missing Stripe client secret");
        }
        initializedBookingIdRef.current = bookingId;
        setClientSecret(result.clientSecret);
      } catch (error) {
        if (cancelled) return;
        const message = error instanceof Error ? error.message : "Failed to initialize payment.";
        setInitMessage(message);
        setInitError(true);
      }
    };

    void initPaymentIntent();

    return () => {
      cancelled = true;
    };
  }, [bookingId, createIntent]);

  if (!booking) {
    return <div className="mx-auto max-w-xl px-4 py-12">Loading booking...</div>;
  }

  if (isPending) {
    return <div className="mx-auto max-w-xl px-4 py-12">Preparing secure payment...</div>;
  }

  if (initError) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        {initMessage || "Failed to initialize payment."} If this booking is already paid, check your bookings page.
      </div>
    );
  }

  if (!clientSecret) {
    return <div className="mx-auto max-w-xl px-4 py-12">Preparing secure payment...</div>;
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:py-12">
      <section className="rounded-3xl border border-[#e6dccd] bg-[linear-gradient(130deg,#fff9ef_0%,#f9f2e7_45%,#f5ece1_100%)] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9d8874]">Secure Payment</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#2f261f] sm:text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-[#6d5b4b] sm:text-base">
          Review all booking information before payment.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-3xl border border-[#e7dccd] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2f261f]">Payment Details</h2>
          <p className="mt-1 text-sm text-[#6d5b4b]">All transactions are processed securely via Stripe.</p>
          <div className="mt-5">
            <Elements stripe={stripePromise}>
              <StripeCheckoutForm bookingId={booking.id} clientSecret={clientSecret} />
            </Elements>
          </div>
        </section>

        <aside className="space-y-4 rounded-3xl border border-[#eadfce] bg-[#fcf8f2] p-6">
          <h2 className="text-lg font-semibold text-[#2f261f]">Booking Summary</h2>
          <div className="space-y-3 text-sm text-[#4f4033]">
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Booking ID</span>
              <span className="max-w-[190px] truncate font-medium text-[#2f261f]">{booking.id}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Room ID</span>
              <span className="max-w-[190px] truncate font-medium text-[#2f261f]">{booking.roomId}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Status</span>
              <span className="font-medium text-[#2f261f]">{booking.status}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Check-in</span>
              <span className="font-medium text-[#2f261f]">{formatDate(booking.checkIn)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Check-out</span>
              <span className="font-medium text-[#2f261f]">{formatDate(booking.checkOut)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Guests</span>
              <span className="font-medium text-[#2f261f]">{booking.guestCount}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Payment</span>
              <span className="font-medium text-[#2f261f]">{booking.payment?.status ?? "PENDING"}</span>
            </div>
            {booking.notes ? (
              <div className="border-b border-[#eadfce] pb-2">
                <p className="text-xs uppercase tracking-wide text-[#8d7a66]">Notes</p>
                <p className="mt-1 text-[#2f261f]">{booking.notes}</p>
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-3 pt-1 text-base">
              <span className="font-semibold text-[#2f261f]">Total</span>
              <span className="font-semibold text-[#2f261f]">${booking.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
