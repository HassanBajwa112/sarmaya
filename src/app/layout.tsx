import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { POSITIONING } from "@/lib/data/listings";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Sarmaya — Growth investment into Pakistan",
    template: "%s · Sarmaya",
  },
  description: POSITIONING,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SiteNav />
        <main className="flex-1 pt-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
