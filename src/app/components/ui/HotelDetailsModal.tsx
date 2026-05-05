"use client";

import { Hotel } from "@/types/hotel";
import AppModal from "./AppModal";

type HotelDetailsModalProps = {
  open: boolean;
  hotel: Hotel | null;
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
        </div>
      ) : null}
    </AppModal>
  );
}
