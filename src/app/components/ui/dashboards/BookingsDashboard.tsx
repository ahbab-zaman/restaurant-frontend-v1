"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import BookingsTable from "@/app/components/ui/tables/BookingsTable";
import BookingsTableSkeleton from "@/app/components/ui/common/BookingsTableSkeleton";
import PremiumPagination from "@/app/components/ui/common/PremiumPagination";
import { apiError } from "@/lib/auth/api-client";
import { useAdminBookingsQuery, useUpdateBookingStatusMutation } from "@/lib/bookings/bookings.query";
import { BookingStatus } from "@/types/booking";

type BookingsDashboardProps = {
  title: string;
  description: string;
  canManage: boolean;
};

export default function BookingsDashboard({ title, description, canManage }: BookingsDashboardProps) {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isFetching, isError } = useAdminBookingsQuery(page, limit, true);
  const statusMutation = useUpdateBookingStatusMutation();

  const onUpdateStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      await statusMutation.mutateAsync({ bookingId, status });
      toast.success("Booking status updated");
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to update booking status";
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-zinc-600">{description}</p>
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
          <BookingsTable
            bookings={data.items}
            canManage={canManage}
            onUpdateStatus={onUpdateStatus}
            isUpdating={statusMutation.isPending}
          />
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

