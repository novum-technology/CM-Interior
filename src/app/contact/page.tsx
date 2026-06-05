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
import { getWhatsAppLink, templates } from "@/utils/whatsapp";
import CurveSeparator from "@/components/CurveSeparator";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    service: "Interior Design",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Send formatted details to WhatsApp
    const message = templates.formInquiry({
      name: formData.name,
      phone: formData.phone,
      projectType: formData.service,
      location: formData.location,
      message: formData.message,
    });
    
    const url = getWhatsAppLink(message);
    window.open(url, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        location: "",
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
            <h1 className="font-display-lg mb-1 leading-none uppercase">
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

        {/* Curved separator transition into Info Section */}
        <CurveSeparator
          type="convex"
          fillClass="fill-surface-container-lowest"
          className="absolute bottom-0 left-0 w-full z-10"
        />
      </section>

      {/* 2. Info Section (Asymmetric) - Content Left -> Details Right */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-lowest overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          {/* Atelier Ethos slides from left */}
          <ScrollReveal animation="slide-left" duration={1.2} className="md:col-span-4 md:sticky md:top-32">
            <h2 className="font-headline-xl mb-12 uppercase leading-none">
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

      {/* Curved separator transition into Consultation Banner */}
      <CurveSeparator
        type="concave"
        fillClass="fill-surface-container-low"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* WhatsApp Consultation Banner Section */}
      <section className="py-16 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-2">
            <span className="text-label-caps font-label-caps text-secondary block tracking-widest text-[11px] font-bold">
              FREE DESIGN CONSULTATION
            </span>
            <h3 className="text-3xl md:text-5xl font-serif-display font-light text-primary mb-4 uppercase leading-none">
              TALK DIRECTLY WITH OUR ARCHITECTS
            </h3>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Get immediate expert feedback, conceptual advice, and structural feasibility inputs on WhatsApp.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href={getWhatsAppLink(templates.consultation)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary px-10 py-5 font-label-caps text-label-caps tracking-widest no-underline transition-all font-bold"
            >
              CHAT ON WHATSAPP
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.63 2.021 14.155.997 11.53.997c-5.445 0-9.871 4.372-9.875 9.802-.001 1.77.476 3.498 1.39 5.041L2.093 21.93l6.113-1.604-.002-.002-.556-.372-.001-.001zm10.742-7.408c-.287-.143-1.696-.826-1.958-.92-.262-.094-.453-.141-.643.143-.19.284-.737.92-.904 1.107-.167.188-.334.212-.62.07-.287-.143-1.21-.441-2.3-1.402-.85-.747-1.423-1.67-1.59-1.954-.167-.285-.018-.439.126-.58.129-.127.287-.33.43-.495.143-.165.19-.282.285-.47.095-.189.047-.354-.024-.496-.07-.142-.643-1.523-.881-2.083-.23-.55-.485-.476-.643-.484-.165-.008-.354-.01-.543-.01-.189 0-.496.07-.756.35-.26.283-1 .958-1 2.336s1.007 2.705 1.15 2.893c.143.19 1.98 2.973 4.796 4.16.67.283 1.192.453 1.6.582.673.21 1.285.18 1.768.109.54-.08 1.696-.882 1.936-1.733.24-.85.24-1.58.167-1.73-.072-.153-.262-.244-.55-.386z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Curved separator transition into Form Section */}
      <CurveSeparator
        type="s-curve"
        fillClass="fill-surface"
        bgClass="bg-surface-container-low"
        className="w-full"
      />

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
            <h2 className="font-headline-xl mb-4 leading-none uppercase">
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
                  <label htmlFor="contact-name" className="text-label-caps font-label-caps block mb-2 opacity-60">FULL NAME</label>
                  <input
                    id="contact-name"
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
                    <label htmlFor="contact-phone" className="text-label-caps font-label-caps block mb-2 opacity-60">
                      CONTACT NUMBER
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 97478 38663"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-4 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                    />
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="contact-service" className="text-label-caps font-label-caps block mb-2 opacity-60">
                      SERVICE REQUIRED
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-4 px-0 font-body-lg text-body-lg transition-all focus:ring-0 focus:outline-none appearance-none rounded-none text-primary"
                    >
                      <option className="bg-background text-primary">Interior Design</option>
                      <option className="bg-background text-primary">Interior Gypsum Works</option>
                      <option className="bg-background text-primary">Wall Paneling</option>
                      <option className="bg-background text-primary">PVC Wall Panel</option>
                      <option className="bg-background text-primary">Window Curtains</option>
                      <option className="bg-background text-primary">Plywood Works</option>
                      <option className="bg-background text-primary">Residential Interiors</option>
                      <option className="bg-background text-primary">Villa Interiors</option>
                      <option className="bg-background text-primary">Apartment Interiors</option>
                      <option className="bg-background text-primary">Commercial Interiors</option>
                      <option className="bg-background text-primary">Office Interiors</option>
                      <option className="bg-background text-primary">Turnkey Interior Solutions</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="contact-location" className="text-label-caps font-label-caps block mb-2 opacity-60">PROJECT LOCATION</label>
                  <input
                    id="contact-location"
                    type="text"
                    name="location"
                    required
                    placeholder="Calicut, Kerala"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-4 px-0 font-body-lg text-body-lg placeholder:opacity-30 transition-all focus:ring-0 focus:outline-none"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="contact-message" className="text-label-caps font-label-caps block mb-2 opacity-60">MESSAGE / REQUIREMENTS</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your space and requirements..."
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
                  <span className="text-label-caps font-label-caps font-bold">SEND ON WHATSAPP</span>
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                    north_east
                  </span>
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Curved separator transition into Map Section */}
      <CurveSeparator
        type="convex"
        fillClass="fill-surface-container"
        bgClass="bg-surface"
        className="w-full"
      />

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

      {/* Curved separator transition into global Footer */}
      <CurveSeparator
        type="concave"
        fillClass="fill-tertiary"
        bgClass="bg-surface-container"
        className="w-full"
      />
    </div>
  );
}
