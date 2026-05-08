import Link from "next/link";
import { LandingNav } from "@/components/landing/nav";
import { LandingFooter } from "@/components/landing/footer";
import { HeroDemo } from "@/components/landing/hero-demo";
import { GoogleLogo, TrustpilotLogo } from "@/components/landing/icons";

const PRIMARY = "#2F4F3E";
const SAGE = "#7A8F7B";
const INK = "#1F2A24";
const BARK = "#5C6B62";
const LINEN = "#F8F9F7";
const BEIGE = "#EFEDE7";
const BORDER = "#E0DDD5";

const SERIF = "var(--font-dm-serif), Georgia, serif";

/* ── Botanical line art (thin, single-stroke) ── */
function BotanicalMark({
  className,
  stroke = SAGE,
  width = 110,
  height = 170,
  opacity = 0.5,
}: {
  className?: string;
  stroke?: string;
  width?: number;
  height?: number;
  opacity?: number;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 110 170"
      fill="none"
      style={{ opacity }}
      aria-hidden
    >
      <path
        d="M55 168 V70"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M55 132 C40 120 28 100 32 78"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M55 110 C70 96 82 74 78 52"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M55 88 C44 76 36 58 42 38"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <ellipse
        cx="32"
        cy="78"
        rx="9"
        ry="14"
        stroke={stroke}
        strokeWidth="1.1"
      />
      <ellipse
        cx="78"
        cy="52"
        rx="10"
        ry="15"
        stroke={stroke}
        strokeWidth="1.1"
      />
      <ellipse
        cx="42"
        cy="38"
        rx="8"
        ry="12"
        stroke={stroke}
        strokeWidth="1.1"
      />
      <ellipse
        cx="55"
        cy="22"
        rx="11"
        ry="14"
        stroke={stroke}
        strokeWidth="1.1"
      />
    </svg>
  );
}

