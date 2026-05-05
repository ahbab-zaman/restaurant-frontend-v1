const hotels = [
  { name: "Lumos Downtown", city: "Dhaka", rooms: 120, occupancy: "82%", status: "Active" },
  { name: "Lumos Bay View", city: "Chattogram", rooms: 88, occupancy: "76%", status: "Active" },
  { name: "Lumos Hills", city: "Sylhet", rooms: 64, occupancy: "69%", status: "Review" },
];

export default function SuperAdminHotelsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Hotels</h1>
        <p className="mt-1 text-zinc-600">Track property performance across all locations.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr className="text-left text-sm text-zinc-600">
              <th className="px-5 py-3 font-medium">Hotel</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">Rooms</th>
              <th className="px-5 py-3 font-medium">Occupancy</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-sm">
            {hotels.map((hotel) => (
              <tr key={hotel.name} className="transition-colors hover:bg-zinc-50">
                <td className="px-5 py-4 font-medium text-zinc-900">{hotel.name}</td>
                <td className="px-5 py-4 text-zinc-600">{hotel.city}</td>
                <td className="px-5 py-4 text-zinc-600">{hotel.rooms}</td>
                <td className="px-5 py-4 text-zinc-600">{hotel.occupancy}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">{hotel.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
