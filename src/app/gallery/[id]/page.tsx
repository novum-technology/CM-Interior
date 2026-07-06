"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/data/portfolioData";
import Lightbox from "@/components/Lightbox";
import { getWhatsAppLink, templates } from "@/utils/whatsapp";
import CurveSeparator from "@/components/CurveSeparator";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  // Find project
  const project = projects.find((p) => p.id === projectId);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [projectImages, setProjectImages] = useState<string[]>(project?.images || []);

  useEffect(() => {
    if (!project) return;

    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const categoryGalleryItems = data.filter(
            (item) => item.category.toUpperCase() === project.category.toUpperCase()
          );
          const dynamicImageUrls = categoryGalleryItems.map((item) => item.imageUrl);
          const combinedImages = Array.from(new Set([...project.images, ...dynamicImageUrls]));
          setProjectImages(combinedImages);
        }
      })
      .catch((err) => console.error("Failed to fetch dynamic gallery for project details:", err));
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-on-surface">
        <h1 className="font-display-lg-mobile mb-4">404</h1>
        <p className="text-body-lg font-body-lg mb-8 opacity-60">Project Specs Not Found</p>
        <Link
          href="/gallery"
          className="px-10 py-5 bg-primary text-on-primary text-label-caps font-label-caps hover:bg-secondary transition-colors no-underline font-bold"
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
            src={project.mainImage || projectImages[0]}
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
            <h1 className="font-display-lg leading-none mb-0">
              {project.title}
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 mt-8 md:mt-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-l border-outline-variant/30 pl-6">
              <div>
                <span className="text-label-caps font-label-caps opacity-50 block mb-1">Location</span>
                <span className="text-body-md font-body-md font-bold">{project.location}</span>
              </div>
              <div>
                <span className="text-label-caps font-label-caps opacity-50 block mb-1">Work Duration</span>
                <span className="text-body-md font-body-md font-bold">{project.execution}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Convex transition curve into outline section */}
        <CurveSeparator
          type="convex"
          fillClass="fill-background"
          className="absolute bottom-0 left-0 w-full z-10"
        />
      </section>

      {/* 2. Conceptual Outline */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop grid-blueprint relative bg-background">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          <div className="col-span-12 md:col-span-4 sticky top-32">
            <h2 className="text-label-caps font-label-caps text-secondary mb-6">THE WORK DETAILS</h2>
            <h3 className="font-headline-xl leading-none mb-8">How We Did It</h3>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
              We planned every detail carefully to make the space comfortable, well-lit, and functional.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 mt-12 md:mt-0 space-y-12">
            <p className="text-body-lg font-body-lg leading-relaxed text-primary">
              {project.concept}
            </p>
            <div className="h-[1px] w-full bg-outline-variant/30"></div>
            <div>
              <h4 className="text-label-caps font-label-caps mb-4 opacity-50">Key Features</h4>
              <ul className="space-y-4 text-body-md font-body-md text-on-surface-variant list-disc pl-5">
                <li>Modern and clean layouts designed for daily comfort.</li>
                <li>Smart placement of lights to make rooms look spacious and bright.</li>
                <li>Quality materials selected for durability and easy maintenance.</li>
                <li>Smart storage spaces to keep rooms tidy.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Concave transition curve into photo gallery */}
      <CurveSeparator
        type="concave"
        fillClass="fill-surface-container-low"
        bgClass="bg-background"
        className="w-full"
      />

      {/* 3. Photo Gallery Masonry */}
      <section className="py-24 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
        <div className="mb-16">
          <span className="text-label-caps font-label-caps text-secondary block mb-2">PROJECT PHOTO GALLERY</span>
          <h2 className="font-headline-xl leading-none">Room Details & Angles</h2>
        </div>

        {/* Asymmetrical gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {projectImages.map((img, index) => {
            const spanClass =
              index === 0
                ? "col-span-2 md:col-span-2 md:row-span-2 h-[260px] sm:h-[350px] md:h-[600px]"
                : "col-span-1 h-[130px] sm:h-[200px] md:h-[288px]";
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
                    View Image {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* S-curve transition into WhatsApp discuss section */}
      <CurveSeparator
        type="s-curve"
        fillClass="fill-surface-container"
        bgClass="bg-surface-container-low"
        className="w-full"
      />

      {/* Discuss This Design WhatsApp Section */}
      <section className="py-20 bg-surface-container px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-widest">
            LOVE THIS DESIGN?
          </span>
          <h2 className="text-4xl md:text-5xl font-serif-display font-light text-primary mb-8 uppercase leading-tight">
            Get a similar look <br />
            <span className="italic font-light">for your home</span>
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Chat with us on WhatsApp to discuss how we can create a similar beautiful look for your house or apartment.
          </p>
          <a
            href={getWhatsAppLink(templates.projectInquiry(project.title))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary px-10 py-5 font-label-caps text-label-caps tracking-widest no-underline transition-all font-bold"
          >
            WHATSAPP US ABOUT THIS DESIGN
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.63 2.021 14.155.997 11.53.997c-5.445 0-9.871 4.372-9.875 9.802-.001 1.77.476 3.498 1.39 5.041L2.093 21.93l6.113-1.604-.002-.002-.556-.372-.001-.001zm10.742-7.408c-.287-.143-1.696-.826-1.958-.92-.262-.094-.453-.141-.643.143-.19.284-.737.92-.904 1.107-.167.188-.334.212-.62.07-.287-.143-1.21-.441-2.3-1.402-.85-.747-1.423-1.67-1.59-1.954-.167-.285-.018-.439.126-.58.129-.127.287-.33.43-.495.143-.165.19-.282.285-.47.095-.189.047-.354-.024-.496-.07-.142-.643-1.523-.881-2.083-.23-.55-.485-.476-.643-.484-.165-.008-.354-.01-.543-.01-.189 0-.496.07-.756.35-.26.283-1 .958-1 2.336s1.007 2.705 1.15 2.893c.143.19 1.98 2.973 4.796 4.16.67.283 1.192.453 1.6.582.673.21 1.285.18 1.768.109.54-.08 1.696-.882 1.936-1.733.24-.85.24-1.58.167-1.73-.072-.153-.262-.244-.55-.386z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Convex transition curve into footer navigation */}
      <CurveSeparator
        type="convex"
        fillClass="fill-surface-container-lowest"
        bgClass="bg-surface-container"
        className="w-full"
      />

      {/* 4. Sequential Project Navigation */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link
            href="/gallery"
            className="text-label-caps font-label-caps text-on-surface hover:text-secondary transition-colors inline-flex items-center gap-2 decoration-none font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> BACK TO GALLERY
          </Link>
          <div className="text-center md:text-right">
            <span className="text-label-caps font-label-caps opacity-50 block mb-2">Next Design</span>
            <Link
              href={`/gallery/${nextProject.id}`}
              className="text-headline-lg font-headline-lg font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-4 decoration-none"
            >
              {nextProject.title} <span className="material-symbols-outlined text-[24px]">north_east</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Concave transition curve to footer */}
      <CurveSeparator
        type="concave"
        fillClass="fill-tertiary"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* Lightbox Module */}
      {lightboxOpen && (
        <Lightbox
          images={projectImages}
          currentIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setActiveImageIndex((activeImageIndex - 1 + projectImages.length) % projectImages.length)}
          onNext={() => setActiveImageIndex((activeImageIndex + 1) % projectImages.length)}
        />
      )}
    </div>
  );
}
