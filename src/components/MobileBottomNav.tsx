"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const links = [
    { name: "HOME", path: "/", icon: "home" },
    { name: "ABOUT", path: "/about", icon: "info" },
    { name: "SERVICES", path: "/about#services", icon: "design_services" },
    { name: "GALLERY", path: "/portfolio", icon: "grid_view" },
    { name: "CONTACT", path: "/contact", icon: "mail" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-surface z-50 flex justify-around items-center md:hidden border-t border-outline-variant/20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {links.map((link) => {
        const isActive =
          link.path === "/"
            ? pathname === "/"
            : pathname.startsWith(link.path.split("#")[0]);

        return (
          <Link
            key={link.name}
            href={link.path}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-95 ${
              isActive ? "text-secondary font-bold" : "text-on-surface-variant opacity-75"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {link.icon}
            </span>
            <span className="text-[10px] font-label-caps tracking-widest">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
