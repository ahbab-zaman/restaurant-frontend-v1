"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateBookingMutation } from "@/lib/bookings/bookings.query";

interface BookingCheckoutStarterProps {
  roomId: string;
}

export default function BookingCheckoutStarter({ roomId }: BookingCheckoutStarterProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateBookingMutation();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const booking = await mutateAsync({
        roomId,
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString(),
        guestCount,
      });

      router.push(`/checkout/${booking.id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create booking";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-[#e7dccd] bg-white p-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-[#5a4a3b]">Check-in</label>
        <input
          type="date"
          className="w-full rounded-lg border border-[#d8c7af] px-3 py-2 text-slate-900"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#5a4a3b]">Check-out</label>
        <input
          type="date"
          className="w-full rounded-lg border border-[#d8c7af] px-3 py-2 text-slate-900"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#5a4a3b]">Guests</label>
        <input
          type="number"
          min={1}
          className="w-full rounded-lg border border-[#d8c7af] px-3 py-2 text-slate-900"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-[#2f261f] px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Reserve and Continue to Payment"}
      </button>
    </form>
  );
}
