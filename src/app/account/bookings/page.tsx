"use client";

import { useMyBookingsQuery } from "@/lib/bookings/bookings.query";

const BookingPage = () => {
  const { data, isLoading, isError } = useMyBookingsQuery();

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (isError || !data) {
    return <div>Failed to load bookings.</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Your Bookings</h1>
      <div className="space-y-3">
        {data.items.map((booking) => (
          <div key={booking.id} className="rounded-xl border border-[#e7dccd] bg-white p-4">
            <p className="text-sm text-[#6d5b4b]">Booking: {booking.id}</p>
            <p className="text-sm text-[#6d5b4b]">Status: {booking.status}</p>
            <p className="text-sm text-[#6d5b4b]">Total: ${booking.totalPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
