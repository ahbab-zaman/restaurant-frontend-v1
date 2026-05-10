"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Hotel } from "@/types/hotel";
import { Room } from "@/types/room";
import RoomDetailModal from "./RoomDetailModal";

interface HotelDetailsProps {
  hotel: Hotel;
  rooms: Room[];
}

const formatType = (type: string) =>
  type
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

/** Truncate a string to maxLen characters, appending "…" if needed */
const truncate = (str: string | null | undefined, maxLen: number): string => {
  if (!str) return "—";
  return str.length > maxLen ? str.slice(0, maxLen).trimEnd() + "…" : str;
};

const MAX_DESC_CHARS = 80;
const MAX_AMENITIES_SHOWN = 3;

export default function HotelDetails({ hotel, rooms }: HotelDetailsProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (!selectedRoom) return;
    const updated = rooms.find((room) => room.id === selectedRoom.id);
    if (!updated) {
      setSelectedRoom(null);
      return;
    }
    setSelectedRoom(updated);
  }, [rooms, selectedRoom]);

  const minPrice = rooms.length ? Math.min(...rooms.map((r) => r.price)) : null;
  const maxPrice = rooms.length ? Math.max(...rooms.map((r) => r.price)) : null;
  const availableRooms = rooms.filter((r) => r.isAvailable).length;

  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(circle_at_top,#fffaf2_0%,#f4eee6_42%,#efe8dd_100%)] px-4 py-8 text-[#2f261f] dark:bg-none dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* ─── Hotel Hero Card ─── */}
          <div className="overflow-hidden rounded-[28px] border border-[#ddd4c8] bg-white shadow-[0_25px_70px_rgba(81,62,46,0.14)] dark:border-gray-700 dark:bg-gray-900 dark:shadow-[0_20px_55px_rgba(0,0,0,0.45)]">
            <div className="relative h-72 w-full overflow-hidden sm:h-96">
              <Image
                src={hotel.imageUrl}
                alt={hotel.name}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f160f]/70 via-[#1f160f]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-[#f2d8a8]">
                  Hotel Overview
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  {hotel.name}
                </h1>
                <p className="mt-2 max-w-3xl text-sm text-[#f8ede0] sm:text-base">
                  {hotel.address}
                </p>
              </div>
            </div>

            <div className="grid gap-4 border-t border-[#efe6da] p-5 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
              {[
                { label: "Rooms", value: rooms.length },
                { label: "Available", value: availableRooms },
                { label: "Starting From", value: minPrice !== null ? `$${minPrice}` : "N/A" },
                { label: "Highest Price", value: maxPrice !== null ? `$${maxPrice}` : "N/A" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <p className="text-xs uppercase tracking-wide text-[#8d7a66] dark:text-gray-400">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-[#3a2f26] dark:text-gray-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── About Section ─── */}
          <article className="rounded-3xl border border-[#ddd2c1] bg-white p-6 shadow-[0_18px_40px_rgba(97,78,58,0.09)] dark:border-gray-700 dark:bg-gray-900 dark:shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
            <h2 className="text-2xl font-semibold text-[#34291f] dark:text-gray-100">
              About This Hotel
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#5d4b3b] dark:text-gray-300 sm:text-base">
              {hotel.description || "No hotel description provided."}
            </p>
          </article>

          {/* ─── Room Cards ─── */}
          <div className="rounded-3xl border border-[#ddd2c1] bg-white p-6 shadow-[0_18px_40px_rgba(97,78,58,0.09)] dark:border-gray-700 dark:bg-gray-900 dark:shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
            <div className="mb-5 flex items-center justify-between gap-2">
              <h2 className="text-2xl font-semibold text-[#34291f] dark:text-gray-100">
                Room Details
              </h2>
              <p className="text-sm text-[#7e6a57] dark:text-gray-400">
                {rooms.length} total rooms
              </p>
            </div>

            {rooms.length ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {rooms.map((room, index) => {
                  const visibleAmenities = room.amenities?.slice(0, MAX_AMENITIES_SHOWN) ?? [];
                  const hiddenCount = (room.amenities?.length ?? 0) - MAX_AMENITIES_SHOWN;

                  return (
                    /* Clicking anywhere on the card opens the modal */
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className="group w-full cursor-pointer overflow-hidden rounded-2xl border border-[#e8dfd2] bg-[#fefdfb] text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b89870] dark:border-gray-700 dark:bg-gray-800"
                      style={{
                        animation: `fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms both`,
                      }}
                      aria-label={`View details for Room ${room.roomNumber}`}
                    >
                      {/* Room image */}
                      <div className="relative h-48 w-full overflow-hidden bg-[#f3ede5] dark:bg-gray-700">
                        {room.imageUrl ? (
                          <Image
                            src={room.imageUrl}
                            alt={`Room ${room.roomNumber}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-[#9f8b77] dark:text-gray-400">
                            No image available
                          </div>
                        )}

                        {/* "View Details" hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                          <span className="translate-y-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#3a2f26] opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="space-y-3 p-4 text-sm text-[#5a4a3b] dark:text-gray-300">
                        {/* Header row */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold text-[#31261e] dark:text-gray-100">
                            Room {room.roomNumber}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                              room.isAvailable
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                            }`}
                          >
                            {room.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </div>

                        {/* Key fields */}
                        <div className="grid grid-cols-2 gap-1.5 text-xs">
                          <p>
                            <span className="font-medium text-[#2f261f] dark:text-gray-100">Type: </span>
                            {formatType(room.type)}
                          </p>
                          <p>
                            <span className="font-medium text-[#2f261f] dark:text-gray-100">Price: </span>
                            ${room.price}
                          </p>
                          <p>
                            <span className="font-medium text-[#2f261f] dark:text-gray-100">Capacity: </span>
                            {room.capacity}
                          </p>
                          <p>
                            <span className="font-medium text-[#2f261f] dark:text-gray-100">Floor: </span>
                            {room.floor}
                          </p>
                        </div>

                        {/* Truncated description */}
                        <p className="text-xs leading-5 text-[#7a6654] dark:text-gray-400">
                          <span className="font-medium text-[#2f261f] dark:text-gray-100">Desc: </span>
                          {truncate(room.description, MAX_DESC_CHARS)}
                        </p>

                        {/* Truncated amenities */}
                        <div>
                          <p className="mb-1.5 text-xs font-medium text-[#2f261f] dark:text-gray-100">
                            Amenities
                          </p>
                          {visibleAmenities.length ? (
                            <div className="flex flex-wrap gap-1.5">
                              {visibleAmenities.map((amenity) => (
                                <span
                                  key={`${room.id}-${amenity}`}
                                  className="rounded-full border border-[#dccdb7] bg-[#f8f2e8] px-2 py-0.5 text-[10px] text-[#6d5945] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {hiddenCount > 0 && (
                                <span className="rounded-full border border-[#dccdb7] bg-[#f0e8d8] px-2 py-0.5 text-[10px] font-medium text-[#8a6d50] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                  +{hiddenCount} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <p className="text-[10px] text-[#9f8b77] dark:text-gray-400">
                              No amenities listed.
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] px-4 py-6 text-sm text-[#7e6a57] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                No rooms are associated with this hotel.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── Room Detail Modal ─── */}
      <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </>
  );
}
