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
    <main className="mx-auto max-w-xl space-y-4 px-4 py-12">
      <div className="rounded-2xl border border-[#e7dccd] bg-white p-5">
        <h1 className="text-xl font-semibold text-[#2f261f]">
          {isConfirmed ? "Booking Confirmed" : "Payment Processing"}
        </h1>
        <p className="mt-2 text-sm text-[#6d5b4b]">Booking ID: {booking.id}</p>
        <p className="text-sm text-[#6d5b4b]">Status: {booking.status}</p>
      </div>

      <div className="flex gap-3">
        <Link href="/account/bookings" className="rounded-lg bg-[#2f261f] px-4 py-2 text-white">
          View My Bookings
        </Link>
        {!isConfirmed ? (
          <Link href={`/checkout/${booking.id}`} className="rounded-lg border border-[#2f261f] px-4 py-2 text-[#2f261f]">
            Retry Payment
          </Link>
        ) : null}
      </div>
    </main>
  );
}
