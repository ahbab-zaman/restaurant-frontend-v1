"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import StarRating from "../ui/StarRating";

const reviews = [
  {
    id: 1,
    name: "Amélie Fontaine",
    avatar: "AF",
    avatarBg: "#C9A96E",
    hotel: "Santorini Clifftop Suite",
    rating: 5,
    text: "Absolutely transcendent. Watching the sun melt into the Aegean from our private pool was a moment we will carry forever. The staff anticipated every wish before we voiced it.",
  },
  {
    id: 2,
    name: "Kenji Watanabe",
    avatar: "KW",
    avatarBg: "#7EB8A4",
    hotel: "Bali Rainforest Retreat",
    rating: 5,
    text: "The sound of the waterfall at dawn, the scent of frangipani — complete sensory bliss. Best booking experience I've ever had. Will return every year without question.",
  },
  {
    id: 3,
    name: "Sofia Marchetti",
    avatar: "SM",
    avatarBg: "#A78BFA",
    hotel: "Swiss Alpine Chalet",
    rating: 5,
    text: "Ski-in/ski-out with a roaring fireplace and fondue on demand. I'm already planning our return trip. The platform made the whole process seamless from search to check-in.",
  },
  {
    id: 4,
    name: "Liam O'Connell",
    avatar: "LO",
    avatarBg: "#FF6B6B",
    hotel: "Maldives Water Bungalow",
    rating: 5,
    text: "Waking up to a glass floor revealing electric-blue water below is surreal. The concierge arranged a midnight snorkelling session — an experience money can rarely buy.",
  },
  {
    id: 5,
    name: "Priya Nair",
    avatar: "PN",
    avatarBg: "#4ECDC4",
    hotel: "Santorini Clifftop Suite",
    rating: 4,
    text: "Impeccable design, warm staff, and unbeatable sunset views. The booking was instant and the price guarantee saved us a considerable amount versus other platforms.",
  },
];

const VISIBLE = 3;

export default function GuestReviews() {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4500);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => {
    stopAutoPlay();
    setCurrent((c) => (c - 1 + total) % total);
    startAutoPlay();
  };

  const next = () => {
    stopAutoPlay();
    setCurrent((c) => (c + 1) % total);
    startAutoPlay();
  };

  // Build the visible indices
  const visibleIndices = Array.from(
    { length: VISIBLE },
    (_, i) => (current + i) % total,
  );

  return (
    <section
      aria-labelledby="reviews-heading"
      className="w-full py-20 px-4 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-3">
            What guests say
          </p>
          <h2
            id="reviews-heading"
            className="text-4xl md:text-5xl font-bold text-neutral-900"
          >
            Voices of Experience
          </h2>
        </motion.div>

        {/* carousel */}
        <div className="relative">
          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visibleIndices.map((idx, pos) => {
                const review = reviews[idx];
                return (
                  <motion.article
                    key={`${idx}-${current}`}
                    initial={{ opacity: 0, x: 40, scale: 0.96 }}
                    animate={{
                      opacity: pos === 1 ? 1 : 0.65,
                      x: 0,
                      scale: pos === 1 ? 1 : 0.97,
                    }}
                    exit={{ opacity: 0, x: -40, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6"
                    aria-label={`Review by ${review.name}`}
                  >
                    <Quote
                      size={28}
                      className="text-neutral-200"
                      strokeWidth={1.5}
                    />

                    <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                      {review.text}
                    </p>

                    <div className="flex items-center gap-3 pt-2 border-t border-neutral-200">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black"
                        style={{ background: review.avatarBg }}
                        aria-hidden="true"
                      >
                        {review.avatar}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">
                          {review.name}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {review.hotel}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <div
              className="flex gap-2"
              role="tablist"
              aria-label="Review navigation"
            >
              {reviews.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  onClick={() => {
                    stopAutoPlay();
                    setCurrent(i);
                    startAutoPlay();
                  }}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "28px" : "8px",
                    background:
                      i === current ? "#C9A96E" : "rgba(115,115,115,0.30)",
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
