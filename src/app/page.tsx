"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/portfolioData";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";
import { getWhatsAppLink, templates } from "@/utils/whatsapp";
import CurveSeparator from "@/components/CurveSeparator";
import InstagramSection from "@/components/InstagramSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

function getOpacityForPhase(progress: number, start: number, peakStart: number, peakEnd: number, end: number) {
  if (progress < start || progress > end) return 0;
  if (progress >= peakStart && progress <= peakEnd) return 1;
  if (progress < peakStart) {
    return (progress - start) / (peakStart - start);
  } else {
    return (end - progress) / (end - peakEnd);
  }
}

function getLayerOpacity(progress: number, start: number, end: number) {
  if (progress < start) return 0;
  if (progress > end) return 1;
  return (progress - start) / (end - start);
}

export default function HomePage() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [squareFootage, setSquareFootage] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleScroll = () => {
      if (!heroContainerRef.current) return;
      const rect = heroContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollableHeight = rect.height - windowHeight;
      const currentScroll = -rect.top;
      
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

  const getPhaseInfo = (progress: number) => {
    if (progress < 0.20) return { num: "01", name: "STRUCTURE" };
    if (progress < 0.40) return { num: "02", name: "CURTAINS & PLANTS" };
    if (progress < 0.60) return { num: "03", name: "FURNISHING" };
    if (progress < 0.80) return { num: "04", name: "STYLING" };
    return { num: "05", name: "LIGHTING" };
  };

  const phaseInfo = getPhaseInfo(scrollProgress);

  const opacityL1 = getLayerOpacity(scrollProgress, 0.05, 0.20);
  const opacityL2 = getLayerOpacity(scrollProgress, 0.20, 0.40);
  const opacityL3 = getLayerOpacity(scrollProgress, 0.40, 0.60);
  const opacityL4 = getLayerOpacity(scrollProgress, 0.60, 0.80);
  const opacityL5 = getLayerOpacity(scrollProgress, 0.80, 0.95);

  const opacityT1 = getOpacityForPhase(scrollProgress, 0, 0, 0.08, 0.18);
  const opacityT2 = getOpacityForPhase(scrollProgress, 0.18, 0.23, 0.33, 0.38);
  const opacityT3 = getOpacityForPhase(scrollProgress, 0.38, 0.43, 0.53, 0.58);
  const opacityT4 = getOpacityForPhase(scrollProgress, 0.58, 0.63, 0.73, 0.78);
  const opacityT5 = getOpacityForPhase(scrollProgress, 0.78, 0.85, 1.0, 1.0);

  const yOffsetT1 = (1 - opacityT1) * 20;
  const yOffsetT2 = (1 - opacityT2) * 20;
  const yOffsetT3 = (1 - opacityT3) * 20;
  const yOffsetT4 = (1 - opacityT4) * 20;
  const yOffsetT5 = (1 - opacityT5) * 20;

  return (
    <div className="w-full bg-background text-on-surface">
      {/* 1. Hero Section: Sticky Viewport container nested in a 500vh scroll track */}
      <div ref={heroContainerRef} className="relative h-[500vh] w-full bg-black z-10">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
          
          {/* Base Layer: Empty Room */}
          <div className="absolute inset-0 w-full h-full bg-black">
            <Image
              src="/images/room_transformation_empty.png"
              alt="Empty modern living space structure"
              fill
              priority
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 1: Curtains & Plant (polygon coordinates for right-hand elements) */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(65% 0, 100% 0, 100% 100%, 65% 100%)",
              opacity: opacityL1,
              transform: `translate3d(${(1 - opacityL1) * 40}px, 0, 0)`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Modern living space curtains and plant details"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 2: Sofas & Armchair (polygon coordinates for lower left/middle seating) */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(0 50%, 70% 50%, 70% 100%, 0 100%)",
              opacity: opacityL2,
              transform: `translate3d(0, ${(1 - opacityL2) * 40}px, 0)`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Modern living space luxurious sofas and seating"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 3: Coffee Table & Rug (polygon coordinates for lower central region) */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(30% 65%, 75% 65%, 75% 100%, 30% 100%)",
              opacity: opacityL3,
              transform: `translate3d(0, ${(1 - opacityL3) * 30}px, 0) scale(${0.98 + opacityL3 * 0.02})`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Modern living space coffee table and elegant rug"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 4: Wall Art & Light Channels (polygon coordinates for top/upper central paneling) */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(25% 10%, 70% 10%, 70% 58%, 25% 58%)",
              opacity: opacityL4,
              transform: `translate3d(0, ${(1 - opacityL4) * -30}px, 0)`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Modern living space bespoke wall panels and lighting"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 5: Final Lighting Glow (Full completed room fade-in) */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-200 ease-out pointer-events-none"
            style={{
              opacity: opacityL5,
              transform: `scale(${0.99 + opacityL5 * 0.01})`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Fully transformed luxurious modern living room"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.8] contrast-[1.05]"
            />
          </div>

          {/* Premium overlay gradient for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 z-10 pointer-events-none" />

          {/* Journey Typography Overlays */}
          <div className="relative z-20 px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto flex items-center justify-center pointer-events-none">
            <div className="max-w-3xl text-center flex flex-col items-center justify-center w-full min-h-[380px] relative">
              
              {/* Phase 1 Text */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ease-out pointer-events-auto"
                style={{
                  opacity: opacityT1,
                  transform: `translate3d(0, ${yOffsetT1}px, 0)`,
                  visibility: opacityT1 > 0.01 ? "visible" : "hidden",
                  willChange: "opacity, transform",
                }}
              >
                <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-[0.3em] uppercase font-bold text-[14px] md:text-[18px]">
                  DESIGN ARCHITECTURE
                </span>
                <h1 className="font-serif-display font-light text-white uppercase leading-[0.9] text-[8vw] sm:text-[6vw] md:text-[5vw] select-none tracking-tight mb-6">
                  Every Space Has <br /> Potential
                </h1>
                <p className="text-body-lg font-body-lg text-white/80 max-w-md mx-auto leading-relaxed">
                  We look past the bare concrete structure, envisioning the harmony and potential of a luxury interior design.
                </p>
              </div>

              {/* Phase 2 Text */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ease-out pointer-events-auto"
                style={{
                  opacity: opacityT2,
                  transform: `translate3d(0, ${yOffsetT2}px, 0)`,
                  visibility: opacityT2 > 0.01 ? "visible" : "hidden",
                  willChange: "opacity, transform",
                }}
              >
                <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-[0.3em] uppercase font-bold text-[14px] md:text-[18px]">
                  ZONE 01 / SPATIAL STRUCTURE
                </span>
                <h2 className="font-serif-display font-light text-white uppercase leading-[0.9] text-[8vw] sm:text-[6vw] md:text-[5vw] select-none tracking-tight mb-6">
                  We Shape <br /> Function
                </h2>
                <p className="text-body-lg font-body-lg text-white/80 max-w-md mx-auto leading-relaxed">
                  Soft drapes filter the light while plants bring fresh life, setting a premium base for structural alignment.
                </p>
              </div>

              {/* Phase 3 Text */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ease-out pointer-events-auto"
                style={{
                  opacity: opacityT3,
                  transform: `translate3d(0, ${yOffsetT3}px, 0)`,
                  visibility: opacityT3 > 0.01 ? "visible" : "hidden",
                  willChange: "opacity, transform",
                }}
              >
                <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-[0.3em] uppercase font-bold text-[14px] md:text-[18px]">
                  ZONE 02 / FURNISHING LAYOUT
                </span>
                <h2 className="font-serif-display font-light text-white uppercase leading-[0.9] text-[8vw] sm:text-[6vw] md:text-[5vw] select-none tracking-tight mb-6">
                  We Add <br /> Character
                </h2>
                <p className="text-body-lg font-body-lg text-white/80 max-w-md mx-auto leading-relaxed">
                  Luxurious sofas and seating define zones of interaction, crafting comfortable areas to relax and connect.
                </p>
              </div>

              {/* Phase 4 Text */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ease-out pointer-events-auto"
                style={{
                  opacity: opacityT4,
                  transform: `translate3d(0, ${yOffsetT4}px, 0)`,
                  visibility: opacityT4 > 0.01 ? "visible" : "hidden",
                  willChange: "opacity, transform",
                }}
              >
                <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-[0.3em] uppercase font-bold text-[14px] md:text-[18px]">
                  ZONE 03 / ARTISTIC STYLING
                </span>
                <h2 className="font-serif-display font-light text-white uppercase leading-[0.9] text-[8vw] sm:text-[6vw] md:text-[5vw] select-none tracking-tight mb-6">
                  We Create <br /> Comfort
                </h2>
                <p className="text-body-lg font-body-lg text-white/80 max-w-md mx-auto leading-relaxed">
                  Bespoke wall art panels and minimalist wood finishes add depth and visual balance to the architectural room.
                </p>
              </div>

              {/* Phase 5 Text */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ease-out pointer-events-auto"
                style={{
                  opacity: opacityT5,
                  transform: `translate3d(0, ${yOffsetT5}px, 0)`,
                  visibility: opacityT5 > 0.01 ? "visible" : "hidden",
                  willChange: "opacity, transform",
                }}
              >
                <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-[0.3em] uppercase font-bold text-[14px] md:text-[18px]">
                  THE GRAND FINALE
                </span>
                <h2 className="font-serif-display font-light text-white uppercase leading-[0.9] text-[8vw] sm:text-[6vw] md:text-[5vw] select-none tracking-tight mb-6">
                  We Bring Spaces <br /> To Life
                </h2>
                <p className="text-body-lg font-body-lg text-white/80 max-w-lg mb-8 mx-auto leading-relaxed">
                  Our lighting details highlight textures and curves, transforming an empty room into your ultimate dream home.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto">
                  <Link
                    href="/gallery"
                    className="border border-white text-white bg-black/15 backdrop-blur-[2px] px-8 py-4 font-label-caps text-label-caps hover:bg-white hover:text-primary hover:border-white transition-all duration-300 active:scale-95 cursor-pointer rounded-none no-underline text-center font-bold w-full"
                  >
                    VIEW COMPLETED HOMES
                  </Link>
                  <a
                    href={getWhatsAppLink(templates.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-white border border-secondary px-8 py-4 font-label-caps text-label-caps hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 active:scale-95 cursor-pointer rounded-none no-underline text-center font-bold w-full"
                  >
                    WHATSAPP US
                  </a>
                </div>
                <button
                  onClick={() => setShowCalculator(true)}
                  className="mt-6 text-label-caps font-label-caps opacity-65 hover:opacity-100 transition-opacity underline bg-transparent border-none cursor-pointer text-white"
                >
                  CALCULATE YOUR DESIGN ESTIMATE
                </button>
              </div>

            </div>
          </div>

          {/* Phase Counter Display */}
          <div className="absolute right-margin-desktop top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end gap-2 z-30 text-white">
            <span className="text-[24px] font-serif-display tracking-widest font-light text-secondary">
              {phaseInfo.num} <span className="text-[12px] text-white/50">/ 05</span>
            </span>
            <span className="text-[10px] font-label-caps tracking-[0.2em] text-white/40 uppercase">
              {phaseInfo.name}
            </span>
          </div>

          {/* Scroll Down Indicator */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 z-30 pointer-events-none"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 6) }}
          >
            <span className="text-[11px] font-label-caps tracking-[0.2em] text-white/50">
              Scroll to transform
            </span>
            <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
          </div>

          {/* Curved separator transition into About section */}
          <CurveSeparator
            type="convex"
            fillClass="fill-surface-container-lowest"
            className="absolute bottom-0 left-0 w-full z-30"
          />
        </div>
      </div>

      {/* 3. About Us Section (Image Left -> Content Right) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            
            {/* Right Column (First in DOM for mobile heading order): Title and 2-column description */}
            <ScrollReveal animation="slide-right" duration={1.2} className="col-span-12 lg:col-span-8 lg:pl-12 flex flex-col justify-between h-full order-first lg:order-last">
              <div>
                <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">WHO WE ARE</span>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-12 lg:-ml-36 relative z-20">
                  ABOUT US
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <ScrollReveal animation="slide-up" delay={200} duration={1.0} className="space-y-4">
                    <h3 className="text-label-caps font-label-caps text-primary tracking-wider font-bold">01. WE DESIGN FOR LIFE</h3>
                    <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                      We design comfortable homes and practical spaces. From cozy apartments to independent villas, we make every room feel spacious, beautiful, and fit for your family.
                    </p>
                  </ScrollReveal>
                  
                  <ScrollReveal animation="slide-up" delay={350} duration={1.0} className="space-y-4">
                    <h3 className="text-label-caps font-label-caps text-primary tracking-wider font-bold">02. QUALITY & TRUST</h3>
                    <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                      We focus on quality materials, clear pricing, and on-time completion. Our team manages everything from start to finish, giving you a smooth, stress-free experience.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
              
              <ScrollReveal animation="slide-up" delay={500} duration={1.0} className="mt-16">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
                >
                  READ MORE ABOUT US <span className="material-symbols-outlined text-[14px]">north_east</span>
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
              <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">WHAT WE DO</span>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-6">
                SERVICES
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                From custom wardrobes and false ceilings to complete home designs, we provide quality interior work tailored to your needs.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
              >
                SEE ALL SERVICES <span className="material-symbols-outlined text-[14px]">north_east</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Continuous Auto-scrolling Services Showcase */}
        <ServicesShowcase />
      </section>

      {/* Curved separator transition into Transformations section */}
      <CurveSeparator
        type="concave"
        fillClass="fill-surface-container-lowest"
        bgClass="bg-surface"
        className="w-full"
      />

      <BeforeAfterSlider />

      {/* Curved separator transition into Gallery section */}
      <CurveSeparator
        type="convex"
        fillClass="fill-background"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* 4. Gallery Grid Section (Header Top -> Cards Bottom) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-background" id="gallery">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <ScrollReveal animation="slide-up" duration={1.2} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">OUR PROJECTS</span>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-6">
                GALLERY
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                Browse some of our completed home, kitchen, and bedroom interior projects. We design rooms that look beautiful and feel extremely comfortable.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
              >
                SEE ALL PROJECTS <span className="material-symbols-outlined text-[14px]">north_east</span>
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
                      VIEW PROJECT <span className="material-symbols-outlined text-[12px]">north_east</span>
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
              START YOUR PROJECT
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={250}>
            <h2 className="font-serif-display font-light text-primary mb-12 max-w-4xl text-4xl sm:text-5xl md:text-7xl leading-none uppercase">
              READY TO START <br /> <span className="italic font-light">YOUR DREAM HOME?</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={400} className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto">
            <Link
              href="/contact"
              className="px-16 py-8 border border-primary text-label-caps font-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300 bg-transparent rounded-none cursor-pointer no-underline text-center font-bold w-full"
            >
              CONTACT US
            </Link>
            <Link
              href="/gallery"
              className="px-16 py-8 bg-primary text-on-primary text-label-caps font-label-caps hover:bg-secondary hover:text-on-secondary transition-all duration-300 rounded-none cursor-pointer no-underline text-center font-bold w-full"
            >
              VIEW PROJECTS
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
              Get an instant cost estimate for your home or office interior work.
            </p>
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label htmlFor="est-service" className="text-label-caps font-label-caps block mb-2 opacity-65">What service do you need?</label>
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
                <label htmlFor="est-area" className="text-label-caps font-label-caps block mb-2 opacity-65">Size of your space (Sq. Ft.)</label>
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
                GET ESTIMATE
              </button>
            </form>
            {calculatedEstimate !== null && (
              <div className="mt-8 p-4 bg-surface-container border border-outline-variant/20 text-center">
                <span className="text-label-caps font-label-caps opacity-50 block mb-1">ESTIMATED COST</span>
                <span className="font-headline-xl text-secondary">
                  ${calculatedEstimate.toLocaleString()}
                </span>
                <span className="text-body-md font-body-md text-on-surface-variant block mt-2 text-[12px]">
                  *This is a rough starting estimate. Contact us for a detailed quote based on your choice of materials.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
