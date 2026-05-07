"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/funktioner", label: "Funktioner" },
  { href: "/saadan-virker-det", label: "Sådan virker det" },
  { href: "/priser", label: "Priser" },
  { href: "/om-os", label: "Om os" },
  { href: "/ressourcer", label: "Ressourcer" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12"
      style={{
        background: scrolled ? "rgba(248,249,247,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #E0DDD5" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-[66px]">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Svarly"
            width={1158}
            height={1154}
            priority
            className="h-10 w-auto mix-blend-multiply"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13.5px] transition-colors pb-px"
                style={{
                  color: active ? "#2F4F3E" : "#5C6B62",
                  fontWeight: active ? 500 : 400,
                  borderBottom: active ? "1.5px solid #2F4F3E" : "1.5px solid transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-[13.5px] text-svarly-muted hover:text-svarly-text transition-colors"
          >
            Log ind
          </Link>
          <Link
            href="/priser"
            className="text-[13.5px] font-medium text-white px-5 py-[9px] rounded-[10px] transition-all hover:opacity-90"
            style={{
              background: "#2F4F3E",
              boxShadow: "0 2px 12px rgba(47,79,62,0.5)",
            }}
          >
            Start gratis
          </Link>
        </div>
      </div>
    </nav>
  );
}
