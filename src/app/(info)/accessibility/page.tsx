import type { Metadata } from "next";
import InfoPage from "../InfoPage";

export const metadata: Metadata = {
  title: "Accessibility Statement | LumosStay",
  description:
    "LumosStay is committed to providing an accessible hotel booking experience for all users, including those using assistive technologies.",
};

export default function AccessibilityPage() {
  return (
    <InfoPage
      title="Accessibility"
      overview="We aim to make our booking experience accessible and easy to navigate for all users."
      details="Our team continuously improves keyboard navigation, readable contrast, and assistive technology support."
      support="If you face an accessibility barrier, contact support so we can assist and improve the experience."
    />
  );
}
