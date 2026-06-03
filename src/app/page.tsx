"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, services } from "@/data/portfolioData";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";

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
            src="/images/home_hero.webp"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </ScrollParallax>
        


        {/* Content Overlay */}
        <div className="relative z-10 my-auto px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto flex items-center justify-center">
          {/* Centered Content Column */}
          <div className="max-w-3xl text-center flex flex-col items-center justify-center">
            <ScrollReveal animation="slide-up" delay={150} duration={1.2}>
              <h1 className="font-serif-display font-light text-primary uppercase leading-[0.8] text-[15vw] sm:text-[13vw] md:text-[11vw] select-none tracking-tight mb-2">
                CM
              </h1>
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
              <div className="flex flex-wrap gap-6 mb-8 justify-center">
                <button
                  onClick={() => setShowCalculator(true)}
                  className="bg-primary text-on-primary px-10 py-5 font-label-caps text-label-caps hover:bg-secondary hover:text-on-secondary transition-all active:scale-95 cursor-pointer rounded-none border border-primary hover:border-secondary"
                >
                  CALCULATE THE ESTIMATE
                </button>
              </div>
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
      </section>

      {/* 2. Features Transition Row */}
      <section className="bg-surface border-y border-outline-variant/20 py-12 px-margin-mobile md:px-margin-desktop w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <ScrollReveal animation="slide-up" delay={100} duration={1.2} className="space-y-3 p-6 border border-transparent hover:border-outline-variant/10 hover:bg-surface-container-lowest hover:-translate-y-2 hover:shadow-sm transition-all duration-500">
            <span className="text-label-caps font-label-caps text-secondary block font-bold">01 / CONCEPT CREATION</span>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              We develop custom spatial solutions and photorealistic 3D concepts mapping your aesthetic preferences.
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={250} duration={1.2} className="space-y-3 p-6 border border-transparent hover:border-outline-variant/10 hover:bg-surface-container-lowest hover:-translate-y-2 hover:shadow-sm transition-all duration-500">
            <span className="text-label-caps font-label-caps text-secondary block font-bold">02 / ON-SITE DETAILS</span>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Strict quality control, monitoring builder progress on-site to match material placements exactly.
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={400} duration={1.2} className="space-y-3 p-6 border border-transparent hover:border-outline-variant/10 hover:bg-surface-container-lowest hover:-translate-y-2 hover:shadow-sm transition-all duration-500">
            <span className="text-label-caps font-label-caps text-secondary block font-bold">03 / PREMIUM FURNISHING</span>
            <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Curating and placing high-end customized millwork, bespoke textiles, and selected surfaces.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. About Us Section (Image Left -> Content Right) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Left Column: Portrait Image slides from left with scroll zoom */}
            <ScrollReveal animation="slide-left" duration={1.2} className="col-span-12 lg:col-span-4 relative">
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

            {/* Right Column: Title and 2-column description slides from right */}
            <ScrollReveal animation="slide-right" duration={1.2} className="col-span-12 lg:col-span-8 lg:pl-12 mt-12 lg:mt-0 flex flex-col justify-between h-full">
              <div>
                <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">STUDIO ETHOS</span>
                <h2 className="text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-12 lg:-ml-36 relative z-20">
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
          </div>
        </div>
      </section>

      {/* 3.5. Services Section (Content Left -> Cards Right) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Left Side: Text block (Cols 1-3 on desktop) slides from left */}
            <ScrollReveal animation="slide-left" duration={1.2} className="col-span-12 lg:col-span-3 mb-16 lg:mb-0 lg:pr-8 flex flex-col justify-between h-full">
              <div>
                <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">CAPABILITIES</span>
                <h2 className="text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-[0.9] mb-8">
                  SERV<br />ICES
                </h2>
                <p className="text-body-lg font-body-lg text-on-surface-variant mb-10 leading-relaxed">
                  We offer premium interior architecture, tailored spatial designs, and turnkey project executions built around your aesthetic specifications.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/about#services"
                  className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
                >
                  EXPLORE ALL SERVICES <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Right Side: 3-column services showcase (Cols 4-12 on desktop) */}
            <div className="col-span-12 lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {services.slice(0, 3).map((service, index) => (
                  <ScrollReveal
                    key={service.id}
                    animation="slide-up"
                    delay={index * 150}
                    duration={1.2}
                    className="group flex flex-col justify-between p-6 border border-outline-variant/10 bg-surface-container-lowest hover:-translate-y-2 hover:shadow-md transition-all duration-500"
                  >
                    <div>
                      {/* Image container with subtle parallax scroll speed offset */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 bg-surface-container-high border border-outline-variant/10 shadow-sm">
                        {service.imageUrl && (
                          <ScrollParallax speed={-0.08} className="w-full h-full">
                            <Image
                              alt={service.title}
                              src={service.imageUrl}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </ScrollParallax>
                        )}
                      </div>
                      
                      {/* Number and Title */}
                      <span className="text-[11px] font-label-caps text-secondary block mb-2 tracking-[0.15em]">
                        SERVICE 0{index + 1}
                      </span>
                      <h3 className="text-headline-lg font-headline-lg text-primary uppercase mb-4 tracking-tight group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      {/* Description */}
                      <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Gallery Grid Section (Content Right -> Images Left) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-background" id="gallery">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Left Side: 3-column project showcase (Cols 1-9 on desktop) */}
            <div className="col-span-12 lg:col-span-9 order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project, index) => {
                  // Alternate card slide-in directions for a dynamic layout feel
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
                        {/* Image container with subtle parallax scroll speed offset */}
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
                        {/* Category/Location */}
                        <span className="text-label-caps font-label-caps text-secondary text-[11px] block mb-2 tracking-[0.15em]">
                          {project.category} / {project.location}
                        </span>
                        {/* Title */}
                        <h3 className="text-headline-lg font-headline-lg text-primary uppercase mb-4 tracking-tight group-hover:text-secondary transition-colors">
                          {project.title}
                        </h3>
                        {/* Description */}
                        <p className="text-body-md font-body-md text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <div className="mt-auto pt-4">
                        <Link
                          href={`/portfolio/${project.id}`}
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

            {/* Right Side: Text block (Cols 10-12 on desktop) slides from right */}
            <ScrollReveal animation="slide-right" duration={1.2} className="col-span-12 lg:col-span-3 order-1 lg:order-2 mb-16 lg:mb-0 lg:pl-8 flex flex-col justify-between h-full">
              <div>
                <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">VISUAL INDEX</span>
                <h2 className="text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-[0.9] mb-8">
                  GALL<br />ERY
                </h2>
                <p className="text-body-lg font-body-lg text-on-surface-variant mb-10 leading-relaxed">
                  Look at our work. We try to maintain a balance of aesthetics and convenience in our layouts. Lightness and softness accompany each of our projects.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
                >
                  EXPLORE ALL PROJECTS <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
                <label className="text-label-caps font-label-caps block mb-2 opacity-65">Service Required</label>
                <select
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
                <label className="text-label-caps font-label-caps block mb-2 opacity-65">Area Size (Square Feet)</label>
                <input
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
                <span className="text-headline-xl font-headline-xl text-secondary">
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
