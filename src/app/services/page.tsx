"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/portfolioData";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";
import { getWhatsAppLink, templates } from "@/utils/whatsapp";
import CurveSeparator from "@/components/CurveSeparator";

export default function ServicesPage() {
  const [squareFootage, setSquareFootage] = useState("");
  const [selectedService, setSelectedService] = useState("Interior Design");
  const [calculatedEstimate, setCalculatedEstimate] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const sqft = parseFloat(squareFootage);
    if (isNaN(sqft) || sqft <= 0) return;
    
    const rates: Record<string, number> = {
      "Interior Design": 45,
      "Interior Gypsum Works": 25,
      "Wall Paneling": 30,
      "PVC Wall Panel": 18,
      "Window Curtains": 15,
      "Plywood Works": 35,
      "Residential Interiors": 50,
      "Villa Interiors": 85,
      "Apartment Interiors": 48,
      "Commercial Interiors": 65,
      "Office Interiors": 55,
      "Turnkey Interior Solutions": 120,
    };
    
    const rate = rates[selectedService] || 45;
    setCalculatedEstimate(sqft * rate);
  };

  return (
    <div className="w-full bg-background text-on-surface">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center overflow-hidden bg-primary text-on-primary">
        <ScrollParallax speed={-0.15} scaleStart={1} scaleEnd={1.12} className="absolute inset-0 z-0 w-full h-full opacity-70">
          <Image
            alt="Premium materials and samples moodboard"
            src="/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.12 PM.webp"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </ScrollParallax>
        
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent z-[2]"></div>
        
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <ScrollReveal animation="slide-up" delay={150} duration={1.2}>
              <span className="text-label-caps font-label-caps text-secondary mb-6 block tracking-[0.3em]">
                WHAT WE DO
              </span>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={300} duration={1.2}>
              <h1 className="font-display-lg text-white mb-0 leading-none uppercase">
                SERVICES
              </h1>
            </ScrollReveal>
          </div>
        </div>

        {/* Convex Curve at bottom to transition into services */}
        <CurveSeparator
          type="convex"
          fillClass="fill-surface-container-lowest"
          className="absolute bottom-0 left-0 w-full z-10"
        />
      </section>

      {/* 2. Services Grid Alternating Layout */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="services-list">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="slide-up" duration={1.2} className="mb-24 grid grid-cols-12 gap-gutter items-end">
            <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
              <p className="text-label-caps font-label-caps opacity-60">SERVICES WE OFFER</p>
              <h3 className="font-display-lg leading-none uppercase text-primary">
                OUR <br /> SERVICES
              </h3>
            </div>
            <div className="col-span-12 md:col-span-4 text-right hidden md:block">
              <span className="text-label-caps font-label-caps font-bold opacity-20 text-headline-lg text-primary">CM INTERIOR DESIGN</span>
            </div>
          </ScrollReveal>

          <div className="space-y-32">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
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
                    <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div>
                      <a
                        href={getWhatsAppLink(templates.quote(service.title))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary px-8 py-4 font-label-caps text-label-caps tracking-widest no-underline transition-all font-bold"
                      >
                        GET A QUOTE
                      </a>
                    </div>
                  </ScrollReveal>

                  {/* Image column with parallax zoom */}
                  <ScrollReveal
                    animation={imageAnimation}
                    duration={1.2}
                    className={`col-span-12 md:col-span-6 relative order-1 ${
                      isEven ? "md:order-2 md:col-start-7" : "md:order-1 md:col-start-2"
                    }`}
                  >
                    <div
                      className={`absolute -top-16 font-number-outline text-[90px] md:text-[120px] leading-none opacity-20 select-none ${
                        isEven ? "right-0" : "left-0"
                      }`}
                    >
                      {service.id}
                    </div>
                    
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
        </div>
      </section>

      {/* S-curve transition from services list to calculator section */}
      <CurveSeparator
        type="s-curve"
        fillClass="fill-surface-container"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* 3. Interactive Estimate Calculator Section */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container" id="calculator">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal animation="slide-up" duration={1.2} className="mb-12">
            <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-[0.2em]">COST ESTIMATOR</span>
            <h2 className="text-4xl sm:text-5xl font-serif-display font-light uppercase text-primary mb-6">
              GET A QUICK ESTIMATE
            </h2>
            <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">
              Enter your room size below to get a quick estimate of the design and setup costs.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="scale" duration={1.2} className="bg-background text-on-surface p-8 md:p-12 border border-outline-variant/30 text-left">
            <form onSubmit={handleCalculate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="serv-calc" className="text-label-caps font-label-caps block mb-2 opacity-65">WHAT SERVICE DO YOU NEED?</label>
                  <select
                    id="serv-calc"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-3 px-0 font-body-lg text-body-lg transition-all focus:ring-0 appearance-none rounded-none text-primary"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="area-calc" className="text-label-caps font-label-caps block mb-2 opacity-65">SIZE OF YOUR SPACE (SQ. FT.)</label>
                  <input
                    id="area-calc"
                    type="number"
                    required
                    placeholder="e.g. 1500"
                    value={squareFootage}
                    onChange={(e) => setSquareFootage(e.target.value)}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-3 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-5 font-label-caps text-label-caps tracking-widest hover:bg-secondary transition-colors cursor-pointer rounded-none border-none font-bold"
              >
                GET ESTIMATE
              </button>
            </form>

            {calculatedEstimate !== null && (
              <div className="mt-12 p-6 bg-surface-container border border-outline-variant/20 text-center animate-fade-in">
                <span className="text-label-caps font-label-caps opacity-50 block mb-1">ESTIMATED PRICE</span>
                <span className="font-headline-xl text-secondary text-3xl md:text-5xl font-bold">
                  ${calculatedEstimate.toLocaleString()}
                </span>
                <p className="text-body-md text-on-surface-variant mt-4 text-[12px] max-w-md mx-auto leading-relaxed">
                  *This is a rough starting estimate. Contact us for a detailed quote based on your choice of materials and design.
                </p>
                <div className="mt-6">
                  <a
                    href={getWhatsAppLink(
                      `Hello, I calculated a provisional estimate of $${calculatedEstimate.toLocaleString()} for my ${selectedService} project (${squareFootage} sqft) using your calculator. Let's discuss this.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-secondary text-on-secondary px-8 py-4 font-label-caps text-label-caps tracking-widest hover:bg-primary transition-all rounded-none border-none no-underline font-bold"
                  >
                    WHATSAPP US
                  </a>
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Concave Curve at bottom of Services page to transition into global footer */}
      <CurveSeparator
        type="concave"
        fillClass="fill-tertiary"
        bgClass="bg-surface-container"
        className="w-full"
      />
    </div>
  );
}
