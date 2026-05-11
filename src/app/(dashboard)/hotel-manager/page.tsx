"use client";

import DashboardBarGraph from "@/app/components/ui/common/DashboardBarGraph";
import { useDashboardOverviewQuery } from "@/lib/dashboard/dashboard.query";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function HotelManagerDashboardPage() {
  const { data, isLoading, isError } = useDashboardOverviewQuery(true);

  if (isLoading) {
    return <div className="mx-auto max-w-7xl rounded-2xl border border-zinc-200 bg-white p-6">Loading dashboard...</div>;
  }

  if (isError || !data) {
    return <div className="mx-auto max-w-7xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">Failed to load dashboard data.</div>;
  }

  const stats = [
    { label: "Total Guests", value: data.totals.totalGuests.toLocaleString() },
    { label: "Total Revenue", value: currency.format(data.totals.totalRevenue) },
    { label: "Total Bookings", value: data.totals.totalBookings.toLocaleString() },
    { label: "Managed Hotels", value: data.totals.totalHotels.toLocaleString() },
    { label: "Managed Rooms", value: data.totals.totalRooms.toLocaleString() },
    { label: "Active Bookings", value: data.totals.activeBookings.toLocaleString() },
    { label: "Today Check-ins", value: data.totals.todayCheckIns.toLocaleString() },
    { label: "Today Check-outs", value: data.totals.todayCheckOuts.toLocaleString() },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Hotel Manager Dashboard</h1>
        <p className="mt-1 text-zinc-600">Live operations and revenue for your assigned properties.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Monthly Revenue vs Guests</h2>
        <p className="mb-3 text-sm text-zinc-500">Last 6 months performance from confirmed/completed bookings and successful payments.</p>
        <DashboardBarGraph data={data.monthlyStats} />
      </div>
    </div>
  );
}
