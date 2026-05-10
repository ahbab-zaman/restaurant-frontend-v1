"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Clock3, XCircle } from "lucide-react";
import { Booking, BookingStatus } from "@/types/booking";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type BookingsTableProps = {
  bookings: Booking[];
  canManage: boolean;
  onUpdateStatus: (bookingId: string, status: BookingStatus) => void;
  isUpdating: boolean;
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  AWAITING_PAYMENT: "border-indigo-200 bg-indigo-50 text-indigo-700",
  CONFIRMED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  COMPLETED: "border-teal-200 bg-teal-50 text-teal-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
  REJECTED: "border-rose-200 bg-rose-50 text-rose-700",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function BookingsTable({
  bookings,
  canManage,
  onUpdateStatus,
  isUpdating,
}: BookingsTableProps) {
  return (
    <motion.div
      className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Booking</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Hotel / Room</TableHead>
            <TableHead>Stay</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="transition-colors hover:bg-zinc-50">
              <TableCell>
                <p className="font-medium text-zinc-900">{booking.id}</p>
                <p className="text-xs text-zinc-500">{new Date(booking.createdAt).toLocaleString()}</p>
              </TableCell>
              <TableCell>
                <p className="font-medium text-zinc-900">{booking.user?.name ?? "N/A"}</p>
                <p className="text-xs text-zinc-500">{booking.user?.email ?? "No email"}</p>
              </TableCell>
              <TableCell>
                <p className="font-medium text-zinc-900">{booking.room?.hotel?.name ?? "Unknown Hotel"}</p>
                <p className="text-xs text-zinc-500">Room {booking.room?.roomNumber ?? "-"}</p>
              </TableCell>
              <TableCell className="text-zinc-700">
                {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
              </TableCell>
              <TableCell className="font-medium text-zinc-900">${booking.totalPrice.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[booking.status]}`}>
                  {booking.status}
                </span>
              </TableCell>
              <TableCell>
                {canManage ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isUpdating || booking.status === "CONFIRMED"}
                      onClick={() => onUpdateStatus(booking.id, "CONFIRMED")}
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Confirm
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isUpdating || booking.status === "COMPLETED"}
                      onClick={() => onUpdateStatus(booking.id, "COMPLETED")}
                    >
                      <CircleDashed className="mr-1 h-4 w-4" />
                      Complete
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      disabled={isUpdating || booking.status === "CANCELLED"}
                      onClick={() => onUpdateStatus(booking.id, "CANCELLED")}
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                      <Clock3 className="h-3.5 w-3.5" />
                      View only
                    </span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}

