"use client";

import { useState, useEffect } from "react";

export function IPhoneMockup() {
  const full =
    "Hej Sara! Mange tak for din flotte anmeldelse. Det gør os virkelig glade at høre, at du havde en god oplevelse. Vi glæder os til at se dig igen snart!";
  const [txt, setTxt] = useState("");
  const [done, setDone] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTxt(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(iv);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      className="relative shrink-0"
      style={{
        width: 268,
        height: 556,
        background: "#0A0A0A",
        borderRadius: 44,
        padding: "10px 8px",
        boxShadow:
          "0 50px 100px rgba(0,0,0,0.26), 0 0 0 1px rgba(255,255,255,0.07) inset",
      }}
    >
      {/* Dynamic island */}
      <div
        className="absolute z-10"
        style={{
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          width: 90,
          height: 25,
          background: "#000",
          borderRadius: 20,
        }}
      />

      {/* Screen */}
      <div
        className="w-full h-full flex flex-col overflow-hidden"
        style={{ background: "#F2F2F7", borderRadius: 36 }}
      >
        {/* Status bar */}
        <div
          className="flex items-end justify-between shrink-0 px-[18px] pb-[6px]"
          style={{ height: 48, background: "#F2F2F7" }}
        >
          <span className="text-[11px] font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="14" height="10" viewBox="0 0 16 12" fill="#1C1C1E">
              <rect x="0" y="4" width="3" height="8" rx="1" />
              <rect x="4.5" y="2" width="3" height="10" rx="1" />
              <rect x="9" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg width="22" height="10" viewBox="0 0 25 12" fill="none">
              <rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="#1C1C1E" strokeOpacity=".35" />
              <rect x="2" y="2" width="13" height="8" rx="2" fill="#1C1C1E" />
              <path d="M23 4v4a2 2 0 000-4z" fill="#1C1C1E" fillOpacity=".4" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div
          className="shrink-0 px-[14px] py-[8px]"
          style={{ background: "#fff", borderBottom: "1px solid #E5E5EA" }}
        >
          <div className="text-[10px] mb-[1px]" style={{ color: "#8E8E93" }}>
            Google Business Profile
          </div>
          <div className="text-[14px] font-semibold" style={{ color: "#1C1C1E" }}>
            Ny anmeldelse
          </div>
        </div>

        {/* Cards */}
        <div className="flex-1 px-3 pt-3 flex flex-col gap-[10px] overflow-hidden">
          {/* Review */}
          <div
            className="rounded-[14px] p-3"
            style={{ background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-[7px]">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
                style={{ background: "#E8D5C4", color: "#8B5A3C" }}
              >
                S
              </div>
              <div>
                <div className="text-[11.5px] font-semibold mb-[1px]">Sara M.</div>
                <span className="text-[#E8A630] text-[9px]">★★★★★</span>
              </div>
              <span className="text-[9.5px] ml-auto" style={{ color: "#8E8E93" }}>
                3 min. siden
              </span>
            </div>
            <p className="text-[11px] leading-[1.55]" style={{ color: "#3C3C43" }}>
              &quot;Super god service og venligt personale! Kommer helt sikkert igen.&quot;
            </p>
          </div>

          {/* AI Reply */}
          <div
            className="rounded-[14px] p-3 transition-all duration-300"
            style={{
              background: approved ? "#EEF6F1" : "#fff",
              boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
              border: approved ? "1.5px solid #7A8F7B" : "1px solid #E5E5EA",
            }}
          >
            <div className="flex items-center gap-[6px] mb-[7px]">
              <div
                className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0"
                style={{ background: "#2F4F3E" }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h2l2-4 2 8 2-4h2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[10.5px] font-semibold" style={{ color: "#2F4F3E" }}>
                AI-svar
              </span>
              {!done && (
                <span className="text-[9.5px] ml-auto opacity-80" style={{ color: "#8E8E93" }}>
                  skriver…
                </span>
              )}
              {done && !approved && (
                <span className="text-[9.5px] ml-auto font-medium" style={{ color: "#2F4F3E" }}>
                  Klar
                </span>
              )}
              {approved && (
                <span className="text-[9.5px] ml-auto font-semibold" style={{ color: "#2F4F3E" }}>
                  ✓ Sendt
                </span>
              )}
            </div>
            <p className="text-[11px] leading-[1.55] min-h-[56px]" style={{ color: "#3C3C43" }}>
              {txt}
              {!done && <span className="animate-blink">|</span>}
            </p>
          </div>
        </div>

        {/* Approve button */}
        <div className="px-3 pt-[10px] pb-[14px] shrink-0">
          <button
            onClick={() => setApproved((a) => !a)}
            className="w-full rounded-[11px] py-[11px] text-[12.5px] font-semibold text-white transition-all duration-300"
            style={{
              background: approved ? "#7A8F7B" : "#2F4F3E",
              boxShadow: approved
                ? "0 2px 8px rgba(122,143,123,0.5)"
                : "0 3px 14px rgba(47,79,62,0.5)",
            }}
          >
            {approved ? "✓ Godkendt & Sendt" : "Godkend & Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
