import type { Metadata } from "next";
import InfoPage from "../InfoPage";

export const metadata: Metadata = {
  title: "Contact Us | LumosStay Support",
  description:
    "Get in touch with the LumosStay support team for booking assistance, account questions, or business enquiries. We're here to help.",
};

export default function ContactPage() {
  return (
    <InfoPage
      title="Contact"
      overview="Our team is available to help with booking questions and account issues."
      details="Share your reservation ID, email, and a short message so we can resolve your request faster."
      support="Email support@lumosstay.com and we will respond as soon as possible."
    />
  );
}
