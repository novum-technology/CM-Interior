"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { projects, brandName } from "@/data/portfolioData";
import Lightbox from "@/components/Lightbox";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  // Find project
  const project = projects.find((p) => p.id === projectId);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-on-surface">
        <h1 className="text-display-lg-mobile font-display-lg-mobile mb-4">404</h1>
        <p className="text-body-lg font-body-lg mb-8 opacity-60">Project Specs Not Found</p>
        <Link
          href="/portfolio"
          className="px-10 py-5 bg-primary text-on-primary text-label-caps font-label-caps hover:bg-secondary transition-colors"
        >
          BACK TO GALLERY
        </Link>
      </div>
    );
  }

  // Find next project to display as dynamic link
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full bg-background text-on-surface">
      {/* 1. Hero Header */}
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-end pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 z-0">
          <Image
            alt={`${project.title} Concept Hero`}
            src={project.mainImage || project.images[0]}
            fill
            priority
            unoptimized
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
          <div className="col-span-12 md:col-span-8">
            <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-[0.2em]">
              {project.category}
            </span>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg leading-none mb-0">
              {project.title}
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 mt-8 md:mt-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-l border-outline-variant/30 pl-6">
              <div>
                <span className="text-label-caps font-label-caps opacity-50 block mb-1">LOCATION</span>
                <span className="text-body-md font-body-md font-bold">{project.location}</span>
              </div>
              <div>
                <span className="text-label-caps font-label-caps opacity-50 block mb-1">TIMELINE</span>
                <span className="text-body-md font-body-md font-bold">{project.execution}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Conceptual Outline */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop grid-blueprint relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          <div className="col-span-12 md:col-span-4 sticky top-32">
            <h2 className="text-label-caps font-label-caps text-secondary mb-6">ARCHITECTURAL LOGS</h2>
            <h3 className="text-headline-xl font-headline-xl leading-none mb-8">THE CONCEPT</h3>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
              Every detail is meticulously calculated to balance structural elements, lighting ratios, and luxury material finishes.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 mt-12 md:mt-0 space-y-12">
            <p className="text-body-lg font-body-lg leading-relaxed text-primary">
              {project.concept}
            </p>
            <div className="h-[1px] w-full bg-outline-variant/30"></div>
            <div>
              <h4 className="text-label-caps font-label-caps mb-4 opacity-50">DESIGN HIGHLIGHTS</h4>
              <ul className="space-y-4 text-body-md font-body-md text-on-surface-variant list-disc pl-5">
                <li>Strict structural geometry conforming to a 0px border rounding layout.</li>
                <li>Strategic ambient lighting integration casting natural spatial contours.</li>
                <li>Curated stone overlays combined with premium timber frameworks.</li>
                <li>Ergonomic design flow optimizing spatial transitions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery Masonry */}
      <section className="py-24 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
        <div className="mb-16">
          <span className="text-label-caps font-label-caps text-secondary block mb-2">GALLERY INDEX</span>
          <h2 className="text-headline-xl font-headline-xl leading-none">SPECIFICATION IMAGERY</h2>
        </div>

        {/* Asymmetrical gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.images.map((img, index) => {
            const spanClass =
              index === 0
                ? "md:col-span-2 md:row-span-2 h-[350px] md:h-[600px]"
                : "h-[200px] md:h-[288px]";
            return (
              <div
                key={index}
                onClick={() => handleOpenLightbox(index)}
                className={`relative overflow-hidden cursor-zoom-in group border border-outline-variant/10 ${spanClass}`}
              >
                <Image
                  alt={`${project.title} Specification Detail ${index + 1}`}
                  src={img}
                  fill
                  unoptimized
                  className="object-cover grayscale hover:grayscale-0 group-hover:scale-103 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 pointer-events-none">
                  <span className="text-on-primary text-label-caps font-label-caps">
                    VIEW SPEC {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Sequential Project Navigation */}
      <section className="py-24 border-t border-outline-variant/20 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link
            href="/portfolio"
            className="text-label-caps font-label-caps text-on-surface hover:text-secondary transition-colors inline-flex items-center gap-2 decoration-none font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> BACK TO GALLERY
          </Link>
          <div className="text-center md:text-right">
            <span className="text-label-caps font-label-caps opacity-50 block mb-2">NEXT PROJECT</span>
            <Link
              href={`/portfolio/${nextProject.id}`}
              className="text-headline-lg font-headline-lg font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-4 decoration-none"
            >
              {nextProject.title} <span className="material-symbols-outlined text-[24px]">north_east</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Module */}
      {lightboxOpen && (
        <Lightbox
          images={project.images}
          currentIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setActiveImageIndex((activeImageIndex - 1 + project.images.length) % project.images.length)}
          onNext={() => setActiveImageIndex((activeImageIndex + 1) % project.images.length)}
        />
      )}
    </div>
  );
}
