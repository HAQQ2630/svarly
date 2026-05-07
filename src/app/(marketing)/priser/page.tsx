"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/landing/section-label";
import { CheckCircle } from "@/components/landing/icons";

const PRIMARY = "#2F4F3E";
const CARD    = "#EFEDE7";
const MUTED   = "#5C6B62";
const BORDER  = "#E0DDD5";

const features = [
  "Ubegrænset overvågning af anmeldelser",
  "AI-genererede svar",
  "Godkend & auto-post",
  "Google & Trustpilot integration",
  "E-mail & SMS notifikationer",
  "Grundlæggende statistik",
  "1 bruger",
];

export default function PriserPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const price = billing === "yearly" ? Math.round(149 * 0.8) : 149;

  return (
    <div style={{ background: "#F8F9F7", paddingTop: 110 }}>
      <div className="max-w-[640px] mx-auto px-6 pt-[60px] text-center">
        <SectionLabel>Priser</SectionLabel>
        <h1
          className="leading-[1.15] tracking-[-0.5px] mb-4"
          style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(28px,4vw,48px)" }}
        >
          Enkel pris. Alt inkluderet.
        </h1>
        <p className="text-[16px] mb-9" style={{ color: MUTED }}>
          Start gratis i 14 dage. Ingen binding.
        </p>

        {/* Billing toggle */}
        <div
          className="inline-flex items-center gap-1 rounded-[12px] p-1 mb-12"
          style={{ background: CARD, border: `1px solid ${BORDER}` }}
        >
          {(["monthly", "yearly"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setBilling(opt)}
              className="px-5 py-2 rounded-[9px] text-[13.5px] font-medium transition-all"
              style={{
                background: billing === opt ? "#fff" : "transparent",
                color: billing === opt ? "#1F2A24" : MUTED,
                boxShadow: billing === opt ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {opt === "monthly" ? "Månedlig" : "Årlig"}
            </button>
          ))}
          <span
            className="text-[11.5px] font-semibold px-[10px] py-1 rounded-[7px] ml-0.5"
            style={{ color: PRIMARY, background: PRIMARY + "15" }}
          >
            Spar 20%
          </span>
        </div>

        {/* Pricing card */}
        <div
          className="rounded-[20px] px-6 py-8 sm:px-10 sm:py-10 text-left mb-10"
          style={{ background: "#fff", boxShadow: "0 6px 40px rgba(0,0,0,0.08)", border: `1px solid ${BORDER}` }}
        >
          <div
            className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-4"
            style={{ color: PRIMARY }}
          >
            Starter
          </div>
          <div className="flex items-baseline gap-[5px] mb-1.5">
            <span
              className="leading-none tracking-[-2px]"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontSize: 54, color: "#1F2A24" }}
            >
              {price}
            </span>
            <div>
              <div className="text-[14px] leading-[1.2]" style={{ color: MUTED }}>DKK</div>
              <div className="text-[13px]" style={{ color: MUTED }}>/måned</div>
            </div>
          </div>
          <p className="text-[13px] mb-7" style={{ color: MUTED }}>
            Perfekt til lokale virksomheder.{billing === "yearly" && " Faktureres årligt."}
          </p>

          <div className="flex flex-col gap-[13px] mb-8">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-[11px]">
                <CheckCircle />
                <span className="text-[14px]">{f}</span>
              </div>
            ))}
          </div>

          <Link
            href={`/api/stripe/checkout?billing=${billing}`}
            className="block text-center w-full py-3 rounded-[12px] text-[15px] font-semibold text-white mb-3 transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg,${PRIMARY},${PRIMARY}dd)`, boxShadow: `0 4px 18px ${PRIMARY}50` }}
          >
            Start gratis i 14 dage
          </Link>
          <p className="text-center text-[12.5px]" style={{ color: MUTED }}>
            Intet kreditkort kræves
          </p>
        </div>

        {/* Value props */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 mb-16">
          {[
            { t: "Spar tid", d: "Vi klarer svarene" },
            { t: "Opbyg tillid", d: "Glade kunder, bedre anmeldelser" },
            { t: "Få flere kunder", d: "Flere 5-stjernede anmeldelser" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[13px] font-semibold mb-[3px]">{s.t}</div>
              <div className="text-[12px]" style={{ color: MUTED }}>{s.d}</div>
            </div>
          ))}
        </div>

        <p className="text-[13px] pb-16" style={{ color: MUTED }}>
          Spørgsmål?{" "}
          <Link href="/om-os" className="font-medium hover:underline" style={{ color: PRIMARY }}>
            Kontakt os
          </Link>{" "}
          — vi hjælper gerne.
        </p>
      </div>
    </div>
  );
}
