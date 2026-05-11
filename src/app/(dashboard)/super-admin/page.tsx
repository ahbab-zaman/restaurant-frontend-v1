"use client";

import { useDashboardOverviewQuery } from "@/lib/dashboard/dashboard.query";
import DashboardBarGraph from "@/app/components/ui/common/DashboardBarGraph";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function SuperAdminDashboardPage() {
  const { data, isLoading, isError } = useDashboardOverviewQuery(true);

  if (isLoading) {
    return <div className="mx-auto max-w-7xl rounded-2xl border border-zinc-200 bg-white p-6">Loading dashboard...</div>;
  }

  if (isError || !data) {
    return <div className="mx-auto max-w-7xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">Failed to load dashboard data.</div>;
  }

  const metrics = [
    { title: "Total Guests", value: data.totals.totalGuests.toLocaleString() },
    { title: "Total Revenue", value: currency.format(data.totals.totalRevenue) },
    { title: "Total Bookings", value: data.totals.totalBookings.toLocaleString() },
    { title: "Occupancy Rate", value: `${data.totals.occupancyRate}%` },
    { title: "Total Hotels", value: data.totals.totalHotels.toLocaleString() },
    { title: "Total Rooms", value: data.totals.totalRooms.toLocaleString() },
    { title: "Today Check-ins", value: data.totals.todayCheckIns.toLocaleString() },
    { title: "Today Check-outs", value: data.totals.todayCheckOuts.toLocaleString() },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Super Admin Dashboard</h1>
        <p className="mt-1 text-zinc-600">Live performance across all properties.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.title} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">{metric.title}</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900">{metric.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-5">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-3">
          <div className="mb-3">
            <h2 className="text-xl font-semibold text-zinc-900">Revenue and Guests (Last 6 Months)</h2>
            <p className="text-sm text-zinc-500">
              Revenue growth this month: {data.trends.revenueGrowthPercentage > 0 ? "+" : ""}
              {data.trends.revenueGrowthPercentage}%
            </p>
          </div>
          <DashboardBarGraph data={data.monthlyStats} />
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-2">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">Recent bookings</h2>
          <div className="space-y-3">
            {data.recentBookings.length ? data.recentBookings.map((booking) => (
              <div key={booking.id} className="rounded-xl border border-zinc-200 px-4 py-3">
                <p className="text-sm font-semibold text-zinc-900">{booking.guestName}</p>
                <p className="text-xs text-zinc-500">{booking.hotelName} | Room {booking.roomNumber}</p>
                <p className="mt-1 text-xs text-zinc-600">
                  {booking.status} | {currency.format(booking.totalPrice)} | {booking.guestCount} guest{booking.guestCount > 1 ? "s" : ""}
                </p>
              </div>
            )) : <p className="text-sm text-zinc-500">No bookings found.</p>}
          </div>
        </article>
      </section>
    </div>
  );
}

