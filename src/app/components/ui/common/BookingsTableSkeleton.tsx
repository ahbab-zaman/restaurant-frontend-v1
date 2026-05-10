"use client";

type BookingsTableSkeletonProps = {
  rows?: number;
};

export default function BookingsTableSkeleton({ rows = 8 }: BookingsTableSkeletonProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="grid grid-cols-7 gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className="h-4 w-20 animate-pulse rounded bg-zinc-200" />
        ))}
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="grid grid-cols-7 gap-3">
            {Array.from({ length: 7 }).map((__, cellIdx) => (
              <div key={cellIdx} className="h-5 animate-pulse rounded bg-zinc-100" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

