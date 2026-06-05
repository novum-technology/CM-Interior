"use client";

import { useState, useEffect } from "react";
import { getWhatsAppLink, templates, CALL_NUMBER } from "@/utils/whatsapp";

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Elegant delayed appearance after preloader finishes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = getWhatsAppLink(templates.general);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed right-6 bottom-6 md:right-8 md:bottom-8 z-[99] flex flex-col gap-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {/* 1. Phone Button */}
      <a
        href={`tel:${CALL_NUMBER}`}
        className="group w-12 h-12 md:w-14 md:h-14 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 select-none border border-primary/20 relative no-underline cursor-pointer"
        aria-label="Call Us"
      >
        <span className="material-symbols-outlined text-[20px] md:text-[24px]">phone</span>
        
        {/* Tooltip (Desktop Only) */}
        <div className="hidden md:block absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-primary text-on-primary text-[10px] font-label-caps tracking-[0.15em] px-4 py-2 shadow-xl pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 border border-outline-variant/15 select-none uppercase">
          CALL US
        </div>
      </a>

      {/* 2. WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-12 h-12 md:w-14 md:h-14 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 select-none border border-primary/20 relative no-underline cursor-pointer"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          className="w-5 h-5 fill-current text-on-primary group-hover:text-on-secondary transition-colors"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.63 2.021 14.155.997 11.53.997c-5.445 0-9.871 4.372-9.875 9.802-.001 1.77.476 3.498 1.39 5.041L2.093 21.93l6.113-1.604-.002-.002-.556-.372-.001-.001zm10.742-7.408c-.287-.143-1.696-.826-1.958-.92-.262-.094-.453-.141-.643.143-.19.284-.737.92-.904 1.107-.167.188-.334.212-.62.07-.287-.143-1.21-.441-2.3-1.402-.85-.747-1.423-1.67-1.59-1.954-.167-.285-.018-.439.126-.58.129-.127.287-.33.43-.495.143-.165.19-.282.285-.47.095-.189.047-.354-.024-.496-.07-.142-.643-1.523-.881-2.083-.23-.55-.485-.476-.643-.484-.165-.008-.354-.01-.543-.01-.189 0-.496.07-.756.35-.26.283-1 .958-1 2.336s1.007 2.705 1.15 2.893c.143.19 1.98 2.973 4.796 4.16.67.283 1.192.453 1.6.582.673.21 1.285.18 1.768.109.54-.08 1.696-.882 1.936-1.733.24-.85.24-1.58.167-1.73-.072-.153-.262-.244-.55-.386z" />
        </svg>

        {/* Tooltip (Desktop Only) */}
        <div className="hidden md:block absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-primary text-on-primary text-[10px] font-label-caps tracking-[0.15em] px-4 py-2 shadow-xl pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 border border-outline-variant/15 select-none uppercase">
          CHAT WITH US
        </div>
      </a>
    </div>
  );
}
