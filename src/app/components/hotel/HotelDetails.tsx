"use client";

import Image from "next/image";
import { Hotel } from "@/types/hotel";
import { Room } from "@/types/room";

interface HotelDetailsProps {
  hotel: Hotel;
  rooms: Room[];
}

const formatDate = (date: string) =>
  new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatType = (type: string) =>
  type
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function HotelDetails({ hotel, rooms }: HotelDetailsProps) {
  const minPrice = rooms.length ? Math.min(...rooms.map((room) => room.price)) : null;
  const maxPrice = rooms.length ? Math.max(...rooms.map((room) => room.price)) : null;
  const availableRooms = rooms.filter((room) => room.isAvailable).length;

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,#fffaf2_0%,#f4eee6_42%,#efe8dd_100%)] px-4 py-8 text-[#2f261f] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-[#ddd4c8] bg-white shadow-[0_25px_70px_rgba(81,62,46,0.14)]">
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
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-[#f2d8a8]">Hotel Overview</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{hotel.name}</h1>
              <p className="mt-2 max-w-3xl text-sm text-[#f8ede0] sm:text-base">{hotel.address}</p>
            </div>
          </div>

          <div className="grid gap-4 border-t border-[#efe6da] p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
            <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-4">
              <p className="text-xs uppercase tracking-wide text-[#8d7a66]">Rooms</p>
              <p className="mt-1 text-2xl font-semibold text-[#3a2f26]">{rooms.length}</p>
            </div>
            <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-4">
              <p className="text-xs uppercase tracking-wide text-[#8d7a66]">Available</p>
              <p className="mt-1 text-2xl font-semibold text-[#3a2f26]">{availableRooms}</p>
            </div>
            <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-4">
              <p className="text-xs uppercase tracking-wide text-[#8d7a66]">Starting From</p>
              <p className="mt-1 text-2xl font-semibold text-[#3a2f26]">{minPrice !== null ? `$${minPrice}` : "N/A"}</p>
            </div>
            <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-4">
              <p className="text-xs uppercase tracking-wide text-[#8d7a66]">Highest Price</p>
              <p className="mt-1 text-2xl font-semibold text-[#3a2f26]">{maxPrice !== null ? `$${maxPrice}` : "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-3xl border border-[#ddd2c1] bg-white p-6 shadow-[0_18px_40px_rgba(97,78,58,0.09)]">
            <h2 className="text-2xl font-semibold text-[#34291f]">About This Hotel</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#5d4b3b] sm:text-base">
              {hotel.description || "No hotel description provided."}
            </p>
          </article>

          <aside className="rounded-3xl border border-[#ddd2c1] bg-white p-6 shadow-[0_18px_40px_rgba(97,78,58,0.09)]">
            <h2 className="text-2xl font-semibold text-[#34291f]">Hotel Info</h2>
            <div className="mt-4 space-y-2 text-sm text-[#5a4a3b]">
              <p><span className="font-semibold text-[#2f261f]">Hotel ID:</span> {hotel.id}</p>
              <p><span className="font-semibold text-[#2f261f]">Admin Name:</span> {hotel.admin?.name ?? "N/A"}</p>
              <p><span className="font-semibold text-[#2f261f]">Admin Email:</span> {hotel.admin?.email ?? "N/A"}</p>
              <p><span className="font-semibold text-[#2f261f]">Created:</span> {formatDate(hotel.createdAt)}</p>
              <p><span className="font-semibold text-[#2f261f]">Updated:</span> {formatDate(hotel.updatedAt)}</p>
            </div>
          </aside>
        </div>

        <div className="rounded-3xl border border-[#ddd2c1] bg-white p-6 shadow-[0_18px_40px_rgba(97,78,58,0.09)]">
          <div className="mb-5 flex items-center justify-between gap-2">
            <h2 className="text-2xl font-semibold text-[#34291f]">Room Details</h2>
            <p className="text-sm text-[#7e6a57]">{rooms.length} total rooms</p>
          </div>

          {rooms.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {rooms.map((room, index) => (
                <article
                  key={room.id}
                  className="group overflow-hidden rounded-2xl border border-[#e8dfd2] bg-[#fefdfb] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ animation: `fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms both` }}
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#f3ede5]">
                    {room.imageUrl ? (
                      <Image
                        src={room.imageUrl}
                        alt={`Room ${room.roomNumber}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#9f8b77]">No image available</div>
                    )}
                  </div>

                  <div className="space-y-3 p-4 text-sm text-[#5a4a3b]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[#31261e]">Room {room.roomNumber}</h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          room.isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {room.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <p><span className="font-medium text-[#2f261f]">Type:</span> {formatType(room.type)}</p>
                      <p><span className="font-medium text-[#2f261f]">Price:</span> ${room.price}</p>
                      <p><span className="font-medium text-[#2f261f]">Capacity:</span> {room.capacity}</p>
                      <p><span className="font-medium text-[#2f261f]">Floor:</span> {room.floor}</p>
                    </div>

                    <p><span className="font-medium text-[#2f261f]">Room ID:</span> {room.id}</p>
                    <p><span className="font-medium text-[#2f261f]">Description:</span> {room.description || "-"}</p>

                    <div>
                      <p className="mb-2 font-medium text-[#2f261f]">Amenities</p>
                      {room.amenities?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity) => (
                            <span
                              key={`${room.id}-${amenity}`}
                              className="rounded-full border border-[#dccdb7] bg-[#f8f2e8] px-2.5 py-1 text-xs text-[#6d5945]"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-[#9f8b77]">No amenities listed.</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-1 border-t border-[#ede3d6] pt-3 text-xs text-[#866f58]">
                      <p><span className="font-medium text-[#5e4a39]">Created:</span> {formatDate(room.createdAt)}</p>
                      <p><span className="font-medium text-[#5e4a39]">Updated:</span> {formatDate(room.updatedAt)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] px-4 py-6 text-sm text-[#7e6a57]">
              No rooms are associated with this hotel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
