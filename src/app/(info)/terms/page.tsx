import type { Metadata } from "next";
import InfoPage from "../InfoPage";

export const metadata: Metadata = {
  title: "Terms of Service | LumosStay",
  description:
    "Read the LumosStay Terms of Service that govern your use of our hotel booking platform, including booking, payment, and cancellation rules.",
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms"
      overview="By using LumosStay, you agree to our booking, payment, and usage terms."
      details="Please review responsibilities, limitations, and policy updates before making a reservation."
      support="If any term is unclear, contact support for clarification before completing your booking."
    />
  );
}
