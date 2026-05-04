import type {
  Room,
  Occasion,
  TrustStat,
  ExpectItem,
  FlowStep,
  NavLink,
} from "@/types/index";

// ── Navigation ───────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Dining", href: "#rooms" },
  { label: "Rooms", href: "#rooms" },
  { label: "Events", href: "#occasions" },
  { label: "About", href: "#about" },
];

// ── Rooms ────────────────────────────────────────────────────────
export const ROOMS: Room[] = [
  {
    id: "main-dining",
    name: "Main Dining Room",
    description:
      "Our signature space with panoramic city views and oak-panelled walls. The heart of EliteLodge.",
    capacity: { min: 1, max: 8 },
    amenities: ["City View", "Natural Light", "Full Bar"],
    availability: "available",
    imageAlt: "Main dining room with panoramic city views",
  },
  {
    id: "wine-cellar",
    name: "The Wine Cellar",
    description:
      "Intimate and exclusive. A candlelit chamber lined with over 2,000 bottles from our world-class cellar.",
    capacity: { min: 6, max: 20 },
    amenities: ["Private", "Wine Tasting", "AV System", "Dedicated Server"],
    availability: "limited",
    imageAlt: "Intimate wine cellar private dining room",
  },
  {
    id: "garden-terrace",
    name: "Garden Terrace",
    description:
      "Al fresco dining surrounded by sculpted hedgerows and seasonal botanicals beneath the open sky.",
    capacity: { min: 2, max: 12 },
    amenities: ["Outdoor", "Heaters", "Garden Views"],
    availability: "available",
    imageAlt: "Garden terrace dining surrounded by botanicals",
  },
];

// ── Time Slots ───────────────────────────────────────────────────
export const LUNCH_SLOTS = [
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
];

export const DINNER_SLOTS = [
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

// ── Occasions ────────────────────────────────────────────────────
export const OCCASIONS: Occasion[] = [
  {
    id: "birthday",
    label: "Birthdays & Anniversaries",
    description:
      "We craft bespoke menus, personalised amenities, and surprises that make milestones unforgettable.",
  },
  {
    id: "business",
    label: "Business Entertainment",
    description:
      "Impress clients in our private Wine Cellar. AV facilities and a dedicated sommelier at your disposal.",
  },
  {
    id: "date",
    label: "Romantic Evenings",
    description:
      "Candlelit tables, curated tasting menus, and a team devoted to making the evening perfect.",
  },
  {
    id: "celebration",
    label: "Private Events & Gatherings",
    description:
      "From intimate suppers to exclusive receptions, our team orchestrates every detail flawlessly.",
  },
];

// ── Trust Stats ──────────────────────────────────────────────────
export const TRUST_STATS: TrustStat[] = [
  { value: "37", label: "Years of Excellence" },
  { value: "3", label: "Private Dining Rooms" },
  { value: "4.9", label: "Guest Rating" },
];

// ── What To Expect ────────────────────────────────────────────────
export const EXPECT_ITEMS: ExpectItem[] = [
  {
    id: "arrival",
    title: "Arrival Time",
    description:
      "Please arrive 10 minutes before your booking. Your table is held for 15 minutes.",
    icon: "clock",
  },
  {
    id: "dress",
    title: "Dress Code",
    description:
      "Smart casual minimum. Jackets recommended for the Main Dining Room and Wine Cellar.",
    icon: "dress",
  },
  {
    id: "parking",
    title: "Parking",
    description:
      "Complimentary valet parking available from 6 PM. Street parking available on Manor Lane.",
    icon: "parking",
  },
  {
    id: "requests",
    title: "Special Requests",
    description:
      "Dietary requirements, allergens, and personal touches are noted during booking.",
    icon: "star",
  },
];

// ── Reservation Flow Steps ────────────────────────────────────────
export const FLOW_STEPS: FlowStep[] = [
  {
    number: "I",
    name: "Choose Date",
    description: "Select your preferred evening",
  },
  {
    number: "II",
    name: "Select Time",
    description: "Lunch or dinner sittings",
  },
  {
    number: "III",
    name: "Your Details",
    description: "Dietary notes, occasion",
  },
  { number: "IV", name: "Review", description: "Confirm everything" },
  { number: "V", name: "Confirmed", description: "Your table is reserved" },
];

// ── Cancellation Policy ───────────────────────────────────────────
export const CANCELLATION_POLICY =
  "Reservations may be cancelled up to 24 hours in advance at no charge. Late cancellations and no-shows incur a £25 per-person fee. For groups of 8 or more, 48 hours notice is required.";

// ── Footer Links ──────────────────────────────────────────────────
export const FOOTER_NAVIGATE = [
  { label: "Dining Rooms", href: "#rooms" },
  { label: "Private Events", href: "#occasions" },
  { label: "The Menu", href: "#menu" },
  { label: "Wine List", href: "#wine" },
];

export const FOOTER_CONTACT = [
  { label: "+44 20 7946 0391", href: "tel:+442079460391" },
  {
    label: "reservations@elitelodge.co.uk",
    href: "mailto:reservations@elitelodge.co.uk",
  },
  { label: "12 Manor Lane, London EC1A", href: "#" },
];

