"use client";

import { useEffect, useRef, useState } from "react";
import { Stars } from "@/components/landing/stars";

type Example = {
  id: string;
  name: string;
  initial: string;
  avatarBg: string;
  avatarFg: string;
  stars: number;
  when: string;
  review: string;
  reply: string;
};

const EXAMPLES: Example[] = [
  {
    id: "maria",
    name: "Maria S.",
    initial: "M",
    avatarBg: "#E8D5C4",
    avatarFg: "#8B5A3C",
    stars: 5,
    when: "i går",
    review: "Skøn kop kaffe og venligt personale. Vi kommer helt sikkert igen.",
    reply:
      "Tusind tak, Maria. Det betyder meget at høre. Vi glæder os til at se dig igen, og næste gang fyrer vi op for kanelsneglene i god tid.",
  },
  {
    id: "anders",
    name: "Anders K.",
    initial: "A",
    avatarBg: "#C8DCE2",
    avatarFg: "#4A6573",
    stars: 3,
    when: "for 2 dage siden",
    review: "Maden var god, men ventetiden var for lang en lørdag aften.",
    reply:
      "Hej Anders, tak for tilbagemeldingen. Du har ret i, at det tog for lang tid lørdag aften. Vi kigger på bemandingen i weekenderne. Håber du giver os en chance til.",
  },
  {
    id: "lena",
    name: "Lena B.",
    initial: "L",
    avatarBg: "#D4D0E0",
    avatarFg: "#5C5670",
    stars: 1,
    when: "i sidste uge",
    review:
      "Bestilte takeaway. Maden var kold da jeg kom hjem, og der manglede en ret.",
    reply:
      "Lena, det er beklageligt, og sådan vil vi ikke modtages. Vi skriver til dig i dag, så vi kan rette op på både den manglende ret og oplevelsen.",
  },
];

const PRIMARY = "#2F4F3E";
const INK = "#1F2A24";
const BARK = "#5C6B62";
const LINEN = "#F8F9F7";
const BORDER = "#E0DDD5";

