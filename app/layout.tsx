import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Rajasthan Aeroskatoball Association | Official State Sports Body",
    template: "%s | Rajasthan Aeroskatoball Association",
  },
  description:
    "Official governing body for Aeroskatoball in Rajasthan. CIN U88900RJ2026NPL112235 (Section 8 NPL). State championships, player rankings, academy affiliation, online registration, and certificate verification.",
  keywords: [
    "Rajasthan Aeroskatoball",
    "RAA",
    "Aeroskatoball Rajasthan",
    "State Sports Federation",
    "Bharatpur Sports",
    "Skating Association Rajasthan",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Rajasthan Aeroskatoball Association",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Razorpay Checkout Script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
