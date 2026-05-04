"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  id: number;
  url: string;
  alt: string;
  featured: string;
  eyebrow: string;
  title: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: [{ label: string; value: string }, { label: string; value: string }];
};

const SLIDES: Slide[] = [
  {
    id: 0,
    url: "/banner-1.jpg",
    alt: "Luxurious hotel lobby with grand chandelier and marble flooring",
    featured: "Most Popular",
    eyebrow: "We didn't change, we evolved",
    title: "Luxury Stays",
    primaryCta: { label: "Book Now", href: "/hotels?category=luxury" },
    secondaryCta: { label: "Browse All Hotels", href: "/hotels" },
    stats: [
      { label: "Properties", value: "24 Hotels" },
      { label: "Check-in", value: "Instant Confirm" },
    ],
  },
  {
    id: 1,
    url: "/banner-2.avif",
    alt: "Elegant hotel dining room with candlelit tables and fine tableware",
    featured: "Guest Favorite",
    eyebrow: "Gather beautifully, every day",
    title: "Dining & Suites",
    primaryCta: { label: "Explore Dining", href: "/hotels?category=dining" },
    secondaryCta: { label: "Browse All Hotels", href: "/hotels" },
    stats: [
      { label: "Restaurants", value: "18 Venues" },
      { label: "Experience", value: "Fine Dining" },
    ],
  },
  {
    id: 2,
    url: "/banner-3.avif",
    alt: "Premium hotel bedroom with king-size bed and panoramic city view",
    featured: "Editor's Pick",
    eyebrow: "Comfort crafted for deep rest",
    title: "Premium Rooms",
    primaryCta: { label: "View Rooms", href: "/hotels?category=rooms" },
    secondaryCta: { label: "Browse All Hotels", href: "/hotels" },
    stats: [
      { label: "Room Types", value: "14 Options" },
      { label: "Perks", value: "Free Breakfast" },
    ],
  },
  {
    id: 3,
    url: "/banner-4.avif",
    alt: "Modern hotel business center with private meeting rooms and city skyline",
    featured: "Business Choice",
    eyebrow: "Focus-ready spaces that inspire",
    title: "Business Hotels",
    primaryCta: { label: "Book Corporate", href: "/hotels?category=business" },
    secondaryCta: { label: "Browse All Hotels", href: "/hotels" },
    stats: [
      { label: "Locations", value: "21 Cities" },
      { label: "Coverage", value: "Nationwide" },
    ],
  },
  {
    id: 4,
    url: "/banner-5.avif",
    alt: "Stunning resort pool terrace with sun loungers and ocean backdrop",
    featured: "Seasonal Deal",
    eyebrow: "Bring resort mood to your stay",
    title: "Resort Collection",
    primaryCta: { label: "Explore Resorts", href: "/hotels?category=resort" },
    secondaryCta: { label: "Browse All Hotels", href: "/hotels" },
    stats: [
      { label: "Resorts", value: "12 Properties" },
      { label: "Booking", value: "Quick Confirm" },
    ],
  },
];

const slideVariants: Variants = {
  enter: { opacity: 0, scale: 1.05 },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};
export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 7000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = useCallback(
    (idx: number) => {
      setCurrent((idx + SLIDES.length) % SLIDES.length);
      resetTimer();
    },
    [resetTimer],
  );

  const active = SLIDES[current];

  return (
    <section className="w-full bg-site-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-stretch">
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative rounded-[28px] overflow-hidden border border-neutral-200/60 shadow-sm group h-full">
              <div className="relative w-full aspect-16/10 bg-neutral-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      fill
                      src={active.url}
                      alt={active.alt}
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                      draggable={false}
                      priority={active.id === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_20%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_60%)]" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {SLIDES.map((slide, i) => (
                      <button
                        key={slide.id}
                        type="button"
                        className="p-1"
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                      >
                        <span
                          className={`block h-1 rounded-full transition-all duration-300 ${
                            i === current
                              ? "w-10 bg-white"
                              : "w-6 bg-white/45 hover:bg-white/70"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goTo(current - 1)}
                      aria-label="Previous slide"
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/15 backdrop-blur-sm inline-flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(current + 1)}
                      aria-label="Next slide"
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/15 backdrop-blur-sm inline-flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 order-2 lg:order-1">
            <motion.div
              key={`content-${active.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="h-full px-5 py-5 md:px-6 md:py-6 bg-white rounded-[28px] border border-neutral-200/70 flex flex-col"
            >
              <div className="text-xs uppercase tracking-wider text-neutral-500">
                {active.featured}
              </div>
              <p className="mt-3 text-sm md:text-base text-neutral-600">
                {active.eyebrow}
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-800 leading-[1.06]">
                {active.title}
              </h1>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  asChild
                  className="rounded-full py-3.5 px-7 h-auto text-sm sm:text-base font-medium bg-[#4b3728] hover:bg-[#3f2f23] text-white"
                >
                  <Link href={active.primaryCta.href}>
                    {active.primaryCta.label}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full py-3.5 px-7 h-auto text-sm sm:text-base font-medium border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
                >
                  <Link href={active.secondaryCta.href}>
                    {active.secondaryCta.label}
                  </Link>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {active.stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-neutral-200/90 bg-white/70 px-4 py-3"
                  >
                    <div className="text-[11px] uppercase tracking-wider text-neutral-500">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-medium text-neutral-800">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
