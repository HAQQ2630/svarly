"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { GoogleLogo } from "@/components/landing/icons";
import { Spinner } from "@/components/spinner";

const BORDER = "#E0DDD5";
const MUTED = "#5C6B62";

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        return;
      }
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setCheckEmail(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noget gik galt.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke starte Google-login.");
      setLoading(false);
    }
  }

  const inputBase =
    "w-full h-[42px] rounded-[10px] border border-[#E0DDD5] bg-[#F8F9F7] px-[13px] text-[16px] text-[#1F2A24] outline-none transition-colors focus:border-[#2F4F3E]";

  if (checkEmail) {
    return (
      <div className="rounded-[12px] border border-[rgba(47,79,62,0.20)] bg-[rgba(47,79,62,0.06)] px-5 py-6 text-center">
        <div className="text-2xl mb-3">📬</div>
        <p className="text-[14px] font-semibold text-[#1F2A24] mb-1">Tjek din e-mail</p>
        <p className="text-[13px]" style={{ color: MUTED }}>
          Vi har sendt et bekræftelseslink til <strong>{email}</strong>. Klik på linket for at aktivere din konto.
        </p>
      </div>
    );
  }

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
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mindst 6 tegn"
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
              Opretter konto…
            </>
          ) : (
            "Opret konto gratis"
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
        Opret med Google
      </button>
    </>
  );
}
