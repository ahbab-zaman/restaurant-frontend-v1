import type { Metadata } from "next";
import RoomsDashboard from "@/app/components/ui/dashboards/RoomsDashboard";

export const metadata: Metadata = {
  title: "All Rooms | Super Admin – LumosStay",
  description: "Track and manage every room across all hotels on the LumosStay platform with full administrative control.",
  robots: { index: false, follow: false },
};

export default function SuperAdminRoomsPage() {
  return (
    <RoomsDashboard
      title="Rooms"
      description="Track and manage rooms across all hotels with full administrative control."
    />
  );
}
