"use client";

import { useSearchParams } from "next/navigation";
import BookingCheckoutStarter from "@/app/components/checkout/BookingCheckoutStarter";

export default function BookingStartPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId") ?? "";
  const roomNumber = searchParams.get("roomNumber") ?? undefined;
  const roomType = searchParams.get("roomType") ?? undefined;
  const capacityValue = searchParams.get("capacity");
  const priceValue = searchParams.get("price");

  const capacity = capacityValue ? Number(capacityValue) : undefined;
  const pricePerNight = priceValue ? Number(priceValue) : undefined;

  if (!roomId) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Missing room information. Please open a room again and start checkout from the room details.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:py-12">
      <section className="rounded-3xl border border-[#e6dccd] bg-[linear-gradient(130deg,#fff9ef_0%,#f9f2e7_45%,#f5ece1_100%)] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9d8874]">Express Checkout</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#2f261f] sm:text-4xl">Reserve Your Stay</h1>
        <p className="mt-2 max-w-3xl text-sm text-[#6d5b4b] sm:text-base">
          A cleaner booking flow, inspired by premium ecommerce checkout experiences.
        </p>
      </section>

      <BookingCheckoutStarter
        roomId={roomId}
        roomMeta={{ roomNumber, roomType, capacity, pricePerNight }}
      />
    </main>
  );
}

