"use client";

import { motion, type Variants } from "framer-motion";
import {
  RefreshCcw,
  Headphones,
  Zap,
  ShieldCheck,
  MapPin,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: RefreshCcw,
    title: "Free Cancellation",
    description:
      "Change of plans? Cancel up to 24 hours before check-in with zero charges — always.",
    accent: "#7EB8A4",
  },
  {
    icon: Headphones,
    title: "24 / 7 Support",
    description:
      "Our concierge team is on call around the clock, every day, in 12 languages.",
    accent: "#C9A96E",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description:
      "Booking confirmed in seconds. Your voucher arrives before you leave the page.",
    accent: "#E8B84B",
  },
  {
    icon: ShieldCheck,
    title: "Lowest Price Guarantee",
    description:
      "Find it cheaper elsewhere and we'll match the rate — and give you 10% off on top.",
    accent: "#A78BFA",
  },
  {
    icon: MapPin,
    title: "Handpicked Properties",
    description:
      "Every listing is personally vetted by our travel editors for quality and authenticity.",
    accent: "#FF6B6B",
  },
  {
    icon: Sparkles,
    title: "Exclusive Member Perks",
    description:
      "Early check-in, room upgrades, and welcome amenities — reserved for our members.",
    accent: "#4ECDC4",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const iconBounce: Variants = {
  rest: { y: 0 },
  hover: {
    y: [-4, 2, -2, 0],
    transition: {
      duration: 0.55,
      times: [0, 0.4, 0.7, 1],
      ease: "easeInOut",
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-heading"
      className="w-full py-20 px-4"
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
          <p
            className="text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-3"
          >
            Our Promise
          </p>
          <h2
            id="why-heading"
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
          >
            Why Choose Us
          </h2>
          <p
            className="max-w-xl mx-auto text-sm text-neutral-600 leading-relaxed"
          >
            Every detail of your journey — from first click to final checkout —
            is crafted with care.
          </p>
        </motion.div>

        {/* grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map(({ icon: Icon, title, description, accent }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 cursor-default transition-all duration-300 hover:border-neutral-300"
              style={{
                ["--accent" as string]: accent,
              }}
              aria-label={title}
            >
              {/* card glow */}
              <span
                className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: accent }}
              />

              {/* icon */}
              <motion.span
                variants={iconBounce}
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${accent}18` }}
              >
                <Icon size={22} style={{ color: accent }} strokeWidth={1.6} />
              </motion.span>

              <h3
                className="text-base font-semibold text-neutral-900 mb-2"
              >
                {title}
              </h3>
              <p
                className="text-sm text-neutral-600 leading-relaxed"
              >
                {description}
              </p>

              {/* bottom accent */}
              <span
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, ${accent}, transparent)`,
                }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
