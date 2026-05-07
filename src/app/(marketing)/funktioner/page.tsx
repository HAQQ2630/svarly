import Link from "next/link";
import { SectionLabel } from "@/components/landing/section-label";

const PRIMARY = "#2F4F3E";
const MUTED = "#5C6B62";
const BORDER = "#E0DDD5";

const features = [
  {
    title: "Svar automatisk på anmeldelser",
    desc: "AI læser hver ny anmeldelse og skriver et professionelt, personligt svar inden for sekunder — på dansk.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke={PRIMARY} strokeWidth="1.5"/>
        <path d="M8 14h4l2.5-5L17 19l2.5-5H22" stroke={PRIMARY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Godkend med ét klik",
    desc: "Du beholder fuld kontrol. Alle svar sendes til dig til godkendelse — eller du kan slå auto-post til og spare endnu mere tid.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="16" rx="3" stroke={PRIMARY} strokeWidth="1.5"/>
        <path d="M9 14l3.5 3.5L19 10" stroke={PRIMARY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Integrationer: Google & Trustpilot",
    desc: "Svarly overvåger automatisk dine anmeldelser på Google Business Profile og Trustpilot — ingen manuel opsætning krævet.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="14" r="5" stroke={PRIMARY} strokeWidth="1.5"/>
        <circle cx="18" cy="14" r="5" stroke={PRIMARY} strokeWidth="1.5"/>
        <path d="M13 14h2" stroke={PRIMARY} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Notifikationer via SMS & e-mail",
    desc: "Modtag besked hver gang en ny anmeldelse er klar til godkendelse — på SMS, e-mail eller begge dele.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 10h20M4 18h20M14 4v20" stroke={PRIMARY} strokeWidth="1.5" strokeLinecap="round" opacity=".3"/>
        <rect x="8" y="8" width="12" height="12" rx="3" stroke={PRIMARY} strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: "Spar tid og få flere kunder",
    desc: "Virksomheder, der svarer på anmeldelser, får 3× flere nye kunder. Svarly gør det automatisk, så du kan fokusere på din forretning.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22l6-10 4 6 4-8 6 12" stroke={PRIMARY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function FunktionerPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[140px] pb-0 px-6 md:px-12" style={{ background: "#F8F9F7" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-[580px] mx-auto mb-16">
            <SectionLabel>Funktioner</SectionLabel>
            <h1
              className="leading-[1.15] tracking-[-0.5px] mb-4"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(28px,3.5vw,44px)" }}
            >
              Alt hvad du har brug for.
            </h1>
            <p className="text-[16px] leading-[1.65]" style={{ color: MUTED }}>
              Et enkelt produkt, der klarer hele arbejdet med at svare på anmeldelser.
            </p>
          </div>

          <div className="flex flex-col">
            {features.map((f, i) => (
              <div
                key={i}
                className="grid gap-8 py-10 items-start"
                style={{
                  gridTemplateColumns: "80px 1fr",
                  borderBottom: i < features.length - 1 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: PRIMARY + "12" }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.3px] mb-2">{f.title}</h3>
                  <p className="text-[15px] leading-[1.65] max-w-[540px]" style={{ color: MUTED }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-6 md:px-12" style={{ background: PRIMARY }}>
        <div className="max-w-[580px] mx-auto text-center">
          <h2
            className="text-white leading-[1.2] tracking-[-0.3px] mb-3"
            style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(22px,3vw,36px)" }}
          >
            Prøv alle funktioner gratis.
          </h2>
          <p className="text-[15px] mb-7" style={{ color: "rgba(255,255,255,0.6)" }}>
            Ingen binding. Ingen kreditkort krævet.
          </p>
          <Link
            href="/priser"
            className="inline-block px-7 py-[13px] rounded-[12px] text-[14.5px] font-semibold transition-all hover:opacity-90"
            style={{ background: "#fff", color: PRIMARY }}
          >
            Start gratis i 14 dage
          </Link>
        </div>
      </section>
    </>
  );
}
