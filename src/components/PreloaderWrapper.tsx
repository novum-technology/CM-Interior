"use client";

import { useEffect, useRef, useState } from "react";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDarkVideo, setIsDarkVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Minimum preloader display duration (2.8 seconds)
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2800);

    // 2. Safety fallback timeout: force reveal after 5 seconds to prevent locking the screen
    const safetyTimer = setTimeout(() => {
      setVideoEnded(true);
      setMinTimeElapsed(true);
      setProgress(1);
    }, 5000);

    if (showPreloader) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Slow down playback significantly to 40% speed for elegant build sequence visibility
    video.playbackRate = 0.4;

    // Playback rate reset handler for mobile browsers that occasionally override it on play start
    const handlePlay = () => {
      video.playbackRate = 0.4;
    };
    video.addEventListener("play", handlePlay);

    // Fallback: if the video fails to load or play (e.g. mobile browser restrictions)
    const handlePlayError = () => {
      setVideoEnded(true);
    };
    video.play().catch(handlePlayError);

    return () => {
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  // Synchronize progress with the video current time
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const currentProgress = video.currentTime / video.duration;
    setProgress(Math.min(currentProgress, 1));
  };

  // Canvas drawing and chroma-keying loop
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animationId: number;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Fixed canvas size for high-performance 60fps rendering without lag
    canvas.width = 400;
    canvas.height = 400;

    let detected = false;
    let localIsDark = false;

    const render = () => {
      if (video.paused || video.ended) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, 400, 400);
      ctx.drawImage(video, 0, 0, 400, 400);

      try {
        const imgData = ctx.getImageData(0, 0, 400, 400);
        const data = imgData.data;

        // Auto-detect video brightness on first active frame to correctly choose keying type
        if (!detected && video.currentTime > 0.05) {
          let rSum = 0, gSum = 0, bSum = 0;
          let samples = 0;
          for (let i = 0; i < data.length; i += 40) {
            rSum += data[i];
            gSum += data[i + 1];
            bSum += data[i + 2];
            samples++;
          }
          const rAvg = rSum / samples;
          const gAvg = gSum / samples;
          const bAvg = bSum / samples;
          const brightness = (rAvg * 299 + gAvg * 587 + bAvg * 114) / 1000;
          
          if (brightness > 5 || video.currentTime > 0.5) {
            localIsDark = brightness < 120;
            setIsDarkVideo(localIsDark);
            detected = true;
          }
        }

        if (detected) {
          if (localIsDark) {
            // Key out black background smoothly
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const maxVal = Math.max(r, g, b);
              if (maxVal < 45) {
                // Smooth alpha roll-off from 0 to 45
                data[i + 3] = Math.round((maxVal / 45) * 255);
              }
            }
          } else {
            // Key out white background smoothly
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const minVal = Math.min(r, g, b);
              if (minVal > 210) {
                // Smooth alpha roll-off from 210 to 255
                data[i + 3] = Math.round(((255 - minVal) / 45) * 255);
              }
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }
      } catch (e) {
        // Fallback for canvas security issues
      }

      animationId = requestAnimationFrame(render);
    };

    const handlePlay = () => {
      render();
    };

    video.addEventListener("play", handlePlay);
    if (!video.paused) {
      render();
    }

    return () => {
      cancelAnimationFrame(animationId);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  useEffect(() => {
    if (minTimeElapsed && videoEnded) {
      // Pause briefly for 400ms (0.4s) after completion before starting the fade-out
      const pauseTimer = setTimeout(() => {
        setFadeOut(true);
        const unmountTimer = setTimeout(() => {
          setShowPreloader(false);
          document.body.style.overflow = "";
        }, 1000); // fade duration
        return () => clearTimeout(unmountTimer);
      }, 400); // pause duration

      return () => clearTimeout(pauseTimer);
    }
  }, [minTimeElapsed, videoEnded]);

  // Circumference for radius 46 is 2 * PI * 46 = 289.03
  const circumference = 289.03;
  // Start with a small arc segment of 8% of the circle and grow to 100% (full circle)
  const strokeProgress = 0.08 + 0.92 * progress;
  const strokeDashoffset = circumference * (1 - strokeProgress);

  return (
    <>
      {showPreloader && (
        <div
          style={{
            backgroundColor: "transparent",
            transition: "opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden ${
            fadeOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
        >
          {/* Encapsulated Animation Keyframes for Rotation */}
          <style>{`
            @keyframes preloader-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-preloader-spin {
              animation: preloader-spin 4s linear infinite;
            }
          `}</style>

          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[480px] md:h-[480px] flex items-center justify-center">
            {/* SVG Premium Loading Indicator Stroke */}
            <svg
              className="absolute w-full h-full animate-preloader-spin pointer-events-none"
              viewBox="0 0 100 100"
              style={{ transformOrigin: "center" }}
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#1b1c1c"
                strokeWidth="0.6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: "stroke-dashoffset 1.0s cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                }}
              />
            </svg>

            {/* Canvas for transparent video drawing (keys out black/white backgrounds) */}
            <canvas
              ref={canvasRef}
              className="w-4/5 h-4/5 object-contain pointer-events-none"
            />

            {/* Hidden Video element to drive playback */}
            <video
              ref={videoRef}
              src="/images/Preloader_logo.mp4"
              muted
              playsInline
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setProgress(1);
                setVideoEnded(true);
              }}
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
                width: "1px",
                height: "1px",
              }}
            />
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
