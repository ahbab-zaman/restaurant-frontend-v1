const rooms = [
  { number: "101", type: "Deluxe", status: "Occupied", cleanliness: "Clean" },
  { number: "102", type: "Deluxe", status: "Available", cleanliness: "Ready" },
  { number: "211", type: "Suite", status: "Maintenance", cleanliness: "In Progress" },
  { number: "304", type: "Standard", status: "Available", cleanliness: "Ready" },
];

export default function HotelManagerRoomsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Rooms</h1>
        <p className="mt-1 text-zinc-600">Availability and housekeeping status at a glance.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rooms.map((room) => (
          <article key={room.number} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm text-zinc-500">Room {room.number}</p>
            <h3 className="mt-2 text-2xl font-semibold">{room.type}</h3>
            <p className="mt-3 text-sm text-zinc-600">{room.cleanliness}</p>
            <span className={`mt-4 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${room.status === "Available" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : room.status === "Occupied" ? "border-blue-200 bg-blue-50 text-blue-700" : "border-red-200 bg-red-50 text-red-700"}`}>{room.status}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
