"use client";

import { Button } from "@/components/ui/button";

type PremiumPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const getPageWindow = (page: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  return Array.from(pages).filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
};

export default function PremiumPagination({ page, totalPages, onPageChange, className }: PremiumPaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getPageWindow(page, totalPages);

  return (
    <div className={className}>
      <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/90 p-2 shadow-sm">
        <Button type="button" variant="outline" size="sm" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>
        {visiblePages.map((p, index) => {
          const prev = visiblePages[index - 1];
          const withGap = prev && p - prev > 1;
          return (
            <div key={p} className="flex items-center gap-2">
              {withGap ? <span className="px-1 text-sm text-zinc-400">...</span> : null}
              <Button
                type="button"
                size="sm"
                variant={p === page ? "default" : "outline"}
                className={p === page ? "bg-zinc-900 text-white hover:bg-zinc-800" : ""}
                onClick={() => onPageChange(p)}
              >
                {p}
              </Button>
            </div>
          );
        })}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

