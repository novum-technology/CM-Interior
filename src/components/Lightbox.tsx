"use client";

import { useEffect } from "react";
import Image from "next/image";

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
  // Add keyboard support (ESC, Left, Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    // Lock scroll on background
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onPrev, onNext]);

  if (!images || images.length === 0) return null;
  const currentImageUrl = images[currentIndex];

  return (
    <div className="fixed inset-0 bg-primary/95 z-[999] flex items-center justify-center backdrop-blur-md">
      {/* Top Close Button & Index */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[1000]">
        <div className="text-label-caps font-label-caps text-on-primary/60">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-container text-on-primary hover:bg-secondary transition-colors focus:outline-none"
          aria-label="Close Lightbox"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
      </div>

      {/* Navigation Left Arrow */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-6 w-14 h-14 rounded-full bg-primary-container/55 text-on-primary hover:bg-secondary transition-colors flex items-center justify-center z-[1000] focus:outline-none"
          aria-label="Previous Slide"
        >
          <span className="material-symbols-outlined text-[28px]">arrow_back</span>
        </button>
      )}

      {/* Active Image Viewport Container */}
      <div className="relative w-full max-w-5xl h-[80vh] px-16 flex items-center justify-center select-none">
        <Image
          src={currentImageUrl}
          alt={`Gallery View ${currentIndex + 1}`}
          fill
          sizes="(max-w-1024px) 100vw, 1024px"
          className="object-contain"
          priority
          unoptimized
        />
      </div>

      {/* Navigation Right Arrow */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-6 w-14 h-14 rounded-full bg-primary-container/55 text-on-primary hover:bg-secondary transition-colors flex items-center justify-center z-[1000] focus:outline-none"
          aria-label="Next Slide"
        >
          <span className="material-symbols-outlined text-[28px]">arrow_forward</span>
        </button>
      )}
    </div>
  );
}
