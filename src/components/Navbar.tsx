"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { brandName, contactPhoneNumber } from "@/data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDarkHero = pathname.startsWith("/gallery/") && pathname !== "/gallery";

  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.querySelector("section");
      let threshold = 50;
      
      if (firstSection) {
        const sectionHeight = firstSection.offsetHeight;
        if (sectionHeight > 300) {
          threshold = sectionHeight - 80;
        }
      }
      
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check immediately on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: "HOMEPAGE", path: "/" },
    { name: "ABOUT US", path: "/about" },
    { name: "SERVICES", path: "/services" },
    { name: "GALLERY", path: "/gallery" },
    { name: "CONTACTS", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-margin-mobile md:px-margin-desktop transition-all duration-500 ${
          scrolled
            ? "bg-surface border-b border-outline-variant/10 shadow-sm py-4 text-on-surface"
            : `bg-transparent border-b border-transparent py-6 ${isDarkHero ? "text-white" : "text-on-surface"}`
        }`}
      >
        {/* Brand Name */}
        <Link
          href="/"
          className="select-none cursor-pointer flex items-center"
          aria-label="CM Interior Design Homepage"
        >
          <Image
            src="/images/logo.png"
            alt="CM Interior Design"
            width={85}
            height={93}
            priority
            unoptimized
            className={`h-18 md:h-20 w-auto object-contain transition-all duration-500 ${
              isDarkHero && !scrolled ? "brightness-0 invert" : ""
            }`}
          />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex gap-10 items-center">
          {navLinks.map((link) => {
            // Check active route
            const isActive =
              link.path === "/"
                ? pathname === "/"
                : pathname.startsWith(link.path.split("#")[0]) && link.path !== "/";
            
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-[13.5px] font-label-caps tracking-[0.12em] transition-all duration-300 pb-1 cursor-pointer ${
                  isActive
                    ? (isDarkHero && !scrolled ? "text-white border-b border-white" : "text-primary border-b border-primary")
                    : (isDarkHero && !scrolled ? "text-white/80 hover:text-white" : "opacity-80 hover:opacity-100 hover:text-secondary")
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action / Phone Info & Socials */}
        <div className={`hidden lg:flex items-center gap-5 text-[13.5px] font-label-caps tracking-[0.12em] font-bold transition-colors duration-500 ${
          isDarkHero && !scrolled ? "text-white" : "text-primary"
        }`}>
          <a href={`tel:${contactPhoneNumber.replace(/\s+/g, "")}`} className="hover:text-secondary transition-colors">
            {contactPhoneNumber}
          </a>
          <span className="opacity-30 select-none">|</span>
          <a
            href="https://www.instagram.com/interior_designing__work/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors flex items-center"
            aria-label="Instagram Profile"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`lg:hidden p-2 focus:outline-none transition-colors duration-500 ${
            isDarkHero && !scrolled ? "text-white" : "text-primary"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-[28px]">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-surface z-[110] flex flex-col justify-start pt-32 pb-12 px-8 lg:hidden overflow-y-auto transition-all duration-300">
          <div className="absolute top-8 right-8">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-primary focus:outline-none"
            >
              <span className="material-symbols-outlined text-[32px]">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-8 text-left">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[24px] font-display-lg-mobile tracking-tighter ${
                  pathname === link.path.split("#")[0]
                    ? "text-secondary font-bold"
                    : "text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-[1px] w-full bg-outline-variant/30 my-4" />
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-label-caps font-label-caps opacity-50 mb-2">PHONE ENQUIRIES</p>
                <a
                  href={`tel:${contactPhoneNumber.replace(/\s+/g, "")}`}
                  className="text-[20px] font-bold text-primary hover:text-secondary transition-colors"
                >
                  {contactPhoneNumber}
                </a>
              </div>
              <div>
                <p className="text-label-caps font-label-caps opacity-50 mb-2">FOLLOW US</p>
                <a
                  href="https://www.instagram.com/interior_designing__work/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[20px] font-bold text-primary hover:text-secondary transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-secondary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>INSTAGRAM</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
