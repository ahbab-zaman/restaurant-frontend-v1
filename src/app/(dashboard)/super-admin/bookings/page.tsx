const bookings = [
  { id: "BK-44291", hotel: "Lumos Downtown", room: "205", guest: "James Okafor", stay: "May 12 - May 15", status: "Confirmed" },
  { id: "BK-44317", hotel: "Lumos Bay View", room: "117", guest: "Lena Fischer", stay: "May 20 - May 24", status: "Pending" },
];

export default function SuperAdminBookingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Bookings</h1>
        <p className="mt-1 text-zinc-600">Cross-property booking visibility for operations and planning.</p>
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <article key={booking.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-500">{booking.id}</p>
            <h2 className="text-xl font-medium text-zinc-900">{booking.hotel}</h2>
            <p className="text-zinc-600">
              Room {booking.room} · {booking.stay}
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Guest: {booking.guest} · Status: {booking.status}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
