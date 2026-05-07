"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
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

export default function GuestReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeReviews = [...reviews, ...reviews];

  const scrollTrack = (direction: "left" | "right") => {
    const node = trackRef.current;
    if (!node) return;

    const amount = Math.round(node.clientWidth * 0.45);
    node.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

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
            className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100"
          >
            Voices of Experience
          </h2>
        </motion.div>

        {/* marquee */}
        <div className="relative">
          <div
            ref={trackRef}
            className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <motion.div
              className="flex w-max gap-5 py-1"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {marqueeReviews.map((review, idx) => (
                <article
                  key={`${review.id}-${idx}`}
                  className="relative flex w-[86vw] max-w-[460px] shrink-0 flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:w-[70vw] md:w-[420px] dark:border-neutral-700 dark:bg-neutral-900"
                  aria-label={`Review by ${review.name}`}
                >
                  <Quote
                    size={28}
                    className="text-neutral-200 dark:text-neutral-700"
                    strokeWidth={1.5}
                  />

                  <p className="text-sm text-neutral-600 leading-relaxed flex-1 dark:text-neutral-300">
                    {review.text}
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black"
                      style={{ background: review.avatarBg }}
                      aria-hidden="true"
                    >
                      {review.avatar}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {review.name}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {review.hotel}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          {/* controls */}
          <div className="mt-10 hidden items-center justify-center gap-4 md:flex">
            <button
              onClick={() => scrollTrack("left")}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              Guest stories
            </span>

            <button
              onClick={() => scrollTrack("right")}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
