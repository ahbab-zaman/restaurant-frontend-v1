import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Details | LumosStay",
  description:
    "Explore room options, amenities, guest reviews, and live pricing for this hotel. Book your stay directly with instant confirmation on LumosStay.",
};

export default function HotelDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
