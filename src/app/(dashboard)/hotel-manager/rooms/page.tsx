import type { Metadata } from "next";
import RoomsDashboard from "@/app/components/ui/dashboards/RoomsDashboard";

export const metadata: Metadata = {
  title: "My Rooms | Hotel Manager – LumosStay",
  description: "Add, edit, and manage rooms for your hotel properties on the LumosStay hotel manager portal.",
  robots: { index: false, follow: false },
};

export default function HotelManagerRoomsPage() {
  return (
    <RoomsDashboard
      title="Rooms"
      description="Manage rooms for your hotels with live create, update, and delete operations."
    />
  );
}
