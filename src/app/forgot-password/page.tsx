"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const PRIMARY = "#2F4F3E";
const MUTED = "#5C6B62";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) {
        setError(error.message);
        return;
      }
      setSent(true);
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
            Glemt adgangskode?
          </h1>
          <p className="mb-7 text-center text-[14px]" style={{ color: MUTED }}>
            Indtast din e-mail, så sender vi et link.
          </p>

          {sent ? (
            <div className="rounded-[12px] border border-[rgba(47,79,62,0.20)] bg-[rgba(47,79,62,0.06)] px-5 py-6 text-center">
              <div className="text-2xl mb-3">📬</div>
              <p className="text-[14px] font-semibold text-[#1F2A24] mb-1">Tjek din e-mail</p>
              <p className="text-[13px]" style={{ color: MUTED }}>
                Vi har sendt et link til <strong>{email}</strong>. Klik på linket for at vælge en ny adgangskode.
              </p>
            </div>
          ) : (
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
                  className="w-full h-[42px] rounded-[10px] border border-[#E0DDD5] bg-[#F8F9F7] px-[13px] text-[16px] text-[#1F2A24] outline-none transition-colors focus:border-[#2F4F3E]"
                />
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
                {loading ? "Sender…" : "Send nulstillingslink"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-[13px]" style={{ color: MUTED }}>
          <Link href="/login" className="font-medium hover:underline" style={{ color: PRIMARY }}>
            ← Tilbage til login
          </Link>
        </p>
      </div>
    </div>
  );
}
