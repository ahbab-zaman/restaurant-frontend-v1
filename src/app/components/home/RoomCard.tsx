"use client";

import { useState } from "react";
import { AvailabilityBadge } from "@/app/components/ui/AvailibilityBadge";
import type { Room } from "@/app/types";

interface RoomCardProps {
  room: Room;
  index: number;
}

const ROOM_ICONS = [
  // House icon
  <svg
    key="house"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>,
  // Coffee / wine glass icon
  <svg
    key="wine"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 8h1a4 4 0 010 8h-1" />
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>,
  // Leaf / garden icon
  <svg
    key="garden"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22V12" />
    <path d="M5 17H2a10 10 0 0020 0h-3" />
    <path d="M12 12C12 12 7 9 7 5a5 5 0 0110 0c0 4-5 7-5 7z" />
  </svg>,
];

export function RoomCard({ room, index }: RoomCardProps) {
  const [hovered, setHovered] = useState(false);
  const ordinals = ["01", "02", "03"];

  return (
    <article
      className="relative overflow-hidden cursor-pointer transition-colors duration-300"
      style={{
        background: hovered
          ? "var(--color-surface-overlay)"
          : "var(--color-surface-raised)",
        padding: "40px 32px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={room.name}
    >
      {/* Hover underline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-500 origin-left"
        style={{
          background: "var(--color-brand-secondary)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-hidden="true"
      />

      {/* Background ordinal number */}
      <span
        className="absolute top-5 right-6 font-display font-light leading-none pointer-events-none select-none"
        style={{ fontSize: "52px", color: "rgba(201,169,110,0.1)" }}
        aria-hidden="true"
      >
        {ordinals[index] ?? "01"}
      </span>

      {/* Icon */}
      <div
        className="flex items-center justify-center w-10 h-10 mb-6"
        style={{
          border: "0.5px solid var(--color-border-default)",
          color: "var(--color-brand-secondary)",
        }}
        aria-hidden="true"
      >
        {ROOM_ICONS[index % ROOM_ICONS.length]}
      </div>

      {/* Name */}
      <h3
        className="font-display text-[22px] font-normal mb-3"
        style={{ color: "var(--color-text-primary)" }}
      >
        {room.name}
      </h3>

      {/* Description */}
      <p
        className="text-[13px] leading-[1.65] mb-5"
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-body)",
          fontWeight: 300,
        }}
      >
        {room.description}
      </p>

      {/* Amenity tags */}
      <div
        className="flex flex-wrap gap-1.5 mb-5"
        role="list"
        aria-label="Amenities"
      >
        {room.amenities.map((amenity) => (
          <span
            key={amenity}
            className="text-[10px] tracking-[0.16em] uppercase px-2.5 py-1"
            style={{
              border: "0.5px solid var(--color-border-default)",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
            }}
            role="listitem"
          >
            {amenity}
          </span>
        ))}
      </div>

      {/* Capacity */}
      <p
        className="text-[11px] tracking-[0.1em] mb-3"
        style={{
          color: "var(--color-brand-secondary)",
          fontFamily: "var(--font-body)",
        }}
        aria-label={`Capacity: ${room.capacity.min} to ${room.capacity.max} guests`}
      >
        Seats {room.capacity.min} – {room.capacity.max} guests
      </p>

      {/* Availability */}
      <AvailabilityBadge status={room.availability} />
    </article>
  );
}
