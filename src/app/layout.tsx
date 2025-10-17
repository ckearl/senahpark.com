import type { Metadata, Viewport } from "next";
import { Inter, Shrikhand } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-shrikhand",
});

export const metadata: Metadata = {
  title: "Senah Park - Portfolio",
  description: "MBA student specializing in Finance and Brand Management",
  keywords: ["portfolio", "finance", "brand management", "MBA", "professional"],
  authors: [{ name: "Senah Park Kearl" }],
  icons: {
    icon: '/icon.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${shrikhand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
