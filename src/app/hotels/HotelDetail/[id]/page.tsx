"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import HotelDetails from "@/app/components/hotel/HotelDetails";
import { useHotelsQuery } from "@/lib/hotels/hotels.query";
import { useRoomsByHotelsQuery } from "@/lib/rooms/rooms.query";

export default function HotelDetailPage() {
  const params = useParams<{ id: string }>();
  const hotelId = params?.id;

  const { data: hotelsData, isLoading: hotelsLoading, isError: hotelsError } = useHotelsQuery();
  const hotel = hotelsData?.items.find((item) => item.id === hotelId);

  const {
    data: roomsData,
    isLoading: roomsLoading,
    isError: roomsError,
  } = useRoomsByHotelsQuery(hotel ? [hotel.id] : []);

  if (hotelsLoading || roomsLoading) {
    return (
      <div className="min-h-screen bg-[#f3f1ee] px-4 py-16 text-[#3b2f24] dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-5">
          <div className="h-96 rounded-3xl bg-white/70 dark:bg-gray-800/70" />
          <div className="h-40 rounded-3xl bg-white/70 dark:bg-gray-800/70" />
          <div className="h-96 rounded-3xl bg-white/70 dark:bg-gray-800/70" />
        </div>
      </div>
    );
  }

  if (hotelsError || roomsError) {
    return (
      <div className="min-h-screen bg-[#f3f1ee] px-4 py-16 dark:bg-gray-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
          Failed to load hotel details.
          <div className="mt-4">
            <Link href="/hotels" className="font-semibold underline">
              Back to Hotels
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-[#f3f1ee] px-4 py-16 dark:bg-gray-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#d9cfbf] bg-white p-6 text-center text-[#6a5848] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          Hotel not found.
          <div className="mt-4">
            <Link href="/hotels" className="font-semibold underline">
              Back to Hotels
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <HotelDetails hotel={hotel} rooms={roomsData?.items ?? []} />;
}
