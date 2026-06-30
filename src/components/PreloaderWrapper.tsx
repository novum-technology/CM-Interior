"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [loadingEnded, setLoadingEnded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Minimum preloader display duration (2.8 seconds)
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2800);

    // 2. Simulate loading progress smoothly over 2.4 seconds
    const duration = 2400;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(currentStep / steps, 1);
      setProgress(currentProgress);

      if (currentProgress >= 1) {
        clearInterval(interval);
        setLoadingEnded(true);
      }
    }, intervalTime);

    if (showPreloader) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  useEffect(() => {
    if (minTimeElapsed && loadingEnded) {
      // Pause briefly for 400ms after completion before starting the fade-out
      const pauseTimer = setTimeout(() => {
        setFadeOut(true);
        const unmountTimer = setTimeout(() => {
          setShowPreloader(false);
          document.body.style.overflow = "";
        }, 1000); // fade duration
        return () => clearTimeout(unmountTimer);
      }, 400);

      return () => clearTimeout(pauseTimer);
    }
  }, [minTimeElapsed, loadingEnded]);



  return (
    <>
      {showPreloader && (
        <div
          style={{
            transition: "opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-background ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            {/* Logo image centered inside the loader screen */}
            <Image
              src="/images/CMlogo Transparent.png"
              alt="CM Interior Design"
              width={380}
              height={380}
              priority
              unoptimized
              className="object-contain pointer-events-none transition-all duration-700 brightness-0"
              style={{
                opacity: progress > 0.05 ? 1 : 0,
                transform: `scale(${0.96 + 0.04 * progress})`,
              }}
            />

            {/* Premium Minimalist Linear Progress Bar */}
            <div className="w-72 h-[3px] bg-primary/10 rounded-full overflow-hidden relative" style={{ marginTop: "-52px" }}>
              <div 
                className="bg-secondary h-full transition-all duration-300 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* Serif Percentage Text */}
            <div className="h-6 mt-4 flex items-center justify-center overflow-hidden">
              <span className="font-serif-display text-secondary tracking-[0.22em] text-[12px] uppercase font-light">
                LOADING {Math.round(progress * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
      <div 
        className="w-full h-full min-h-screen flex flex-col"
        style={{
          opacity: fadeOut ? 1 : 0.35,
          filter: fadeOut ? "none" : "blur(4px)",
          transition: "opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1), filter 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </div>
    </>
  );
}
