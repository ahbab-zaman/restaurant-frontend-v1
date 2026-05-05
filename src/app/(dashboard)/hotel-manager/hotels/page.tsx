const hotels = [
  { name: "Lumos Downtown", city: "Dhaka", rooms: 128, occupancy: "78%" },
  { name: "Lumos Bay View", city: "Chattogram", rooms: 96, occupancy: "71%" },
];

export default function HotelManagerHotelsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Hotels</h1>
        <p className="mt-1 text-zinc-600">Monitor hotel performance and room availability.</p>
      </div>

      <div className="space-y-3">
        {hotels.map((hotel) => (
          <article key={hotel.name} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="text-xl font-medium text-zinc-900">{hotel.name}</h2>
            <p className="text-zinc-600">{hotel.city}</p>
            <p className="mt-2 text-sm text-zinc-500">
              {hotel.rooms} rooms · {hotel.occupancy} occupancy
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
