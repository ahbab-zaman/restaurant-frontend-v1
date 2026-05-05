const bookings = [
  { id: "BK-1029", guest: "Aria Khan", room: "204", date: "May 8 - May 10", status: "Confirmed" },
  { id: "BK-1031", guest: "David Wu", room: "311", date: "May 8 - May 9", status: "Pending" },
  { id: "BK-1034", guest: "Nabila Ahmed", room: "118", date: "May 9 - May 12", status: "Confirmed" },
];

export default function HotelManagerBookingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Bookings</h1>
        <p className="mt-1 text-zinc-600">Live booking pipeline for your property.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Total Today</p><p className="mt-3 text-4xl font-semibold">34</p></div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Confirmed</p><p className="mt-3 text-4xl font-semibold text-emerald-600">26</p></div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Pending</p><p className="mt-3 text-4xl font-semibold text-amber-600">8</p></div>
      </div>
      <div className="space-y-3">
        {bookings.map((booking) => (
          <article key={booking.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors hover:bg-zinc-50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-zinc-500">{booking.id}</p>
                <h3 className="text-xl font-medium text-zinc-900">{booking.guest}</h3>
                <p className="text-zinc-600">Room {booking.room} - {booking.date}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-sm font-medium ${booking.status === "Confirmed" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{booking.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
