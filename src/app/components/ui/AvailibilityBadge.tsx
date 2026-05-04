import { cn } from "@/lib/utils";
import type { RoomAvailability } from "@/types";

interface AvailabilityBadgeProps {
  status: RoomAvailability;
  className?: string;
}

const CONFIG: Record<
  RoomAvailability,
  { label: string; bg: string; text: string; border: string }
> = {
  available: {
    label: "Available",
    bg: "rgba(90,138,90,0.12)",
    text: "#5a8a5a",
    border: "rgba(90,138,90,0.28)",
  },
  limited: {
    label: "Limited",
    bg: "rgba(201,150,58,0.12)",
    text: "#c9963a",
    border: "rgba(201,150,58,0.28)",
  },
  unavailable: {
    label: "Fully Booked",
    bg: "rgba(138,58,58,0.12)",
    text: "#8a3a3a",
    border: "rgba(138,58,58,0.28)",
  },
};

export function AvailabilityBadge({
  status,
  className,
}: AvailabilityBadgeProps) {
  const { label, bg, text, border } = CONFIG[status];

  return (
    <span
      className={cn(
        "inline-block text-[10px] tracking-[0.14em] uppercase px-3 py-1",
        className,
      )}
      style={{
        background: bg,
        color: text,
        border: `0.5px solid ${border}`,
        fontFamily: "var(--font-body)",
      }}
      aria-label={`Status: ${label}`}
    >
      {label}
    </span>
  );
}

