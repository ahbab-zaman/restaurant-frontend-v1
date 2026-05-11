import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | LumosStay",
  description:
    "Join LumosStay and start booking premium hotel stays. Create your free account to access exclusive rates and manage all your reservations in one place.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
