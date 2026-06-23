"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

const INSTAGRAM_URL = "https://www.instagram.com/interior_designing__work/";

const instagramImages = [
  {
    src: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM.webp",
    alt: "Luxury minimalist bedroom suite with bespoke wooden headboard and ambient lighting",
  },
  {
    src: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM (1).webp",
    alt: "Contemporary culinary space with premium white marble waterfall island and brass accents",
  },
  {
    src: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.36 PM.webp",
    alt: "Geometric suspended false ceiling with indirect LED cove lights and dark structural wood details",
  },
  {
    src: "/images/sauna_1.png",
    alt: "Luxury wellness private sauna suite made from warm cedar timber panels",
  },
  {
    src: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM (1).webp",
    alt: "Premium double-layer beige linen curtains draped in a high-ceiling residential room",
  },
  {
    src: "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.12 PM (1).webp",
    alt: "Sleek double washbasin vanity with integrated backlit mirrors and black matte fixtures",
  },
];

// SVG Icon Component for Instagram
export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

export default function InstagramSection() {
  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest overflow-hidden border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal animation="slide-up" duration={1.0}>
            <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.25em]">
              OUR INSTAGRAM
            </span>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={150} duration={1.0}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif-display font-light uppercase text-primary leading-none mb-6">
              FOLLOW US ON <br />
              <span className="italic font-light">INSTAGRAM</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={300} duration={1.0}>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
              Follow us on Instagram to see our latest interior projects, behind-the-scenes work, and design tips.
            </p>
          </ScrollReveal>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {instagramImages.map((img, index) => (
            <ScrollReveal
              key={index}
              animation="scale"
              delay={index * 100}
              duration={1.0}
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-square w-full overflow-hidden bg-surface-container-high border border-outline-variant/15 shadow-sm"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="text-on-primary bg-secondary/80 p-3 rounded-full scale-75 group-hover:scale-100 transition-all duration-400 ease-out shadow-lg">
                    <InstagramIcon className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <ScrollReveal animation="slide-up" delay={200} duration={1.0}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-on-primary px-10 py-5 font-label-caps text-label-caps hover:bg-secondary hover:text-on-secondary transition-all duration-300 active:scale-95 cursor-pointer rounded-none border border-primary hover:border-secondary no-underline font-bold"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>FOLLOW @INTERIOR_DESIGNING__WORK</span>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
