"use client";

import { Bell, ChevronDown } from "lucide-react";

const PRIMARY = "#2F4F3E";
const BORDER = "#E0DDD5";

interface AppTopbarProps {
  pendingCount: number;
  businessName: string | null;
}

export function AppTopbar({ pendingCount, businessName }: AppTopbarProps) {
  const displayName = businessName ?? "Vælg virksomhed";
  const initial = (businessName?.[0] ?? "?").toUpperCase();

  return (
    <div
      className="flex h-[54px] items-center justify-end gap-3 bg-white px-5 md:px-6"
      style={{ borderBottom: `1px solid ${BORDER}` }}
    >
      <button
        type="button"
        aria-label="Notifikationer"
        className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F9F7] transition-colors hover:bg-[#EFEDE7]"
        style={{ border: `1px solid ${BORDER}` }}
      >
        <Bell className="h-[15px] w-[15px] text-[#5C6B62]" />
        {pendingCount > 0 && (
          <span
            className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full"
            style={{ background: PRIMARY }}
          />
        )}
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-[9px] bg-[#F8F9F7] px-3 py-1.5 transition-colors hover:bg-[#EFEDE7]"
        style={{ border: `1px solid ${BORDER}` }}
      >
        <span
          className="flex h-[22px] w-[22px] items-center justify-center rounded-md text-[10px] font-semibold"
          style={{ background: PRIMARY + "1A", color: PRIMARY }}
        >
          {initial}
        </span>
        <span className="text-[12.5px] font-medium text-[#1F2A24]">{displayName}</span>
        <ChevronDown className="h-3 w-3 text-[#5C6B62]" />
      </button>
    </div>
  );
}
