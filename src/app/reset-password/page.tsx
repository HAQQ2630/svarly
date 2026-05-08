"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const MUTED = "#5C6B62";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
        return;
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noget gik galt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8F9F7] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,79,62,0.10),transparent_65%)]" />

      <div className="relative z-10 w-full max-w-[400px]">
        <Link href="/" className="mb-8 flex flex-col items-center gap-3">
          <span className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[15px]">
            <Image
              src="/logo.png"
              alt="Svarly"
              width={1158}
              height={1154}
              priority
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </span>
          <span className="text-[18px] font-semibold tracking-[-0.3px] text-[#1F2A24]">
            Svarly
          </span>
        </Link>

        <div className="rounded-[18px] bg-card px-8 py-9">
          <h1 className="mb-1.5 text-center text-[22px] font-semibold tracking-[-0.4px] text-[#1F2A24]">
            Ny adgangskode
          </h1>
          <p className="mb-7 text-center text-[14px]" style={{ color: MUTED }}>
            Vælg en ny adgangskode til din konto.
          </p>

          <form onSubmit={onSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[13.5px] font-medium text-[#1F2A24]">
                Ny adgangskode
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindst 6 tegn"
                  className="w-full h-[42px] rounded-[10px] border border-[#E0DDD5] bg-[#F8F9F7] px-[13px] pr-10 text-[16px] text-[#1F2A24] outline-none transition-colors focus:border-[#2F4F3E]"
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

            {error && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-[11px] bg-primary text-[14.5px] font-medium text-primary-foreground shadow-[0_2px_12px_rgba(47,79,62,0.35)] transition-all hover:bg-[#25402F] hover:shadow-[0_4px_18px_rgba(47,79,62,0.18)] disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? "Gemmer…" : "Gem ny adgangskode"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
