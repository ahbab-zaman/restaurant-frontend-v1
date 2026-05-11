import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Hotels | LumosStay",
  description:
    "Explore our curated collection of premium hotels. Filter by location, price, and amenities to find the perfect property for your next stay.",
};

export default function HotelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
