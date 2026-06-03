"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, allCategories, contactPhoneNumber } from "@/data/portfolioData";
import Lightbox from "@/components/Lightbox";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Filter projects by category
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "ALL PROJECTS") return true;
    return project.category.toUpperCase() === activeCategory;
  });

  const handleOpenLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full bg-background text-on-surface">
      {/* Hero Section */}
      <section className="relative pt-[160px] md:pt-[200px] pb-12 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <ScrollReveal animation="slide-left" duration={1.2} className="max-w-2xl">
            <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-widest">
              PREMIUM GALLERY
            </span>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-surface uppercase leading-none">
              OUR <br />
              <span className="ml-0 md:ml-24">GALLERY</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-right" duration={1.2} className="hidden md:block text-right mb-4">
            <p className="text-label-caps font-label-caps opacity-65 leading-relaxed text-[11px]">
              EXPERIENCE MODERN MINIMALIST ARCHITECTURE
            </p>
            <span className="material-symbols-outlined text-3xl mt-4 text-secondary">south_east</span>
          </ScrollReveal>
        </div>

        {/* Dynamic Category Filters */}
        <ScrollReveal animation="slide-up" delay={200} duration={1.2} className="flex flex-wrap gap-4 mb-12 border-b border-outline-variant/20 pb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 text-label-caps font-label-caps transition-all cursor-pointer border ${
                activeCategory === cat
                  ? "bg-primary border-primary text-on-primary"
                  : "border-outline/20 text-on-surface hover:bg-surface-container"
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>
      </section>

      {/* Projects List Grid */}
      <div className="px-margin-mobile md:px-margin-desktop pb-section-padding space-y-24">
        {filteredProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          const textAnim = isEven ? "slide-left" : "slide-right";
          const gridAnim = isEven ? "slide-right" : "slide-left";

          return (
            <section key={project.id} className="py-12 border-b border-outline-variant/15 last:border-b-0 overflow-hidden">
              <ScrollReveal animation={textAnim} duration={1.2} className="mb-10 max-w-4xl">
                <span className="text-label-caps font-label-caps text-secondary block mb-2 tracking-[0.2em]">{project.category}</span>
                <h2 className="text-headline-xl font-headline-xl mb-4 font-bold text-primary tracking-tight uppercase">{project.title}</h2>
                <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed opacity-85">{project.description}</p>
              </ScrollReveal>

              {/* Grid of all images for the project - Staggered scroll entrance */}
              <ScrollReveal animation={gridAnim} duration={1.2} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {project.images.map((img, imgIndex) => (
                  <ScrollReveal
                    key={imgIndex}
                    animation="scale"
                    delay={imgIndex * 75}
                    duration={1.0}
                    className="relative aspect-square overflow-hidden cursor-zoom-in group border border-outline-variant/10 bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-500"
                  >
                    <div onClick={() => handleOpenLightbox(project.images, imgIndex)} className="w-full h-full">
                      <ScrollParallax speed={-0.06} scaleStart={1.03} scaleEnd={1.12} className="w-full h-full">
                        <Image
                          alt={`${project.title} Image ${imgIndex + 1}`}
                          src={img}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </ScrollParallax>
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none z-10">
                        <span className="text-on-primary text-[10px] font-label-caps tracking-widest">VIEW FULLSCREEN</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </ScrollReveal>
            </section>
          );
        })}
      </div>

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
    </div>
  );
}
