"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  MessageSquareText,
  BarChart3,
  Plug,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const PRIMARY = "#2F4F3E";
const BORDER = "#E0DDD5";
const MUTED = "#5C6B62";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  disabled?: boolean;
};

export function Sidebar({ pendingCount }: { pendingCount: number }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems: NavItem[] = [
    { href: "/dashboard", label: "Oversigt", icon: LayoutGrid },
    { href: "/reviews", label: "Anmeldelser", icon: MessageSquareText, badge: pendingCount },
    { href: "/analytics", label: "Statistik", icon: BarChart3, disabled: true },
    { href: "/integrations", label: "Integrationer", icon: Plug, disabled: true },
    { href: "/settings", label: "Indstillinger", icon: Settings },
    { href: "/billing", label: "Fakturering", icon: CreditCard, disabled: true },
  ];

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside
      className="hidden h-screen w-[220px] shrink-0 flex-col bg-white md:flex"
      style={{ borderRight: `1px solid ${BORDER}` }}
    >
      <div
        className="flex h-16 items-center px-5"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Svarly"
            width={1158}
            height={1154}
            priority
            className="h-9 w-auto mix-blend-multiply"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 p-2">
        {navItems.map((item) => {
          const active =
            !item.disabled &&
            (pathname === item.href || pathname.startsWith(item.href + "/"));
          const Icon = item.icon;
          const content = (
            <>
              <Icon className="h-[15px] w-[15px] shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span
                  className="ml-auto rounded-full px-[7px] py-px text-[10px] font-semibold text-white"
                  style={{ background: PRIMARY }}
                >
                  {item.badge}
                </span>
              ) : item.disabled ? (
                <span
                  className="ml-auto rounded px-1.5 py-0.5 text-[9.5px] font-medium uppercase tracking-wide"
                  style={{ background: BORDER, color: MUTED }}
                >
                  Snart
                </span>
              ) : null}
            </>
          );

          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="flex w-full cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] opacity-60"
                style={{ color: MUTED }}
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] transition-colors"
              style={{
                background: active ? PRIMARY + "14" : "transparent",
                color: active ? PRIMARY : MUTED,
                fontWeight: active ? 600 : 400,
              }}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-0.5 p-2" style={{ borderTop: `1px solid ${BORDER}` }}>
        <a
          href="https://svarly.io/help"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] transition-colors hover:bg-[#F8F9F7]"
          style={{ color: MUTED }}
        >
          <HelpCircle className="h-[15px] w-[15px] shrink-0" />
          Hjælp
        </a>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] transition-colors hover:bg-[#F8F9F7]"
          style={{ color: MUTED }}
        >
          <LogOut className="h-[15px] w-[15px] shrink-0" />
          Log ud
        </button>
      </div>
    </aside>
  );
}
