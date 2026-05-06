"use client";

import { useMemo, useState } from "react";
import RoomCard from "@/app/components/home/RoomCard";
import { useHotelsQuery } from "@/lib/hotels/hotels.query";
import { useRoomsByHotelsQuery } from "@/lib/rooms/rooms.query";
import { Room } from "@/types/room";

type SortOption = "default" | "name-asc" | "name-desc" | "price-low" | "price-high";

const formatRoomType = (type: string) =>
  type
    .toLowerCase()
    .split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");

const extractRoomStats = (rooms: Room[]) => {
  if (!rooms.length) {
    return { minPrice: null, maxPrice: null, availableCount: 0 };
  }

  const prices = rooms.map((room) => room.price);
  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    availableCount: rooms.filter((room) => room.isAvailable).length,
  };
};

export default function HotelPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const { data: hotelsData, isLoading: hotelsLoading, isError: hotelsError } = useHotelsQuery();
  const hotels = useMemo(() => hotelsData?.items ?? [], [hotelsData?.items]);
  const hotelIds = useMemo(() => hotels.map((hotel) => hotel.id), [hotels]);

  const {
    data: roomsData,
    isLoading: roomsLoading,
    isFetching: roomsFetching,
    isError: roomsError,
  } = useRoomsByHotelsQuery(hotelIds);

  const roomsByHotel = useMemo(() => {
    const grouped = new Map<string, Room[]>();
    for (const room of roomsData?.items ?? []) {
      const existing = grouped.get(room.hotelId) ?? [];
      existing.push(room);
      grouped.set(room.hotelId, existing);
    }
    return grouped;
  }, [roomsData?.items]);

  const roomTypes = useMemo(() => {
    const values = new Set<string>();
    for (const room of roomsData?.items ?? []) {
      values.add(room.type);
    }
    return Array.from(values);
  }, [roomsData?.items]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredHotels = useMemo(() => {
    const term = search.trim().toLowerCase();

    const results = hotels.filter((hotel) => {
      const rooms = roomsByHotel.get(hotel.id) ?? [];
      const { availableCount } = extractRoomStats(rooms);

      const typeMatch =
        selectedTypes.length === 0 || rooms.some((room) => selectedTypes.includes(room.type));

      const searchMatch =
        !term ||
        hotel.name.toLowerCase().includes(term) ||
        hotel.address.toLowerCase().includes(term) ||
        rooms.some((room) => room.type.toLowerCase().includes(term));

      const availabilityMatch = !onlyAvailable || availableCount > 0;

      return typeMatch && searchMatch && availabilityMatch;
    });

    return results.sort((a, b) => {
      const aStats = extractRoomStats(roomsByHotel.get(a.id) ?? []);
      const bStats = extractRoomStats(roomsByHotel.get(b.id) ?? []);

      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-low") return (aStats.minPrice ?? Number.MAX_SAFE_INTEGER) - (bStats.minPrice ?? Number.MAX_SAFE_INTEGER);
      if (sortBy === "price-high") return (bStats.maxPrice ?? 0) - (aStats.maxPrice ?? 0);
      return 0;
    });
  }, [hotels, roomsByHotel, search, sortBy, selectedTypes, onlyAvailable]);

  const isLoading = hotelsLoading || roomsLoading;
  const hasError = hotelsError || roomsError;

  return (
    <section className="relative min-h-screen px-4 py-10 text-[#2f261f] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[28px] p-5 backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-[#e5ddd2] bg-[#f5f1eb] p-2">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search hotels, location, room type..."
                className="h-11 w-full rounded-xl border-none bg-transparent px-3 text-sm text-[#3d3026] placeholder:text-[#a39585] focus:outline-none"
              />
              <button
                type="button"
                className="h-11 rounded-xl bg-[#5d4330] px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4b3627] hover:shadow-lg"
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-3 self-end lg:self-auto">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="h-11 min-w-44 rounded-xl border border-[#cfc2b3] bg-white px-3 text-sm text-[#3d3026] shadow-sm outline-none transition-colors focus:border-[#8f735d]"
              >
                <option value="default">Default</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-6 border-t border-[#e7dfd6] pt-6 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-2xl border border-[#d9d0c6] bg-white p-5 shadow-[0_12px_32px_rgba(84,67,50,0.08)]">
              <h2 className="text-base font-semibold text-[#352b24]">Filters</h2>
              <div className="my-4 h-px bg-[#eee8e1]" />

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-[#554538]">
                    Room Types ({selectedTypes.length || roomTypes.length} selected)
                  </p>
                  <div className="hotel-form-scrollbar mt-3 max-h-44 space-y-2 overflow-y-auto rounded-xl border border-[#e7dfd6] bg-[#faf8f5] p-3">
                    {roomTypes.length ? (
                      roomTypes.map((type) => {
                        const checked = selectedTypes.includes(type);
                        return (
                          <label key={type} className="flex cursor-pointer items-center gap-2 text-sm text-[#58493c]">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setSelectedTypes((prev) =>
                                  checked ? prev.filter((item) => item !== type) : [...prev, type],
                                )
                              }
                              className="h-4 w-4 rounded border-[#cabba9] accent-[#6d4f37]"
                            />
                            {formatRoomType(type)}
                          </label>
                        );
                      })
                    ) : (
                      <p className="text-sm text-[#9a8d7e]">No room types found yet.</p>
                    )}
                  </div>
                </div>

                <label className="flex items-center justify-between text-sm text-[#463a30]">
                  <span>Only hotels with available rooms</span>
                  <input
                    type="checkbox"
                    checked={onlyAvailable}
                    onChange={(event) => setOnlyAvailable(event.target.checked)}
                    className="h-4 w-4 rounded border-[#cabba9] accent-[#6d4f37]"
                  />
                </label>
              </div>
            </aside>

            <div>
              {isLoading || roomsFetching ? (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-[420px] animate-pulse rounded-2xl border border-[#e7dfd6] bg-white/60" />
                  ))}
                </div>
              ) : hasError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-5 text-sm text-red-700">
                  Failed to load hotels or rooms. Please refresh the page.
                </div>
              ) : filteredHotels.length ? (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredHotels.map((hotel, index) => {
                    const rooms = roomsByHotel.get(hotel.id) ?? [];
                    const { minPrice, availableCount } = extractRoomStats(rooms);
                    const representativeRoom = rooms[0];

                    return (
                      <div
                        key={hotel.id}
                        className="opacity-0 [animation:fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                        style={{ animationDelay: `${index * 70}ms` }}
                      >
                        <RoomCard
                          href={`/hotels/HotelDetail/${hotel.id}`}
                          image={hotel.imageUrl}
                          imageAlt={hotel.name}
                          saleBadge={availableCount ? `${availableCount} Available` : "Fully Booked"}
                          title={hotel.name}
                          description={hotel.description || hotel.address}
                          price={minPrice !== null ? `$${minPrice} / night` : "Price not available"}
                          originalPrice={rooms.length ? `${rooms.length} rooms` : undefined}
                          discountLabel={representativeRoom ? formatRoomType(representativeRoom.type) : undefined}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-[#ddd2c3] bg-white px-5 py-10 text-center text-[#7d6b58]">
                  No hotels matched your search and filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
