"use client";

import { useState } from "react";
import Image from "next/image";
import {
  contactPhoneNumber,
  contactEmail,
  contactAddress,
  openingHours,
  brandName,
} from "@/data/portfolioData";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Interior Design",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        service: "Interior Design",
        message: "",
      });
    }, 2500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full bg-background text-on-surface">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center px-margin-mobile md:px-margin-desktop overflow-hidden">
        {/* Parallax Hero Background */}
        <ScrollParallax speed={-0.15} scaleStart={1} scaleEnd={1.12} className="absolute inset-0 z-0 w-full h-full">
          <Image
            alt="Serene luxury living room with soft natural daylight washing over cream modular sofa"
            src="/images/home_hero.webp"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </ScrollParallax>
        
        <div className="relative z-10 w-full max-w-5xl">
          <ScrollReveal animation="slide-up" delay={150} duration={1.2}>
            <span className="text-label-caps font-label-caps mb-4 block tracking-[0.3em] opacity-60">
              GET IN TOUCH
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={300} duration={1.2}>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-1 leading-none uppercase">
              CONTACT
            </h1>
            <span className="text-label-caps font-label-caps text-secondary block tracking-[0.2em] uppercase font-bold text-[13px] md:text-[16px] mt-1">
              CM INTERIOR DESIGN
            </span>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={450} duration={1.2}>
            <div className="w-24 h-px bg-primary/30"></div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal animation="slide-right" delay={600} duration={1.2} className="absolute bottom-margin-desktop right-margin-desktop hidden md:block">
          <p className="text-label-caps font-label-caps rotate-90 origin-bottom-right opacity-40">
            SCROLL TO DISCOVER
          </p>
        </ScrollReveal>
      </section>

      {/* 2. Info Section (Asymmetric) - Content Left -> Details Right */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          {/* Atelier Ethos slides from left */}
          <ScrollReveal animation="slide-left" duration={1.2} className="md:col-span-4 md:sticky md:top-32">
            <h2 className="font-headline-xl text-headline-xl mb-12 uppercase leading-none">
              ATELIER<br />ETHOS
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm mb-12 leading-relaxed">
              We believe that a well-designed space is the foundation of a balanced life. Reach out to start your transformation.
            </p>
            <div className="border border-primary/10 p-8 inline-block w-full sm:w-auto hover:bg-surface-container-low hover:border-primary/20 transition-all duration-500">
              <span className="text-label-caps font-label-caps block mb-2 opacity-50">PHONE ENQUIRIES</span>
              <a
                href={`tel:${contactPhoneNumber.replace(/\s+/g, "")}`}
                className="font-headline-lg text-headline-lg hover:text-secondary transition-colors"
              >
                {contactPhoneNumber}
              </a>
            </div>
          </ScrollReveal>

          {/* Details slide from right */}
          <ScrollReveal animation="slide-right" duration={1.2} className="md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-12 mt-16 md:mt-0">
            <div className="space-y-4">
              <span className="text-label-caps font-label-caps opacity-50 block">ADDRESS</span>
              <p className="font-body-lg text-body-lg leading-relaxed">{contactAddress}</p>
              <div className="w-12 h-px bg-primary/20"></div>
            </div>
            
            <div className="space-y-4">
              <span className="text-label-caps font-label-caps opacity-50 block">EMAIL</span>
              <p className="font-body-lg text-body-lg leading-relaxed">
                {contactEmail}
                <br />
                projects@cminteriordesign.com
              </p>
              <div className="w-12 h-px bg-primary/20"></div>
            </div>
            
            <div className="space-y-4 sm:col-span-2">
              <span className="text-label-caps font-label-caps opacity-50 block">OPENING HOURS</span>
              {openingHours.map((oh, i) => (
                <div
                  key={i}
                  className={`flex justify-between max-w-xs ${oh.closed ? "opacity-40" : ""}`}
                >
                  <span className="font-body-md text-body-md">{oh.days}</span>
                  <span className="font-body-md text-body-md">{oh.hours}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Form Section - Artwork Left -> Form Right */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface overflow-hidden">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative">
          {/* Form left artwork slides from left */}
          <ScrollReveal animation="slide-left" duration={1.2} className="relative order-2 lg:order-1 aspect-[4/5] w-full">
            <div className="absolute -top-12 -left-12 font-number-outline text-number-outline text-outline/10 select-none">
              01
            </div>
            <div className="relative w-full h-full overflow-hidden shadow-lg">
              <ScrollParallax speed={-0.08} scaleStart={1.05} scaleEnd={1.15} className="w-full h-full">
                <Image
                  alt="High contrast plaster wall corners with clay sculpture on wooden pedestal"
                  src="/images/plaster_art.png"
                  fill
                  unoptimized
                  className="object-cover relative z-10"
                />
              </ScrollParallax>
            </div>
            <div className="absolute -bottom-10 -right-10 w-2/3 h-1/2 bg-surface-container-high -z-10 hidden md:block"></div>
          </ScrollReveal>

          {/* Form container slides from right */}
          <ScrollReveal animation="slide-right" duration={1.2} className="order-1 lg:order-2 flex flex-col justify-center">
            <h2 className="font-headline-xl text-headline-xl mb-4 leading-none uppercase">
              START YOUR<br />PROJECT
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-md">
              Fill out the form below and our lead architect will contact you within 24 hours to discuss your vision.
            </p>

            {submitted ? (
              <div className="py-12 bg-surface-container border border-outline-variant/30 text-center text-secondary animate-fade-in">
                <span className="material-symbols-outlined text-[64px] mb-4">check_circle</span>
                <p className="text-label-caps font-label-caps">THANK YOU! REQUEST SUBMITTED</p>
                <p className="text-body-md font-body-md text-on-surface-variant mt-2">
                  Our lead designer will reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="relative">
                  <label className="text-label-caps font-label-caps block mb-2 opacity-60">FULL NAME</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-4 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative">
                    <label className="text-label-caps font-label-caps block mb-2 opacity-60">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-4 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                    />
                  </div>
                  
                  <div className="relative">
                    <label className="text-label-caps font-label-caps block mb-2 opacity-60">
                      SERVICE REQUIRED
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-4 px-0 font-body-lg text-body-lg transition-all focus:ring-0 focus:outline-none appearance-none rounded-none"
                    >
                      <option>Interior Design</option>
                      <option>Turnkey Renovation</option>
                      <option>Material Selection</option>
                      <option>Architectural Supervision</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-label-caps font-label-caps block mb-2 opacity-60">MESSAGE</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your space..."
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-4 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 resize-none focus:outline-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="group inline-flex items-center space-x-4 bg-primary text-on-primary px-12 py-6 rounded-none hover:bg-secondary transition-all active:scale-95 border-none cursor-pointer"
                >
                  <span className="text-label-caps font-label-caps font-bold">SEND REQUEST</span>
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                    north_east
                  </span>
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Grayscale Map Section */}
      <ScrollReveal animation="fade" duration={1.5} className="w-full h-[400px] md:h-[600px] relative bg-surface-container overflow-hidden group">
        <ScrollParallax speed={-0.12} className="absolute inset-0 w-full h-full grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1200ms]">
          <Image
            alt="Calicut Kerala headquarters maps layout"
            src="/images/office_map.png"
            fill
            unoptimized
            className="object-cover"
          />
        </ScrollParallax>
        
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface opacity-80 pointer-events-none z-[2]"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none select-none">
          <div className="w-12 h-12 bg-primary flex items-center justify-center text-on-primary animate-bounce">
            <span className="material-symbols-outlined text-[24px]">location_on</span>
          </div>
          <div className="mt-4 bg-white px-6 py-3 shadow-lg border border-primary/10">
            <p className="text-label-caps font-label-caps text-on-surface text-[10px] tracking-widest font-bold">
              {brandName} HEADQUARTERS
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
