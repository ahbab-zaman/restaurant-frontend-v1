"use client";

import { Hotel } from "@/types/hotel";
import { Room } from "@/types/room";
import AppModal from "./AppModal";

type HotelDetailsModalProps = {
  open: boolean;
  hotel: (Hotel & { rooms: Room[] }) | null;
  onClose: () => void;
};

export default function HotelDetailsModal({ open, hotel, onClose }: HotelDetailsModalProps) {
  return (
    <AppModal open={open} title={hotel?.name ?? "Hotel details"} onClose={onClose}>
      {hotel ? (
        <div className="space-y-4">
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="h-52 w-full rounded-xl border border-zinc-200 object-cover"
          />
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium text-zinc-900">Address:</span> <span className="text-zinc-700">{hotel.address}</span>
            </p>
            <p>
              <span className="font-medium text-zinc-900">Admin:</span>{" "}
              <span className="text-zinc-700">{hotel.admin?.name ?? "N/A"}</span>
            </p>
            <p>
              <span className="font-medium text-zinc-900">Created:</span>{" "}
              <span className="text-zinc-700">{new Date(hotel.createdAt).toLocaleString()}</span>
            </p>
            {hotel.description ? (
              <p>
                <span className="font-medium text-zinc-900">Description:</span>{" "}
                <span className="text-zinc-700">{hotel.description}</span>
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-900">Rooms</h3>
            {hotel.rooms.length ? (
              <div className="overflow-x-auto rounded-lg border border-zinc-200">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-zinc-50 text-zinc-700">
                    <tr>
                      <th className="px-3 py-2 font-medium">Room No.</th>
                      <th className="px-3 py-2 font-medium">Type</th>
                      <th className="px-3 py-2 font-medium">Price</th>
                      <th className="px-3 py-2 font-medium">Capacity</th>
                      <th className="px-3 py-2 font-medium">Floor</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotel.rooms.map((room) => (
                      <tr key={room.id} className="border-t border-zinc-200">
                        <td className="px-3 py-2 text-zinc-900">{room.roomNumber}</td>
                        <td className="px-3 py-2 text-zinc-700">{room.type}</td>
                        <td className="px-3 py-2 text-zinc-700">${room.price}</td>
                        <td className="px-3 py-2 text-zinc-700">{room.capacity}</td>
                        <td className="px-3 py-2 text-zinc-700">{room.floor}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              room.isAvailable
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {room.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">No rooms are associated with this hotel yet.</p>
            )}
          </div>
        </div>
      ) : null}
    </AppModal>
  );
}
