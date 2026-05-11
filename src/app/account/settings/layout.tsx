import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | LumosStay",
  description:
    "Manage your LumosStay profile, view upcoming reservations, and update your personal information.",
  robots: { index: false, follow: false },
};

export default function AccountSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
