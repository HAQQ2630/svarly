import Link from "next/link";
import { SvarlyWordmark, GoogleLogo, TrustpilotLogo } from "@/components/landing/icons";

const cols = [
  {
    title: "Produkt",
    links: [
      { href: "/funktioner", label: "Funktioner" },
      { href: "/priser", label: "Priser" },
      { href: "/saadan-virker-det", label: "Integrationer" },
    ],
  },
  {
    title: "Virksomhed",
    links: [
      { href: "/om-os", label: "Om os" },
      { href: "/om-os", label: "Kontakt" },
    ],
  },
  {
    title: "Ressourcer",
    links: [
      { href: "/ressourcer", label: "Guides" },
      { href: "/ressourcer", label: "Blog" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="bg-[#182420] px-6 md:px-12 pt-[52px] pb-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <SvarlyWordmark size={24} color="#7A8F7B" />
            </div>
            <p className="text-[13px] leading-[1.7] max-w-[240px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              AI-drevet svar på anmeldelser til lokale virksomheder. Spar tid, opbyg tillid, få flere kunder.
            </p>
            <p className="text-[12px] font-medium mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
              Bygget til lokale virksomheder i Danmark
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div
                className="text-[10px] font-semibold tracking-[0.08em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {col.title}
              </div>
              {col.links.map((l, i) => (
                <div key={i} className="mb-3">
                  <Link
                    href={l.href}
                    className="text-[13px] hover:text-white transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {l.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-col gap-2 text-[11.5px] md:flex-row md:items-center md:gap-3">
            <span style={{ color: "rgba(255,255,255,0.25)" }}>
              © 2026 Svarly. Alle rettigheder forbeholdes.
            </span>
            <span
              className="hidden md:inline"
              style={{ color: "rgba(255,255,255,0.18)" }}
              aria-hidden
            >
              ·
            </span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Privatlivspolitik
            </Link>
            <span
              className="hidden md:inline"
              style={{ color: "rgba(255,255,255,0.18)" }}
              aria-hidden
            >
              ·
            </span>
            <Link
              href="/vilkaar"
              className="transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Vilkår
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <GoogleLogo />
            <TrustpilotLogo />
          </div>
        </div>
      </div>
    </footer>
  );
}
