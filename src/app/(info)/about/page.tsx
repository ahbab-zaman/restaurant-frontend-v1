import type { Metadata } from "next";
import InfoPage from "../InfoPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about LumosStay, the trusted hotel booking platform built on clear pricing, thoughtful service, and reliable reservations for every traveller.",
};

export default function AboutPage() {
  return (
    <InfoPage
      title="About"
      overview="LumosStay helps guests discover trusted stays with a simple and reliable booking flow."
      details="We focus on clear pricing, thoughtful service, and practical tools so you can plan your trip with less effort."
      support="For business or press inquiries, contact our support team through the contact page."
    />
  );
}
