"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?:
    | "fade"
    | "slide-left"
    | "slide-right"
    | "slide-up"
    | "slide-down"
    | "diagonal-left"
    | "diagonal-right"
    | "scale"
    | "none";
  delay?: number; // in milliseconds
  duration?: number; // in seconds
  threshold?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = "slide-up",
  delay = 0,
  duration = 1.8, // Increased default duration from 1.2s to 1.8s
  threshold = 0.01, // Lower threshold triggers slightly earlier
  className = "",
  once = true,
}: ScrollRevealProps) {
  if (animation === "none") {
    return <div className={className}>{children}</div>;
  }

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setHasMounted(true);

    // Fallback for browsers or indexers without IntersectionObserver support
    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    // Feature detection fallback
    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin: "200px 0px", // Trigger 200px before entering viewport (was 150px)
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMounted, threshold, once]);

  // Starting styles based on animation type
  const getStartingStyle = () => {
    const slideOffset = isMobile ? "30px" : "100px";
    const diagOffset = isMobile ? "24px" : "80px";
    const startOpacity = isMobile ? 0.2 : 0;

    switch (animation) {
      case "fade":
        return { opacity: startOpacity };
      case "slide-left":
        return { opacity: startOpacity, transform: `translate3d(-${slideOffset}, 0, 0)` };
      case "slide-right":
        return { opacity: startOpacity, transform: `translate3d(${slideOffset}, 0, 0)` };
      case "slide-up":
        return { opacity: startOpacity, transform: `translate3d(0, ${slideOffset}, 0)` };
      case "slide-down":
        return { opacity: startOpacity, transform: `translate3d(0, -${slideOffset}, 0)` };
      case "diagonal-left":
        return { opacity: startOpacity, transform: `translate3d(-${diagOffset}, ${diagOffset}, 0)` };
      case "diagonal-right":
        return { opacity: startOpacity, transform: `translate3d(${diagOffset}, ${diagOffset}, 0)` };
      case "scale":
        return { opacity: startOpacity, transform: `scale(0.95) translate3d(0, ${isMobile ? "15px" : "40px"}, 0)` };
      default:
        return {};
    }
  };

  const visibleStyle = {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale(1)",
  };

  // Centralized scale multipliers to extend transitions and staggers globally
  const adjustedDuration = duration * 1.5;
  const adjustedDelay = delay * 1.25;

  // Styles during SSR: content is visible immediately so indexers read it, then hidden on mount if not intersecting
  const style = !hasMounted
    ? {}
    : {
        ...(isIntersecting ? visibleStyle : getStartingStyle()),
        transition: `opacity ${adjustedDuration}s cubic-bezier(0.22, 1, 0.36, 1), transform ${adjustedDuration}s cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${adjustedDelay}ms`,
        willChange: "transform, opacity",
      };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number; // negative for slower/background, positive for faster/foreground
  horizontalShift?: number; // horizontal movement ratio
  scaleStart?: number; // optional starting scale for scroll-linked zoom
  scaleEnd?: number; // optional ending scale
  className?: string;
}

export function ScrollParallax({
  children,
  speed = -0.15,
  horizontalShift = 0,
  scaleStart = 1,
  scaleEnd = 1,
  className = "",
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the element is from the center of the viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

      // Only animate when the element is visible
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const yOffset = isMobile ? 0 : distanceFromCenter * speed;
        const xOffset = isMobile ? 0 : distanceFromCenter * horizontalShift;
        
        // Scale calculation based on viewport intersection progress (0 to 1)
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        const scale = scaleStart + (scaleEnd - scaleStart) * progress;

        setTransformStyle(`translate3d(${xOffset}px, ${yOffset}px, 0) scale(${scale})`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, horizontalShift, scaleStart, scaleEnd, isMobile]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        style={{
          transform: transformStyle,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
        className="w-full h-full relative"
      >
        {children}
      </div>
    </div>
  );
}
