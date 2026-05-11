import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Bookings | Super Admin – LumosStay",
  description:
    "Platform-wide booking management and real-time visibility for super administrators.",
  robots: { index: false, follow: false },
};

export default function SuperAdminBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
