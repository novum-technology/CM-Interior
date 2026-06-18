"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services } from "@/data/portfolioData";
import { getWhatsAppLink, templates } from "@/utils/whatsapp";
import styles from "./ServicesShowcase.module.css";

// The 10 services requested by the user
const SELECTED_SERVICE_TITLES = [
  "Interior Design",
  "Interior Gypsum Works",
  "Wall Paneling",
  "PVC Wall Panel",
  "Window Curtains",
  "Plywood Works",
  "Residential Interiors",
  "Villa Interiors",
  "Apartment Interiors",
  "Commercial Interiors"
];

export default function ServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Position and scrolling state
  const scrollPosRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);

  // Drag tracking
  const startXRef = useRef(0);
  const startScrollPosRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Filter and prepare service list
  const filteredServices = SELECTED_SERVICE_TITLES.map((title) =>
    services.find((s) => s.title === title)
  ).filter((s): s is typeof services[0] => !!s);

  // Triple the list to create a seamless infinite loop scrolling effect
  const loopedServices = [
    ...filteredServices,
    ...filteredServices,
    ...filteredServices
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate width of one complete set of services
    const calculateWidths = () => {
      const totalWidth = track.scrollWidth;
      singleSetWidthRef.current = totalWidth / 3;
    };

    // Run calculation once elements are rendered
    calculateWidths();
    window.addEventListener("resize", calculateWidths);

    // Speed of continuous marquee scroll (pixels per frame at 60fps)
    const baseSpeed = 0.75;
    let animationFrameId: number;

    const animate = () => {
      if (!isHoveredRef.current && !isDraggingRef.current && singleSetWidthRef.current > 0) {
        // Increment scroll position
        scrollPosRef.current += baseSpeed;

        // Infinite wrap-around
        if (scrollPosRef.current >= singleSetWidthRef.current) {
          scrollPosRef.current = scrollPosRef.current % singleSetWidthRef.current;
        }

        // Apply translate3d for smooth hardware acceleration
        track.style.transform = `translate3d(${-scrollPosRef.current}px, 0, 0)`;

        // Update progress bar
        if (progressBarRef.current) {
          const progress = scrollPosRef.current / singleSetWidthRef.current;
          progressBarRef.current.style.width = `${progress * 100}%`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", calculateWidths);
    };
  }, []);

  // --- DRAG INTERACTION HANDLERS ---

  const handleStart = (clientX: number) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    startScrollPosRef.current = scrollPosRef.current;
    dragDistanceRef.current = 0;
  };

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current || !trackRef.current || singleSetWidthRef.current === 0) return;

    const deltaX = clientX - startXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);

    // Update position based on drag delta
    let newScrollPos = startScrollPosRef.current - deltaX;

    // Handle wrap-around when dragging backwards
    if (newScrollPos < 0) {
      newScrollPos = singleSetWidthRef.current + (newScrollPos % singleSetWidthRef.current);
    } else if (newScrollPos >= singleSetWidthRef.current) {
      newScrollPos = newScrollPos % singleSetWidthRef.current;
    }

    scrollPosRef.current = newScrollPos;
    trackRef.current.style.transform = `translate3d(${-newScrollPos}px, 0, 0)`;

    // Update progress bar
    if (progressBarRef.current) {
      const progress = newScrollPos / singleSetWidthRef.current;
      progressBarRef.current.style.width = `${progress * 100}%`;
    }
  };

  const handleEnd = (serviceTitle?: string) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // If drag was minimal, treat it as a click/tap and open WhatsApp quote link
    if (dragDistanceRef.current < 6 && serviceTitle) {
      const whatsappUrl = getWhatsAppLink(templates.quote(serviceTitle));
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={containerRef}
        className={styles.carouselContainer}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
        }}
        // Mouse drag event bindings
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={() => handleEnd()}
        // Touch swipe event bindings
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={() => handleEnd()}
      >
        <div ref={trackRef} className={styles.scrollTrack}>
          {loopedServices.map((service, index) => {
            const displayId = (index % filteredServices.length) + 1;
            const paddedId = displayId.toString().padStart(2, "0");

            return (
              <div
                key={`${service.id}-${index}`}
                className={styles.card}
                onClick={(e) => {
                  e.preventDefault();
                  handleEnd(service.title);
                }}
              >
                {/* Portrait Service Image */}
                <div className={styles.imageWrapper}>
                  {service.imageUrl && (
                    <Image
                      alt={service.title}
                      src={service.imageUrl}
                      fill
                      unoptimized
                      priority={index < 5}
                      className={styles.cardImage}
                    />
                  )}
                  {/* Soft overlay gradient */}
                  <div className={styles.overlay} />
                </div>

                {/* Content Details */}
                <div className={styles.content}>
                  <span className={styles.cardNumber}>Service {paddedId}</span>
                  <div className={styles.titleWrapper}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    {service.icon && (
                      <span className={`material-symbols-outlined ${styles.cardIcon}`}>
                        {service.icon}
                      </span>
                    )}
                  </div>
                  <p className={styles.cardDescription}>{service.description}</p>
                  
                  {/* Elegant Call to Action indicator */}
                  <div className={styles.ctaIndicator}>
                    <span>Get Quote</span>
                    <span className={`material-symbols-outlined ${styles.ctaArrow}`}>
                      east
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Thin luxury scroll progress bar */}
      <div className={styles.progressContainer}>
        <div ref={progressBarRef} className={styles.progressBar} />
      </div>
    </div>
  );
}
