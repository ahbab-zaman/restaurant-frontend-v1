import type { Metadata } from "next";
import InfoPage from "../InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy | LumosStay",
  description:
    "Understand how LumosStay collects, uses, and protects your personal data in full compliance with applicable privacy regulations.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy"
      overview="We collect only the information needed to process bookings and improve service quality."
      details="Personal data is handled securely and shared only when required to provide your reservation."
      support="For data requests or privacy concerns, contact support and include your account email."
    />
  );
}
