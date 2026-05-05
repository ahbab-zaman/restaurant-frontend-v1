const metrics = [
  { title: "Total Bookings", value: "1,284", trend: "+8.2% this month" },
  { title: "Occupancy Rate", value: "76%", trend: "+3.1% vs last week" },
  { title: "Revenue", value: "$48.2k", trend: "+12% this month" },
  { title: "Pending Checkouts", value: "7", trend: "2 overdue", danger: true },
];

const recentBookings = [
  { room: "201", name: "James Okafor", date: "May 6 - May 9", status: "Confirmed" },
  { room: "105", name: "Lena Fischer", date: "May 7 - May 10", status: "Pending" },
  { room: "312", name: "Tariq Hassan", date: "May 5 - May 7", status: "Cancelled" },
];

export default function SuperAdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Good morning, Sara</h1>
        <p className="mt-1 text-lg text-zinc-600">Here&apos;s what&apos;s happening across your properties today.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.title} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm text-zinc-500">{metric.title}</p>
            <p className="mt-5 text-5xl font-semibold tracking-tight text-zinc-900">{metric.value}</p>
            <p className={`mt-3 text-base ${metric.danger ? "text-red-500" : "text-emerald-600"}`}>{metric.trend}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-5">
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-medium text-zinc-900">Weekly occupancy</h2>
            <button className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">View report</button>
          </div>
          <div className="flex h-56 items-end gap-3">
            {[42, 56, 48, 66, 60, 72, 38].map((h, index) => (
              <div key={index} className="flex-1">
                <div className={`w-full rounded-t-md border border-zinc-200 ${index === 3 ? "bg-zinc-900" : "bg-zinc-100"}`} style={{ height: `${h * 2}px` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 text-center text-sm text-zinc-500">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-medium text-zinc-900">Recent bookings</h2>
            <button className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">See all</button>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.room} className="flex items-center gap-4 rounded-xl border border-zinc-200 px-4 py-3 transition-colors hover:bg-zinc-50">
                <span className="rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2 text-xl font-medium text-zinc-700">{booking.room}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-2xl font-medium text-zinc-900">{booking.name}</p>
                  <p className="text-lg text-zinc-500">{booking.date}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-sm font-medium ${booking.status === "Confirmed" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : booking.status === "Pending" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-red-200 bg-red-50 text-red-700"}`}>{booking.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
