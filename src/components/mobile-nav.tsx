"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LayoutGrid,
  MessageSquareText,
  Settings,
  MoreHorizontal,
  BarChart3,
  Plug,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const PRIMARY = "#2F4F3E";
const INK = "#1F2A24";
const BARK = "#5C6B62";
const BORDER = "#E0DDD5";

type TabItem = {
  href: string | null;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  isMore?: boolean;
};

interface MobileNavProps {
  pendingCount: number;
  businessName: string | null;
}

export function MobileNav({ pendingCount, businessName }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);

  const tabs: TabItem[] = [
    { href: "/dashboard", label: "Oversigt", icon: LayoutGrid },
    {
      href: "/reviews",
      label: "Anmeldelser",
      icon: MessageSquareText,
      badge: pendingCount,
    },
    { href: "/settings", label: "Indstillinger", icon: Settings },
    { href: null, label: "Mere", icon: MoreHorizontal, isMore: true },
  ];

  async function handleSignOut() {
    setMoreOpen(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 bg-white md:hidden"
        style={{
          borderTop: `1px solid ${BORDER}`,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        aria-label="Hovednavigation"
      >
        <ul className="flex">
          {tabs.map((t) => {
            const active = t.isMore
              ? moreOpen
              : !!t.href &&
                (pathname === t.href || pathname.startsWith(t.href + "/"));
            const Icon = t.icon;

            const inner = (
              <span
                className="flex flex-col items-center justify-center gap-[5px] rounded-[10px] px-3 py-1.5 transition-colors"
                style={{
                  background: active ? `${PRIMARY}14` : "transparent",
                  color: active ? PRIMARY : BARK,
                }}
              >
                <span className="relative">
                  <Icon className="h-[18px] w-[18px]" />
                  {t.badge && t.badge > 0 ? (
                    <span
                      className="absolute -right-2 -top-1.5 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-[3px] text-[9.5px] font-semibold leading-none text-white"
                      style={{ background: PRIMARY }}
                      aria-label={`${t.badge} nye`}
                    >
                      {t.badge > 9 ? "9+" : t.badge}
                    </span>
                  ) : null}
                </span>
                <span
                  className="text-[10.5px] leading-none"
                  style={{ fontWeight: active ? 600 : 500 }}
                >
                  {t.label}
                </span>
              </span>
            );

            return (
              <li key={t.label} className="flex-1">
                {t.isMore ? (
                  <button
                    type="button"
                    onClick={() => setMoreOpen((o) => !o)}
                    className="flex h-full w-full items-center justify-center py-2 outline-none focus-visible:rounded-[10px] focus-visible:ring-2"
                    style={{
                      ["--tw-ring-color" as never]: PRIMARY,
                    }}
                    aria-expanded={moreOpen}
                    aria-controls="mere-sheet"
                  >
                    {inner}
                  </button>
                ) : (
                  <Link
                    href={t.href as string}
                    className="flex h-full w-full items-center justify-center py-2 outline-none focus-visible:rounded-[10px] focus-visible:ring-2"
                    style={{
                      ["--tw-ring-color" as never]: PRIMARY,
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <MoreSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        businessName={businessName}
        onSignOut={handleSignOut}
      />
    </>
  );
}

interface MoreSheetProps {
  open: boolean;
  onClose: () => void;
  businessName: string | null;
  onSignOut: () => Promise<void> | void;
}

function MoreSheet({ open, onClose, businessName, onSignOut }: MoreSheetProps) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const dragStartY = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mount/unmount with transition
  useEffect(() => {
    if (open) {
      setMounted(true);
      // Lock body scroll
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    } else {
      const t = window.setTimeout(() => {
        setMounted(false);
        setDragOffset(0);
      }, 220);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartY.current = e.clientY;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    const delta = e.clientY - dragStartY.current;
    setDragOffset(Math.max(0, delta));
  };

  const handlePointerEnd = () => {
    if (dragStartY.current === null) return;
    const sheet = sheetRef.current;
    const height = sheet?.getBoundingClientRect().height ?? 400;
    if (dragOffset > height * 0.32) {
      onClose();
    } else {
      setDragOffset(0);
    }
    dragStartY.current = null;
  };

  if (!mounted && !open) return null;

  const snartItems = [
    { label: "Statistik", icon: BarChart3 },
    { label: "Integrationer", icon: Plug },
    { label: "Fakturering", icon: CreditCard },
  ];

  const initial = (businessName?.[0] ?? "?").toUpperCase();
  const displayName = businessName ?? "Vælg virksomhed";

  return (
    <div
      id="mere-sheet"
      role="dialog"
      aria-modal="true"
      aria-label="Mere"
      className="fixed inset-0 z-40 md:hidden"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Luk"
        onClick={onClose}
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          background: "rgba(31, 42, 36, 0.38)",
          opacity: open ? 1 : 0,
        }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute inset-x-0 bottom-0 transition-transform duration-200"
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transform: open
            ? `translateY(${dragOffset}px)`
            : "translateY(100%)",
        }}
      >
        <div
          className="rounded-t-[20px] bg-white"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          {/* Drag handle */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            className="flex h-7 cursor-grab items-center justify-center touch-none"
            aria-hidden
          >
            <span
              className="block h-1 w-9 rounded-full"
              style={{ background: BORDER }}
            />
          </div>

          {/* Aktiv virksomhed */}
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-5 py-4 transition-colors"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[14px] font-semibold"
              style={{ background: `${PRIMARY}1A`, color: PRIMARY }}
            >
              {initial}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className="block text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: BARK }}
              >
                Aktiv virksomhed
              </span>
              <span
                className="block truncate text-[15px] font-medium"
                style={{ color: INK }}
              >
                {displayName}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" style={{ color: BARK }} />
          </Link>

          {/* Snart items */}
          <div className="px-5 pt-4">
            <p
              className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: BARK }}
            >
              Snart
            </p>
            <ul className="space-y-px">
              {snartItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <div
                      className="flex cursor-not-allowed items-center gap-3 rounded-[10px] px-2 py-2.5 opacity-55"
                      aria-disabled="true"
                    >
                      <Icon className="h-[17px] w-[17px]" style={{ color: BARK }} />
                      <span
                        className="flex-1 text-[14.5px]"
                        style={{ color: INK }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="rounded px-1.5 py-0.5 text-[9.5px] font-medium uppercase tracking-wide"
                        style={{ background: BORDER, color: BARK }}
                      >
                        Snart
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Help + Sign out */}
          <div
            className="mt-3 px-5 pb-3"
            style={{ borderTop: `1px solid ${BORDER}` }}
          >
            <ul className="space-y-px pt-3">
              <li>
                <a
                  href="https://svarly.io/help"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-[10px] px-2 py-2.5 transition-colors hover:bg-[#F8F9F7]"
                >
                  <HelpCircle
                    className="h-[17px] w-[17px]"
                    style={{ color: BARK }}
                  />
                  <span className="flex-1 text-[14.5px]" style={{ color: INK }}>
                    Hjælp
                  </span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="flex w-full items-center gap-3 rounded-[10px] px-2 py-2.5 text-left transition-colors hover:bg-[#F8F9F7]"
                >
                  <LogOut
                    className="h-[17px] w-[17px]"
                    style={{ color: BARK }}
                  />
                  <span className="flex-1 text-[14.5px]" style={{ color: INK }}>
                    Log ud
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Bottom safe area */}
          <div style={{ height: "env(safe-area-inset-bottom)" }} aria-hidden />
        </div>
      </div>
    </div>
  );
}
