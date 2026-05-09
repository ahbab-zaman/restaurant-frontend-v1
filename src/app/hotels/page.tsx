"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import RoomCard from "@/app/components/home/RoomCard";
import HotelCardSkeleton from "@/app/components/hotel/HotelCardSkeleton";
import PremiumPagination from "@/app/components/ui/PremiumPagination";
import { Switch } from "@/components/ui/switch";
import { useHotelsQuery } from "@/lib/hotels/hotels.query";
import { useRoomsByHotelsQuery } from "@/lib/rooms/rooms.query";
import { Room } from "@/types/room";

type SortOption =
  | "default"
  | "name-asc"
  | "name-desc"
  | "price-low"
  | "price-high";

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
  const MIN_SKELETON_MS = 700;
  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track if the user has manually adjusted the price range
  const priceRangeUserModified = useRef(false);

  const {
    data: hotelsData,
    isLoading: hotelsLoading,
    isError: hotelsError,
  } = useHotelsQuery({ page, limit });
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
    for (const room of roomsData?.items ?? []) values.add(room.type);
    return Array.from(values);
  }, [roomsData?.items]);

  // Price range derived from all rooms
  const globalPriceRange = useMemo(() => {
    const allPrices = (roomsData?.items ?? []).map((r) => r.price);
    if (!allPrices.length) return { min: 0, max: 1000 };
    return { min: Math.min(...allPrices), max: Math.max(...allPrices) };
  }, [roomsData?.items]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Sync price range when global range loads (only if user hasn't manually changed it)
  useEffect(() => {
    if (!priceRangeUserModified.current) {
      setPriceRange([globalPriceRange.min, globalPriceRange.max]);
    }
  }, [globalPriceRange.min, globalPriceRange.max]);

  const activeFilterCount =
    selectedTypes.length +
    (onlyAvailable ? 1 : 0) +
    (priceRange[0] > globalPriceRange.min ||
    priceRange[1] < globalPriceRange.max
      ? 1
      : 0);

  const filteredHotels = useMemo(() => {
    const term = search.trim().toLowerCase();

    const results = hotels.filter((hotel) => {
      const rooms = roomsByHotel.get(hotel.id) ?? [];
      const { availableCount, minPrice } = extractRoomStats(rooms);

      const typeMatch =
        selectedTypes.length === 0 ||
        rooms.some((room) => selectedTypes.includes(room.type));

      const searchMatch =
        !term ||
        hotel.name.toLowerCase().includes(term) ||
        hotel.address.toLowerCase().includes(term) ||
        rooms.some((room) => room.type.toLowerCase().includes(term));

      const availabilityMatch = !onlyAvailable || availableCount > 0;

      const priceMatch =
        minPrice === null ||
        (minPrice >= priceRange[0] && minPrice <= priceRange[1]);

      return typeMatch && searchMatch && availabilityMatch && priceMatch;
    });

    return results.sort((a, b) => {
      const aStats = extractRoomStats(roomsByHotel.get(a.id) ?? []);
      const bStats = extractRoomStats(roomsByHotel.get(b.id) ?? []);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-low")
        return (
          (aStats.minPrice ?? Number.MAX_SAFE_INTEGER) -
          (bStats.minPrice ?? Number.MAX_SAFE_INTEGER)
        );
      if (sortBy === "price-high")
        return (bStats.maxPrice ?? 0) - (aStats.maxPrice ?? 0);
      return 0;
    });
  }, [
    hotels,
    roomsByHotel,
    search,
    sortBy,
    selectedTypes,
    onlyAvailable,
    priceRange,
  ]);

  // Reset to page 1 only when user-driven filter changes happen
  // priceRange is intentionally excluded to avoid the reset loop:
  // page change → new data → globalPriceRange update → priceRange sync → page reset
  useEffect(() => {
    setPage(1);
  }, [search, sortBy, selectedTypes, onlyAvailable]); // eslint-disable-line react-hooks/exhaustive-deps

  const isLoading = hotelsLoading || roomsLoading;
  const [showSkeleton, setShowSkeleton] = useState(true);
  const loadingStartedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (isLoading || roomsFetching) {
      loadingStartedAtRef.current = Date.now();
      setShowSkeleton(true);
      return;
    }
    const elapsed = Date.now() - loadingStartedAtRef.current;
    const remaining = Math.max(0, MIN_SKELETON_MS - elapsed);
    const timeoutId = window.setTimeout(
      () => setShowSkeleton(false),
      remaining,
    );
    return () => window.clearTimeout(timeoutId);
  }, [isLoading, roomsFetching]);

  const hasError = hotelsError || roomsError;

  // Hover handlers with delay to prevent flicker
  const handleFilterMouseEnter = () => {
    if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    setFilterOpen(true);
  };

  const handleFilterMouseLeave = () => {
    filterTimeoutRef.current = setTimeout(() => setFilterOpen(false), 200);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setOnlyAvailable(false);
    priceRangeUserModified.current = false;
    setPriceRange([globalPriceRange.min, globalPriceRange.max]);
    setPage(1);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes filterDropdown {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .filter-panel-enter {
          animation: filterDropdown 0.22s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .price-range-track {
          position: relative;
          height: 4px;
          background: #e7dfd6;
          border-radius: 9999px;
          margin: 8px 0;
        }
        .dark .price-range-track {
          background: #3f362f;
        }
        .price-range-fill {
          position: absolute;
          height: 100%;
          background: #6d4f37;
          border-radius: 9999px;
        }
        input[type="range"].price-thumb {
          position: absolute;
          width: 100%;
          height: 4px;
          background: transparent;
          -webkit-appearance: none;
          pointer-events: none;
          top: 0;
        }
        input[type="range"].price-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #5d4330;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(84,67,50,0.3);
          pointer-events: all;
          cursor: pointer;
          transition: transform 0.15s;
        }
        input[type="range"].price-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .dark input[type="range"].price-thumb::-webkit-slider-thumb {
          border: 2px solid #111827;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
        }
        input[type="range"].price-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #5d4330;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(84,67,50,0.3);
          pointer-events: all;
          cursor: pointer;
        }
        .dark input[type="range"].price-thumb::-moz-range-thumb {
          border: 2px solid #111827;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
        }
      `}</style>

      <section className="relative min-h-screen px-4 py-10 text-[#2f261f] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-[28px] p-5 backdrop-blur-sm sm:p-8">
            {/* Top bar: search + controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-[#e5ddd2] bg-[#f5f1eb] p-2 dark:border-gray-700 dark:bg-gray-800/70">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search hotels, location, room type..."
                  className="h-11 w-full rounded-xl border-none bg-transparent px-3 text-sm text-[#3d3026] placeholder:text-[#a39585] focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-400"
                />
                <button
                  type="button"
                  className="h-11 rounded-xl bg-[#5d4330] px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4b3627] hover:shadow-lg"
                >
                  Search
                </button>
              </div>

              {/* Sort + Filter */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-11 min-w-44 rounded-xl border border-[#cfc2b3] bg-white px-3 text-sm text-[#3d3026] shadow-sm outline-none transition-colors focus:border-[#8f735d] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-[#a8896f]"
                >
                  <option value="default">Default</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* Filter button with hover dropdown */}
                <div
                  ref={filterRef}
                  className="relative"
                  onMouseEnter={handleFilterMouseEnter}
                  onMouseLeave={handleFilterMouseLeave}
                >
                  <button
                    type="button"
                    className="relative mb-2 flex h-11 items-center gap-2 rounded-xl border border-[#cfc2b3] bg-white px-4 text-sm font-medium text-[#3d3026] shadow-sm transition-all duration-200 hover:border-[#8f735d] hover:bg-[#faf7f4] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-[#a8896f] dark:hover:bg-gray-700"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="shrink-0 text-[#5d4330] dark:text-[#c7aa8f]"
                    >
                      <path
                        d="M2 4h12M4 8h8M6 12h4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5d4330] text-[10px] font-bold text-white">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown panel */}
                  {filterOpen && (
                    <div
                      className="filter-panel-enter absolute right-0 top-[calc(100%+8px)] z-50 w-72 rounded-2xl border border-[#d9d0c6] bg-white p-5 shadow-[0_16px_48px_rgba(84,67,50,0.16)] dark:border-gray-700 dark:bg-gray-900"
                      onMouseEnter={handleFilterMouseEnter}
                      onMouseLeave={handleFilterMouseLeave}
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-[#352b24] dark:text-gray-100">
                          Filters
                        </h2>
                        {activeFilterCount > 0 && (
                          <button
                            type="button"
                            onClick={clearFilters}
                            className="text-xs text-[#8f735d] underline underline-offset-2 hover:text-[#5d4330] dark:text-[#c7aa8f] dark:hover:text-[#e4c9ae]"
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      <div className="my-3 h-px bg-[#eee8e1] dark:bg-gray-700" />

                      <div className="space-y-5">
                        {/* Price Range */}
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#554538] dark:text-gray-300">
                            Price Range
                          </p>
                          <div className="mb-2 flex justify-between text-xs text-[#7d6b58] dark:text-gray-400">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                          <div className="price-range-track">
                            <div
                              className="price-range-fill"
                              style={{
                                left: `${((priceRange[0] - globalPriceRange.min) / (globalPriceRange.max - globalPriceRange.min || 1)) * 100}%`,
                                right: `${100 - ((priceRange[1] - globalPriceRange.min) / (globalPriceRange.max - globalPriceRange.min || 1)) * 100}%`,
                              }}
                            />
                            <input
                              type="range"
                              className="price-thumb"
                              min={globalPriceRange.min}
                              max={globalPriceRange.max}
                              value={priceRange[0]}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val <= priceRange[1]) {
                                  priceRangeUserModified.current = true;
                                  setPriceRange([val, priceRange[1]]);
                                  setPage(1);
                                }
                              }}
                            />
                            <input
                              type="range"
                              className="price-thumb"
                              min={globalPriceRange.min}
                              max={globalPriceRange.max}
                              value={priceRange[1]}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val >= priceRange[0]) {
                                  priceRangeUserModified.current = true;
                                  setPriceRange([priceRange[0], val]);
                                  setPage(1);
                                }
                              }}
                            />
                          </div>
                          <div className="mt-3 flex gap-2">
                            <div className="flex-1 rounded-lg border border-[#e7dfd6] bg-[#faf8f5] px-2.5 py-1.5 text-center text-xs text-[#3d3026] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
                              Min:{" "}
                              <span className="font-semibold">
                                ${priceRange[0]}
                              </span>
                            </div>
                            <div className="flex-1 rounded-lg border border-[#e7dfd6] bg-[#faf8f5] px-2.5 py-1.5 text-center text-xs text-[#3d3026] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
                              Max:{" "}
                              <span className="font-semibold">
                                ${priceRange[1]}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="h-px bg-[#eee8e1] dark:bg-gray-700" />

                        {/* Room Types */}
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#554538] dark:text-gray-300">
                            Room Types
                          </p>
                          <div className="hotel-form-scrollbar max-h-36 space-y-1.5 overflow-y-auto rounded-xl border border-[#e7dfd6] bg-[#faf8f5] p-3 dark:border-gray-700 dark:bg-gray-800">
                            {roomTypes.length ? (
                              roomTypes.map((type) => {
                                const checked = selectedTypes.includes(type);
                                return (
                                  <label
                                    key={type}
                                    className="flex cursor-pointer items-center gap-2 text-sm text-[#58493c] hover:text-[#352b24] dark:text-gray-300 dark:hover:text-gray-100"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() =>
                                        setSelectedTypes((prev) =>
                                          checked
                                            ? prev.filter((i) => i !== type)
                                            : [...prev, type],
                                        )
                                      }
                                      className="h-4 w-4 rounded border-[#cabba9] accent-[#6d4f37] dark:border-gray-500"
                                    />
                                    {formatRoomType(type)}
                                  </label>
                                );
                              })
                            ) : (
                              <p className="text-xs text-[#9a8d7e] dark:text-gray-400">
                                No room types found yet.
                              </p>
                            )}
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hotel Grid */}
            <div className="mt-8 border-t border-[#e7dfd6] pt-6">
              {showSkeleton ? (
                <HotelCardSkeleton count={8} />
              ) : hasError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-5 text-sm text-red-700">
                  Failed to load hotels or rooms. Please refresh the page.
                </div>
              ) : filteredHotels.length ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                    {filteredHotels.map((hotel, index) => {
                      const rooms = roomsByHotel.get(hotel.id) ?? [];
                      const { minPrice, availableCount } =
                        extractRoomStats(rooms);
                      const representativeRoom = rooms[0];

                      return (
                        <div
                          key={hotel.id}
                          className="opacity-0"
                          style={{
                            animation: `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms forwards`,
                          }}
                        >
                          <RoomCard
                            href={`/hotels/HotelDetail/${hotel.id}`}
                            image={hotel.imageUrl}
                            imageAlt={hotel.name}
                            saleBadge={
                              availableCount
                                ? `${availableCount} Available`
                                : "No Rooms Available"
                            }
                            title={hotel.name}
                            description={hotel.description || hotel.address}
                            price={
                              minPrice !== null
                                ? `$${minPrice} / night`
                                : "Price not available"
                            }
                            originalPrice={
                              rooms.length ? `${rooms.length} rooms` : undefined
                            }
                            discountLabel={
                              representativeRoom
                                ? formatRoomType(representativeRoom.type)
                                : undefined
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <PremiumPagination
                      page={page}
                      totalPages={hotelsData?.meta.totalPages ?? 1}
                      onPageChange={setPage}
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-[#ddd2c3] bg-white px-5 py-10 text-center text-[#7d6b58]">
                  No hotels matched your search and filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
