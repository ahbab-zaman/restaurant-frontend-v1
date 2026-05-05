import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import LayoutShell from "./layout/LayoutShell";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LumosStay",
  description:
    "Discover handpicked hotels and extraordinary stays, curated for the discerning traveller.",
  icons: {
    icon: "/reception.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <AppProviders>
          <LayoutShell>{children}</LayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
