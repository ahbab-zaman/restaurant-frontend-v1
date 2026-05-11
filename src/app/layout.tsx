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
  title: {
    default: "LumosStay | Find & Book Premium Hotel Stays",
    template: "%s | LumosStay",
  },
  description:
    "Discover handpicked hotels and extraordinary stays, curated for the discerning traveller. Search, compare, and book your perfect room in seconds.",
  keywords: [
    "hotel booking",
    "luxury hotels",
    "find hotels",
    "book a room",
    "LumosStay",
    "hotel reservations",
    "premium stays",
  ],
  authors: [{ name: "LumosStay" }],
  creator: "LumosStay",
  metadataBase: new URL("https://lumosstay.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumosstay.com",
    siteName: "LumosStay",
    title: "LumosStay | Find & Book Premium Hotel Stays",
    description:
      "Discover handpicked hotels and extraordinary stays, curated for the discerning traveller.",
    images: [
      {
        url: "/reception.png",
        width: 1200,
        height: 630,
        alt: "LumosStay – Premium Hotel Booking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LumosStay | Find & Book Premium Hotel Stays",
    description:
      "Discover handpicked hotels and extraordinary stays, curated for the discerning traveller.",
    images: ["/reception.png"],
  },
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
