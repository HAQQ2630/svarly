"use client";

import { useState } from "react";

export function LiveDemo() {
  const [reviewTxt, setReviewTxt] = useState(
    "God mad, men ventetiden var alt for lang."
  );
  const [typed, setTyped] = useState(
    "Hej! Mange tak for din feedback. Vi er glade for, at du nød maden, og vi beklager ventetiden. Vi arbejder på at forbedre vores service og håber at se dig igen snart!"
  );
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const generate = () => {
    setLoading(true);
    setApproved(false);
    setTyped("");
    setTimeout(() => {
      const r = `Kære gæst! Mange tak for din ærlige tilbagemelding. Vi beklager dybt, at ventetiden ikke var god nok – det er ikke den standard vi stræber efter. Vi er i gang med at forbedre vores service og håber, du vil give os en ny chance!`;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTyped(r.slice(0, i));
        if (i >= r.length) {
          clearInterval(iv);
          setLoading(false);
        }
      }, 14);
    }, 700);
  };

  return (
    <div className="grid gap-0" style={{ gridTemplateColumns: "1fr 56px 1fr" }}>
      {/* Left: Review input */}
      <div
        className="rounded-2xl p-7"
        style={{
          background: "#fff",
          border: "1px solid #E0DDD5",
          boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-3 text-[10.5px] font-semibold tracking-[0.1em] uppercase text-svarly-muted">
          <span className="inline-block w-[14px] h-[1.5px] bg-svarly-muted rounded" />
          Ubesvaret anmeldelse
        </div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0" style={{ background: "#E2D5C4", color: "#7A5A3C" }}>
            J
          </div>
          <div>
            <div className="font-semibold text-[13.5px] mb-0.5">Janet B.</div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#E8A630] text-[11px]">★★★</span>
              <span className="text-[11.5px] text-svarly-muted">3 dage siden</span>
            </div>
          </div>
        </div>
        <p className="text-[14px] text-svarly-muted leading-[1.6] mb-4 italic">&quot;{reviewTxt}&quot;</p>
        <textarea
          value={reviewTxt}
          onChange={(e) => setReviewTxt(e.target.value)}
          rows={3}
          className="w-full rounded-[10px] px-3 py-2.5 text-[13px] text-svarly-text leading-[1.5] resize-none outline-none border border-svarly-border bg-[#FAFAF8] focus:border-svarly-primary transition-colors"
        />
        <button
          onClick={generate}
          disabled={loading}
          className="mt-3 w-full rounded-[10px] py-3 text-[13.5px] font-semibold text-white transition-opacity"
          style={{
            background: "#2F4F3E",
            boxShadow: "0 3px 14px rgba(47,79,62,0.45)",
            opacity: loading ? 0.65 : 1,
          }}
        >
          {loading ? "Genererer…" : "Generer AI-svar →"}
        </button>
      </div>

      {/* Center: Arrow */}
      <div className="flex flex-col items-center justify-center pt-[72px] gap-1.5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "#2F4F3E", boxShadow: "0 4px 16px rgba(47,79,62,0.4)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-[10px] text-svarly-muted font-medium">AI</span>
      </div>

      {/* Right: AI Reply */}
      <div
        className="rounded-2xl p-7 transition-all duration-300"
        style={{
          background: "#fff",
          border: approved ? "1.5px solid #7A8F7B" : "1px solid #E0DDD5",
          boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-4 text-[10.5px] font-semibold tracking-[0.1em] uppercase text-svarly-muted">
          <span className="inline-block w-[14px] h-[1.5px] bg-svarly-muted rounded" />
          AI-genereret svar
        </div>
        <div className="min-h-[120px] mb-5">
          <p
            className="text-[14px] leading-[1.65]"
            style={{
              color: typed ? "#1F2A24" : "#5C6B62",
              fontStyle: typed ? "normal" : "italic",
            }}
          >
            {typed || "Svaret vises her…"}
            {loading && <span className="animate-blink opacity-50">|</span>}
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            className="shrink-0 rounded-[10px] px-4 py-2.5 text-[13px] font-medium text-svarly-muted transition-colors hover:bg-svarly-card"
            style={{ border: "1px solid #E0DDD5" }}
          >
            Rediger
          </button>
          <button
            onClick={() => setApproved((a) => !a)}
            disabled={!typed || loading}
            className="flex-1 rounded-[10px] py-2.5 text-[13.5px] font-semibold text-white transition-all duration-300"
            style={{
              background: approved ? "#7A8F7B" : "#2F4F3E",
              opacity: !typed || loading ? 0.4 : 1,
              boxShadow: approved ? "none" : "0 3px 14px rgba(47,79,62,0.45)",
            }}
          >
            {approved ? "✓ Godkendt & Sendt" : "Godkend & Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
