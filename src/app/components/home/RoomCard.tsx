"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.38 3.1 10.99 3.98 12 5.34C13.01 3.98 14.63 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69C22 15.69 15.52 19.82 12.62 20.81Z"
        stroke="currentColor"
        fill={filled ? "currentColor" : "none"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
      <path
        d="M3.99 14.66L2.47 13.14C1.85 12.52 1.85 11.5 2.47 10.88L3.99 9.36C4.25 9.1 4.46 8.59 4.46 8.23V6.08C4.46 5.2 5.18 4.48 6.06 4.48H8.21C8.57 4.48 9.08 4.27 9.34 4.01L10.86 2.49C11.48 1.87 12.5 1.87 13.12 2.49L14.64 4.01C14.9 4.27 15.41 4.48 15.77 4.48H17.92C18.8 4.48 19.52 5.2 19.52 6.08V8.23C19.52 8.59 19.73 9.1 19.99 9.36L21.51 10.88C22.13 11.5 22.13 12.52 21.51 13.14L19.99 14.66C19.73 14.92 19.52 15.43 19.52 15.79V17.94C19.52 18.82 18.8 19.54 17.92 19.54H15.77C15.41 19.54 14.9 19.75 14.64 20.01L13.12 21.53C12.5 22.15 11.48 22.15 10.86 21.53L9.34 20.01C9.08 19.75 8.57 19.54 8.21 19.54H6.06C5.18 19.54 4.46 18.82 4.46 17.94V15.79C4.46 15.42 4.25 14.91 3.99 14.66Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 15L15 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.495 14.5H14.504"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.495 9.5H9.504"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoomCardProps {
  href?: string;
  image: string | StaticImageData;
  imageAlt: string;
  saleBadge?: string; // e.g. "48% Sale"
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string; // e.g. "48% off"
  currency?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RoomCard({
  href = "#",
  image,
  imageAlt,
  saleBadge,
  title,
  description,
  price,
  originalPrice,
  discountLabel,
}: RoomCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <Link
      href={href}
      className="
        group flex flex-col h-full rounded-2xl border border-neutral-200
        bg-white overflow-hidden
        hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10
        transition-all duration-300
        cursor-pointer
      "
      style={{ textDecoration: "none" }}
    >
      {/* ── Image area ───────────────────────────────────────────────────── */}
      <div className="relative flex-shrink-0 overflow-hidden bg-neutral-100">
        {/* Square aspect ratio */}
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <div className="absolute inset-0 w-full h-full">
            <Image
              alt={imageAlt}
              src={image}
              className="
                object-cover w-full h-full
                transition-transform duration-500 ease-out
                group-hover:scale-105
              "
            />
          </div>
        </div>

        {/* Sale badge — top-left */}
        {saleBadge && (
          <div className="absolute top-2 left-2 flex flex-wrap items-center gap-1.5 z-10">
            <div
              className="
                shadow-lg rounded-full flex items-center justify-center
                px-2 py-1 bg-white/95 backdrop-blur-sm
                transition-transform duration-200 group-hover:scale-105
              "
            >
              <BadgeIcon />
              <span className="ml-1 leading-none text-xs text-red-400 font-bold">
                {saleBadge}
              </span>
            </div>
          </div>
        )}

        {/* Wishlist button — top-right */}
        <div className="absolute top-2 right-2 z-10">
          <button
            type="button"
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              setWishlisted((v) => !v);
            }}
            className="
              w-9 h-9 flex items-center justify-center rounded-full
              bg-neutral-50 shadow-md
              transition-all duration-200
              hover:scale-110 hover:shadow-lg
              active:scale-95
            "
            style={{
              color: wishlisted ? "#ef4444" : "#525252",
            }}
          >
            <HeartIcon filled={wishlisted} />
          </button>
        </div>
      </div>

      {/* ── Content area ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3
          className="
            text-sm font-semibold text-neutral-800 line-clamp-2
            min-h-[2.5rem]
            transition-colors duration-200
            group-hover:text-emerald-700
          "
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-500 mt-1.5 line-clamp-3 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Price row */}
        <div className="mt-auto pt-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-bold text-neutral-800 tabular-nums">
              {price}
            </span>
            {originalPrice && (
              <span className="text-sm text-neutral-400 line-through tabular-nums">
                {originalPrice}
              </span>
            )}
            {discountLabel && (
              <span
                className="
                  text-xs font-medium text-emerald-700
                  bg-emerald-100 px-1.5 py-0.5 rounded
                  transition-colors duration-200
                  group-hover:bg-emerald-200
                "
              >
                {discountLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
