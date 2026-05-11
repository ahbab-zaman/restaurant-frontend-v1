import type { Metadata } from "next";
import InfoPage from "../InfoPage";

export const metadata: Metadata = {
  title: "Cookie Policy | LumosStay",
  description:
    "Learn how LumosStay uses cookies to keep your session secure, remember preferences, and deliver a faster booking experience.",
};

export default function CookiesPage() {
  return (
    <InfoPage
      title="Cookies"
      overview="Cookies help us keep sessions secure, remember preferences, and improve performance."
      details="You can adjust browser settings to control cookie behavior, but some features may be limited."
      support="For more details about cookie usage, contact support and request our cookie information guide."
    />
  );
}
