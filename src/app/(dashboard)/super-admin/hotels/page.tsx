import type { Metadata } from "next";
import HotelsDashboard from "@/app/components/ui/dashboards/HotelsDashboard";

export const metadata: Metadata = {
  title: "All Hotels | Super Admin – LumosStay",
  description: "View, create, update, and delete all hotel properties registered on the LumosStay platform.",
  robots: { index: false, follow: false },
};

export default function SuperAdminHotelsPage() {
  return (
    <HotelsDashboard
      title="Hotels"
      description="Track, create, update, and delete hotels across all managed properties."
    />
  );
}
