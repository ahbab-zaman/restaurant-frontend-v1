"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import BookingDetailsModal from "@/app/components/ui/modals/BookingDetailsModal";
import { useMyBookingsQuery } from "@/lib/bookings/bookings.query";
import { Booking } from "@/types/booking";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const BookingPage = () => {
  const { data, isLoading, isError } = useMyBookingsQuery();
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const hasBookings = (data?.items?.length ?? 0) > 0;

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (isError || !data) {
    return <div>Failed to load bookings.</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      {hasBookings ? (
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-zinc-50">
              <TableRow>
                <TableHead>Booking</TableHead>
                <TableHead>Stay</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium text-zinc-900">{booking.id}</TableCell>
                  <TableCell className="text-zinc-700">
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-900">${booking.totalPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-zinc-700">{booking.status}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => setViewingBooking(booking)}
                      aria-label={`View booking ${booking.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center">
          <p className="text-lg font-medium text-zinc-900">No bookings yet</p>
          <p className="mt-2 text-sm text-zinc-600">You have not made any bookings yet. Once you book a stay, it will appear here.</p>
        </div>
      )}

      <BookingDetailsModal
        open={Boolean(viewingBooking)}
        booking={viewingBooking}
        onClose={() => setViewingBooking(null)}
      />
    </div>
  );
};

export default BookingPage;
