"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import BookingsTable from "@/app/components/ui/tables/BookingsTable";
import BookingsTableSkeleton from "@/app/components/ui/common/BookingsTableSkeleton";
import PremiumPagination from "@/app/components/ui/common/PremiumPagination";
import { apiError } from "@/lib/auth/api-client";
import { useAdminBookingsQuery, useUpdateBookingStatusMutation } from "@/lib/bookings/bookings.query";
import { useUpdatePaymentStatusMutation } from "@/lib/payments/payments.query";
import { BookingStatus, PaymentStatus } from "@/types/booking";
import { Input } from "@/components/ui/input";

type BookingsDashboardProps = {
  title: string;
  description: string;
  canManage: boolean;
};

export default function BookingsDashboard({ title, description, canManage }: BookingsDashboardProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "guest" | "hotel" | "totalPrice" | "status">("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const limit = 10;
  const { data, isLoading, isFetching, isError } = useAdminBookingsQuery(page, limit, true);
  const statusMutation = useUpdateBookingStatusMutation();
  const paymentStatusMutation = useUpdatePaymentStatusMutation();

  const onUpdateStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      await statusMutation.mutateAsync({ bookingId, status });
      toast.success("Booking status updated");
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to update booking status";
      toast.error(message);
    }
  };

  const onUpdatePaymentStatus = async (bookingId: string, status: PaymentStatus) => {
    try {
      await paymentStatusMutation.mutateAsync({ bookingId, status });
      toast.success("Payment status updated");
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to update payment status";
      toast.error(message);
    }
  };

  const filteredAndSortedBookings = useMemo(() => {
    const bookings = data?.items ?? [];
    const query = searchTerm.trim().toLowerCase();
    const filtered = query
      ? bookings.filter((booking) => {
          const searchableText = [
            booking.id,
            booking.user?.name ?? "",
            booking.user?.email ?? "",
            booking.room?.hotel?.name ?? "",
            booking.room?.roomNumber ?? "",
            booking.status,
          ]
            .join(" ")
            .toLowerCase();
          return searchableText.includes(query);
        })
      : bookings;

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "guest") {
        comparison = (a.user?.name ?? "").localeCompare(b.user?.name ?? "");
      } else if (sortBy === "hotel") {
        comparison = (a.room?.hotel?.name ?? "").localeCompare(b.room?.hotel?.name ?? "");
      } else if (sortBy === "totalPrice") {
        comparison = a.totalPrice - b.totalPrice;
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status);
      } else {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data?.items, searchTerm, sortBy, sortDirection]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-zinc-600">{description}</p>
      </div>

      <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by booking, guest, hotel, room, status..."
          className="sm:col-span-2"
        />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as "createdAt" | "guest" | "hotel" | "totalPrice" | "status")}
          className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
        >
          <option value="createdAt">Sort: Created Date</option>
          <option value="guest">Sort: Guest Name</option>
          <option value="hotel">Sort: Hotel Name</option>
          <option value="totalPrice">Sort: Total Price</option>
          <option value="status">Sort: Status</option>
        </select>
        <select
          value={sortDirection}
          onChange={(event) => setSortDirection(event.target.value as "asc" | "desc")}
          className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
        >
          <option value="desc">Order: Descending</option>
          <option value="asc">Order: Ascending</option>
        </select>
      </div>

      {isLoading ? (
        <BookingsTableSkeleton rows={8} />
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          Failed to load bookings.
        </div>
      ) : data?.items.length ? (
        <div className="space-y-3">
          {isFetching ? (
            <p className="text-sm text-zinc-500">Refreshing bookings...</p>
          ) : null}
          {filteredAndSortedBookings.length ? (
            <BookingsTable
              bookings={filteredAndSortedBookings}
              canManage={canManage}
              onUpdateStatus={onUpdateStatus}
              onUpdatePaymentStatus={onUpdatePaymentStatus}
              isUpdating={statusMutation.isPending || paymentStatusMutation.isPending}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-600">
              No bookings match your search.
            </div>
          )}
          <div className="flex justify-end">
            <PremiumPagination
              page={page}
              totalPages={data.meta.totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-600">
          No bookings found.
        </div>
      )}
    </div>
  );
}
