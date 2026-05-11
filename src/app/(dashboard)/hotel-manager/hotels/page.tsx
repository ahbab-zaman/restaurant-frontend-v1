import type { Metadata } from "next";
import HotelsDashboard from "@/app/components/ui/dashboards/HotelsDashboard";

export const metadata: Metadata = {
  title: "My Hotels | Hotel Manager – LumosStay",
  description: "View and manage all hotel properties assigned to your account on the LumosStay hotel manager portal.",
  robots: { index: false, follow: false },
};

export default function HotelManagerHotelsPage() {
  return (
    <HotelsDashboard
      title="Hotels"
      description="Manage your hotel records with live create, update, and delete operations."
    />
  );
}
