import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve Your Stay | LumosStay",
  description:
    "Complete your hotel room reservation securely. Enter your stay details and payment information to confirm your booking with instant confirmation.",
  robots: { index: false, follow: false },
};

export default function CheckoutStartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