/* ── Single curved line for the drenched stats motif ── */
function CurvedAccent({
  className,
  stroke = "rgba(248,249,247,0.28)",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      className={className}
      width="220"
      height="60"
      viewBox="0 0 220 60"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 30 C 60 4, 160 56, 218 30"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <LandingNav />

      {/* ───────── HERO ───────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 pt-[120px] pb-[64px] md:pt-[140px] md:pb-[96px]"
        style={{ background: LINEN }}
      >
        {/* Quiet daylight glow, top-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: -240,
            right: -180,
            width: 760,
            height: 760,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${PRIMARY}10 0%, transparent 65%)`,
          }}
        />

        <div className="relative max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-16 items-center">
          {/* ── Left: voice ── */}
          <div>
            <div
              className="animate-fade-up inline-flex items-center gap-2 rounded-full pl-2 pr-3.5 py-[5px] text-[11.5px] font-medium mb-7"
              style={{
                background: BEIGE,
                border: `1px solid ${BORDER}`,
                color: BARK,
              }}
            >
              <span
                className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full"
                style={{ background: `${PRIMARY}1A` }}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5h2l1.4-3L7 8l1.4-3H10"
                    stroke={PRIMARY}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Til lokale virksomheder i Danmark
            </div>

            <h1
              className="animate-fade-up-2 mb-6"
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(40px, 5.4vw, 60px)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                color: INK,
              }}
            >
              Svar på alle anmeldelser.
              <br />
              <em
                style={{
                  color: PRIMARY,
                  fontStyle: "italic",
                  fontFamily: SERIF,
                  fontWeight: 400,
                }}
              >
                Roligt.
              </em>
            </h1>

            <p
              className="animate-fade-up-3 max-w-[440px] mb-9"
              style={{
                color: BARK,
                fontSize: "16.5px",
                lineHeight: 1.7,
              }}
            >
              Svarly læser nye Google-anmeldelser, skriver et svar i dit
              tonefald og venter på dit grønne lys. Du bruger ti minutter om
              ugen. Dine kunder ser en virksomhed, der lytter.
            </p>

            <div className="animate-fade-up-4 flex items-center gap-3 flex-wrap mb-9">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-[12px] px-6 py-[12px] text-[14.5px] font-semibold transition-all"
                style={{
                  background: PRIMARY,
                  color: LINEN,
                  boxShadow: `0 2px 14px ${PRIMARY}55`,
                }}
              >
                Start gratis
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6h8M6 2l4 4-4 4"
                    stroke={LINEN}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/saadan-virker-det"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium underline-offset-[6px] decoration-[1.5px] decoration-[rgba(31,42,36,0.25)] hover:decoration-[rgba(31,42,36,0.6)] transition-all"
                style={{ color: INK }}
              >
                Sådan virker det
              </Link>
            </div>

            <p
              className="animate-fade-up-4 mb-7 text-[12.5px]"
              style={{ color: BARK }}
            >
              14 dage gratis. Ingen kort.
            </p>

            <div
              className="animate-fade-up-4 flex items-center gap-4 text-[12.5px]"
              style={{ color: BARK }}
            >
              <span
                className="text-[10.5px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: BARK }}
              >
                Virker med
              </span>
              <span className="inline-flex items-center gap-2">
                <GoogleLogo />
                Google
              </span>
              <span
                className="inline-block h-[10px] w-px"
                style={{ background: BORDER }}
              />
              <span className="inline-flex items-center gap-2">
                <TrustpilotLogo />
                Trustpilot
              </span>
            </div>
          </div>

          {/* ── Right: working demo ── */}
          <div className="relative">
            {/* Handwritten note — repositioned for the new card shape */}
            <div
              className="hidden md:block absolute z-10 pointer-events-none"
              style={{ top: -22, left: -52, width: 220 }}
              aria-hidden
            >
              <span
                className="block whitespace-nowrap"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 16,
                  color: PRIMARY,
                  transform: "rotate(-7deg)",
                  transformOrigin: "left center",
                  marginLeft: 22,
                  marginBottom: 4,
                }}
              >
                Skriv anmeldelsen om, hvis du vil
              </span>
              <svg
                width="120"
                height="64"
                viewBox="0 0 120 64"
                fill="none"
                style={{ display: "block" }}
              >
                <path
                  d="M14 6 C 22 24, 40 38, 78 50"
                  stroke={PRIMARY}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeDasharray="3 4"
                />
                <path
                  d="M78 50 L70 44 M78 50 L72 56"
                  stroke={PRIMARY}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* ───────── WORKS-WITH STRIP ───────── */}
      <div
        className="px-6 md:px-12"
        style={{
          background: LINEN,
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="max-w-[1100px] mx-auto py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span
            className="text-[10.5px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: BARK }}
          >
            Anmeldelser fra
          </span>
          <span className="inline-flex items-center gap-2 text-[13.5px] font-medium" style={{ color: INK }}>
            <GoogleLogo />
            Google Business Profile
          </span>
          <span
            className="inline-block h-[14px] w-px"
            style={{ background: BORDER }}
          />
          <span className="inline-flex items-center gap-2 text-[13.5px] font-medium" style={{ color: INK }}>
            <TrustpilotLogo />
            Trustpilot
          </span>
          <span
            className="hidden sm:inline-block h-[14px] w-px"
            style={{ background: BORDER }}
          />
          <span className="text-[12.5px]" style={{ color: BARK }}>
            Flere platforme på vej
          </span>
        </div>
      </div>

      {/* ───────── PROBLEM / SOLUTION (editorial 5/7) ───────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 py-[88px] md:py-[120px]"
        style={{ background: LINEN }}
      >
        <div className="relative max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-20">
          {/* Problem — editorial statement */}
          <div className="relative">
            <BotanicalMark
              className="hidden md:block absolute -left-6 -top-6"
              opacity={0.42}
              width={130}
              height={200}
            />
            <div
              className="relative text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: BARK }}
            >
              Problemet
            </div>
            <h2
              className="relative mb-6"
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3.4vw, 38px)",
                lineHeight: 1.12,
                letterSpacing: "-0.012em",
                color: INK,
              }}
            >
              Den ubesvarede anmeldelse
              <br />
              koster mere{" "}
              <em
                className="block md:inline"
                style={{ color: PRIMARY, fontStyle: "italic" }}
              >
                end den ser ud til.
              </em>
            </h2>
            <p
              className="relative max-w-[420px]"
              style={{ color: BARK, fontSize: "15.5px", lineHeight: 1.7 }}
            >
              Folk kigger på, om der er svaret. Det er den første ting, en
              kommende kunde læser efter stjernerne. Tavshed lyder som ligegyldighed,
              også når det bare er travlhed.
            </p>
          </div>

          {/* Solution — editorial flow, no bullets */}
          <div className="relative">
            <div
              className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: PRIMARY }}
            >
              Løsningen
            </div>
            <h2
              className="mb-7"
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3.4vw, 38px)",
                lineHeight: 1.12,
                letterSpacing: "-0.012em",
                color: INK,
              }}
            >
              Vi skriver svarene.
              <br />
              <em style={{ color: PRIMARY, fontStyle: "italic" }}>
                Du sætter tonen.
              </em>
            </h2>
            <p
              className="max-w-[520px] mb-8"
              style={{ color: INK, fontSize: "16px", lineHeight: 1.7 }}
            >
              Svarly henter nye anmeldelser fra Google, skriver et udkast i
              dit tonefald og lægger det klar til godkendelse. Du læser, retter
              et ord hvis det skal være, og sender. Resten kører i baggrunden.
            </p>

            <div className="space-y-5 max-w-[520px]">
              {[
                {
                  k: "Tonefald",
                  v: "Lærer dit ordvalg fra dine egne tidligere svar.",
                },
                {
                  k: "Tempo",
                  v: "Nye anmeldelser fanges samme dag, ikke samme uge.",
                },
                {
                  k: "Kontrol",
                  v: "Intet svar går afsted uden at du har set det først.",
                },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline gap-5">
                  <span
                    className="shrink-0 w-[64px] text-[11px] font-semibold tracking-[0.14em] uppercase"
                    style={{ color: PRIMARY }}
                  >
                    {row.k}
                  </span>
                  <span className="text-[15px]" style={{ color: INK, lineHeight: 1.6 }}>
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DRENCHED-FOREST STATS (chromatic peak) ───────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 py-[100px] md:py-[140px]"
        style={{ background: PRIMARY }}
      >
        {/* ambient warm glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: -180,
            left: "50%",
            width: 900,
            height: 380,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(248,249,247,0.10) 0%, transparent 70%)",
          }}
        />
        <CurvedAccent
          className="hidden md:block absolute"
          stroke="rgba(248,249,247,0.20)"
        />

        <div className="relative max-w-[1100px] mx-auto">
          <div
            className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-12 text-center"
            style={{ color: "rgba(248,249,247,0.55)" }}
          >
            <span className="inline-block h-[1px] w-8 align-middle mr-3" style={{ background: "rgba(248,249,247,0.45)" }} />
            Hvorfor det betyder noget
            <span className="inline-block h-[1px] w-8 align-middle ml-3" style={{ background: "rgba(248,249,247,0.45)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-end">
            {[
              {
                n: "67%",
                top: "af kunder",
                bottom: "forventer svar inden for et døgn",
              },
              {
                n: "3×",
                top: "så sandsynligt",
                bottom: "at vælge en virksomhed der svarer",
              },
              {
                n: "45 min.",
                top: "per uge",
                bottom: "er det manuelle gennemsnit",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="relative text-center md:text-left"
                style={{
                  paddingLeft: i === 1 ? 0 : undefined,
                }}
              >
                {/* label above */}
                <div
                  className="text-[12px] mb-3"
                  style={{ color: "rgba(248,249,247,0.55)", fontStyle: "italic", fontFamily: SERIF }}
                >
                  {s.top}
                </div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontStyle: i === 1 ? "italic" : "normal",
                    fontSize: "clamp(56px, 6.4vw, 88px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    color: LINEN,
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-4 max-w-[240px] mx-auto md:mx-0 text-[13.5px]"
                  style={{ color: "rgba(248,249,247,0.72)", lineHeight: 1.55 }}
                >
                  {s.bottom}
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-16 md:mt-20 text-center max-w-[520px] mx-auto"
            style={{
              color: "rgba(248,249,247,0.78)",
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: "clamp(17px, 1.6vw, 19px)",
              lineHeight: 1.55,
            }}
          >
            Tal hjælper. Det er det daglige svar, der bygger tilliden.
          </p>
        </div>
      </section>

      {/* ───────── HOW IT WORKS (refined demo slot) ───────── */}
      <section
        className="px-6 md:px-12 py-[88px] md:py-[120px]"
        style={{ background: BEIGE }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="md:flex md:items-end md:justify-between mb-14 gap-12">
            <div>
              <div
                className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-4"
                style={{ color: BARK }}
              >
                Tre trin
              </div>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.4vw, 38px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.012em",
                  color: INK,
                }}
              >
                Resten klarer{" "}
                <em style={{ color: PRIMARY, fontStyle: "italic" }}>vi.</em>
              </h2>
            </div>
            <p
              className="md:max-w-[360px] mt-5 md:mt-0"
              style={{ color: BARK, fontSize: "15px", lineHeight: 1.65 }}
            >
              Du behøver ikke at logge ind hver dag. To gange om ugen, ti
              minutter af gangen, så er du på.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
            {/* Step 1 */}
            <div className="md:col-span-4 md:pt-6">
              <div
                className="text-[64px] leading-none mb-5"
                style={{
                  fontFamily: SERIF,
                  color: PRIMARY,
                  letterSpacing: "-0.04em",
                }}
              >
                01
              </div>
              <h3 className="text-[18px] font-medium mb-2" style={{ color: INK }}>
                Vi finder dem
              </h3>
              <p className="text-[14.5px]" style={{ color: BARK, lineHeight: 1.65 }}>
                Svarly henter nye anmeldelser direkte fra Google Business
                Profile, hver dag. Ingenting glipper.
              </p>
              <div
                className="mt-6 rounded-[12px] p-3"
                style={{ background: LINEN, border: `1px solid ${BORDER}` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <GoogleLogo size={14} />
                  <span className="text-[11px] font-medium" style={{ color: BARK }}>
                    Google · 3 nye
                  </span>
                </div>
                {["Ole P. · 4★", "Lena M. · 5★", "Bjørn K. · 2★"].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 text-[12.5px]"
                    style={{
                      color: INK,
                      borderTop: i === 0 ? "none" : `1px solid ${BORDER}`,
                    }}
                  >
                    <span>{row}</span>
                    <span
                      className="inline-block h-[6px] w-[6px] rounded-full"
                      style={{ background: PRIMARY }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2 — slightly higher */}
            <div className="md:col-span-4 md:-mt-6">
              <div
                className="text-[64px] leading-none mb-5"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  color: PRIMARY,
                  letterSpacing: "-0.04em",
                }}
              >
                02
              </div>
              <h3 className="text-[18px] font-medium mb-2" style={{ color: INK }}>
                Vi skriver
              </h3>
              <p className="text-[14.5px]" style={{ color: BARK, lineHeight: 1.65 }}>
                I dit tonefald, ikke et generisk skabelonsvar. Lærer af dine
                egne tidligere svar.
              </p>
              <div
                className="mt-6 rounded-[12px] p-4"
                style={{ background: LINEN, border: `1px solid ${BORDER}` }}
              >
                <div
                  className="text-[10.5px] font-semibold tracking-[0.14em] uppercase mb-2"
                  style={{ color: PRIMARY }}
                >
                  Forslag
                </div>
                <p
                  className="text-[13px]"
                  style={{ color: INK, lineHeight: 1.6 }}
                >
                  Hej Ole. Tak for besøget — vi er glade for at du tog dig tid
                  til at skrive. Vi tager bemærkningen om ventetiden med
                  videre.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="md:col-span-4 md:pt-12">
              <div
                className="text-[64px] leading-none mb-5"
                style={{
                  fontFamily: SERIF,
                  color: PRIMARY,
                  letterSpacing: "-0.04em",
                }}
              >
                03
              </div>
              <h3 className="text-[18px] font-medium mb-2" style={{ color: INK }}>
                Du godkender
              </h3>
              <p className="text-[14.5px]" style={{ color: BARK, lineHeight: 1.65 }}>
                Læs, ret hvis du vil, klik godkend. Svaret er ude på Google
                inden for sekunder.
              </p>
              <div
                className="mt-6 rounded-[12px] p-3 flex items-center gap-3"
                style={{ background: LINEN, border: `1px solid ${BORDER}` }}
              >
                <span
                  className="inline-flex items-center justify-center h-[28px] w-[28px] rounded-full"
                  style={{ background: PRIMARY }}
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6.5l2.2 2.2L9.5 3.7"
                      stroke={LINEN}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-[12.5px] font-medium" style={{ color: INK }}>
                    Godkendt og sendt
                  </div>
                  <div className="text-[11px]" style={{ color: BARK }}>
                    1 sek. siden · Google
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS (editorial story) ───────── */}
      <section
        className="px-6 md:px-12 py-[100px] md:py-[140px]"
        style={{ background: LINEN }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div
            className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-12"
            style={{ color: BARK }}
          >
            Hvad ejerne siger
          </div>

          {/* Anchor quote */}
          <div className="md:grid md:grid-cols-12 md:gap-12 mb-20">
            <div className="md:col-span-2 mb-6 md:mb-0">
              <div
                className="h-[64px] w-[64px] rounded-full flex items-center justify-center text-[20px] font-medium"
                style={{
                  background: `${PRIMARY}14`,
                  color: PRIMARY,
                  fontFamily: SERIF,
                }}
              >
                M
              </div>
            </div>
            <div className="md:col-span-10">
              <p
                className="mb-6"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.6vw, 32px)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.012em",
                  color: INK,
                }}
              >
                “Jeg åbner laptoppen tirsdag morgen, godkender otte svar,
                lukker den igen. Det er hele opgaven nu. Vores kunder
                kommenterer det faktisk: at vi svarer.”
              </p>
              <div className="flex items-center gap-3 text-[13px]">
                <span style={{ color: INK, fontWeight: 500 }}>Maria L.</span>
                <span
                  className="inline-block h-[3px] w-[3px] rounded-full"
                  style={{ background: BARK }}
                />
                <span style={{ color: BARK }}>Café Nord</span>
                <span
                  className="inline-block h-[3px] w-[3px] rounded-full"
                  style={{ background: BARK }}
                />
                <span style={{ color: BARK }}>Aarhus</span>
              </div>
            </div>
          </div>

          <div
            className="h-px w-full mb-20"
            style={{ background: BORDER }}
          />

          {/* Two supporting voices, asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12">
            <div className="md:col-span-6 md:col-start-1">
              <p
                className="mb-5"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: "18px",
                  lineHeight: 1.5,
                  color: INK,
                }}
              >
                “Jeg troede ikke, det ville lyde som mig. Det gør det. Mine
                kollegaer kan ikke se forskel.”
              </p>
              <div className="flex items-center gap-3 text-[12.5px]">
                <span
                  className="h-[34px] w-[34px] rounded-full flex items-center justify-center text-[12px] font-medium shrink-0"
                  style={{ background: `${SAGE}25`, color: PRIMARY, fontFamily: SERIF }}
                >
                  A
                </span>
                <span style={{ color: INK, fontWeight: 500 }}>Anders K.</span>
                <span style={{ color: BARK }}>· Klinik 4 · København</span>
              </div>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <p
                className="mb-5"
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: "18px",
                  lineHeight: 1.5,
                  color: INK,
                }}
              >
                “Det er den første ting jeg har købt i lang tid, som bare gør
                arbejdet og bliver væk.”
              </p>
              <div className="flex items-center gap-3 text-[12.5px]">
                <span
                  className="h-[34px] w-[34px] rounded-full flex items-center justify-center text-[12px] font-medium shrink-0"
                  style={{ background: "#E8D5C4", color: "#7A5A3C", fontFamily: SERIF }}
                >
                  S
                </span>
                <span style={{ color: INK, fontWeight: 500 }}>Sara H.</span>
                <span style={{ color: BARK }}>· Blomster &amp; Co.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PRICING TEASER ───────── */}
      <section
        className="px-6 md:px-12 py-[88px] md:py-[110px]"
        style={{ background: BEIGE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[680px] mx-auto text-center">
          <div
            className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ color: BARK }}
          >
            Enkel pris
          </div>
          <h2
            className="mb-5"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              lineHeight: 1.15,
              letterSpacing: "-0.012em",
              color: INK,
            }}
          >
            Start gratis.{" "}
            <em
              className="block md:inline"
              style={{ color: PRIMARY, fontStyle: "italic" }}
            >
              Skift når du er klar.
            </em>
          </h2>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-8 text-[14px]"
            style={{ color: INK }}
          >
            <span className="inline-flex items-baseline gap-1.5">
              <span style={{ fontWeight: 500 }}>Gratis</span>
              <span style={{ color: BARK, fontSize: "12.5px" }}>5 svar/md</span>
            </span>
            <span
              className="hidden sm:inline-block h-[10px] w-px"
              style={{ background: BORDER }}
              aria-hidden
            />
            <span className="inline-flex items-baseline gap-1.5">
              <span style={{ fontWeight: 500 }}>199 kr.</span>
              <span style={{ color: BARK, fontSize: "12.5px" }}>/md</span>
            </span>
            <span
              className="hidden sm:inline-block h-[10px] w-px"
              style={{ background: BORDER }}
              aria-hidden
            />
            <span className="inline-flex items-baseline gap-1.5">
              <span style={{ fontWeight: 500 }}>1.990 kr.</span>
              <span style={{ color: BARK, fontSize: "12.5px" }}>
                /år, spar 2 mdr.
              </span>
            </span>
          </div>

          <Link
            href="/priser"
            className="inline-flex items-center gap-2 rounded-[12px] px-7 py-[12px] text-[14.5px] font-semibold transition-all hover:opacity-95"
            style={{
              background: PRIMARY,
              color: LINEN,
              boxShadow: `0 2px 14px ${PRIMARY}45`,
            }}
          >
            Se planer
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6h8M6 2l4 4-4 4"
                stroke={LINEN}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ───────── FINAL CTA (quieter close) ───────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 py-[120px] md:py-[160px]"
        style={{ background: LINEN }}
      >
        <BotanicalMark
          className="hidden md:block absolute right-[6%] top-[18%]"
          opacity={0.32}
          width={150}
          height={220}
        />
        <BotanicalMark
          className="hidden md:block absolute left-[7%] bottom-[10%]"
          opacity={0.22}
          width={110}
          height={170}
        />

        <div className="relative max-w-[820px] mx-auto text-center">
          <div
            className="text-[10.5px] font-semibold tracking-[0.18em] uppercase mb-7"
            style={{ color: BARK }}
          >
            <span
              className="inline-block h-[1px] w-8 align-middle mr-3"
              style={{ background: BARK }}
            />
            Klar når du er
            <span
              className="inline-block h-[1px] w-8 align-middle ml-3"
              style={{ background: BARK }}
            />
          </div>

          <h2
            className="mb-7"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.4vw, 60px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: INK,
            }}
          >
            Lad anmeldelserne
            <br />
            <em style={{ color: PRIMARY, fontStyle: "italic" }}>
              passe sig selv.
            </em>
          </h2>
          <p
            className="mb-10 max-w-[460px] mx-auto"
            style={{ color: BARK, fontSize: "16px", lineHeight: 1.7 }}
          >
            Du får 14 dage gratis. Ingen kort, ingen binding. Vi henter dine
            anmeldelser, du godkender det første svar inden frokost.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-[12px] px-7 py-[13px] text-[15px] font-semibold transition-all"
              style={{
                background: PRIMARY,
                color: LINEN,
                boxShadow: `0 2px 14px ${PRIMARY}55`,
              }}
            >
              Start gratis
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke={LINEN}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/saadan-virker-det"
              className="text-[14px] font-medium underline-offset-[6px] decoration-[1.5px] decoration-[rgba(31,42,36,0.25)] hover:decoration-[rgba(31,42,36,0.6)] transition-all px-3 py-2"
              style={{ color: INK }}
            >
              Eller læs hvordan det virker
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </>
  );
}
