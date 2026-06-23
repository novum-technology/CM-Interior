"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

const PROJECTS = [
  {
    id: "living-room",
    title: "Luxury Living Room Makeover",
    category: "Living Room",
    description: "An empty, raw concrete workspace transformed into a premium lounge featuring custom oak wood paneling, warm ambient LED lighting, and polished light marble flooring.",
    beforeImage: "/images/transformations/living_before.png",
    afterImage: "/images/transformations/living_after.png",
  },
  {
    id: "kitchen",
    title: "Modern Modular Kitchen Makeover",
    category: "Kitchen Renovation",
    description: "A dark and cluttered 1990s kitchen completely redesigned into a bright, sleek luxury culinary zone with flat-panel white cabinets, gold accents, and a marble waterfall island.",
    beforeImage: "/images/transformations/kitchen_before.png",
    afterImage: "/images/transformations/kitchen_after.png",
  }
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = PROJECTS[activeTab];

  // Mouse & Touch interaction logic
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent screen scroll conflicts when actively sliding
      if (e.cancelable) {
        e.preventDefault();
      }
      handleMove(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-section-padding bg-surface-container-lowest" id="transformations">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Title Block */}
        <ScrollReveal animation="slide-up" duration={1.2} className="mb-12 text-center">
          <span className="text-label-caps font-label-caps text-secondary block mb-4 tracking-[0.2em]">TRANSFORMATIONS</span>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif-display font-light uppercase text-primary leading-none mb-6">
            BEFORE & AFTER
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto">
            See how we transform dark, empty rooms into comfortable designer spaces.
          </p>
        </ScrollReveal>

        {/* Tab Selectors */}
        <ScrollReveal animation="slide-up" delay={200} duration={1.2} className="flex justify-center gap-4 mb-10">
          {PROJECTS.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => {
                setActiveTab(idx);
                setSliderPos(50);
              }}
              className={`px-8 py-3 text-label-caps font-label-caps font-bold transition-all border rounded-none cursor-pointer ${
                activeTab === idx
                  ? "bg-primary text-white border-primary"
                  : "bg-transparent text-primary border-primary/20 hover:border-primary"
              }`}
            >
              {project.category}
            </button>
          ))}
        </ScrollReveal>

        {/* Comparison Showcase Centered */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Active Room Title */}
          <ScrollReveal animation="fade" delay={250} duration={1.0} className="text-center">
            <h3 className="text-2xl md:text-3xl font-serif-display font-light text-primary uppercase tracking-wide">
              {activeProject.title}
            </h3>
          </ScrollReveal>

          {/* Interactive Slider Container Centered */}
          <ScrollReveal animation="slide-up" delay={300} duration={1.2} className="w-full">
            <div
              ref={containerRef}
              onClick={handleContainerClick}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl shadow-xl select-none cursor-ew-resize group bg-surface-container-high border border-outline-variant/20"
            >
              {/* BEFORE IMAGE (Bottom Layer) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <Image
                  alt={`Before condition of ${activeProject.title}`}
                  src={activeProject.beforeImage}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <span className="absolute left-6 bottom-6 bg-black/55 backdrop-blur-[4px] text-white text-[10px] tracking-[0.2em] px-4 py-2 font-bold font-label-caps select-none z-10">
                  BEFORE
                </span>
              </div>

              {/* AFTER IMAGE (Top Layer with Clip Path reveal) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                  willChange: "clip-path",
                }}
              >
                <Image
                  alt={`Completed transformation of ${activeProject.title}`}
                  src={activeProject.afterImage}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <span className="absolute right-6 bottom-6 bg-secondary text-white text-[10px] tracking-[0.2em] px-4 py-2 font-bold font-label-caps select-none z-10">
                  AFTER
                </span>
              </div>

              {/* Interactive Drag Handle (wide invisible grab zone with thin white line inside) */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                className="absolute top-0 bottom-0 w-[48px] -translate-x-1/2 cursor-ew-resize z-20 flex items-center justify-center"
                style={{
                  left: `${sliderPos}%`,
                }}
              >
                {/* Thin visual white line inside grab zone */}
                <div className="w-[2px] h-full bg-white group-hover:bg-secondary transition-colors shadow-lg" style={{ boxShadow: "0 0 10px rgba(0,0,0,0.3)" }} />

                {/* Custom circular drag knob */}
                <div className="absolute w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-2xl border border-outline-variant/30 select-none pointer-events-none">
                  <span className="material-symbols-outlined text-[20px] select-none">swap_horiz</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Centered Drag Instruction Banner */}
          <ScrollReveal animation="fade" delay={350} duration={1.0} className="text-center pt-2">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-surface-container-high/40 border border-outline-variant/20 rounded-full text-body-md text-on-surface-variant font-medium tracking-wide">
              <span className="material-symbols-outlined text-[18px] animate-pulse text-secondary">drag_click</span>
              Drag the center bar left or right to see full view
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
