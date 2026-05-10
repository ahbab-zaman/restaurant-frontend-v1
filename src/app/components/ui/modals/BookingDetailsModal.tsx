"use client";

import AppModal from "@/app/components/ui/common/AppModal";
import { Booking } from "@/types/booking";

type BookingDetailsModalProps = {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
};

const formatDateTime = (value?: string | null) =>
  value ? new Date(value).toLocaleString() : "-";

const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

export default function BookingDetailsModal({
  open,
  booking,
  onClose,
}: BookingDetailsModalProps) {
  return (
    <AppModal
      open={open}
      title={booking ? `Booking ${booking.id}` : "Booking Details"}
      onClose={onClose}
      contentClassName="space-y-4"
    >
      {booking ? (
        <>
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Detail label="Status" value={booking.status} />
            <Detail label="Total" value={`$${booking.totalPrice.toFixed(2)}`} />
            <Detail label="Check In" value={formatDate(booking.checkIn)} />
            <Detail label="Check Out" value={formatDate(booking.checkOut)} />
            <Detail label="Guests" value={String(booking.guestCount)} />
            <Detail label="Created" value={formatDateTime(booking.createdAt)} />
          </section>

          <section className="rounded-xl border border-zinc-200 p-3">
            <h3 className="text-sm font-semibold text-zinc-900">Guest</h3>
            <p className="mt-1 text-sm text-zinc-700">{booking.user?.name ?? "N/A"}</p>
            <p className="text-sm text-zinc-500">{booking.user?.email ?? "No email"}</p>
          </section>

          <section className="rounded-xl border border-zinc-200 p-3">
            <h3 className="text-sm font-semibold text-zinc-900">Room</h3>
            <p className="mt-1 text-sm text-zinc-700">
              {booking.room?.hotel?.name ?? "Unknown Hotel"} / Room {booking.room?.roomNumber ?? "-"}
            </p>
            <p className="text-sm text-zinc-500">{booking.room?.hotel?.address ?? "No address"}</p>
          </section>

          <section className="rounded-xl border border-zinc-200 p-3">
            <h3 className="text-sm font-semibold text-zinc-900">Payment</h3>
            <div className="mt-1 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <Detail label="Status" value={booking.payment?.status ?? "PENDING"} />
              <Detail label="Amount" value={booking.payment ? `$${booking.payment.amount.toFixed(2)}` : "-"} />
              <Detail label="Payment ID" value={booking.payment?.stripePaymentId ?? "-"} />
              <Detail label="Updated" value={formatDateTime(booking.payment?.updatedAt)} />
            </div>
          </section>

          {booking.notes ? (
            <section className="rounded-xl border border-zinc-200 p-3">
              <h3 className="text-sm font-semibold text-zinc-900">Notes</h3>
              <p className="mt-1 text-sm text-zinc-700">{booking.notes}</p>
            </section>
          ) : null}
        </>
      ) : null}
    </AppModal>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="text-sm text-zinc-900">{value}</p>
    </div>
  );
}
