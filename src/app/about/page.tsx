"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";
import CurveSeparator from "@/components/CurveSeparator";

export default function AboutPage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowConsultationModal(false);
      setInquiryName("");
      setInquiryPhone("");
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* Section 1: Hero */}
      <section className="relative h-[65vh] min-h-[500px] md:h-[80vh] md:min-h-[650px] w-full flex items-center overflow-hidden">
        <ScrollParallax speed={-0.15} scaleStart={1} scaleEnd={1.12} className="absolute inset-0 z-0 w-full h-full">
          <Image
            alt="CM Interior Design Atelier Story Banner"
            src="/images/banner1.jpg"
            fill
            priority
            quality={95}
            className="object-cover object-bottom"
          />
        </ScrollParallax>
        
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent z-[1] pointer-events-none"></div>
        
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-7xl">
          <div className="max-w-2xl">
            <ScrollReveal animation="slide-up" delay={150} duration={1.2}>
              <span className="text-label-caps font-label-caps text-secondary mb-6 block tracking-[0.3em]">
                ESTABLISHED 2012
              </span>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={300} duration={1.2}>
              <h1 className="font-display-lg text-primary mb-0 leading-none uppercase">
                ABOUT US
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 2: Company Story (Atelier Ethos) - Content Left -> Image Right */}
      <section className="py-section-padding bg-surface-container-lowest relative overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
          <div className="absolute -top-12 -left-20 opacity-5 pointer-events-none hidden md:block">
            <span className="text-[300px] font-display-lg leading-none select-none">DE</span>
          </div>
          
          {/* Left Text Block slides from left */}
          <ScrollReveal animation="slide-left" duration={1.2} className="md:col-span-5 flex flex-col justify-center order-2 md:order-1 mt-12 md:mt-0">
            <h2 className="text-label-caps font-label-caps text-secondary mb-8">WHO WE ARE</h2>
            <h3 className="font-headline-xl text-primary mb-6 leading-tight">
              QUALITY HOMES <br />
              <span className="text-number-outline font-number-outline align-middle italic block py-2 not-italic">SINCE 2012</span>
            </h3>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-10 leading-relaxed">
              We are a local interior design studio with over 10 years of experience. We specialize in designing and building beautiful, practical interiors for homes, apartments, and villas.
            </p>
            <div className="space-y-8 max-w-lg">
              <ScrollReveal animation="slide-up" delay={150} duration={1.0}>
                <h4 className="text-label-caps font-label-caps mb-3">01. WE DESIGN FOR LIFE</h4>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  We design spaces that fit your lifestyle. Whether it&apos;s a cozy bedroom or a full house renovation, we make sure your space is functional, comfortable, and elegant.
                </p>
              </ScrollReveal>
              
              <div className="w-20 h-[1px] bg-outline-variant opacity-30"></div>
              
              <ScrollReveal animation="slide-up" delay={300} duration={1.0}>
                <h4 className="text-label-caps font-label-caps mb-3">02. QUALITY & TRUST</h4>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  We believe in honest pricing, quality materials, and timely delivery. Our experienced team manages everything from start to finish, so you don&apos;t have to worry about anything.
                </p>
              </ScrollReveal>
            </div>
          </ScrollReveal>
          
          {/* Right Image Block slides from right with scroll zoom */}
          <ScrollReveal animation="slide-right" duration={1.2} className="md:col-span-7 relative order-1 md:order-2">
            <div className="relative z-20 overflow-hidden grain-overlay group w-full h-[300px] sm:h-[450px] md:h-[600px]">
              <ScrollParallax speed={-0.08} scaleStart={1.05} scaleEnd={1.15} className="w-full h-full">
                <Image
                  alt="Tactile designer materials mood board with wood, brass, fabric swatches and blueprint sketches"
                  src="/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.05 PM.webp"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </ScrollParallax>
            </div>
            {/* Overlapping Decorative Offset Box */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary-fixed opacity-30 z-10 hidden md:block"></div>
          </ScrollReveal>
        </div>
      </section>

      {/* Curved separator transition into About Company */}
      <CurveSeparator
        type="concave"
        fillClass="fill-background"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* Section 3: About Company - Alternating Stats Row reveals */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-background" id="about-company">
        {/* Section Header */}
        <ScrollReveal animation="slide-up" duration={1.2} className="mb-20 grid grid-cols-12 gap-gutter items-end">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <p className="text-label-caps font-label-caps opacity-60">LEARN MORE ABOUT THE COMPANY</p>
            <h3 className="font-display-lg leading-none uppercase text-primary">
              ABOUT <br /> COMPANY
            </h3>
          </div>
        </ScrollReveal>

        {/* Section Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          {/* Vertical Letters */}
          <ScrollReveal animation="slide-left" duration={1.2} className="col-span-12 md:col-span-2 flex md:flex-col items-center justify-between md:justify-start md:space-y-8 md:pt-8 mb-12 md:mb-0">
            <div className="font-number-outline text-[40px] md:text-[64px] opacity-15 select-none leading-none">D</div>
            <div className="font-number-outline text-[40px] md:text-[64px] opacity-15 select-none leading-none">E</div>
            <div className="font-number-outline text-[40px] md:text-[64px] opacity-15 select-none leading-none">V</div>
            <div className="font-number-outline text-[40px] md:text-[64px] opacity-15 select-none leading-none">.</div>
            <div className="font-number-outline text-[40px] md:text-[64px] opacity-15 select-none leading-none">U</div>
            <div className="font-number-outline text-[40px] md:text-[64px] opacity-15 select-none leading-none">N</div>
          </ScrollReveal>

          {/* 3 Rows of Stats with alternating slide directions */}
          <div className="col-span-12 md:col-span-10 space-y-16">
            {/* Row 1: Image Left slides left, Content Right slides right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-outline-variant/10 pb-12">
              <ScrollReveal animation="slide-left" duration={1.2} className="col-span-12 md:col-span-4 relative h-[180px] md:h-[220px] overflow-hidden shadow-sm bg-surface-container-high grain-overlay hover:shadow-md transition-all duration-500">
                <ScrollParallax speed={-0.08} className="w-full h-full">
                  <Image
                    alt="Design Projects showcase interior"
                    src="/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.12 PM.webp"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </ScrollParallax>
              </ScrollReveal>
              
              <ScrollReveal animation="slide-right" duration={1.2} className="col-span-12 md:col-span-8 md:pl-8 flex flex-col justify-center">
                <span className="text-[40px] md:text-[64px] font-bold text-primary leading-none font-display mb-2">45+</span>
                <h4 className="text-headline-lg font-headline-lg mb-3 uppercase flex items-center gap-4 text-primary">
                  COMPLETED HOMES <span className="w-12 h-[1px] bg-primary/30"></span>
                </h4>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-xl">
                  Over 45 happy families in Calicut, Kerala and neighboring areas.
                </p>
              </ScrollReveal>
            </div>

            {/* Row 2: Image Right slides right, Content Left slides left */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-outline-variant/10 pb-12">
              <ScrollReveal animation="slide-left" duration={1.2} className="col-span-12 md:col-span-8 md:pr-8 flex flex-col justify-center order-2 md:order-1">
                <span className="text-[40px] md:text-[64px] font-bold text-primary leading-none font-display mb-2">20+</span>
                <h4 className="text-headline-lg font-headline-lg mb-3 uppercase flex items-center gap-4 text-primary">
                  OUR TEAM <span className="w-12 h-[1px] bg-primary/30"></span>
                </h4>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-xl">
                  20+ skilled designers, engineers, and project coordinators working for you.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="slide-right" duration={1.2} className="col-span-12 md:col-span-4 relative h-[180px] md:h-[220px] overflow-hidden shadow-sm bg-surface-container-high grain-overlay hover:shadow-md transition-all duration-500 order-1 md:order-2">
                <ScrollParallax speed={-0.08} className="w-full h-full">
                  <Image
                    alt="Design Employees working"
                    src="/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.08 PM.webp"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </ScrollParallax>
              </ScrollReveal>
            </div>

            {/* Row 3: Image Left slides left, Content Right slides right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <ScrollReveal animation="slide-left" duration={1.2} className="col-span-12 md:col-span-4 relative h-[180px] md:h-[220px] overflow-hidden shadow-sm bg-surface-container-high grain-overlay hover:shadow-md transition-all duration-500">
                <ScrollParallax speed={-0.08} className="w-full h-full">
                  <Image
                    alt="Design Contractors team"
                    src="/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM.webp"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </ScrollParallax>
              </ScrollReveal>
              
              <ScrollReveal animation="slide-right" duration={1.2} className="col-span-12 md:col-span-8 md:pl-8 flex flex-col justify-center">
                <span className="text-[40px] md:text-[64px] font-bold text-primary leading-none font-display mb-2">100+</span>
                <h4 className="text-headline-lg font-headline-lg mb-3 uppercase flex items-center gap-4 text-primary">
                  SKILLED WORKERS <span className="w-12 h-[1px] bg-primary/30"></span>
                </h4>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-xl">
                  100+ experienced carpenters, painters, electricians, and technicians.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Curved separator transition into Final CTA */}
      <CurveSeparator
        type="convex"
        fillClass="fill-surface-container"
        bgClass="bg-background"
        className="w-full"
      />

      {/* Section 5: Final CTA */}
      <section className="py-section-padding bg-surface-container relative">
        <div className="px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center">
          <ScrollReveal animation="slide-up" delay={100}>
            <span className="text-label-caps font-label-caps text-secondary mb-8 block">
              START YOUR JOURNEY
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={250}>
            <h2 className="font-display-lg text-primary mb-16 max-w-4xl leading-none">
              READY TO TRANSFORM <br /> <span className="italic font-light">YOUR VISION?</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={400} className="flex flex-col md:flex-row gap-gutter">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="px-16 py-8 border border-primary text-label-caps font-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300 bg-transparent rounded-none cursor-pointer"
            >
              BOOK A CONSULTATION
            </button>
            <Link
              href="/gallery"
              className="px-16 py-8 bg-tertiary text-on-tertiary text-label-caps font-label-caps hover:bg-secondary hover:text-on-secondary transition-all duration-300 rounded-none cursor-pointer decoration-none"
            >
              EXPLORE WORKS
            </Link>
          </ScrollReveal>
          
          <div className="mt-24 pt-12 border-t border-outline-variant/30 w-full flex flex-col md:flex-row justify-between items-center gap-8 text-on-surface-variant/60">
            <ScrollReveal animation="slide-left" delay={500} className="flex gap-12 text-label-caps font-label-caps">
              <a href="#" className="hover:text-primary transition-colors">
                INSTAGRAM
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                PINTEREST
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                LINKEDIN
              </a>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-right" delay={500}>
              <p className="text-body-md font-body-md max-w-sm text-center md:text-right">
                We make sure your home is comfortable, durable, and beautiful. Contact us today for a free chat.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Curved separator transition into global Footer */}
      <CurveSeparator
        type="concave"
        fillClass="fill-tertiary"
        bgClass="bg-surface-container"
        className="w-full"
      />

      {/* Consultation Request Modal Overlay */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-primary/80 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-background text-on-surface p-8 max-w-md w-full relative border border-outline-variant/30">
            <button
              onClick={() => setShowConsultationModal(false)}
              className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-primary hover:text-secondary focus:outline-none cursor-pointer"
              aria-label="Close Modal"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <h3 className="text-headline-lg font-headline-lg mb-6 uppercase tracking-tight">Book Consultation</h3>
            <p className="text-body-md font-body-md text-on-surface-variant mb-6">
              Book a free chat with our design team to discuss your project ideas and budget.
            </p>
            {submitted ? (
              <div className="py-12 text-center text-secondary">
                <span className="material-symbols-outlined text-[64px] mb-4">check_circle</span>
                <p className="text-label-caps font-label-caps">REQUEST SUBMITTED SUCCESSFULLY</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="consult-name" className="text-label-caps font-label-caps block mb-2 opacity-65">Your Name</label>
                  <input
                    id="consult-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-2 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="consult-phone" className="text-label-caps font-label-caps block mb-2 opacity-65">Contact Number</label>
                  <input
                    id="consult-phone"
                    type="tel"
                    required
                    placeholder="+91..."
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-2 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-4 text-label-caps font-label-caps tracking-widest hover:bg-secondary transition-colors cursor-pointer rounded-none border-none"
                >
                  SEND BOOKING
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
