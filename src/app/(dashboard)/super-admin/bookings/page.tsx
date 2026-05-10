"use client";

import BookingsDashboard from "@/app/components/ui/dashboards/BookingsDashboard";

export default function SuperAdminBookingsPage() {
  return (
    <BookingsDashboard
      key="super-admin-bookings"
      title="Bookings"
      description="Cross-property booking visibility for operations and planning."
      canManage
    />
  );
}
