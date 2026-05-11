import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | LumosStay",
  description:
    "Update your name, email, and personal details on your LumosStay account.",
  robots: { index: false, follow: false },
};

export default function AccountEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
