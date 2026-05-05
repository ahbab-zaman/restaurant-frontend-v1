const trips = [
  { hotel: "Lumos Downtown", room: "205", stay: "May 12 - May 15", status: "Confirmed" },
  { hotel: "Lumos Bay View", room: "117", stay: "May 20 - May 24", status: "Pending" },
];

export default function GuestDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Guest Dashboard</h1>
        <p className="mt-1 text-zinc-600">Quick access to your bookings, loyalty, and stay details.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Upcoming Trips</p><p className="mt-3 text-4xl font-semibold">2</p></div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Reward Points</p><p className="mt-3 text-4xl font-semibold">4,820</p></div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Saved Hotels</p><p className="mt-3 text-4xl font-semibold">7</p></div>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-medium">Upcoming stays</h2>
        <div className="mt-4 space-y-3">
          {trips.map((trip) => (
            <div key={`${trip.hotel}-${trip.room}`} className="rounded-xl border border-zinc-200 px-4 py-3 transition-colors hover:bg-zinc-50">
              <p className="text-lg font-medium">{trip.hotel}</p>
              <p className="text-zinc-600">Room {trip.room} · {trip.stay}</p>
              <span className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${trip.status === "Confirmed" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{trip.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
