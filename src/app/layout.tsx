import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CM Interior Design | Premium Interior Design & Architecture",
  description: "Elevate your space with CM Interior Design. Specialist luxury interior design and turnkey fit-out services for villas, apartments, and commercial properties.",
  openGraph: {
    title: "CM Interior Design | Premium Interior Design & Architecture",
    description: "Elevate your space with CM Interior Design. Specialist luxury interior design and turnkey fit-out services.",
    type: "website",
    locale: "en_US",
    url: "https://cminteriordesign.com",
    siteName: "CM Interior Design",
  },
  twitter: {
    card: "summary_large_image",
    title: "CM Interior Design | Premium Interior Design & Architecture",
    description: "Elevate your space with CM Interior Design. Specialist luxury interior design and turnkey fit-out services.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${cormorantGaramond.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        {/* Felt Grain Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none grain-overlay z-[9999]" />
        
        {/* Navigation Header */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow pb-16 md:pb-0">{children}</main>
        
        {/* Mobile Bottom Fixed Menu */}
        <MobileBottomNav />
        
        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
