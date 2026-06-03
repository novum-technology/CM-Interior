"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryItems, allCategories } from "@/data/portfolioData";
import Lightbox from "@/components/Lightbox";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Filter gallery items
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "ALL PROJECTS") return true;
    return item.category.toUpperCase() === activeCategory;
  });

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  // Map filtered array index to fullscreen slides
  const slideImages = filteredItems.map((item) => item.imageUrl);

  return (
    <div className="w-full bg-background text-on-surface">
      {/* Page Header */}
      <section className="relative pt-[160px] md:pt-[200px] pb-12 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <ScrollReveal animation="slide-left" duration={1.2} className="max-w-2xl mb-12">
          <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-widest">
            VISUAL ARCHIVES
          </span>
          <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-surface uppercase leading-none">
            IMAGE <br />
            <span className="ml-0 md:ml-24">GALLERY</span>
          </h1>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal animation="slide-up" delay={200} duration={1.2} className="flex flex-wrap gap-4 mb-16 border-b border-outline-variant/20 pb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxOpen(false);
              }}
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

      {/* Masonry Columns Layout */}
      <section className="px-margin-mobile md:px-margin-desktop pb-section-padding">
        {filteredItems.length === 0 ? (
          <div className="py-24 text-center text-on-surface-variant opacity-60">
            No gallery items found under this category.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <ScrollReveal
                key={item.id}
                animation="scale"
                delay={(index % 3) * 100}
                duration={1.0}
                className="relative overflow-hidden cursor-zoom-in group break-inside-avoid border border-outline-variant/10 bg-surface-container hover:shadow-lg transition-all duration-500 mb-6"
              >
                <div onClick={() => handleOpenLightbox(index)} className="w-full h-full">
                  <div className="relative w-full aspect-[4/5] sm:aspect-auto">
                    {/* Using standard img for fluid heights in columns masonry */}
                    <img
                      alt={item.title}
                      src={item.imageUrl}
                      className="w-full h-auto object-cover grayscale hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                  {/* Hover title overlays */}
                  <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none z-10">
                    <div className="text-on-primary">
                      <span className="text-label-caps font-label-caps block mb-1 text-[10px] opacity-75">
                        {item.category}
                      </span>
                      <h3 className="text-body-md font-bold tracking-tight">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Fullscreen Lightbox Carousel */}
      {lightboxOpen && (
        <Lightbox
          images={slideImages}
          currentIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setActiveImageIndex((activeImageIndex - 1 + slideImages.length) % slideImages.length)}
          onNext={() => setActiveImageIndex((activeImageIndex + 1) % slideImages.length)}
        />
      )}
    </div>
  );
}
