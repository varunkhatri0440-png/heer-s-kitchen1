import type { Metadata, Viewport } from "next";
import { Outfit, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08080a",
};

export const metadata: Metadata = {
  title: "AURELIA | Haute Kitchenware & Precision Culinary Instruments",
  description:
    "Experience the pinnacle of culinary craftsmanship. Featuring the Aurelia Whisk Series and Hydro-Forged Chef's Knife, engineered with cryogenic German steel and aerospace-grade balancing.",
  keywords: [
    "luxury kitchenware",
    "culinary instruments",
    "chef knife",
    "stainless whisk",
    "aurelia kitchen",
    "precision cutlery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${cinzel.variable} ${jetbrainsMono.variable} font-sans bg-[#08080a] text-[#f4f4f5] antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
