"use client";

import AppModal from "./AppModal";
import { Room } from "@/types/room";

type RoomDetailsModalProps = {
  open: boolean;
  room: Room | null;
  onClose: () => void;
};

export default function RoomDetailsModal({ open, room, onClose }: RoomDetailsModalProps) {
  return (
    <AppModal open={open} title={room ? `Room ${room.roomNumber}` : "Room details"} onClose={onClose}>
      {room ? (
        <div className="space-y-4 text-sm text-zinc-700">
          {room.imageUrl ? (
            <img src={room.imageUrl} alt={`Room ${room.roomNumber}`} className="h-52 w-full rounded-xl border border-zinc-200 object-cover" />
          ) : null}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <p><span className="font-medium text-zinc-900">Hotel:</span> {room.hotel?.name ?? "N/A"}</p>
            <p><span className="font-medium text-zinc-900">Type:</span> {room.type}</p>
            <p><span className="font-medium text-zinc-900">Room Number:</span> {room.roomNumber}</p>
            <p><span className="font-medium text-zinc-900">Floor:</span> {room.floor}</p>
            <p><span className="font-medium text-zinc-900">Capacity:</span> {room.capacity}</p>
            <p><span className="font-medium text-zinc-900">Price:</span> ${room.price.toFixed(2)}</p>
            <p><span className="font-medium text-zinc-900">Availability:</span> {room.isAvailable ? "Available" : "Unavailable"}</p>
            <p><span className="font-medium text-zinc-900">Created:</span> {new Date(room.createdAt).toLocaleString()}</p>
          </div>
          {room.amenities?.length ? (
            <div>
              <p className="font-medium text-zinc-900">Amenities</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {room.description ? (
            <p><span className="font-medium text-zinc-900">Description:</span> {room.description}</p>
          ) : null}
        </div>
      ) : null}
    </AppModal>
  );
}
