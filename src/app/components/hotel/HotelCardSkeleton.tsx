"use client";

interface HotelCardSkeletonProps {
  count?: number;
}

export default function HotelCardSkeleton({
  count = 6,
}: HotelCardSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse relative flex flex-col h-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100"
        >
          {/* ── Image area ─────────────────────────────────────────────── */}
          <div className="relative shrink-0 overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              <div className="absolute inset-0 w-full h-full bg-neutral-200" />
            </div>

            {/* Badge skeleton — top-left pill */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <div className="h-6 w-24 rounded-full bg-neutral-300" />
            </div>
          </div>

          {/* ── Content area ───────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col p-4 gap-3">
            {/* Title — two lines */}
            <div className="space-y-2 min-h-10">
              <div className="h-3.5 w-4/5 rounded bg-neutral-300" />
              <div className="h-3.5 w-3/5 rounded bg-neutral-300" />
            </div>

            {/* Description — three lines */}
            <div className="space-y-2 flex-1">
              <div className="h-2.5 w-full rounded bg-neutral-200" />
              <div className="h-2.5 w-[90%] rounded bg-neutral-200" />
              <div className="h-2.5 w-3/5 rounded bg-neutral-200" />
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-neutral-200" />

            {/* Price row */}
            <div className="flex items-baseline gap-2.5 pt-0.5">
              <div className="h-4 w-1/3 rounded bg-neutral-300" />
              <div className="h-3 w-1/5 rounded bg-neutral-200" />
              <div className="h-5 w-14 rounded-md bg-neutral-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
