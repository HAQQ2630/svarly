"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/landing/section-label";
import { CheckCircle } from "@/components/landing/icons";

const PRIMARY = "#2F4F3E";
const CARD    = "#EFEDE7";
const MUTED   = "#5C6B62";
const BORDER  = "#E0DDD5";

const gratisFeatures = [
  "1 lokation",
  "5 AI-svar pr. måned",
  "Google Business Profile",
  "Gratis for altid",
];

const paidFeatures = [
  "1 lokation",
  "Ubegrænsede AI-svar",
  "Google Business Profile",
  "Trustpilot (kommer snart)",
  "E-mail notifikationer",
  "Statistik",
];

const multiFeatures = [
  "Flere lokationer",
  "Ubegrænsede AI-svar",
  "Prioriteret support",
  "Tilpasset opsætning",
];

export default function PriserPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div style={{ background: "#F8F9F7", paddingTop: 110 }}>
      <div className="max-w-[940px] mx-auto px-6 pt-[60px]">

        <div className="text-center mb-12">
          <SectionLabel>Priser</SectionLabel>
          <h1
            className="leading-[1.15] tracking-[-0.5px] mb-4"
            style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(28px,4vw,48px)" }}
          >
            Enkel pris. Alt inkluderet.
          </h1>
          <p className="text-[16px] mb-9" style={{ color: MUTED }}>
            Start gratis. Ingen binding.
          </p>

          {/* Billing toggle */}
          <div
            className="inline-flex items-center gap-1 rounded-[12px] p-1"
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
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">

          {/* Gratis */}
          <div
            className="rounded-[20px] px-6 py-8 flex flex-col"
            style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
          >
            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3" style={{ color: MUTED }}>
              Gratis
            </div>
            <div className="flex items-baseline gap-[5px] mb-1">
              <span
                className="leading-none font-semibold tracking-tight"
                style={{ fontSize: 42, color: "#1F2A24" }}
              >
                0
              </span>
              <span className="text-[14px]" style={{ color: MUTED }}>DKK</span>
            </div>
            <p className="text-[13px] mb-7" style={{ color: MUTED }}>Gratis for altid.</p>

            <div className="flex flex-col gap-[11px] mb-8 flex-1">
              {gratisFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-[11px]">
                  <CheckCircle />
                  <span className="text-[13.5px]">{f}</span>
                </div>
              ))}
            </div>

            <Link
              href="/signup"
              className="block text-center w-full py-[11px] rounded-[12px] text-[14px] font-semibold transition-all hover:opacity-80"
              style={{ background: CARD, color: "#1F2A24", border: `1px solid ${BORDER}` }}
            >
              Kom i gang gratis
            </Link>
          </div>

          {/* Starter / Årlig — highlighted */}
          <div
            className="rounded-[20px] px-6 py-8 flex flex-col relative"
            style={{ background: "#fff", border: `2px solid ${PRIMARY}`, boxShadow: `0 8px 40px ${PRIMARY}22` }}
          >
            {billing === "yearly" && (
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11.5px] font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                Spar 2 måneder gratis
              </div>
            )}

            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3" style={{ color: PRIMARY }}>
              {billing === "monthly" ? "Starter" : "Årlig"}
            </div>

            {billing === "monthly" ? (
              <>
                <div className="flex items-baseline gap-[5px] mb-1">
                  <span
                    className="leading-none tracking-[-2px]"
                    style={{ fontFamily: "var(--font-dm-serif),serif", fontSize: 48, color: "#1F2A24" }}
                  >
                    199
                  </span>
                  <div>
                    <div className="text-[14px] leading-[1.2]" style={{ color: MUTED }}>DKK</div>
                    <div className="text-[13px]" style={{ color: MUTED }}>/måned</div>
                  </div>
                </div>
                <p className="text-[13px] mb-7" style={{ color: MUTED }}>Faktureres månedligt.</p>
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-[5px] mb-1">
                  <span
                    className="leading-none tracking-[-2px]"
                    style={{ fontFamily: "var(--font-dm-serif),serif", fontSize: 48, color: "#1F2A24" }}
                  >
                    1.990
                  </span>
                  <div>
                    <div className="text-[14px] leading-[1.2]" style={{ color: MUTED }}>DKK</div>
                    <div className="text-[13px]" style={{ color: MUTED }}>/år</div>
                  </div>
                </div>
                <p className="text-[13px] mb-7" style={{ color: MUTED }}>Faktureres årligt.</p>
              </>
            )}

            <div className="flex flex-col gap-[11px] mb-8 flex-1">
              {paidFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-[11px]">
                  <CheckCircle />
                  <span className="text-[13.5px]">{f}</span>
                </div>
              ))}
            </div>

            <Link
              href={`/api/stripe/checkout?billing=${billing}`}
              className="block text-center w-full py-[11px] rounded-[12px] text-[14px] font-semibold text-white transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg,${PRIMARY},${PRIMARY}dd)`, boxShadow: `0 4px 18px ${PRIMARY}50` }}
            >
              Start gratis i 14 dage
            </Link>
            <p className="text-center text-[12px] mt-2" style={{ color: MUTED }}>
              Intet kreditkort kræves
            </p>
          </div>

          {/* Flere lokationer */}
          <div
            className="rounded-[20px] px-6 py-8 flex flex-col"
            style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
          >
            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3" style={{ color: MUTED }}>
              Flere lokationer
            </div>
            <div className="mb-1">
              <span
                className="leading-none font-semibold tracking-tight"
                style={{ fontSize: 28, color: "#1F2A24" }}
              >
                Kontakt os
              </span>
            </div>
            <p className="text-[13px] mb-7" style={{ color: MUTED }}>Tilpasset pris og opsætning.</p>

            <div className="flex flex-col gap-[11px] mb-8 flex-1">
              {multiFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-[11px]">
                  <CheckCircle />
                  <span className="text-[13.5px]">{f}</span>
                </div>
              ))}
            </div>

            <Link
              href="/om-os"
              className="block text-center w-full py-[11px] rounded-[12px] text-[14px] font-semibold transition-all hover:opacity-80"
              style={{ background: CARD, color: "#1F2A24", border: `1px solid ${BORDER}` }}
            >
              Kontakt os →
            </Link>
          </div>
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

        <p className="text-[13px] pb-16 text-center" style={{ color: MUTED }}>
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
