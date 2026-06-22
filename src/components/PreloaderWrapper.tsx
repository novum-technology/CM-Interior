"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Trigger preloader fade-out after 4.4 seconds (logo drawing + text reveal + hold duration)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4400);

    // 2. Complete unmount after 5.6 seconds (allowing transition animation to finish)
    const unmountTimer = setTimeout(() => {
      setShowPreloader(false);
      document.body.style.overflow = "";
    }, 5600);

    if (showPreloader) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  // Framer Motion timing configs for architectural sketch lines
  const roofTransition = { duration: 1.0, ease: "easeInOut", delay: 0.2 };
  const cTransition = { duration: 1.1, ease: "easeInOut", delay: 1.1 };
  const mTransition = { duration: 1.1, ease: "easeInOut", delay: 2.0 };
  const interiorTransition = { duration: 0.5, ease: "easeInOut", delay: 2.9 };
  const lightTransition = { duration: 0.5, ease: "easeInOut", delay: 3.1 };
  const frameTransition = { duration: 0.5, ease: "easeInOut", delay: 3.3 };

  return (
    <>
      {showPreloader && (
        <div
          style={{
            backgroundColor: "#1b1c1c", // Deep premium luxury dark background
            transition: "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
        >
          {/* Centered Logo Drawing Container */}
          <div className="flex flex-col items-center justify-center px-6">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-white"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                {/* 1. Primary Roofline & Vertical House Frame */}
                <motion.path
                  d="M 18,54 L 60,20 L 64,34 M 64,34 L 65,30 L 80,42 L 80,90"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={roofTransition}
                />

                {/* 2. Curved "C" Shape */}
                <motion.path
                  d="M 37,90 C 20,90 19,75 19,65 C 19,48 27,38 37,38 L 60,38"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={cTransition}
                />

                {/* 3. "M" Structure */}
                <motion.path
                  d="M 37,90 L 47,56 L 54,72 L 58,64 L 62,90"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={mTransition}
                />

                {/* 4. Interior Room Floor Line */}
                <motion.path
                  d="M 46,90 L 63,90"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={interiorTransition}
                />

                {/* 5. Sofa Outline */}
                <motion.path
                  d="M 48,90 L 48,80 L 55,80 L 55,82 L 62,82 L 62,90"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={interiorTransition}
                />

                {/* 6. Pendant Light Hanging Wire */}
                <motion.path
                  d="M 54,56 L 54,69"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={lightTransition}
                />

                {/* 7. Pendant Light Shade */}
                <motion.path
                  d="M 49,69 C 49,65 59,65 59,69 Z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={lightTransition}
                />

                {/* 8. Slanted House Right vertical inner wall (frame completion) */}
                <motion.path
                  d="M 64,34 L 64,90"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={frameTransition}
                />
              </svg>
            </div>

            {/* Brand Text Reveal Section */}
            <div className="mt-4 text-center select-none">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }}
                className="font-serif-display text-white text-xl sm:text-2xl tracking-[0.16em] font-light leading-none uppercase"
              >
                INTERIOR DESIGN
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 3.9 }}
                className="font-label-caps text-secondary text-[10px] tracking-[0.28em] font-semibold mt-3.5 uppercase"
              >
                imagine.design.live
              </motion.p>
            </div>

            {/* Subtle progress indicator line below text */}
            <div className="w-32 h-[1px] bg-white/10 mt-8 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.4, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 bg-secondary origin-left"
              />
            </div>
          </div>
        </div>
      )}
      <div 
        className="w-full h-full min-h-screen flex flex-col"
        style={{
          opacity: fadeOut ? 1 : 0,
          filter: fadeOut ? "none" : "blur(8px)",
          transition: "opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1), filter 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </div>
    </>
  );
}
