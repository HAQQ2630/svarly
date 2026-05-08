"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { GoogleLogo } from "@/components/landing/icons";
import { Spinner } from "@/components/spinner";

const PRIMARY = "#2F4F3E";
const BORDER = "#E0DDD5";
const MUTED = "#5C6B62";

function safeRedirect(value: string | null): string {
  if (!value) return "/dashboard";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/dashboard";
  }
  return value;
}

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirectedFrom"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Kunne ikke kontakte Supabase. Tjek NEXT_PUBLIC_SUPABASE_URL.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const next = encodeURIComponent(redirectTo);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
        },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
      }
      // On success, Supabase redirects the browser; no further work here.
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunne ikke starte Google-login.",
      );
      setLoading(false);
    }
  }

  const inputBase =
    "w-full h-[42px] rounded-[10px] border border-[#E0DDD5] bg-[#F8F9F7] px-[13px] text-[16px] text-[#1F2A24] outline-none transition-colors focus:border-[#2F4F3E]";

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-3.5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13.5px] font-medium text-[#1F2A24]">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dig@email.dk"
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-[13.5px] font-medium text-[#1F2A24]">
            Adgangskode
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`${inputBase} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Skjul adgangskode" : "Vis adgangskode"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6B62] hover:text-[#1F2A24]"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-1.5 text-[13.5px] text-[#5C6B62]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3.5 w-3.5"
              style={{ accentColor: PRIMARY }}
            />
            Husk mig
          </label>
          <Link href="/forgot-password" className="text-[13.5px] font-medium text-[#2F4F3E] hover:underline">
            Glemt adgangskode?
          </Link>
        </div>

        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[11px] bg-primary text-[14.5px] font-medium text-primary-foreground shadow-[0_2px_12px_rgba(47,79,62,0.35)] transition-all hover:bg-[#25402F] hover:shadow-[0_4px_18px_rgba(47,79,62,0.18)] disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? (
            <>
              <Spinner />
              Logger ind…
            </>
          ) : (
            "Log ind"
          )}
        </button>
      </form>

      <div className="my-4 flex items-center gap-2.5">
        <div className="h-px flex-1" style={{ background: BORDER }} />
        <span className="text-[12px]" style={{ color: MUTED }}>eller</span>
        <div className="h-px flex-1" style={{ background: BORDER }} />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="flex h-[42px] w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#E0DDD5] bg-[#F8F9F7] text-[14px] font-medium text-[#1F2A24] transition-colors hover:bg-[#EFE9DF] disabled:opacity-60"
      >
        <GoogleLogo />
        Log ind med Google
      </button>
    </>
  );
}
