"use client";

import { motion } from "framer-motion";
import { Building2, Star, Users, BadgeCheck } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "Curated Hotels",
    accent: "#C9A96E",
  },
  {
    icon: Star,
    value: "4.9 ★",
    label: "Average Rating",
    accent: "#E8B84B",
  },
  {
    icon: Users,
    value: "50k+",
    label: "Happy Guests",
    accent: "#7EB8A4",
  },
  {
    icon: BadgeCheck,
    value: "Best Price",
    label: "Guarantee",
    accent: "#A78BFA",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TrustBar() {
  return (
    <section
      aria-label="Trust and social proof statistics"
      className="w-full border-y border-neutral-200 py-14 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium mb-10"
        >
          Trusted by travellers worldwide
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map(({ icon: Icon, value, label, accent }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 py-8 cursor-default overflow-hidden"
            >
              {/* glow blob */}
              <span
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: accent }}
              />

              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${accent}18` }}
              >
                <Icon size={22} style={{ color: accent }} strokeWidth={1.6} />
              </span>

              <p
                className="text-3xl font-bold text-neutral-900 leading-none tracking-tight"
              >
                {value}
              </p>
              <p
                className="text-xs text-neutral-500 tracking-widest uppercase"
              >
                {label}
              </p>

              {/* bottom accent line */}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-500 rounded-full"
                style={{ background: accent }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
