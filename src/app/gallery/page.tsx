"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, galleryItems, allCategories } from "@/data/portfolioData";
import Lightbox from "@/components/Lightbox";
import { ScrollReveal, ScrollParallax } from "@/components/ScrollReveal";
import { getWhatsAppLink, templates } from "@/utils/whatsapp";
import CurveSeparator from "@/components/CurveSeparator";
import { GalleryItem } from "@/types";

export default function UnifiedGalleryPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "archives">("projects");
  const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const handleMount = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const frame = requestAnimationFrame(handleMount);

    // Check if previewing draft changes from dashboard
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("preview") === "true") {
      const draftData = localStorage.getItem("cms_preview_gallery");
      if (draftData) {
        try {
          const parsed = JSON.parse(draftData);
          if (Array.isArray(parsed)) {
            requestAnimationFrame(() => {
              setItems(parsed);
              setIsPreview(true);
            });
            cancelAnimationFrame(frame);
            return;
          }
        } catch (e) {
          console.error("Failed to parse draft preview data", e);
        }
      }
    }

    // Normal dynamic fetch
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Failed to fetch dynamic gallery:", err));

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  // Filter projects by category
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "ALL PROJECTS") return true;
    return project.category.toUpperCase() === activeCategory;
  });

  // Filter gallery items by category
  const filteredItems = items.filter((item) => {
    if (activeCategory === "ALL PROJECTS") return true;
    return item.category.toUpperCase() === activeCategory;
  });

  const handleOpenLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  // Map filtered archives array index to fullscreen slides
  const archiveSlideImages = filteredItems.map((item) => item.imageUrl);

  return (
    <div className="w-full bg-background text-on-surface">
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 bg-amber-600 text-white py-3.5 px-6 z-[9999] flex items-center justify-between text-xs font-label-caps tracking-widest font-bold shadow-lg backdrop-blur-md bg-opacity-95">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] animate-pulse">visibility</span>
            PREVIEWING DRAFT GALLERY CHANGES (NOT YET PUBLISHED)
          </span>
          <Link
            href="/admin"
            className="border border-white hover:bg-white hover:text-amber-600 px-4 py-1.5 transition-all text-[10px] decoration-none text-white font-bold"
          >
            BACK TO DASHBOARD
          </Link>
        </div>
      )}
      {/* 1. Header Section */}
      <section className="relative pt-[160px] md:pt-[200px] pb-12 px-margin-mobile md:px-margin-desktop overflow-hidden bg-background">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 relative">
          <Link
            href="/admin"
            className="absolute top-0 right-0 text-[10px] font-label-caps tracking-widest opacity-30 hover:opacity-100 transition-opacity decoration-none text-on-surface uppercase flex items-center gap-1 z-20 font-bold"
          >
            <span className="material-symbols-outlined text-[13px]">lock</span>
            Admin Portal
          </Link>
          <ScrollReveal animation="slide-left" duration={1.2} className="max-w-2xl">
            <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-widest">
              OUR WORK
            </span>
            <h1 className="font-display-lg text-on-surface uppercase leading-none">
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
        <ScrollReveal animation="slide-up" delay={200} duration={1.2} className="flex overflow-x-auto flex-nowrap gap-2 md:gap-4 mb-8 border-b border-outline-variant/20 pb-8 scrollbar-none -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 select-none">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxOpen(false);
              }}
              className={`shrink-0 px-6 py-3 text-label-caps font-label-caps transition-all cursor-pointer border ${
                activeCategory === cat
                  ? "bg-primary border-primary text-on-primary"
                  : "border-outline/20 text-on-surface hover:bg-surface-container"
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        {/* Convex transition curve into content grids */}
        <CurveSeparator
          type="convex"
          fillClass="fill-surface-container-lowest"
          className="absolute bottom-0 left-0 w-full z-10"
        />
      </section>

      {/* 2. Main Content Grids Section (Tab Switcher) */}
      <section className="py-16 bg-surface-container-lowest px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          
          {/* Tab Switcher Buttons */}
          <ScrollReveal animation="slide-up" duration={1.2} className="flex justify-center border-b border-outline-variant/10 mb-16">
            <button
              onClick={() => {
                setActiveTab("projects");
                setLightboxOpen(false);
              }}
              className={`px-8 md:px-12 py-5 font-label-caps text-label-caps tracking-widest border-b-2 transition-all cursor-pointer bg-transparent border-none ${
                activeTab === "projects"
                  ? "border-primary! text-primary font-bold"
                  : "border-transparent! text-on-surface-variant opacity-60 hover:opacity-100"
              }`}
            >
              COMPLETED HOMES
            </button>
            <button
              onClick={() => {
                setActiveTab("archives");
                setLightboxOpen(false);
              }}
              className={`px-8 md:px-12 py-5 font-label-caps text-label-caps tracking-widest border-b-2 transition-all cursor-pointer bg-transparent border-none ${
                activeTab === "archives"
                  ? "border-primary! text-primary font-bold"
                  : "border-transparent! text-on-surface-variant opacity-60 hover:opacity-100"
              }`}
            >
              PHOTO GALLERY
            </button>
          </ScrollReveal>

          {/* Render Tab Contents */}
          {activeTab === "projects" ? (
            /* TAB: PROJECT CASE STUDIES */
            <div className="space-y-24">
              {filteredProjects.length === 0 ? (
                <div className="py-24 text-center text-on-surface-variant opacity-60">
                  No projects found under this category.
                </div>
              ) : (
                filteredProjects.map((project, index) => {
                  const isEven = index % 2 === 0;
                  const textAnim = isEven ? "slide-left" : "slide-right";
                  const gridAnim = isEven ? "slide-right" : "slide-left";

                  return (
                    <div key={project.id} className="py-12 border-b border-outline-variant/15 last:border-b-0 overflow-hidden">
                      <ScrollReveal animation={textAnim} duration={1.2} className="mb-10 max-w-4xl">
                        <span className="text-label-caps font-label-caps text-secondary block mb-2 tracking-[0.2em]">{project.category}</span>
                        <h2 className="text-3xl md:text-5xl font-serif-display font-light mb-4 text-primary uppercase tracking-tight">
                          <Link href={`/gallery/${project.id}`} className="hover:text-secondary transition-colors no-underline text-primary">
                            {project.title}
                          </Link>
                        </h2>
                        <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed opacity-85">{project.description}</p>
                      </ScrollReveal>

                      {/* Project Grid */}
                      <ScrollReveal animation={gridAnim} duration={1.2} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {project.images.map((img, imgIndex) => (
                          <ScrollReveal
                            key={imgIndex}
                            animation={isMobile ? "none" : "scale"}
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
                      
                      <div className="mt-8">
                        <Link
                          href={`/gallery/${project.id}`}
                          className="inline-flex items-center gap-2 text-label-caps font-label-caps text-primary hover:text-secondary transition-colors font-bold decoration-none border-b border-primary hover:border-secondary pb-1"
                        >
                          VIEW DETAILS <span className="material-symbols-outlined text-[14px]">north_east</span>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* TAB: VISUAL ARCHIVES */
            <div>
              {filteredItems.length === 0 ? (
                <div className="py-24 text-center text-on-surface-variant opacity-60">
                  No visual archives found under this category.
                </div>
              ) : (
                <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
                  {filteredItems.map((item, index) => (
                    <ScrollReveal
                      key={item.id}
                      animation={isMobile ? "none" : "scale"}
                      delay={(index % 3) * 100}
                      duration={1.0}
                      className="relative overflow-hidden cursor-zoom-in group break-inside-avoid border border-outline-variant/10 bg-surface-container hover:shadow-lg transition-all duration-500 mb-6"
                    >
                      <div onClick={() => handleOpenLightbox(archiveSlideImages, index)} className="w-full h-full">
                        <div className="relative w-full overflow-hidden">
                          <img
                            alt={item.title}
                            src={item.imageUrl}
                            className="w-full h-auto object-cover grayscale hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
                            loading="lazy"
                          />
                        </div>
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
            </div>
          )}
        </div>
      </section>

      {/* S-curve transition from galleries into similar design CTA */}
      <CurveSeparator
        type="s-curve"
        fillClass="fill-surface-container"
        bgClass="bg-surface-container-lowest"
        className="w-full"
      />

      {/* 3. Similar Design Consultation CTA */}
      <section className="py-20 bg-surface-container text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <ScrollReveal animation="slide-up" duration={1.2}>
            <span className="text-label-caps font-label-caps text-secondary mb-4 block tracking-widest">
              LIKE WHAT YOU SEE?
            </span>
            <h2 className="text-4xl md:text-5xl font-serif-display font-light text-primary mb-8 uppercase leading-tight">
              WANT A SIMILAR DESIGN <br />
              <span className="italic font-light">FOR YOUR HOME?</span>
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              We can customize any of these designs to fit your budget, space, and room size. Send us a message to discuss your ideas.
            </p>
            <a
              href={getWhatsAppLink(templates.similarDesign)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary px-10 py-5 font-label-caps text-label-caps tracking-widest no-underline transition-all font-bold"
            >
              ASK ABOUT THIS DESIGN
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.63 2.021 14.155.997 11.53.997c-5.445 0-9.871 4.372-9.875 9.802-.001 1.77.476 3.498 1.39 5.041L2.093 21.93l6.113-1.604-.002-.002-.556-.372-.001-.001zm10.742-7.408c-.287-.143-1.696-.826-1.958-.92-.262-.094-.453-.141-.643.143-.19.284-.737.92-.904 1.107-.167.188-.334.212-.62.07-.287-.143-1.21-.441-2.3-1.402-.85-.747-1.423-1.67-1.59-1.954-.167-.285-.018-.439.126-.58.129-.127.287-.33.43-.495.143-.165.19-.282.285-.47.095-.189.047-.354-.024-.496-.07-.142-.643-1.523-.881-2.083-.23-.55-.485-.476-.643-.484-.165-.008-.354-.01-.543-.01-.189 0-.496.07-.756.35-.26.283-1 .958-1 2.336s1.007 2.705 1.15 2.893c.143.19 1.98 2.973 4.796 4.16.67.283 1.192.453 1.6.582.673.21 1.285.18 1.768.109.54-.08 1.696-.882 1.936-1.733.24-.85.24-1.58.167-1.73-.072-.153-.262-.244-.55-.386z" />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Concave transition curve to footer */}
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
    </div>
  );
}
