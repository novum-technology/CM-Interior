import Link from "next/link";
import Image from "next/image";
import { brandName, contactPhoneNumber, contactEmail } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="w-full bg-tertiary text-on-tertiary py-section-padding px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-gutter items-start border-t border-outline-variant/10">
      {/* Brand & Narrative */}
      <div className="space-y-8">
        <Link href="/" className="select-none cursor-pointer block">
          <Image
            src="/images/logo.png"
            alt="CM Interior Design"
            width={120}
            height={132}
            unoptimized
            className="h-26 md:h-28 w-auto object-contain brightness-0 invert"
          />
        </Link>
        <p className="text-body-md font-body-md opacity-60 max-w-xs">
          Crafting luxury spaces through architectural precision, silent aesthetics, and warm minimalist elegance since 2012.
        </p>
      </div>

      {/* Social Links */}
      <div className="flex flex-col gap-4">
        <span className="text-label-caps font-label-caps text-on-tertiary-container mb-2 opacity-50">SOCIAL</span>
        <a href="#" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
          INSTAGRAM
        </a>
        <a href="#" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
          PINTEREST
        </a>
        <a href="#" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
          BEHANCE
        </a>
        <a href="#" className="text-body-md opacity-80 hover:text-secondary-fixed transition-colors">
          LINKEDIN
        </a>
      </div>

      {/* Call to Action / Info */}
      <div className="flex flex-col gap-8 lg:items-end justify-between h-full w-full">
        <div className="lg:text-right space-y-4">
          <span className="text-label-caps font-label-caps text-on-tertiary-container block opacity-50">GET IN TOUCH</span>
          <a
            href={`tel:${contactPhoneNumber.replace(/\s+/g, "")}`}
            className="text-headline-lg font-headline-lg hover:text-secondary-fixed transition-colors tracking-tight block"
          >
            {contactPhoneNumber}
          </a>
          <a
            href={`mailto:${contactEmail}`}
            className="text-body-md opacity-75 hover:text-secondary-fixed transition-colors block"
          >
            {contactEmail}
          </a>
        </div>

        <div className="flex flex-col gap-4 lg:items-end w-full pt-8 lg:pt-0">
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-on-tertiary/20 flex items-center justify-center hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all" aria-label="Send Inquiry">
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-on-tertiary/20 flex items-center justify-center hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all" aria-label="Share Website">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
          <div className="text-label-caps font-label-caps opacity-40 lg:text-right">
            © {new Date().getFullYear()} {brandName} INTERIOR DESIGN. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
