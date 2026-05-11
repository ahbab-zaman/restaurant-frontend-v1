"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import HotelCardSkeleton from "@/app/components/hotel/HotelCardSkeleton";
import { useHotelsQuery } from "@/lib/hotels/hotels.query";
import { useRoomsByHotelsQuery } from "@/lib/rooms/rooms.query";
import { Room } from "@/types/room";
import RoomCard from "./RoomCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const formatRoomType = (type: string) =>
  type
    .toLowerCase()
    .split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");

const extractRoomStats = (rooms: Room[]) => {
  if (!rooms.length) return { minPrice: null };
  const prices = rooms.map((room) => room.price);
  return { minPrice: Math.min(...prices) };
};

function LeafDecoration() {
  return (
    <svg
      className="absolute top-0 right-0 opacity-40 pointer-events-none"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 56C30 56 10 42 10 24C10 12 18 4 30 4C42 4 50 12 50 24C50 42 30 56 30 56Z"
        fill="#7a9e7e"
        opacity="0.6"
      />
      <path
        d="M30 4L30 56"
        stroke="#5a7a5e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M30 18C23 16 16 21 14 28"
        stroke="#5a7a5e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M30 28C23 26 17 31 16 38"
        stroke="#5a7a5e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M30 38C25 36 21 40 20 44"
        stroke="#5a7a5e"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function BookingWidget() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useHotelsQuery();
  const hotelIds = useMemo(
    () => (data?.items ?? []).map((hotel) => hotel.id),
    [data?.items],
  );
  const { data: roomsData } = useRoomsByHotelsQuery(hotelIds);

  const roomsByHotel = useMemo(() => {
    const grouped = new Map<string, Room[]>();
    for (const room of roomsData?.items ?? []) {
      const existing = grouped.get(room.hotelId) ?? [];
      existing.push(room);
      grouped.set(room.hotelId, existing);
    }
    return grouped;
  }, [roomsData?.items]);

  const latestHotels = useMemo(() => {
    const hotels = data?.items ?? [];
    return [...hotels]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6);
  }, [data?.items]);

  const scrollByCards = (direction: "left" | "right") => {
    const node = scrollerRef.current;
    if (!node) return;

    const amount = Math.round(node.clientWidth * 0.8);
    node.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen py-14">
      <div>
        <div className="relative mb-12 text-center">
          <h2 className="inline text-[36px] font-bold leading-tight tracking-tight text-gray-900 dark:text-neutral-100">
            Recently Booked{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hotels
            </span>
          </h2>
          <LeafDecoration />
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Previous hotels"
            onClick={() => scrollByCards("left")}
            className="absolute -left-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-200 bg-white/95 text-emerald-800 shadow-md transition-all duration-300 hover:scale-105 hover:bg-emerald-50 hover:shadow-lg active:scale-95 dark:border-emerald-900/60 dark:bg-neutral-900/95 dark:text-emerald-300 dark:hover:bg-neutral-800 lg:flex"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Next hotels"
            onClick={() => scrollByCards("right")}
            className="absolute -right-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-200 bg-white/95 text-emerald-800 shadow-md transition-all duration-300 hover:scale-105 hover:bg-emerald-50 hover:shadow-lg active:scale-95 dark:border-emerald-900/60 dark:bg-neutral-900/95 dark:text-emerald-300 dark:hover:bg-neutral-800 lg:flex"
          >
            <ChevronRight size={18} />
          </button>

          {isLoading ? (
            <HotelCardSkeleton count={4} />
          ) : isError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
              Failed to load latest hotels.
            </div>
          ) : (
            <div
              ref={scrollerRef}
              className="hotel-form-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scroll-smooth"
            >
              {latestHotels.map((hotel, i) => (
                (() => {
                  const rooms = roomsByHotel.get(hotel.id) ?? [];
                  const { minPrice } = extractRoomStats(rooms);
                  const representativeRoom = rooms[0];

                  return (
                    <div
                      key={hotel.id}
                      className="animate-fadeInUp w-[78%] shrink-0 snap-start opacity-0 sm:w-[48%] lg:w-[23.5%]"
                      style={{
                        animationDelay: `${i * 120}ms`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <RoomCard
                        href={`/hotels/HotelDetail/${hotel.id}`}
                        image={hotel.imageUrl}
                        imageAlt={hotel.name}
                        saleBadge="New"
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
                })()
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/hotels"
            className="inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg active:translate-y-0 active:scale-95 dark:border-emerald-800"
          >
            View All
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}
