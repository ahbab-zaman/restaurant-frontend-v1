import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings | LumosStay",
  description:
    "View and manage all your current and past hotel reservations on LumosStay.",
  robots: { index: false, follow: false },
};

export default function AccountBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
