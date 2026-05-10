"use client";

import BookingsDashboard from "@/app/components/ui/dashboards/BookingsDashboard";

export default function HotelManagerBookingsPage() {
  return (
    <BookingsDashboard
      key="hotel-manager-bookings"
      title="Bookings"
      description="Live booking pipeline for your property."
      canManage={false}
    />
  );
}
