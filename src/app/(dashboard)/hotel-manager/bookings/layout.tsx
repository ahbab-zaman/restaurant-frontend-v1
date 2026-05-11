import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookings | Hotel Manager – LumosStay",
  description:
    "View and manage booking requests for your hotel properties in real time.",
  robots: { index: false, follow: false },
};

export default function HotelManagerBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
