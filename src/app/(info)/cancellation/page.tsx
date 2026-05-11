import type { Metadata } from "next";
import InfoPage from "../InfoPage";

export const metadata: Metadata = {
  title: "Cancellation Policy | LumosStay",
  description:
    "Review LumosStay's cancellation and refund policy. Understand your options and deadlines when modifying or cancelling a hotel booking.",
};

export default function CancellationPage() {
  return (
    <InfoPage
      title="Cancellation"
      overview="Cancellation options depend on the policy selected during checkout."
      details="Review your booking confirmation for exact deadlines, refund rules, and any applicable fees."
      support="If a plan changes unexpectedly, contact support and we will guide you through available options."
    />
  );
}
