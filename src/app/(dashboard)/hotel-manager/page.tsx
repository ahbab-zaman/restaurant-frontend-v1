export default function HotelManagerDashboardPage() {
  const stats = [
    { label: "Today Check-ins", value: 18 },
    { label: "Today Check-outs", value: 11 },
    { label: "Open Service Tickets", value: 6 },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Hotel Manager Dashboard</h1>
        <p className="mt-1 text-zinc-600">Oversee operations and room flow in real time.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-4 text-5xl font-semibold tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-medium">Shift notes</h2>
        <ul className="mt-4 space-y-3 text-zinc-700">
          <li className="rounded-xl bg-zinc-50 px-4 py-3">Front desk queue stable, average wait time 4 minutes.</li>
          <li className="rounded-xl bg-zinc-50 px-4 py-3">Maintenance requested for Room 214 air conditioning.</li>
          <li className="rounded-xl bg-zinc-50 px-4 py-3">Group check-in expected at 5:30 PM from SkyTours.</li>
        </ul>
      </div>
    </div>
  );
}
