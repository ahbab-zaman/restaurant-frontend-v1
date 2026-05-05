const rooms = [
  { hotel: "Lumos Downtown", room: "205", type: "Deluxe Queen", status: "Occupied" },
  { hotel: "Lumos Downtown", room: "214", type: "Executive King", status: "Maintenance" },
  { hotel: "Lumos Bay View", room: "117", type: "Standard Twin", status: "Available" },
];

export default function SuperAdminRoomsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Rooms</h1>
        <p className="mt-1 text-zinc-600">Track room status across all managed properties.</p>
      </div>

      <div className="space-y-3">
        {rooms.map((room) => (
          <article key={`${room.hotel}-${room.room}`} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-medium text-zinc-900">{room.hotel}</h2>
            <p className="text-zinc-600">
              Room {room.room} · {room.type}
            </p>
            <p className="mt-2 text-sm text-zinc-500">Status: {room.status}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
