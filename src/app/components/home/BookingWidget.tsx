"use client";
import RoomCard from "./RoomCard";
import bannerImage1 from "../../../../public/banner-1.jpg";
// ─── Room data ────────────────────────────────────────────────────────────────

const rooms = [
  {
    id: 1,
    href: "/rooms/deluxe",
    image: bannerImage1,
    imageAlt: "Deluxe Room — modern interiors with city view",
    saleBadge: "10% Sale",
    title: "Deluxe Room",
    description:
      "A stylish room featuring modern interiors, plush bedding, and beautiful city views. Perfect for a relaxing short stay.",
    price: "$108 / night",
    originalPrice: "$120 / night",
    discountLabel: "10% off",
  },
  {
    id: 2,
    href: "/rooms/executive-suite",
    image: "/banner-2.avif",
    imageAlt: "Executive Suite — separate living area with premium amenities",
    saleBadge: "15% Sale",
    title: "Executive Suite",
    description:
      "Spacious suite with a separate living area, premium amenities, and elegant design. Ideal for business travellers and couples.",
    price: "$299 / night",
    originalPrice: "$352 / night",
    discountLabel: "15% off",
  },
  {
    id: 3,
    href: "/rooms/presidential-suite",
    image: "/banner-3.avif",
    imageAlt: "Presidential Suite — expansive luxury accommodation",
    saleBadge: "20% Sale",
    title: "Presidential Suite",
    description:
      "Our most luxurious accommodation offering expansive space, refined interiors, and exceptional comfort for the discerning guest.",
    price: "$655 / night",
    originalPrice: "$820 / night",
    discountLabel: "20% off",
  },
  {
    id: 4,
    href: "/rooms/presidential-suite",
    image: "/banner-4.avif",
    imageAlt: "Presidential Suite — expansive luxury accommodation",
    saleBadge: "20% Sale",
    title: "Presidential Suite",
    description:
      "Our most luxurious accommodation offering expansive space, refined interiors, and exceptional comfort for the discerning guest.",
    price: "$655 / night",
    originalPrice: "$820 / night",
    discountLabel: "20% off",
  },
  {
    id: 5,
    href: "/rooms/presidential-suite",
    image: "/banner-5.avif",
    imageAlt: "Presidential Suite — expansive luxury accommodation",
    saleBadge: "20% Sale",
    title: "Presidential Suite",
    description:
      "Our most luxurious accommodation offering expansive space, refined interiors, and exceptional comfort for the discerning guest.",
    price: "$655 / night",
    originalPrice: "$820 / night",
    discountLabel: "20% off",
  },
  {
    id: 7,
    href: "/rooms/presidential-suite",
    image: "/banner-5.avif",
    imageAlt: "Presidential Suite — expansive luxury accommodation",
    saleBadge: "20% Sale",
    title: "Presidential Suite",
    description:
      "Our most luxurious accommodation offering expansive space, refined interiors, and exceptional comfort for the discerning guest.",
    price: "$655 / night",
    originalPrice: "$820 / night",
    discountLabel: "20% off",
  },
  {
    id: 8,
    href: "/rooms/presidential-suite",
    image: "/banner-5.avif",
    imageAlt: "Presidential Suite — expansive luxury accommodation",
    saleBadge: "20% Sale",
    title: "Presidential Suite",
    description:
      "Our most luxurious accommodation offering expansive space, refined interiors, and exceptional comfort for the discerning guest.",
    price: "$655 / night",
    originalPrice: "$820 / night",
    discountLabel: "20% off",
  },
  {
    id: 6,
    href: "/rooms/presidential-suite",
    image: "/banner-5.avif",
    imageAlt: "Presidential Suite — expansive luxury accommodation",
    saleBadge: "20% Sale",
    title: "Presidential Suite",
    description:
      "Our most luxurious accommodation offering expansive space, refined interiors, and exceptional comfort for the discerning guest.",
    price: "$655 / night",
    originalPrice: "$820 / night",
    discountLabel: "20% off",
  },
];

// ─── Leaf SVG decoration ──────────────────────────────────────────────────────

function LeafDecoration() {
  return (
    <svg
      className="absolute top-0 right-0 opacity-40 pointer-events-none"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 56C30 56 10 42 10 24C10 12 18 4 30 4C42 4 50 12 50 24C50 42 30 56 30 56Z"
        fill="#7a9e7e"
        opacity="0.6"
      />
      <path
        d="M30 4L30 56"
        stroke="#5a7a5e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M30 18C23 16 16 21 14 28"
        stroke="#5a7a5e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M30 28C23 26 17 31 16 38"
        stroke="#5a7a5e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M30 38C25 36 21 40 20 44"
        stroke="#5a7a5e"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function BookingWidget() {
  return (
    <section className="min-h-screen py-14">
      <div>
        {/* Heading */}
        <div className="relative text-center mb-12">
          <h2 className="inline text-[36px] font-bold text-gray-900 leading-tight tracking-tight">
            Recently Booked{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hotels
            </span>
          </h2>
          <LeafDecoration />
        </div>

        {/* Grid of ProductCards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room, i) => (
            <div
              key={room.id}
              className="opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${i * 120}ms`,
                animationFillMode: "forwards",
              }}
            >
              <RoomCard
                href={room.href}
                image={room.image}
                imageAlt={room.imageAlt}
                saleBadge={room.saleBadge}
                title={room.title}
                description={room.description}
                price={room.price}
                originalPrice={room.originalPrice}
                discountLabel={room.discountLabel}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes — move to globals.css in a real project */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}
