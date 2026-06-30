"use client";

import { useEffect, useState, TouchEvent } from "react";
import { createPortal } from "react-dom";
import { getWhatsAppLink } from "@/utils/whatsapp";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Add keyboard support (ESC, Left, Right arrow keys)
  useEffect(() => {
    setMounted(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Lock scroll on background
    document.body.style.overflow = "hidden";
    
    return () => {
      setMounted(false);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onPrev, onNext]);

  if (!mounted) return null;
  if (!images || images.length === 0) {
    console.warn("Lightbox: images array is empty or undefined");
    return null;
  }

  // Ensure index is within bounds
  const safeIndex = Math.max(0, Math.min(currentIndex, images.length - 1));
  const rawUrl = images[safeIndex];
  
  if (!rawUrl) {
    console.warn("Lightbox: image URL is undefined for index", safeIndex);
    return null;
  }

  // Safely encode the URL to handle spaces and special characters
  const currentImageUrl = encodeURI(rawUrl);

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close only when clicking directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Touch Swipe Handlers for Mobile Support
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  const handleWhatsAppClick = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const fullImageUrl = rawUrl.startsWith("http") ? rawUrl : `${origin}${rawUrl}`;
    const message = `Hello,\nI saw this design on your website and would like a similar design for my home:\n${fullImageUrl}`;
    window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return createPortal(
    <div
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 bg-black/95 z-[100000] flex flex-col items-center justify-center backdrop-blur-md cursor-zoom-out select-none animate-fade-in"
    >
      {/* Floating Top Index Counter */}
      <div className="fixed top-6 left-6 text-label-caps font-label-caps text-white/80 z-[100002] select-none bg-black/40 px-4 py-2 border border-white/10 tracking-widest backdrop-blur-sm">
        {safeIndex + 1} / {images.length}
      </div>

      {/* Floating Top Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 w-12 h-12 flex items-center justify-center bg-black/40 text-white hover:bg-white hover:text-black border border-white/10 transition-all duration-300 focus:outline-none z-[100002] cursor-pointer"
        aria-label="Close Lightbox"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation Left Arrow (Hidden on small mobile viewports) */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="fixed left-6 w-14 h-14 bg-black/40 text-white hover:bg-white hover:text-black border border-white/10 transition-all duration-300 hidden md:flex items-center justify-center z-[100002] focus:outline-none cursor-pointer"
          aria-label="Previous Slide"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Active Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[90vw] md:max-w-[85vw] max-h-[60vh] md:max-h-[70vh] flex items-center justify-center select-none cursor-default z-[100001]"
      >
        <img
          key={safeIndex} // Force remount for transition animation on change
          src={currentImageUrl}
          alt={`Gallery View ${safeIndex + 1}`}
          className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain select-none shadow-2xl transition-all duration-500 border border-white/5 animate-scale-up"
          onError={() => {
            console.error("Lightbox: failed to load image URL:", currentImageUrl);
          }}
        />
      </div>

      {/* Navigation Right Arrow (Hidden on small mobile viewports) */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="fixed right-6 w-14 h-14 bg-black/40 text-white hover:bg-white hover:text-black border border-white/10 transition-all duration-300 hidden md:flex items-center justify-center z-[100002] focus:outline-none cursor-pointer"
          aria-label="Next Slide"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Floating CTA at the Bottom */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-between gap-6 bg-black/85 px-6 py-4 border border-white/10 backdrop-blur-md rounded-none z-[100002] w-[90vw] sm:w-auto sm:min-w-[400px]"
      >
        <span className="text-white text-[13px] md:text-sm font-label-caps tracking-wider uppercase font-medium">
          Like this design?
        </span>
        <button
          onClick={handleWhatsAppClick}
          className="bg-secondary text-white hover:bg-white hover:text-black transition-colors duration-300 px-5 py-2.5 font-label-caps text-[11px] md:text-[12px] font-bold tracking-widest cursor-pointer border border-transparent rounded-none uppercase select-none"
        >
          Get Similar Design
        </button>
      </div>
    </div>,
    document.body
  );
}
