"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/portfolioData";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";
import { getWhatsAppLink, templates } from "@/utils/whatsapp";
import CurveSeparator from "@/components/CurveSeparator";
import InstagramSection from "@/components/InstagramSection";
import ServicesShowcase from "@/components/ServicesShowcase";

export default function HomePage() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [squareFootage, setSquareFootage] = useState("");
  const [selectedService, setSelectedService] = useState("Interior Design");
  const [calculatedEstimate, setCalculatedEstimate] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const sqft = parseFloat(squareFootage);
    if (isNaN(sqft) || sqft <= 0) return;
    
    const rates: Record<string, number> = {
      "Interior Design": 45,
      "Turnkey Renovation": 120,
      "Material Selection": 15,
    };
    
    const rate = rates[selectedService] || 45;
    setCalculatedEstimate(sqft * rate);
  };

  return (
    <div className="w-full bg-background text-on-surface">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        {/* Full-Screen Background Image with Parallax and Subtle Scroll Zoom */}
        <ScrollParallax speed={-0.12} scaleStart={1} scaleEnd={1.12} className="absolute inset-0 z-0 w-full h-full">
          <Image
            alt="Luxury master bedroom design suite"
            src="/images/home_hero.png"
            fill
            priority
            unoptimized
            className="object-cover contrast-[1.04] brightness-[0.96]"
          />
        </ScrollParallax>
        


        {/* Content Overlay */}
        <div className="relative z-10 my-auto px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto flex items-center justify-center">
          {/* Centered Content Column */}
          <div className="max-w-3xl text-center flex flex-col items-center justify-center">
            <ScrollReveal animation="slide-up" delay={100} duration={1.2}>
              <h1 className="font-serif-display font-light text-primary uppercase leading-[0.8] text-[15vw] sm:text-[13vw] md:text-[11vw] select-none tracking-tight mb-2">
                CM
              </h1>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={250} duration={1.2}>
              <span className="text-label-caps font-label-caps text-secondary mb-8 block tracking-[0.3em] uppercase font-bold text-[16px] md:text-[20px]">
                INTERIOR DESIGN
              </span>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={450} duration={1.2}>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-sm mb-12 leading-relaxed mx-auto">
                We will be able to make your life comfortable and your interior really beautiful.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={600} duration={1.2}>
              <div className="flex flex-col sm:flex-row gap-6 mb-6 justify-center w-full max-w-md mx-auto">
                <Link
                  href="/gallery"
                  className="border border-white text-white bg-black/15 backdrop-blur-[2px] px-10 py-5 font-label-caps text-label-caps hover:bg-white hover:text-primary hover:border-white transition-all duration-300 active:scale-95 cursor-pointer rounded-none no-underline text-center font-bold w-full"
                >
                  VIEW PROJECTS
                </Link>
                <a
                  href={getWhatsAppLink(templates.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-white border border-secondary px-10 py-5 font-label-caps text-label-caps hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 active:scale-95 cursor-pointer rounded-none no-underline text-center font-bold w-full"
                >
                  WHATSAPP US
                </a>
              </div>
              
              <button
                onClick={() => setShowCalculator(true)}
                className="text-label-caps font-label-caps opacity-65 hover:opacity-100 transition-opacity underline bg-transparent border-none cursor-pointer mt-4"
              >
                OR CALCULATE THE ESTIMATE
              </button>
            </ScrollReveal>

            {/* Social Links aligned to bottom center of hero area */}
            <ScrollReveal animation="slide-up" delay={750} duration={1.2}>
              <div className="flex gap-4 items-center justify-center text-label-caps font-label-caps text-on-surface-variant/70 text-[11px] tracking-widest mt-8">
                <a href="#" className="hover:text-secondary transition-colors">IG</a>
                <span className="opacity-40">/</span>
                <a href="#" className="hover:text-secondary transition-colors">FB</a>
                <span className="opacity-40">/</span>
                <a href="#" className="hover:text-secondary transition-colors">BE</a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Vertical/Left-Middle Slide Counter with divider line */}
        <ScrollReveal animation="slide-right" delay={750} duration={1.2} className="absolute right-margin-desktop top-1/2 -translate-y-1/2 hidden md:flex items-center gap-6 z-20">
          <span className="text-label-caps font-label-caps text-primary tracking-widest text-[12px] font-bold">01 / 03</span>
          <div className="w-24 h-[1px] bg-primary/45"></div>
        </ScrollReveal>

        {/* Curved separator transition into About section */}
        <CurveSeparator
          type="convex"
          fillClass="fill-surface-container-lowest"
          className="absolute bottom-0 left-0 w-full z-10"
        />
      </section>

      {/* 3. About Us Section (Image Left -> Content Right) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            
            {/* Right Column (First in DOM for mobile heading order): Title and 2-column description */}
            <ScrollReveal animation="slide-right" duration={1.2} className="col-span-12 lg:col-span-8 lg:pl-12 flex flex-col justify-between h-full order-first lg:order-last">
              <div>
                <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">STUDIO ETHOS</span>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-12 lg:-ml-36 relative z-20">
                  ABOUT US
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <ScrollReveal animation="slide-up" delay={200} duration={1.0} className="space-y-4">
                    <h3 className="text-label-caps font-label-caps text-primary tracking-wider font-bold">01. OUR MISSION</h3>
                    <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                      Crafting cohesive environments that reflect identity. From apartments to grand villas, we optimize spaces to feel expansive, balanced, and premium.
                    </p>
                  </ScrollReveal>
                  
                  <ScrollReveal animation="slide-up" delay={350} duration={1.0} className="space-y-4">
                    <h3 className="text-label-caps font-label-caps text-primary tracking-wider font-bold">02. OUR ETHOS</h3>
                    <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                      Every architectural line and material choice is purposeful. We balance high functionality with an enduring aesthetic narrative, bringing character and soul to the space.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
              
              <ScrollReveal animation="slide-up" delay={500} duration={1.0} className="mt-16">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
                >
                  LEARN MORE ABOUT US <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
              </ScrollReveal>
            </ScrollReveal>

            {/* Left Column (Second in DOM for mobile heading order): Portrait Image */}
            <ScrollReveal animation="slide-left" duration={1.2} className="col-span-12 lg:col-span-4 relative mt-12 lg:mt-0 order-last lg:order-first">
              <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border border-outline-variant/30 -z-10"></div>
              <div className="relative w-full aspect-[3/4] overflow-hidden shadow-sm bg-surface-container-high grain-overlay">
                <ScrollParallax speed={-0.1} scaleStart={1.05} scaleEnd={1.15} className="w-full h-full">
                  <Image
                    alt="Bespoke furniture in luxury suite bedroom"
                    src="/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.50.59 PM.webp"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </ScrollParallax>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Curved separator transition into Services section */}
      <CurveSeparator
        type="concave"
        fillClass="fill-surface"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* 3.5. Services Section (Header Top -> Cards Bottom) */}
      <section className="py-section-padding bg-surface" id="services">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Header Row */}
          <ScrollReveal animation="slide-up" duration={1.2} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">CAPABILITIES</span>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-6">
                SERVICES
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                We offer premium interior architecture, tailored spatial designs, and turnkey project executions built around your aesthetic specifications.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
              >
                EXPLORE ALL SERVICES <span className="material-symbols-outlined text-[14px]">north_east</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Continuous Auto-scrolling Services Showcase */}
        <ServicesShowcase />
      </section>

      {/* Curved separator transition into Gallery section */}
      <CurveSeparator
        type="s-curve"
        fillClass="fill-background"
        bgClass="bg-surface"
        className="w-full"
      />

      {/* 4. Gallery Grid Section (Header Top -> Cards Bottom) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-background" id="gallery">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <ScrollReveal animation="slide-up" duration={1.2} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">VISUAL INDEX</span>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-6">
                GALLERY
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                Look at our work. We try to maintain a balance of aesthetics and convenience in our layouts. Lightness and softness accompany each of our projects.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
              >
                EXPLORE ALL PROJECTS <span className="material-symbols-outlined text-[14px]">north_east</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Cards Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => {
              const animations = ["diagonal-left", "scale", "diagonal-right"];
              const animationType = animations[index % 3] as any;
              
              return (
                <ScrollReveal
                  key={project.id}
                  animation={animationType}
                  delay={index * 150}
                  duration={1.2}
                  className="group flex flex-col justify-between p-4 border border-transparent hover:border-outline-variant/10 hover:bg-surface-container-lowest hover:-translate-y-2 hover:shadow-md transition-all duration-500"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-surface-container-high border border-outline-variant/10 shadow-sm">
                      <ScrollParallax speed={-0.08} className="w-full h-full">
                        <Image
                          alt={project.title}
                          src={project.mainImage || "/images/home_hero.webp"}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </ScrollParallax>
                    </div>
                    <span className="text-label-caps font-label-caps text-secondary text-[11px] block mb-2 tracking-[0.15em]">
                      {project.category} / {project.location}
                    </span>
                    <h3 className="text-headline-lg font-headline-lg text-primary uppercase mb-4 tracking-tight group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/gallery/${project.id}`}
                      className="inline-flex items-center gap-2 text-label-caps font-label-caps text-primary hover:text-secondary transition-colors font-bold decoration-none border-b border-primary hover:border-secondary pb-0.5"
                    >
                      EXPLORE CASE STUDY <span className="material-symbols-outlined text-[12px]">north_east</span>
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curved separator transition into Instagram section */}
      <CurveSeparator
        type="convex"
        fillClass="fill-surface-container-lowest"
        bgClass="bg-background"
        className="w-full"
      />

      {/* Instagram Feed Section */}
      <InstagramSection />

      {/* Curved separator transition into Contact CTA section */}
      <CurveSeparator
        type="concave"
        fillClass="fill-surface-container"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* 5. Contact CTA Section */}
      <section className="py-20 bg-surface-container text-center relative overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center">
          <ScrollReveal animation="slide-up" delay={100}>
            <span className="text-label-caps font-label-caps text-secondary mb-6 block tracking-widest">
              START YOUR JOURNEY
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={250}>
            <h2 className="font-serif-display font-light text-primary mb-12 max-w-4xl text-4xl sm:text-5xl md:text-7xl leading-none uppercase">
              READY TO TRANSFORM <br /> <span className="italic font-light">YOUR VISION?</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={400} className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto">
            <Link
              href="/contact"
              className="px-16 py-8 border border-primary text-label-caps font-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300 bg-transparent rounded-none cursor-pointer no-underline text-center font-bold w-full"
            >
              BOOK A CONSULTATION
            </Link>
            <Link
              href="/gallery"
              className="px-16 py-8 bg-primary text-on-primary text-label-caps font-label-caps hover:bg-secondary hover:text-on-secondary transition-all duration-300 rounded-none cursor-pointer no-underline text-center font-bold w-full"
            >
              EXPLORE WORKS
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Curved separator transition from Contact CTA into global Footer */}
      <CurveSeparator
        type="concave"
        fillClass="fill-tertiary"
        bgClass="bg-surface-container"
        className="w-full"
      />

      {/* Estimate Calculator Modal Overlay */}
      {showCalculator && (
        <div className="fixed inset-0 bg-primary/80 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-background text-on-surface p-8 max-w-md w-full relative border border-outline-variant/30 shadow-2xl">
            <button
              onClick={() => {
                setShowCalculator(false);
                setCalculatedEstimate(null);
                setSquareFootage("");
              }}
              className="absolute top-4 right-4 text-primary hover:text-secondary focus:outline-none"
              aria-label="Close Calculator"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <h3 className="text-headline-lg font-headline-lg mb-6 uppercase tracking-tight">Estimate Calculator</h3>
            <p className="text-body-md font-body-md text-on-surface-variant mb-6">
              Get an instant cost assessment of your architecture or fit-out projects.
            </p>
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="est-service" className="text-label-caps font-label-caps block mb-2 opacity-65">Service Required</label>
                <select
                  id="est-service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-2 px-0 font-body-lg text-body-lg transition-all focus:ring-0 appearance-none rounded-none focus:outline-none"
                >
                  <option value="Interior Design">Interior Design ($45 / sqft)</option>
                  <option value="Turnkey Renovation">Turnkey Renovation ($120 / sqft)</option>
                  <option value="Material Selection">Material Selection ($15 / sqft)</option>
                </select>
              </div>
              <div>
                <label htmlFor="est-area" className="text-label-caps font-label-caps block mb-2 opacity-65">Area Size (Square Feet)</label>
                <input
                  id="est-area"
                  type="number"
                  required
                  placeholder="e.g. 1200"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-2 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-4 text-label-caps font-label-caps tracking-widest hover:bg-secondary transition-colors cursor-pointer rounded-none border-none"
              >
                CALCULATE COST
              </button>
            </form>
            {calculatedEstimate !== null && (
              <div className="mt-8 p-4 bg-surface-container border border-outline-variant/20 text-center">
                <span className="text-label-caps font-label-caps opacity-50 block mb-1">PROVISIONAL COST ESTIMATE</span>
                <span className="font-headline-xl text-secondary">
                  ${calculatedEstimate.toLocaleString()}
                </span>
                <span className="text-body-md font-body-md text-on-surface-variant block mt-2 text-[12px]">
                  *Excludes specific material surcharges and VAT.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
