"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Room } from "@/types/room";

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
}

const formatType = (type: string) =>
  type
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const formatDate = (date: string) =>
  new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function RoomDetailModal({ room, onClose }: RoomDetailModalProps) {
  const router = useRouter();
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (room) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [room]);

  if (!room) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Room ${room.roomNumber} details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="room-detail-scrollbar relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#e2d9cc] bg-white shadow-[0_30px_80px_rgba(40,25,10,0.22)] dark:border-gray-700 dark:bg-gray-900 dark:shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        {/* Room Image */}
        <div className="relative h-52 w-full overflow-hidden rounded-t-3xl bg-[#f3ede5] dark:bg-gray-700 sm:h-64">
          {room.imageUrl ? (
            <Image
              src={room.imageUrl}
              alt={`Room ${room.roomNumber}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#9f8b77] dark:text-gray-400">
              No image available
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Room number + badge */}
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Room {room.roomNumber}
              </h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  room.isAvailable
                    ? "bg-emerald-500/90 text-white"
                    : "bg-red-500/90 text-white"
                }`}
              >
                {room.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 p-5 sm:p-7">
          {/* Key info grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Type", value: formatType(room.type) },
              { label: "Price", value: `$${room.price} / night` },
              { label: "Capacity", value: `${room.capacity} guest${room.capacity !== 1 ? "s" : ""}` },
              { label: "Floor", value: `Floor ${room.floor}` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#eadfce] bg-[#fdf9f4] p-3 dark:border-gray-700 dark:bg-gray-800"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#9f8b77] dark:text-gray-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#31261e] dark:text-gray-100">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#9f8b77] dark:text-gray-400">
              Description
            </h3>
            <p className="whitespace-pre-line text-sm leading-7 text-[#5a4a3b] dark:text-gray-300">
              {room.description || "No description provided for this room."}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#9f8b77] dark:text-gray-400">
              Amenities
            </h3>
            {room.amenities?.length ? (
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={`${room.id}-${amenity}`}
                    className="rounded-full border border-[#dccdb7] bg-[#f8f2e8] px-3 py-1.5 text-xs font-medium text-[#6d5945] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#9f8b77] dark:text-gray-400">No amenities listed.</p>
            )}
          </div>

          {room.isAvailable ? (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#9f8b77] dark:text-gray-400">
                Reserve This Room
              </h3>
             
                <button
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams({
                      roomId: room.id,
                      roomNumber: room.roomNumber,
                      roomType: room.type,
                      capacity: String(room.capacity),
                      price: String(room.price),
                    });
                    onClose();
                    router.push(`/checkout/start?${params.toString()}`);
                  }}
                  className="mt-3 w-full rounded-xl bg-[#2f261f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#241c16]"
                >
                  Book Now
                </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
