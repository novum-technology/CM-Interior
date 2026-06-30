import Link from "next/link";
import Image from "next/image";
import { brandName, contactPhoneNumber, contactEmail, contactAddress } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="w-full bg-tertiary text-on-tertiary py-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-gutter items-start">
          
          {/* Left Column - Logo & Address */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="select-none cursor-pointer block w-fit">
              <Image
                src="/images/CMlogo Transparent.png"
                alt="CM Interior Design"
                width={300}
                height={300}
                unoptimized
                className="h-48 md:h-64 w-auto object-contain"
              />
            </Link>
            <p className="text-body-md font-body-md opacity-60 leading-relaxed max-w-xs">
              {contactAddress}, India<br />
              Designing beautiful, comfortable, and modern spaces for your home.
            </p>
          </div>

          {/* Right Column - CTA and 3 Columns Grid */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full">
            {/* Top row with Call-to-action button */}
            <div className="flex justify-start lg:justify-end mb-12">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-4 font-label-caps text-label-caps hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all active:scale-95 no-underline font-bold tracking-wider rounded-none text-center inline-block"
              >
                Free Consultation
              </Link>
            </div>

            {/* Three links lists */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-x-8">
              
              {/* Column 1: Contact */}
              <div className="flex flex-col gap-4">
                <span className="text-label-caps font-label-caps text-on-tertiary-container mb-2 opacity-50 block">
                  Contact
                </span>
                <a
                  href={`tel:${contactPhoneNumber.replace(/\s+/g, "")}`}
                  className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-secondary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>{contactPhoneNumber}</span>
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-secondary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>{contactEmail}</span>
                </a>
              </div>

              {/* Column 2: Menu */}
              <div className="flex flex-col gap-4">
                <span className="text-label-caps font-label-caps text-on-tertiary-container mb-2 opacity-50 block">
                  Menu
                </span>
                <Link href="/" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
                  Homepage
                </Link>
                <Link href="/about" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
                  About Us
                </Link>
                <Link href="/services" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
                  Services
                </Link>
                <Link href="/gallery" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
                  Gallery
                </Link>
                <Link href="/contact" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
                  Contacts
                </Link>
              </div>

              {/* Column 3: Socials */}
              <div className="flex flex-col gap-4">
                <span className="text-label-caps font-label-caps text-on-tertiary-container mb-2 opacity-50 block">
                  Socials
                </span>
                <a
                  href="https://www.instagram.com/interior_designing__work/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-secondary-fixed-dim"
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
                  <span>Instagram</span>
                </a>
                <a href="#" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
                  Pinterest
                </a>
                <a href="#" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
                  Behance
                </a>
                <a href="#" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
                  LinkedIn
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom copyright & policies row */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-label-caps font-label-caps text-[11px] opacity-50 tracking-wider">
          <div>
            © {new Date().getFullYear()} {brandName}. All Rights Reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-secondary-fixed transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-secondary-fixed transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
