"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, galleryItems } from "@/data/portfolioData";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";
import { getWhatsAppLink, templates } from "@/utils/whatsapp";
import CurveSeparator from "@/components/CurveSeparator";
import InstagramSection from "@/components/InstagramSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Lightbox from "@/components/Lightbox";

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

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress * (2 - progress); // ease-out-quad
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={counterRef}>{count}{suffix}</span>;
}

export default function HomePage() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [squareFootage, setSquareFootage] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Featured Gallery States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  // Curate 8 beautiful homepage preview images
  const previewGalleryItems = (() => {
    const curatedIds = [
      "g4", // Living Room
      "g_bed_0", // Bedroom
      "g_kit_0", // Kitchen
      "g_ceil_0", // Ceiling
      "g_curt_0", // Curtains
      "g_wash_0", // Washbasin
      "g10", // Villa/Sauna
      "g_bed_6", // Bedroom
    ];
    return galleryItems.filter(item => curatedIds.includes(item.id)).slice(0, 8);
  })();

  const handleOpenLightbox = (index: number) => {
    const urls = previewGalleryItems.map(item => item.imageUrl);
    setLightboxImages(urls);
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

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
    if (progress < 0.20) return { num: "01", name: "EMPTY SPACE" };
    if (progress < 0.40) return { num: "02", name: "TEXTURAL FOUNDATION" };
    if (progress < 0.60) return { num: "03", name: "BESPOKE CENTERPIECE" };
    if (progress < 0.80) return { num: "04", name: "LUXURY FURNISHING" };
    return { num: "05", name: "AMBIENT LIGHTING" };
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
          
          {/* Base Layer: Empty Room (walls, plant, curtains, wall art) */}
          <div className="absolute inset-0 w-full h-full bg-black">
            <Image
              src="/images/room_transformation_empty.png"
              alt="Empty modern living room with drapes and plant"
              fill
              priority
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 1: Rug (central area grounding layout) */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(10% 70%, 90% 70%, 95% 100%, 5% 100%)",
              opacity: opacityL1,
              transform: `translate3d(0, ${(1 - opacityL1) * 30}px, 0)`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Cozy woven rug placement"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 2: Coffee Table (central focal point) */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(35% 65%, 68% 65%, 68% 86%, 35% 86%)",
              opacity: opacityL2,
              transform: `translate3d(0, ${(1 - opacityL2) * 20}px, 0) scale(${0.97 + opacityL2 * 0.03})`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Minimalist dark wood coffee table"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 3: Rear Sofa (central seating structure) */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(25% 50%, 75% 50%, 75% 75%, 25% 75%)",
              opacity: opacityL3,
              transform: `translate3d(0, ${(1 - opacityL3) * 30}px, 0)`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Luxury modern central sofa"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 4a: Left Armchair */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(0 55%, 32% 55%, 32% 100%, 0 100%)",
              opacity: opacityL4,
              transform: `translate3d(${(1 - opacityL4) * -30}px, ${(1 - opacityL4) * 20}px, 0)`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Comfortable rust orange accent armchair"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 4b: Right Sofa */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-100 ease-out pointer-events-none"
            style={{
              clipPath: "polygon(70% 55%, 100% 55%, 100% 100%, 70% 100%)",
              opacity: opacityL4,
              transform: `translate3d(${(1 - opacityL4) * 30}px, ${(1 - opacityL4) * 20}px, 0)`,
            }}
          >
            <Image
              src="/images/room_transformation_full.png"
              alt="Luxury corner sofa chaise lounge"
              fill
              unoptimized
              className="object-cover w-full h-full brightness-[0.7] contrast-[1.02]"
            />
          </div>

          {/* Layer 5: Final Lighting Glow (completed room reveal) */}
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

          {/* Journey Typography Overlays - Simplified to One High-Impact Block */}
          <div className="relative z-20 px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto flex items-center justify-center pointer-events-auto">
            <div className="max-w-3xl text-center flex flex-col items-center justify-center w-full min-h-[380px] relative animate-fade-in">
              <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-[0.3em] uppercase font-bold text-[13px] md:text-[16px]">
                CM INTERIOR DESIGN
              </span>
              <h1 className="font-serif-display font-light text-white uppercase leading-[0.95] text-[7.5vw] sm:text-[5.5vw] md:text-[4.5vw] select-none tracking-tight mb-6 max-w-4xl">
                CRAFTING PREMIUM <br /> LUXURY INTERIORS
              </h1>
              <p className="text-body-lg font-body-lg text-white/80 max-w-md mx-auto leading-relaxed mb-8 text-sm md:text-[16px]">
                Bespoke interior design and premium turnkey execution for villas, apartments, and modern homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md mx-auto">
                <a
                  href="#gallery"
                  className="border border-white text-white bg-black/15 backdrop-blur-[2px] px-8 py-4 font-label-caps text-label-caps hover:bg-white hover:text-primary hover:border-white transition-all duration-300 active:scale-95 cursor-pointer rounded-none no-underline text-center font-bold w-full text-[12px] tracking-wider"
                >
                  VIEW GALLERY
                </a>
                <a
                  href={getWhatsAppLink(templates.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-white border border-secondary px-8 py-4 font-label-caps text-label-caps hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 active:scale-95 cursor-pointer rounded-none no-underline text-center font-bold w-full text-[12px] tracking-wider"
                >
                  WHATSAPP US
                </a>
              </div>
              <button
                onClick={() => setShowCalculator(true)}
                className="mt-6 text-label-caps font-label-caps opacity-65 hover:opacity-100 transition-opacity underline bg-transparent border-none cursor-pointer text-white text-[11px] tracking-wider"
              >
                CALCULATE YOUR DESIGN ESTIMATE
              </button>
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

      {/* 2. About Us Section (Image Left -> Content Right) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            
            {/* Right Column (First in DOM for mobile heading order): Title, description, counters */}
            <ScrollReveal animation="slide-right" duration={1.2} className="col-span-12 lg:col-span-8 lg:pl-12 flex flex-col justify-between h-full order-first lg:order-last">
              <div>
                <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">WHO WE ARE</span>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-12 lg:-ml-36 relative z-20">
                  ABOUT US
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <ScrollReveal animation="slide-up" delay={200} duration={1.0} className="space-y-4">
                    <h3 className="text-label-caps font-label-caps text-primary tracking-wider font-bold">01. DESIGNING COMFORT</h3>
                    <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                      CM Interior Design is a premium design studio creating beautiful, practical, and luxurious spaces. We design personalized rooms, false ceilings, custom kitchens, and turnkey interiors.
                    </p>
                  </ScrollReveal>
                  
                  <ScrollReveal animation="slide-up" delay={350} duration={1.0} className="space-y-4">
                    <h3 className="text-label-caps font-label-caps text-primary tracking-wider font-bold">02. QUALITY & TRUST</h3>
                    <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                      With years of expertise, we guarantee high-quality materials, transparent pricing, and on-time completion. We manage everything from start to finish to ensure a stress-free experience.
                    </p>
                  </ScrollReveal>
                </div>

                {/* Sleek Visual Trust Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 mt-12 border-t border-outline-variant/15">
                  <div className="text-left">
                    <span className="block font-serif-display text-4xl md:text-5xl text-secondary font-light">
                      <AnimatedCounter end={150} suffix="+" />
                    </span>
                    <span className="block text-[10px] font-label-caps tracking-[0.15em] uppercase text-on-surface-variant/70 mt-2">COMPLETED PROJECTS</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-serif-display text-4xl md:text-5xl text-secondary font-light">
                      <AnimatedCounter end={120} suffix="+" />
                    </span>
                    <span className="block text-[10px] font-label-caps tracking-[0.15em] uppercase text-on-surface-variant/70 mt-2">HAPPY CLIENTS</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-serif-display text-4xl md:text-5xl text-secondary font-light">
                      <AnimatedCounter end={8} suffix="+" />
                    </span>
                    <span className="block text-[10px] font-label-caps tracking-[0.15em] uppercase text-on-surface-variant/70 mt-2">YEARS EXPERIENCE</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-serif-display text-4xl md:text-5xl text-secondary font-light">
                      <AnimatedCounter end={100} suffix="%" />
                    </span>
                    <span className="block text-[10px] font-label-caps tracking-[0.15em] uppercase text-on-surface-variant/70 mt-2">CUSTOM DESIGNS</span>
                  </div>
                </div>
              </div>
              
              <ScrollReveal animation="slide-up" delay={500} duration={1.0} className="mt-12">
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

      {/* 3. Services Section (Header Top -> Cards Bottom) */}
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
                Bespoke interior work and custom carpentry tailored to your home.
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

      {/* Curved separator transition into Gallery Preview section */}
      <CurveSeparator
        type="concave"
        fillClass="fill-background"
        bgClass="bg-surface"
        className="w-full"
      />

      {/* 4. Gallery Preview Section (Visually compact homepage preview) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-background" id="gallery">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <ScrollReveal animation="slide-up" duration={1.2} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">OUR PROJECTS</span>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-6">
                GALLERY PREVIEW
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                A premium selection of our completed villa, kitchen, and bedroom interior works.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 text-label-caps font-label-caps text-primary hover:text-secondary font-bold transition-all border-b border-primary hover:border-secondary pb-1 decoration-none"
              >
                EXPLORE GALLERY <span className="material-symbols-outlined text-[14px]">north_east</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Curated Grid Layout - 8 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {previewGalleryItems.map((item, index) => (
              <ScrollReveal
                key={item.id}
                animation="scale"
                delay={index * 75}
                duration={1.0}
                className="relative overflow-hidden cursor-zoom-in group aspect-[4/5] border border-outline-variant/10 bg-surface-container hover:shadow-lg transition-all duration-500"
              >
                <div onClick={() => handleOpenLightbox(index)} className="w-full h-full relative">
                  <Image
                    alt={item.title}
                    src={item.imageUrl}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none z-10">
                    <span className="text-[9px] font-label-caps tracking-widest text-secondary mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-white text-[12px] font-serif-display uppercase mb-2">
                      {item.title}
                    </h4>
                    <span className="text-[9px] font-label-caps tracking-widest text-white border-b border-white w-fit pb-0.5">
                      VIEW PROJECT
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary px-8 py-4 font-label-caps text-label-caps tracking-widest no-underline transition-all font-bold text-[12px] rounded-none cursor-pointer"
            >
              VIEW ALL PROJECTS <span className="material-symbols-outlined text-[14px]">north_east</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Curved separator transition into Transformations section */}
      <CurveSeparator
        type="convex"
        fillClass="fill-surface-container-lowest"
        bgClass="bg-background"
        className="w-full"
      />

      {/* 5. Before & After Showcase Section */}
      <BeforeAfterSlider />

      {/* Instagram Feed Section */}
      <InstagramSection />

      {/* Curved separator transition into Contact CTA section */}
      <CurveSeparator
        type="concave"
        fillClass="fill-surface-container"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* 6. Contact CTA Section */}
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
              className="px-8 py-5 border border-primary text-label-caps font-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300 bg-transparent rounded-none cursor-pointer no-underline text-center font-bold w-full text-[12px] tracking-wider"
            >
              CONTACT US
            </Link>
            <a
              href={getWhatsAppLink(templates.consultation)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-5 bg-secondary text-white text-label-caps font-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-none cursor-pointer no-underline text-center font-bold w-full text-[12px] tracking-wider"
            >
              WHATSAPP US
            </a>
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

      {/* Fullscreen Lightbox Carousel */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setActiveImageIndex((activeImageIndex - 1 + lightboxImages.length) % lightboxImages.length)}
          onNext={() => setActiveImageIndex((activeImageIndex + 1) % lightboxImages.length)}
        />
      )}

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