export function HeroDemo() {
  const [activeId, setActiveId] = useState<string>(EXAMPLES[0].id);
  const [reviewText, setReviewText] = useState<string>(EXAMPLES[0].review);
  const [typed, setTyped] = useState<string>("");
  const [phase, setPhase] = useState<"idle" | "thinking" | "writing" | "done">(
    "idle",
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thinkingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = EXAMPLES.find((e) => e.id === activeId) ?? EXAMPLES[0];

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (thinkingRef.current) clearTimeout(thinkingRef.current);
    };
  }, []);

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (thinkingRef.current) {
      clearTimeout(thinkingRef.current);
      thinkingRef.current = null;
    }
  };

  const generate = () => {
    stop();
    setTyped("");
    setPhase("thinking");
    thinkingRef.current = setTimeout(() => {
      setPhase("writing");
      let i = 0;
      const target = active.reply;
      intervalRef.current = setInterval(() => {
        i += 1;
        setTyped(target.slice(0, i));
        if (i >= target.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setPhase("done");
        }
      }, 16);
    }, 540);
  };

  const switchExample = (id: string) => {
    if (id === activeId) return;
    stop();
    const next = EXAMPLES.find((e) => e.id === id) ?? EXAMPLES[0];
    setActiveId(id);
    setReviewText(next.review);
    setTyped("");
    setPhase("idle");
  };

  const isWorking = phase === "thinking" || phase === "writing";

  return (
    <div className="relative w-full">
      <div
        className="relative rounded-[18px] overflow-hidden"
        style={{
          background: LINEN,
          border: `1px solid ${BORDER}`,
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.6) inset, 0 10px 28px -20px rgba(47,79,62,0.16)",
        }}
      >
        {/* Header strip */}
        <div
          className="flex items-center justify-between px-5 pt-4 pb-3"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[10.5px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: BARK }}
            >
              Svarly
            </span>
            <span
              className="inline-block h-[10px] w-px"
              style={{ background: BORDER }}
            />
            <span className="text-[11.5px]" style={{ color: BARK }}>
              Eksempel
            </span>
          </div>
          <div
            className="hidden sm:flex items-center gap-1 rounded-full p-[3px]"
            style={{ background: "#EFEDE7", border: `1px solid ${BORDER}` }}
          >
            {EXAMPLES.map((ex) => {
              const isActive = ex.id === activeId;
              return (
                <button
                  key={ex.id}
                  onClick={() => switchExample(ex.id)}
                  className="rounded-full px-[10px] py-[4px] text-[11px] font-medium transition-colors"
                  style={{
                    background: isActive ? LINEN : "transparent",
                    color: isActive ? INK : BARK,
                    boxShadow: isActive
                      ? "0 1px 2px rgba(47,79,62,0.10)"
                      : "none",
                  }}
                  aria-pressed={isActive}
                >
                  <span className="inline-flex items-center gap-1">
                    <span
                      className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-full text-[8.5px] font-semibold"
                      style={{
                        background: ex.avatarBg,
                        color: ex.avatarFg,
                      }}
                    >
                      {ex.initial}
                    </span>
                    {ex.stars}★
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Review block */}
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="h-[34px] w-[34px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0"
              style={{ background: active.avatarBg, color: active.avatarFg }}
              aria-hidden
            >
              {active.initial}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] font-semibold" style={{ color: INK }}>
                  {active.name}
                </span>
                <Stars n={active.stars} size={11} />
              </div>
              <span className="text-[11.5px]" style={{ color: BARK }}>
                Google · {active.when}
              </span>
            </div>
          </div>

          <label htmlFor="hero-demo-review" className="sr-only">
            Anmeldelse
          </label>
          <textarea
            id="hero-demo-review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-[10px] px-3 py-2.5 text-[14px] leading-[1.6] transition-colors outline-none"
            style={{
              background: "rgba(239,237,231,0.55)",
              border: `1px solid ${BORDER}`,
              color: INK,
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            }}
            spellCheck={false}
          />

          <div className="mt-3 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={generate}
              disabled={isWorking}
              className="group inline-flex items-center gap-2 rounded-[10px] px-4 py-[9px] text-[13.5px] font-semibold transition-all"
              style={{
                background: PRIMARY,
                color: LINEN,
                boxShadow: isWorking
                  ? "none"
                  : "0 2px 12px rgba(47,79,62,0.32)",
                opacity: isWorking ? 0.6 : 1,
              }}
            >
              {phase === "thinking"
                ? "Tænker"
                : phase === "writing"
                  ? "Skriver"
                  : phase === "done"
                    ? "Skriv et nyt svar"
                    : "Skriv svar"}
              {phase === "idle" && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6h8M6 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {(phase === "thinking" || phase === "writing") && (
                <span
                  aria-hidden
                  className="inline-flex h-[6px] w-[6px] rounded-full animate-blink"
                  style={{ background: LINEN }}
                />
              )}
            </button>
            <span
              className="text-[12px]"
              style={{ color: BARK }}
              aria-live="polite"
            >
              {phase === "idle" && "Rediger anmeldelsen, hvis du vil"}
              {phase === "thinking" && "Læser anmeldelsen…"}
              {phase === "writing" && "Skriver i dit tonefald"}
              {phase === "done" && "Klar til godkendelse"}
            </span>
          </div>
        </div>

        {/* Reply block */}
        <div
          className="relative px-5 pt-4 pb-5 sm:pb-6"
          style={{
            background: "#EFEDE7",
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          {/* Tiny corner mark */}
          <div
            className="absolute left-5 -top-[7px] h-[14px] w-[14px] rotate-45"
            style={{
              background: "#EFEDE7",
              borderLeft: `1px solid ${BORDER}`,
              borderTop: `1px solid ${BORDER}`,
            }}
            aria-hidden
          />
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[5px]"
                style={{ background: PRIMARY }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6h2l1.6-3L7 9l1.4-3H10"
                    stroke={LINEN}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className="text-[10.5px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: PRIMARY }}
              >
                Forslag til svar
              </span>
            </div>
            {phase === "done" && (
              <button
                onClick={generate}
                className="text-[11.5px] underline-offset-4 transition-colors hover:underline"
                style={{ color: BARK }}
              >
                Skriv et nyt
              </button>
            )}
          </div>
          <p
            className="text-[14.5px] leading-[1.7] min-h-[88px]"
            style={{ color: INK }}
            aria-live="polite"
          >
            {phase === "idle" && (
              <span style={{ color: BARK, fontStyle: "italic" }}>
                Tryk på “Skriv svar”, så foreslår Svarly et svar i dit tonefald.
              </span>
            )}
            {phase === "thinking" && (
              <span
                className="inline-flex items-center gap-1.5"
                style={{ color: BARK, fontStyle: "italic" }}
              >
                Tænker
                <span
                  className="inline-flex h-[5px] w-[5px] rounded-full animate-blink"
                  style={{ background: BARK }}
                />
              </span>
            )}
            {(phase === "writing" || phase === "done") && (
              <>
                {typed}
                {phase === "writing" && (
                  <span
                    aria-hidden
                    className="inline-block w-[2px] h-[1em] align-[-0.15em] ml-[1px] animate-blink"
                    style={{ background: PRIMARY }}
                  />
                )}
              </>
            )}
          </p>
          {phase === "done" && (
            <div className="mt-4 flex items-center gap-2">
              <button
                className="inline-flex items-center gap-1.5 rounded-[9px] border px-3 py-[7px] text-[12.5px] font-medium transition-colors hover:bg-[rgba(255,255,255,0.55)]"
                style={{ borderColor: BORDER, color: INK, background: LINEN }}
                onClick={() => navigator.clipboard?.writeText(typed)}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <rect
                    x="2.5"
                    y="2.5"
                    width="6"
                    height="6"
                    rx="1.2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M4 1.5h5A1.5 1.5 0 0 1 10.5 3v5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                Kopiér
              </button>
              <span className="text-[12px]" style={{ color: BARK }}>
                I appen sender du med ét klik.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile example switcher */}
      <div className="sm:hidden mt-3 flex items-center gap-2">
        {EXAMPLES.map((ex) => {
          const isActive = ex.id === activeId;
          return (
            <button
              key={ex.id}
              onClick={() => switchExample(ex.id)}
              className="flex-1 rounded-full px-3 py-[7px] text-[12px] font-medium transition-colors"
              style={{
                background: isActive ? PRIMARY : "transparent",
                color: isActive ? LINEN : BARK,
                border: `1px solid ${isActive ? PRIMARY : BORDER}`,
              }}
              aria-pressed={isActive}
            >
              {ex.stars}★ {ex.name.split(" ")[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
