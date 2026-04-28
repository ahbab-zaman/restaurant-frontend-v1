"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePartySize } from "@/app/hooks/usePartySize";
import { GoldButton } from "@/app/components/ui/GoldButton";
import { ROOMS } from "@/app/lib/constants";
import { getTodayString } from "@/app/lib/utils";

export function BookingWidget() {
  const router = useRouter();
  const today = getTodayString();
  const [date, setDate] = useState(today);
  const [roomId, setRoomId] = useState("");
  const { partySize, increment, decrement, isAtMin, isAtMax, isLargeParty } =
    usePartySize({ initial: 2, min: 1, max: 20 });

  const handleCheckAvailability = () => {
    const params = new URLSearchParams({
      date,
      guests: partySize.toString(),
      ...(roomId && { room: roomId }),
    });
    router.push(`/reserve?${params.toString()}`);
  };

  return (
    <section
      id="booking-widget"
      className="mx-12 reveal"
      aria-label="Make a reservation"
    >
      <div
        className="relative"
        style={{
          background: "var(--color-surface-raised)",
          border: "0.5px solid var(--color-border-default)",
        }}
      >
        {/* Floating label */}
        <span
          className="absolute -top-[11px] left-12 text-[11px] tracking-[0.22em] uppercase px-3"
          style={{
            color: "var(--color-brand-secondary)",
            background: "var(--color-surface-raised)",
            fontFamily: "var(--font-body)",
          }}
        >
          Reserve Your Table
        </span>

        <div className="grid grid-cols-[1fr_1fr_1fr_auto]">
          {/* Date */}
          <fieldset
            className="px-6 py-5"
            style={{
              borderRight: "0.5px solid var(--color-border-default)",
              border: "none",
            }}
          >
            <label
              htmlFor="res-date"
              className="block text-[10px] tracking-[0.22em] uppercase mb-2"
              style={{
                color: "var(--color-brand-secondary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Date
            </label>
            <input
              id="res-date"
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border-none outline-none font-display text-[20px] font-light cursor-pointer"
              style={{ color: "var(--color-text-primary)" }}
              aria-label="Reservation date"
            />
          </fieldset>

          {/* Guests */}
          <div
            className="px-6 py-5"
            style={{ borderRight: "0.5px solid var(--color-border-default)" }}
          >
            <p
              className="text-[10px] tracking-[0.22em] uppercase mb-2"
              style={{
                color: "var(--color-brand-secondary)",
                fontFamily: "var(--font-body)",
              }}
              id="guests-label"
            >
              Guests
            </p>
            <div
              className="flex items-center gap-4"
              role="group"
              aria-labelledby="guests-label"
            >
              <button
                onClick={decrement}
                disabled={isAtMin}
                aria-label={`Decrease guests, currently ${partySize}`}
                className="w-7 h-7 flex items-center justify-center text-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  border: "0.5px solid var(--color-border-default)",
                  background: "transparent",
                  color: "var(--color-brand-secondary)",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => {
                  if (!isAtMin) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--color-brand-secondary)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--color-brand-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-brand-secondary)";
                }}
              >
                −
              </button>

              <output
                aria-live="polite"
                aria-label={`${partySize} guests`}
                className="font-display text-[24px] font-light min-w-[28px] text-center"
                style={{ color: "var(--color-text-primary)" }}
              >
                {partySize}
              </output>

              <button
                onClick={increment}
                disabled={isAtMax}
                aria-label="Increase guests"
                className="w-7 h-7 flex items-center justify-center text-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  border: "0.5px solid var(--color-border-default)",
                  background: "transparent",
                  color: "var(--color-brand-secondary)",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => {
                  if (!isAtMax) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--color-brand-secondary)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--color-brand-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-brand-secondary)";
                }}
              >
                +
              </button>
            </div>

            {isLargeParty && (
              <p
                className="text-[10px] mt-1 tracking-wide"
                style={{
                  color: "var(--color-state-warning)",
                  fontFamily: "var(--font-body)",
                }}
                role="note"
              >
                Large party — contact us directly
              </p>
            )}
          </div>

          {/* Room */}
          <div
            className="px-6 py-5"
            style={{ borderRight: "0.5px solid var(--color-border-default)" }}
          >
            <label
              htmlFor="room-select"
              className="block text-[10px] tracking-[0.22em] uppercase mb-2"
              style={{
                color: "var(--color-brand-secondary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Room
            </label>
            <select
              id="room-select"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-transparent border-none outline-none font-display text-[20px] font-light cursor-pointer appearance-none"
              style={{ color: "var(--color-text-primary)" }}
              aria-label="Select dining room"
            >
              <option
                value=""
                style={{ background: "var(--color-surface-raised)" }}
              >
                Any room
              </option>
              {ROOMS.map((room) => (
                <option
                  key={room.id}
                  value={room.id}
                  disabled={room.availability === "unavailable"}
                  style={{ background: "var(--color-surface-raised)" }}
                >
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* CTA */}
          <GoldButton
            size="lg"
            onClick={handleCheckAvailability}
            className="self-stretch rounded-none"
            aria-label="Check availability and proceed to reservation"
          >
            Check Availability →
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
