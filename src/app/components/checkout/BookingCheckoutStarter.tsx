"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateBookingMutation, useRoomAvailabilityQuery } from "@/lib/bookings/bookings.query";

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

const toIsoDate = (value: Date) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().slice(0, 10);
};

const addDays = (isoDate: string, days: number) => {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};

const formatChipDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00.000Z`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export default function BookingCheckoutStarter({ roomId, roomMeta }: BookingCheckoutStarterProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateBookingMutation();
  const [windowStart, setWindowStart] = useState(toIsoDate(new Date()));
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [hasDateAvailabilityError, setHasDateAvailabilityError] = useState(false);
  const { data: availabilityData, isLoading: availabilityLoading } = useRoomAvailabilityQuery(
    roomId,
    windowStart,
    7,
    Boolean(roomId),
  );

  const availableDates = (availabilityData?.items ?? []).map((item) => item.date.slice(0, 10));
  const availableDateSet = new Set(availableDates);

  const isCheckoutRangeAvailable = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return false;
    if (endDate <= startDate) return false;

    const cursor = new Date(`${startDate}T00:00:00.000Z`);
    const finalDate = new Date(`${endDate}T00:00:00.000Z`);
    cursor.setUTCDate(cursor.getUTCDate() + 1);

    while (cursor <= finalDate) {
      const iso = cursor.toISOString().slice(0, 10);
      if (!availableDateSet.has(iso)) return false;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return true;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (availabilityLoading || !availabilityData) {
      toast.error("Availability is still loading. Please wait before continuing.");
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error("Please select both check-in and check-out dates.");
      return;
    }

    if (checkOut <= checkIn) {
      toast.error("Check-out must be after check-in.");
      return;
    }

    if (!isCheckoutRangeAvailable(checkIn, checkOut)) {
      setHasDateAvailabilityError(true);
      toast.error("Some selected stay dates are unavailable. Please choose a different check-out date.");
      return;
    }

    if (hasDateAvailabilityError) {
      toast.error("Please fix unavailable date selection before continuing.");
      return;
    }

    try {
      const booking = await mutateAsync({
        roomId,
        checkIn: new Date(`${checkIn}T00:00:00.000Z`).toISOString(),
        checkOut: new Date(`${checkOut}T00:00:00.000Z`).toISOString(),
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

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="block text-sm font-medium text-[#5a4a3b]">Available dates (7-day window)</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const previousWindow = addDays(windowStart, -7);
                  setWindowStart(previousWindow);
                  setCheckIn("");
                  setCheckOut("");
                  setHasDateAvailabilityError(false);
                }}
                className="rounded-lg border border-[#d8c7af] px-3 py-1.5 text-xs font-medium text-[#4f4033] transition hover:bg-[#f8f2e8]"
              >
                Previous 7 days
              </button>
              <button
                type="button"
                onClick={() => {
                  const nextWindow = addDays(windowStart, 7);
                  setWindowStart(nextWindow);
                  setCheckIn("");
                  setCheckOut("");
                  setHasDateAvailabilityError(false);
                }}
                className="rounded-lg border border-[#d8c7af] px-3 py-1.5 text-xs font-medium text-[#4f4033] transition hover:bg-[#f8f2e8]"
              >
                Next 7 days
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-[#e7dccd] bg-[#fdf9f4] p-3">
            {availabilityLoading ? (
              <p className="text-sm text-[#6d5b4b]">Loading available dates...</p>
            ) : availableDates.length ? (
              <div className="flex flex-wrap gap-2">
                {availableDates.map((date) => {
                  const selected = checkIn === date;
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => {
                        setCheckIn(date);
                        setHasDateAvailabilityError(false);
                        if (checkOut && checkOut <= date) {
                          setCheckOut("");
                          setHasDateAvailabilityError(false);
                          toast("Please choose a new check-out date after check-in.");
                        }
                      }}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        selected
                          ? "border-[#2f261f] bg-[#2f261f] text-white"
                          : "border-[#d8c7af] bg-white text-[#4f4033] hover:bg-[#f5ecdf]"
                      }`}
                    >
                      {formatChipDate(date)}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-[#6d5b4b]">No available dates in this 7-day range. Try next or previous 7 days.</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#5a4a3b]">Check-in</label>
            <input
              type="date"
              className="w-full rounded-xl border border-[#d8c7af] px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#b89a78] focus:ring-2 focus:ring-[#e8dac5]"
              value={checkIn}
              readOnly
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#5a4a3b]">Check-out</label>
            <input
              type="date"
              className="w-full rounded-xl border border-[#d8c7af] px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#b89a78] focus:ring-2 focus:ring-[#e8dac5]"
              value={checkOut}
              min={checkIn ? addDays(checkIn, 1) : undefined}
              onChange={(e) => {
                const nextCheckOut = e.target.value;
                setCheckOut(nextCheckOut);
                if (!nextCheckOut || !checkIn) return;
                if (!isCheckoutRangeAvailable(checkIn, nextCheckOut)) {
                  setHasDateAvailabilityError(true);
                  setCheckOut("");
                  toast.error("Selected check-out includes unavailable date(s). Please choose another date.");
                  return;
                }
                setHasDateAvailabilityError(false);
              }}
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
          disabled={isPending || availabilityLoading || hasDateAvailabilityError || !checkIn || !checkOut}
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
