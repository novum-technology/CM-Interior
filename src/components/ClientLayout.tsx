"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import FloatingContact from "@/components/FloatingContact";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
        <main className="flex-grow flex flex-col">{children}</main>
      </div>
    );
  }

  return (
    <PreloaderWrapper>
      {/* Navigation Header */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow">{children}</main>
      
      {/* Global Footer */}
      <Footer />

      {/* Premium Floating Contact Widgets */}
      <FloatingContact />
    </PreloaderWrapper>
  );
}
