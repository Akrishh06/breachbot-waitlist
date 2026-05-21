import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "@/components/react-bits/PillNav.css";
import "@/components/react-bits/SpotlightCard.css";
import "@/components/react-bits/TextType.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["500", "700", "900"],
});

export const metadata: Metadata = {
  title: "BreachBot Waitlist",
  description:
    "Join the waitlist for BreachBot, an autonomous red-team and QA layer for fast-built apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable}`}>{children}</body>
    </html>
  );
}
