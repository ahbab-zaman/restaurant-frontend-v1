export type NavLink = {
  label: string;
  href: string;
};

/* ======================
   NAVBAR LINKS
====================== */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/* ======================
   FOOTER NAVIGATION
====================== */
export const FOOTER_NAVIGATE: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

/* ======================
   FOOTER CONTACT LINKS
====================== */
export const FOOTER_CONTACT: NavLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "info@elitelodge.com", href: "mailto:info@elitelodge.com" },
  { label: "+44 20 1234 5678", href: "tel:+442012345678" },
  { label: "London, UK", href: "https://maps.google.com" },
];

/* ======================
   FOOTER LEGAL LINKS
====================== */
export const FOOTER_LEGAL: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Terms", href: "/terms" },
];

/* ======================
   BOOKING ROOMS
====================== */
export type Room = {
  id: string;
  name: string;
  availability: "available" | "limited" | "unavailable";
};

export const ROOMS: Room[] = [
  {
    id: "main-hall",
    name: "Main Hall",
    availability: "available",
  },
  {
    id: "garden-terrace",
    name: "Garden Terrace",
    availability: "limited",
  },
  {
    id: "private-suite",
    name: "Private Suite",
    availability: "available",
  },
  {
    id: "rooftop-lounge",
    name: "Rooftop Lounge",
    availability: "unavailable",
  },
];

/* ======================
   TRUST STATS
====================== */

export type TrustStat = {
  label: string;
  value: string;
};
export const TRUST_STATS: TrustStat[] = [
  {
    label: "Years of Excellence",
    value: "35+",
  },
  {
    label: "Happy Guests",
    value: "120K+",
  },
  {
    label: "Luxury Rooms",
    value: "80+",
  },
  {
    label: "Michelin-Level Dining",
    value: "10+",
  },
  {
    label: "Event Spaces",
    value: "25+",
  },
  {
    label: "Awards Won",
    value: "40+",
  },
];
