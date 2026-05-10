"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateBookingMutation } from "@/lib/bookings/bookings.query";

interface BookingCheckoutStarterProps {
  roomId: string;
  roomMeta?: {
    roomNumber?: string;
    roomType?: string;
    pricePerNight?: number;
    capacity?: number;
  };
}

const formatType = (type: string) =>
  type
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function BookingCheckoutStarter({ roomId, roomMeta }: BookingCheckoutStarterProps) {
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
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-[#e7dccd] bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9f8b77]">Stay Details</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#2f261f]">Complete Your Reservation</h2>
          <p className="mt-1 text-sm text-[#6d5b4b]">Choose dates and guests, then continue to secure payment.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#5a4a3b]">Check-in</label>
            <input
              type="date"
              className="w-full rounded-xl border border-[#d8c7af] px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#b89a78] focus:ring-2 focus:ring-[#e8dac5]"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#5a4a3b]">Check-out</label>
            <input
              type="date"
              className="w-full rounded-xl border border-[#d8c7af] px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#b89a78] focus:ring-2 focus:ring-[#e8dac5]"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#5a4a3b]">Guests</label>
          <input
            type="number"
            min={1}
            className="w-full rounded-xl border border-[#d8c7af] px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#b89a78] focus:ring-2 focus:ring-[#e8dac5]"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-[#2f261f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#241c16] disabled:opacity-50"
        >
          {isPending ? "Creating Reservation..." : "Continue to Checkout"}
        </button>
      </form>

      <aside className="rounded-3xl border border-[#eadfce] bg-[#fcf8f2] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9f8b77]">Booking Summary</p>
        <div className="mt-3 space-y-3 text-sm text-[#4f4033]">
          <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
            <span>Room ID</span>
            <span className="max-w-[180px] truncate font-medium text-[#2f261f]">{roomId}</span>
          </div>
          {roomMeta?.roomNumber ? (
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Room</span>
              <span className="font-medium text-[#2f261f]">#{roomMeta.roomNumber}</span>
            </div>
          ) : null}
          {roomMeta?.roomType ? (
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Type</span>
              <span className="font-medium text-[#2f261f]">{formatType(roomMeta.roomType)}</span>
            </div>
          ) : null}
          {roomMeta?.capacity ? (
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>Capacity</span>
              <span className="font-medium text-[#2f261f]">{roomMeta.capacity} guest(s)</span>
            </div>
          ) : null}
          {roomMeta?.pricePerNight ? (
            <div className="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-2">
              <span>From</span>
              <span className="font-medium text-[#2f261f]">${roomMeta.pricePerNight} / night</span>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
