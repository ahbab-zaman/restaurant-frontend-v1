"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboardOverviewQuery } from "@/lib/dashboard/dashboard.query";
import DashboardBarGraph from "@/app/components/ui/common/DashboardBarGraph";
import { Button } from "@/components/ui/button";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function SuperAdminDashboardPage() {
  const [months, setMonths] = useState(6);
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isError } = useDashboardOverviewQuery(true, { months, offset });

  const periodLabel = useMemo(() => {
    if (!data?.period?.chartFrom || !data?.period?.chartTo) return "";

    const from = new Date(data.period.chartFrom);
    const to = new Date(data.period.chartTo);
    const lastIncludedMonth = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth() - 1, 1));

    return `${from.toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })} - ${lastIncludedMonth.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })}`;
  }, [data?.period?.chartFrom, data?.period?.chartTo]);

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
        <article className="rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50 p-6 shadow-[0_18px_45px_rgba(24,24,27,0.08)] xl:col-span-3">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">Revenue and Guests</h2>
              <p className="text-xs font-medium tracking-wide text-zinc-500">{periodLabel}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => setOffset((prev) => prev + 1)}
                aria-label="Previous range"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => setOffset((prev) => Math.max(prev - 1, 0))}
                disabled={offset === 0}
                aria-label="Next range"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <select
                value={months}
                onChange={(event) => {
                  setMonths(Number(event.target.value));
                  setOffset(0);
                }}
                className="h-8 rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-700 outline-none transition focus:border-zinc-400"
                aria-label="Filter by range"
              >
                <option value={3}>Last 3 months</option>
                <option value={6}>Last 6 months</option>
                <option value={12}>Last 12 months</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Revenue growth vs previous month: {data.trends.revenueGrowthPercentage > 0 ? "+" : ""}
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

