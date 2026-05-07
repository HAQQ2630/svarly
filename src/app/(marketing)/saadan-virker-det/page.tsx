import Link from "next/link";
import { SectionLabel } from "@/components/landing/section-label";
import { GoogleLogo, TrustpilotLogo } from "@/components/landing/icons";

const PRIMARY = "#2F4F3E";
const CARD    = "#EFEDE7";
const MUTED   = "#5C6B62";
const BORDER  = "#E0DDD5";

const steps = [
  {
    n: "01",
    title: "Ny anmeldelse kommer ind",
    desc: "Svarly overvåger automatisk dine Google og Trustpilot-profiler hele døgnet. Når en ny anmeldelse dukker op, registreres den med det samme.",
    sub: "Du behøver ikke gøre noget.",
  },
  {
    n: "02",
    title: "AI skriver et svar",
    desc: "Vores AI analyserer anmeldelsen og skriver et professionelt, venligt og personligt svar. Svaret er tilpasset din virksomheds tone og er skrevet på dansk.",
    sub: "Klar på under 10 sekunder.",
  },
  {
    n: "03",
    title: "Du godkender — eller vi sender automatisk",
    desc: "Du modtager en besked og kan godkende svaret med ét klik. Eller du aktiverer auto-post, og svaret sendes direkte uden at du behøver gøre noget.",
    sub: "Fuldt op til dig.",
  },
];

const platforms = [
  { icon: <GoogleLogo size={36} />, name: "Google Business Profile", desc: "Overvåg og svar på Google-anmeldelser" },
  { icon: <TrustpilotLogo size={36} />, name: "Trustpilot", desc: "Overvåg og svar på Trustpilot-anmeldelser" },
];

export default function SaadanVirkerDetPage() {
  return (
    <>
      {/* Steps */}
      <section className="pt-[140px] pb-[90px] px-6 md:px-12" style={{ background: "#F8F9F7" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center max-w-[560px] mx-auto mb-[72px]">
            <SectionLabel>Sådan virker det</SectionLabel>
            <h1
              className="leading-[1.15] tracking-[-0.5px] mb-4"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(28px,3.5vw,44px)" }}
            >
              Tre enkle trin.
            </h1>
            <p className="text-[16px] leading-[1.65]" style={{ color: MUTED }}>
              Svarly er designet til at være så enkelt som muligt — du skal ikke lære noget nyt.
            </p>
          </div>

          <div className="max-w-[720px] mx-auto flex flex-col">
            {steps.map((s, i) => (
              <div
                key={i}
                className="grid gap-7 relative"
                style={{ gridTemplateColumns: "72px 1fr", paddingBottom: i < steps.length - 1 ? 48 : 0 }}
              >
                {i < steps.length - 1 && (
                  <div
                    className="absolute rounded-sm"
                    style={{ left: 35, top: 50, bottom: 0, width: 2, background: PRIMARY + "18" }}
                  />
                )}
                <div>
                  <div
                    className="w-[52px] h-[52px] rounded-[15px] flex items-center justify-center text-white font-bold text-[16px] tracking-[-0.5px] relative z-10"
                    style={{ background: PRIMARY }}
                  >
                    {s.n}
                  </div>
                </div>
                <div className="pt-[10px]">
                  <h3 className="text-[20px] font-semibold tracking-[-0.3px] mb-2.5">{s.title}</h3>
                  <p className="text-[15px] leading-[1.7] mb-2" style={{ color: MUTED }}>{s.desc}</p>
                  <div
                    className="inline-flex items-center gap-[6px] rounded-full px-3 py-1"
                    style={{ background: PRIMARY + "12" }}
                  >
                    <div className="w-[6px] h-[6px] rounded-full" style={{ background: PRIMARY }} />
                    <span className="text-[12px] font-semibold" style={{ color: PRIMARY }}>{s.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section
        className="py-[90px] px-6 md:px-12"
        style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <SectionLabel>Integrationer</SectionLabel>
            <h2
              className="leading-[1.2] tracking-[-0.4px] mb-4"
              style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(22px,3vw,36px)" }}
            >
              Virker med de platforme du allerede bruger.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {platforms.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl px-8 py-7 text-center w-[260px]"
                style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
              >
                <div className="flex justify-center mb-3">{p.icon}</div>
                <div className="font-semibold text-[15px] mb-1.5">{p.name}</div>
                <div className="text-[13px]" style={{ color: MUTED }}>{p.desc}</div>
                <div className="mt-3.5 inline-flex items-center gap-[5px] text-[12px] font-semibold" style={{ color: PRIMARY }}>
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: PRIMARY }} />
                  Tilgængelig nu
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
            Klar til at prøve?
          </h2>
          <p className="text-[15px] mb-7" style={{ color: "rgba(255,255,255,0.6)" }}>
            Det tager under 5 minutter at komme i gang.
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
