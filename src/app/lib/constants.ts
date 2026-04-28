export type NavLink = {
  label: string;
  href: string;
};

/* ======================
   NAVBAR LINKS
====================== */
export const NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Rooms",
    href: "/rooms",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/* ======================
   FOOTER NAVIGATION
====================== */
export const FOOTER_NAVIGATE: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Rooms",
    href: "/rooms",
  },
  {
    label: "Dining",
    href: "/dining",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
];

/* ======================
   FOOTER CONTACT LINKS
====================== */
export const FOOTER_CONTACT: NavLink[] = [
  {
    label: "Contact Us",
    href: "/contact",
  },
  {
    label: "info@elitelodge.com",
    href: "mailto:info@elitelodge.com",
  },
  {
    label: "+44 20 1234 5678",
    href: "tel:+442012345678",
  },
  {
    label: "London, UK",
    href: "https://maps.google.com",
  },
];

/* ======================
   FOOTER LEGAL LINKS
====================== */
export const FOOTER_LEGAL: NavLink[] = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Accessibility",
    href: "/accessibility",
  },
  {
    label: "Terms",
    href: "/terms",
  },
];
