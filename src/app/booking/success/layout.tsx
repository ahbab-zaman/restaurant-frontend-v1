import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | LumosStay",
  description:
    "Your LumosStay booking is confirmed. View your reservation details and get ready for your stay.",
  robots: { index: false, follow: false },
};

export default function BookingSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
