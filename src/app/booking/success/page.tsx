"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { hotelKeys } from "@/lib/hotels/hotels.query";
import { useBookingByIdQuery } from "@/lib/bookings/bookings.query";

export default function BookingSuccessPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") ?? "";

  const { data: booking, isLoading } = useBookingByIdQuery(bookingId, Boolean(bookingId));

  if (!bookingId) {
    return <div className="mx-auto max-w-xl px-4 py-12">Missing booking id.</div>;
  }

  if (isLoading || !booking) {
    return <div className="mx-auto max-w-xl px-4 py-12">Checking payment status...</div>;
  }

  const isConfirmed = booking.status === "CONFIRMED";

  useEffect(() => {
    if (!isConfirmed) return;
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
    queryClient.invalidateQueries({ queryKey: ["rooms-bulk"] });
    queryClient.invalidateQueries({ queryKey: hotelKeys.list });
  }, [isConfirmed, queryClient]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <section className="rounded-3xl border border-[#e7dccd] bg-linear-to-b from-[#fffdf9] to-[#f9f3ea] p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold ${
              isConfirmed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {isConfirmed ? "✓" : "!"}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#2f261f]">
              {isConfirmed ? "Booking Confirmed" : "Payment Processing"}
            </h1>
            <p className="text-sm text-[#6d5b4b]">
              {isConfirmed
                ? "Your room is reserved and your payment is complete."
                : "We are still verifying your payment. Please check your booking status."}
            </p>
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-[#eadfce] bg-white p-4 text-sm text-[#4f4033] sm:grid-cols-2">
          <p>
            Booking ID
            <span className="block font-medium text-[#2f261f]">{booking.id}</span>
          </p>
          <p>
            Status
            <span className="block font-medium text-[#2f261f]">{booking.status}</span>
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/account/bookings" className="rounded-lg bg-[#2f261f] px-4 py-2 text-white">
            View My Bookings
          </Link>
         
        </div>
      </section>
    </main>
  );
}
