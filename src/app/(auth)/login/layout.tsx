import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | LumosStay",
  description:
    "Sign in to your LumosStay account to manage bookings, access exclusive deals, and continue your seamless hotel booking experience.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
