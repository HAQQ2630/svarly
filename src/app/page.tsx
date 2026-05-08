/**
 * src/app/page.tsx  —  Landing home (Hjem)
 * Replace the existing Next.js default page.tsx with this file.
 */
import Link from "next/link";
import { LandingNav } from "@/components/landing/nav";
import { LandingFooter } from "@/components/landing/footer";
import { IPhoneMockup } from "@/components/landing/iphone-mockup";
import { LiveDemo } from "@/components/landing/live-demo";
import { SectionLabel } from "@/components/landing/section-label";
import { Stars } from "@/components/landing/stars";
import { PlantSvg, GoogleLogo, TrustpilotLogo, CheckCircle, XCircle } from "@/components/landing/icons";

const PRIMARY = "#2F4F3E";
const CARD    = "#EFEDE7";
const MUTED   = "#5C6B62";
const BORDER  = "#E0DDD5";

/* ── Reusable section wrapper ── */
function Sec({
  children,
  bg = "#F8F9F7",
  className = "",
  id,
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} style={{ background: bg }} className={`py-[72px] md:py-[100px] px-6 md:px-12 ${className}`}>
      <div className="max-w-[1100px] mx-auto">{children}</div>
    </section>
  );
}

export default function HomePage() {
  const testimonials = [
    { name: "Maria L.", biz: "Café Nord", stars: 5, quote: '"Svarly sparer mig så meget tid. Nu får alle anmeldelser et svar, og vores kunder lægger mærke til det."' },
    { name: "Anders K.", biz: "Klinik 4", stars: 5, quote: '"Vores anmeldelser ser mere professionelle ud, og vi har fået nye kunder, der valgte os pga. vores svar."' },
    { name: "Sara H.", biz: "Blomster & Co.", stars: 5, quote: '"Super nemt at bruge. Jeg godkender svar to gange om ugen, og resten kører af sig selv."' },
  ];

  return (
    <>
      <LandingNav />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex items-center px-6 md:px-12 pt-[110px] pb-[60px] md:pb-[80px]"
        style={{ background: "#F8F9F7", minHeight: "100vh" }}
      >
        {/* bg glow */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: -200, right: -200, width: 700, height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${PRIMARY}09 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
          {/* Left */}
          <div>
            {/* Pill badge */}
            <div
              className="animate-fade-up inline-flex items-center gap-[7px] rounded-full px-[14px] py-[5px] pl-2 text-[11.5px] font-medium mb-7"
              style={{ background: CARD, border: `1px solid ${BORDER}`, color: MUTED }}
            >
              <div
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center"
                style={{ background: PRIMARY + "18" }}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5h2l1.5-3L7 8l1.5-3H11" stroke={PRIMARY} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              AI til anmeldelsessvar
            </div>

            {/* H1 */}
            <h1
              className="animate-fade-up-2 leading-[1.1] tracking-[-1px] mb-6"
              style={{
                fontFamily: "var(--font-dm-serif), serif",
                fontWeight: 400,
                fontSize: "clamp(36px, 4.2vw, 56px)",
                color: "#1F2A24",
              }}
            >
              Svar på alle anmeldelser.
              <br />
              <em
                style={{
                  color: PRIMARY,
                  fontStyle: "italic",
                  fontFamily: "var(--font-dm-serif), serif",
                  fontWeight: 400,
                }}
              >
                Automatisk.
              </em>
            </h1>

            {/* Subtext */}
            <p
              className="animate-fade-up-3 text-[16.5px] leading-[1.7] max-w-[420px] mb-9"
              style={{ color: MUTED }}
            >
              Vi hjælper lokale virksomheder med at opbygge tillid og få flere kunder — ved at sørge for, at ingen anmeldelse forbliver ubesvaret.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up-4 flex gap-3 items-center flex-wrap mb-9">
              <Link
                href="/priser"
                className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[12px] text-[14.5px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: PRIMARY, boxShadow: `0 4px 18px ${PRIMARY}45` }}
              >
                Start gratis
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="/saadan-virker-det"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-[14px] font-medium transition-colors hover:bg-svarly-card"
                style={{ border: `1.5px solid ${BORDER}`, color: "#1F2A24" }}
              >
                Se demo (30 sek.)
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M5.5 4.5l3 2-3 2V4.5z" fill="currentColor"/>
                </svg>
              </Link>
            </div>

            {/* Platform logos */}
            <div className="animate-fade-up-4 flex items-center gap-[18px]">
              <div className="flex items-center gap-[7px]">
                <GoogleLogo />
                <span className="text-[12.5px]" style={{ color: MUTED }}>Google Business Profile</span>
              </div>
              <div className="w-px h-[14px]" style={{ background: BORDER }} />
              <div className="flex items-center gap-[7px]">
                <TrustpilotLogo />
                <span className="text-[12.5px]" style={{ color: MUTED }}>Trustpilot</span>
              </div>
            </div>
          </div>

          {/* Right: Phone */}
          <div className="flex justify-center relative w-full max-w-[320px] mx-auto md:max-w-none">
            <div className="hidden md:block absolute right-[-50px] bottom-[-20px] opacity-45 pointer-events-none">
              <PlantSvg className="w-[90px] h-[140px]" />
            </div>
            {/* Annotation — handwritten note above phone with dashed curving arrow */}
            <div
              className="hidden md:block absolute z-10 pointer-events-none"
              style={{ top: -30, right: -60, width: 200 }}
            >
              <span
                className="block italic whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-dm-serif), serif",
                  fontSize: 15,
                  color: PRIMARY,
                  transform: "rotate(-8deg)",
                  transformOrigin: "left center",
                  marginBottom: 2,
                  marginLeft: 8,
                }}
              >
                AI skriver, du godkender!
              </span>
              <svg
                width="140"
                height="100"
                viewBox="0 0 140 100"
                fill="none"
                style={{ display: "block", marginLeft: -14 }}
              >
                <path
                  d="M118 4 C128 22 110 38 80 36 C50 34 36 50 44 70 C50 84 38 90 22 90"
                  stroke={PRIMARY}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="3 3"
                  fill="none"
                />
                <path
                  d="M22 90 L32 86 M22 90 L28 82"
                  stroke={PRIMARY}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="animate-float">
              <IPhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKS WITH ── */}
      <div
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 px-6 md:gap-8 md:px-12"
        style={{ background: "#fff", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <span className="text-[11px] font-semibold tracking-[.08em] uppercase" style={{ color: MUTED }}>
          Virker med
        </span>
        <div className="flex items-center gap-[7px]">
          <GoogleLogo />
          <span className="text-[13.5px] font-medium">Google Business Profile</span>
        </div>
        <div className="w-px h-4" style={{ background: BORDER }} />
        <div className="flex items-center gap-[7px]">
          <TrustpilotLogo />
          <span className="text-[13.5px] font-medium">Trustpilot</span>
        </div>
      </div>

      {/* ── PROBLEM + SOLUTION ── */}
      <Sec>
        <div className="grid grid-cols-1 md:grid-cols-2 relative gap-10 md:gap-0">
          {/* Problem */}
          <div className="pb-10 md:pb-0 md:pr-[60px] border-b md:border-b-0 md:border-r" style={{ borderColor: BORDER }}>
            <SectionLabel>Problemet</SectionLabel>
            <h2
              className="leading-[1.2] tracking-[-0.4px] mb-5"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(22px,2.8vw,34px)" }}
            >
              Ubesvarede anmeldelser<br/>koster dig kunder.
            </h2>
            <div className="flex flex-col gap-[11px] mb-7">
              {["Kunder mister tilliden","Du mister potentielle kunder","Manuelle svar tager for lang tid","Det er nemt at glemme"].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <XCircle />
                  <span className="text-[14px]">{t}</span>
                </div>
              ))}
            </div>
            {/* Unanswered reviews mini-card */}
            <div className="rounded-[14px] p-[18px]" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="text-[11px] font-medium mb-[10px]" style={{ color: MUTED }}>27 ubesvarede anmeldelser</div>
              {[{n:"Ole P.",s:2},{n:"Lena M.",s:4},{n:"Bjørn K.",s:1}].map((r, i) => (
                <div key={i} className="flex items-center gap-2 py-[7px]" style={{ borderBottom: i < 2 ? `1px solid ${BORDER}` : "none" }}>
                  <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0" style={{ background: ["#E8D5C4","#C8DCE2","#D4D0E0"][i], color: MUTED }}>{r.n[0]}</div>
                  <div className="flex-1">
                    <div className="text-[11.5px] font-medium">{r.n}</div>
                    <Stars n={r.s} size={9} />
                  </div>
                  <div className="w-[6px] h-[6px] rounded-full shrink-0" style={{ background: "#E8443A" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Center arrow */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: PRIMARY, boxShadow: `0 4px 18px ${PRIMARY}50` }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M9 3l6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Solution */}
          <div className="md:pl-[60px]">
            <SectionLabel>Løsningen</SectionLabel>
            <h2
              className="leading-[1.2] tracking-[-0.4px] mb-5"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(22px,2.8vw,34px)" }}
            >
              Vi klarer det<br/>automatisk.
            </h2>
            <div className="flex flex-col gap-[11px] mb-7">
              {["AI skriver professionelle svar","Du godkender med ét klik","Kører automatisk 24/7","Opbygger tillid og giver flere kunder"].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle />
                  <span className="text-[14px]">{t}</span>
                </div>
              ))}
            </div>
            {/* 4-step flow */}
            <div className="rounded-[14px] p-[18px]" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between gap-1">
                {[{e:"⭐",l:"Ny anmeldelse"},{e:"🤖",l:"AI skriver svar"},{e:"✓",l:"Du godkender"},{e:"📤",l:"Svar sendt"}].map((s, i, arr) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="flex-1 text-center">
                      <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center text-[15px] mx-auto mb-[5px]" style={{ background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>{s.e}</div>
                      <div className="text-[9.5px] leading-[1.3]" style={{ color: MUTED }}>{s.l}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0 mb-[14px]">
                        <path d="M1 5h10M7 1l4 4-4 4" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Sec>

      {/* ── STATS ── */}
      <div style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }} className="py-[56px] px-6 md:px-12">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { n: "67%", d: "af kunder forventer svar inden for 24 timer" },
            { n: "3×",  d: "mere sandsynligt at vælge en virksomhed, der svarer på anmeldelser" },
            { n: "45 min.", d: "gennemsnitlig tid brugt manuelt pr. uge" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl px-6 py-7 text-center" style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div className="text-[38px] mb-2" style={{ fontFamily: "var(--font-dm-serif),serif", color: PRIMARY }}>{s.n}</div>
              <p className="text-[13.5px] leading-[1.5]" style={{ color: MUTED }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIVE DEMO ── */}
      <Sec id="demo">
        <div className="text-center mb-12">
          <SectionLabel>Live demo</SectionLabel>
          <h2 className="leading-[1.2] tracking-[-0.4px] mb-3" style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(24px,3.2vw,38px)" }}>
            Se det selv på 30 sekunder.
          </h2>
          <p className="text-[15px]" style={{ color: MUTED }}>Indsæt en anmeldelse og se Svarly skrive det perfekte svar.</p>
        </div>
        <LiveDemo />
      </Sec>

      {/* ── TESTIMONIALS ── */}
      <Sec bg={CARD} className="border-t border-svarly-border border-b">
        <div className="text-center mb-11">
          <SectionLabel>Rigtige virksomheder</SectionLabel>
          <h2 className="leading-[1.2] tracking-[-0.4px]" style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(24px,3.2vw,38px)" }}>
            Rigtige resultater.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl p-7" style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <Stars n={t.stars} size={13} />
              <p className="text-[14.5px] leading-[1.65] italic my-4" style={{ color: "#1F2A24" }}>{t.quote}</p>
              <div className="flex items-center gap-2.5">
                <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[12px] font-semibold" style={{ background: PRIMARY + "1A", color: PRIMARY }}>{t.name[0]}</div>
                <div>
                  <div className="text-[13px] font-semibold">{t.name}</div>
                  <div className="text-[11.5px]" style={{ color: MUTED }}>{t.biz}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
          {[{n:"120+",l:"Virksomheder bruger Svarly"},{n:"4,9/5",l:"Gennemsnitlig kundevurdering"},{n:"5 min.",l:"Sparet pr. svar i gennemsnit"}].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[34px] mb-1" style={{ fontFamily: "var(--font-dm-serif),serif", color: PRIMARY }}>{s.n}</div>
              <div className="text-[12.5px]" style={{ color: MUTED }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* ── PRICING TEASER ── */}
      <Sec>
        <div className="max-w-[520px] mx-auto text-center">
          <SectionLabel>Enkel pris</SectionLabel>
          <h2 className="leading-[1.2] tracking-[-0.4px] mb-3" style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(24px,3.2vw,38px)" }}>
            Ét abonnement. Alt inkluderet.
          </h2>
          <p className="text-[15px] mb-8" style={{ color: MUTED }}>Fra gratis. Starter fra 199 DKK/måned.</p>
          <Link
            href="/priser"
            className="inline-block px-8 py-[13px] rounded-[12px] text-[15px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: PRIMARY, boxShadow: `0 4px 18px ${PRIMARY}45` }}
          >
            Se alle funktioner og pris →
          </Link>
        </div>
      </Sec>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-[80px] md:py-[100px] px-6 md:px-12" style={{ background: PRIMARY }}>
        <div className="absolute bottom-[-30px] left-10 opacity-20 pointer-events-none">
          <PlantSvg className="w-[120px] h-[180px]" />
        </div>
        <div className="absolute top-[-10px] right-20 opacity-[0.12] pointer-events-none">
          <PlantSvg className="w-[70px] h-[110px]" />
        </div>
        <div className="max-w-[640px] mx-auto text-center relative">
          <h2
            className="text-white leading-[1.2] tracking-[-0.5px] mb-4"
            style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(26px,3.5vw,44px)" }}
          >
            Klar til at opbygge tillid<br/>og få flere kunder?
          </h2>
          <p className="text-[15px] mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            Start din gratis prøveperiode på 14 dage i dag.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/priser"
              className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[12px] text-[14.5px] font-semibold transition-all hover:opacity-90"
              style={{ background: "#fff", color: PRIMARY, boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}
            >
              Start gratis
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/saadan-virker-det"
              className="px-7 py-[13px] rounded-[12px] text-[14.5px] font-medium text-white transition-all hover:opacity-90"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
            >
              Se demo (30 sek.)
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </>
  );
}
