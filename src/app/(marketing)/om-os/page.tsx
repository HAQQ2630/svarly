import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/landing/section-label";

const PRIMARY = "#2F4F3E";
const CARD    = "#EFEDE7";
const MUTED   = "#5C6B62";
const BORDER  = "#E0DDD5";

const values = [
  {
    title: "Enkelt",
    desc: "Vi gør det let og overskueligt, så du kan fokusere på din forretning.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke={PRIMARY} strokeWidth="1.4"/>
        <path d="M7 11l2.5 2.5L15 8" stroke={PRIMARY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Effektivt",
    desc: "Automatisering der sparer tid og sikrer, at ingen anmeldelse bliver glemt.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke={PRIMARY} strokeWidth="1.4"/>
        <path d="M11 6v5l3 3" stroke={PRIMARY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Troværdigt",
    desc: "Vi hjælper dig med at opbygge tillid og skabe stærkere kunderelationer.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" stroke={PRIMARY} strokeWidth="1.4"/>
        <circle cx="11" cy="11" r="3" stroke={PRIMARY} strokeWidth="1.4"/>
      </svg>
    ),
  },
];

const stats = [
  { n: "120+",   l: "Virksomheder bruger Svarly" },
  { n: "4,9 / 5", l: "Gennemsnitlig kundebedømmelse" },
  { n: "1.000+", l: "Anmeldelser besvaret automatisk hver måned" },
];

export default function OmOsPage() {
  return (
    <>
      {/* Hero: headline + office photo */}
      <section className="pt-[110px]" style={{ background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-[60px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <SectionLabel>Om Svarly</SectionLabel>
            <h1
              className="leading-[1.13] tracking-[-0.6px] mb-6"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(28px,3.5vw,46px)" }}
            >
              Vi hjælper lokale<br/>virksomheder med at<br/>bygge tillid og få<br/>flere kunder.
            </h1>
            <p className="text-[15.5px] leading-[1.7] max-w-[380px]" style={{ color: MUTED }}>
              Svarly blev skabt for at løse et simpelt problem: De fleste virksomhedsejere har ikke tid til at svare på anmeldelser. Det løser vi — automatisk.
            </p>
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 20,
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              aspectRatio: "16/10",
            }}
          >
            <Image
              src="/assets/office.png"
              alt="Svarly kontor"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-[60px] px-6 md:px-12" style={{ background: "#F8F9F7", borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:[grid-template-columns:220px_1fr] gap-10 md:gap-12">
          <div>
            <SectionLabel>Vores værdier</SectionLabel>
            <h2
              className="leading-[1.2] tracking-[-0.4px]"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: 28 }}
            >
              Det, vi tror på
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i}>
                <div className="mb-3">{v.icon}</div>
                <div className="font-semibold text-[15.5px] mb-1.5">{v.title}</div>
                <p className="text-[13.5px] leading-[1.6]" style={{ color: MUTED }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team + Stats */}
      <section className="py-[60px] px-6 md:px-12" style={{ background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-center">
          {/* Text */}
          <div>
            <SectionLabel>Teamet bag</SectionLabel>
            <h2
              className="leading-[1.2] tracking-[-0.4px] mb-4"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(20px,2.5vw,30px)" }}
            >
              Bygget i Danmark.<br/>For lokale virksomheder.
            </h2>
            <p className="text-[14.5px] leading-[1.7]" style={{ color: MUTED }}>
              Vi er et lille team med stor passion for at hjælpe lokale virksomheder med at få mere ud af deres kundeanmeldelser.
            </p>
          </div>

          {/* Founder photo */}
          <div className="flex flex-col items-center gap-3.5">
            <div
              className="relative overflow-hidden"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: `3px solid ${CARD}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              }}
            >
              <Image
                src="/assets/founder.jpeg"
                alt="Nail"
                fill
                sizes="120px"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
            <div className="text-center">
              <div className="font-semibold text-[15px]">Nail</div>
              <div className="text-[13px] mt-0.5" style={{ color: MUTED }}>Stifter &amp; CEO</div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-[22px]">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div
                  className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0"
                  style={{ background: PRIMARY + "12" }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2l1.8 5.5H17l-4.5 3.3 1.7 5.2L10 13l-4.2 3 1.7-5.2L3 7.5h5.2z" stroke={PRIMARY} strokeWidth="1.3" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div
                    className="leading-[1.1] tracking-[-0.5px]"
                    style={{ fontFamily: "var(--font-dm-serif),serif", fontSize: 22, color: "#1F2A24" }}
                  >
                    {s.n}
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: MUTED }}>{s.l}</div>
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
            Bliv en del af fællesskabet.
          </h2>
          <p className="text-[15px] mb-7" style={{ color: "rgba(255,255,255,0.6)" }}>
            120+ lokale virksomheder bruger allerede Svarly.
          </p>
          <Link
            href="/priser"
            className="inline-block px-7 py-[13px] rounded-[12px] text-[14.5px] font-semibold transition-all hover:opacity-90"
            style={{ background: "#fff", color: PRIMARY }}
          >
            Start gratis
          </Link>
        </div>
      </section>
    </>
  );
}
