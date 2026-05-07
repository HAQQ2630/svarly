import Link from "next/link";
import { SectionLabel } from "@/components/landing/section-label";

const PRIMARY = "#2F4F3E";
const MUTED   = "#5C6B62";
const BORDER  = "#E0DDD5";

type Category = "Guide" | "Eksempler" | "Tips";

const catStyle: Record<Category, { bg: string; color: string }> = {
  Guide:     { bg: "#2F4F3E18", color: "#2F4F3E" },
  Eksempler: { bg: "#4A7A5E18", color: "#4A7A5E" },
  Tips:      { bg: "#8A6F3E18", color: "#8A6F3E" },
};

const articles: { cat: Category; title: string; desc: string }[] = [
  { cat: "Guide",     title: "Sådan får du flere anmeldelser",             desc: "Lær, hvilke enkle tiltag der får dine tilfredse kunder til at efterlade en anmeldelse — uden at det føles påtrængende." },
  { cat: "Eksempler", title: "Eksempler på gode svar til anmeldelser",      desc: "Se konkrete eksempler på professionelle svar til både positive og negative anmeldelser." },
  { cat: "Tips",      title: "Tips til bedre kundetillid",                  desc: "Tillid bygges over tid. Her er de vigtigste faktorer, der påvirker, om potentielle kunder vælger dig." },
  { cat: "Guide",     title: "Hvad er svartiden på anmeldelser?",           desc: "Forskning viser, at 67% af kunderne forventer svar inden for 24 timer. Her er, hvad det betyder for din virksomhed." },
  { cat: "Tips",      title: "Negativt svar? Sådan håndterer du det rigtigt", desc: "En negativ anmeldelse kan faktisk styrke din virksomheds omdømme — hvis du svarer på den rigtige måde." },
  { cat: "Guide",     title: "Google vs. Trustpilot — hvad er forskellen?", desc: "En gennemgang af de to platforme, og hvad du bør fokusere på afhængigt af din branche." },
];

export default function RessourcerPage() {
  return (
    <section className="pt-[140px] pb-[90px] px-6 md:px-12" style={{ background: "#F8F9F7" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Ressourcer</SectionLabel>
          <h1
            className="leading-[1.15] tracking-[-0.5px] mb-4"
            style={{ fontFamily: "var(--font-dm-serif),serif", fontWeight: 400, fontSize: "clamp(28px,3.5vw,44px)" }}
          >
            Guides og inspiration.
          </h1>
          <p className="text-[16px] max-w-[480px] mx-auto" style={{ color: MUTED }}>
            Alt hvad du har brug for til at mestre anmeldelser og opbygge tillid hos dine kunder.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => {
            const cs = catStyle[a.cat];
            return (
              <div
                key={i}
                className="rounded-2xl p-7 flex flex-col"
                style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: `1px solid ${BORDER}` }}
              >
                <div className="mb-4">
                  <span
                    className="text-[10.5px] font-semibold tracking-[0.07em] uppercase px-[10px] py-[3px] rounded-full"
                    style={{ background: cs.bg, color: cs.color }}
                  >
                    {a.cat}
                  </span>
                </div>
                <h3 className="text-[16px] font-semibold tracking-[-0.2px] leading-[1.35] mb-2.5">{a.title}</h3>
                <p className="text-[13.5px] leading-[1.6] flex-1 mb-5" style={{ color: MUTED }}>{a.desc}</p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-[5px] text-[13px] font-semibold hover:underline"
                  style={{ color: PRIMARY }}
                >
                  Læs mere
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
