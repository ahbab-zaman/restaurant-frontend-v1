const reservations = [
  { id: "RS-8841", hotel: "Lumos Downtown", stay: "May 12 - May 15", room: "205", status: "Confirmed" },
  { id: "RS-8849", hotel: "Lumos Bay View", stay: "May 20 - May 24", room: "117", status: "Pending" },
  { id: "RS-8863", hotel: "Lumos Hills", stay: "Jun 2 - Jun 5", room: "302", status: "Cancelled" },
];

export default function GuestReservationsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Reservations</h1>
        <p className="mt-1 text-zinc-600">Manage all your active and past reservations.</p>
      </div>
      <div className="space-y-3">
        {reservations.map((reservation) => (
          <article key={reservation.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-zinc-500">{reservation.id}</p>
                <h3 className="text-xl font-medium text-zinc-900">{reservation.hotel}</h3>
                <p className="text-zinc-600">Room {reservation.room} · {reservation.stay}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-sm font-medium ${reservation.status === "Confirmed" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : reservation.status === "Pending" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-red-200 bg-red-50 text-red-700"}`}>{reservation.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
