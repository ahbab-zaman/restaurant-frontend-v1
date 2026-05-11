import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin Dashboard | LumosStay",
  description:
    "Full platform overview including live revenue, bookings, hotels, rooms, and user management across the entire LumosStay network.",
  robots: { index: false, follow: false },
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
