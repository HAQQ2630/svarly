"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "idle" | "active" | "done";

const PRIMARY = "#2F4F3E";

export function TopProgress() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPhase("active");
    const advance = window.setTimeout(() => setPhase("done"), 180);
    const reset = window.setTimeout(() => setPhase("idle"), 480);
    return () => {
      window.clearTimeout(advance);
      window.clearTimeout(reset);
    };
  }, [pathname]);

  const widthClass =
    phase === "idle" ? "w-0" : phase === "active" ? "w-[72%]" : "w-full";
  const opacityClass = phase === "active" ? "opacity-100" : "opacity-0";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[2px]"
    >
      <div
        className={`h-full transition-[width,opacity] duration-[280ms] ease-out motion-reduce:transition-opacity motion-reduce:!w-full ${widthClass} ${opacityClass}`}
        style={{ background: PRIMARY }}
      />
    </div>
  );
}
