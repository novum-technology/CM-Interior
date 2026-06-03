"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services, openingHours } from "@/data/portfolioData";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";

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
      <section className="relative h-screen min-h-[700px] w-full flex items-center overflow-hidden">
        <ScrollParallax speed={-0.15} scaleStart={1} scaleEnd={1.12} className="absolute inset-0 z-0 w-full h-full opacity-90">
          <Image
            alt="Grand architectural living room with soaring ceilings and soft natural sunlight"
            src="/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.11 PM.webp"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </ScrollParallax>
        
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent z-[2]"></div>
        
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-7xl">
          <div className="max-w-2xl">
            <ScrollReveal animation="slide-up" delay={150} duration={1.2}>
              <span className="text-label-caps font-label-caps text-secondary mb-6 block tracking-[0.3em]">
                ESTABLISHED 2012
              </span>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={300} duration={1.2}>
              <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-8 leading-none">
                ARCHITECTURAL <br />
                <span className="italic font-light">EXCELLENCE</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={450} duration={1.2}>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-md mb-12">
                CM Interior Design is an award-winning interior design studio committed to crafting environments that balance functional precision with soulful artistry.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={600} duration={1.2}>
              <a
                href="#services"
                className="inline-flex items-center gap-4 py-4 px-10 border border-primary text-label-caps font-label-caps hover:bg-primary hover:text-on-primary transition-all duration-500 rounded-none cursor-pointer decoration-none"
              >
                OUR APPROACH <span className="material-symbols-outlined">arrow_downward</span>
              </a>
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
            <h2 className="text-label-caps font-label-caps text-secondary mb-8">VISION & VALUES</h2>
            <h3 className="text-headline-xl font-headline-xl text-primary mb-10 leading-tight">
              CREATING THE <br />
              <span className="text-number-outline font-number-outline align-middle italic block py-2 not-italic">INVISIBLE</span> LUXURY
            </h3>
            <div className="space-y-8 max-w-lg">
              <ScrollReveal animation="slide-up" delay={150} duration={1.0}>
                <h4 className="text-label-caps font-label-caps mb-3">01. OUR MISSION</h4>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Crafting cohesive environments that reflect identity. From apartments to grand villas, we optimize spaces to feel expansive and balanced.
                </p>
              </ScrollReveal>
              
              <div className="w-20 h-[1px] bg-outline-variant opacity-30"></div>
              
              <ScrollReveal animation="slide-up" delay={300} duration={1.0}>
                <h4 className="text-label-caps font-label-caps mb-3">02. OUR ETHOS</h4>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Every architectural line and material choice is purposeful. We balance high functionality with an enduring aesthetic narrative.
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

      {/* Section 3: Our Services - Alternating layout and slide directions */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface" id="services">
        <ScrollReveal animation="slide-up" duration={1.2} className="mb-24 grid grid-cols-12 gap-gutter items-end">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <p className="text-label-caps font-label-caps opacity-60">DOING OUR JOB FROM THE BOTTOM OF OUR HEARTS</p>
            <h3 className="text-display-lg-mobile md:text-display-lg font-display-lg leading-none uppercase text-primary">
              OUR <br /> SERVICES
            </h3>
          </div>
          <div className="col-span-12 md:col-span-4 text-right hidden md:block">
            <span className="text-label-caps font-label-caps font-bold opacity-20 text-headline-lg text-primary">CM INTERIOR DESIGN</span>
          </div>
        </ScrollReveal>

        <div className="space-y-32">
          {services.slice(0, 3).map((service, index) => {
            const isEven = index % 2 === 0;
            // Alternate slide-in directions: left block slides left, right block slides right
            const textAnimation = isEven ? "slide-left" : "slide-right";
            const imageAnimation = isEven ? "slide-right" : "slide-left";

            return (
              <div
                key={service.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center relative text-on-surface"
              >
                {/* Text column */}
                <ScrollReveal
                  animation={textAnimation}
                  duration={1.2}
                  className={`col-span-12 md:col-span-5 flex flex-col justify-center order-2 ${
                    isEven ? "md:order-1 md:pr-12" : "md:order-2 md:pl-12 md:col-start-8"
                  }`}
                >
                  <h4 className="text-headline-lg font-headline-lg uppercase mb-6 flex items-center justify-between border-b border-outline-variant/10 pb-4 text-primary">
                    {service.title} <span className="w-12 h-[1px] bg-primary/30"></span>
                  </h4>
                  <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                    {service.description}
                  </p>
                </ScrollReveal>

                {/* Image column with parallax zoom */}
                <ScrollReveal
                  animation={imageAnimation}
                  duration={1.2}
                  className={`col-span-12 md:col-span-6 relative order-1 ${
                    isEven ? "md:order-2 md:col-start-7" : "md:order-1 md:col-start-2"
                  }`}
                >
                  {/* Outlined big number on top/side of image */}
                  <div
                    className={`absolute -top-16 font-number-outline text-[90px] md:text-[120px] leading-none opacity-20 select-none ${
                      isEven ? "right-0" : "left-0"
                    }`}
                  >
                    {service.id}
                  </div>
                  
                  {/* Decorative border box around image */}
                  <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border border-primary/5 -z-10"></div>
                  
                  <div className="relative w-full h-[240px] md:h-[350px] overflow-hidden bg-surface-container-high grain-overlay shadow-md">
                    {service.imageUrl && (
                      <ScrollParallax speed={-0.08} scaleStart={1.03} scaleEnd={1.12} className="w-full h-full">
                        <Image
                          alt={service.title}
                          src={service.imageUrl}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </ScrollParallax>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>

        {/* Calculator Button under Services */}
        <ScrollReveal animation="slide-up" delay={200} className="mt-24 text-center">
          <button
            onClick={() => setShowConsultationModal(true)}
            className="bg-secondary text-on-secondary px-10 py-5 font-label-caps text-label-caps flex items-center gap-4 hover:bg-opacity-95 active:scale-95 transition-all cursor-pointer rounded-none border-none mx-auto"
          >
            CALCULATE THE ESTIMATE <span className="material-symbols-outlined text-[18px]">north_east</span>
          </button>
        </ScrollReveal>
      </section>

      {/* Section 4: About Company - Alternating Stats Row reveals */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-background" id="about-company">
        {/* Section Header */}
        <ScrollReveal animation="slide-up" duration={1.2} className="mb-20 grid grid-cols-12 gap-gutter items-end">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <p className="text-label-caps font-label-caps opacity-60">LEARN MORE ABOUT THE COMPANY</p>
            <h3 className="text-display-lg-mobile md:text-display-lg font-display-lg leading-none uppercase text-primary">
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
                  DESIGN PROJECTS <span className="w-12 h-[1px] bg-primary/30"></span>
                </h4>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-xl">
                  Delivering bespoke, award-winning residential and commercial projects globally.
                </p>
              </ScrollReveal>
            </div>

            {/* Row 2: Image Right slides right, Content Left slides left */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-outline-variant/10 pb-12">
              <ScrollReveal animation="slide-left" duration={1.2} className="col-span-12 md:col-span-8 md:pr-8 flex flex-col justify-center order-2 md:order-1">
                <span className="text-[40px] md:text-[64px] font-bold text-primary leading-none font-display mb-2">20+</span>
                <h4 className="text-headline-lg font-headline-lg mb-3 uppercase flex items-center gap-4 text-primary">
                  EMPLOYEES <span className="w-12 h-[1px] bg-primary/30"></span>
                </h4>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-xl">
                  Providing continuous support and expert coordination to streamline your entire project.
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
                  CONTRACTORS <span className="w-12 h-[1px] bg-primary/30"></span>
                </h4>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-xl">
                  Ensuring flawless execution, strict quality standards, and premium craftsmanship.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="py-section-padding bg-surface-container relative">
        <div className="px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center">
          <ScrollReveal animation="slide-up" delay={100}>
            <span className="text-label-caps font-label-caps text-secondary mb-8 block">
              START YOUR JOURNEY
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={250}>
            <h2 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-16 max-w-4xl leading-none">
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
              href="/portfolio"
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
                BE SURE THAT CM INTERIOR DESIGN WILL MAKE YOUR SPACE A SPECIAL PLACE FILLED WITH BEAUTY AND COMFORT.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Consultation Request Modal Overlay */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-primary/80 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-background text-on-surface p-8 max-w-md w-full relative border border-outline-variant/30">
            <button
              onClick={() => setShowConsultationModal(false)}
              className="absolute top-4 right-4 text-primary hover:text-secondary focus:outline-none"
              aria-label="Close Modal"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <h3 className="text-headline-lg font-headline-lg mb-6 uppercase tracking-tight">Book Consultation</h3>
            <p className="text-body-md font-body-md text-on-surface-variant mb-6">
              Book a personal alignment interview with Lead Architect Alexander Novan.
            </p>
            {submitted ? (
              <div className="py-12 text-center text-secondary">
                <span className="material-symbols-outlined text-[64px] mb-4">check_circle</span>
                <p className="text-label-caps font-label-caps">REQUEST SUBMITTED SUCCESSFULLY</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-label-caps font-label-caps block mb-2 opacity-65">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-2 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-label-caps font-label-caps block mb-2 opacity-65">Contact Number</label>
                  <input
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
