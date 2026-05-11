import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Manager Dashboard | LumosStay",
  description:
    "Manage your properties, rooms, and bookings from the LumosStay hotel manager dashboard.",
  robots: { index: false, follow: false },
};

export default function HotelManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
